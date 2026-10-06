// 多元钻井机 (multi_type_driller) 的 MBD2 机器定义.
//
// 结构 / 配方类型由磁盘 NBT 提供, 这里只提供"定义":
//   结构     ldlib/assets/mbd2/multiblock/multi_type_driller.mb
//   配方类型 ldlib/assets/mbd2/recipe_type/multi_type_driller.rt
//   总线部件 ldlib/assets/mbd2/machine/multi_type_driller/*.sm
//              (MBD2 每个机器定义才会注册一个方块, 所以 .mb 里用到的
//               cmi:multi_type_driller_*_bus 必须各有一份 .sm 定义)
//
// 运行逻辑 (钻井 / 液泵 / 气泵 三模式) 在
// kubejs/server_scripts/event/mods/mbd/multi_type_driller/Running.js
//
// 特性名不是随便取的:
//   * .sm 里的 proxyControllerCapabilities 用 traitNameFilter 做 **子串包含**
//     匹配, 所以四个输入/输出特性名必须互不为子串;
//   * bindMachineUI 用特性名做 "@ui:<特性名>_" 的部件界面前缀, 取全名最稳.
//     multi_type_driller_coolant_input   -> 冷却液输入仓 B
//     multi_type_driller_coolant_output  -> 冷却液输出仓 A
//     multi_type_driller_product_output  -> 产物输出口 C (物品, 两个 C 同步)
//     multi_type_driller_gas_output      -> 产物输出口 C (气体, 两个 C 同步)
//     multi_type_driller_energy_input    -> 能量输入仓 D
//
// 事件名必须用 MBD2 自己的 MBDRegistryEvents.machine:
// MBD2 的 KubeJS 事件组名是 "MBDRegistryEvents"
// (MBDStartupEvents: EventGroup.of("MBDRegistryEvents").register("machine", ...)),
// 写成 StartupEvents.registry("mbd2_machine") 会被 KubeJS 当成它自己的
// registry 工厂, 直接抛 Unknown type.

MBDRegistryEvents.machine((event) => {
	let $FluidTankCapabilityTraitDefinition =
		Java.loadClass("com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTraitDefinition")
	let $ItemSlotCapabilityTraitDefinition =
		Java.loadClass("com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTraitDefinition")
	let $ForgeEnergyCapabilityTraitDefinition =
		Java.loadClass("com.lowdragmc.mbd2.common.trait.forgeenergy.ForgeEnergyCapabilityTraitDefinition")
	// 气泵产出的是 Mekanism 气体, 只能进化学储罐, 不能进流体罐
	let $GasTankCapabilityTraitDefinition =
		Java.loadClass("com.lowdragmc.mbd2.integration.mekanism.trait.chemical.ChemicalTankCapabilityTraitDefinition$Gas")
	let $IO = Java.loadClass("com.lowdragmc.mbd2.api.capability.recipe.IO")
	let $ConfigMachineSettings =
		Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigMachineSettings")
	let $ConfigMultiblockSettings =
		Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigMultiblockSettings")
	let $ConfigRecipeLogicSettings =
		Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigRecipeLogicSettings")
	let $MachineState =
		Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.MachineState")
	// 结构: MBD2 只在磁盘 .mb 里注册机器定义, 而磁盘定义在本事件之前就加载完了,
	// 同一个 id 再注册会被 MBDRegistry.register 判重直接抛异常
	// ([register] registry mbd2:machine_definition contains key ... already),
	// 所以结构改由代码构建 (与磁盘 .mb 的布局逐格一致).
	let $FactoryBlockPattern =
		Java.loadClass("com.lowdragmc.mbd2.api.pattern.FactoryBlockPattern")
	let $Predicates = Java.loadClass("com.lowdragmc.mbd2.api.pattern.Predicates")
	let $ForgeRegistries = Java.loadClass("net.minecraftforge.registries.ForgeRegistries")
	let $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation")
	let $MBDRegistries = Java.loadClass("com.lowdragmc.mbd2.api.registry.MBDRegistries")
	let $MultiblockShapeInfo =
		Java.loadClass("com.lowdragmc.mbd2.api.pattern.MultiblockShapeInfo")
	let $Blocks = Java.loadClass("net.minecraft.world.level.block.Blocks")
	let $Array = Java.loadClass("java.lang.reflect.Array")
	let $BlockInfo = Java.loadClass("com.lowdragmc.lowdraglib.utils.BlockInfo")
	// Class 对象要用 Class.forName(String) 取, 见下面 BLOCK_INFO_CLASS 处的说明
	let $Class = Java.loadClass("java.lang.Class")
	let $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries")
	let $ConfigBlockProperties =
		Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigBlockProperties")
	let $RotationState = Java.loadClass("com.lowdragmc.mbd2.api.block.RotationState")

	const MACHINE_ID = "cmi:multi_type_driller"

	// 冷却液仓: 1 mB/t 的消耗, 512000 mB 可连续运行 512000 tick ≈ 7.1 小时
	const COOLANT_CAPACITY = 512000
	// C 口液体产物仓 (液泵抽出的液体)
	const FLUID_CAPACITY = 64000
	// 能量仓: 100 FE/t, 留 100 tick 缓冲
	const ENERGY_CAPACITY = 100000
	const ENERGY_IO = 10000
	// 气体仓: 100 mB/次 的氢气产出
	const GAS_CAPACITY = 64000

	const builder = event.create("multiblock", MACHINE_ID)

	// 旋转状态必须显式设成 NON_Y_AXIS (与整合包里其它多方块一致, 如 EBF)。
	// 不设的话 MBD2 取默认值, 结构会"躺下"/转向不对.
	// ConfigBlockProperties.builder().rotationState(...) -> builder.blockProperties(...)
	builder.blockProperties(
		$ConfigBlockProperties.builder()
			.rotationState($RotationState.NON_Y_AXIS)
			.build()
	)

	// on/off 两个渲染状态. rootState 给 off, 其子状态 working 给 on ——
	// MBD2 成型后会把机器切到 "working", 没有这个子状态就不会换贴图.
	builder.rootState(
		$MachineState.builder()
			.name("base")
			.modelRenderer("cmi:block/machine/multi_type_driller/off")
			.child(
				$MachineState.builder()
					.name("working")
					.modelRenderer("cmi:block/machine/multi_type_driller/on")
					.build()
			)
			.build()
	)

	builder.machineSettings(() => {
		const settings = $ConfigMachineSettings.builder()

		// 无 UI: 纯代码注册没有 uiCreator, hasUI(true) 开界面会 NPE
		settings.hasUI(false)

		// ---- B 冷却液输入仓 ----
		const coolantIn = new $FluidTankCapabilityTraitDefinition()
		coolantIn.setName("multi_type_driller_coolant_input")
		coolantIn.setRecipeHandlerIO($IO.IN)
		coolantIn.setGuiIO($IO.IN)
		coolantIn.setCapacity(COOLANT_CAPACITY)
		coolantIn.setTankSize(1)
		coolantIn.getCapabilityIO().setFrontIO($IO.IN)
		settings.traitDefinition(coolantIn)

		// ---- A 冷却液输出仓 (热冷却液 + 液泵产物) ----
		const coolantOut = new $FluidTankCapabilityTraitDefinition()
		coolantOut.setName("multi_type_driller_coolant_output")
		coolantOut.setRecipeHandlerIO($IO.OUT)
		coolantOut.setGuiIO($IO.OUT)
		coolantOut.setCapacity(COOLANT_CAPACITY)
		coolantOut.setTankSize(1)
		coolantOut.getCapabilityIO().setFrontIO($IO.OUT)
		settings.traitDefinition(coolantOut)

		// ---- C 产物输出口 (固体: 物品) ----
		const productOut = new $ItemSlotCapabilityTraitDefinition()
		productOut.setName("multi_type_driller_product_output")
		productOut.setRecipeHandlerIO($IO.OUT)
		productOut.setGuiIO($IO.OUT)
		productOut.setSlotSize(1)
		productOut.setSlotLimit(64)
		productOut.getCapabilityIO().setFrontIO($IO.OUT)
		settings.traitDefinition(productOut)

		// ---- C 产物输出口 (液体: 液泵抽出的流体) ----
		// C 口是固/液/气三者共用的输出口, 所以这里单独给一条流体输出特性,
		// 与 A 的热冷却液输出区分开:
		//   multi_type_driller_coolant_output  -> A 仓 (热冷却液, 换热回路)
		//   multi_type_driller_fluid_output    -> C 口 (抽取到的液体产物)
		const fluidOut = new $FluidTankCapabilityTraitDefinition()
		fluidOut.setName("multi_type_driller_fluid_output")
		fluidOut.setRecipeHandlerIO($IO.OUT)
		fluidOut.setGuiIO($IO.OUT)
		fluidOut.setCapacity(FLUID_CAPACITY)
		fluidOut.setTankSize(1)
		fluidOut.getCapabilityIO().setFrontIO($IO.OUT)
		settings.traitDefinition(fluidOut)

		// ---- C 产物输出口 (气体: 气泵抽出的氢气) ----
		const gasOut = new $GasTankCapabilityTraitDefinition()
		gasOut.setName("multi_type_driller_gas_output")
		gasOut.setRecipeHandlerIO($IO.OUT)
		gasOut.setGuiIO($IO.OUT)
		gasOut.setCapacity(GAS_CAPACITY)
		gasOut.setTankSize(1)
		gasOut.getCapabilityIO().setFrontIO($IO.OUT)
		settings.traitDefinition(gasOut)

		// ---- D 能量输入仓 ----
		const energyIn = new $ForgeEnergyCapabilityTraitDefinition()
		energyIn.setName("multi_type_driller_energy_input")
		energyIn.setRecipeHandlerIO($IO.IN)
		energyIn.setGuiIO($IO.IN)
		energyIn.setCapacity(ENERGY_CAPACITY)
		energyIn.setMaxReceive(ENERGY_IO)
		energyIn.setMaxExtract(0)
		energyIn.getCapabilityIO().setFrontIO($IO.IN)
		settings.traitDefinition(energyIn)

		return settings.build()
	})

	// 钻井机自己判定工作 (要读钻头下方的世界方块 / 流体), 所以关掉 MBD2 的
	// 配方引擎, 由 Running.js 按 20 tick 一个周期驱动.
	// .rt 里的内置配方负责 JEI/EMI 展示与产物池数据.
	builder.recipeLogicSettings(
		$ConfigRecipeLogicSettings.builder()
			.enable(false)
			.recipeType(MACHINE_ID)
			.build()
	)

	builder.multiblockSettings(() =>
		$ConfigMultiblockSettings.builder()
			.showUIOnlyFormed(true)
			.build()
	)

	// ------------------------------------------------------------------ 结构
	// 5(x) x 6(y) x 5(z). 每个 aisle 是一层, 层内每行是 x, 行内每个字符是 z.
	// 层字符串与磁盘 .mb 里的布局逐格一致 —— 注意 MBD2 里"一行"沿 z 展开,
	// 所以下面每行看着像"列"的那 5 个字符其实是 z 方向.
	const floor = [
		'10001',
		'00000',
		'00X00',
		'00000',
		'10001'
	]
	const core = [
		'2A#B2',
		'31113',
		'C151C',
		'31113',
		'23D32'
	]
	const cage = [
		'00000',
		'06060',
		'00500',
		'06060',
		'00000'
	]
	const neck = [
		'00000',
		'01110',
		'01510',
		'01110',
		'00000'
	]
	const cap = [
		'00000',
		'00000',
		'00500',
		'00000',
		'00000'
	]

	/**
	 * 按 id 取方块。
	 *
	 * 关键: 这里**必须**在方块未注册时报错, 不能返回 null。
	 *
	 * MBDRegistryEvents.machine 是在 MBD2 的 "Loading machines" 里触发的, 那一刻
	 * Forge 的方块注册事件还没跑, 所以 cmi:* 这些方块用 ForgeRegistries 查全是 null。
	 * 而 $Predicates.blocks(null) 不会抛异常 —— PredicateBlocks 在候选列表为空时
	 * 退化成"任何方块都通过", 于是整台机器 49 个真实格子全变通配,
	 * 表现就是"只放一个控制器也提示成型"。
	 * 所以这里返回 null 的行为必须被消灭: 查不到就抛。
	 *
	 * @param {string} id
	 * @returns {Internal.Block_}
	 */
	function blockOf(id) {
		let key = new $ResourceLocation(id)
		let block = $BuiltInRegistries.BLOCK.get(key)

		if (block == null) {
			block = $ForgeRegistries.BLOCKS.getValue(key)
		}

		if (block == null) {
			throw new Error("[driller] block not registered yet: " + id)
		}

		return block
	}

	// 注意: 下面所有 blockOf(...) 都在 blockPatternFactory / shapeInfoFactory 的
	// 回调里惰性求值 —— 那时世界已经加载, 方块肯定注册完了。
	// (直接在注册阶段求值就会踩上面说的 null 坑)

	// 钻头工位: 三种钻头 / 泵任选其一
	function buildHead() {
		return $Predicates.blocks(blockOf("cmi:driller_head"))
			.or($Predicates.blocks(blockOf("cmi:driller_fluid_pump")))
			.or($Predicates.blocks(blockOf("cmi:driller_gas_pump")))
	}

	/**
	 * 建结构 pattern。
	 *
	 * 注意 where 的 key 必须是 JS 字符串:
	 * FactoryBlockPattern.where(char, TraceabilityPredicate) 只有这一个重载,
	 * Rhino 能把 JS 字符串直接转成基本类型 char。
	 * (不能塞 java.lang.Character —— 无法转成基本类型 char, 注册会静默失败,
	 *  报 "Predicates for character(s) ... are missing")
	 *
	 * @returns {Internal.BlockPattern_}
	 */
	function buildPattern() {
		return $FactoryBlockPattern.start()
			// 顺序必须"从上往下": cap(顶盖) 在最前, floor(底座) 在最后。
			// 实测(见 probe 日志): 控制器上方 ctrl+1=脚手架, ctrl+2=轴承,
			// 说明第 1 个 aisle 落在最高层。cap 只有中心一格 00500,
			// 正是最顶上的尖顶, 所以必须放第一个。
			.aisle(cap[0], cap[1], cap[2], cap[3], cap[4])
			.aisle(neck[0], neck[1], neck[2], neck[3], neck[4])
			.aisle(cage[0], cage[1], cage[2], cage[3], cage[4])
			.aisle(cage[0], cage[1], cage[2], cage[3], cage[4])
			.aisle(core[0], core[1], core[2], core[3], core[4])
			.aisle(floor[0], floor[1], floor[2], floor[3], floor[4])
			.where('1', $Predicates.blocks(blockOf("immersiveengineering:steel_scaffolding_standard")))
			.where('2', $Predicates.blocks(blockOf("cmi:airtight_casing")))
			.where('3', $Predicates.blocks(blockOf("immersiveengineering:radiator")))
			.where('5', $Predicates.blocks(blockOf("cmi:driller_bearing")))
			.where('6', $Predicates.blocks(blockOf("immersiveengineering:steel_fence")))
			.where('X', buildHead())
			// '0' 是"占位/空气": 用 any 而不是 air()。
			// 整合包里现成的机器 (electronic_blast_furnace.mb 等) 存的也是 any,
			// 用 air() 会把这些格子变成"必须是空气"的硬性要求, 结构周围稍微压到
			// 一点东西就永远不成型。
			.where('0', $Predicates.any())
			// 两个 C 位置都放 物品/液体/气体 三个输出总线, 它们各自代理控制器上
			// 的同名特性, 所以两个 C 口的内容天然同步 —— C 就是固/液/气共用的
			// 侧面输出口.
			.where('C', $Predicates.blocks(
				blockOf(`${MACHINE_ID}_item_output_bus`),
				blockOf(`${MACHINE_ID}_fluid_output_bus`),
				blockOf(`${MACHINE_ID}_gas_output_bus`)
			))
			.where('A', $Predicates.blocks(blockOf(`${MACHINE_ID}_fluid_output_bus`)))
			.where('B', $Predicates.blocks(blockOf(`${MACHINE_ID}_fluid_input_bus`)))
			.where('D', $Predicates.blocks(blockOf(`${MACHINE_ID}_energy_input_bus`)))
			.where('#', $Predicates.controller($Predicates.any()))
			.build()
	}

	// build() 出来的是父类类型, 但运行时就是 MultiblockMachineDefinition
	/** @type {Internal.MultiblockMachineDefinition_} */
	const definition = builder.build()

	definition.blockPatternFactory(() => buildPattern())

	// 每层 5 行 (行 = x), 每行 5 个字符 (字符 = z)
	const LAYERS = [floor, core, cage, cage, neck, cap]

	/**
	 * 从层字符串直接构建 shapeInfo 的 BlockInfo[x][y][z]。
	 *
	 * 为什么不用 MultiblockShapeInfo.builder():
	 *  1) ShapeInfoBuilder.where 的重载只差第二参数 (Block / BlockState / Supplier),
	 *     Rhino 选不出来, 报 "matching JavaScript argument types (string, BlockState)
	 *     is ambiguous";
	 *  2) 更关键的是轴向不对。builder 的 bakeArray() 产生的是
	 *     [aisle][row][char] = [y][x][z], 而 PatternPreviewWidget 是按
	 *     BlockPos(posX, posY, posZ) 用 blocks[x][y][z] 取的 —— 转置了,
	 *     预览会画错。磁盘 .mb 里的 shape_info 正是 [x][y][z]。
	 * 这里干脆自己拼, 轴向显式可控。方块同样惰性解析 (见 blockOf 的注释)。
	 */
	const BLOCK_ID_BY_CHAR = {
		'1': "immersiveengineering:steel_scaffolding_standard",
		'2': "cmi:airtight_casing",
		'3': "immersiveengineering:radiator",
		'5': "cmi:driller_bearing",
		'6': "immersiveengineering:steel_fence",
		'X': "cmi:driller_head",
		'#': MACHINE_ID,
		'A': `${MACHINE_ID}_fluid_output_bus`,
		'B': `${MACHINE_ID}_fluid_input_bus`,
		'C': `${MACHINE_ID}_item_output_bus`,
		'D': `${MACHINE_ID}_energy_input_bus`	}

	// Rhino 注意: Java.loadClass("x.y.Z") 返回的是 **类本身** (静态引用),
	// 不是它的 Class 对象, 所以 $BlockInfo.class 这种写法会报
	//   Java class "com...BlockInfo" has no public instance field or method named "class"
	// 必须用 Class.forName(String) 拿 Class 对象。
	const BLOCK_INFO_CLASS = $Class.forName("com.lowdragmc.lowdraglib.utils.BlockInfo")
	const SHAPE_INFO_CLASS = $Class.forName("com.lowdragmc.mbd2.api.pattern.MultiblockShapeInfo")

	function buildShapeInfo() {
		let sizeX = LAYERS[0][0].length
		let sizeY = LAYERS.length
		let sizeZ = LAYERS[0].length

		let blocks = $Array.newInstance(BLOCK_INFO_CLASS, sizeX, sizeY, sizeZ)

		for (let y = 0; y < sizeY; y++) {
			for (let x = 0; x < sizeX; x++) {
				let row = LAYERS[y][x]
				// 多维 Java 数组不能用 JS 下标串联 (blocks[x][y] 会走 JS 语义),
				// 必须逐级用 java.lang.reflect.Array.get。
				let column = $Array.get($Array.get(blocks, x), y)

				for (let z = 0; z < sizeZ; z++) {
					let ch = row.charAt(z)
					let block = ch === '0'
						? $Blocks.AIR
						: blockOf(BLOCK_ID_BY_CHAR[ch])

					$Array.set(column, z, $BlockInfo.fromBlockState(block.defaultBlockState()))
				}
			}
		}

		return new $MultiblockShapeInfo(blocks)
	}

	// 返回值必须是 MultiblockShapeInfo[]。这里用反射显式造一个精确类型的数组,
	// 避免 JS 数组 / Object[] 在跨语言返回时的类型不确定。
	definition.shapeInfoFactory(() => {
		let array = $Array.newInstance(SHAPE_INFO_CLASS, 1)

		$Array.set(array, 0, buildShapeInfo())

		selfCheckOnce()

		return array
	})

	// ---- 自检 ----
	// 方块解析必须发生在方块注册之后, 所以自检也放进工厂回调 (只跑一次)。
	// 以前在注册阶段就求值, 拿到的是 null 方块, 于是 49 个真实格子全退化成通配,
	// 机器"只放一个控制器就成型" —— 这就是那个坑。
	let selfChecked = false

	function selfCheckOnce() {
		if (selfChecked) {
			return
		}

		selfChecked = true
		console.info("[driller] first pattern build -> blocks are registered now")

		// 读的是 shapeInfo 的 [x][y][z], 期望 x=5 y=6 z=5
		function lenOf(array, index) {
			let sub = $Array.get(array, index)

			return sub == null ? -1 : $Array.getLength(sub)
		}

		function dimsOf(array) {
			try {
				return "x=" + $Array.getLength(array)
					+ " y=" + lenOf(array, 0)
					+ " z=" + lenOf($Array.get(array, 0), 0)
			} catch (error) {
				return "n/a (" + error + ")"
			}
		}

		try {
			console.info("[driller] shapeInfo dims: " + dimsOf(buildShapeInfo().getBlocks()))
		} catch (error) {
			console.error("[driller] buildShapeInfo failed: " + error)
		}

		// ---- 真正决定成型的是 BlockPattern.blockMatches, 逐格统计谓词类型 ----
		// 期望: 49 个真实方块谓词 + 101 个通配 + 1 控制器 = 150
		// real 若为 0, 说明方块又没解析到 (整台机器变成随便摆都成型)。
		try {
			let built = buildPattern()
			let matchesField = $Class.forName("com.lowdragmc.mbd2.api.pattern.BlockPattern")
				.getDeclaredField("blockMatches")

			matchesField.setAccessible(true)

			let matches = matchesField.get(built)
			let sizeY = $Array.getLength(matches)
			let sizeX = sizeY > 0 ? $Array.getLength($Array.get(matches, 0)) : 0
			let sizeZ = sizeX > 0 ? $Array.getLength($Array.get($Array.get(matches, 0), 0)) : 0
			let cells = 0
			let controllers = 0
			let wildcard = 0
			let real = 0

			for (let y = 0; y < sizeY; y++) {
				for (let x = 0; x < sizeX; x++) {
					for (let z = 0; z < sizeZ; z++) {
						let pred = $Array.get($Array.get($Array.get(matches, y), x), z)

						if (pred == null) {
							continue
						}

						cells++

						if (pred.isController) {
							controllers++
						} else if (pred.isAny() || pred.isAir()) {
							wildcard++
						} else {
							real++
						}
					}
				}
			}

			console.info("[driller] blockMatches dims: y=" + sizeY + " x=" + sizeX + " z=" + sizeZ)
			console.info("[driller] cells=" + cells + " real=" + real
				+ " controllers=" + controllers + " wildcard=" + wildcard)
		} catch (error) {
			console.error("[driller] blockMatches dump failed: " + error)
		}
	}

	// 关键: 必须自己注册。
	// afterPosted 会对 machineBuilders 里每个 builder 各调一次 builder.build()，
	// 注册的是"它自己新造的那一个"实例 —— 直接写 builder.build() 只会得到一个
	// 没人引用的对象，blockPatternFactory 挂上去也没用，
	// 结构判定时就会报
	//   Cannot invoke "java.util.function.Function.apply(Object)"
	//   because "this.blockPatternFactory" is null
	// 所以先把它从自动注册队列里摘掉，再手动注册这一份带结构的定义。
	// (先 remove 再 register，顺序反了会把刚注册的条目删掉)
	event.removeMachine(MACHINE_ID)
	$MBDRegistries.MACHINE_DEFINITIONS.register(new $ResourceLocation(MACHINE_ID), definition)
})

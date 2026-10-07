// 多元钻井机 (multi_type_driller) —— 结构 + 特性 + 总线
//
// 本文件严格照抄整合包自带文档里的**成品实例**
//   Developer/MBD2代码注册文档/高级焦炉-KubeJS注册.md
// 那是这台整合包里已被验证可用的写法, 我之前自己造的 .sm / .mb 二进制都不如它可靠。
//
// 关键做法 (全部来自该实例):
//   1) 结构: FactoryBlockPattern, ".aisle(...) 每层一个 aisle, y=0 底 -> 顶; 行=z, 字符=x"
//   2) 总线: event.create("single", id) + ConfigPartSettings$ProxyCapability,
//      由 MBD2 自动注册 —— 不再手写 .sm
//   3) traitNameFilter 是 private 字段, 用 setPrivateField 反射设置
//   4) 纯代码注册没有 GUI 数据, 机器侧必须 hasUI(false)
//   5) 方块谓词用 KubeJS 全局 Block.getBlock(id), 由全局绑定处理注册时机

let $MachineState = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.MachineState")
let $ConfigBlockProperties = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigBlockProperties")
let $ConfigItemProperties = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigItemProperties")
let $ConfigMachineSettings = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigMachineSettings")
let $ConfigRecipeLogicSettings = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigRecipeLogicSettings")
let $ConfigPartSettings = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigPartSettings")
let $ConfigMultiblockSettings = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigMultiblockSettings")
let $RotationState = Java.loadClass("com.lowdragmc.mbd2.api.block.RotationState")
let $IO = Java.loadClass("com.lowdragmc.mbd2.api.capability.recipe.IO")
let $ItemSlotCapabilityTraitDefinition = Java.loadClass("com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTraitDefinition")
let $FluidTankCapabilityTraitDefinition = Java.loadClass("com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTraitDefinition")
let $ForgeEnergyCapabilityTraitDefinition = Java.loadClass("com.lowdragmc.mbd2.common.trait.forgeenergy.ForgeEnergyCapabilityTraitDefinition")
let $GasTankCapabilityTraitDefinition = Java.loadClass("com.lowdragmc.mbd2.integration.mekanism.trait.chemical.ChemicalTankCapabilityTraitDefinition$Gas")
let $ConfigPartSettings$ProxyCapability = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigPartSettings$ProxyCapability")
let $FactoryBlockPattern = Java.loadClass("com.lowdragmc.mbd2.api.pattern.FactoryBlockPattern")
let $Predicates = Java.loadClass("com.lowdragmc.mbd2.api.pattern.Predicates")
let $MBDRegistries = Java.loadClass("com.lowdragmc.mbd2.api.registry.MBDRegistries")
let $Shapes = Java.loadClass("net.minecraft.world.phys.shapes.Shapes")
let $Arrays = Java.loadClass("java.util.Arrays")
let $Direction = Java.loadClass("net.minecraft.core.Direction")
// shapeInfo 需要这几个 (JEI 机器页 / 结构预览)
let $Array = Java.loadClass("java.lang.reflect.Array")
let $Class = Java.loadClass("java.lang.Class")
let $BlockInfo = Java.loadClass("com.lowdragmc.lowdraglib.utils.BlockInfo")
let $MultiblockShapeInfo = Java.loadClass("com.lowdragmc.mbd2.api.pattern.MultiblockShapeInfo")
// Class 对象必须用 Class.forName(String) 取 —— Java.loadClass 返回的是"类本身",
// 没有 .class 字段可用
const $BlockInfoClass = $Class.forName("com.lowdragmc.lowdraglib.utils.BlockInfo")
const $ShapeInfoClass = $Class.forName("com.lowdragmc.mbd2.api.pattern.MultiblockShapeInfo")

const DRILLER = "cmi:multi_type_driller"
const MODEL = "cmi:block/machine/multi_type_driller"

// ---- 6 条特性的名字 (总线用 traitNameFilter 前缀匹配) ----
const T_COOLANT_IN = "multi_type_driller_coolant_input"
const T_COOLANT_OUT = "multi_type_driller_coolant_output"
const T_PRODUCT = "multi_type_driller_product_output"
const T_FLUID = "multi_type_driller_fluid_output"
const T_GAS = "multi_type_driller_gas_output"
const T_ENERGY = "multi_type_driller_energy_input"

/** 反射设置 private 字段 (MBD2 的 traitNameFilter 没有 setter) */
function setPrivateField(obj, fieldName, value) {
	const field = obj.getClass().getDeclaredField(fieldName)
	field.setAccessible(true)
	field.set(obj, value)
}

// 把 IO 设到全部六个面 (与焦炉实例里 tank 的写法一致)
function allSides(trait, io) {
	trait.getCapabilityIO().setInternal(io)
	trait.getCapabilityIO().setFrontIO(io)
	trait.getCapabilityIO().setBackIO(io)
	trait.getCapabilityIO().setLeftIO(io)
	trait.getCapabilityIO().setRightIO(io)
	trait.getCapabilityIO().setTopIO(io)
	trait.getCapabilityIO().setBottomIO(io)
	return trait
}

function machineState(name, model, light) {
	const b = $MachineState.builder().name(name).shape($Shapes.block()).lightLevel(light)
	if (model !== null) {
		b.modelRenderer(model)
	}
	return b.build()
}

// 状态树: base(off) -> formed -> (working(on) -> waiting, suspend)
function drillerStates() {
	const waiting = machineState("waiting", `${MODEL}/off`, 0)
	const suspend = machineState("suspend", null, 0)
	const working = machineState("working", `${MODEL}/on`, 0)
	const formed = $MachineState.builder().name("formed").shape($Shapes.block())
		.children($Arrays.asList(working, suspend)).build()
	return $MachineState.builder().name("base")
		.modelRenderer(`${MODEL}/off`)
		.shape($Shapes.block())
		.children($Arrays.asList(formed)).build()
}

function drillerSettings() {
	const settings = $ConfigMachineSettings.builder()
	// 纯代码注册无 GUI 数据 (uiCreator=null), hasUI(true) 开 UI 会 NPE
	settings.hasUI(false)

	const coolantIn = new $FluidTankCapabilityTraitDefinition()
	coolantIn.setName(T_COOLANT_IN)
	coolantIn.setRecipeHandlerIO($IO.IN)
	coolantIn.setGuiIO($IO.IN)
	coolantIn.setCapacity(512000)
	coolantIn.setTankSize(1)
	settings.traitDefinition(allSides(coolantIn, $IO.IN))

	const coolantOut = new $FluidTankCapabilityTraitDefinition()
	coolantOut.setName(T_COOLANT_OUT)
	coolantOut.setRecipeHandlerIO($IO.OUT)
	coolantOut.setGuiIO($IO.OUT)
	coolantOut.setCapacity(512000)
	coolantOut.setTankSize(1)
	settings.traitDefinition(allSides(coolantOut, $IO.OUT))

	const product = new $ItemSlotCapabilityTraitDefinition()
	product.setName(T_PRODUCT)
	product.setRecipeHandlerIO($IO.OUT)
	product.setGuiIO($IO.OUT)
	product.setSlotSize(1)
	product.setSlotLimit(64)
	settings.traitDefinition(allSides(product, $IO.OUT))

	const fluid = new $FluidTankCapabilityTraitDefinition()
	fluid.setName(T_FLUID)
	fluid.setRecipeHandlerIO($IO.OUT)
	fluid.setGuiIO($IO.OUT)
	fluid.setCapacity(64000)
	fluid.setTankSize(1)
	settings.traitDefinition(allSides(fluid, $IO.OUT))

	const gas = new $GasTankCapabilityTraitDefinition()
	gas.setName(T_GAS)
	gas.setRecipeHandlerIO($IO.OUT)
	gas.setGuiIO($IO.OUT)
	gas.setCapacity(64000)
	gas.setTankSize(1)
	settings.traitDefinition(allSides(gas, $IO.OUT))

	const energy = new $ForgeEnergyCapabilityTraitDefinition()
	energy.setName(T_ENERGY)
	energy.setRecipeHandlerIO($IO.IN)
	energy.setGuiIO($IO.IN)
	energy.setCapacity(100000)
	energy.setMaxReceive(10000)
	energy.setMaxExtract(0)
	settings.traitDefinition(allSides(energy, $IO.IN))

	return settings.build()
}

// 结构
//
// ★ 轴约定 —— 从 MBD2 字节码确证, 不要再猜 ★
//   FactoryBlockPattern.start() 传入的 structureDir 是 (LEFT, UP, FRONT),
//   RelativeDirection 静态初始化里写死了:
//        LEFT  -> Direction.Axis.X
//        UP    -> Direction.Axis.Y
//        FRONT -> Direction.Axis.Z
//   所以 build() 出来的数组是 [X][Y][Z]:
//        .aisle(..) 的**调用次数**     = X 方向长度
//        每个 aisle 里的**字符串个数** = Y 方向长度 (层数)
//        每个字符串的**字符个数**      = Z 方向长度
//
//   这正是"机器反了"的根因: 我把 6 个层当成了 aisle 次数 (放到了 X 上),
//   于是 y/z 互换, 尺寸显示成 2 2 3 而不是 2 3 2。
//
// 规格: 6 层 (L0..L5), 每层 5x5, 行 = x, 字符 = z
//   -> aisle 次数 = z (5), 每个 aisle 的字符串 = x (5), 字符 = y (6)
//
// 朝向: 这套层数据在 x 与 z 上都是**各自镜像对称**的
//   (例如 L1 的 "2A#B2" 镜像后等于 "23D32", "C151C" 镜像后等于自身),
//   所以"整体转 180 度"不会改变任何东西 —— 唯一能翻转机器正反面的操作是
//   **只镜像一个水平轴**。这里镜像 z (即把每行字符串反过来)。
//
//   若要翻回另一面: 把下面 DRILLER_MIRROR_Z 改成 false 即可 (这是唯一的朝向开关)。
const DRILLER_MIRROR_Z = true

const DRILLER_RAW_LAYERS = [
	["10001", "00000", "00X00", "00000", "10001"],   // 规格 L0 (钻头夹具)
	["2A#B2", "31113", "C151C", "31113", "23D32"],   // 规格 L1 (控制器层)
	["00000", "06060", "00500", "06060", "00000"],   // 规格 L2
	["00000", "06060", "00500", "06060", "00000"],   // 规格 L3
	["00000", "01110", "01510", "01110", "00000"],   // 规格 L4
	["00000", "00000", "00500", "00000", "00000"]    // 规格 L5 (尖顶)
]

// 按需镜像 z
// 注意: 不要用 "abc".split("").reverse().join("") —— Rhino 里 Java String.split
// 返回的是 Java 数组, 不一定有 reverse()。用 charAt 显式反向, 行为确定。
var DRILLER_LAYERS = []
var drillerMk = 0
var drillerMkRow = ""
var drillerMkOut = ""
var drillerMkC = 0
for (drillerMk = 0; drillerMk < DRILLER_RAW_LAYERS.length; drillerMk++) {
	var drillerMkLayer = []
	var drillerMkX = 0
	for (drillerMkX = 0; drillerMkX < DRILLER_RAW_LAYERS[drillerMk].length; drillerMkX++) {
		drillerMkRow = DRILLER_RAW_LAYERS[drillerMk][drillerMkX]

		if (DRILLER_MIRROR_Z) {
			drillerMkOut = ""
			for (drillerMkC = drillerMkRow.length - 1; drillerMkC >= 0; drillerMkC--) {
				drillerMkOut += drillerMkRow.charAt(drillerMkC)
			}
			drillerMkRow = drillerMkOut
		}

		drillerMkLayer.push(drillerMkRow)
	}
	DRILLER_LAYERS.push(drillerMkLayer)
}

const DRILLER_SIZE = DRILLER_LAYERS[0].length

// 控制器朝向: 开启后结构只在该朝向时成型 (见 drillerControllerPredicate 的说明)
// 若朝向仍反, 改成 false 即可回到"任意水平朝向都能成型"的行为
const DRILLER_FIX_CONTROLLER_FRONT = true
const DRILLER_CONTROLLER_FRONT = $Direction.SOUTH

function drillerPattern() {
	// ★ Rhino 作用域注意 (踩过两次) ★
	//   1) 循环变量名不要叫 aisle —— 该名字已被引擎绑定占用, 报
	//        TypeError: redeclaration of var aisle
	//   2) Rhino 不给循环体独立作用域, 循环里用 const/let 声明会在第二轮迭代时
	//        报 TypeError: redeclaration of var <name>
	//      所以函数体内一律用 var (函数级作用域, 重复进入同一函数也安全),
	//      并且把转置放在函数里算, 不在顶层循环。
	//
	// 轴约定 (从 MBD2 字节码确证):
	//   FactoryBlockPattern.start() 的 structureDir = (LEFT, UP, FRONT)
	//   RelativeDirection: LEFT->Axis.X, UP->Axis.Y, FRONT->Axis.Z
	//   故 build() 出来的数组是 [X][Y][Z]:
	//       .aisle(..) 的调用次数      = X 长度
	//       每个 aisle 里的字符串个数  = Y 长度 (层数)
	//       每个字符串的字符个数       = Z 长度
	//   规格 6 层 x 5 x 5, 行 = x, 字符 = z
	//   => aisle 次数 = z(5), 字符串 = x(5), 字符 = y(6)
	//      Q[m][k].charAt(t) == DRILLER_LAYERS[k][m].charAt(t)   (x=m, y=k, z=t)
	var Q = []
	var x = 0
	var y = 0
	var z = 0
	var str = ""

	for (x = 0; x < DRILLER_SIZE; x++) {
		var col = []

		for (y = 0; y < DRILLER_LAYERS.length; y++) {
			str = ""

			for (z = 0; z < DRILLER_SIZE; z++) {
				str += DRILLER_LAYERS[y][x].charAt(z)
			}

			col.push(str)
		}

		Q.push(col)
	}

	var B = (id) => Block.getBlock(id)
	return $FactoryBlockPattern.start()
		.aisle(Q[0][0], Q[0][1], Q[0][2], Q[0][3], Q[0][4])
		.aisle(Q[1][0], Q[1][1], Q[1][2], Q[1][3], Q[1][4])
		.aisle(Q[2][0], Q[2][1], Q[2][2], Q[2][3], Q[2][4])
		.aisle(Q[3][0], Q[3][1], Q[3][2], Q[3][3], Q[3][4])
		.aisle(Q[4][0], Q[4][1], Q[4][2], Q[4][3], Q[4][4])
		.where("1", $Predicates.blocks(B("immersiveengineering:steel_scaffolding_standard")))
		.where("2", $Predicates.blocks(B("cmi:airtight_casing")))
		.where("3", $Predicates.blocks(B("immersiveengineering:radiator")))
		.where("5", $Predicates.blocks(B("cmi:driller_bearing")))
		.where("6", $Predicates.blocks(B("immersiveengineering:steel_fence")))
		.where("0", $Predicates.any())
		// 钻头工位: 钻头 / 液泵 / 气泵 三选一
		.where("X", $Predicates.blocks(B("cmi:driller_head"))
			.or($Predicates.blocks(B("cmi:driller_fluid_pump")))
			.or($Predicates.blocks(B("cmi:driller_gas_pump"))))
		// A 热冷却液输出   B 冷却液输入   D 能量输入
		.where("A", $Predicates.blocks(B(`${DRILLER}_coolant_output_bus`)))
		.where("B", $Predicates.blocks(B(`${DRILLER}_coolant_input_bus`)))
		.where("D", $Predicates.blocks(B(`${DRILLER}_energy_input_bus`)))
		// C 固/液/气共用的输出口: 物品 / 液体 / 气体 三个总线任选其一
		.where("C", $Predicates.blocks(B(`${DRILLER}_product_output_bus`))
			.or($Predicates.blocks(B(`${DRILLER}_fluid_output_bus`)))
			.or($Predicates.blocks(B(`${DRILLER}_gas_output_bus`))))
		.where("#", $Predicates.controller(drillerControllerPredicate()))
		.build()
}

/**
 * 控制器的谓词。
 *
 * ★ 控制器朝向问题的正解 ★
 *
 * MBD2 的 SimplePredicate.test() 里有一段 (字节码确证):
 *
 *     if (controllerFront.isEnable()) {
 *         Optional<Direction> f = controller.getFrontFacing();
 *         if (f.isPresent() && f.get() != controllerFront.getValue()) {
 *             state.setError("The Controller Front side fails to match");
 *             return false;        // 结构不成型
 *         }
 *     }
 *
 * 也就是 controllerFront 是**结构侧的硬性要求**: 开启后, 只有控制器朝向
 * 指定方向时结构才会成型。
 *
 * 现象是"控制器朝向机器内侧才能成型、贴图看起来是反面", 说明 pattern 的
 * 参考朝向与方块前脸差 180 度。所以这里把要求锁成 SOUTH:
 * 控制器必须朝向 +Z 才能成型, 而玩家面朝机器放置时正好就是 +Z ——
 * 于是"成型的那一面"就是视觉正面, 朝向不再反过来。
 *
 * 若仍然反: 把 DRILLER_CONTROLLER_FRONT 改成 $Direction.NORTH 即可 (唯一开关)。
 *
 * @returns {Internal.TraceabilityPredicate_}
 */
function drillerControllerPredicate() {
	var pred = $Predicates.controller($Predicates.any())

	if (DRILLER_FIX_CONTROLLER_FRONT) {
		var common = pred.common

		if (common != null && common.size() > 0) {
			var toggle = common.get(0).controllerFront

			if (toggle != null) {
				toggle.setEnable(true)
				toggle.setValue(DRILLER_CONTROLLER_FRONT)
			}
		}
	}

	return pred
}

// ---- shapeInfo (JEI 机器页 / 结构预览) ----
// 必须显式提供: 为 null 时 PatternPreviewWidget 构造会抛
//   NullPointerException: ...MultiblockMachineDefinition.shapeInfoFactory() is null
// 而 JEI 的 MultiblockInfoCategory.registerRecipes 会遍历所有机器定义来建预览,
// 一台机器抛异常就中断整个 MBDJEIPlugin.registerRecipes ——
// 表现就是**所有 MBD2 多方块的 JEI 配方一起消失**。所以这里绝不能省。
//
// 数组索引是 [x][y][z] —— PatternPreviewWidget 按 BlockPos(posX,posY,posZ) 取。
// 直接复用 DRILLER_LAYERS, 保证预览与实机**完全一致**:
//   blocks[x][y][z] = DRILLER_LAYERS[y][x].charAt(z)
const SHAPE_BLOCK_BY_CHAR = {
	"0": () => Blocks.AIR,
	"1": () => Block.getBlock("immersiveengineering:steel_scaffolding_standard"),
	"2": () => Block.getBlock("cmi:airtight_casing"),
	"3": () => Block.getBlock("immersiveengineering:radiator"),
	"5": () => Block.getBlock("cmi:driller_bearing"),
	"6": () => Block.getBlock("immersiveengineering:steel_fence"),
	"X": () => Block.getBlock("cmi:driller_head"),
	"#": () => Block.getBlock(DRILLER),
	"A": () => Block.getBlock(`${DRILLER}_coolant_output_bus`),
	"B": () => Block.getBlock(`${DRILLER}_coolant_input_bus`),
	"C": () => Block.getBlock(`${DRILLER}_product_output_bus`),
	"D": () => Block.getBlock(`${DRILLER}_energy_input_bus`)
}

function drillerShapeInfo() {
	// 同样注意 Rhino 作用域: 循环体内一律用 var, 用 const/let 会在第二轮迭代
	// 报 TypeError: redeclaration of var <name>
	var blocks = $Array.newInstance($BlockInfoClass,
		DRILLER_SIZE, DRILLER_LAYERS.length, DRILLER_SIZE)
	var x = 0
	var y = 0
	var z = 0
	var row = ""
	var column = null
	var block = null

	for (y = 0; y < DRILLER_LAYERS.length; y++) {
		for (x = 0; x < DRILLER_SIZE; x++) {
			row = DRILLER_LAYERS[y][x]
			// 多维 Java 数组不能用 JS 下标串联, 逐级用 Array.get
			column = $Array.get($Array.get(blocks, x), y)

			for (z = 0; z < DRILLER_SIZE; z++) {
				block = SHAPE_BLOCK_BY_CHAR[row.charAt(z)]()

				$Array.set(column, z, $BlockInfo.fromBlockState(block.defaultBlockState()))
			}
		}
	}

	return new $MultiblockShapeInfo(blocks)
}

// ---- 多方块控制器 ----
MBDRegistryEvents.machine(event => {
	/** @type {Internal.MultiblockMachineDefinition$Builder_} */
	const builder = event.create("multiblock", DRILLER)

	builder.rootState(drillerStates())
	builder.blockProperties(
		$ConfigBlockProperties.builder().destroyTime(3).rotationState($RotationState.NON_Y_AXIS).build()
	)
	builder.itemProperties($ConfigItemProperties.builder().maxStackSize(64).isGui3d(true).build())
	builder.machineSettings(() => drillerSettings())
	// 钻井机自己判定工作 (要读钻头下方的世界方块/流体), 关掉 MBD2 配方引擎,
	// 由 Running.js 按 20 tick 一个周期驱动; .rt 只负责 JEI/EMI 与产物池数据
	builder.recipeLogicSettings(
		$ConfigRecipeLogicSettings.builder().enable(false).recipeType(DRILLER).build()
	)
	builder.multiblockSettings(() =>
		$ConfigMultiblockSettings.builder().showUIOnlyFormed(true).showUIWhenClickStructure(true).build()
	)

	// 结构四步: 摘队列 -> build -> 挂 pattern/shapeInfo -> 手动注册
	event.removeMachine(DRILLER)
	/** @type {Internal.MultiblockMachineDefinition_} */
	const def = builder.build()
	def.blockPatternFactory((machine) => drillerPattern())
	def.shapeInfoFactory(() => {
		const array = $Array.newInstance($ShapeInfoClass, 1)

		$Array.set(array, 0, drillerShapeInfo())

		return array
	})
	$MBDRegistries.MACHINE_DEFINITIONS.register(DRILLER, def)
})

// ---- 6 个总线 (单方块部件, 交给事件自动注册) ----
/**
 * @param {$MBDRegistryKubeEvent_} event
 * @param {string} id
 * @param {string} model
 * @param {string} traitFilter
 * @param {*} io
 * @param {number} interval
 */
function registerDrillerBus(event, id, model, traitFilter, io, interval) {
	const builder = event.create("single", id)
	builder.rootState(machineState("base", model, 0))
	builder.blockProperties($ConfigBlockProperties.builder().destroyTime(3).rotationState($RotationState.NON_Y_AXIS).build())
	builder.itemProperties($ConfigItemProperties.builder().maxStackSize(64).isGui3d(true).build())
	builder.machineSettings(() => $ConfigMachineSettings.builder().hasUI(false).build())
	builder.recipeLogicSettings(
		$ConfigRecipeLogicSettings.builder().enable(false).recipeType("mbd2:dummy").build()
	)
	builder.partSettings(() => {
		const proxy = new $ConfigPartSettings$ProxyCapability()
		setPrivateField(proxy, "traitNameFilter", traitFilter)
		proxy.capabilityIO().setInternal(io)
		proxy.capabilityIO().setFrontIO(io)
		proxy.capabilityIO().setBackIO($IO.NONE)
		proxy.capabilityIO().setLeftIO($IO.NONE)
		proxy.capabilityIO().setRightIO($IO.NONE)
		proxy.capabilityIO().setTopIO($IO.NONE)
		proxy.capabilityIO().setBottomIO($IO.NONE)
		proxy.autoIO().setEnable(true)
		proxy.autoIO().setInterval(interval)
		proxy.autoIO().setFrontIO(io)
		proxy.autoIO().setBackIO($IO.NONE)
		proxy.autoIO().setLeftIO($IO.NONE)
		proxy.autoIO().setRightIO($IO.NONE)
		proxy.autoIO().setTopIO($IO.NONE)
		proxy.autoIO().setBottomIO($IO.NONE)

		const part = $ConfigPartSettings.builder()
		part.enable(true)
		part.canShare(true)
		part.proxyControllerCapabilities($Arrays.asList(proxy))
		return part.build()
	})
}

MBDRegistryEvents.machine(event => {
	registerDrillerBus(event, `${DRILLER}_coolant_input_bus`,
		`${MODEL}/fluid_input`, T_COOLANT_IN, $IO.IN, 1)
})
MBDRegistryEvents.machine(event => {
	registerDrillerBus(event, `${DRILLER}_coolant_output_bus`,
		`${MODEL}/fluid_output`, T_COOLANT_OUT, $IO.OUT, 20)
})
MBDRegistryEvents.machine(event => {
	registerDrillerBus(event, `${DRILLER}_product_output_bus`,
		`${MODEL}/item_output`, T_PRODUCT, $IO.OUT, 20)
})
MBDRegistryEvents.machine(event => {
	registerDrillerBus(event, `${DRILLER}_fluid_output_bus`,
		`${MODEL}/fluid_output`, T_FLUID, $IO.OUT, 20)
})
MBDRegistryEvents.machine(event => {
	registerDrillerBus(event, `${DRILLER}_gas_output_bus`,
		`${MODEL}/gas_output`, T_GAS, $IO.OUT, 20)
})
MBDRegistryEvents.machine(event => {
	registerDrillerBus(event, `${DRILLER}_energy_input_bus`,
		`${MODEL}/energy_input`, T_ENERGY, $IO.IN, 1)
})
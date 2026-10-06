// 多元钻井机 (multi_type_driller) 的三模式运行逻辑.
//
//   钻头  cmi:driller_head       -> 读钻头正下方方块; 命中 create_rns 矿点则按该矿点产物池产出
//   液泵  cmi:driller_fluid_pump -> 读钻头正下方流体; 在 #create:bottomless/allow 内则无限产出
//   气泵  cmi:driller_gas_pump   -> 钻头正下方是 cmi:mercury_geothermal_vent 时无限产出 mekanism:hydrogen
//
// 每个工作周期 20 tick, 一次产出:
//   冷却液 neoecoae:cryotheum_solution 1 mB          -> 热冷却液 cmi:hot_cryotheum_solution 1 mB
//   能量 100 FE
//
// 产物池规则 (按需求): 该矿点的 create_rns 采矿配方里 **所有催化剂档位** 的全部
// yield 条目, 每条占一票, 等概率抽一个. 重复出现的产物不去重, 所以常见副产物
// (如 cobblestone)按出现次数获得更高权重.
// 产物池直接读自 ldlib/assets/mbd2/recipe_type/multi_type_driller.rt,
// 不会和 RnsMining.js 里的定义脱钩.
//
// 输出口 (与 .mb 中 7 个仓室对应):
//   物品 -> C 产物输出口  multi_type_driller_product_output
//   流体 -> A 冷却液输出仓 multi_type_driller_coolant_output (热冷却液 / 液泵产出共用)
//   气体 -> C 产物输出口  multi_type_driller_gas_output

const DRILLER_MACHINE_ID = "cmi:multi_type_driller"

const DRILLER_HEAD = "cmi:driller_head"
const DRILLER_FLUID_PUMP = "cmi:driller_fluid_pump"
const DRILLER_GAS_PUMP = "cmi:driller_gas_pump"
const MERCURY_GEOTHERMAL_VENT = "cmi:mercury_geothermal_vent"

const COOLANT_FLUID = "neoecoae:cryotheum_solution"
const HOT_COOLANT_FLUID = "cmi:hot_cryotheum_solution"
const HYDROGEN_GAS = "mekanism:hydrogen"
const BOTTOMLESS_FLUID_TAG = "create:bottomless/allow"

const COOLANT_RATE = 1
const ENERGY_RATE = 100
const PUMP_OUTPUT = 100
const DURATION = 20

const COOLANT_INPUT_TRAIT = "multi_type_driller_coolant_input"
const COOLANT_OUTPUT_TRAIT = "multi_type_driller_coolant_output"
const PRODUCT_OUTPUT_TRAIT = "multi_type_driller_product_output"
const FLUID_OUTPUT_TRAIT = "multi_type_driller_fluid_output"
const GAS_OUTPUT_TRAIT = "multi_type_driller_gas_output"
const ENERGY_INPUT_TRAIT = "multi_type_driller_energy_input"

// 兜底用的纸面偏移: 结构未成型时找不到钻头, 就按这个猜一格.
// 正常路径不走这里 —— 走 findPatternCell 拿钻头的真实世界坐标。
const HEAD_BELOW = 3

// 每台机器只打一次诊断日志, 用字符串键 (BlockPos 每次都新建对象, 不能当 WeakMap 键)
const DIAG_ONCE = new Set()

/**
 * 找出 pattern 里某个格子对应的世界坐标。
 *
 * 做法: 用 MultiblockState.posCache (pattern 判定时逐格算出的世界坐标, 顺序与
 * blockMatches 的 [aisle][row][char] 三重循环一致), 逐格读该坐标上的方块,
 * 谁是我们想要的那个方块 id, 就返回它。
 *
 * 这样完全不用手推轴向 —— 之前正是在"控制器上方/下方/侧面"这一步反复搞错,
 * 因为 FactoryBlockPattern 的 aisle/row/char 到世界 XYZ 的映射不直观。
 *
 * @param {*} state MultiblockState
 * @param {string} blockId 目标方块 id
 * @returns {Internal.BlockPos_|null}
 */
function findPatternCell(state, blockId) {
	if (state == null) {
		return null
	}

	try {
		let cache = state.getCache()

		if (cache == null) {
			return null
		}

		let list = new java.util.ArrayList(cache)

		for (let i = 0; i < list.size(); i++) {
			let pos = list.get(i)

			if (level.getBlockState(pos).getBlock().getId() === blockId) {
				return pos
			}
		}
	} catch (error) {
		console.error("[driller] findPatternCell failed: " + error)
	}

	return null
}

/**
 * 打印 pattern 关键格子相对控制器的世界偏移。
 *
 * 直接用 posCache 找到每个关键方块的真实位置, 算出相对控制器的 (dx,dy,dz),
 * 把"结构要求的偏移"落到纸面上。
 *
 * @param {Internal.MBDMachine_} machine
 * @param {*} state
 */
function dumpPatternOffsets(machine, state) {
	try {
		let cache = state == null ? null : state.getCache()

		if (cache == null || cache.isEmpty()) {
			console.info("[driller] offsets: posCache empty (structure not checked)")

			return
		}

		let ctrl = machine.getPos()
		let parts = []

		for (let id of [DRILLER_HEAD, DRILLER_FLUID_PUMP, DRILLER_GAS_PUMP,
			`${DRILLER_MACHINE_ID}_coolant_input_bus`,
			`${DRILLER_MACHINE_ID}_coolant_output_bus`,
			`${DRILLER_MACHINE_ID}_energy_input_bus`,
			`${DRILLER_MACHINE_ID}_item_output_bus`]) {
			let pos = findPatternCell(state, id)

			if (pos == null) {
				parts.push(id.substring(id.indexOf(':') + 1) + "=MISSING")
				continue
			}

			parts.push(id.substring(id.indexOf(':') + 1)
				+ "@(" + (pos.getX() - ctrl.getX())
				+ "," + (pos.getY() - ctrl.getY())
				+ "," + (pos.getZ() - ctrl.getZ()) + ")")
		}

		console.info("[driller] offsets: " + parts.join(" || "))
	} catch (error) {
		console.error("[driller] dumpPatternOffsets failed: " + error)
	}
}

/**
 * 取 PatternError 的可读文本。
 *
 * PatternError 的 getTooltips() 是 protected, 且它的 toString() 只有对象地址,
 * 所以要反射调用 (setAccessible) 再拼接。
 *
 * @param {*} error
 * @returns {string}
 */
function patternErrorText(error) {
	if (error == null) {
		return "none"
	}

	try {
		let cls = error.getClass()
		let tips = null

		// getTooltips() 在 protected 层, 逐级往上找
		while (cls != null && tips == null) {
			for (let m of cls.getDeclaredMethods()) {
				if (m.getName() === "getTooltips" && m.getParameterTypes().length === 0) {
					m.setAccessible(true)
					tips = m.invoke(error)
					break
				}
			}

			cls = cls.getSuperclass()
		}

		if (tips == null) {
			return String(error)
		}

		let parts = []

		for (let i = 0; i < tips.size(); i++) {
			parts.push(String(tips.get(i).getString()))
		}

		return parts.join(" | ")
	} catch (failure) {
		return "unreadable(" + error.getClass().getSimpleName() + ": " + failure + ")"
	}
}

// 注意: 命名不能和 kubejs/server_scripts/utils/Function.js 撞车 ——
// KubeJS 把所有 server_scripts 放在同一个顶层作用域, 顶层 let/const 重复声明
// 会直接报 "redeclaration of var X" (Function.js:6 已经声明了 $Gas).
const $FluidStack = Java.loadClass("com.lowdragmc.lowdraglib.side.fluid.FluidStack")
const $DrillerGasStack = Java.loadClass("mekanism.api.chemical.gas.GasStack")
const $DrillerGas = Java.loadClass("mekanism.api.chemical.gas.Gas")
const $LiquidBlock = Java.loadClass("net.minecraft.world.level.block.LiquidBlock")
const $DrillerResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation")
const $ItemSlotCapabilityTrait =
	Java.loadClass("com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTrait")
const $FluidTankCapabilityTrait =
	Java.loadClass("com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTrait")
const $ForgeEnergyCapabilityTrait =
	Java.loadClass("com.lowdragmc.mbd2.common.trait.forgeenergy.ForgeEnergyCapabilityTrait")
const $ChemicalTankGasTrait =
	Java.loadClass("com.lowdragmc.mbd2.integration.mekanism.trait.chemical.ChemicalTankCapabilityTraitDefinition$Gas")
const $ItemRecipeCapability =
	Java.loadClass("com.lowdragmc.mbd2.common.capability.recipe.ItemRecipeCapability")
const $FluidRecipeCapability =
	Java.loadClass("com.lowdragmc.mbd2.common.capability.recipe.FluidRecipeCapability")
const $MBDRegistries = Java.loadClass("com.lowdragmc.mbd2.api.registry.MBDRegistries")

const DRILLER_RECIPE_TYPE = $MBDRegistries.RECIPE_TYPES.get(
	new $DrillerResourceLocation(DRILLER_MACHINE_ID)
)

/**
 * 机器 id 是否为多元钻井机
 *
 * @param {Internal.MBDMachine_} machine
 * @returns {boolean}
 */
function isMultiTypeDriller(machine) {
	if (machine == null) {
		return false
	}

	// 注意: MBDMachineDefinition 上的取 id 方法是 id() (返回 ResourceLocation),
	// 没有 getId() —— 用错的话每 tick 都抛
	// "Cannot find function getId in object MBDMachineDefinition",
	// 整个 onTick 直接失效, 表现为"几乎丢失所有功能".
	let definition = machine.getDefinition()

	if (definition == null) {
		return false
	}

	return String(definition.id()) === DRILLER_MACHINE_ID
}

/**
 * 钻头"咬"下去的那一格世界坐标 = 钻头方块正下方 1 格。
 *
 * 这里必须由钻头的**实际世界坐标**推出, 不能用纸面偏移:
 * 实测钻头会出现在控制器西侧 (日志 H: w=cmi:driller_head), 说明 pattern 的
 * aisle/row/char 到世界 XYZ 并非直觉上的"上下"。所以统一从 pattern 缓存里
 * 拿到钻头位置, 再往下推一格。
 *
 * @param {Internal.MBDMachine_} machine
 * @param {Internal.BlockPos_} headPos findPatternCell 找到的钻头位置
 * @returns {Internal.BlockPos_}
 */
function getDrillPos(machine, headPos) {
	if (headPos != null) {
		return headPos.below(1)
	}

	// 兜底: 结构没成型时按纸面偏移猜一个
	return machine.getPos().below(HEAD_BELOW)
}

/**
 * 取机器特性; 未定义时返回 null 并记一次日志
 *
 * @param {Internal.MBDMachine_} machine
 * @param {*} traitClass
 * @param {string} name
 * @returns {*}
 */
function getTrait(machine, traitClass, name) {
	try {
		return machine.getTraitByName(traitClass, name)
	} catch (error) {
		console.error("[multi_type_driller] 读取特性 " + name + " 失败: " + error)
		return null
	}
}

/**
 * 该流体 id 是否在 #create:bottomless/allow 里
 *
 * @param {Internal.Fluid_} fluid
 * @returns {boolean}
 */
function isBottomlessFluid(fluid) {
	let key = fluid.getRegistryName()

	if (key == null) {
		return false
	}

	let tag = TagKey.create(
		Java.loadClass("net.minecraft.core.registries.Registries").FLUID,
		new $DrillerResourceLocation(BOTTOMLESS_FLUID_TAG)
	)

	return fluid.is(tag)
}

/**
 * 钻头正下方的流体; 不是流体源则返回 null
 *
 * @param {Internal.Level_} level
 * @param {Internal.BlockPos_} pos
 * @returns {Internal.Fluid_ | null}
 */
function getWorldFluid(level, pos) {
	let state = level.getBlockState(pos)

	if (!(state.getBlock() instanceof $LiquidBlock)) {
		return null
	}

	let fluidState = state.getFluidState()

	if (fluidState == null || fluidState.isEmpty()) {
		return null
	}

	return fluidState.getType()
}

/**
 * 塞一个物品进 C 产物输出口
 *
 * @param {Internal.MBDMachine_} machine
 * @param {string} itemId
 * @returns {boolean}
 */
function pushProduct(machine, itemId) {
	let output = getTrait(machine, $ItemSlotCapabilityTrait, PRODUCT_OUTPUT_TRAIT)

	if (output == null) {
		return false
	}

	let transfer = output.storage
	let stack = Item.of(itemId)

	for (let slot = 0; slot < transfer.getSlots(); slot++) {
		if (transfer.insertItem(slot, stack, true, false).isEmpty()) {
			transfer.insertItem(slot, stack, false, false)
			return true
		}
	}

	return false
}

/**
 * 塞流体进 C 产物输出口的液体仓 (液泵抽出来的液体)
 *
 * C 口是固/液/气三者共用的输出口, 所以液泵产物走 multi_type_driller_fluid_output,
 * 而热冷却液走 A 仓的 multi_type_driller_coolant_output (换热回路, 与产物分开)。
 *
 * @param {Internal.MBDMachine_} machine
 * @param {Internal.Fluid_} fluid
 * @param {number} amount
 * @returns {boolean}
 */
function pushFluid(machine, fluid, amount) {
	let output = getTrait(machine, $FluidTankCapabilityTrait, FLUID_OUTPUT_TRAIT)

	if (output == null) {
		return false
	}

	let tank = output.storages[0]
	let contain = tank.getFluid()

	if (contain.getAmount() > 0 && contain.getFluid() !== fluid) {
		return false
	}

	let stack = $FluidStack.create(fluid, amount)

	if (tank.fill(stack, true) < amount) {
		return false
	}

	tank.fill(stack, false)

	return true
}

/**
 * 塞气体进 C 产物输出口的气体仓
 *
 * @param {Internal.MBDMachine_} machine
 * @param {string} gasId
 * @param {number} amount
 * @returns {boolean}
 */
function pushGas(machine, gasId, amount) {
	let output = getTrait(machine, $ChemicalTankGasTrait, GAS_OUTPUT_TRAIT)

	if (output == null) {
		return false
	}

	let gas = $DrillerGas.getFromRegistry(new $DrillerResourceLocation(gasId))

	if (gas == null || gas.isEmptyType()) {
		return false
	}

	let tank = output.storages[0]

	if (tank.insert(new $DrillerGasStack(gas, amount), true) < amount) {
		return false
	}

	tank.insert(new $DrillerGasStack(gas, amount), false)

	return true
}

/**
 * 该矿点的产物池: 每条 yield 里的每个物品各占一票, 不去重
 *
 * @param {string} blockId
 * @returns {string[]}
 */
function getProductPool(blockId) {
	if (DRILLER_RECIPE_TYPE == null) {
		return []
	}

	for (let entry of DRILLER_RECIPE_TYPE.getBuiltinRecipes().entrySet()) {
		let recipe = entry.getValue()
		let data = recipe.data

		if (data == null || !data.contains("deposit_block")) {
			continue
		}

		if (data.getString("deposit_block") !== blockId) {
			continue
		}

		let pool = []

		recipe.getOutputContents($ItemRecipeCapability.INSTANCE).forEach((content) => {
			let inner = content.getContent()
			let ingredient = inner.ingredient != null ? inner.ingredient : inner

			if (ingredient == null) {
				return
			}

			ingredient.getItems().forEach((stack) => {
				if (!stack.isEmpty()) {
					pool.push(stack.getId())
				}
			})
		})

		return pool
	}

	return []
}

MBDMachineEvents.onTick(($) => {
	let event = $.getEvent()
	let machine = event.getMachine()

	if (!isMultiTypeDriller(machine)) {
		return
	}

	let level = machine.getLevel()

	if (level == null || level.isClientSide()) {
		return
	}

	// 每 20 tick 一个工作周期
	if (machine.getOffsetTimer() % DURATION !== 0) {
		return
	}

	// ---- 诊断 ----
	// 只在每台机器第一次进入周期时打印一次。
	// 注意: machine.getPos() 每次返回新的 BlockPos 对象, 用 WeakMap 当键去重无效,
	// 必须用字符串键。
	let state = machine.getMultiblockState()
	let formed = machine.isFormed()
	let key = "driller@" + machine.getPos()

	if (!DIAG_ONCE.has(key)) {
		DIAG_ONCE.add(key)

		// PatternError 的文本要反射取: 它是受保护的 getTooltips(),
		// 直接 String(error) 只有一个无用的对象地址。
		let errText = "none"

		if (state != null && state.hasError()) {
			errText = patternErrorText(state.error)
		}

		console.info("[driller] pos=" + machine.getPos()
			+ " facing=" + machine.getFrontFacing()
			+ " formed=" + formed
			+ " parts=" + (machine.getPartPositions() != null ? machine.getPartPositions().length : -1)
			+ " error=" + errText)
		console.info("[driller] V: ctrl-3=" + level.getBlockState(machine.getPos().below(3)).getBlock().getId()
			+ " | ctrl-2=" + level.getBlockState(machine.getPos().below(2)).getBlock().getId()
			+ " | ctrl-1=" + level.getBlockState(machine.getPos().below(1)).getBlock().getId()
			+ " | ctrl=" + level.getBlockState(machine.getPos()).getBlock().getId()
			+ " | ctrl+1=" + level.getBlockState(machine.getPos().above(1)).getBlock().getId()
			+ " | ctrl+2=" + level.getBlockState(machine.getPos().above(2)).getBlock().getId())
		console.info("[driller] H: n=" + level.getBlockState(machine.getPos().north()).getBlock().getId()
			+ " | s=" + level.getBlockState(machine.getPos().south()).getBlock().getId()
			+ " | w=" + level.getBlockState(machine.getPos().west()).getBlock().getId()
			+ " | e=" + level.getBlockState(machine.getPos().east()).getBlock().getId())

		// ---- 结构要求 vs 实际摆放 ----
		// 直接读 MultiblockState 的 posCache: 它就是 pattern 逐格判定过的世界坐标,
		// 数量与 blockMatches 的格子数一致(150), 遍历顺序也一致 ——
		// 于是可以逐个算出"每个格子离控制器多少格", 不用再去猜轴向。
		dumpPatternOffsets(machine, state)
	}

	// ---- 判定钻头类型 ----
	// 不再硬编码"控制器上/下几格": 直接从 pattern 的 posCache 里找出钻头方块的实际
	// 世界坐标。这样与 FactoryBlockPattern 的轴向映射完全解耦 ——
	// 之前用 below(1) 判定, 实测钻头却出现在控制器西侧 (见日志 H: w=cmi:driller_head),
	// 就是因为 aisle/row/char 到世界 XYZ 的映射不是直觉上的"上下"。
	let headPos = findPatternCell(state, DRILLER_HEAD)

	if (headPos == null) {
		headPos = findPatternCell(state, DRILLER_FLUID_PUMP)
	}

	if (headPos == null) {
		headPos = findPatternCell(state, DRILLER_GAS_PUMP)
	}

	if (headPos == null) {
		return
	}

	let headId = level.getBlockState(headPos).getBlock().getId()

	// ---- 先确认输入够、输出放得下, 避免扣了东西却产不出来 ----
	let coolantIn = getTrait(machine, $FluidTankCapabilityTrait, COOLANT_INPUT_TRAIT)
	let coolantOut = getTrait(machine, $FluidTankCapabilityTrait, COOLANT_OUTPUT_TRAIT)
	let energyIn = getTrait(machine, $ForgeEnergyCapabilityTrait, ENERGY_INPUT_TRAIT)

	if (coolantIn == null || coolantOut == null || energyIn == null) {
		// 冷却液输入/输出仓 (或能量仓) 没接上 —— 这时不该"看起来在运行",
		// 每 100 tick 提示一次, 方便定位是哪一路总线没代理上。
		if (machine.getOffsetTimer() % 100 === 0) {
			console.warn("[driller] trait missing: coolantIn=" + (coolantIn != null)
				+ " coolantOut=" + (coolantOut != null)
				+ " energyIn=" + (energyIn != null))
		}

		return
	}

	let inputTank = coolantIn.storages[0]
	let outputTank = coolantOut.storages[0]

	if (inputTank.getFluid().getAmount() < COOLANT_RATE) {
		return
	}

	if (energyIn.storage.extractEnergy(ENERGY_RATE, true) < ENERGY_RATE) {
		return
	}

	// ---- 按钻头类型产出 ----
	let pos = getDrillPos(machine, headPos)
	let belowId = level.getBlockState(pos).getBlock().getId()

	if (headId === DRILLER_HEAD) {
		let pool = getProductPool(belowId)

		if (pool.length === 0) {
			return
		}

		if (!pushProduct(machine, pool[Math.floor(Math.random() * pool.length)])) {
			return
		}
	} else if (headId === DRILLER_FLUID_PUMP) {
		let fluid = getWorldFluid(level, pos)

		if (fluid == null || !isBottomlessFluid(fluid)) {
			return
		}

		if (!pushFluid(machine, fluid, PUMP_OUTPUT)) {
			return
		}
	} else {
		if (belowId !== MERCURY_GEOTHERMAL_VENT) {
			return
		}

		if (!pushGas(machine, HYDROGEN_GAS, PUMP_OUTPUT)) {
			return
		}
	}

	// ---- 产物放好了, 现在扣冷却液 / 产热冷却液 / 扣电 ----
	let hotCoolant = Fluid.of(HOT_COOLANT_FLUID).getFluid()
	let contain = outputTank.getFluid()

	// 罐里若已有别的流体(液泵产物), 这一步就退化成只扣冷却液, 避免串味
	let canOutputHeat = contain.getAmount() <= 0 || contain.getFluid() === hotCoolant

	if (canOutputHeat) {
		outputTank.fill($FluidStack.create(hotCoolant, COOLANT_RATE), false)
	}

	inputTank.drain(
		$FluidStack.create(Fluid.of(COOLANT_FLUID).getFluid(), COOLANT_RATE), false
	)
	energyIn.storage.extractEnergy(ENERGY_RATE, false)
})

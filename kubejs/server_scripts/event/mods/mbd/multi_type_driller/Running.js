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
// 输出口 (与 .mb 里的 6 条特性对应):
//   B 冷却液输入仓   multi_type_driller_coolant_input
//   A 热冷却液输出仓 multi_type_driller_coolant_output
//   C 产物输出口     multi_type_driller_product_output / _fluid_output / _gas_output
//   D 能量输入仓     multi_type_driller_energy_input

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
 * 找出三个工位方块 (钻头 / 液泵 / 气泵) 里实际在场的那个。
 *
 * 为什么不写死 "控制器下方 1 格":
 *   pattern 的 aisle/row/char 到世界 XYZ 的映射会随机器朝向变化, 实测钻头会出现在
 *   控制器侧面而不是正下方 (日志 H: w=cmi:driller_head)。
 *
 * 为什么不用 MultiblockState.posCache:
 *   结构未成型/未判定时 posCache 为空, 直接遍历会抛
 *   NullPointerException, 挂在 tick 上就会刷异常 —— 之前那个"鼠标移上去就崩"
 *   就是这么来的。
 *
 * 这里改为从控制器出发, 按一组候选偏移逐一认方块; 命中即返回。偏移集合覆盖
 * "正下方优先 + 六个方向的一格/两格", 数量很少, 每周期最多十几次方块查询。
 *
 * @param {Internal.MBDMachine_} machine
 * @param {Internal.Level_} level
 * @returns {Internal.BlockPos_|null}
 */
function findHead(machine, level) {
	let origin = machine.getPos()
	let offsets = [
		[0, -1, 0], [0, -2, 0], [0, 1, 0], [0, 2, 0],
		[1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1],
		[1, -1, 0], [-1, -1, 0], [0, -1, 1], [0, -1, -1]
	]

	// Rhino 不给循环体独立作用域, 循环内不能用 let/const (第二轮迭代会报
	// "redeclaration of var X"), 统一用函数级 var
	var i = 0
	var o = null
	var pos = null
	var id = ""

	for (i = 0; i < offsets.length; i++) {
		o = offsets[i]
		pos = origin.offset(o[0], o[1], o[2])
		id = level.getBlockState(pos).getBlock().getId()

		if (id === DRILLER_HEAD || id === DRILLER_FLUID_PUMP || id === DRILLER_GAS_PUMP) {
			return pos
		}
	}

	return null
}

/**
 * 钻头"咬"下去的那一格世界坐标 = 工位方块正下方 1 格。
 *
 * @param {Internal.MBDMachine_} machine
 * @param {Internal.BlockPos_} headPos findHead 找到的工位方块位置
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
 * 切换机器状态 (working / waiting)。
 *
 * 本机的 MBD2 配方引擎是关掉的 (recipeType 用 mbd2:dummy), 所以引擎不会像
 * 普通机器那样自动更新状态 —— 由这里手动切。
 * 状态名必须与 drillerStates() 里定义的一致: working / waiting / suspend。
 *
 * @param {Internal.MBDMachine_} machine
 * @param {string} state
 */
function setDrillerState(machine, state) {
	try {
		if (machine.getMachineStateName() !== state) {
			machine.setMachineState(state)
		}
	} catch (error) {
		console.error("[multi_type_driller] 切换状态 " + state + " 失败: " + error)
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

	var recipe = null
	var data = null
	var pool = null
	var ingredient = null
	var inner = null

	for (var entry of DRILLER_RECIPE_TYPE.getBuiltinRecipes().entrySet()) {
		recipe = entry.getValue()
		data = recipe.data

		if (data == null || !data.contains("deposit_block")) {
			continue
		}

		if (data.getString("deposit_block") !== blockId) {
			continue
		}

		pool = []

		recipe.getOutputContents($ItemRecipeCapability.INSTANCE).forEach((content) => {
			inner = content.getContent()
			ingredient = inner.ingredient != null ? inner.ingredient : inner

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

	// ---- 定位钻头 / 液泵 / 气泵 ----
	// 结构里 X 工位在控制器正下方 1 格 (spec L0=最底层, 控制器在 L1)。
	// 但 pattern 的 aisle/row/char 到世界 XYZ 的映射会随机器朝向变化, 所以这里不写死
	// "below(1)", 而是从控制器出发按一组候选偏移去认方块 —— 命中哪个就是哪个。
	// 这样与朝向解耦, 也不会像读 MultiblockState.posCache 那样在结构未成型时抛 NPE。
	let headPos = findHead(machine, level)

	if (headPos == null) {
		return
	}

	let headId = level.getBlockState(headPos).getBlock().getId()

	// ---- 先确认输入够, 输出放得下, 避免扣了东西却产不出来 ----
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
			setDrillerState(machine, "waiting")
			return
		}

		if (!pushProduct(machine, pool[Math.floor(Math.random() * pool.length)])) {
			setDrillerState(machine, "waiting")
			return
		}
	} else if (headId === DRILLER_FLUID_PUMP) {
		let fluid = getWorldFluid(level, pos)

		if (fluid == null || !isBottomlessFluid(fluid)) {
			setDrillerState(machine, "waiting")
			return
		}

		if (!pushFluid(machine, fluid, PUMP_OUTPUT)) {
			setDrillerState(machine, "waiting")
			return
		}
	} else {
		if (belowId !== MERCURY_GEOTHERMAL_VENT) {
			setDrillerState(machine, "waiting")
			return
		}

		if (!pushGas(machine, HYDROGEN_GAS, PUMP_OUTPUT)) {
			setDrillerState(machine, "waiting")
			return
		}
	}

	// 这一周期真的产出成功了 -> 切到 working (gecko 模型 / 工作态外观)
	setDrillerState(machine, "working")

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

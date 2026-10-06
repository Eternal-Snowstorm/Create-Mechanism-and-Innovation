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
const GAS_OUTPUT_TRAIT = "multi_type_driller_gas_output"
const ENERGY_INPUT_TRAIT = "multi_type_driller_energy_input"

// 钻头工位在控制器上方 2 格, 判定点因此是"控制器朝向上方那两格再往前一格"
const HEAD_ABOVE = 2
const HEAD_BELOW = 2

const $FluidStack = Java.loadClass("com.lowdragmc.lowdraglib.side.fluid.FluidStack")
const $GasStack = Java.loadClass("mekanism.api.chemical.gas.GasStack")
const $Gas = Java.loadClass("mekanism.api.chemical.gas.Gas")
const $LiquidBlock = Java.loadClass("net.minecraft.world.level.block.LiquidBlock")
const $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation")
const $ItemSlotCapabilityTrait =
	Java.loadClass("com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTrait")
const $FluidTankCapabilityTrait =
	Java.loadClass("com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTrait")
const $ForgeEnergyCapabilityTrait =
	Java.loadClass("com.lowdragmc.mbd2.common.trait.forgeenergy.ForgeEnergyCapabilityTrait")
const $ChemicalTankGasTrait =
	Java.loadClass("com.lowdragmc.mbd2.integration.mekanism.trait.chemical.ChemicalTankCapabilityTrait$Gas")
const $ItemRecipeCapability =
	Java.loadClass("com.lowdragmc.mbd2.common.capability.recipe.ItemRecipeCapability")
const $FluidRecipeCapability =
	Java.loadClass("com.lowdragmc.mbd2.common.capability.recipe.FluidRecipeCapability")
const $MBDRegistries = Java.loadClass("com.lowdragmc.mbd2.api.registry.MBDRegistries")

const DRILLER_RECIPE_TYPE = $MBDRegistries.RECIPE_TYPES.get(
	new $ResourceLocation(DRILLER_MACHINE_ID)
)

/**
 * 机器 id 是否为多元钻井机
 *
 * @param {Internal.MBDMachine_} machine
 * @returns {boolean}
 */
function isMultiTypeDriller(machine) {
	return machine != null && machine.getDefinition().getId() === DRILLER_MACHINE_ID
}

/**
 * 机器朝向对应的正前方水平偏移
 *
 * @param {Internal.MBDMachine_} machine
 * @returns {number[]} [dx, dz]
 */
function getFacingOffset(machine) {
	let facing = machine.getFrontFacing()

	if (facing == null || !facing.isPresent()) {
		return [0, -1]
	}

	switch (facing.get().getName()) {
		case "south":
			return [0, 1]
		case "east":
			return [1, 0]
		case "west":
			return [-1, 0]
		default:
			return [0, -1]
	}
}

/**
 * 钻头下方的世界坐标. 结构里 X 位于 (2,2,2), 控制器在 (2,1,2), 所以判定点
 * 是 "控制器 + 前方 * 2 + 下方 * 2"; 未旋转时即控制器向下两格.
 *
 * @param {Internal.MBDMachine_} machine
 * @returns {Internal.BlockPos_}
 */
function getDrillPos(machine) {
	let face = getFacingOffset(machine)

	return machine.getPos().offset(
		face[0] * HEAD_ABOVE,
		-HEAD_BELOW,
		face[1] * HEAD_ABOVE
	)
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
		new $ResourceLocation(BOTTOMLESS_FLUID_TAG)
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
 * 塞流体进 A 冷却液输出仓 (热冷却液与液泵产出共用)
 *
 * @param {Internal.MBDMachine_} machine
 * @param {Internal.Fluid_} fluid
 * @param {number} amount
 * @returns {boolean}
 */
function pushFluid(machine, fluid, amount) {
	let output = getTrait(machine, $FluidTankCapabilityTrait, COOLANT_OUTPUT_TRAIT)

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

	let gas = $Gas.getFromRegistry(new $ResourceLocation(gasId))

	if (gas == null || gas.isEmptyType()) {
		return false
	}

	let tank = output.storages[0]

	if (tank.insert(new $GasStack(gas, amount), true) < amount) {
		return false
	}

	tank.insert(new $GasStack(gas, amount), false)

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

	// ---- 判定钻头类型 ----
	let headId = level.getBlockState(machine.getPos().above(HEAD_ABOVE)).getBlock().getId()

	if (headId !== DRILLER_HEAD && headId !== DRILLER_FLUID_PUMP && headId !== DRILLER_GAS_PUMP) {
		return
	}

	// ---- 先确认输入够、输出放得下, 避免扣了东西却产不出来 ----
	let coolantIn = getTrait(machine, $FluidTankCapabilityTrait, COOLANT_INPUT_TRAIT)
	let coolantOut = getTrait(machine, $FluidTankCapabilityTrait, COOLANT_OUTPUT_TRAIT)
	let energyIn = getTrait(machine, $ForgeEnergyCapabilityTrait, ENERGY_INPUT_TRAIT)

	if (coolantIn == null || coolantOut == null || energyIn == null) {
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
	let pos = getDrillPos(machine)
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

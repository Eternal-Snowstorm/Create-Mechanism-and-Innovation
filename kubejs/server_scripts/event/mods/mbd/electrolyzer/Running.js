let $IEItemNBTHelper =
	Java.loadClass("blusunrize.immersiveengineering.common.util.ItemNBTHelper")
let $IEServerConfig =
	Java.loadClass("blusunrize.immersiveengineering.common.config.IEServerConfig")

const INPUT_GRAPHITE_ELECTRODE = "electrolyzer_input_graphite_electrode"

MBDMachineEvents.onBeforeRecipeWorking(($) => {
	let event = $.getEvent()
	let machine = event.getMachine()

	if (!MBDUtils.isMachine(machine, "cmi:electrolyzer")) {
		return
	}

	/** 
	 * @type {ItemStackTransfer_}
	 */
	let electrode = machine.getTraitByName(INPUT_GRAPHITE_ELECTRODE).storage
	let stack = electrode.getStackInSlot(0)

	if (!isGraphiteElectrode(stack)) {
		return
	}
	event.setCanceled(true)
})

MBDMachineEvents.onRecipeWorking(($) => {
	let event = $.getEvent()
	let machine = event.getMachine()

	const DAMAGE_NBT_NAME = "graphDmg"

	if (!MBDUtils.isMachine(machine, "cmi:electrolyzer")) {
		return
	}

	/** 
	 * @type {ItemStackTransfer_}
	 */
	let electrode = machine.getTraitByName(INPUT_GRAPHITE_ELECTRODE).storage
	let stack = electrode.getStackInSlot(0)

	if (!isGraphiteElectrode(stack)) {
		return
	}

	const DAMAGE = $IEItemNBTHelper.getInt(stack, DAMAGE_NBT_NAME) + 1
	const GET_DAMAGE = $IEServerConfig.MACHINES.arcfurnace_electrodeDamage
	const MAX_DAMAGE = $IEServerConfig.getOrDefault(GET_DAMAGE)

	$IEItemNBTHelper.putInt(stack, DAMAGE_NBT_NAME, DAMAGE)

	if (DAMAGE >= MAX_DAMAGE) {
		electrode.setStackInSlot(0, Item.getEmpty())
	} else {
		electrode.setStackInSlot(0, stack.copy())
	}
})

/**
 * 
 * @param {Internal.ItemStack} stack 
 * @returns 
 */
function isGraphiteElectrode(stack) {
	return !stack.isEmpty() && stack.getId() === "immersiveengineering:graphite_electrode"
}
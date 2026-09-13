let dtma = "dimensionally_transcendent_mechanism_accelerator"

let WidgetGroup =
	Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.WidgetGroup")
let ResourceTexture =
	Java.loadClass("com.lowdragmc.lowdraglib.gui.texture.ResourceTexture")
let ProgressWidget =
	Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.ProgressWidget")
let SlotWidget =
	Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.SlotWidget")
let ButtonWidget =
	Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.ButtonWidget")
let TextTextureWidget =
	Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.TextTextureWidget")
let ItemSlotCapabilityTrait =
	Java.loadClass("com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTrait")
let FluidSlotCapabilityTrait =
	Java.loadClass("com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTrait")
let ForgeEnergyCapabilityTrait =
	Java.loadClass("com.lowdragmc.mbd2.common.trait.forgeenergy.ForgeEnergyCapabilityTrait")

MBDMachineEvents.onUI(($) => {
	let event = $.getEvent()
	let machine = event.getMachine()

	if (!MBDUtils.isMachine(machine, "cmi:dimensionally_transcendent_mechanism_accelerator")) {
		return
	}
	event.setRoot(createDtmaUI(machine, machine.getLevel()))
})

/**
 * 
 * @param {Internal.MBDMachine_} machine 
 * @param {Internal.Level_} level 
 * @returns 
 */
function createDtmaUI(machine, level) {
	let group = new WidgetGroup(0, 0, 176, 166)
	group.setBackground(new ResourceTexture("ldlib:textures/gui/background.png"))

	group.addWidget(new TextTextureWidget(70, 5, 37, 20,
		Component.translatable("block.cmi.dimensionally_transcendent_mechanism_accelerator").getString()
	).setId("ui:dtma"))

	group.addWidget(new ProgressWidget(() => {
		return machine.getRecipeLogic().getProgressPercent()
	}, 79, 42, 18, 18))

	let input = machine.getTraitByName(ItemSlotCapabilityTrait, `${dtma}_input_item_slot`)
	group.addWidget(new SlotWidget(input.storage, 0, 40, 42))

	let output = machine.getTraitByName(ItemSlotCapabilityTrait, `${dtma}_output_item_slot`)
	group.addWidget(new SlotWidget(output.storage, 0, 114, 42))

	group.addWidget(new ButtonWidget(78, 42, 18, 18, (click) => {
		level.tell("clicked")
	}))

	return group
}
let $ItemSlotCapabilityTrait =
	Java.loadClass("com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTrait")

let $ForgeEnergyCapabilityTrait =
	Java.loadClass("com.lowdragmc.mbd2.common.trait.forgeenergy.ForgeEnergyCapabilityTrait")

MBDMachineEvents.onTick("cmi:radar_antenna", ($) => {
	let { event } = $
	let { machine } = event

	// 拿到能量物品槽
	let itemSlot = machine.getTraitByName($ItemSlotCapabilityTrait, "item_energy")

	if (itemSlot == null) {
		return
	}

	// 看槽位里的物品
	let stack = itemSlot.storage.getStackInSlot(0)

	if (stack.isEmpty()) {
		return
	}

	// 拿到机器的能量 trait
	let energyTrait = machine.getTraitByName($ForgeEnergyCapabilityTrait, "forge_energy_storage")

	if (energyTrait == null) {
		return
	}

	// 从物品抽能量
	stack.getCapability(ForgeCapabilities.ENERGY).ifPresent((itemEnergy) => {
		// 先看机器能收多少
		let canAccept = energyTrait.storage.receiveEnergy(1000, true)

		if (canAccept <= 0) {
			return
		}

		// 从物品抽
		let extracted = itemEnergy.extractEnergy(canAccept, false)

		if (extracted <= 0) {
			return
		}

		// 给机器
		energyTrait.storage.receiveEnergy(extracted, false)
	})
})
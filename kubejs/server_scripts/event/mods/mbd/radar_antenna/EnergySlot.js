MBDMachineEvents.onTick("cmi:radar_antenna", ($) => {
	let { event } = $
	let { machine } = event

	/** 
	 * 能量物品特性
	 * @type {Internal.ItemSlotCapabilityTrait} 
	 */
	let itemSlot = machine.getTraitByName(ItemSlotCapabilityTrait, "item_energy")

	// 没有特性退出逻辑
	if (itemSlot == null) {
		return
	}

	/**
	 * 能量物品特性的物品
	 * @type {Internal.ItemStack_}
	 */
	let stack = itemSlot.storage.getStackInSlot(0)

	// 没有物品退出逻辑
	if (stack.isEmpty()) {
		return
	}

	/**
	 * 能量特性
	 * @type {Internal.ForgeEnergyCapabilityTrait}
	 */
	let energyTrait = machine.getTraitByName(ForgeEnergyCapabilityTrait, "forge_energy_storage")

	// 没有能量特性退出逻辑
	if (energyTrait == null) {
		return
	}

	// 从物品抽能量
	stack.getCapability(ForgeCapabilities.ENERGY).ifPresent((itemEnergy) => {
		/**
		 * 试着给机器1000FE看能收多少
		 * @type {number}
		 */
		let canAccept = energyTrait.storage.receiveEnergy(1000, true)

		// 一点都不能收退出逻辑
		if (canAccept <= 0) {
			return
		}

		/**
		 * 从物品抽出输1000FE能接受的FE量
		 * @type {number}
		 */
		let extracted = itemEnergy.extractEnergy(canAccept, false)

		// 物品没有能量退出逻辑
		if (extracted <= 0) {
			return
		}

		// 把能量给机器
		energyTrait.storage.receiveEnergy(extracted, false)
	})
})
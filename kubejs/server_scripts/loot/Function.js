// priority: 15

const LootUtils = {
	/**
	 * 
	 * @param {Internal.ItemStack_} lootItem 
	 * @param {number} chance 
	 * @returns 
	 */
	setChanceLoot(lootItem, chance) {
		return LootEntry.of(lootItem)
			.when((container) => {
				container.randomChance(chance)
			})
	}
}
(function () {
	BlockEvents.rightClicked((event) => {
		let { block, item, player, level } = event

		if (!item.hasTag("minecraft:hoes")) {
			return
		}

		let farmland = getFarmland(block)
		if (!farmland) {
			return
		}

		tillFarmland(block, farmland, item, player, level)
	})

	/**
	 *
	 * @param {Internal.BlockContainerJS_} block
	 * @returns 
	 */
	function getFarmland(block) {
		switch (block.getId()) {
			case "farmersdelight:rich_soil":
				return "farmersdelight:rich_soil_farmland"

			case "mynethersdelight:resurgent_soil":
				return "mynethersdelight:resurgent_soil_farmland"

			default:
				if (block.hasTag("minecraft:dirt")) {
					return "minecraft:farmland"
				}

				return null
		}
	}

	/**
	 *
	 * @param {Internal.BlockContainerJS_} block
	 * @param {Special.Block} farmland
	 * @param {Internal.ItemStack_} item
	 * @param {Player} player
	 * @param {Internal.Level_} level
	 * @returns 
	 */
	function tillFarmland(block, farmland, item, player, level) {
		block.set(farmland)
		player.swing()

		if (!player.isCreative()) {
			item.setDamageValue(item.getDamageValue() + 1)
		}

		level.playSound(
			null,
			block.getX(),
			block.getY(),
			block.getZ(),
			"minecraft:item.hoe.till",
			"blocks",
			1.0,
			1.0
		)
	}
})()
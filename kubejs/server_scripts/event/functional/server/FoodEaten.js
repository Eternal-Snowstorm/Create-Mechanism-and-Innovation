(() => {
	let $IRadiationManager =
		Java.loadClass("mekanism.api.radiation.IRadiationManager")

	let FOOD_EATEN = []

	/**
	 * 
	 * @param {Internal.ItemStack_} id 
	 * @param {Internal.Consumer_<Internal.FoodEatenEventJS>} handler 
	 */
	function addFoodEaten(id, handler) {
		FOOD_EATEN.push([id, handler])
	}

	ItemEvents.foodEaten((event) => {
		let { item } = event

		FOOD_EATEN.forEach(([id, handler]) => {
			if (item.id === id) {
				handler(event)
			}
		})
	})

	addFoodEaten("minecraft:sugar_cane", (event) => {
		event.player.give("cmi:sugarcane_fiber")
	})
	addFoodEaten("create:blaze_cake", (event) => {
		let { player } = event
		let hasEffect = player.hasEffect("minecraft:fire_resistance")

		if (!hasEffect) {
			player.attack(player.damageSources().lava(), player.getHealth())
		}
	})

	addFoodEaten("alexscaves:radon_bottle", (event) => {
		let { player, level, hand } = event
		let key = `message.${Cmi.MODID}.food.radon_bottle`

		if (hand === InteractionHand.MAIN_HAND && !level.isClientSide()) {
			player.displayClientMessage(Component.translatable(key).blue(), true)

			if (!player.isCreative()) {
				player.give("minecraft:glass_bottle")
			}

			let advancement = player
				.getServer()
				.getAdvancements()
				.getAdvancement("mekanism:radiation_poisoning")

			$IRadiationManager.INSTANCE.radiate(player, 1145.14)

			if (advancement !== null) {
				player.getAdvancements().award(advancement, "poisoned")
			}
		}
	})
})()
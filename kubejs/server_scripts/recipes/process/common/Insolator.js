(() => {
	ServerEvents.recipes((event) => {
		let { thermal } = event.getRecipes()

		insolatorCatalyst(event)
	})

	/**
	 * 
	 * @param {Internal.RecipesEventJS_} event 
	 */
	function insolatorCatalyst(event) {
		let { thermal } = event.getRecipes()

		thermal.insolator_catalyst("cmi:fertilizer")
			.primaryMod(2.07)
			.secondaryMod(1.32)
			.energyMod(0.74)
			.minChance(0.15)
			.useChance(0.37)
	}
})()
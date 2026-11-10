ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_casing")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 400))
		.inputItems([
			"neoecoae:black_tungsten_alloy_casing",
			"2x #forge:plates/black_tungsten_alloy",
			"ae2:smooth_sky_stone_block",
			"4x #forge:gems/energized_fluix_crystal"
		])
		.id("neoecoae:crafting_casing")
})
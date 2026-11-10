ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_casing")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 400))
		.inputItems([
			"neoecoae:cryogenic_aluminum_alloy_casing",
			"2x #forge:plates/energized_superconductive",
			"ae2:smooth_sky_stone_block",
			"4x #forge:gems/energized_fluix_crystal"
		])
		.id("neoecoae:computation_casing")
})
ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	//机壳
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

	// 散热器
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_vent")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:black_tungsten_alloy_casing",
			"neoecoae:phase_change_air_cooler",
			"4x #forge:plates/invar"
		])
		.id("neoecoae:crafting_vent")
})
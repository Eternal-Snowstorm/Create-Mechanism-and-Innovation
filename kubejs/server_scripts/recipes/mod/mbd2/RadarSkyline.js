ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	cmi.radar_skyline()
		.inputItems("cmi:empty_cell")
		.outputItems("cmi:tier_1_aviation_cell")

	cmi.radar_skyline()
		.inputItems("cmi:tier_1_aviation_cell")
		.outputItems("cmi:tier_2_aviation_cell")

	cmi.radar_skyline()
		.inputItems("cmi:tier_2_aviation_cell")
		.outputItems("cmi:tier_3_aviation_cell")

	cmi.radar_skyline()
		.inputItems("cmi:tier_3_aviation_cell")
		.outputItems("cmi:tier_4_aviation_cell")
})
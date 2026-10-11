ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	cmi.radar_antenna()
		.inputItems("cmi:empty_cell")
		.inputFE(1000000)
		.outputItems("cmi:tier_1_aviation_cell")

	cmi.radar_antenna()
		.inputItems("cmi:tier_1_aviation_cell")
		.inputFE(2000000)
		.outputItems("cmi:tier_2_aviation_cell")

	cmi.radar_antenna()
		.inputItems("cmi:tier_2_aviation_cell")
		.inputFE(5000000)
		.outputItems("cmi:tier_3_aviation_cell")

	cmi.radar_antenna()
		.inputItems("cmi:tier_3_aviation_cell")
		.inputFE(10000000)
		.outputItems("cmi:tier_4_aviation_cell")
})
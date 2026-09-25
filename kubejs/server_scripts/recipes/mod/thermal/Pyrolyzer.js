ServerEvents.recipes((event) => {
	let { thermal } = event.getRecipes()

	// 精炼辐射岩
	thermal.pyrolyzer("2x cmi:refined_radiation_rock", [
		"alexscaves:radrock"
	])

	// 抗辐射精炼液
	thermal.pyrolyzer(Fluid.of("cmi:radiation_resistant_creosote", 250), [
		"cmi:dense_oxide_film"
	])
})
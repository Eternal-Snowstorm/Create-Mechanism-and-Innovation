ServerEvents.recipes((event) => {
	let { thermal } = event.getRecipes()

	// 活性石墨
	thermal.crucible(Fluid.of("cmi:activated_graphite", 1000), [
		"cmi:activated_graphite_chunk"
	])
})
ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	create.emptying([
		Fluid.of("cmi:creative_solution", 10),
		"cmi:dreamcore_seed"
	], [
		"cmi:cmi_icon"
	])
})
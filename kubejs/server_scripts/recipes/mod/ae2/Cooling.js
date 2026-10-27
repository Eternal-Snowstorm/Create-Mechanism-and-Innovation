ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	neoecoae.cooling(
		Fluid.of("cmi:glacious_cryotheum", 100),
		12000,
		Fluid.of("neoecoae:cryotheum_solution", 100),
		9
	).id("neoecoae:cooling/cryotheum_solution")
})
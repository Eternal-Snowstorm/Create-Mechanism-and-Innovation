ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	neoecoae.cooling(Fluid.of("cmi:glacious_cryotheum", 100), 12000)
		.output(Fluid.of("neoecoae:cryotheum_solution", 100))
		.maxOverclock(9)
		.id("neoecoae:cooling/cryotheum_solution")
})
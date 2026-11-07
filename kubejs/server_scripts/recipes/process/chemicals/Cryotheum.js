ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	// 极寒之凛冰
	neoecoae.integrated_working_station()
		.fluidOutput(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 1000))
		.inputItems([
			"2x neoecoae:cryotheum_crystal",
			"2x ae2:charged_certus_quartz_crystal"
		])
		.energy(4000)
		.id("neoecoae:integrated_working_station/cryotheum_solution")

	neoecoae.integrated_working_station()
		.fluidOutput(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputFluid(Fluid.of("neoecoae:cryotheum_solution", 1000))
		.inputItems([
			"4x neoecoae:cryotheum"
		])
		.energy(4000)
})

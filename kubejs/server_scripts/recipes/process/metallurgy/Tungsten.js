ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	// 钨溶液
	cmi.chemical_reactor()
		.inputItems("10x cmi:tungsten_reactant")
		.inputFluids(Fluid.of("cmi:hydrochloric_acid", 1000))
		.outputFluids(Fluid.of("cmi:tungsten_solution", 2000))
		.inputFE(32 * (20 * 10))
		.duration(20 * 10)

	// 钨混合物
	cmi.chemical_reactor()
		.inputItems("10x #forge:dusts/aluminum")
		.inputFluids(Fluid.of("cmi:tungsten_solution", 1000))
		.outputItems("10x cmi:tungsten_mixture")
		.inputFE(32 * (20 * 10))
		.duration(20 * 10)
})

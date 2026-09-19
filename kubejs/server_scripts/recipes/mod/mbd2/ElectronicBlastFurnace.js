ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	// 钨
	cmi.electronic_blast_furnace()
		.inputItems("cmi:tungsten_mixture")
		.outputItems("cmi:tungsten_ingot")
		.duration(20 * 3)

	// 聚合物板
	cmi.electronic_blast_furnace()
		.inputItems("#forge:plates/hdpe")
		.inputFluids([
			Fluid.of("cmi:radon", 100),
			Fluid.of("cmi:radiation_resistant_creosote", 100)
		])
		.outputItems("alexscaves:polymer_plate")
		.inputFE(10000)
		.duration(20 * 3)

	// 复合磁导板
	cmi.electronic_blast_furnace()
		.inputItems("cmi:superconducting_mercury_plate")
		.inputFluids([
			Fluid.of("cmi:composite_magnetic_fluid", 100)
		])
		.outputItems("cmi:composite_magnetic_conduction_plate")
		.inputFE(114514)
		.duration(20 * 3)
})
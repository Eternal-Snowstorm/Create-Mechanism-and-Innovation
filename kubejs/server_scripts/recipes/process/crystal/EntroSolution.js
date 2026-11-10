ServerEvents.recipes((event) => {
	let { cmi, mekanism, thermal } = event.getRecipes()

	// 还原恩特罗水晶线
	// 还原
	thermal.crystallizer("cmi:reduced_entro_crystal", [
		"cmi:sodium_reducing_agent",
		Fluid.of("cmi:entro_peroxide_solution", 100)
	])

	// 粉碎
	mekanism.crushing(
		"cmi:reduced_entro_dust",
		"cmi:reduced_entro_crystal"
	)

	// 晶态恩特罗溶液
	cmi.electronic_blast_furnace()
		.inputItems("cmi:reduced_entro_dust")
		.inputFluids([
			Fluid.of("cmi:liquid_crystal_etrium", 50)
		])
		.outputItems("cmi:etrium_peroxide_crystal")
		.outputFluids([
			Fluid.of("cmi:crystal_entro_solution", 50)
		])
		.duration(20 * 2)

	// 恩特罗合金
	cmi.chemical_reactor()
		.inputFluids([
			Fluid.of("cmi:crystal_entro_solution", 50),
			Fluid.of("cmi:liquid_crystal_entro", 50)
		])
		.outputItems("2x cmi:entro_alloy")
})
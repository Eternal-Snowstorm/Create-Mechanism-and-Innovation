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

	// 污浊钛粉
	cmi.chemical_reactor()
		.inputItems("10x #forge:dusts/coal_coke")
		.inputFluids([
			Fluid.of("cmi:crystal_catalyt", 1000),
			Fluid.of("cmi:sapphire_solution", 1000)
		])
		.outputItems("10x cmi:dirty_titanium_dust")
		.inputFE(32 * (20 * 10))
		.duration(20 * 10)

	// 水晶蚀刻溶液
	cmi.chemical_reactor()
		.inputFluids([
			MBDHelpers.withFluidTag("forge:sulfuric_acid", 1000),
			Fluid.of("cmi:hydrochloric_acid", 1000)
		])
		.inputItems("4x #forge:gems/fluorite")
		.outputFluids(Fluid.of("cmi:crystal_etching_solution", 3000))
		.inputFE(32 * (20 * 10))
		.duration(20 * 10)

	// 蓝宝石溶液
	cmi.chemical_reactor()
		.inputFluids(Fluid.of("cmi:crystal_etching_solution", 100))
		.inputItems("#forge:dusts/sapphire")
		.outputFluids(Fluid.of("cmi:sapphire_solution", 200))
		.duration(20 * 5)
		.perTick((recipe) => {
			recipe.inputFE(25000 / 20)
		})
	
})
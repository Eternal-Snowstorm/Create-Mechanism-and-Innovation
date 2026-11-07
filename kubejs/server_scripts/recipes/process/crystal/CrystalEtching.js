ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	// 水晶蚀刻溶液
	cmi.chemical_reactor()
		.inputFluids([
			MBDFluidIngredient.ofTagId("forge:sulfuric_acid", 1000),
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
			recipe.inputFE(4000 / 20)
		})
})

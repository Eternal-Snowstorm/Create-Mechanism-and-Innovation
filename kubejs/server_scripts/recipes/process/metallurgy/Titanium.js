ServerEvents.recipes((event) => {
	let { cmi, mekanism } = event.getRecipes()

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

	// 钛氧化物
	mekanism.oxidizing(
		"cmi:raw_titanium_mixture",
		"10x cmi:titanium_oxide"
	)
})
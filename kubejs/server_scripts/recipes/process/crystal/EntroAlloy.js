ServerEvents.recipes((event) => {
	let { cmi, mekanism } = event.getRecipes()

	// 晶态熔融恩特罗线
	// 金星岩粉
	mekanism.crushing(
		"cmi:venus_stone_dust",
		"#ad_astra:venus_stones"
	)

	// 电力高炉
	cmi.electronic_blast_furnace()
		.inputItems([
			"cmi:crystal_molten_entro",
			"5x cmi:venus_stone_dust"
		])
		.outputItems("cmi:etrium_mixture")
		.outputFluids([
			Fluid.of("cmi:molten_silicon_containing_compound", 50)
		])
		.duration(20 * 2)

	// 恩特罗化合物
	cmi.chemical_reactor()
		.inputFluids([
			Fluid.of("cmi:molten_silicon_containing_compound", 50),
			MBDFluidIngredient.ofTagId("cmi:delta_unstable_solution", 50),
			Fluid.of("cmi:pure_crystal_source", 50)
		])
		.outputItems("4x cmi:entro_compound")
		.duration(20 * 2)

	// 液晶态埃忒恩
	cmi.chemical_reactor()
		.inputItems("cmi:etrium_mixture")
		.inputFluids([
			Fluid.of("cmi:pure_crystal_source", 50)
		])
		.outputFluids([
			Fluid.of("cmi:liquid_crystal_etrium", 100)
		])
		.duration(20 * 2)

	// 纯净晶源
	cmi.electronic_blast_furnace()
		.inputItems("#forge:raw_materials/dreamcore")
		.outputFluids([
			Fluid.of("cmi:pure_crystal_source", 50)
		])
		.duration(20)

	// 恩特罗氧化剂
	cmi.electrolyzer()
		.inputItems([
			"#forge:raw_materials/dreamcore",
			"cmi:etrium_peroxide_crystal"
		])
		.outputItems("cmi:entro_oxidizer")
		.duration(20)

	// 液晶态恩特罗
	cmi.electronic_blast_furnace()
		.inputItems([
			"cmi:entro_oxidizer",
			"cmi:entro_compound"
		])
		.outputFluids([
			Fluid.of("cmi:liquid_crystal_entro", 100)
		])
		.duration(20)
})
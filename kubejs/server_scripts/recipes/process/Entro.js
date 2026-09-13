ServerEvents.recipes((event) => {
	let { cmi, mekanism, thermal, thermal_extra } = event.getRecipes()

	// 电解
	cmi.electrolyzer()
		.inputItems("cmi:spiritcore_ore")
		.outputItems([
			"cmi:entro_peroxide_crystal",
			"cmi:ionized_entro_crystal"
		])
		.duration(20 * 2)

	// 氧化恩特罗水晶线
	// 粉碎
	mekanism.crushing(
		"cmi:entro_peroxide_dust",
		"cmi:entro_peroxide_crystal"
	)

	// 反应釜
	cmi.chemical_reactor()
		.inputItems("cmi:entro_peroxide_dust")
		.inputFluids([
			Fluid.of("cmi:crystal_etching_solution", 100)
		])
		.outputFluids([
			Fluid.of("cmi:entro_peroxide_solution", 100)
		])
		.duration(20 * 2)

	// 电离恩特罗水晶线
	// 热解
	thermal.pyrolyzer(Fluid.of("cmi:molten_ionized_entro", 200), [
		"cmi:ionized_entro_crystal"
	])

	// 精炼
	thermal.refinery([
		"cmi:crystal_molten_entro",
		Fluid.of("cmi:ionized_entro_solution", 100)
	], Fluid.of("cmi:molten_ionized_entro", 200))

	thermal_extra.advanced_refinery([
		"cmi:crystal_molten_entro",
		Fluid.of("cmi:ionized_entro_solution", 50)
	], Fluid.of("cmi:molten_ionized_entro", 100))

	// 钠还原剂
	cmi.chemical_reactor()
		.inputItems("2x cmi:electrolized_redstone")
		.inputFluids([
			Fluid.of("cmi:ionized_entro_solution", 100),
			MBDHelpers.withFluidTag("forge:sodium", 100)
		])
		.outputItems("4x cmi:sodium_reducing_agent")
		.duration(20 * 2)

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
			MBDHelpers.withFluidTag("cmi:delta_unstable_solution", 50),
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
	cmi.electronic_blast_furnace()
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
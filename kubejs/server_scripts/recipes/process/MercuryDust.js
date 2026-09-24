ServerEvents.recipes((event) => {
	let { mekanism, cmi } = event.getRecipes()


	// 酸洗水星岩
	mekanism.reaction(
		"#ad_astra:mercury_stones",
		"50x mekanism:steam", // MekType.Gas.of("mekanism:steam", 50)
		Fluid.of("mekanism:sulfuric_acid", 50),
		"cmi:acid_washed_mercury_rock",
		"10x cmi:mercury_mixture" // MekType.Gas.of("cmi:mercury_mixture", 10)
	).duration(60).energyRequired(12000)

	// 朱砂产汞
	mekanism.reaction("#forge:dusts/cinnabar",
		"50x mekanism:steam"
	)
		.fluidInput(Fluid.of("mekanism:sulfuric_acid", 50))
		.gasOutput("10x cmi:mercury_mixture")
		.duration(60)
		.energyRequired(12000)

	// 过热汞混合物
	mekanism.chemical_infusing(
		MekType.Gas.of("cmi:overheated_mercury_mixture", 2),
		MekType.Gas.of("cmi:mercury_mixture", 1),
		MekType.Gas.of("cmi:titanium_oxide", 1)
	)

	// 超导汞锭
	mekanism.reaction(
		"#forge:ingots/silver",
		"100x cmi:overheated_mercury_mixture", // MekType.Gas.of("cmi:overheated_mercury_mixture", 100)
		Fluid.of("cmi:molten_etrium", 90),
		"cmi:superconducting_mercury_ingot",
		"100x mekanism:sulfur_trioxide" // MekType.Gas.of("mekanism:sulfur_trioxide", 100)
	).duration(60).energyRequired(12000)

	// 电解
	cmi.electrolyzer()
		.inputGases("100x cmi:overheated_mercury_mixture") // MekType.Gas.of("cmi:overheated_mercury_mixture", 100)
		.outputGases([
			"50x mekanism:sulfur_trioxide", // MekType.Gas.of("mekanism:sulfur_trioxide", 50)
			"50x cmi:mercury" // MekType.Gas.of("cmi:mercury", 50)
		])
		.duration(20 * 2)

	// 传送核心
	mekanism.reaction(
		"ae2:fluix_pearl",
		"1000x cmi:mercury", // MekType.Gas.of("cmi:mercury", 1000)
		Fluid.tag("tag", "forge:ender", 1000),
		"mekanism:teleportation_core"
	).duration(60).energyRequired(12000)

})
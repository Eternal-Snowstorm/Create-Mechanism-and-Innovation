ServerEvents.recipes((event) => {
	let { cmi, mekanism, thermal_extra } = event.getRecipes()

	// 核废料
	cmi.electrolyzer()
		.inputItems("alexscaves:unrefined_waste")
		.outputItems("5x alexscaves:toxic_paste")
		.outputGases("100x cmi:refined_nuke_waste")
		.duration(20 * 5)

	mekanism.oxidizing(
		"cmi:refined_nuke_waste",
		MekType.Gas.of("cmi:refined_nuke_waste", 400)
	)

	mekanism.crystallizing(
		"gas",
		"alexscaves:toxic_paste",
		MekType.Gas.of("cmi:refined_nuke_waste", 200)
	)

	// 精炼核废料
	mekanism.oxidizing(
		"alexscaves:toxic_paste",
		"200x cmi:refined_nuke_waste"
	)

	mekanism.oxidizing(
		"mekanism:reprocessed_fissile_fragment",
		"100x cmi:refined_nuke_waste"
	)

	// 氧化铀
	mekanism.oxidizing(
		"#forge:dusts/uranium",
		"1000x mekanism:uranium_oxide"
	).id("mekanism:processing/uranium/uranium_oxide")

	// 裂变燃料 from 铀黄饼
	mekanism.oxidizing(
		"mekanism:yellow_cake_uranium",
		"200x mekanism:fissile_fuel"
	)

	// 硫酸
	cmi.electrolyzer()
		.inputItems("alexscaves:toxic_paste")
		.outputFluids(Fluid.of("mekanism:sulfuric_acid", 100))
		.outputGases("10x cmi:radon")
		.duration(20)

	// 核污水
	thermal_extra.advanced_refinery([
		"alexscaves:toxic_paste",
		Fluid.of("mekanism:sulfuric_acid", 200),
		Fluid.of("cmi:sludge_suspension", 100)
	], Fluid.of("alexscaves:acid", 500))

	// 含钋/钚电解液
	cmi.electrolyzer()
		.inputGases(["200x cmi:refined_nuke_waste"])
		.outputFluids([
			Fluid.of("cmi:polonium_containing_electrolyte", 100),
			Fluid.of("cmi:plutonium_containing_electrolyte", 100)
		])
		.duration(20 * 5)
		.perTick((recipe) => {
			recipe.inputFE(1000)
		})

	// 放射性酸溶液
	cmi.electrolyzer()
		.inputFluids([
			Fluid.of("cmi:plutonium_extract_solution", 100),
			Fluid.of("cmi:hydrochloric_acid", 100)
		])
		.outputFluids([
			Fluid.of("cmi:radioactive_acid_solution", 100)
		])
		.outputGases("100x cmi:radioactive_mixture")
		.duration(20 * 5)
		.perTick((recipe) => {
			recipe.inputFE(1000)
		})
})
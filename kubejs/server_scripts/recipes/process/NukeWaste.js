ServerEvents.recipes((event) => {
	let { thermal, cmi, mekanism } = event.getRecipes()

	// 核废料
	cmi.electrolyzer()
		.inputItems("alexscaves:unrefined_waste")
		.outputItems("5x alexscaves:toxic_paste")
		.outputGases("100x cmi:nuke_waste") // MekType.Gas.of("cmi:nuke_waste", 100)
		.duration(20 * 5)

	// 核废料转化
	mekanism.reaction(
		"alexscaves:toxic_paste",
		"10x mekanism:nuclear_waste", // MekType.Gas.of("mekanism:nuclear_waste", 10)
		Fluid.tag("tag", "forge:acid", 10),
		"cmi:refined_nuke_waste",
		"10x cmi:nuke_waste" // MekType.Gas.of("cmi:nuke_waste", 10)
	).duration(60).energyRequired(12000)

	mekanism.reaction(
		"cmi:refined_nuke_waste",
		"10x cmi:nuke_waste", // MekType.Gas.of("cmi:nuke_waste", 10)
		Fluid.tag("tag", "forge:acid", 10),
		"alexscaves:toxic_paste",
		"10x mekanism:nuclear_waste" // MekType.Gas.of("mekanism:nuclear_waste", 10)
	).duration(60).energyRequired(12000)

	mekanism.oxidizing(
		"cmi:refined_nuke_waste",
		MekType.Gas.of("cmi:refined_nuke_waste", 200)
	)

	mekanism.crystallizing(
		"gas",
		"alexscaves:toxic_paste",
		MekType.Gas.of("cmi:refined_nuke_waste", 200)
	)

	// 含钋/钚电解液
	cmi.electrolyzer()
		.inputGases("100x cmi:nuke_waste") // MekType.Gas.of("cmi:nuke_waste", 100)
		.outputFluids([
			Fluid.of("cmi:polonium_containing_electrolyte", 100),
			Fluid.of("cmi:plutonium_containing_electrolyte", 100)
		])
		.outputGases("100x mekanism:spent_nuclear_waste") // MekType.Gas.of("mekanism:spent_nuclear_waste", 100)
		.duration(20 * 5)

	// 放射性酸溶液
	cmi.electrolyzer()
		.inputFluids([
			Fluid.of("cmi:plutonium_extract_solution", 100),
			Fluid.of("cmi:hydrochloric_acid", 100)
		])
		.outputFluids([
			Fluid.of("cmi:radioactive_acid_solution", 100)
		])
		.outputGases("100x cmi:radioactive_mixture") // MekType.Gas.of("cmi:radioactive_mixture", 100)
		.duration(20 * 5)

	// 钚线
	// 钚电离结晶
	thermal.crystallizer("cmi:plutonium_ionized_crystal", [
		"2x #forge:dusts/fluorite",
		Fluid.of("cmi:plutonium_containing_electrolyte", 100)
	])

	// 含钚溶液
	cmi.chemical_reactor()
		.inputItems([
			"cmi:radioactive_sediment",
			"cmi:plutonium_ionized_crystal"
		])
		.inputFluids([
			Fluid.of("cmi:nitric_acid", 100)
		])
		.outputFluids([
			Fluid.of("cmi:plutonium_containing_solution", 100)
		])
		.duration(20 * 5)

	// 钚萃取液
	cmi.chemical_reactor()
		.inputFluids([
			Fluid.of("cmi:plutonium_containing_solution", 100),
			MBDHelpers.withFluidTag("forge:molten_uranium", 180)
		])
		.outputItems("immersiveengineering:raw_uranium")
		.outputFluids([
			Fluid.of("cmi:plutonium_extract_solution", 200)
		])
		.duration(20 * 5)

	// 钚混合物
	mekanism.activating(
		MekType.Gas.of("cmi:radioactive_mixture", 1),
		MekType.Gas.of("cmi:plutonium_mixture", 1)
	).id("mekanism:processing/lategame/polonium")

	// 钚
	mekanism.centrifuging(
		MekType.Gas.of("cmi:plutonium_mixture", 1),
		MekType.Gas.of("mekanism:plutonium", 1)
	).id("mekanism:processing/lategame/plutonium")

	// 钋线
	// 含钋溶液
	cmi.chemical_reactor()
		.inputItems("2x #forge:dusts/fluorite")
		.inputFluids([
			Fluid.of("cmi:polonium_containing_electrolyte", 100)
		])
		.outputItems("cmi:radioactive_sediment")
		.outputFluids([
			Fluid.of("cmi:polonium_containing_solution", 100)
		])
		.duration(20 * 5)

	// 粗钋
	thermal.crystallizer("cmi:raw_polonium", [
		"#forge:dusts/fluorite",
		Fluid.of("cmi:polonium_containing_solution", 100)
	])

	// 粗钋粉
	mekanism.crushing(
		"cmi:raw_polonium_dust",
		"cmi:raw_polonium"
	)

	// 钋溶液
	cmi.chemical_reactor()
		.inputItems("cmi:raw_polonium_dust")
		.inputFluids([
			Fluid.of("cmi:radioactive_acid_solution", 100)
		])
		.outputItems("cmi:sludge_extract")
		.outputFluids([
			Fluid.of("cmi:polonium_solution", 100)
		])
		.duration(20 * 5)

	// 还原钋
	cmi.chemical_reactor()
		.inputItems("5x #forge:dusts/zinc")
		.inputFluids([
			Fluid.of("cmi:polonium_solution", 100)
		])
		.outputItems([
			"5x cmi:dirty_zinc_dust",
			"cmi:reduced_polonium"
		])
		.duration(20 * 5)

	// 钋
	mekanism.oxidizing(
		"cmi:reduced_polonium",
		MekType.Gas.of("mekanism:polonium", 100)
	)


})
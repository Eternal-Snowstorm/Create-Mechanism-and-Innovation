ServerEvents.recipes((event) => {
	let { thermal, cmi, mekanism } = event.getRecipes()

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

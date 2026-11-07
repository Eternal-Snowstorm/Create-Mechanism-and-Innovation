ServerEvents.recipes((event) => {
	let { thermal, cmi, mekanism } = event.getRecipes()

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
			MBDFluidIngredient.ofTagId("forge:molten_uranium", 180)
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
})

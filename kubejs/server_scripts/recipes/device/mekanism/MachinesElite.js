// Mekanism · 精英机器（同位素离心机/化学溶解室/化学清洗机/化学结晶器）
ServerEvents.recipes((event) => {
	let { thermal_extra, neoecoae } = event.getRecipes()

	// 同位素离心机
	addRecipe(neoecoae)
		.itemOutput("mekanism:isotopic_centrifuge")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/composite_tungsten_steel",
			Mechanisms.ADVANCED.COM,
			Mechanisms.AIR.COM,
			Mechanisms.NUKE.COM,
			"cmi:blitz_general_component"
		])
		.energy(2000)
		.id("mekanism:isotopic_centrifuge")

	// 化学溶解室
	addRecipe(neoecoae)
		.itemOutput("mekanism:chemical_dissolution_chamber")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/composite_carbon_fiber",
			Mechanisms.ELITE.COM,
			Mechanisms.AIR.COM,
			"create:whisk",
			"cmi:basalz_general_component"
		])
		.energy(2000)
		.id("mekanism:chemical_dissolution_chamber")

	// 化学清洗室
	addRecipe(neoecoae)
		.itemOutput("mekanism:chemical_washer")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/composite_carbon_fiber",
			Mechanisms.ELITE.COM,
			Mechanisms.AIR.COM,
			"create:whisk",
			"cmi:blitz_general_component"
		])
		.energy(2000)
		.id("mekanism:chemical_washer")

	// 化学结晶室
	addRecipe(neoecoae)
		.itemOutput("mekanism:chemical_crystallizer")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/composite_carbon_fiber",
			Mechanisms.ELITE.COM,
			Mechanisms.AIR.COM,
			"create:whisk",
			"cmi:blizz_general_component"
		])
		.energy(2000)
		.id("mekanism:chemical_crystallizer")
})

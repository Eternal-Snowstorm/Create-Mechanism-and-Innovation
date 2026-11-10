ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	// 同位素离心机
	neoecoae.integrated_working_station()
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
	neoecoae.integrated_working_station()
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
	neoecoae.integrated_working_station()
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
	neoecoae.integrated_working_station()
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
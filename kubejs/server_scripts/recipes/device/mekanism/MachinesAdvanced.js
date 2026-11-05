// Mekanism · 高级机器（净化室/化学氧化机/化学注入室/化学灌注机）
ServerEvents.recipes((event) => {
	let { thermal_extra, neoecoae } = event.getRecipes()

	// 提纯仓
	neoecoae.integrated_working_station()
		.itemOutput("mekanism:purification_chamber")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/composite_tungsten_steel",
			Mechanisms.ADVANCED.COM,
			Mechanisms.AIR.COM,
			"cmi:basalz_general_component"
		])
		.energy(2000)
		.id("mekanism:purification_chamber")

	// 化学氧化机
	neoecoae.integrated_working_station()
		.itemOutput("mekanism:chemical_oxidizer")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/composite_tungsten_steel",
			Mechanisms.ADVANCED.COM,
			Mechanisms.AIR.COM,
			"cmi:blaze_general_component"
		])
		.energy(2000)
		.id("mekanism:chemical_oxidizer")

	// 化学压射室
	neoecoae.integrated_working_station()
		.itemOutput("mekanism:chemical_injection_chamber")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/composite_tungsten_steel",
			Mechanisms.ADVANCED.COM,
			Mechanisms.AIR.COM,
			"2x #forge:gears/chromeplated_steel",
			"cmi:basalz_general_component"
		])
		.energy(2000)
		.id("mekanism:chemical_injection_chamber")

	// 化学灌注室
	neoecoae.integrated_working_station()
		.itemOutput("mekanism:chemical_infuser")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/composite_tungsten_steel",
			Mechanisms.ADVANCED.COM,
			Mechanisms.AIR.COM,
			"cmi:blitz_general_component"
		])
		.energy(2000)
		.id("mekanism:chemical_infuser")
})

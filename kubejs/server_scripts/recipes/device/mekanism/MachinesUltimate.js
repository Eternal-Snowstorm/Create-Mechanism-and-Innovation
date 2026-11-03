// Mekanism · 终极机器（太阳能中子活化器/加压反应室/反质子核合成器）
ServerEvents.recipes((event) => {
	let { thermal_extra, neoecoae } = event.getRecipes()


	// 中子活化器
	addRecipe(neoecoae)
		.itemOutput("mekanism:solar_neutron_activator")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/composite_carbon_fiber",
			Mechanisms.ELITE.COM,
			Mechanisms.AIR.COM,
			"ad_astra:photovoltaic_vesnium_cell",
			"cmi:blitz_general_component"
		])
		.energy(2000)
		.id("mekanism:solar_neutron_activator")


	// 加压反应室
	addRecipe(neoecoae)
		.itemOutput("mekanism:pressurized_reaction_chamber")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/composite_carbon_fiber",
			Mechanisms.ELITE.COM,
			Mechanisms.AIR.COM,
			"vintageimprovements:vacuum_chamber",
			"cmi:blitz_general_component"
		])
		.energy(2000)
		.id("mekanism:pressurized_reaction_chamber")


	// 反质子核
	addRecipe(neoecoae)
		.itemOutput("mekanism:antiprotonic_nucleosynthesizer")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Mechanisms.ULTIMATE.COM,
			Mechanisms.ANTI.COM,
			"2x neoecoae:energized_superconductive_ingot",
			"2x #forge:plates/superconducting_mercury",
			"mekanismgenerators:reactor_glass",
			"2x mekanism:hdpe_sheet",
			"2x neoecoae:cryotheum_crystal"
		])
		.energy(2000)
		.id("mekanism:antiprotonic_nucleosynthesizer")
})

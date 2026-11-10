ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	function addRecipe() {
		return neoecoae.integrated_working_station()
	}

	// T1火箭组件
	addRecipe()
		.itemOutput("cmi:tier_1_rocket_nose_cone")
		.energy(16000)
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"4x #forge:plates/composite_tungsten_steel",
			"#forge:gears/tungsten_steel",
			"cmi:tier_1_aviation_cell",
			"mekanism:basic_control_circuit",
			"#railways:palettes/dye_groups/flywheel",
			Mechanisms.AERO.COM
		])

	addRecipe()
		.itemOutput("cmi:tier_1_rocket_body")
		.energy(4000)
		.inputFluid(Fluid.of("cmi:silicon_rubber", 100))
		.inputItems([
			"2x #forge:plates/tungsten_steel",
			"#forge:plates/composite_tungsten_steel",
			"#forge:plates/aluminum_alloy"
		])

	addRecipe()
		.itemOutput("cmi:tier_1_rocket_fin")
		.energy(4000)
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"2x #forge:plates/tungsten_steel",
			"#forge:plates/aluminum_alloy"
		])

	// T2火箭组件
	addRecipe()
		.itemOutput("cmi:tier_2_rocket_nose_cone")
		.energy(16000)
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"4x #forge:plates/composite_carbon_fiber",
			"#forge:gears/desh",
			"cmi:tier_2_aviation_cell",
			"mekanism:advanced_control_circuit",
			"#railways:palettes/dye_groups/flywheel",
			Mechanisms.AERO.COM
		])

	addRecipe()
		.itemOutput("cmi:tier_2_rocket_body")
		.energy(4000)
		.inputFluid(Fluid.of("cmi:silicon_rubber", 100))
		.inputItems([
			"2x #forge:plates/desh",
			"#forge:plates/composite_carbon_fiber",
			"#forge:plates/aluminum_alloy"
		])

	addRecipe()
		.itemOutput("cmi:tier_2_rocket_fin")
		.energy(4000)
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"2x #forge:plates/desh",
			"#forge:plates/aluminum_alloy"
		])

	// T3火箭组件
	addRecipe()
		.itemOutput("cmi:tier_3_rocket_nose_cone")
		.energy(16000)
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"4x #forge:plates/superconducting_mercury",
			"#forge:gears/ostrum",
			"cmi:tier_3_aviation_cell",
			"mekanism:elite_control_circuit",
			"#railways:palettes/dye_groups/flywheel",
			Mechanisms.ASTRO.COM
		])

	addRecipe()
		.itemOutput("cmi:tier_3_rocket_body")
		.energy(4000)
		.inputFluid(Fluid.of("cmi:silicon_rubber", 100))
		.inputItems([
			"2x #forge:plates/ostrum",
			"#forge:plates/superconducting_mercury",
			"#forge:plates/titanium"
		])

	addRecipe()
		.itemOutput("cmi:tier_3_rocket_fin")
		.energy(4000)
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"2x #forge:plates/ostrum",
			"#forge:plates/titanium"
		])

	// T4火箭组件
	addRecipe()
		.itemOutput("cmi:tier_4_rocket_nose_cone")
		.energy(16000)
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"4x #forge:plates/composite_magnetic_conduction",
			"#forge:gears/calorite",
			"cmi:tier_4_aviation_cell",
			"mekanism:ultimate_control_circuit",
			"#railways:palettes/dye_groups/flywheel",
			Mechanisms.ASTRO.COM
		])

	addRecipe()
		.itemOutput("cmi:tier_4_rocket_body")
		.energy(4000)
		.inputFluid(Fluid.of("cmi:silicon_rubber", 100))
		.inputItems([
			"2x #forge:plates/calorite",
			"#forge:plates/composite_magnetic_conduction",
			"#forge:plates/titanium"
		])

	addRecipe()
		.itemOutput("cmi:tier_4_rocket_fin")
		.energy(4000)
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"2x #forge:plates/calorite",
			"#forge:plates/titanium"
		])
})
ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	function addRecipe() {
		return neoecoae.integrated_working_station()
	}

	// 引擎框架
	addRecipe()
		.itemOutput("ad_astra:engine_frame")
		.energy(4000)
		.inputItems([
			"4x #forge:plates/stainless_steel",
			"2x #forge:plates/titanium",
			"4x ad_astra:fan"
		])
		.id("ad_astra:engine_frame")

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

	addRecipe()
		.itemOutput("ad_astra:steel_engine")
		.energy(16000)
		.inputItems([
			"4x #forge:plates/composite_tungsten_steel",
			"2x #forge:gears/tungsten_steel",
			Mechanisms.AERO.COM,
			"ad_astra:engine_frame"
		])
		.id("ad_astra:steel_engine")

	addRecipe()
		.itemOutput("ad_astra:steel_tank")
		.energy(16000)
		.inputItems([
			"2x #forge:plates/composite_tungsten_steel",
			"2x #forge:plates/tungsten_steel",
			"#forge:plates/aluminum_alloy",
			"#cmi:fluid_tanks"
		])
		.id("ad_astra:steel_tank")

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

	addRecipe()
		.itemOutput("ad_astra:desh_engine")
		.energy(16000)
		.inputItems([
			"4x #forge:plates/composite_carbon_fiber",
			"2x #forge:gears/desh",
			Mechanisms.AERO.COM,
			"ad_astra:engine_frame"
		])
		.id("ad_astra:desh_engine")

	addRecipe()
		.itemOutput("ad_astra:desh_tank")
		.energy(16000)
		.inputItems([
			"2x #forge:plates/composite_carbon_fiber",
			"2x #forge:plates/desh",
			"#forge:plates/aluminum_alloy",
			"#cmi:fluid_tanks"
		])
		.id("ad_astra:desh_tank")

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

	addRecipe()
		.itemOutput("ad_astra:ostrum_engine")
		.energy(16000)
		.inputItems([
			"4x #forge:plates/superconducting_mercury",
			"2x #forge:gears/ostrum",
			Mechanisms.ASTRO.COM,
			"ad_astra:engine_frame"
		])
		.id("ad_astra:ostrum_engine")

	addRecipe()
		.itemOutput("ad_astra:ostrum_tank")
		.energy(16000)
		.inputItems([
			"2x #forge:plates/superconducting_mercury",
			"2x #forge:plates/ostrum",
			"#forge:plates/titanium",
			"#cmi:fluid_tanks"
		])
		.id("ad_astra:ostrum_tank")

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

	addRecipe()
		.itemOutput("ad_astra:calorite_engine")
		.energy(16000)
		.inputItems([
			"4x #forge:plates/composite_magnetic_conduction",
			"2x #forge:gears/calorite",
			Mechanisms.ASTRO.COM,
			"ad_astra:engine_frame"
		])
		.id("ad_astra:calorite_engine")

	addRecipe()
		.itemOutput("ad_astra:calorite_tank")
		.energy(16000)
		.inputItems([
			"2x #forge:plates/composite_magnetic_conduction",
			"2x #forge:plates/calorite",
			"#forge:plates/titanium",
			"#cmi:fluid_tanks"
		])
		.id("ad_astra:calorite_tank")
})
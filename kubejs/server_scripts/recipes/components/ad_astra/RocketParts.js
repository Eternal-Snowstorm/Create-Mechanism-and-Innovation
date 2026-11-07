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

	// T1 引擎
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

	// T1 储罐
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

	// T2 引擎
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

	// T2 储罐
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

	// T3 引擎
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

	// T3 储罐
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

	// T4 引擎
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

	// T4 储罐
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

ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	function addRecipe() {
		return neoecoae.integrated_working_station()
	}

	// 碳聚合催化片
	addRecipe()
		.itemOutput("cmi:carbon_polymerization_catalytic_plate")
		.energy(2000)
		.inputFluid(Fluid.of("tconstruct:molten_chromium", 45))
		.inputItems([
			"cmi:titanium_alloy_mesh",
			"#forge:wires/aluminum"
		])

	// 钨钢板
	addRecipe()
		.itemOutput("cmi:incomplete_tungsten_steel_plate")
		.energy(2000)
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 100))
		.inputItems([
			"#forge:plates/tungsten",
			"cmi:titanium_alloy_mesh",
			"#forge:plates/aluminum_alloy"
		])

	// 复合板
	addRecipe()
		.itemOutput("cmi:incomplete_composite_carbon_fiber_plate")
		.energy(2000)
		.inputFluid(Fluid.of("cmi:structural_plastic", 50))
		.inputItems([
			"cmi:composite_tungsten_steel_plate",
			"4x cmi:carbon_nanotube"
		])

	// 空燃料棒
	addRecipe()
		.itemOutput("cmi:empty_fuel_rod")
		.energy(2000)
		.inputFluid(Fluid.of("tconstruct:molten_lead", 90 * 8))
		.inputItems([
			"16x #forge:ingots/hop_graphite",
			"16x alexscaves:polymer_plate",
			"4x #forge:plates/lead",
		])

	// 复合钨钢板
	addRecipe()
		.itemOutput("cmi:composite_tungsten_steel_plate")
		.energy(16000)
		.inputFluid(Fluid.of("tconstruct:molten_tungsten", 90))
		.inputItems([
			"cmi:incomplete_tungsten_steel_plate",
			"#forge:plates/tungsten_steel"
		])

	// 裂变核心
	addRecipe()
		.itemOutput("alexscaves:fissile_core")
		.energy(16000)
		.inputFluid(Fluid.tag("tag", "forge:cements", 1000))
		.inputItems([
			"4x #forge:plates/lead",
			"2x alexscaves:cinder_brick",
			"4x mekanism:yellow_cake_uranium"
		])

	// 钛合金线圈
	addRecipe()
		.itemOutput("cmi:titanium_alloy_coil")
		.energy(2000)
		.inputItems([
			"#forge:gears/titanium_alloy",
			"8x #forge:wires/fluix"
		])

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
})
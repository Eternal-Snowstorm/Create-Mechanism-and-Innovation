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
})
ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	// 碳聚合催化片
	neoecoae.integrated_working_station()
		.itemOutput("cmi:carbon_polymerization_catalytic_plate")
		.energy(2000)
		.inputFluid(Fluid.of("tconstruct:molten_chromium", 45))
		.inputItems([
			"cmi:titanium_alloy_mesh",
			"#forge:wires/aluminum"
		])

	// 钨钢板
	neoecoae.integrated_working_station()
		.itemOutput("cmi:incomplete_tungsten_steel_plate")
		.energy(2000)
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 100))
		.inputItems([
			"#forge:plates/tungsten",
			"cmi:titanium_alloy_mesh",
			"#forge:plates/aluminum_alloy"
		])

	// 复合板
	neoecoae.integrated_working_station()
		.itemOutput("cmi:incomplete_composite_carbon_fiber_plate")
		.energy(2000)
		.inputFluid(Fluid.of("cmi:structural_plastic", 50))
		.inputItems([
			"cmi:composite_tungsten_steel_plate",
			"cmi:carbon_nanotube"
		])

	// 空燃料棒
	neoecoae.integrated_working_station()
		.itemOutput("cmi:empty_fuel_rod")
		.energy(2000)
		.inputFluid(Fluid.of("tconstruct:molten_lead", 90 * 8))
		.inputItems([
			"16x #forge:ingots/hop_graphite",
			"16x alexscaves:polymer_plate",
			"4x #forge:plates/lead",
		])

	// 复合钨钢板
	neoecoae.integrated_working_station()
		.itemOutput("cmi:composite_tungsten_steel_plate")
		.energy(16000)
		.inputFluid(Fluid.of("tconstruct:molten_tungsten", 90))
		.inputItems([
			"cmi:incomplete_tungsten_steel_plate",
			"#forge:plates/tungsten_steel"
		])

})
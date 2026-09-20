ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	// 基础通用构件基座
	neoecoae.integrated_working_station()
		.itemOutput("cmi:basic_mekanism_mechanism_basement")
		.inputItems([
			"ae2:logic_processor",
			"cmi:enriched_alloy",
			"mekanism:basic_control_circuit"
		])
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 100))
		.energy(2000)

	// 高级通用构件基座
	neoecoae.integrated_working_station()
		.itemOutput("cmi:advanced_mekanism_mechanism_basement")
		.energy(2000)
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"ae2:engineering_processor",
			"mekanism:alloy_infused",
			"mekanism:advanced_control_circuit"
		])


	// 精英通用构件基座
	neoecoae.integrated_working_station()
		.itemOutput("cmi:elite_mekanism_mechanism_basement")
		.energy(2000)
		.inputFluid(Fluid.of("cmi:ferrouslime", 100))
		.inputItems([
			"cmi:concurrent_processor",
			"mekanism:alloy_reinforced",
			"cmi:elite_electronic_components"
		])


	// 终级通用构件基座
	neoecoae.integrated_working_station()
		.itemOutput("cmi:ultimate_mekanism_mechanism_basement")
		.energy(2000)
		.inputFluid(Fluid.of("cmi:composite_magnetic_fluid", 100))
		.inputItems([
			"neoecoae:superconducting_processor",
			"mekanism:alloy_atomic",
			"mekanism:ultimate_control_circuit"
		])


	// 碳聚合催化片
	neoecoae.integrated_working_station()
		.itemOutput("cmi:carbon_polymerization_catalytic_plate")
		.energy(2000)
		.inputFluid(Fluid.of("tconstruct:molten_chromium", 45))
		.inputItems([
			"cmi:titanium_alloy_mesh",
			"#forge:wires/aluminum"
		])


	// 航空构件基座
	neoecoae.integrated_working_station()
		.itemOutput("cmi:aeronautic_mechanism_basement")
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 100))
		.energy(2000)
		.inputItems([
			"cmi:smart_mechanism_augment",
			"cmi:graphene",
			"#forge:plates/aluminum_alloy"
		])


	// 宇航构件基座
	neoecoae.integrated_working_station()
		.itemOutput("cmi:astronautic_mechanism_basement")
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"cmi:advanced_electronic_components",
			"cmi:carbon_nanotube",
			"#forge:plates/titanium_alloy"
		])
		.energy(4000)


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
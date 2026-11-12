ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	// 机壳
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_casing")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 400))
		.inputItems([
			"neoecoae:cryogenic_aluminum_alloy_casing",
			"2x #forge:plates/energized_superconductive",
			"ae2:smooth_sky_stone_block",
			"4x #forge:gems/energized_fluix_crystal"
		])
		.id("neoecoae:computation_casing")

	// 控制器
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_system_l4")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"neoecoae:computation_casing",
			Mechanisms.COMPUTE.COM,
			"2x neoecoae:crystal_ingot",
			"4x #forge:dusts/energized_fluix_crystal",
			"#ae2:illuminated_panel",
			"4x #forge:alloys/enriched"
		])
		.id("neoecoae:computation_system_l4")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_system_l6")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 290))
		.inputItems([
			"neoecoae:computation_system_l4",
			Mechanisms.COMPUTE.COM,
			"2x neoecoae:crystal_ingot",
			"4x #forge:dusts/energized_fluix_crystal",
			"4x #mekanism:alloys/infused"
		])
		.id("neoecoae:computation_system_l6")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_system_l9")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"neoecoae:computation_system_l6",
			Mechanisms.COMPUTE.COM,
			"2x neoecoae:crystal_ingot",
			"4x #forge:dusts/energized_fluix_crystal",
			"4x #forge:alloys/elite"
		])
		.id("neoecoae:computation_system_l9")

	// 冷却控制器
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_cooling_controller_l4")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:computation_casing",
			Mechanisms.COMPUTE.COM,
			"neoecoae:phase_change_air_cooler",
			"4x #forge:dusts/energized_fluix_crystal",
			"#ae2:illuminated_panel",
			"4x #forge:alloys/enriched"
		])
		.id("neoecoae:computation_cooling_controller_l4")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_cooling_controller_l6")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:computation_cooling_controller_l4",
			Mechanisms.COMPUTE.COM,
			"neoecoae:phase_change_air_cooler",
			"4x #forge:dusts/energized_fluix_crystal",
			"4x #mekanism:alloys/infused"
		])
		.id("neoecoae:computation_cooling_controller_l6")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_cooling_controller_l9")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:computation_cooling_controller_l6",
			Mechanisms.COMPUTE.COM,
			"neoecoae:phase_change_air_cooler",
			"4x #forge:dusts/energized_fluix_crystal",
			"4x #forge:alloys/elite"
		])
		.id("neoecoae:computation_cooling_controller_l9")

	// 并行核心
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_parallel_core_l4")
		.inputFluid(Fluid.of("cmi:molten_etrium", 180))
		.inputItems([
			"neoecoae:computation_casing",
			"4x #forge:dusts/energized_fluix_crystal",
			Mechanisms.GOLD.COM,
			"ae2:crafting_unit",
			"4x #forge:alloys/enriched",
			"neoecoae:eco_cell_component_16m"
		])
		.id("neoecoae:computation_parallel_core_l4")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_parallel_core_l6")
		.inputFluid(Fluid.of("cmi:molten_etrium", 180))
		.inputItems([
			"neoecoae:computation_parallel_core_l4",
			"4x #forge:dusts/energized_fluix_crystal",
			Mechanisms.GOLD.COM,
			"4x #mekanism:alloys/infused",
			"neoecoae:eco_cell_component_64m"
		])
		.id("neoecoae:computation_parallel_core_l6")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_parallel_core_l9")
		.inputFluid(Fluid.of("cmi:molten_etrium", 180))
		.inputItems([
			"neoecoae:computation_parallel_core_l6",
			"4x #forge:dusts/energized_fluix_crystal",
			Mechanisms.GOLD.COM,
			"4x #forge:alloys/elite",
			"neoecoae:eco_cell_component_256m"
		])
		.id("neoecoae:computation_parallel_core_l9")

	// 线程核心
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_threading_core_l4")
		.inputFluid(Fluid.of("cmi:molten_etrium", 180))
		.inputItems([
			"neoecoae:computation_casing",
			"4x #forge:dusts/energized_fluix_crystal",
			Mechanisms.COBALT.COM,
			"ae2:crafting_unit",
			"4x #forge:alloys/enriched",
			"neoecoae:eco_cell_component_16m"
		])
		.id("neoecoae:computation_threading_core_l4")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_threading_core_l6")
		.inputFluid(Fluid.of("cmi:molten_etrium", 180))
		.inputItems([
			"neoecoae:computation_threading_core_l4",
			"4x #forge:dusts/energized_fluix_crystal",
			Mechanisms.COBALT.COM,
			"4x #mekanism:alloys/infused",
			"neoecoae:eco_cell_component_64m"
		])
		.id("neoecoae:computation_threading_core_l6")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_threading_core_l9")
		.inputFluid(Fluid.of("cmi:molten_etrium", 180))
		.inputItems([
			"neoecoae:computation_threading_core_l6",
			"4x #forge:dusts/energized_fluix_crystal",
			Mechanisms.COBALT.COM,
			"4x #forge:alloys/elite",
			"neoecoae:eco_cell_component_256m"
		])
		.id("neoecoae:computation_threading_core_l9")

	// 驱动器
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_drive")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:computation_casing",
			"4x #forge:gems/energized_fluix_crystal",
			"4x cmi:magnetic_contact",
			"4x #forge:plates/energized_superconductive",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:computation_drive")

	// 传输总线
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_transmitter")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:computation_casing",
			"2x #ae2:covered_dense_cable",
			"4x #forge:plates/energized_superconductive",
			"neoecoae:phase_change_air_cooler",
			Mechanisms.COPPER.COM,
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:computation_transmitter")

	// 通讯接口
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_interface")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 400))
		.inputItems([
			"neoecoae:computation_casing",
			"8x #forge:wires/fluix",
			"#ae2:glass_cable",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:computation_interface")

	// 网络交换模块
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_network_switch")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:computation_interface",
			"2x extendedae_plus:oblivion_singularity",
			"4x #forge:plates/energized_superconductive",
			"ae2:quantum_link",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:integrated_working_station/computation_network_switch")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:computation_high_energy_network_switch")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:computation_network_switch",
			"2x extendedae_plus:oblivion_singularity",
			"4x neoecoae:cryotheum_crystal",
			"4x #forge:plates/energized_superconductive",
			"4x neoecoae:crystal_matrix",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:integrated_working_station/computation_high_energy_network_switch")
})
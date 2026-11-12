ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	//机壳
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_casing")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 400))
		.inputItems([
			"neoecoae:black_tungsten_alloy_casing",
			"2x #forge:plates/black_tungsten_alloy",
			"ae2:smooth_sky_stone_block",
			"4x #forge:gems/energized_fluix_crystal"
		])
		.id("neoecoae:crafting_casing")

	// 工作核心
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_worker")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 400))
		.inputItems([
			"neoecoae:crafting_casing",
			"4x #forge:plates/energized_superconductive",
			"create:crafting_blueprint",
			"4x ae2:cell_component_256k",
			"ae2:annihilation_core",
			"ae2:formation_core"
		])
		.id("neoecoae:crafting_worker")

	// 控制器
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_system_l4")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"neoecoae:crafting_casing",
			Mechanisms.COMPUTE.COM,
			"2x neoecoae:crystal_ingot",
			"4x #forge:dusts/energized_fluix_crystal",
			"#ae2:illuminated_panel",
			"4x #forge:alloys/enriched"
		])
		.id("neoecoae:crafting_system_l4")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_system_l6")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 290))
		.inputItems([
			"neoecoae:crafting_system_l4",
			Mechanisms.COMPUTE.COM,
			"2x neoecoae:crystal_ingot",
			"4x #forge:dusts/energized_fluix_crystal",
			"4x #mekanism:alloys/infused"
		])
		.id("neoecoae:crafting_system_l6")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_system_l9")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"neoecoae:crafting_system_l6",
			Mechanisms.COMPUTE.COM,
			"2x neoecoae:crystal_ingot",
			"4x #forge:dusts/energized_fluix_crystal",
			"4x #forge:alloys/elite"
		])
		.id("neoecoae:crafting_system_l9")

	// 并行元件
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_parallel_core_l4")
		.inputFluid(Fluid.of("cmi:molten_etrium", 180))
		.inputItems([
			"neoecoae:crafting_casing",
			"4x #forge:dusts/energized_fluix_crystal",
			Mechanisms.GOLD.COM,
			"ae2:molecular_assembler",
			"4x #forge:alloys/enriched",
			"neoecoae:eco_cell_component_16m"
		])
		.id("neoecoae:crafting_parallel_core_l4")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_parallel_core_l6")
		.inputFluid(Fluid.of("cmi:molten_etrium", 180))
		.inputItems([
			"neoecoae:crafting_parallel_core_l4",
			"4x #forge:dusts/energized_fluix_crystal",
			Mechanisms.GOLD.COM,
			"4x #mekanism:alloys/infused",
			"neoecoae:eco_cell_component_64m"
		])
		.id("neoecoae:crafting_parallel_core_l6")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_parallel_core_l9")
		.inputFluid(Fluid.of("cmi:molten_etrium", 180))
		.inputItems([
			"neoecoae:crafting_parallel_core_l6",
			"4x #forge:dusts/energized_fluix_crystal",
			Mechanisms.GOLD.COM,
			"4x #forge:alloys/elite",
			"neoecoae:eco_cell_component_256m"
		])
		.id("neoecoae:crafting_parallel_core_l9")

	// 样板总线
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_pattern_bus")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 400))
		.inputItems([
			"neoecoae:crafting_casing",
			"4x #forge:plates/energized_superconductive",
			"4x #forge:gems/energized_fluix_crystal",
			"create:crafting_blueprint",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:crafting_pattern_bus")

	// 流体输入
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:input_hatch")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:crafting_casing",
			Mechanisms.COPPER.COM,
			"neoecoae:phase_change_air_cooler",
			"ae2:annihilation_core"
		])
		.id("neoecoae:input_hatch")

	// 流体输出
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:output_hatch")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:crafting_casing",
			Mechanisms.COPPER.COM,
			"neoecoae:phase_change_air_cooler",
			"ae2:formation_core"
		])
		.id("neoecoae:output_hatch")

	// 散热器
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_vent")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:black_tungsten_alloy_casing",
			"neoecoae:phase_change_air_cooler",
			"4x #forge:plates/invar"
		])
		.id("neoecoae:crafting_vent")

	// 通讯接口
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_interface")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 400))
		.inputItems([
			"neoecoae:crafting_casing",
			"8x #forge:wires/fluix",
			"#ae2:glass_cable",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:crafting_interface")

	// 网络交换模块
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_network_switch")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:crafting_interface",
			"2x extendedae_plus:oblivion_singularity",
			"4x #forge:plates/energized_superconductive",
			"ae2:quantum_link",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:crafting_network_switch")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:crafting_high_energy_network_switch")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:crafting_network_switch",
			"2x extendedae_plus:oblivion_singularity",
			"4x neoecoae:cryotheum_crystal",
			"4x #forge:plates/energized_superconductive",
			"4x neoecoae:crystal_matrix",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:crafting_high_energy_network_switch")
})
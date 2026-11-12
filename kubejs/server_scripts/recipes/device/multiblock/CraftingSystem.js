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
})
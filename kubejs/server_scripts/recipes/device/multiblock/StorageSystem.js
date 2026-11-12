ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	// 机壳
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:storage_casing")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 400))
		.inputItems([
			"neoecoae:aluminum_alloy_casing",
			"2x #forge:plates/aluminum_alloy",
			"ae2:smooth_sky_stone_block",
			"4x #forge:gems/energized_fluix_crystal"
		])
		.id("neoecoae:storage_casing")

	// 控制器
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:storage_system_l4")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"neoecoae:storage_casing",
			Mechanisms.COMPUTE.COM,
			"2x neoecoae:crystal_ingot",
			"4x #forge:dusts/energized_fluix_crystal",
			"#ae2:illuminated_panel",
			"4x #forge:alloys/enriched"
		])
		.id("neoecoae:storage_system_l4")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:storage_system_l6")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 290))
		.inputItems([
			"neoecoae:storage_system_l4",
			Mechanisms.COMPUTE.COM,
			"2x neoecoae:crystal_ingot",
			"4x #forge:dusts/energized_fluix_crystal",
			"4x #mekanism:alloys/infused"
		])
		.id("neoecoae:storage_system_l6")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:storage_system_l9")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"neoecoae:storage_system_l6",
			Mechanisms.COMPUTE.COM,
			"2x neoecoae:crystal_ingot",
			"4x #forge:dusts/energized_fluix_crystal",
			"4x #forge:alloys/elite"
		])
		.id("neoecoae:storage_system_l9")

	// 能量元件
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:energy_cell_l4")
		.inputFluid(Fluid.of("cmi:molten_etrium", 180))
		.inputItems([
			"neoecoae:storage_casing",
			"4x #forge:dusts/energized_fluix_crystal",
			"4x #forge:plates/vanadium",
			"ae2:dense_energy_cell",
			"4x #forge:alloys/enriched"
		])
		.id("neoecoae:energy_cell_l4")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:energy_cell_l6")
		.inputFluid(Fluid.of("cmi:molten_etrium", 180))
		.inputItems([
			"neoecoae:energy_cell_l4",
			"4x #forge:dusts/energized_fluix_crystal",
			"4x #forge:plates/vanadium",
			"4x #mekanism:alloys/infused"
		])
		.id("neoecoae:energy_cell_l6")

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:energy_cell_l9")
		.inputFluid(Fluid.of("cmi:molten_etrium", 180))
		.inputItems([
			"neoecoae:energy_cell_l6",
			"4x #forge:dusts/energized_fluix_crystal",
			"4x #forge:plates/vanadium",
			"4x #forge:alloys/elite"
		])
		.id("neoecoae:energy_cell_l9")

	// 驱动器
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:eco_drive")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 400))
		.inputItems([
			"neoecoae:storage_casing",
			"4x #forge:gems/energized_fluix_crystal",
			"4x cmi:magnetic_contact",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:eco_drive")

	// 通讯接口
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:storage_interface")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 400))
		.inputItems([
			"neoecoae:storage_casing",
			"8x #forge:wires/fluix",
			"#ae2:glass_cable",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:storage_interface")

	// 散热器
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:storage_vent")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"neoecoae:storage_casing",
			"neoecoae:phase_change_air_cooler",
			"4x #forge:plates/invar"
		])
		.id("neoecoae:storage_vent")
})
// Mekanism · 核能多方块（裂变反应堆/聚变反应堆/工业激光/SPS）
ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	// 裂变反应堆
	neoecoae.integrated_working_station()
		.itemOutput("2x mekanismgenerators:reactor_glass")
		.inputFluid(Fluid.of("tconstruct:molten_lead", 90))
		.inputItems([
			"mekanism:structural_glass",
			"2x #forge:plates/stainless_steel"
		])
		.energy(2000)
		.id("mekanismgenerators:reactor/glass")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:fission_reactor_casing")
		.inputFluid(Fluid.tag("tag", "forge:cements", 1000))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/lead"
		])
		.energy(2000)
		.id("mekanismgenerators:fission_reactor/casing")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:fission_reactor_port")
		.inputItems([
			"mekanismgenerators:fission_reactor_casing",
			Mechanisms.ADVANCED.COM,
			"#forge:plates/industrial_iron"
		])
		.energy(2000)
		.id("mekanismgenerators:fission_reactor/port")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:fission_reactor_logic_adapter")
		.inputItems([
			"mekanismgenerators:fission_reactor_casing",
			Mechanisms.ADVANCED.COM,
			Mechanisms.REDSTONE.COM
		])
		.energy(2000)
		.id("mekanismgenerators:fission_reactor/logic_adapter")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:control_rod_assembly")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"mekanismgenerators:fission_reactor_casing",
			"#forge:plates/aluminum_alloy",
			"5x #forge:rods/silver",
			Mechanisms.ADVANCED.COM,
			Mechanisms.NUKE.COM,
			"4x #forge:plates/lead"
		])
		.energy(2000)
		.id("mekanismgenerators:fission_reactor/control_rod_assembly")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:fission_fuel_assembly")
		.inputFluid(Fluid.tag("tag", "forge:cements", 1000))
		.inputItems([
			"mekanismgenerators:fission_reactor_casing",
			"#forge:plates/aluminum_alloy",
			"cmi:filled_fuel_rod",
			Mechanisms.ADVANCED.COM,
			Mechanisms.NUKE.COM,
			"4x #forge:plates/lead"
		])
		.energy(2000)
		.id("mekanismgenerators:fission_reactor/fuel_assembly")

	// 聚变反应堆
	neoecoae.integrated_working_station()
		.itemOutput("2x mekanismgenerators:fusion_reactor_frame")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			Mechanisms.NUKE.COM,
			"2x #forge:plates/superconducting_mercury",
			"2x #forge:plates/composite_magnetic_conduction",
			"cmi:piezoelectric_ceramic"
		])
		.energy(2000)
		.id("mekanismgenerators:reactor/frame")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:fusion_reactor_controller")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"mekanismgenerators:fusion_reactor_frame",
			Mechanisms.ELITE.COM,
			Mechanisms.NUKE.COM,
			"#ae2:illuminated_panel"
		])
		.energy(2000)
		.id("mekanismgenerators:reactor/controller")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:laser_focus_matrix")
		.inputItems([
			"mekanismgenerators:reactor_glass",
			Mechanisms.ELITE.COM,
			"4x #forge:prisms/pure_quartz"
		])
		.energy(2000)
		.id("mekanismgenerators:laser_focus_matrix")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:fusion_reactor_port")
		.inputItems([
			"mekanismgenerators:fusion_reactor_frame",
			Mechanisms.ELITE.COM,
			"#forge:plates/industrial_iron"
		])
		.energy(2000)
		.id("mekanismgenerators:reactor/port")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:fusion_reactor_logic_adapter")
		.inputItems([
			Casing.STAINLESS_STEEL,
			Mechanisms.ELITE.COM,
			Mechanisms.REDSTONE.COM
		])
		.energy(2000)
		.id("mekanismgenerators:reactor/logic_adapter")

	// 激光器
	neoecoae.integrated_working_station()
		.itemOutput("2x mekanism:laser")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			Casing.STAINLESS_STEEL,
			Mechanisms.PHOTO.COM,
			Mechanisms.ELITE.COM,
			"2x #forge:plates/titanium_alloy",
			"2x #forge:plates/superconducting_mercury",
			"#forge:gems/ruby"
		])
		.energy(2000)
		.id("mekanism:laser")

	neoecoae.integrated_working_station()
		.itemOutput("mekanism:laser_amplifier")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			Mechanisms.PHOTO.COM,
			Mechanisms.ELITE.COM,
			"2x #forge:plates/titanium_alloy",
			"4x #forge:prisms/pure_quartz"
		])
		.energy(2000)
		.id("mekanism:laser_amplifier")

	neoecoae.integrated_working_station()
		.itemOutput("mekanism:laser_tractor_beam")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			Mechanisms.WOODEN.COM,
			Mechanisms.PHOTO.COM,
			Mechanisms.ELITE.COM,
			"2x #forge:plates/titanium_alloy",
			"4x #forge:prisms/pure_quartz"
		])
		.energy(2000)
		.id("mekanism:laser_tractor_beam")

	// 超临界
	neoecoae.integrated_working_station()
		.itemOutput("mekanism:sps_casing")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Mechanisms.ULTIMATE.COM,
			Mechanisms.NUKE.COM,
			"2x neoecoae:energized_superconductive_ingot",
			"2x #forge:plates/superconducting_mercury",
			"4x cmi:titanium_alloy_coil",
			"2x mekanism:hdpe_sheet",
			"2x neoecoae:cryotheum_crystal"
		])
		.energy(2000)
		.id("mekanism:sps_casing")

	neoecoae.integrated_working_station()
		.itemOutput("mekanism:sps_port")
		.inputItems([
			"mekanism:sps_casing",
			Mechanisms.ULTIMATE.COM,
			"#forge:plates/industrial_iron"
		])
		.energy(2000)
		.id("mekanism:sps_port")

	neoecoae.integrated_working_station()
		.itemOutput("mekanism:supercharged_coil")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			Casing.STAINLESS_STEEL,
			Mechanisms.COIL.COM,
			Mechanisms.ULTIMATE.COM,
			"2x #forge:plates/titanium_alloy",
			"2x #forge:plates/superconducting_mercury",
			"4x cmi:titanium_alloy_coil",
			"2x neoecoae:cryotheum_crystal"
		])
		.energy(2000)
		.id("mekanism:supercharged_coil")
})

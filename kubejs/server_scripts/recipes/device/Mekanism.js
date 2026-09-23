ServerEvents.recipes((event) => {
	let { neoecoae, thermal_extra } = event.getRecipes()

	// 设备组件
	neoecoae.integrated_working_station()
		.itemOutput("cmi:basalt_general_component")
		.inputFluid(Fluid.of("thermalconstruct:basalz_blood", 1000))
		.inputItems([
			"#forge:gears/chromeplated_steel",
			"#forge:plates/stainless_steel",
			"#forge:plates/osmium",
			"cmi:basalz_unit"
		])

	neoecoae.integrated_working_station()
		.itemOutput("cmi:blaze_general_component")
		.inputFluid(Fluid.of("tconstruct:blazing_blood", 1000))
		.inputItems([
			"#forge:gears/chromeplated_steel",
			"#forge:plates/stainless_steel",
			"#forge:plates/osmium",
			"cmi:blaze_unit"
		])

	neoecoae.integrated_working_station()
		.itemOutput("cmi:blitz_general_component")
		.inputFluid(Fluid.of("thermalconstruct:blitz_blood", 1000))
		.inputItems([
			"#forge:gears/chromeplated_steel",
			"#forge:plates/stainless_steel",
			"#forge:plates/osmium",
			"cmi:blitz_unit"
		])

	neoecoae.integrated_working_station()
		.itemOutput("cmi:blizz_general_component")
		.inputFluid(Fluid.of("thermalconstruct:blizz_blood", 1000))
		.inputItems([
			"#forge:gears/chromeplated_steel",
			"#forge:plates/stainless_steel",
			"#forge:plates/osmium",
			"cmi:blizz_unit"
		])

	// 热力蒸馏装置
	thermal_extra.component_assembly("mekanism:thermal_evaporation_block", [
		"mekanism:dynamic_tank",
		"#forge:plates/steel",
		"#forge:plates/constantan"
	]).id("mekanism:thermal_evaporation/block")

	thermal_extra.component_assembly("mekanism:thermal_evaporation_controller", [
		"mekanism:thermal_evaporation_block",
		Mechanisms.THERMAL.COM,
		"ae2:semi_dark_monitor"
	]).id("mekanism:thermal_evaporation/controller")

	thermal_extra.component_assembly("mekanism:thermal_evaporation_valve", [
		"mekanism:dynamic_valve",
		"#forge:plates/steel",
		"#forge:plates/constantan"
	]).id("mekanism:thermal_evaporation/valve")

	// 三相电解机
	thermal_extra.component_assembly("cmi:electrolyzer", [
		Mechanisms.HEAVY.COM,
		Casing.STEEL,
		"#forge:plates/aluminum",
		"immersiveengineering:component_electronic_adv"
	])

	// 冶金灌注机
	thermal_extra.component_assembly("mekanism:metallurgic_infuser", [
		Mechanisms.IRON.COM,
		Casing.STEEL,
		"#forge:gears/chromeplated_steel",
		"cmi:blitz_unit"
	]).id("mekanism:metallurgic_infuser")

	// 集成工作站
	thermal_extra.component_assembly("neoecoae:integrated_working_station", [
		"thermal_extra:component_assembly",
		"ae2:molecular_assembler",
		Casing.STAINLESS_STEEL,
		"mekanism:basic_control_circuit",
		Fluid.of("cmi:molten_etrium", 90)
	])

	neoecoae.integrated_working_station()
		.itemOutput("2x mekanism:steel_casing")
		.inputItems([
			"2x #forge:plates/stainless_steel",
			"cmi:osmium_tile",
			"#forge:gears/chromeplated_steel"
		])

	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:integrated_working_station")
		.inputItems([
			"thermal_extra:component_assembly",
			"ae2:molecular_assembler",
			Casing.STAINLESS_STEEL,
			"mekanism:basic_control_circuit"
		])
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.id("neoecoae:integrated_working_station")

	// 电力高炉
	neoecoae.integrated_working_station()
		.itemOutput("cmi:electronic_blast_furnace")
		.inputItems([
			Casing.STAINLESS_STEEL,
			"ae2:semi_dark_monitor",
			"ad_astra:etrionic_capacitor",
			Mechanisms.NETHER.COM,
			Mechanisms.BASIC.COM
		])

	// 感应矩阵
	neoecoae.integrated_working_station()
		.itemOutput("2x mekanism:induction_casing")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/aluminum",
			"2x #forge:plates/vanadium"
		])
		.inputFluid(Fluid.of("cmi:structural_plastic", 100))
		.id("mekanism:induction/casing")

	neoecoae.integrated_working_station()
		.itemOutput("mekanism:induction_port")
		.inputItems([
			"mekanism:induction_casing",
			Mechanisms.BASIC.COM,
			"#forge:plates/industrial_iron"
		]).id("mekanism:induction/port")

	// 锅炉
	neoecoae.integrated_working_station()
		.itemOutput("2x mekanism:boiler_casing")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/bronze",
			"2x #forge:plates/tungsten_steel"
		])
		.inputFluid(Fluid.of("cmi:structural_plastic", 100))
		.id("mekanism:boiler_casing")

	neoecoae.integrated_working_station()
		.itemOutput("mekanism:boiler_valve")
		.inputItems([
			"mekanism:boiler_casing",
			Mechanisms.BASIC.COM,
			"#forge:plates/industrial_iron"
		]).id("mekanism:boiler_valve")

	neoecoae.integrated_working_station()
		.itemOutput("mekanism:pressure_disperser")
		.inputItems([
			"ad_astra:vent",
			"2x #forge:plates/steel",
			"2x #forge:plates/stainless_steel"
		])
		.id("mekanism:pressure_disperser")

	neoecoae.integrated_working_station()
		.itemOutput("2x mekanism:superheating_element")
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/bronze",
			"2x moreburners:nickel_coil",
			Mechanisms.COIL.COM
		]).id("mekanism:superheating_element")

	// 涡轮
	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:rotational_complex")
		.inputItems([
			"2x #forge:plates/stainless_steel",
			Mechanisms.STEAM.COM,
			"#forge:gears/chromeplated_steel",
			"mekanism:basic_control_circuit"
		]).id("mekanismgenerators:rotational_complex")

	neoecoae.integrated_working_station()
		.itemOutput("2x mekanismgenerators:electromagnetic_coil")
		.inputItems([
			"2x #forge:ingots/black_tungsten_alloy",
			"2x #forge:plates/vanadium",
			"immersiveengineering:coil_mv",
			Mechanisms.COIL.COM
		])
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.id("mekanismgenerators:electromagnetic_coil")

	neoecoae.integrated_working_station()
		.itemOutput("2x mekanismgenerators:turbine_casing")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/stainless_steel",
			"2x #forge:plates/osmium"
		]).id("mekanismgenerators:turbine/casing")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:turbine_valve")
		.inputItems([
			"mekanismgenerators:turbine_casing",
			Mechanisms.BASIC.COM,
			"#forge:plates/industrial_iron"
		]).id("mekanismgenerators:turbine/valve")

	neoecoae.integrated_working_station()
		.itemOutput("2x mekanismgenerators:turbine_vent")
		.inputItems([
			"ad_astra:vent",
			"2x #forge:plates/stainless_steel",
			"2x #forge:plates/osmium"
		]).id("mekanismgenerators:turbine/vent")

	neoecoae.integrated_working_station()
		.itemOutput("2x mekanismgenerators:saturating_condenser")
		.inputItems([
			"mekanismgenerators:turbine_casing",
			"cmi:nuke_cooler",
			"#forge:plates/invar"
		]).id("mekanismgenerators:saturating_condenser")

	// 富集仓
	neoecoae.integrated_working_station()
		.itemOutput("mekanism:enrichment_chamber")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/industrial_iron",
			Mechanisms.BASIC.COM,
			Mechanisms.IRON.COM,
			"cmi:blizz_general_component"
		])
		.id("mekanism:enrichment_chamber")

	// 锯木机
	neoecoae.integrated_working_station()
		.itemOutput("mekanism:precision_sawmill")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/industrial_iron",
			Mechanisms.BASIC.COM,
			"3x thermal:saw_blade",
			"cmi:blizz_general_component"
		])
		.id("mekanism:precision_sawmill")

	// 融合机
	neoecoae.integrated_working_station()
		.itemOutput("mekanism:combiner")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/industrial_iron",
			Mechanisms.BASIC.COM,
			Mechanisms.STONE.COM,
			"cmi:blitz_general_component"
		])
		.id("mekanism:combiner")

	// 粉碎机
	neoecoae.integrated_working_station()
		.itemOutput("mekanism:crusher")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/industrial_iron",
			Mechanisms.BASIC.COM,
			"2x #forge:gears/chromeplated_steel",
			"cmi:basalt_general_component"
		])
		.id("mekanism:crusher")

	// 熔炼炉
	neoecoae.integrated_working_station()
		.itemOutput("mekanism:energized_smelter")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/industrial_iron",
			Mechanisms.BASIC.COM,
			Mechanisms.NETHER.COM,
			"cmi:blaze_general_component"
		])
		.id("mekanism:energized_smelter")

	// 裂变反应堆
	neoecoae.integrated_working_station()
		.itemOutput("2x mekanismgenerators:reactor_glass")
		.inputFluid(Fluid.of("tconstruct:molten_lead", 90))
		.inputItems([
			"mekanism:structural_glass",
			"2x #forge:plates/stainless_steel"
		])
		.id("mekanismgenerators:reactor/glass")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:fission_reactor_casing")
		.inputFluid(Fluid.tag("tag", "forge:cements", 1000))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/lead"
		])
		.id("mekanismgenerators:fission_reactor/casing")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:fission_reactor_port")
		.inputItems([
			"mekanismgenerators:fission_reactor_casing",
			Mechanisms.ADVANCED.COM,
			"#forge:plates/industrial_iron"
		])
		.id("mekanismgenerators:fission_reactor/port")

	neoecoae.integrated_working_station()
		.itemOutput("mekanismgenerators:fission_reactor_logic_adapter")
		.inputItems([
			"mekanismgenerators:fission_reactor_casing",
			Mechanisms.ADVANCED.COM,
			Mechanisms.REDSTONE.COM
		])
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
		.id("mekanismgenerators:fission_reactor/fuel_assembly")
})
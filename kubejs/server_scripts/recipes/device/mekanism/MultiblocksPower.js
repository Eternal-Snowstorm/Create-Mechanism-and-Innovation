// Mekanism · 能源多方块（热力蒸发塔/感应矩阵/锅炉/汽轮机）
ServerEvents.recipes((event) => {
	let { thermal_extra, neoecoae } = event.getRecipes()


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


	// 感应矩阵
	addRecipe(neoecoae)
		.itemOutput("2x mekanism:induction_casing")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/aluminum",
			"2x #forge:plates/vanadium"
		])
		.inputFluid(Fluid.of("cmi:structural_plastic", 100))
		.energy(2000)
		.id("mekanism:induction/casing")


	addRecipe(neoecoae)
		.itemOutput("mekanism:induction_port")
		.inputItems([
			"mekanism:induction_casing",
			Mechanisms.BASIC.COM,
			"#forge:plates/industrial_iron"
		])
		.energy(2000)
		.id("mekanism:induction/port")


	// 锅炉
	addRecipe(neoecoae)
		.itemOutput("2x mekanism:boiler_casing")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/bronze",
			"2x #forge:plates/tungsten_steel"
		])
		.inputFluid(Fluid.of("cmi:structural_plastic", 100))
		.energy(2000)
		.id("mekanism:boiler_casing")


	addRecipe(neoecoae)
		.itemOutput("mekanism:boiler_valve")
		.inputItems([
			"mekanism:boiler_casing",
			Mechanisms.BASIC.COM,
			"#forge:plates/industrial_iron"
		])
		.energy(2000)
		.id("mekanism:boiler_valve")


	addRecipe(neoecoae)
		.itemOutput("mekanism:pressure_disperser")
		.inputItems([
			"ad_astra:vent",
			"2x #forge:plates/steel",
			"2x #forge:plates/stainless_steel"
		])
		.energy(2000)
		.id("mekanism:pressure_disperser")


	addRecipe(neoecoae)
		.itemOutput("2x mekanism:superheating_element")
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/bronze",
			"2x moreburners:nickel_coil",
			Mechanisms.COIL.COM
		])
		.energy(2000)
		.id("mekanism:superheating_element")


	// 涡轮
	addRecipe(neoecoae)
		.itemOutput("mekanismgenerators:rotational_complex")
		.inputItems([
			"2x #forge:plates/stainless_steel",
			Mechanisms.STEAM.COM,
			"#forge:gears/chromeplated_steel",
			"mekanism:basic_control_circuit"
		])
		.energy(2000)
		.id("mekanismgenerators:rotational_complex")


	addRecipe(neoecoae)
		.itemOutput("2x mekanismgenerators:electromagnetic_coil")
		.inputItems([
			"2x #forge:ingots/black_tungsten_alloy",
			"2x #forge:plates/vanadium",
			"immersiveengineering:coil_mv",
			Mechanisms.COIL.COM
		])
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.energy(2000)
		.id("mekanismgenerators:electromagnetic_coil")


	addRecipe(neoecoae)
		.itemOutput("2x mekanismgenerators:turbine_casing")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/stainless_steel",
			"2x #forge:plates/osmium"
		])
		.energy(2000)
		.id("mekanismgenerators:turbine/casing")


	addRecipe(neoecoae)
		.itemOutput("mekanismgenerators:turbine_valve")
		.inputItems([
			"mekanismgenerators:turbine_casing",
			Mechanisms.BASIC.COM,
			"#forge:plates/industrial_iron"
		])
		.energy(2000)
		.id("mekanismgenerators:turbine/valve")


	addRecipe(neoecoae)
		.itemOutput("2x mekanismgenerators:turbine_vent")
		.inputItems([
			"ad_astra:vent",
			"2x #forge:plates/stainless_steel",
			"2x #forge:plates/osmium"
		])
		.energy(2000)
		.id("mekanismgenerators:turbine/vent")


	addRecipe(neoecoae)
		.itemOutput("2x mekanismgenerators:saturating_condenser")
		.inputItems([
			"mekanismgenerators:turbine_casing",
			"cmi:nuke_cooler",
			"#forge:plates/invar"
		])
		.energy(2000)
		.id("mekanismgenerators:saturating_condenser")
})

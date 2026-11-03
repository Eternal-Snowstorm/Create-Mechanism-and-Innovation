// Mekanism · 工作站与机壳（能量板、冶金灌注机、整合工作站）
ServerEvents.recipes((event) => {
	let { thermal_extra, neoecoae } = event.getRecipes()


	// 能量板
	thermal_extra.component_assembly("mekanism:energy_tablet", [
		"#forge:plates/vanadium",
		"#forge:plates/industrial_iron",
		"#forge:plates/signalum",
		Fluid.of("cmi:molten_etrium", 90)
	]).id("mekanism:energy_tablet")


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


	addRecipe(neoecoae)
		.itemOutput("neoecoae:integrated_working_station")
		.inputItems([
			"thermal_extra:component_assembly",
			"ae2:molecular_assembler",
			Casing.STAINLESS_STEEL,
			"mekanism:basic_control_circuit"
		])
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.energy(2000)
		.id("neoecoae:integrated_working_station")
})

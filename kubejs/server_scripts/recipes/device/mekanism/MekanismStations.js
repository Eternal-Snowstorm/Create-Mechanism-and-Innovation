ServerEvents.recipes((event) => {
	let { thermal_extra, neoecoae } = event.getRecipes()

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
ServerEvents.recipes((event) => {
	let { thermal_extra } = event.getRecipes()

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
})
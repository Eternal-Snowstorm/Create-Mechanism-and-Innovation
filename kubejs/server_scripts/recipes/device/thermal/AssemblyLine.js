ServerEvents.recipes((event) => {
	let { thermal_extra, create, thermal } = event.getRecipes()
	let inc = "cmi:incomplete_thermal_devices"

	// 装配机
	create.sequenced_assembly("thermal_extra:component_assembly", Casing.THERMAL, [
		create.deploying(inc, [inc, Mechanisms.THERMAL.COM]),
		create.deploying(inc, [inc, "#forge:gears/iron"]),
		create.deploying(inc, [inc, "create:brass_hand"])
	]).transitionalItem(inc)
		.loops(1)
		.id("thermal_extra:crafting/component_assembly")

	addComponRecipe(thermal_extra, "thermal_extra:component_assembly", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"thermal:rf_coil",
		"create:brass_hand"
	])
})
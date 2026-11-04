// Thermal · 化学反应器（普通与强化）
ServerEvents.recipes((event) => {
	let { thermal_extra, create, thermal, kubejs } = event.recipes

	// 反应釜
	addComponRecipe(thermal_extra, "cmi:chemical_reactor", [
		Casing.STEEL,
		Mechanisms.LIGHT.COM,
		"#forge:gears/invar",
		"create:whisk"
	])

	addComponRecipe(thermal_extra, "cmi:reinforced_chemical_reactor", [
		"cmi:chemical_reactor",
		Mechanisms.HEAVY.COM,
		"create:blaze_burner"
	])
})

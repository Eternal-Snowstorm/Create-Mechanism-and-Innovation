// Thermal · 部件装配线与热力单元（component_assembly 自身、thermal/blaze/basalz/blitz/blizz 单元）
ServerEvents.recipes((event) => {
	let { thermal_extra, create, thermal } = event.recipes
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

	// 热力单元
	addComponRecipe(thermal_extra, "cmi:thermal_unit", [
		Fluid.of("thermal:resin", 50),
		"#forge:plates/signalum",
		"#forge:plates/invar"
	])

	thermal.bottler("cmi:blaze_unit", [
		"cmi:thermal_unit",
		Fluid.of("tconstruct:blazing_blood", 100)
	])

	thermal.bottler("cmi:basalz_unit", [
		"cmi:thermal_unit",
		Fluid.of("thermalconstruct:basalz_blood", 100)
	])

	thermal.bottler("cmi:blitz_unit", [
		"cmi:thermal_unit",
		Fluid.of("thermalconstruct:blitz_blood", 100)
	])

	thermal.bottler("cmi:blizz_unit", [
		"cmi:thermal_unit",
		Fluid.of("thermalconstruct:blizz_blood", 100)
	])
})

ServerEvents.recipes((event) => {
	let { kubejs, thermal } = event.getRecipes()

	// 红石伺服器
	kubejs.shaped("thermal:redstone_servo", [
		"A A",
		" B ",
		"A A"
	], {
		A: "#forge:wires/signalum",
		B: "#forge:plates/iron"
	}).id("thermal:redstone_servo")

	// 机器框架
	kubejs.shaped("4x thermal:machine_frame", [
		"ABA",
		"BCB",
		"ABA"
	], {
		A: "#forge:plates/invar",
		B: Casing.INDUSTRY,
		C: "#forge:gears/tin"
	}).id("thermal:machine_frame")

	// 红石通量线圈
	kubejs.shaped("2x thermal:rf_coil", [
		"BAC",
		"A A",
		"CAB"
	], {
		A: "#forge:wires/signalum",
		B: "#forge:rods/gold",
		C: "#forge:plates/gold"
	}).id("thermal:rf_coil")

	// 锯片
	kubejs.shaped("thermal:saw_blade", [
		" X ",
		"XYX",
		" X "
	], {
		X: "#forge:plates/iron",
		Y: "#forge:plates/andesite_alloy"
	}).id("thermal:saw_blade")

	// 钻头
	kubejs.shaped("thermal:drill_head", [
		"YY ",
		"Y X",
		" XX"
	], {
		X: "#forge:plates/iron",
		Y: "#forge:plates/andesite_alloy"
	}).id("thermal:drill_head")

	// 红宝石齿轮
	thermal.press("thermal:ruby_gear", [
		"4x #forge:gems/ruby",
		"cmi:gear_mold"
	])

	// 蓝宝石齿轮
	thermal.press("thermal:sapphire_gear", [
		"4x #forge:gems/sapphire",
		"cmi:gear_mold"
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

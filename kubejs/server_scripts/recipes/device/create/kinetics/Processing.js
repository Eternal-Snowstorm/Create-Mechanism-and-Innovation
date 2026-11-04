// Create · 加工设备（辊压/搅拌/鼓风/磨盘/锯/钻/离心等）
ServerEvents.recipes((event) => {
	let { kubejs, create } = event.getRecipes()

	// 动力辊压机
	verticalDevice(kubejs, "create:mechanical_press", "create:crafting/kinetics/mechanical_press", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "cmi:hammer_head"
	})

	// 动力搅拌器
	verticalDevice(kubejs, "create:mechanical_mixer", "create:crafting/kinetics/mechanical_mixer", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "create:whisk",
	})

	// 鼓风机
	verticalDevice(kubejs, "create:encased_fan", "create:crafting/kinetics/encased_fan", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "create:propeller",
	})

	// 石磨
	verticalDevice(kubejs, "create:millstone", "create:crafting/kinetics/millstone", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#forge:stone",
	})

	// 动力收割机
	kubejs.shaped("create:mechanical_harvester", [
		"XXX",
		" C ",
		" M "
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#forge:rods/andesite",
	}).id("create:crafting/kinetics/mechanical_harvester")

	// 动力犁
	kubejs.shaped("create:mechanical_plough", [
		"XXX",
		" C ",
		" M "
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#forge:plates/andesite_alloy",
	}).id("create:crafting/kinetics/mechanical_plough")

	// 动力压路机
	kubejs.shaped("2x create:mechanical_roller", [
		"CX ",
		"XMX",
		" X "
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#forge:plates/andesite_alloy",
	}).id("create:crafting/kinetics/mechanical_roller")

	// 振动台
	kubejs.shaped("vintageimprovements:vibrating_table", [
		" Y ",
		"XMX",
		" C "
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#vintageimprovements:springs/andesite",
		Y: "#minecraft:planks",
	}).id("vintageimprovements:craft/vibrating_table")

	// 轧机
	kubejs.shaped("createaddition:rolling_mill", [
		" M ",
		"XYX",
		" C "
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#forge:plates/andesite_alloy",
		Y: "#create:shaft",
	}).id("createaddition:crafting/rolling_mill")

	// 卷簧机
	kubejs.shaped("vintageimprovements:spring_coiling_machine", [
		"X",
		"C",
		"M"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "vintageimprovements:spring_coiling_machine_wheel",
	}).id("vintageimprovements:craft/spring_coiling_machine")

	// 冲压机
	verticalDevice(kubejs, "vintageimprovements:curving_press", "vintageimprovements:craft/curving_press", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: ["#forge:plates/iron", "#forge:plates/andesite_alloy"]
	})

	// 动力锯
	verticalDevice(kubejs, "create:mechanical_saw", "create:crafting/kinetics/mechanical_saw", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "thermal:saw_blade"
	})

	// 动力钻头
	verticalDevice(kubejs, "create:mechanical_drill", "create:crafting/kinetics/mechanical_drill", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "thermal:drill_head"
	})

	// 离心机
	kubejs.shaped("vintageimprovements:centrifuge", [
		"P P",
		"LML",
		"SCS"
	], {
		P: "#forge:plates/andesite_alloy",
		L: "#minecraft:logs",
		M: Mechanisms.ANDESITE.COM,
		S: "#vintageimprovements:springs/andesite",
		C: Casing.ANDESITE
	}).id("vintageimprovements:craft/centrifuge")

	// 压缩机
	kubejs.shaped("vintageimprovements:vacuum_chamber", [
		" M ",
		"YCY",
		" X "
	], {
		M: Mechanisms.STEAM.COM,
		C: Casing.BRONZE,
		X: "create:mechanical_pump",
		Y: "#vintageimprovements:springs/bronze"
	}).id("vintageimprovements:craft/vacuum_chamber")

	// 可控燃烧室
	kubejs.shaped("createdieselgenerators:burner", [
		" B ",
		"AMA",
		" C "
	], {
		A: "#forge:plates/andesite_alloy",
		B: "#forge:plates/brass",
		M: Mechanisms.NETHER.COM,
		C: "create:empty_blaze_burner"
	}).id("createdieselgenerators:crafting/burner")

	// 特斯拉线圈
	create.mechanical_crafting("createaddition:tesla_coil", [
		"PAP",
		" I ",
		"BMB",
		"VCV"
	], {
		P: "#forge:plates/copper",
		A: "immersiveengineering:coil_lv",
		I: "#forge:ingots/andesite_alloy",
		B: "#forge:plates/brass",
		M: Mechanisms.COIL.COM,
		V: "#forge:plates/vanadium",
		C: Casing.BRASS
	}).id("createaddition:mechanical_crafting/tesla_coil")

	// 激光雕刻机
	create.mechanical_crafting("vintageimprovements:laser", [
		"VCV",
		"RMR",
		" G ",
		"PLP"
	], {
		V: "#forge:plates/vanadium",
		C: Casing.BRASS,
		R: "thermal:rf_coil",
		M: Mechanisms.PRECISION.COM,
		G: "#forge:gears/iron",
		P: "#forge:plates/industrial_iron",
		L: "vintageimprovements:laser_item"
	}).id("vintageimprovements:craft/laser")

	// 磨砂机
	kubejs.shaped("cmi:mechanical_belt_grinder", [
		"B",
		"C",
		"M"
	], {
		B: "vintageimprovements:grinder_belt",
		C: Casing.BRASS,
		M: Mechanisms.PRECISION.COM
	})

	// 马达
	kubejs.shaped("cmi:accelerator_motor", [
		"S",
		"C",
		"M"
	], {
		S: "#create:shaft",
		C: Casing.ANDESITE,
		M: Mechanisms.ANDESITE.COM
	})
})

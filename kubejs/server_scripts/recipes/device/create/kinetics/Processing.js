ServerEvents.recipes((event) => {
	let { kubejs, create } = event.getRecipes()

	// 动力辊压机
	verticalDevice(kubejs, "create:mechanical_press", "create:crafting/kinetics/mechanical_press", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "cmi:hammer_head"
	})

	// 动力搅拌器
	verticalDevice(kubejs, "create:mechanical_mixer", "create:crafting/kinetics/mechanical_mixer", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "create:whisk",
	})

	// 鼓风机
	verticalDevice(kubejs, "create:encased_fan", "create:crafting/kinetics/encased_fan", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "create:propeller",
	})

	// 石磨
	verticalDevice(kubejs, "create:millstone", "create:crafting/kinetics/millstone", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "#forge:stone",
	})

	// 动力收割机
	kubejs.shaped("create:mechanical_harvester", [
		"AAA",
		" B ",
		" C "
	], {
		A: "#forge:rods/andesite",
		B: Casing.ANDESITE,
		C: Mechanisms.ANDESITE.COM,
	}).id("create:crafting/kinetics/mechanical_harvester")

	// 动力犁
	kubejs.shaped("create:mechanical_plough", [
		"AAA",
		" B ",
		" C "
	], {
		A: "#forge:plates/andesite_alloy",
		B: Casing.ANDESITE,
		C: Mechanisms.ANDESITE.COM,
	}).id("create:crafting/kinetics/mechanical_plough")

	// 动力压路机
	kubejs.shaped("2x create:mechanical_roller", [
		"AB ",
		"BCB",
		" B "
	], {
		A: Casing.ANDESITE,
		B: "#forge:plates/andesite_alloy",
		C: Mechanisms.ANDESITE.COM,
	}).id("create:crafting/kinetics/mechanical_roller")

	// 振动台
	kubejs.shaped("vintageimprovements:vibrating_table", [
		" A ",
		"BCB",
		" D "
	], {
		A: "#minecraft:planks",
		B: "#vintageimprovements:springs/andesite",
		C: Mechanisms.ANDESITE.COM,
		D: Casing.ANDESITE,
	}).id("vintageimprovements:craft/vibrating_table")

	// 轧机
	kubejs.shaped("createaddition:rolling_mill", [
		" A ",
		"BCB",
		" D "
	], {
		A: Mechanisms.ANDESITE.COM,
		B: "#forge:plates/andesite_alloy",
		C: "#create:shaft",
		D: Casing.ANDESITE,
	}).id("createaddition:crafting/rolling_mill")

	// 卷簧机
	kubejs.shaped("vintageimprovements:spring_coiling_machine", [
		"A",
		"B",
		"C"
	], {
		A: "vintageimprovements:spring_coiling_machine_wheel",
		B: Casing.ANDESITE,
		C: Mechanisms.ANDESITE.COM,
	}).id("vintageimprovements:craft/spring_coiling_machine")

	// 冲压机
	verticalDevice(kubejs, "vintageimprovements:curving_press", "vintageimprovements:craft/curving_press", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: ["#forge:plates/iron", "#forge:plates/andesite_alloy"]
	})

	// 动力锯
	verticalDevice(kubejs, "create:mechanical_saw", "create:crafting/kinetics/mechanical_saw", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "thermal:saw_blade"
	})

	// 动力钻头
	verticalDevice(kubejs, "create:mechanical_drill", "create:crafting/kinetics/mechanical_drill", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "thermal:drill_head"
	})

	// 粉碎轮
	create.mechanical_crafting("4x create:crushing_wheel", [
		" AAA ",
		"AABAA",
		"ABCBA",
		"AABAA",
		" AAA "
	], {
		A: "create:andesite_alloy",
		B: "thermal:iron_gear",
		C: "cmi:andesite_mechanism"
	}).id("create:mechanical_crafting/crushing_wheel")

	// 离心机
	kubejs.shaped("vintageimprovements:centrifuge", [
		"A A",
		"BCB",
		"DED"
	], {
		A: "#forge:plates/andesite_alloy",
		B: "#minecraft:logs",
		C: Mechanisms.ANDESITE.COM,
		D: "#vintageimprovements:springs/andesite",
		E: Casing.ANDESITE
	}).id("vintageimprovements:craft/centrifuge")

	// 压缩机
	kubejs.shaped("vintageimprovements:vacuum_chamber", [
		" A ",
		"BCB",
		" D "
	], {
		A: Mechanisms.STEAM.COM,
		B: "#vintageimprovements:springs/bronze",
		C: Casing.BRONZE,
		D: "create:mechanical_pump"
	}).id("vintageimprovements:craft/vacuum_chamber")

	// 可控燃烧室
	kubejs.shaped("createdieselgenerators:burner", [
		" A ",
		"BCB",
		" D "
	], {
		A: "#forge:plates/brass",
		B: "#forge:plates/andesite_alloy",
		C: Mechanisms.NETHER.COM,
		D: "create:empty_blaze_burner"
	}).id("createdieselgenerators:crafting/burner")

	// 特斯拉线圈
	create.mechanical_crafting("createaddition:tesla_coil", [
		"ABA",
		" C ",
		"DED",
		"FGF"
	], {
		A: "#forge:plates/copper",
		B: "immersiveengineering:coil_lv",
		C: "#forge:ingots/andesite_alloy",
		D: "#forge:plates/brass",
		E: Mechanisms.COIL.COM,
		F: "#forge:plates/vanadium",
		G: Casing.BRASS
	}).id("createaddition:mechanical_crafting/tesla_coil")

	// 激光雕刻机
	create.mechanical_crafting("vintageimprovements:laser", [
		"ABA",
		"CDC",
		" E ",
		"FGF"
	], {
		A: "#forge:plates/vanadium",
		B: Casing.BRASS,
		C: "thermal:rf_coil",
		D: Mechanisms.PRECISION.COM,
		E: "#forge:gears/iron",
		F: "#forge:plates/industrial_iron",
		G: "vintageimprovements:laser_item"
	}).id("vintageimprovements:craft/laser")

	// 磨砂机
	kubejs.shaped("cmi:mechanical_belt_grinder", [
		"A",
		"B",
		"C"
	], {
		A: "vintageimprovements:grinder_belt",
		B: Casing.BRASS,
		C: Mechanisms.PRECISION.COM
	})

	// 马达
	kubejs.shaped("cmi:accelerator_motor", [
		"A",
		"B",
		"C"
	], {
		A: "#create:shaft",
		B: Casing.ANDESITE,
		C: Mechanisms.ANDESITE.COM
	})

	// 交流发电机
	create.mechanical_crafting("createaddition:alternator", [
		" ABA ",
		"ACDCA",
		" AEA "
	], {
		A: "#forge:plates/industrial_iron",
		B: "create:shaft",
		C: "cmi:simple_battery",
		D: "cmi:coil_mechanism",
		E: "#forge:plates/electrum"
	}).id("createaddition:mechanical_crafting/alternator")

	// 电动马达
	create.mechanical_crafting("createaddition:electric_motor", [
		" ABA ",
		"ACDCA",
		" AEA "
	], {
		A: "#forge:plates/brass",
		B: "create:shaft",
		C: "cmi:simple_battery",
		D: "cmi:coil_mechanism",
		E: "#forge:plates/electrum"
	}).id("createaddition:mechanical_crafting/electric_motor")

	// 电磁炉
	create.mechanical_crafting("2x moreburners:electric_burner", [
		"ABA",
		"CDC",
		"EFE"
	], {
		A: "#forge:ingots/andesite_alloy",
		B: "moreburners:copper_coil",
		C: Casing.ANDESITE,
		D: "create:empty_blaze_burner",
		E: Mechanisms.COIL.COM,
		F: "#forge:plates/iron"
	}).id("moreburners:electric_burner")
})

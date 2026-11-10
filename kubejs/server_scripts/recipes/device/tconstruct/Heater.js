ServerEvents.recipes((event) => {
	let { kubejs, minecraft } = event.getRecipes()
	const BRICK = "tconstruct:seared_brick"
	const PRISM = "#forge:glass/prism"

	// 焦黑融化器
	kubejs.shaped("tconstruct:seared_melter", [
		"BXB",
		"BMB"
	], {
		M: Mechanisms.STONE.COM,
		B: BRICK,
		X: "#tconstruct:seared_tanks"
	}).id("tconstruct:smeltery/seared/melter")

	// 焦黑加热器
	kubejs.shaped("tconstruct:seared_heater", [
		"BBB",
		"BMB",
		"BBB"
	], {
		M: Mechanisms.STONE.COM,
		B: BRICK
	}).id("tconstruct:smeltery/seared/heater")

	// 冶炼炉控制器
	kubejs.shaped("tconstruct:smeltery_controller", [
		"AAA",
		"BCB",
		"DED"
	], {
		A: "tconstruct:seared_bricks",
		B: "tconstruct:seared_brick",
		C: Mechanisms.COPPER.COM,
		D: "thermal:cured_rubber",
		E: Mechanisms.IRON.COM
	}).id("tconstruct:smeltery/casting/seared/smeltery_controller")

	// 焦黑燃料储罐
	kubejs.shaped("tconstruct:seared_fuel_tank", [
		" B ",
		"BPB",
		" B "
	], {
		P: PRISM,
		B: BRICK
	}).id("tconstruct:smeltery/seared/fuel_tank")

	// 焦黑材料储罐
	kubejs.shaped("tconstruct:seared_ingot_tank", [
		"B B",
		" P ",
		"B B"
	], {
		P: PRISM,
		B: BRICK
	}).id("tconstruct:smeltery/seared/ingot_tank")

	// 焦黑燃料量器
	minecraft.stonecutting("tconstruct:seared_fuel_gauge", [
		"tconstruct:seared_fuel_tank"
	]).id("tconstruct:smeltery/seared/fuel_gauge")

	minecraft.stonecutting("tconstruct:seared_fuel_tank", [
		"tconstruct:seared_fuel_gauge"
	])

	// 焦黑材料量器
	minecraft.stonecutting("tconstruct:seared_ingot_gauge", [
		"tconstruct:seared_ingot_tank"
	]).id("tconstruct:smeltery/seared/ingot_gauge")

	minecraft.stonecutting("tconstruct:seared_ingot_tank", [
		"tconstruct:seared_ingot_gauge"
	])

	// 焦褐合金炉
	kubejs.shaped("tconstruct:scorched_alloyer", [
		"ABA",
		"AMA"
	], {
		A: "tconstruct:scorched_brick",
		B: "#tconstruct:scorched_tanks",
		M: Mechanisms.NETHER.COM
	}).id("tconstruct:smeltery/scorched/alloyer")

	// 焦褐燃料储罐
	kubejs.shaped("tconstruct:scorched_fuel_tank", [
		" B ",
		"BPB",
		" B "
	], {
		P: "#forge:glass",
		B: "tconstruct:scorched_brick"
	}).id("tconstruct:smeltery/scorched/fuel_tank")

	// 焦褐材料储罐
	kubejs.shaped("tconstruct:scorched_ingot_tank", [
		"B B",
		" P ",
		"B B"
	], {
		P: "#forge:glass",
		B: "tconstruct:scorched_brick"
	}).id("tconstruct:smeltery/scorched/ingot_tank")

	// 焦褐燃料量器
	minecraft.stonecutting("tconstruct:scorched_fuel_gauge", [
		"tconstruct:scorched_fuel_tank"
	]).id("tconstruct:smeltery/scorched/fuel_gauge")

	minecraft.stonecutting("tconstruct:scorched_fuel_tank", [
		"tconstruct:scorched_fuel_gauge"
	])

	// 焦褐材料量器
	minecraft.stonecutting("tconstruct:scorched_ingot_gauge", [
		"tconstruct:scorched_ingot_tank"
	]).id("tconstruct:smeltery/scorched/ingot_gauge")

	minecraft.stonecutting("tconstruct:scorched_ingot_tank", [
		"tconstruct:scorched_ingot_gauge"
	])

	// 铸模箱
	kubejs.shaped("tconstruct:cast_chest", [
		"BXB",
		"BYB",
		"BMB"
	], {
		M: Mechanisms.STONE.COM,
		B: BRICK,
		X: "#tconstruct:patterns/reusable",
		Y: "#forge:chests"
	}).id("tconstruct:tables/cast_chest")

	// 空烈焰人燃烧室
	kubejs.shaped("create:empty_blaze_burner", [
		"ABA",
		"A A",
		"CCC"
	], {
		A: "#forge:plates/iron",
		B: Mechanisms.IRON.COM,
		C: "minecraft:nether_bricks"
	}).id("create:crafting/kinetics/empty_blaze_burner")

	// 烈焰人燃烧室
	kubejs.shaped("create:blaze_burner", [
		"ABA",
		"ADA",
		"CCC"
	], {
		A: "#forge:plates/iron",
		B: Mechanisms.IRON.COM,
		C: "minecraft:nether_bricks",
		D: Mechanisms.NETHER.COM
	}).id("create:crafting/kinetics/blaze_burner")
})
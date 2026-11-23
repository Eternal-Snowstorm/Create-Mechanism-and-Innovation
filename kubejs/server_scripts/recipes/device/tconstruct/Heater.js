ServerEvents.recipes((event) => {
	let { kubejs, minecraft } = event.getRecipes()
	const BRICK = "tconstruct:seared_brick"
	const PRISM = "#forge:glass/prism"

	// 焦黑融化器
	kubejs.shaped("tconstruct:seared_melter", [
		"ABA",
		"ACA"
	], {
		A: BRICK,
		B: "#tconstruct:seared_tanks",
		C: Mechanisms.STONE.COM
	}).id("tconstruct:smeltery/seared/melter")

	// 焦黑加热器
	kubejs.shaped("tconstruct:seared_heater", [
		"AAA",
		"ABA",
		"AAA"
	], {
		A: BRICK,
		B: Mechanisms.STONE.COM
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
		" A ",
		"ABA",
		" A "
	], {
		A: BRICK,
		B: PRISM
	}).id("tconstruct:smeltery/seared/fuel_tank")

	// 焦黑材料储罐
	kubejs.shaped("tconstruct:seared_ingot_tank", [
		"A A",
		" B ",
		"A A"
	], {
		A: BRICK,
		B: PRISM
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
		"ACA"
	], {
		A: "tconstruct:scorched_brick",
		B: "#tconstruct:scorched_tanks",
		C: Mechanisms.NETHER.COM
	}).id("tconstruct:smeltery/scorched/alloyer")

	// 焦褐燃料储罐
	kubejs.shaped("tconstruct:scorched_fuel_tank", [
		" A ",
		"ABA",
		" A "
	], {
		A: "tconstruct:scorched_brick",
		B: "#forge:glass"
	}).id("tconstruct:smeltery/scorched/fuel_tank")

	// 焦褐材料储罐
	kubejs.shaped("tconstruct:scorched_ingot_tank", [
		"A A",
		" B ",
		"A A"
	], {
		A: "tconstruct:scorched_brick",
		B: "#forge:glass"
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
		"ABA",
		"ACA",
		"ADA"
	], {
		A: BRICK,
		B: "#tconstruct:patterns/reusable",
		C: "#forge:chests",
		D: Mechanisms.STONE.COM
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
		"ACA",
		"DDD"
	], {
		A: "#forge:plates/iron",
		B: Mechanisms.IRON.COM,
		C: Mechanisms.NETHER.COM,
		D: "minecraft:nether_bricks"
	}).id("create:crafting/kinetics/blaze_burner")
})
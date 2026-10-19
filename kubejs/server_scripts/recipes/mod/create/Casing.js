ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 机壳增产
	create.deploying(Casing.ANDESITE, [
		"#minecraft:planks",
		"cmi:andesite_casing_framework"
	])

	create.deploying(Casing.BRASS, [
		"#minecraft:planks",
		"cmi:brass_casing_framework"
	])

	create.deploying(Casing.COPPER, [
		"#forge:treated_wood",
		"cmi:copper_casing_framework"
	])

	create.deploying(Casing.BRONZE, [
		Casing.INDUSTRY,
		"cmi:bronze_casing_framework"
	]).id("steam_letters:item_application/bronze_casing_plate")

	// 安山机壳
	create.item_application(Casing.ANDESITE, [
		"#minecraft:logs",
		["#forge:ingots/andesite_alloy", "#forge:plates/andesite_alloy"]
	]).id("create:item_application/andesite_casing_from_log")

	// 铜机壳
	create.item_application(Casing.COPPER, [
		"#forge:treated_wood",
		["#forge:ingots/copper", "#forge:plates/copper"]
	]).id("create:item_application/copper_casing_from_log")

	// 黄铜机壳
	create.item_application(Casing.BRASS, [
		"#minecraft:logs",
		["#forge:ingots/brass", "#forge:plates/brass"]
	]).id("create:item_application/brass_casing_from_log")

	// 青铜机壳
	create.item_application(Casing.BRONZE, [
		Casing.INDUSTRY,
		["#forge:ingots/bronze", "#forge:plates/bronze"]
	]).id("steam_letters:item_application/bronze_casing_ingot")
})
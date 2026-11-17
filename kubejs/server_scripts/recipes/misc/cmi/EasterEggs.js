ServerEvents.recipes((event) => {
	let { minecraft, create, kubejs } = event.getRecipes()
	const STEEL_INGOT = Ingredient.getFirstItemId("#forge:ingots/steel")

	// 钢錠
	minecraft.blasting("cmi:togni_leets", "#forge:ingots/iron")

	// ???
	minecraft.blasting(Item.of(STEEL_INGOT, 6), "farmersdelight:cooking_pot")
		.id("cmi:blasting/steel_ingot/cooking_pot_manual_only")

	minecraft.blasting(Item.of(STEEL_INGOT, 5), "farmersdelight:skillet")
		.id("cmi:blasting/steel_ingot/skillet_manual_only")

	minecraft.blasting(Item.of(STEEL_INGOT, 8), "kaleidoscope_cookery:pot")
		.id("cmi:blasting/steel_ingot/pot_manual_only")

	minecraft.blasting(Item.of(STEEL_INGOT, 6), "kaleidoscope_cookery:stockpot")
		.id("cmi:blasting/steel_ingot/stockpot_manual_only")

	minecraft.blasting(Item.of(STEEL_INGOT, 4), "kaleidoscope_cookery:stockpot_lid")
		.id("cmi:blasting/steel_ingot/stockpot_lid_manual_only")

	// 羊皮纸
	kubejs.shaped("cmi:parchment", [
		"AB"
	], {
		A: "cmi:torn_parchment_a",
		B: "cmi:torn_parchment_b"
	}).noMirror().id("cmi:minecraft/shaped/love_manual_only")

	create.mechanical_crafting(Item.of("minecraft:rotten_flesh", 81), [
		"XXXXXXXXX",
		"XXXXXXXXX",
		"XXXXXXXXX",
		"XXXXXXXXX",
		"XXXXXXXXX",
		"XXXXXXXXX",
		"XXXXXXXXX",
		"XXXXXXXXX",
		"XXXXXXXXX"
	], {
		X: "minecraft:rotten_flesh"
	}).id("cmi:what_the_fvvk_is_that")
})
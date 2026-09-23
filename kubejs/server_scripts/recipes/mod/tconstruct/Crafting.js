ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 材料修复包I
	kubejs.shaped("easyrepair:repair_item_pouch_i", [
		"ABA",
		"B B",
		"ABA"
	], {
		A: "farmersdelight:canvas",
		B: ["#forge:ingots/iron", "#forge:plates/iron"]
	}).id("easyrepair:repair_item_pouch_i")

	// 材料修复包II
	kubejs.shaped("easyrepair:repair_item_pouch_ii", [
		"ABA",
		"B B",
		"ABA"
	], {
		A: "#forge:fabric_hemp",
		B: ["#forge:ingots/rose_gold", "#forge:plates/rose_gold"]
	}).id("easyrepair:repair_item_pouch_ii")

	// 材料修复包III
	kubejs.shaped("easyrepair:repair_item_pouch_iii", [
		"ABA",
		"B B",
		"ABA"
	], {
		A: "tconstruct:silky_cloth",
		B: "#forge:gems/diamond"
	}).id("easyrepair:repair_item_pouch_iii")

	// 模具
	kubejs.shaped("4x tconstruct:pattern", [
		"AB",
		"BA"
	], {
		A: "#minecraft:planks",
		B: "#forge:rods/wooden"
	}).id("tconstruct:tables/pattern")

	// 模具
	kubejs.shaped("16x tconstruct:pattern", [
		"ABA",
		"B B",
		"ABA"
	], {
		A: "#minecraft:planks",
		B: "#forge:rods/wooden"
	}).id("tconstruct:tables/pattern_2")

	// 模具
	kubejs.shaped("16x tconstruct:pattern", [
		"ABA",
		"B B",
		"ABA"
	], {
		A: "#forge:rods/wooden",
		B: "#minecraft:planks"
	}).id("tconstruct:tables/pattern_3")

	// EFLN
	kubejs.shapeless("4x tconstruct:efln_ball", [
		"minecraft:paper",
		"#kaleidoscope_cookery:oil",
		"#forge:dusts/niter"
	])
})
ServerEvents.recipes((event) => {
	let { treetap, kubejs } = event.getRecipes()

	// 橡胶树
	treetap.tap_extract(
		"thermal:latex_bucket",
		"#forge:rubberwood_logs",
		"thermal:latex"
	).processing_time(20 * 200)

	// 龙头
	kubejs.shaped("treetap:tap", [
		"ABA",
		"AAA"
	], {
		A: "#minecraft:planks",
		B: "#forge:tools/knives"
	}).id("treetap:tap").damageIngredient("#forge:tools/knives", 50)
})
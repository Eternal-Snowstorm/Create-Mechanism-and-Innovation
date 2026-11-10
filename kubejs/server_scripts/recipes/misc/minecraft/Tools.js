ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 桶
	kubejs.shaped("minecraft:bucket", [
		"A A",
		" A "
	], {
		A: "#forge:plates/andesite_alloy"
	})

	// 群系指南针
	kubejs.shaped("naturescompass:naturescompass", [
		"AAA",
		"ABA",
		"CDC"
	], {
		A: "#minecraft:leaves",
		B: "minecraft:compass",
		C: "#minecraft:saplings",
		D: Mechanisms.WOODEN.COM
	}).id("naturescompass:natures_compass")

	// 结构指南针
	kubejs.shaped("explorerscompass:explorerscompass", [
		"AAA",
		"ABA",
		"CDC"
	], {
		A: "#forge:stone",
		B: "minecraft:compass",
		C: "minecraft:flint",
		D: Mechanisms.STONE.COM
	}).id("explorerscompass:explorers_compass")
})
ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

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
})

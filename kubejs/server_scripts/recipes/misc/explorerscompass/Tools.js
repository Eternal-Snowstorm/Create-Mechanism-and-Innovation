ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

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

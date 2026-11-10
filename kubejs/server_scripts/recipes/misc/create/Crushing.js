ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 黑曜石元件
	create.crushing([
		"ae2:item_cell_housing",
		"ae2:cell_component_16k",
		"minecraft:obsidian"
	], "cmi:obsidian_cell")

	// 鞍
	create.crushing([
		Item.of("minecraft:leather", 3),
		Item.of("minecraft:leather", 2).withChance(0.5)
	], "minecraft:saddle")
})
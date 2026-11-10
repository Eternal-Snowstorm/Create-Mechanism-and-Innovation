ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 糖
	create.milling(Item.of("minecraft:sugar").withChance(0.5), [
		"minecraft:beetroot"
	])

	create.milling("minecraft:sugar", [
		"minecraft:sugar_cane"
	]).id("create:milling/sugar_cane")

	// 青金石粉进一步磨碎
	create.milling([
		Item.of("minecraft:blue_dye", 2),
		Item.of("minecraft:blue_dye").withChance(0.1)
	], [
		"thermal:lapis_dust"
	])
})
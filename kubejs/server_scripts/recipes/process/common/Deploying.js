ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	create.deploying("minecraft:redstone_torch", [
		"#forge:rods/wooden",
		"#forge:dusts/redstone"
	])

	// 鼓风机触媒
	create.deploying("create_connected:empty_fan_catalyst", [
		"minecraft:iron_bars",
		"#cmi:casing_framework/brass"
	]).id("create_connected:crafting/kinetics/empty_fan_catalyst")
})
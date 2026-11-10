ServerEvents.recipes((event) => {
	let { farmersdelight } = event.getRecipes()

	WoodMaterials.forEach((wood) => {
		let { SAPLING, LEAVE } = wood

		farmersdelight.cutting([
			LEAVE,
			Item.of("minecraft:dead_bush")
		], [
			SAPLING
		], "#farmersdelight:tools/knives")
	})

	farmersdelight.cutting([
		"thermal:stripped_rubberwood_log",
		"cmi:rubber_tree_bark"
	], [
		"thermal:rubberwood_log"
	], "#farmersdelight:tools/knives")
})
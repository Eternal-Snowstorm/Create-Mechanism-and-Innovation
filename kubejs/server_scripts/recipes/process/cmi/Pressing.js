ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 羊毛
	create.pressing("minecraft:white_wool", [
		"#cmi:dev_doll"
	])
})
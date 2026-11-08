ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 桶
	kubejs.shaped("minecraft:bucket", [
		"A A",
		" A "
	], {
		A: "#forge:plates/andesite_alloy"
	})
})

ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 铁锤子
	kubejs.shaped("createdieselgenerators:hammer", [
		"AAA",
		"ABA",
		" B "
	], {
		A: "#forge:ingots/iron",
		B: "#forge:rods/wooden"
	}).id("createdieselgenerators:crafting/hammer")
})

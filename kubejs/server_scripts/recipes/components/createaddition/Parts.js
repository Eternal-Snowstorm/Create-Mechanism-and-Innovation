ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 线轴
	kubejs.shaped("16x createaddition:spool", [
		"A",
		"B",
		"A"
	], {
		A: "#forge:plates/iron",
		B: "#forge:rods/iron"
	}).id("createaddition:crafting/spool")
})

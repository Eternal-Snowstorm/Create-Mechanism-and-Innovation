ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 通风口
	kubejs.shaped("4x ad_astra:vent", [
		"AAA",
		"B B",
		"AAA"
	], {
		A: "#forge:rods/iron",
		B: "#forge:plates/iron"
	}).id("ad_astra:vent")
})
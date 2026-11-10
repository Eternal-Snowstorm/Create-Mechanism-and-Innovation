ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 滑翔翼
	kubejs.shaped("immersiveengineering:glider", [
		" A ",
		"BCB",
		"DAD"
	], {
		A: "#forge:rods/iron",
		B: "immersive_aircraft:sail",
		C: "#forge:leather",
		D: "farmersdelight:rope"
	}).id("immersiveengineering:crafting/glider")
})
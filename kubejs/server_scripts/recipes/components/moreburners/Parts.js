ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 铜线圈
	kubejs.shaped("moreburners:copper_coil", [
		"ABA",
		"ABA",
		"ABA"
	], {
		A: "#forge:wires/copper",
		B: "#forge:rods/copper"
	}).id("moreburners:copper_coil")

	// 电阻线圈
	kubejs.shaped("moreburners:nickel_coil", [
		"AAA",
		"ABA",
		"AAA"
	], {
		A: "#forge:plates/nickel",
		B: "moreburners:copper_coil"
	}).id("moreburners:resistance_coil")
})

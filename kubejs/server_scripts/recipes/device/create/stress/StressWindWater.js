ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 风车轴承
	kubejs.shaped("create:windmill_bearing", [
		"X",
		"C",
		"M"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#forge:plates/stone",
	}).id("create:crafting/kinetics/windmill_bearing")

	// 水车
	kubejs.shaped("create:water_wheel", [
		" A ",
		"ABA",
		" A "
	], {
		A: "immersiveengineering:waterwheel_segment",
		B: Casing.ANDESITE
	}).id("create:crafting/kinetics/water_wheel")

	// 大水车
	kubejs.shaped("create:large_water_wheel", [
		"A A",
		" B ",
		"A A"
	], {
		A: "immersiveengineering:waterwheel_segment",
		B: "create:water_wheel"
	}).id("create:crafting/kinetics/large_water_wheel")

	kubejs.shaped("create:large_water_wheel", [
		"AAA",
		"ABA",
		"AAA"
	], {
		A: "immersiveengineering:waterwheel_segment",
		B: Casing.ANDESITE
	})
})
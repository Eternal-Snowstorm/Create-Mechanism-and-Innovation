ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 地图定位器
	kubejs.shaped("railway_automation:map_locator", [
		" A ",
		" B ",
		" C "
	], {
		A: "#forge:ingots/andesite_alloy",
		B: "minecraft:map",
		C: "#minecraft:planks"
	}).id("railway_automation:map_locator")

	// 铁路放置器
	kubejs.shaped("railway_automation:track_placer", [
		" M ",
		"ECE",
		"PRP"
	], {
		M: Mechanisms.RAILWAY.COM,
		E: "create:transmitter",
		C: Casing.RAILWAY,
		P: "#forge:plates/iron",
		R: "#create:tracks"
	}).id("railway_automation:track_placer")
})

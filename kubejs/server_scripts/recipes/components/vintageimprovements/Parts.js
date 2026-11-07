ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 激光发射器
	kubejs.shaped("vintageimprovements:laser_item", [
		" A ",
		"BDB",
		" E "
	], {
		A: "#forge:dusts/redstone",
		B: "#forge:plates/copper",
		D: "createaddition:capacitor",
		E: Mechanisms.PHOTO.COM
	}).id("vintageimprovements:mechanical_crafting/laser")

	// 卷簧轮
	kubejs.shaped("vintageimprovements:spring_coiling_machine_wheel", [
		" A ",
		"ABA",
		" A "
	], {
		A: ["#forge:plates/iron", "#forge:plates/andesite_alloy"],
		B: "#forge:ingots/andesite_alloy"
	}).id("vintageimprovements:craft/spring_coiling_machine_wheel")
})

// Sophisticated Backpacks · 背包与升级基座
ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()


	// 背包
	kubejs.shaped("sophisticatedbackpacks:backpack", [
		"XYX",
		"XMX",
		"YYY"
	], {
		M: Mechanisms.WOODEN.COM,
		X: "#forge:string",
		Y: ["#forge:leather", "tconstruct:silky_cloth"]
	}).id("sophisticatedbackpacks:backpack")


	// 空白升级
	kubejs.shaped("sophisticatedbackpacks:upgrade_base", [
		"XYX",
		"YMY",
		"XYX"
	], {
		M: Mechanisms.WOODEN.COM,
		X: "#forge:rods/andesite",
		Y: ["#forge:leather", "tconstruct:silky_cloth"]
	}).id("sophisticatedbackpacks:upgrade_base")
})

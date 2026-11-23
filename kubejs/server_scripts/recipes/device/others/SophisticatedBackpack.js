ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 背包
	kubejs.shaped("sophisticatedbackpacks:backpack", [
		"ABA",
		"ACA",
		"BBB"
	], {
		A: "#forge:string",
		B: ["#forge:leather", "tconstruct:silky_cloth"],
		C: Mechanisms.WOODEN.COM
	}).id("sophisticatedbackpacks:backpack")

	// 空白升级
	kubejs.shaped("sophisticatedbackpacks:upgrade_base", [
		"ABA",
		"BCB",
		"ABA"
	], {
		A: "#forge:rods/andesite",
		B: ["#forge:leather", "tconstruct:silky_cloth"],
		C: Mechanisms.WOODEN.COM
	}).id("sophisticatedbackpacks:upgrade_base")
})
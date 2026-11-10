ServerEvents.recipes((event) => {
	let { create, kubejs } = event.getRecipes()

	// 钢粉
	create.crushing(Item.of("cmi:steel_dust").withChance(0.05), [
		"#minecraft:armors/chainmail"
	])

	// 铝粉
	event.custom({
		"type": "immersiveindustry:electrolyzer",
		"input": {
			"item": "cmi:red_mud"
		},
		"fluid": {
			"tag": "forge:redstone_acid",
			"amount": 100
		},
		"result": {
			"item": "neoecoae:aluminum_dust",
			"count": 1
		},
		"large_only": false,
		"time": 1000
	}).id("immersiveindustry:electrolyzer/aluminum")

	// 信素粉
	kubejs.shapeless("4x thermal:signalum_dust", [
		"#forge:dusts/lead",
		"3x #forge:dusts/copper",
		"4x #forge:dusts/redstone"
	]).id("thermal:signalum_dust_4")

	// 流明粉
	kubejs.shapeless("4x thermal:lumium_dust", [
		"#forge:dusts/gold",
		"3x #forge:dusts/tin",
		"4x #forge:dusts/glowstone"
	]).id("thermal:lumium_dust_4")
})
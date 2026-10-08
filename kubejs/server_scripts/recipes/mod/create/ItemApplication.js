ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 哭泣黑曜石
	create.item_application("minecraft:crying_obsidian", [
		"minecraft:obsidian",
		"#forge:vegetables/onion"
	])

	// 可疑的龙蛋
	create.item_application("kaleidoscope_end:suspicious_dragon_egg", [
		"minecraft:dragon_egg",
		"#forge:dusts/chaotic_void"
	])

	// 黄铜二极管基底
	create.item_application("cmi:brass_diode_base", [
		"cmi:redstone_diode_base",
		"#forge:plates/brass"
	])
})
ServerEvents.recipes((event) => {
	let { steam_letters } = event.getRecipes()

	steam_letters.solid_fuel("create:blaze_cake", 200 * 32)
		.superheated(true)

	steam_letters.solid_fuel("cmi:creosote_wood_chip_briquette", 200 * 1024)
		.superheated(true)

	steam_letters.solid_fuel("minecraft:blaze_rod", 200 * 12)
		.superheated(true)

	steam_letters.solid_fuel("create:creative_blaze_cake", 2 ** 32 - 1)
		.superheated(true)
})
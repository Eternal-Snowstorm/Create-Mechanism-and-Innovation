ServerEvents.recipes((event) => {
	let { thermal } = event.getRecipes()

	thermal.centrifuge([
		Item.of("minecraft:blaze_powder").withChance(0.5),
		Item.of("thermal:basalz_powder").withChance(0.5),
		Item.of("thermal:blitz_powder").withChance(0.5),
		Item.of("thermal:blizz_powder").withChance(0.5),
	], [
		"#forge:dusts/void"
	])

	// 氧化物薄膜
	thermal.centrifuge([
		"cmi:dense_oxide_film",
		"alexscaves:toxic_paste"
	], [
		"cmi:acid_washed_radiation_rock"
	])
})
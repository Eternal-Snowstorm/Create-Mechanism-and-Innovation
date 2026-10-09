ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 富集碳
	mekanism.enriching(
		"mekanism:enriched_carbon",
		"#forge:dusts/hop_graphite"
	).id("mekanism:enriching/enriched/carbon")

	// 富集红石
	mekanism.enriching(
		"mekanism:enriched_redstone",
		"cmi:electrolized_redstone"
	).id("mekanism:enriching/enriched/redstone")

	// 富集硅
	mekanism.enriching(
		"cmi:enriched_silicon",
		"cmi:single_crystal_silicon"
	)

	// 凛冰粉
	mekanism.enriching(
		"neoecoae:cryotheum",
		"minecraft:blue_ice"
	).id("neoecoae:cryotheum")
})
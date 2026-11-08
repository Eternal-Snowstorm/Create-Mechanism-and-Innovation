ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	create.sandpaper_polishing("cmi:polished_quartz_prism", [
		"minecraft:quartz"
	])

	create.sandpaper_polishing("create_rns:polished_resonant_amethyst", [
		"cmi:charged_amethyst"
	]).id("create_rns:sandpaper_polishing/resonant_amethyst")
})
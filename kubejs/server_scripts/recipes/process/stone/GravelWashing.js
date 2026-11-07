ServerEvents.recipes((event) => {
	let { vintageimprovements, create, immersiveengineering } = event.getRecipes()

	vintageimprovements.vibrating([
		Item.of("minecraft:flint"),
		Item.of("thermal_extra:iron_ore_chunk").withChance(0.5)
	], "minecraft:gravel")

	vintageimprovements.vibrating([
		Item.of("thermal:quartz_dust").withChance(0.75),
		Item.of("cmi:lime_dust").withChance(0.5),
		Item.of("thermal_extra:gold_ore_chunk").withChance(0.25)
	], "minecraft:sand")

	vintageimprovements.vibrating([
		Item.of("thermal:quartz_dust").withChance(0.75),
		Item.of("thermal_extra:gold_ore_chunk").withChance(0.5)
	], "minecraft:red_sand")

	// 石灰粉
	create.crushing([
		Item.of("2x cmi:lime_dust"),
		Item.of("cmi:lime_dust").withChance(0.5),
		Item.of("cmi:lime_dust").withChance(0.5),
	], [
		["#create:stone_types/limestone", "minecraft:pointed_dripstone"]
	])

	create.milling("2x cmi:lime_dust", [
		["#create:stone_types/limestone", "minecraft:pointed_dripstone"]
	])

	// 生石灰
	immersiveengineering.blast_furnace("4x cmi:furnaced_lime")
		.input("create:limestone")
		.time(30)
})

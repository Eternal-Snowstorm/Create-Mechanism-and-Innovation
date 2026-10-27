ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 余烬面粉
	create.crushing([
		"minecraft:netherrack",
		Item.of("create:cinder_flour").withChance(0.2)
	], "#forge:netherrack")

	// 赛特斯石英矿
	create.crushing([
		"2x ae2:certus_quartz_crystal",
		Item.of("ae2:certus_quartz_crystal").withChance(0.25),
		Item.of("create:experience_nugget").withChance(0.75),
		Item.of("minecraft:cobblestone").withChance(0.12)
	], "cmi:certus_quartz_ore")

	create.crushing([
		"2x ae2:certus_quartz_crystal",
		Item.of("ae2:certus_quartz_crystal").withChance(0.25),
		Item.of("create:experience_nugget").withChance(0.75),
		Item.of("minecraft:cobbled_deepslate").withChance(0.12)
	], "cmi:deepslate_certus_quartz_ore")

	// 硫磺粉
	create.crushing([
		"thermal:sulfur_dust",
		Item.of("2x thermal:sulfur_dust").withChance(0.1),
	], [
		"#forge:gems/sulfur"
	])

	// 安山岩粉
	create.crushing("4x cmi:andesite_dust", [
		"#create:stone_types/andesite"
	])

	// 木炭粉
	create.crushing("mekanism:dust_charcoal", [
		"minecraft:charcoal"
	]).id("create:crushing/charcoal")

	create.crushing([
		"mekanism:dust_coal",
		Item.of("2x mekanism:dust_coal").withChance(0.5),
		Item.of("thermal:sulfur_dust").withChance(0.3)
	], "minecraft:coal")

	create.crushing([
		Item.of("minecraft:obsidian"),
		Item.of("mekanism:dust_obsidian").withChance(0.5)
	], "minecraft:obsidian")

	// 钢粉
	create.crushing(Item.of("cmi:steel_dust").withChance(0.05), [
		"#minecraft:armors/chainmail"
	])

	// 锌粒
	create.crushing([
		Item.of("create:zinc_nugget"),
		Item.of("create:zinc_nugget").withChance(0.5),
	], "#create:copycats")

	// 黑曜石元件
	create.crushing([
		"ae2:item_cell_housing",
		"ae2:cell_component_16k",
		"minecraft:obsidian"
	], "cmi:obsidian_cell")

	// 鞍
	create.crushing([
		Item.of("minecraft:leather", 3),
		Item.of("minecraft:leather", 2).withChance(0.5)
	], "minecraft:saddle")
})
ServerEvents.recipes((event) => {
	let { create, mekanism } = event.getRecipes()

	// 赛特斯石英粉
	create.milling([
		"ae2:certus_quartz_dust",
		Item.of("ae2:certus_quartz_dust", 2).withChance(0.5)
	], "ae2:certus_quartz_crystal")
		.id("create:milling/compat/ae2/certus_quartz")

	// 紫水晶粉
	create.milling("thermal_extra:amethyst_dust", [
		"minecraft:amethyst_shard"
	])

	// 煤粉
	create.milling([
		"mekanism:dust_coal",
		Item.of("thermal:sulfur_dust").withChance(0.15)
	], "minecraft:coal")

	create.crushing([
		"mekanism:dust_coal",
		Item.of("2x mekanism:dust_coal").withChance(0.5),
		Item.of("thermal:sulfur_dust").withChance(0.3)
	], "minecraft:coal")

	// 焦煤粉
	create.milling([
		"immersiveengineering:dust_coke",
	], [
		"#forge:coal_coke"
	])

	// 木炭粉
	create.milling([
		"mekanism:dust_charcoal",
	], [
		"minecraft:charcoal"
	]).id("create:milling/charcoal")

	create.crushing("mekanism:dust_charcoal", [
		"minecraft:charcoal"
	]).id("create:crushing/charcoal")

	// 安山岩粉
	create.milling([
		"2x cmi:andesite_dust",
		Item.of("cmi:andesite_dust").withChance(0.25)
	], "#create:stone_types/andesite")

	create.crushing("4x cmi:andesite_dust", [
		"#create:stone_types/andesite"
	])

	// 青金石粉
	create.milling([
		"thermal:lapis_dust"
	], [
		"minecraft:lapis_lazuli"
	]).id("create:milling/lapis_lazuli")

	// 硫粉
	create.milling("thermal:sulfur_dust", [
		"#forge:gems/sulfur"
	])

	create.crushing([
		"thermal:sulfur_dust",
		Item.of("2x thermal:sulfur_dust").withChance(0.1),
	], [
		"#forge:gems/sulfur"
	])

	// 陨石粉
	create.milling([
		"ae2:sky_dust",
		Item.of("ae2:sky_dust").withChance(0.25),
		Item.of("ae2:sky_dust", 2).withChance(0.125),
		Item.of("ae2:sky_stone_block").withChance(0.25)
	], "ae2:sky_stone_block")

	create.crushing([
		"ae2:sky_dust",
		Item.of("ae2:sky_dust").withChance(0.5),
		Item.of("ae2:sky_dust", 2).withChance(0.25),
		Item.of("ae2:sky_stone_block").withChance(1),
		Item.of("ae2:sky_stone_block").withChance(0.5)
	], "ae2:sky_stone_block")

	// 朱砂粉
	create.milling("thermal:cinnabar_dust", [
		"#forge:gems/cinnabar"
	])

	// 磷灰石粉
	create.milling("thermal:apatite_dust", [
		"#forge:gems/apatite"
	])

	// 黑曜石粉
	create.crushing([
		Item.of("minecraft:obsidian"),
		Item.of("mekanism:dust_obsidian").withChance(0.5)
	], "minecraft:obsidian")

	// 余烬面粉
	create.crushing([
		"minecraft:netherrack",
		Item.of("create:cinder_flour").withChance(0.2)
	], "#forge:netherrack")

	// 盈能水晶粉
	mekanism.purifying(
		"neoecoae:energized_crystal_dust",
		"#forge:gems/energized_crystal",
		"1x cmi:nitroglycerine"
	)

	// 盈能福鲁伊克斯粉
	mekanism.purifying(
		"neoecoae:energized_fluix_crystal_dust",
		"#forge:gems/energized_fluix_crystal",
		"1x cmi:nitroglycerine"
	)

	// 混沌虚空粉
	mekanism.compressing(
		"cmi:chaotic_void_dust",
		"#forge:dusts/void",
		"1x mekanism:osmium"
	)
})

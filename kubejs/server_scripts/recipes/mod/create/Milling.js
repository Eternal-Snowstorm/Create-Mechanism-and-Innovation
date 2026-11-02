ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	create.milling(Item.of("minecraft:sugar").withChance(0.5), [
		"minecraft:beetroot"
	])

	create.milling([
		"ae2:certus_quartz_dust",
		Item.of("ae2:certus_quartz_dust", 2).withChance(0.5)
	], "ae2:certus_quartz_crystal")
		.id("create:milling/compat/ae2/certus_quartz")

	create.milling("thermal_extra:amethyst_dust", [
		"minecraft:amethyst_shard"
	])

	create.milling([
		"mekanism:dust_coal",
		Item.of("thermal:sulfur_dust").withChance(0.15)
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

	// 安山岩粉
	create.milling([
		"2x cmi:andesite_dust",
		Item.of("cmi:andesite_dust").withChance(0.25)
	], "#create:stone_types/andesite")

	// 糖
	create.milling("minecraft:sugar", [
		"minecraft:sugar_cane"
	]).id("create:milling/sugar_cane")

	// 青金石粉
	create.milling([
		"thermal:lapis_dust"
	], [
		"minecraft:lapis_lazuli"
	]).id("create:milling/lapis_lazuli")

	// 青金石粉进一步磨碎
	create.milling([
		Item.of("minecraft:blue_dye", 2),
		Item.of("minecraft:blue_dye").withChance(0.1)
	], [
		"thermal:lapis_dust"
	])

	// 硫粉
	create.milling("thermal:sulfur_dust", [
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

	// 朱砂
	create.milling("thermal:cinnabar_dust", [
		"#forge:gems/cinnabar"
	])

	// 磷灰石
	create.milling("thermal:apatite_dust", [
		"#forge:gems/apatite"
	])

	// 锌粒
	create.milling("create:zinc_nugget", [
		"#create:copycats"
	])
})
// Thermal · 动力发电机（斯特林/岩浆/压缩/美食/霜冻/宝石/铸币/祛魔）
ServerEvents.recipes((event) => {
	let { thermal_extra, create, thermal, kubejs } = event.recipes

	// 烧煤的
	addComponRecipe(thermal_extra, "thermal:dynamo_stirling", [
		Mechanisms.COIL.COM,
		Mechanisms.STONE.COM,
		"cmi:thermal_unit",
		"#forge:plates/invar",
		"#forge:plates/stone"
	]).id("thermal:dynamo_stirling")

	// 烧岩浆的
	addComponRecipe(thermal_extra, "thermal:dynamo_magmatic", [
		Mechanisms.COIL.COM,
		Mechanisms.NETHER.COM,
		"cmi:blaze_unit",
		"#forge:plates/invar",
		"minecraft:nether_bricks"
	]).id("thermal:dynamo_magmatic")

	// 烧油的
	addComponRecipe(thermal_extra, "thermal:dynamo_compression", [
		Mechanisms.COIL.COM,
		Mechanisms.THERMAL.COM,
		"cmi:basalz_unit",
		"#forge:plates/invar",
		"#forge:plates/steel"
	]).id("thermal:dynamo_compression")

	// 燃烧我的卡路里
	addComponRecipe(thermal_extra, "thermal:dynamo_gourmand", [
		Mechanisms.COIL.COM,
		Mechanisms.PIG_IRON.COM,
		"cmi:basalz_unit",
		"#forge:plates/invar",
		"#forge:plates/bronze"
	]).id("thermal:dynamo_gourmand")

	// 烧冰的
	addComponRecipe(thermal_extra, "thermal_extra:dynamo_frost", [
		Mechanisms.COIL.COM,
		Mechanisms.COBALT.COM,
		"cmi:blizz_unit",
		"#forge:plates/invar",
		"#forge:plates/silver"
	]).id("thermal_extra:crafting/dynamo_frost")

	// 烧宝石的
	addComponRecipe(thermal_extra, "thermal:dynamo_lapidary", [
		Mechanisms.COIL.COM,
		Mechanisms.PHOTO.COM,
		"cmi:blizz_unit",
		"#forge:plates/invar",
		"#forge:gems/diamond"
	]).id("thermal:dynamo_lapidary")

	// 烧钱的
	addComponRecipe(thermal_extra, "thermal:dynamo_numismatic", [
		Mechanisms.COIL.COM,
		Mechanisms.GOLD.COM,
		"cmi:blitz_unit",
		"#forge:plates/invar",
		"#forge:plates/electrum"
	]).id("thermal:dynamo_numismatic")

	// 烧附魔书的
	addComponRecipe(thermal_extra, "thermal:dynamo_disenchantment", [
		Mechanisms.COIL.COM,
		Mechanisms.ENCHANTED.COM,
		"cmi:blitz_unit",
		"#forge:plates/invar",
		"#forge:storage_blocks/lapis"
	]).id("thermal:dynamo_disenchantment")
})

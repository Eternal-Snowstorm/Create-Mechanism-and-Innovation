ServerEvents.recipes((event) => {
	let { tconstruct } = event.getRecipes()

	// 黑曜石
	tconstruct.melting(Fluid.of("tconstruct:molten_obsidian", 1000))
		.ingredient("#forge:obsidian")
		.time(80)
		.temperature(800)
		.id("tconstruct:smeltery/melting/obsidian/block")

	// 烈焰棒
	tconstruct.melting(Fluid.of("tconstruct:blazing_blood", 100))
		.ingredient("#forge:rods/blaze")
		.time(158 * 4)
		.temperature(900)

	// 充能萤石
	tconstruct.melting(Fluid.of("thermal:glowstone", 250))
		.ingredient("#forge:dusts/glowstone")
		.time(200)
		.temperature(1000)

	tconstruct.melting(Fluid.of("thermal:glowstone", 1000))
		.ingredient("#forge:storage_blocks/glowstone")
		.time(300)
		.temperature(1000)

	// 血液
	tconstruct.melting(Fluid.of("cmi:blood", 50))
		.ingredient("minecraft:rotten_flesh")
		.time(30)
		.temperature(36)

	// 焦黑熔石
	tconstruct.melting(Fluid.of("minecraft:lava", 50))
		.ingredient("#forge:stone")
		.time(20 * 20)
		.temperature(1346)

	// 金铸模
	tconstruct.melting(Fluid.of("tconstruct:molten_gold", 90))
		.ingredient("#tconstruct:patterns/reusable")
		.time(100)
		.temperature(1064)

	// 铁栅栏
	tconstruct.melting(Fluid.of("tconstruct:molten_iron", 30))
		.ingredient("minecraft:iron_bars")
		.time(60)
		.temperature(1535)

	// 金栅栏
	tconstruct.melting(Fluid.of("tconstruct:molten_gold", 30))
		.ingredient("tconstruct:gold_bars")
		.time(60)
		.temperature(1064)

	// 不稳定红石
	tconstruct.melting(Fluid.of("thermal:redstone", 100))
		.ingredient("#forge:dusts/redstone")
		.time(20 * 5)
		.temperature(800)

	tconstruct.melting(Fluid.of("thermal:redstone", 900))
		.ingredient("#forge:storage_blocks/redstone")
		.time(20 * 5)
		.temperature(800)

	// 福鲁伊克斯
	tconstruct.melting(Fluid.of("cmi:molten_fluix", 100))
		.ingredient("#forge:gems/fluix")
		.time(20 * 6)
		.temperature(1242)

	tconstruct.melting(Fluid.of("cmi:molten_fluix", 900))
		.ingredient("ae2:fluix_block")
		.time(20 * 18)
		.temperature(1242)

	// 铁轨系列
	tconstruct.melting(Fluid.of("tconstruct:molten_iron", 30))
		.ingredient("minecraft:rail")
		.time(2 * 20)
		.temperature(1535)

	tconstruct.melting(Fluid.of("tconstruct:molten_iron", 90))
		.ingredient("minecraft:detector_rail")
		.time(2 * 20)
		.temperature(1535)

	tconstruct.melting(Fluid.of("tconstruct:molten_iron", 90))
		.ingredient("minecraft:activator_rail")
		.time(2 * 20)
		.temperature(1535)

	tconstruct.melting(Fluid.of("tconstruct:molten_gold", 90))
		.ingredient("minecraft:powered_rail")
		.time(2 * 20)
		.temperature(1064)

	tconstruct.melting(Fluid.of("tconstruct:molten_gold", 90))
		.ingredient("create:controller_rail")
		.time(2 * 20)
		.temperature(1064)

	event.custom({
		"type": "tconstruct:melting",
		"byproducts": [
			Fluid.of("tconstruct:scorched_stone", 125).toJson()
		],
		"ingredient": Ingredient.of("#create:stone_types/scorchia").toJson(),
		"result": Fluid.of("tconstruct:seared_stone", 250).toJson(),
		"temperature": 1000,
		"time": 20 * 10
	})

	// 机动栏杆系列
	tconstruct.melting(Fluid.of("cmi:molten_andesite_alloy", 30))
		.ingredient("createdeco:andesite_bars")
		.time(2 * 20)
		.temperature(CmiMetal.getMetal("andesite_alloy").getMeltingPoint())

	let barTypes = [
		"brass",
		"copper",
		"industrial_iron",
		"zinc"
	]
	barTypes.forEach((type) => {
		tconstruct.melting(Fluid.tag("tag", `tconstruct:molten_${type}`, 30))
			.ingredient(`createdeco:${type}_bars`)
			.time(40)
			.temperature(CmiMetal.getMetal(type).getMeltingPoint())
	})
})
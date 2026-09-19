ServerEvents.recipes((event) => {
	let { create, fluidlogistics } = event.getRecipes()

	// 熔融安山合金
	create.mixing(Fluid.of("cmi:molten_andesite_alloy", 180), [
		"#forge:dusts/andesite",
		Fluid.of("tconstruct:molten_iron", 10)
	]).heatRequirement(CmiHeatLevel.GRILLED)
		.id("create:mixing/andesite_alloy")

	create.mixing(Fluid.of("cmi:molten_andesite_alloy", 180), [
		"#forge:dusts/andesite",
		Fluid.of("tconstruct:molten_zinc", 10)
	]).heatRequirement(CmiHeatLevel.GRILLED)

	create.mixing(Fluid.of("cmi:molten_andesite_alloy", 120), [
		"#forge:dusts/andesite",
		"#forge:nuggets/iron"
	]).heatRequirement(CmiHeatLevel.GRILLED)
		.id("create:mixing/andesite_alloy_from_zinc")

	create.mixing(Fluid.of("cmi:molten_andesite_alloy", 120), [
		"#forge:dusts/andesite",
		"#forge:nuggets/zinc"
	]).heatRequirement(CmiHeatLevel.GRILLED)

	// 盐水
	create.mixing(Fluid.of("mekanism:brine", 50), [
		Fluid.of("minecraft:water", 50),
		"#forge:dusts/salt"
	])

	// 油脂
	fluidlogistics.cooling_mixing("kaleidoscope_cookery:oil", [
		Fluid.of("createdieselgenerators:plant_oil", 100)
	])

	// 红石酸
	create.mixing(Fluid.of("immersiveengineering:redstone_acid", 200), [
		"#forge:dusts/redstone",
		Fluid.of("tconstruct:molten_lead", 90)
	]).heated()

	create.mixing(Fluid.of("immersiveengineering:redstone_acid", 400), [
		Fluid.of("thermal:redstone", 200),
		Fluid.of("tconstruct:molten_lead", 180)
	])

	// 杂酚油
	create.mixing("immersiveengineering:treated_wood_horizontal", [
		Fluid.of("immersiveengineering:creosote", 125),
		"#minecraft:planks"
	])

	create.mixing("8x immersiveengineering:treated_wood_horizontal", [
		Fluid.of("immersiveengineering:creosote", 1000),
		"8x #minecraft:planks"
	])

	// 砖块
	create.mixing(Fluid.of("tconstruct:seared_stone", 250), [
		"tconstruct:grout"
	]).processingTime(150).heatRequirement(CmiHeatLevel.GRILLED)

	create.mixing(Fluid.of("tconstruct:scorched_stone", 250), [
		"tconstruct:nether_grout"
	]).processingTime(150).heatRequirement(CmiHeatLevel.GRILLED)

	// 液态灵魂
	create.mixing(Fluid.of("tconstruct:liquid_soul", 1000), [
		["minecraft:soul_soil", "minecraft:soul_sand"]
	]).processingTime(150).heatRequirement(CmiHeatLevel.GRILLED)

	create.mixing(Fluid.of("tconstruct:liquid_soul", 1000), [
		"4x minecraft:weeping_vines",
		"4x minecraft:twisting_vines",
		Fluid.of("minecraft:lava", 250)
	])

	// 晶体催生剂
	create.mixing(Fluid.of("cmi:crystal_catalyt", 1000), [
		Fluid.of("minecraft:water", 500),
		"#cmi:crystals",
		"16x #forge:crops"
	]).heated()

	create.mixing(Fluid.of("cmi:crystal_catalyt", 1000), [
		Fluid.of("minecraft:water", 500),
		"#cmi:crystals",
		"32x #forge:seeds"
	]).heated()

	// 墨囊
	create.mixing("2x minecraft:ink_sac", [
		Fluid.of("minecraft:water", 250),
		"#forge:dyes/black",
		"immersiveengineering:ersatz_leather"
	])

	// 烈焰血
	create.mixing(Fluid.of("tconstruct:blazing_blood", 500), [
		Fluid.of("cmi:blood", 500),
		"minecraft:blaze_powder"
	]).heated()

	create.mixing(Fluid.of("tconstruct:blazing_blood", 1000), [
		Fluid.of("cmi:blood", 1000),
		"#forge:rods/blaze"
	]).superheated()

	// 不稳定红石
	create.mixing(Fluid.of("thermal:redstone", 50), [
		"#forge:dusts/redstone"
	]).heated()

	// 盐酸
	create.mixing(Fluid.of("cmi:hydrochloric_acid", 1000), [
		Fluid.of("mekanism:hydrogen_chloride", 500),
		Fluid.of("minecraft:water", 500)
	])

	// 泥土
	create.mixing("2x minecraft:dirt", [
		"#forge:sand",
		"#forge:fuels/bio"
	])

	// 工业铁
	create.mixing(Fluid.of("cmi:molten_industrial_iron", 90), [
		"#forge:dusts/iron"
	]).heatRequirement(CmiHeatLevel.GRILLED)

	// 墨水
	create.mixing(Fluid.of("create_enchantment_industry:ink", 250), [
		Fluid.of("minecraft:water", 250), [
			"#forge:dusts/charcoal",
			"#forge:dusts/coal"
		]]).id("create_enchantment_industry:mixing/ink")

	// 超态经验
	create.mixing(Fluid.of("create_enchantment_industry:hyper_experience", 10), [
		"#forge:dusts/lapis",
		Fluid.of("create_enchantment_industry:ink", 25),
		Fluid.of("create_enchantment_industry:experience", 100)
	]).superheated().id("create_enchantment_industry:mixing/hyper_experience")

	// 玫瑰石英
	create.mixing("create:rose_quartz", [
		"#forge:dusts/pure_quartz",
		Fluid.of("thermal:redstone", 100)
	])

	// 晶体催生剂
	create.mixing(Fluid.of("cmi:crystal_catalyt", 200), [
		"#forge:fuels/bio",
		Fluid.of("createdieselgenerators:plant_oil", 100),
		Fluid.of("minecraft:water", 100)
	])

	// 砖泥
	create.mixing("8x tconstruct:grout", [
		"4x #minecraft:sand",
		"4x minecraft:gravel",
		Fluid.of("tconstruct:molten_clay", 1000)
	]).id("cmi:ae2/transform/tconstruct/grout2")

	// 下界砖泥
	create.mixing("8x tconstruct:nether_grout", [
		"4x minecraft:soul_sand",
		"4x minecraft:gravel",
		Fluid.of("tconstruct:magma", 1000)
	]).id("cmi:ae2/transform/tconstruct/nether_grout2")
})
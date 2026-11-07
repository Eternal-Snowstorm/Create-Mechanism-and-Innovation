ServerEvents.recipes((event) => {
	let { minecraft, kubejs, thermal, immersiveengineering, vintageimprovements } = event.getRecipes()

	// 木齿轮
	kubejs.shaped("cmi:wooden_gear", [
		" A ",
		"ABA",
		" A "
	], {
		A: "#minecraft:planks",
		B: "#forge:rods/wooden"
	})

	// 冲击桩
	kubejs.shaped("cmi:impact_pile", [
		"A",
		"B",
		"B"
	], {
		A: "#forge:plates/invar",
		B: "#forge:rods/netherite"
	})

	// 萤石流明管道
	kubejs.shaped("2x cmi:glowstone_lumen_tube", [
		"CAB",
		"A A",
		"BAC"
	], {
		A: "#forge:wires/lumium",
		B: "#forge:rods/cobalt",
		C: "#forge:plates/cobalt"
	})

	// 繁星核心
	kubejs.shaped("cmi:astral_core", [
		"ABA",
		"BCB",
		"ABA"
	], {
		A: "#forge:ingots/brass",
		B: "#forge:plates/electrum",
		C: "#forge:gems/charged_amethyst"
	})

	// 电容
	kubejs.shaped("cmi:simple_battery", [
		" A ",
		"BBB",
		" C "
	], {
		A: "#forge:plates/copper",
		B: "#forge:dusts/redstone",
		C: "#forge:plates/zinc"
	}).id("createaddition:crafting/capacitor_1")

	// 冲压头
	kubejs.shaped("cmi:hammer_head", [
		"PPP",
		"III",
		"PPP"
	], {
		P: [
			"#forge:plates/iron",
			"#forge:plates/andesite_alloy"
		],
		I: [
			"#forge:ingots/iron",
			"#forge:ingots/andesite_alloy"
		]
	})

	// 黏土模具
	kubejs.shapeless("4x cmi:blank_clay_mold", [
		"minecraft:clay"
	])

	kubejs.shapeless("cmi:blank_clay_mold", [
		"minecraft:clay_ball"
	])

	// 木齿轮
	immersiveengineering.metal_press("cmi:wooden_gear")
		.input("4x #minecraft:planks")
		.mold("cmi:gear_mold")

	thermal.press("cmi:wooden_gear", [
		"4x #minecraft:planks",
		"cmi:gear_mold"
	])

	// 钛合金网
	thermal.press("2x cmi:titanium_alloy_mesh", [
		"cmi:titanium_alloy_plate",
		"cmi:unpack_mold"
	])

	vintageimprovements.curving("cmi:wooden_gear", [
		"#minecraft:logs"
	]).itemAsHead("cmi:gear_mold")

	// 黏土模具
	Ingredient.of("#cmi:clay_molds")
		.getItemIds()
		.forEach((mold) => {
			minecraft.stonecutting(mold, "#cmi:clay_molds")
		})

	// 红石二极管基底
	minecraft.stonecutting("2x cmi:redstone_diode_base", "minecraft:smooth_stone_slab")
})

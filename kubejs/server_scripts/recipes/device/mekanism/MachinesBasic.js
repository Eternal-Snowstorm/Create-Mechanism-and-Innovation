// Mekanism · 基础级机器（电子高炉/富集室/精密锯木/合并机/粉碎机/通电熔炼/锇压缩机）
ServerEvents.recipes((event) => {
	let { thermal_extra, neoecoae } = event.getRecipes()

	// 电力高炉
	addRecipe(neoecoae)
		.itemOutput("cmi:electronic_blast_furnace")
		.inputItems([
			Casing.STAINLESS_STEEL,
			"ae2:semi_dark_monitor",
			"ad_astra:etrionic_capacitor",
			Mechanisms.NETHER.COM,
			Mechanisms.BASIC.COM
		])
		.energy(2000)

	// 富集仓
	addRecipe(neoecoae)
		.itemOutput("mekanism:enrichment_chamber")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/industrial_iron",
			Mechanisms.BASIC.COM,
			Mechanisms.IRON.COM,
			"cmi:blizz_general_component"
		])
		.energy(2000)
		.id("mekanism:enrichment_chamber")

	// 锯木机
	addRecipe(neoecoae)
		.itemOutput("mekanism:precision_sawmill")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/industrial_iron",
			Mechanisms.BASIC.COM,
			"3x thermal:saw_blade",
			"cmi:blizz_general_component"
		])
		.energy(2000)
		.id("mekanism:precision_sawmill")

	// 融合机
	addRecipe(neoecoae)
		.itemOutput("mekanism:combiner")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/industrial_iron",
			Mechanisms.BASIC.COM,
			Mechanisms.STONE.COM,
			"cmi:blitz_general_component"
		])
		.energy(2000)
		.id("mekanism:combiner")

	// 粉碎机
	addRecipe(neoecoae)
		.itemOutput("mekanism:crusher")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/industrial_iron",
			Mechanisms.BASIC.COM,
			"2x #forge:gears/chromeplated_steel",
			"cmi:basalz_general_component"
		])
		.energy(2000)
		.id("mekanism:crusher")

	// 熔炼炉
	addRecipe(neoecoae)
		.itemOutput("mekanism:energized_smelter")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/industrial_iron",
			Mechanisms.BASIC.COM,
			Mechanisms.NETHER.COM,
			"cmi:blaze_general_component"
		])
		.energy(2000)
		.id("mekanism:energized_smelter")

	// 锇压缩仓
	addRecipe(neoecoae)
		.itemOutput("mekanism:osmium_compressor")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.STAINLESS_STEEL,
			"2x #forge:plates/composite_tungsten_steel",
			Mechanisms.ADVANCED.COM,
			Mechanisms.AIR.COM,
			"cmi:blizz_general_component"
		])
		.energy(2000)
		.id("mekanism:osmium_compressor")
})

ServerEvents.recipes((event) => {
	let { thermal_extra, create, thermal, kubejs } = event.recipes
	let inc = "cmi:incomplete_thermal_devices"

	/**
	 * 
	 * @param {(Internal.OutputFluid_|OutputItem_)[]} output 
	 * @param {(Internal.InputFluid_|InputItem_)[]} inputs 
	 * @returns 
	 */
	function addComponRecipe(output, inputs) {
		return thermal_extra.component_assembly(output, inputs)
			.energy(4000)
	}

	// 装配机
	create.sequenced_assembly("thermal_extra:component_assembly", Casing.THERMAL, [
		create.deploying(inc, [inc, Mechanisms.THERMAL.COM]),
		create.deploying(inc, [inc, "#forge:gears/iron"]),
		create.deploying(inc, [inc, "create:brass_hand"])
	]).transitionalItem(inc)
		.loops(1)
		.id("thermal_extra:crafting/component_assembly")

	addComponRecipe("thermal_extra:component_assembly", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"thermal:rf_coil",
		"create:brass_hand"
	])

	// 热力单元
	addComponRecipe("cmi:thermal_unit", [
		Fluid.of("thermal:resin", 50),
		"#forge:plates/signalum",
		"#forge:plates/invar"
	])
	thermal.bottler("cmi:blaze_unit", [
		"cmi:thermal_unit",
		Fluid.of("tconstruct:blazing_blood", 100)
	])
	thermal.bottler("cmi:basalz_unit", [
		"cmi:thermal_unit",
		Fluid.of("thermalconstruct:basalz_blood", 100)
	])
	thermal.bottler("cmi:blitz_unit", [
		"cmi:thermal_unit",
		Fluid.of("thermalconstruct:blitz_blood", 100)
	])
	thermal.bottler("cmi:blizz_unit", [
		"cmi:thermal_unit",
		Fluid.of("thermalconstruct:blizz_blood", 100)
	])

	// 磨粉机
	addComponRecipe("thermal:machine_pulverizer", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:thermal_unit",
		"#forge:gears/iron"
	]).id("thermal:machine_pulverizer")

	// 灌装机
	addComponRecipe("thermal:machine_bottler", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:thermal_unit",
		Mechanisms.COPPER.COM
	]).id("thermal:machine_bottler")

	// 合成器
	addComponRecipe("thermal:machine_crafter", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:thermal_unit",
		"create:crafting_blueprint"
	]).id("thermal:machine_crafter")

	// 锯木机
	addComponRecipe("thermal:machine_sawmill", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:thermal_unit",
		"thermal:saw_blade"
	]).id("thermal:machine_sawmill")

	// 粉末
	addComponRecipe("cmi:void_dust_collector", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:thermal_unit",
		"thermal:drill_head"
	])

	// 离心机
	addComponRecipe("thermal:machine_centrifuge", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:thermal_unit",
		"#vintageimprovements:springs"
	]).id("thermal:machine_centrifuge")

	// 电炉
	addComponRecipe("thermal:machine_furnace", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:blaze_unit",
		"create:blaze_burner"
	]).id("thermal:machine_furnace")

	// 感应炉
	addComponRecipe("thermal:machine_smelter", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:blaze_unit",
		"create:whisk"
	]).id("thermal:machine_smelter")

	// 精炼机
	addComponRecipe("thermal:machine_refinery", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:blaze_unit",
		Mechanisms.IRON.COM
	]).id("thermal:machine_refinery")

	// 结晶器
	addComponRecipe("thermal:machine_crystallizer", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:blitz_unit",
		"create:propeller"
	]).id("thermal:machine_crystallizer")

	// 脱水机
	addComponRecipe("thermal_extra:endothermic_dehydrator", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:blaze_unit",
		Mechanisms.NETHER.COM
	]).id("thermal_extra:crafting/endothermic_dehydrator")

	// 熔岩炉
	addComponRecipe("thermal:machine_crucible", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:blaze_unit",
		Mechanisms.STONE.COM
	]).id("thermal:machine_crucible")

	// 高级精炼机
	addComponRecipe("thermal_extra:advanced_refinery", [
		"thermal:machine_refinery",
		Mechanisms.REINFORCED.COM,
		"cmi:blaze_unit",
		Mechanisms.IRON.COM
	]).id("thermal_extra:crafting/advanced_refinery")

	// TNT
	addComponRecipe("thermal_extra:nitratic_igniter", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:basalz_unit",
		"#forge:gears/titanium"
	]).id("thermal_extra:crafting/nitratic_igniter")

	// 热解炉
	addComponRecipe("thermal:machine_pyrolyzer", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:basalz_unit",
		"create:blaze_burner"
	]).id("thermal:machine_pyrolyzer")

	// 冲压机
	addComponRecipe("thermal:machine_press", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:basalz_unit",
		"cmi:hammer_head"
	]).id("thermal:machine_press")

	// 有机灌注
	addComponRecipe("thermal:machine_insolator", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:blitz_unit",
		Mechanisms.NATURE.COM
	]).id("thermal:machine_insolator")

	// 酿造
	addComponRecipe("thermal:machine_brewer", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:blitz_unit",
		Mechanisms.POTION.COM
	]).id("thermal:machine_brewer")

	// 冷冻机
	addComponRecipe("thermal:machine_chiller", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:blizz_unit",
		"create:propeller"
	]).id("thermal:machine_chiller")

	// 混合机
	addComponRecipe("thermal_extra:fluid_mixer", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:blizz_unit",
		"create:whisk"
	]).id("thermal_extra:crafting/fluid_mixer")

	// 烧煤的
	addComponRecipe("thermal:dynamo_stirling", [
		Mechanisms.COIL.COM,
		Mechanisms.STONE.COM,
		"cmi:thermal_unit",
		"#forge:plates/invar",
		"#forge:plates/stone"
	]).id("thermal:dynamo_stirling")

	// 烧岩浆的
	addComponRecipe("thermal:dynamo_magmatic", [
		Mechanisms.COIL.COM,
		Mechanisms.NETHER.COM,
		"cmi:blaze_unit",
		"#forge:plates/invar",
		"minecraft:nether_bricks"
	]).id("thermal:dynamo_magmatic")

	// 烧油的
	addComponRecipe("thermal:dynamo_compression", [
		Mechanisms.COIL.COM,
		Mechanisms.THERMAL.COM,
		"cmi:basalz_unit",
		"#forge:plates/invar",
		"#forge:plates/steel"
	]).id("thermal:dynamo_compression")

	// 燃烧我的卡路里
	addComponRecipe("thermal:dynamo_gourmand", [
		Mechanisms.COIL.COM,
		Mechanisms.PIG_IRON.COM,
		"cmi:basalz_unit",
		"#forge:plates/invar",
		"#forge:plates/bronze"
	]).id("thermal:dynamo_gourmand")

	// 烧冰的
	addComponRecipe("thermal_extra:dynamo_frost", [
		Mechanisms.COIL.COM,
		Mechanisms.COBALT.COM,
		"cmi:blizz_unit",
		"#forge:plates/invar",
		"#forge:plates/silver"
	]).id("thermal_extra:crafting/dynamo_frost")

	// 烧宝石的
	addComponRecipe("thermal:dynamo_lapidary", [
		Mechanisms.COIL.COM,
		Mechanisms.PHOTO.COM,
		"cmi:blizz_unit",
		"#forge:plates/invar",
		"#forge:gems/diamond"
	]).id("thermal:dynamo_lapidary")

	// 烧钱的
	addComponRecipe("thermal:dynamo_numismatic", [
		Mechanisms.COIL.COM,
		Mechanisms.GOLD.COM,
		"cmi:blitz_unit",
		"#forge:plates/invar",
		"#forge:plates/electrum"
	]).id("thermal:dynamo_numismatic")

	// 烧附魔书的
	addComponRecipe("thermal:dynamo_disenchantment", [
		Mechanisms.COIL.COM,
		Mechanisms.ENCHANTED.COM,
		"cmi:blitz_unit",
		"#forge:plates/invar",
		"#forge:storage_blocks/lapis"
	]).id("thermal:dynamo_disenchantment")

	// 反应釜
	addComponRecipe("cmi:chemical_reactor", [
		Casing.STEEL,
		Mechanisms.LIGHT.COM,
		"#forge:gears/invar",
		"create:whisk"
	])

	addComponRecipe("cmi:reinforced_chemical_reactor", [
		"cmi:chemical_reactor",
		Mechanisms.HEAVY.COM,
		"create:blaze_burner"
	])

	// 树脂提取
	kubejs.shaped("thermal:device_tree_extractor", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.COPPER.COM,
		C: Casing.ANDESITE,
		X: "treetap:tap"
	}).id("thermal:device_tree_extractor")

	// 水产捕捞
	kubejs.shaped("thermal:device_fisher", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "minecraft:fishing_rod"
	}).id("thermal:device_fisher")

	// 蓄水器
	kubejs.shaped("thermal:device_water_gen", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.COPPER.COM,
		C: Casing.COPPER,
		X: "minecraft:bucket"
	}).id("thermal:device_water_gen")

	// 堆肥桶
	kubejs.shaped("thermal:device_composter", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "minecraft:composter"
	}).id("thermal:device_composter")

	// 造石机
	kubejs.shaped("thermal:device_rock_gen", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "minecraft:piston"
	}).id("thermal:device_rock_gen")

	// 真空漏斗
	kubejs.shaped("thermal:device_collector", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ENDER.COM,
		C: Casing.THERMAL,
		X: "minecraft:hopper"
	}).id("thermal:device_collector")

	// 经验聚集
	kubejs.shaped("thermal:device_xp_condenser", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ENCHANTED.COM,
		C: Casing.THERMAL,
		X: "thermal:xp_crystal"
	}).id("thermal:device_xp_condenser")

	// 销毁器
	kubejs.shaped("thermal:device_nullifier", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "minecraft:lava_bucket"
	}).id("thermal:device_nullifier")

	// 药水雾化
	kubejs.shaped("thermal:device_potion_diffuser", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ENCHANTED.COM,
		C: Casing.THERMAL,
		X: Mechanisms.POTION.COM
	}).id("thermal:device_potion_diffuser")

	//蜂箱漏斗
	kubejs.shaped("thermal:device_hive_extractor", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "minecraft:shears",
	}).id("thermal:device_hive_extractor")
})
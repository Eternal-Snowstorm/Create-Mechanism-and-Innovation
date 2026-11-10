ServerEvents.recipes((event) => {
	let { thermal_extra } = event.getRecipes()

	// 磨粉机
	addComponRecipe(thermal_extra, "thermal:machine_pulverizer", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:thermal_unit",
		"#forge:gears/iron"
	]).id("thermal:machine_pulverizer")

	// 灌装机
	addComponRecipe(thermal_extra, "thermal:machine_bottler", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:thermal_unit",
		Mechanisms.COPPER.COM
	]).id("thermal:machine_bottler")

	// 合成器
	addComponRecipe(thermal_extra, "thermal:machine_crafter", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:thermal_unit",
		"create:crafting_blueprint"
	]).id("thermal:machine_crafter")

	// 锯木机
	addComponRecipe(thermal_extra, "thermal:machine_sawmill", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:thermal_unit",
		"thermal:saw_blade"
	]).id("thermal:machine_sawmill")

	// 粉末
	addComponRecipe(thermal_extra, "cmi:void_dust_collector", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:thermal_unit",
		"thermal:drill_head"
	])

	// 离心机
	addComponRecipe(thermal_extra, "thermal:machine_centrifuge", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:thermal_unit",
		"#vintageimprovements:springs"
	]).id("thermal:machine_centrifuge")

	// 电炉
	addComponRecipe(thermal_extra, "thermal:machine_furnace", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:blaze_unit",
		"create:blaze_burner"
	]).id("thermal:machine_furnace")

	// 感应炉
	addComponRecipe(thermal_extra, "thermal:machine_smelter", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:blaze_unit",
		"create:whisk"
	]).id("thermal:machine_smelter")

	// 精炼机
	addComponRecipe(thermal_extra, "thermal:machine_refinery", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:blaze_unit",
		Mechanisms.IRON.COM
	]).id("thermal:machine_refinery")

	// 结晶器
	addComponRecipe(thermal_extra, "thermal:machine_crystallizer", [
		Casing.THERMAL,
		Mechanisms.THERMAL.COM,
		"cmi:blitz_unit",
		"create:propeller"
	]).id("thermal:machine_crystallizer")

	// 脱水机
	addComponRecipe(thermal_extra, "thermal_extra:endothermic_dehydrator", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:blaze_unit",
		Mechanisms.NETHER.COM
	]).id("thermal_extra:crafting/endothermic_dehydrator")

	// 熔岩炉
	addComponRecipe(thermal_extra, "thermal:machine_crucible", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:blaze_unit",
		Mechanisms.STONE.COM
	]).id("thermal:machine_crucible")

	// 高级精炼机
	addComponRecipe(thermal_extra, "thermal_extra:advanced_refinery", [
		"thermal:machine_refinery",
		Mechanisms.REINFORCED.COM,
		"cmi:blaze_unit",
		Mechanisms.IRON.COM
	]).id("thermal_extra:crafting/advanced_refinery")

	// TNT
	addComponRecipe(thermal_extra, "thermal_extra:nitratic_igniter", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:basalz_unit",
		"#forge:gears/titanium"
	]).id("thermal_extra:crafting/nitratic_igniter")

	// 热解炉
	addComponRecipe(thermal_extra, "thermal:machine_pyrolyzer", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:basalz_unit",
		"create:blaze_burner"
	]).id("thermal:machine_pyrolyzer")

	// 冲压机
	addComponRecipe(thermal_extra, "thermal:machine_press", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:basalz_unit",
		"cmi:hammer_head"
	]).id("thermal:machine_press")

	// 有机灌注
	addComponRecipe(thermal_extra, "thermal:machine_insolator", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:blitz_unit",
		Mechanisms.NATURE.COM
	]).id("thermal:machine_insolator")

	// 酿造
	addComponRecipe(thermal_extra, "thermal:machine_brewer", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:blitz_unit",
		Mechanisms.POTION.COM
	]).id("thermal:machine_brewer")

	// 冷冻机
	addComponRecipe(thermal_extra, "thermal:machine_chiller", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:blizz_unit",
		"create:propeller"
	]).id("thermal:machine_chiller")

	// 混合机
	addComponRecipe(thermal_extra, "thermal_extra:fluid_mixer", [
		Casing.THERMAL,
		Mechanisms.REINFORCED.COM,
		"cmi:blizz_unit",
		"create:whisk"
	]).id("thermal_extra:crafting/fluid_mixer")
})
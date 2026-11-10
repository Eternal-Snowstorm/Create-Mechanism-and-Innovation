ServerEvents.recipes((event) => {
	let { vintageimprovements, create } = event.getRecipes()

	// 皓蓝石
	create.crushing([
		"2x cmi:asurine_dust",
		Item.of("cmi:asurine_dust").withChance(0.5)
	], "#create:stone_types/asurine"
	)

	vintageimprovements.vacuumizing([
		"thermal_extra:zinc_ore_chunk",
		"thermal:slag",
		Item.of("thermal_extra:zinc_ore_chunk").withChance(0.25)
	], [
		Fluid.of("minecraft:lava", 250),
		"4x cmi:asurine_dust"
	])

	// 绯红岩
	create.crushing([
		"2x cmi:crimsite_dust",
		Item.of("cmi:crimsite_dust").withChance(0.5)
	], "#create:stone_types/crimsite"
	)

	vintageimprovements.vacuumizing([
		"thermal_extra:iron_ore_chunk",
		"thermal:slag",
		Item.of("thermal_extra:iron_ore_chunk").withChance(0.25)
	], [
		Fluid.of("minecraft:lava", 250),
		"4x cmi:crimsite_dust"
	])

	// 赭金砂
	create.crushing([
		"2x cmi:ochrum_dust",
		Item.of("cmi:ochrum_dust").withChance(0.5)
	], "#create:stone_types/ochrum")

	vintageimprovements.vacuumizing([
		"thermal_extra:gold_ore_chunk",
		"thermal:slag",
		Item.of("thermal_extra:gold_ore_chunk").withChance(0.25)
	], [
		Fluid.of("minecraft:lava", 250),
		"4x cmi:ochrum_dust"
	])

	// 辉绿岩
	create.crushing([
		"2x cmi:veridium_dust",
		Item.of("cmi:veridium_dust").withChance(0.5)
	], "#create:stone_types/veridium"
	)

	vintageimprovements.vacuumizing([
		"thermal_extra:copper_ore_chunk",
		"thermal:slag",
		Item.of("thermal_extra:copper_ore_chunk").withChance(0.25)
	], [
		Fluid.of("minecraft:lava", 250),
		"4x cmi:veridium_dust"
	])
})
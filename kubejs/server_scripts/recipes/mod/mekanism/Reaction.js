ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 锇
	mekanism.reaction(
		"#forge:dusts/osmium",
		"10x mekanism:hydrofluoric_acid",
		Fluid.of("cmi:hydrochloric_acid", 50),
		"cmi:infuse_osmium"
	).duration(60).energyRequired(1000)

	// 再处理裂变碎片
	mekanism.reaction(
		"ae2:matter_ball",
		"200x mekanism:spent_nuclear_waste",
		Fluid.tag("tag", "forge:molten_lead", 90),
		"4x mekanism:reprocessed_fissile_fragment"
	).energyRequired(1000).duration(60)
		.id("mekanism:processing/uranium/reprocessing/from_plutonium")

	// 天外寒冰
	mekanism.reaction(
		"neoecoae:cryotheum",
		"50x cmi:methane",
		Fluid.of("mekanism:oxygen", 50),
		"neoecoae:cryotheum_crystal"
	).energyRequired(5000).duration(80)
		.id("neoecoae:cryotheum_crystal")

	// 氮氧化物
	mekanism.reaction(
		"cmi:plant_ash",
		"100x mekanism:hydrogen",
		Fluid.of("cmi:nitric_acid", 400),
		"thermal:niter_dust",
		"100x cmi:nitrogen_oxide"
	).energyRequired(5000).duration(80)
})
ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 锇
	mekanism.reaction(
		"#forge:dusts/osmium",
		MekType.Gas.of("mekanism:hydrofluoric_acid", 10),
		Fluid.of("cmi:hydrochloric_acid", 50),
		"cmi:infuse_osmium"
	).duration(60).energyRequired(1000)

	// 再处理裂变碎片
	mekanism.reaction(
		"ae2:matter_ball",
		MekType.Gas.of("mekanism:spent_nuclear_waste", 200),
		Fluid.tag("tag", "forge:molten_lead", 90),
		"4x mekanism:reprocessed_fissile_fragment"
	).energyRequired(1000).duration(60)
		.id("mekanism:processing/uranium/reprocessing/from_plutonium")

})
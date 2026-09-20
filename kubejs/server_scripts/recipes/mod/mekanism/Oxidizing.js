ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 氧化铀
	mekanism.oxidizing(
		"#forge:dusts/uranium",
		MekType.Gas.of("mekanism:uranium_oxide", 1000)
	).id("mekanism:processing/uranium/uranium_oxide")

	// 裂变燃料 from 铀黄饼
	mekanism.oxidizing(
		"mekanism:yellow_cake_uranium",
		MekType.Gas.of("mekanism:fissile_fuel", 200)
	)

	// 精炼核废料
	mekanism.oxidizing(
		"alexscaves:toxic_paste",
		MekType.Gas.of("cmi:refined_nuke_waste", 200)
	)

	// 钛氧化物
	mekanism.oxidizing(
		"cmi:raw_titanium_mixture",
		MekType.Gas.of("cmi:titanium_oxide", 10)
	)

})
ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 氧化铀
	mekanism.oxidizing(
		"#forge:dusts/uranium",
		"1000x mekanism:uranium_oxide"
	).id("mekanism:processing/uranium/uranium_oxide")

	// 裂变燃料 from 铀黄饼
	mekanism.oxidizing(
		"mekanism:yellow_cake_uranium",
		"200x mekanism:fissile_fuel"
	)

	// 精炼核废料
	mekanism.oxidizing(
		"alexscaves:toxic_paste",
		"200x cmi:refined_nuke_waste"
	)

	// 钛氧化物
	mekanism.oxidizing(
		"cmi:raw_titanium_mixture",
		"10x cmi:titanium_oxide"
	)
})
ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 铀黄饼
	mekanism.injecting(
		"mekanism:yellow_cake_uranium",
		"2x #forge:ingots/uranium",
		"cmi:fissile_uranium_compound"
	)

	// 氡气瓶
	mekanism.injecting(
		"alexscaves:radon_bottle",
		"minecraft:glass_bottle",
		"1x cmi:radon"
	)

	// 反物质球
	mekanism.injecting(
		"mekanism:pellet_antimatter",
		"ae2:matter_ball",
		"1x mekanism:antimatter"
	).id("mekanism:processing/uranium/reprocessing/from_plutonium")
})
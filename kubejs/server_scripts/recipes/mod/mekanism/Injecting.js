ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

    // 铀黄饼
	mekanism.injecting(
		"mekanism:yellow_cake_uranium",
		"2x #forge:ingots/uranium",
		"cmi:fissile_uranium_compound"
	)
})
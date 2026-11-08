ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 裂变铀化合物
	mekanism.centrifuging(
		"mekanism:uranium_hexafluoride",
		"cmi:fissile_uranium_compound"
	).id("mekanism:processing/uranium/fissile_fuel")

	// 氚
	mekanism.centrifuging(
		"cmi:refined_nuke_waste",
		"mekanismgenerators:tritium"
	)
})
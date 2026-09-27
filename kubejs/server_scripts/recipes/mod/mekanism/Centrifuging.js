ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 裂变铀化合物
	mekanism.centrifuging(
		MekType.Gas.of("mekanism:uranium_hexafluoride", 1),
		MekType.Gas.of("cmi:fissile_uranium_compound", 1)
	).id("mekanism:processing/uranium/fissile_fuel")

	// 氚
	mekanism.centrifuging(
		MekType.Gas.of("cmi:refined_nuke_waste", 1),
		MekType.Gas.of("mekanismgenerators:tritium", 1)
	)
})
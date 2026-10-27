ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 盈能水晶粉
	mekanism.purifying(
		"neoecoae:energized_crystal_dust",
		"#forge:gems/energized_crystal",
		"1x cmi:nitroglycerine"
	)

	// 盈能福鲁伊克斯粉
	mekanism.purifying(
		"neoecoae:energized_fluix_crystal_dust",
		"#forge:gems/energized_fluix_crystal",
		"1x cmi:nitroglycerine"
	)
})
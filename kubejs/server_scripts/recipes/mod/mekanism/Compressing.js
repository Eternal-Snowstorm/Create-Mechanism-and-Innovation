ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	mekanism.compressing(
		"cmi:composite_carbon_fiber_plate",
		"cmi:incomplete_composite_carbon_fiber_plate",
		"2x mekanism:osmium"
	)

	mekanism.compressing(
		"cmi:chaotic_void_dust",
		"#forge:dusts/void",
		"1x mekanism:osmium"
	)
})
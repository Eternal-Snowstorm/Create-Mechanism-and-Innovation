ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 复合钨钢板
	mekanism.combining("cmi:composite_tungsten_steel_plate",
		"cmi:incomplete_tungsten_steel_plate",
		"#forge:plates/tungsten_steel"
	)
})
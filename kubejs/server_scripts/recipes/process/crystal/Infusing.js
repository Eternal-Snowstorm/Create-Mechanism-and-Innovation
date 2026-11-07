ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 水晶锭
	mekanism.metallurgic_infusing(
		"neoecoae:crystal_ingot",
		"#forge:dusts/energized_fluix_crystal",
		"mekanism:diamond"
	).id("neoecoae:transform/crystal_ingot")

	// 灌注锇
	mekanism.metallurgic_infusing(
		"cmi:infuse_osmium",
		"#forge:dusts/osmium",
		"cmi:chaotic_void"
	)

	// 碳纳米管
	mekanism.metallurgic_infusing(
		"cmi:carbon_nanotube",
		"cmi:incomplete_carbon_nanotube",
		"cmi:infuse_osmium"
	)

	// 湮灭奇点
	mekanism.metallurgic_infusing(
		"extendedae_plus:oblivion_singularity",
		"ae2:singularity",
		"cmi:chaotic_void"
	).id("extendedae_plus:transform/oblivion_singularity")
})

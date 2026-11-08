ServerEvents.recipes((event) => {
	let { thermal, thermal_extra } = event.getRecipes()

	// 岩浆处理
	thermal.refinery([
		Fluid.of("minecraft:lava", 750),
		Fluid.of("tconstruct:ichor", 250)
	], Fluid.of("tconstruct:magma", 1000))
		.energy(5000)

	// 岩浆处理
	thermal_extra.advanced_refinery([
		Fluid.of("minecraft:lava", 750),
		Fluid.of("tconstruct:ichor", 250)
	], Fluid.of("tconstruct:magma", 1000))
		.energy(5000)

	// 核污水
	thermal_extra.advanced_refinery([
		"alexscaves:toxic_paste",
		Fluid.of("mekanism:sulfuric_acid", 200),
		Fluid.of("cmi:sludge_suspension", 100)
	], Fluid.of("alexscaves:acid", 500))
})
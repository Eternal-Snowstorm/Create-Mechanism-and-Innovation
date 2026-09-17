ServerEvents.recipes((event) => {
	let { thermal } = event.getRecipes()

	// 活化石磨
	thermal.bottler("cmi:activated_graphite_chunk", [
		"immersiveengineering:ingot_hop_graphite",
		Fluid.of("immersiveengineering:redstone_acid", 100)
	])

	thermal.bottler("cmi:activated_graphite_chunk", [
		"immersiveengineering:dust_hop_graphite",
		Fluid.of("immersiveengineering:redstone_acid", 100)
	])

	// 填充燃料棒
	thermal.bottler("cmi:filled_fuel_rod", [
		"cmi:empty_fuel_rod",
		Fluid.of("mekanism:uranium_hexafluoride", 100)
	])

	// 酸洗辐射岩
	thermal.bottler("cmi:acid_washed_radiation_rock", [
		"cmi:refined_radiation_rock",
		Fluid.of("mekanism:sulfuric_acid", 100)
	])
})
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

	// 烈焰蛋糕
	thermal.bottler("create:blaze_cake", [
		"create:blaze_cake_base",
		Fluid.of("minecraft:lava", 500)
	]).energy(400).id("thermal:compat/create/bottler_create_blaze_cake")

	thermal.bottler("2x create:blaze_cake", [
		"create:blaze_cake_base",
		Fluid.of("tconstruct:blazing_blood", 250)
	]).energy(400).id("thermal:compat/create/bottler_create_blaze_cake2")

	// 寒霜蛋糕
	thermal.bottler("fluidlogistics:frost_cake", [
		"cmi:frost_cake_base",
		Fluid.of("tconstruct:powdered_snow", 500)
	]).energy(400).id("thermal:compat/fluidlogistics/bottler_create_frost_cake")

	thermal.bottler("2x fluidlogistics:frost_cake", [
		"cmi:frost_cake_base",
		Fluid.of("thermalconstruct:blizz_blood", 500)
	]).energy(400).id("thermal:compat/fluidlogistics/bottler_create_frost_cake2")

	thermal.bottler("4x fluidlogistics:frost_cake", [
		"cmi:frost_cake_base",
		Fluid.of("neoecoae:cryotheum_solution", 500)
	]).energy(400).id("thermal:compat/fluidlogistics/bottler_create_frost_cake3")

	// 附魔蛋糕
	thermal.bottler("create_enchantment_industry:experience_cake", [
		"create_enchantment_industry:experience_cake_base",
		Fluid.of("create_enchantment_industry:experience", 1000)
	]).energy(400).id("thermal:compat/create_enchantment_industry/bottler_create_experience_cake")
})
ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 糖浆
	create.compacting([
		Fluid.of("thermal:syrup", 100),
		"cmi:sugarcane_fiber"
	], "minecraft:sugar_cane")

	create.compacting(Fluid.of("thermal:syrup", 100), [
		"#forge:vegetables/beetroot"
	])

	// 纸
	create.emptying([
		Fluid.of("thermal:syrup", 10),
		"6x minecraft:paper"
	], "cmi:sugarcane_fiber")

	SmeltingRecipes.smoking(event, "3x minecraft:paper", "cmi:sugarcane_fiber")

	// 糖
	create.mixing("minecraft:sugar", [
		Fluid.of("thermal:syrup", 25)
	]).heatRequirement(CmiHeatLevel.GRILLED)
})
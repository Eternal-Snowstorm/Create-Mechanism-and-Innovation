ServerEvents.recipes((event) => {
	let { cmi, createdieselgenerators } = event.getRecipes()

	// 盐水处理
	cmi.electrolyzer()
		.outputGases("100x mekanism:chlorine")
		.outputGases("100x mekanism:sodium")
		.inputItems("20x #forge:dusts/salt")
		.duration(20)
		.perTick((recipe) => {
			recipe.inputFE(1000)
		})

	// 水处理
	cmi.electrolyzer()
		.outputGases("1000x mekanism:hydrogen")
		.outputGases("500x mekanism:oxygen")
		.inputFluids(MBDFluidIngredient.ofTagId("minecraft:water", 1000))
		.duration(20)
		.perTick((recipe) => {
			recipe.inputFE(1000)
		})

	// 重水处理
	cmi.electrolyzer()
		.outputGases("500x mekanismgenerators:deuterium")
		.outputGases("1000x mekanism:oxygen")
		.inputFluids(MBDFluidIngredient.ofTagId("forge:heavy_water", 1000))
		.duration(20)
		.perTick((recipe) => {
			recipe.inputFE(1000)
		})

	// 红石酸
	createdieselgenerators.bulk_fermenting(Fluid.of("immersiveengineering:redstone_acid", 200), [
		Fluid.of("tconstruct:molten_lead", 90),
		"minecraft:redstone"
	]).id("createdieselgenerators:compat/immersiveengineering/redstone_acid")

	createdieselgenerators.bulk_fermenting(Fluid.of("immersiveengineering:redstone_acid", 200), [
		Fluid.of("thermal:redstone", 100),
		"#forge:dusts/lead"
	])

	// 电解红石
	cmi.electrolyzer()
		.inputFluids(MBDFluidIngredient.ofTagId("forge:redstone_acid", 1000))
		.outputItems("cmi:electrolized_redstone")
		.duration(20 * 5)
		.id("immersiveindustry:electrolyzer/redstone_acid")
})
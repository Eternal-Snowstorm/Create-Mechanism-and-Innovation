ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	// 盐水处理
	cmi.electrolyzer()
		.outputGases("100x mekanism:chlorine")
		.outputGases("100x mekanism:sodium")
		.inputFluids(MBDFluidIngredient.ofTagId("forge:brine", 1000))
		.duration(20)
		.perTick((recipe) => {
			recipe.inputFE(1000)
		})

	// 水处理
	cmi.electrolyzer()
		.outputGases("500x mekanism:hydrogen")
		.outputGases("1000x mekanism:oxygen")
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

	// 海水处理
	cmi.electrolyzer()
		.inputFluids(Fluid.of("cmi:sea_water", 1000))
		.outputFluids(Fluid.of("cmi:caustic_soda_solution", 200))
		.outputItems("mekanism:salt", 1)
		.duration(20 * 10)

	// 铝粉
	cmi.electrolyzer()
		.inputItems("#cmi:aluminum_oxide")
		.outputItems("immersiveengineering:dust_aluminum")
		.duration(20 * 10)

	// 钢齿轮镀铬
	cmi.electrolyzer()
		.inputItems("#forge:gears/steel")
		.inputFluids(MBDFluidIngredient.ofTagId("cmi:plating_solution", 1000))
		.outputItems("cmi:chromeplated_steel_gear")
		.outputFluids(Fluid.of("mekanism:sulfuric_acid", 500))
		.duration(20 * 5)

	// 电解红石
	cmi.electrolyzer()
		.inputFluids(MBDFluidIngredient.ofTagId("forge:redstone_acid", 1000))
		.outputItems("cmi:electrolized_redstone")
		.duration(20 * 5)
		.id("immersiveindustry:electrolyzer/redstone_acid")

	// 氯
	cmi.electrolyzer()
		.inputFluids(MBDFluidIngredient.ofTagId("forge:brine", 500))
		.outputFluids(Fluid.of("mekanism:chlorine", 100))
		.outputItems("mekanism:salt")
		.duration(20 * 5)

	// 含锂电解液
	cmi.electrolyzer()
		.inputFluids(MBDFluidIngredient.ofTagId("cmi:waste_brine", 200))
		.outputFluids(Fluid.of("cmi:lithium_containing_electrolyte", 100))
		.outputItems("mekanism:salt")
		.duration(20 * 5)

	// 硫酸
	cmi.electrolyzer()
		.inputItems("alexscaves:toxic_paste")
		.outputFluids(Fluid.of("mekanism:sulfuric_acid", 100))
		.duration(20)
	
	/*
	cmi.test()
		.outputItems("minecraft:diamond")
		.inputItems("#forge:ingots/iron")
		.duration(20 * 10)
		.perTick((recipe) => {
			recipe.inputFE(1000)
		})
	*/
})
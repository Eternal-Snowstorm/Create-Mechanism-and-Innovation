ServerEvents.recipes((event) => {
	let { create, thermal, thermal_extra, mekanism, cmi } = event.getRecipes()

	// 浑浊废液
	thermal.compression_fuel(Fluid.of("cmi:turbid_waste_liquid", 1000), 10000)

	// 浓缩海水
	mekanism.evaporating(
		Fluid.of("cmi:sea_water", 10),
		Fluid.of("cmi:concentrated_sea_water", 1)
	)

	// 卤水
	mekanism.evaporating(
		Fluid.of("cmi:concentrated_sea_water", 10),
		Fluid.of("cmi:brine", 1)
	)

	// 碱性卤水
	create.mixing(Fluid.of("cmi:alkaline_brine", 500), [
		"4x cmi:furnaced_lime",
		Fluid.of("cmi:brine", 500)
	])

	// 溴 废卤水
	thermal_extra.fluid_mixer([
		Fluid.of("cmi:waste_brine", 100),
		Fluid.of("cmi:bromine", 100)
	], [
		Fluid.of("cmi:alkaline_brine", 100),
		Fluid.of("mekanism:chlorine", 100)
	])

	// 海水电解
	cmi.electrolyzer()
		.inputFluids(Fluid.of("cmi:sea_water", 1000))
		.outputFluids(Fluid.of("cmi:caustic_soda_solution", 200))
		// outputItems 是 varargs(InputItem...), 数量和 "Nx id" 都写在字符串里 ——
		// 多写的 `, 1` 会被当成第二个 InputItem(数字解析不出原料), 生成一个幽灵槽位
		.outputItems("mekanism:salt")
		.duration(20 * 10)

	// 氯
	cmi.electrolyzer()
		.inputFluids(Fluid.of("cmi:concentrated_sea_water", 500))
		.outputFluids(Fluid.of("mekanism:chlorine", 100))
		.outputItems("mekanism:salt")
		.duration(20 * 5)

	// 盐酸
	cmi.electrolyzer()
		.inputFluids(Fluid.of("cmi:brine", 100))
		.outputFluids([
			Fluid.of("mekanism:hydrogen_chloride", 50),
			Fluid.of("cmi:alkaline_brine", 50)
		])
		.duration(20)
		.perTick((recipe) => {
			recipe.inputFE(1000)
		})
		.id("mekanism:gas_conversion/salt_to_hydrogen_chloride")

	// 含锂电解液
	cmi.electrolyzer()
		.inputFluids(MBDFluidIngredient.ofTagId("cmi:waste_brine", 200))
		.outputFluids(Fluid.of("cmi:lithium_containing_electrolyte", 100))
		.outputItems("mekanism:salt")
		.duration(20 * 5)

	// 含锂电解液(大电解机)
	event.custom({
		"type": "immersiveindustry:electrolyzer",
		"fluid": {
			"tag": "cmi:waste_brine",
			"amount": 200
		},
		"result_fluid": {
			"fluid": "cmi:lithium_containing_electrolyte",
			"amount": 100
		},
		"result": {
			"item": "mekanism:salt",
			"count": 1
		},
		"large_only": true,
		"time": 200
	})

	// 液态锂
	mekanism.evaporating(
		Fluid.of("cmi:lithium_containing_electrolyte", 10),
		Fluid.of("mekanism:lithium", 1)
	).id("mekanism:evaporating/lithium")
})
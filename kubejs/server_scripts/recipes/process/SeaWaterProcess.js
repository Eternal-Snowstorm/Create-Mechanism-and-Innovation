ServerEvents.recipes((event) => {
	let { create, thermal, thermal_extra, mekanism } = event.getRecipes()

	// 浑浊废液
	thermal.compression_fuel(Fluid.of("cmi:turbid_waste_liquid", 1000), 10000)

	// 浓缩海水
	mekanism.evaporating(Fluid.of("cmi:sea_water", 10),
		Fluid.of("cmi:concentrated_sea_water", 1)
	)

	// 卤水
	mekanism.evaporating(Fluid.of("cmi:concentrated_sea_water", 10),
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

	// 含锂电解液
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
	mekanism.evaporating(Fluid.of("cmi:lithium_containing_electrolyte", 10),
		Fluid.of("mekanism:lithium", 1)
	).id("mekanism:evaporating/lithium")
})
ServerEvents.recipes((event) => {
	let { cmi, thermal, thermal_extra } = event.getRecipes()

	// 聚烯烃
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/aluminum").toJson(),
		"energy": 120,
		"input0": {
			"amount": 8,
			"tag": "forge:ethene"
		},
		"result": {
			"amount": 8,
			"fluid": "thermal_extra:polyolefin"
		}
	})

	// 乙醛
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/copper").toJson(),
		"energy": 150,
		"input0": {
			"amount": 8,
			"tag": "forge:ethanol"
		},
		"result": {
			"amount": 8,
			"fluid": "immersiveengineering:acetaldehyde"
		}
	})

	// HDPE
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/ethylene_polymerization_catalytic").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "forge:ethene", 10).toJson(),
		"result": Fluid.of("cmi:hdpe", 1).toJson()
	})

	// 聚合碳溶液
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/carbon_polymerization_catalytic").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "cmi:light_olefin", 10).toJson(),
		"result": Fluid.of("cmi:polymeric_carbon_solution", 1).toJson()
	})

	// 轻胺烃
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/vanadium").toJson(),
		"energy": 1600,
		"input0": Fluid.tag("tag", "cmi:light_olefin", 20).toJson(),
		"input1": Fluid.tag("tag", "cmi:nitric_acid", 10).toJson(),
		"result": Fluid.of("cmi:light_amine", 20).toJson()
	})

	// 苯酚
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/iron").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "cmi:benzene", 100).toJson(),
		"input1": Fluid.tag("tag", "forge:ethene", 100).toJson(),
		"result": Fluid.of("cmi:phenol", 200).toJson()
	})

	// 酚醛树脂
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/copper").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "cmi:phenol", 100).toJson(),
		"input1": Fluid.tag("tag", "forge:acetaldehyde", 100).toJson(),
		"result": Fluid.of("immersiveengineering:phenolic_resin", 200).toJson()
	})

	// 乙烯醇
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/silver").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "cmi:acetylene", 100).toJson(),
		"result": Fluid.of("cmi:vinyl_alcohol", 100).toJson()
	})

	// 聚乙烯醇
	cmi.chemical_reactor()
		.inputFluids(Fluid.of("cmi:vinyl_alcohol", 2000))
		.outputFluids(Fluid.of("cmi:polyvinyl_alcohol", 2000))
		.inputFE(32 * (20 * 10))
		.duration(20 * 10)

	// 结构塑胶
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/copper").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "cmi:light_aldehyde", 100).toJson(),
		"input1": Fluid.tag("tag", "cmi:polyvinyl_alcohol", 100).toJson(),
		"result": Fluid.of("cmi:structural_plastic", 200).toJson()
	})

	// 结构玻璃
	thermal.bottler("mekanism:structural_glass", [
		Fluid.of("cmi:structural_plastic", 200),
		"ae2:quartz_glass"
	])
		.id("mekanism:structural_glass")

	// 三硝基甲苯溶液
	cmi.chemical_reactor()
		.inputFluids([
			Fluid.of("cmi:nitric_acid", 2000),
			Fluid.of("cmi:light_aromatics", 1000)
		])
		.outputFluids(Fluid.of("cmi:trinitrotoluene_solution", 1000))
		.inputFE(32 * (20 * 10))
		.duration(20 * 10)

	// 三硝基甲苯
	thermal.refinery([
		"cmi:trinitrotoluene"
	], [
		Fluid.of("cmi:trinitrotoluene_solution", 100)
	])

	thermal_extra.advanced_refinery([
		"2x cmi:trinitrotoluene"
	], [
		Fluid.of("cmi:trinitrotoluene_solution", 100)
	])

	// 天然气分离
	cmi.electrolyzer()
		.inputGases("200x cmi:natural_gas")
		.outputGases("100x cmi:methane")
		.outputGases("100x cmi:light_olefin")
})
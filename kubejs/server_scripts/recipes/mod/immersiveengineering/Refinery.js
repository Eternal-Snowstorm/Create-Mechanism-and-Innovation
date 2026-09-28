ServerEvents.recipes((event) => {
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

	// 乙醛副配方
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

	// 三氧化硫
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/vanadium").toJson(),
		"energy": 150,
		"input0": {
			"amount": 8,
			"tag": "forge:sulfur_dioxide"
		},
		"result": {
			"amount": 8,
			"fluid": "mekanism:sulfur_trioxide"
		}
	}).id("vintageimprovements:pressurizing/sulfur_trioxide")

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
})
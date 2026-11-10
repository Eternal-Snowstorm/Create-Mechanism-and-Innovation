ServerEvents.recipes((event) => {
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

	// 生产硝酸
	event.custom({
		"type": "immersiveindustry:rotary_kiln",
		"input": {
			"tag": "forge:dusts/niter",
			"count": 4
		},
		"result": {
			"item": "thermal:slag",
			"count": 1
		},
		"result_fluid": {
			"fluid": "cmi:nitric_acid",
			"amount": 200
		},
		"time": 200
	})
})
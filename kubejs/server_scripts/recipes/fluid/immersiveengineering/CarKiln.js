ServerEvents.recipes((event) => {
	// 半熔融锇
	event.custom({
		"type": "immersiveindustry:car_kiln",
		"inputs": [
			{
				"base_ingredient": {
					"tag": "forge:ingots/osmium"
				},
				"count": 1
			}
		],
		"results": [
			{
				"item": "cmi:pure_semi_molten_osmium",
				"count": 1
			}
		],
		"time": 100,
		"tickEnergy": 10
	})
})
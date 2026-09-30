// ServerEvents.highPriorityData((event) => {
// 	event.addJson(`${Cmi.MODID}:machines/chemical_gas_extractor.json`, {
// 		"name": "block.cmi.chemical_gas_extractor",
// 		"appearance": {
// 			"idle": {
// 				"block": "cmi:block/machine/chemical_gas_extractor/off"
// 			},
// 			"running": {
// 				"block": "cmi:block/machine/chemical_gas_extractor/on"
// 			},
// 			"errored": {
// 				"block": "cmi:block/machine/chemical_gas_extractor/off"
// 			},
// 			"paused": {
// 				"block": "cmi:block/machine/chemical_gas_extractor/off"
// 			},
// 			"interaction_sound": "minecraft:netherite_block",
// 			"requires_tool": true,
// 			"mining_level": "minecraft:needs_diamond_tool"
// 		},
// 		"components": [
// 			{
// 				"type": "custommachinery:gas",
// 				"mode": "output",
// 				"capacity": 1000000,
// 				"id": "output",
// 				"maxInput": 1000,
// 				"maxOutput": 2000,
// 				"config": {
// 					"default": "both"
// 				}
// 			}
// 		],
// 		// "gui": [
// 		// 	{
// 		// 		"type": "custommachinery:texture",
// 		// 		"texture": "custommachinery:textures/gui/base_background.png",
// 		// 		"x": 0,
// 		// 		"y": 0
// 		// 	},
// 		// 	{
// 		// 		"type": "custommachinery:player_inventory",
// 		// 		"x": 47,
// 		// 		"y": 80
// 		// 	},
// 		// 	{
// 		// 		"type": "custommachinery:gas",
// 		// 		"id": "output",
// 		// 		"x": 119,
// 		// 		"y": 30
// 		// 	}
// 		// ],
// 		"jei": [
// 			{
// 				"type": "custommachinery:texture",
// 				"texture": "custommachinery:textures/gui/base_background.png",
// 				"x": 0,
// 				"y": 0
// 			},
// 			{
// 				"type": "custommachinery:player_inventory",
// 				"x": 47,
// 				"y": 80
// 			},
// 			{
// 				"type": "custommachinery:gas",
// 				"id": "output",
// 				"x": 119,
// 				"y": 30
// 			}
// 		]
// 	})
// })
// ServerEvents.highPriorityData((event) => {
// 	event.addJson(`${Cmi.MODID}:machines/radar_terminal.json`, {
// 		"name": {
// 			"text": "block.cmi.radar_terminal"
// 		},
// 		"appearance": {
// 			"running": {
// 				"block": "cmi:block/machine/radar_terminal/on"
// 			},
// 			"errored": {
// 				"block": "cmi:block/machine/radar_terminal/off"
// 			},
// 			"paused": {
// 				"block": "cmi:block/machine/radar_terminal/off"
// 			},
// 			"hardness": -1.0,
// 			"interaction_sound": {},
// 			"mining_level": "minecraft:needs_diamond_tool",
// 			"resistance": 114514.0,
// 			"tool_type": [
// 				"minecraft:mineable/pickaxe"
// 			],
// 			"idle": {
// 				"block": "cmi:block/machine/radar_terminal/off"
// 			}
// 		},
// 		"components": [
// 			{
// 				"type": "custommachinery:energy",
// 				"capacity": 100000,
// 				"config": {
// 					"TOP": "BOTH",
// 					"BOTTOM": "BOTH",
// 					"FRONT": "BOTH",
// 					"RIGHT": "BOTH",
// 					"BACK": "BOTH",
// 					"LEFT": "BOTH"
// 				}
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"filter": [
// 					"cmi:empty_cell"
// 				],
// 				"whitelist": true,
// 				"id": "cell_input",
// 				"mode": "input"
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"id": "output",
// 				"mode": "output"
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"variant": "custommachinery:energy",
// 				"id": "battery",
// 				"mode": "input"
// 			}
// 		],
// 		"gui": [
// 			{
// 				"type": "custommachinery:background",
// 				"texture": "cmi:textures/gui/radar/background.png",
// 				"width": 224,
// 				"height": 176
// 			},
// 			{
// 				"type": "custommachinery:slot",
// 				"id": "output",
// 				"priority": 1,
// 				"texture": "cmi:textures/gui/radar/item_slot.png",
// 				"x": 9,
// 				"y": 52,
// 				"width": 18,
// 				"ghost": {
// 					"items": [
// 						"minecraft:air"
// 					],
// 					"color": {}
// 				}
// 			},
// 			{
// 				"type": "custommachinery:slot",
// 				"id": "cell_input",
// 				"priority": 1,
// 				"texture": "cmi:textures/gui/radar/item_slot.png",
// 				"x": 9,
// 				"y": 16,
// 				"ghost": {
// 					"items": [
// 						"minecraft:air"
// 					],
// 					"color": {}
// 				}
// 			},
// 			{
// 				"type": "custommachinery:slot",
// 				"id": "battery",
// 				"priority": 1,
// 				"texture": "cmi:textures/gui/radar/battery_slot.png",
// 				"x": 198,
// 				"y": 10,
// 				"ghost": {
// 					"items": [
// 						"minecraft:air"
// 					],
// 					"color": {}
// 				}
// 			},
// 			{
// 				"type": "custommachinery:energy",
// 				"priority": 1,
// 				"x": 201,
// 				"y": 31,
// 				"texture_empty": "cmi:textures/gui/radar/energy_empty.png",
// 				"texture_filled": "cmi:textures/gui/radar/energy_filled.png"
// 			},
// 			{
// 				"type": "custommachinery:player_inventory",
// 				"priority": 1,
// 				"texture": "cmi:textures/gui/radar/inventory.png",
// 				"x": 31,
// 				"y": 93
// 			},
// 			{
// 				"type": "custommachinery:status",
// 				"x": 43,
// 				"y": 17,
// 				"texture_idle": "cmi:textures/gui/radar/idle.png",
// 				"texture_running": "cmi:textures/gui/radar/processing.png"
// 			},
// 			{
// 				"type": "custommachinery:progress",
// 				"x": 50,
// 				"y": 44,
// 				"texture_empty": "cmi:textures/gui/radar/progress_empty.png",
// 				"texture_filled": "cmi:textures/gui/radar/progress_filled.png"
// 			},
// 			{
// 				"type": "custommachinery:status",
// 				"x": 43,
// 				"y": 44,
// 				"texture_idle": "cmi:textures/gui/radar/idle_bottom.png",
// 				"texture_running": "cmi:textures/gui/radar/processing_bottom.png"
// 			}
// 		],
// 		"jei": [
// 			{
// 				"type": "custommachinery:background",
// 				"texture": "cmi:textures/gui/radar/background.png",
// 				"width": 224,
// 				"height": 176
// 			},
// 			{
// 				"type": "custommachinery:slot",
// 				"id": "output",
// 				"priority": 1,
// 				"texture": "cmi:textures/gui/radar/item_slot.png",
// 				"x": 9,
// 				"y": 52,
// 				"width": 18,
// 				"ghost": {
// 					"items": [
// 						"minecraft:air"
// 					],
// 					"color": {}
// 				}
// 			},
// 			{
// 				"type": "custommachinery:slot",
// 				"id": "cell_input",
// 				"priority": 1,
// 				"texture": "cmi:textures/gui/radar/item_slot.png",
// 				"x": 9,
// 				"y": 16,
// 				"ghost": {
// 					"items": [
// 						"minecraft:air"
// 					],
// 					"color": {}
// 				}
// 			},
// 			{
// 				"type": "custommachinery:slot",
// 				"id": "battery",
// 				"priority": 1,
// 				"texture": "cmi:textures/gui/radar/battery_slot.png",
// 				"x": 198,
// 				"y": 10,
// 				"ghost": {
// 					"items": [
// 						"minecraft:air"
// 					],
// 					"color": {}
// 				}
// 			},
// 			{
// 				"type": "custommachinery:energy",
// 				"priority": 1,
// 				"x": 201,
// 				"y": 31,
// 				"texture_empty": "cmi:textures/gui/radar/energy_empty.png",
// 				"texture_filled": "cmi:textures/gui/radar/energy_filled.png"
// 			},
// 			{
// 				"type": "custommachinery:player_inventory",
// 				"priority": 1,
// 				"texture": "cmi:textures/gui/radar/inventory.png",
// 				"x": 31,
// 				"y": 93
// 			},
// 			{
// 				"type": "custommachinery:status",
// 				"x": 43,
// 				"y": 17,
// 				"texture_idle": "cmi:textures/gui/radar/idle.png",
// 				"texture_running": "cmi:textures/gui/radar/processing.png"
// 			},
// 			{
// 				"type": "custommachinery:progress",
// 				"x": 50,
// 				"y": 44,
// 				"texture_empty": "cmi:textures/gui/radar/progress_empty.png",
// 				"texture_filled": "cmi:textures/gui/radar/progress_filled.png"
// 			},
// 			{
// 				"type": "custommachinery:status",
// 				"x": 43,
// 				"y": 44,
// 				"texture_idle": "cmi:textures/gui/radar/idle_bottom.png",
// 				"texture_running": "cmi:textures/gui/radar/processing_bottom.png"
// 			}
// 		]
// 	})
// })
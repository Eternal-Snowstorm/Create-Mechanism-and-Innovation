// ServerEvents.recipes((event) => {
// 	CmiGlobal.mechanismGroup.forEach((material) => {
// 		event.custom({
// 			"type": "custommachinery:custom_machine",
// 			"machine": `${Cmi.MODID}:flash_disk_writer`,
// 			"time": 400,
// 			"hidden": false,
// 			"requirements": [
// 				{
// 					"type": "custommachinery:item",
// 					"mode": "input",
// 					"item": `cmi:${material}_mechanism`,
// 					"amount": 64
// 				},
// 				{
// 					"type": "custommachinery:item",
// 					"mode": "input",
// 					"item": `cmi:${material}_mechanism`,
// 					"amount": 64
// 				},
// 				{
// 					"type": "custommachinery:item",
// 					"mode": "input",
// 					"item": `cmi:${material}_mechanism`,
// 					"amount": 64
// 				},
// 				{
// 					"type": "custommachinery:item",
// 					"mode": "input",
// 					"item": `cmi:${material}_mechanism`,
// 					"amount": 64
// 				},
// 				{
// 					"type": "custommachinery:item",
// 					"mode": "input",
// 					"item": "cmi:programmed_flash_drive",
// 					"amount": 1
// 				},
// 				{
// 					"type": "custommachinery:item",
// 					"mode": "output",
// 					"item": `cmi:${material}_mechanism_flash_drive`,
// 					"amount": 1
// 				},
// 				{
// 					"type": "custommachinery:energy",
// 					"mode": "input",
// 					"amount": 2000000
// 				}
// 			]
// 		})
// 	})

// 	// 精密和红石
// 	event.custom({
// 		"type": "custommachinery:custom_machine",
// 		"machine": `${Cmi.MODID}:flash_disk_writer`,
// 		"time": 400,
// 		"hidden": false,
// 		"requirements": [
// 			{
// 				"type": "custommachinery:item",
// 				"mode": "input",
// 				"item": "vintageimprovements:redstone_module",
// 				"amount": 64
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"mode": "input",
// 				"item": "vintageimprovements:redstone_module",
// 				"amount": 64
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"mode": "input",
// 				"item": "vintageimprovements:redstone_module",
// 				"amount": 64
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"mode": "input",
// 				"item": "vintageimprovements:redstone_module",
// 				"amount": 64
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"mode": "input",
// 				"item": "cmi:programmed_flash_drive",
// 				"amount": 1
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"mode": "output",
// 				"item": "cmi:redstone_mechanism_flash_drive",
// 				"amount": 1
// 			},
// 			{
// 				"type": "custommachinery:energy",
// 				"mode": "input",
// 				"amount": 2000000
// 			}
// 		]
// 	})

// 	event.custom({
// 		"type": "custommachinery:custom_machine",
// 		"machine": `${Cmi.MODID}:flash_disk_writer`,
// 		"time": 400,
// 		"hidden": false,
// 		"requirements": [
// 			{
// 				"type": "custommachinery:item",
// 				"mode": "input",
// 				"item": "create:precision_mechanism",
// 				"amount": 64
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"mode": "input",
// 				"item": "create:precision_mechanism",
// 				"amount": 64
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"mode": "input",
// 				"item": "create:precision_mechanism",
// 				"amount": 64
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"mode": "input",
// 				"item": "create:precision_mechanism",
// 				"amount": 64
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"mode": "input",
// 				"item": "cmi:programmed_flash_drive",
// 				"amount": 1
// 			},
// 			{
// 				"type": "custommachinery:item",
// 				"mode": "output",
// 				"item": "cmi:precision_mechanism_flash_drive",
// 				"amount": 1
// 			},
// 			{
// 				"type": "custommachinery:energy",
// 				"mode": "input",
// 				"amount": 2000000
// 			}
// 		]
// 	})

// 	let dataType = [
// 		"orbit",
// 		"mass",
// 		"radius",
// 		"atmosphere"
// 	]
// 	for (let tier = 1; tier <= 4; tier++) {
// 		event.custom({
// 			type: "custommachinery:custom_machine",
// 			machine: `${Cmi.MODID}:flash_disk_writer`,
// 			time: 400,
// 			hidden: false,
// 			requirements: [
// 				{
// 					type: "custommachinery:item",
// 					mode: "input",
// 					item: "cmi:empty_cell",
// 					amount: 1
// 				},
// 				{
// 					type: "custommachinery:item",
// 					mode: "input",
// 					item: `cmi:tier_${tier}_aviation_cell`,
// 					nbt: `{data:${dataType[0]}}`,
// 					amount: 1
// 				},
// 				{
// 					type: "custommachinery:item",
// 					mode: "input",
// 					item: `cmi:tier_${tier}_aviation_cell`,
// 					nbt: `{data:${dataType[1]}}`,
// 					amount: 1
// 				},
// 				{
// 					type: "custommachinery:item",
// 					mode: "input",
// 					item: `cmi:tier_${tier}_aviation_cell`,
// 					nbt: `{data:${dataType[2]}}`,
// 					amount: 1
// 				},
// 				{
// 					type: "custommachinery:item",
// 					mode: "input",
// 					item: `cmi:tier_${tier}_aviation_cell`,
// 					nbt: `{data:${dataType[3]}}`,
// 					amount: 1
// 				},
// 				{
// 					type: "custommachinery:item",
// 					mode: "output",
// 					item: `cmi:tier_${tier}_aviation_complete_cell`,
// 					amount: 1
// 				},
// 				{
// 					type: "custommachinery:energy",
// 					mode: "input",
// 					amount: 2000000
// 				}
// 			]
// 		})
// 	}
// })
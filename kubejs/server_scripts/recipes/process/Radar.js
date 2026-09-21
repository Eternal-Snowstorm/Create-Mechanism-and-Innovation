ServerEvents.recipes((event) => {
	let dataType = [
		"orbit",
		"mass",
		"radius",
		"atmosphere"
	]

	let dimensionTier = [
		"minecraft:overworld",
		"ad_astra:moon",
		"ad_astra:mars",
		"ad_astra:mercury"
	]

	event.custom({
		"type": "custommachinery:custom_machine",
		"machine": `${Cmi.MODID}:radar_terminal`,
		"time": 1000,
		"hidden": false,
		"requirements": [
			{
				"type": "custommachinery:item",
				"mode": "input",
				"item": "cmi:empty_cell",
				"amount": 1
			},
			{
				"type": "custommachinery:item",
				"mode": "output",
				"item": `cmi:tier_1_aviation_cell`,
				"nbt": `{data:"orbit"}`,
				"amount": 1
			},
			{
				"type": "custommachinery:energy",
				"mode": "input",
				"amount": 10000
			},
			{
				"type": "custommachinery:structure",
				"pattern": [
					[
						"AB  m",
					],
				],
				"jei": false,
				"keys": {
					"A": "cmi:rocket_display_tier_1",
					"B": "cmi:rocket_display_type_1"
				}
			}
		]
	})
})
ServerEvents.recipes((event) => {
	let tierMaterial = [
		"steel",
		"desh",
		"ostrum",
		"calorite"
	]

	for (let i = 1; i <= 4; i++) {
		let material = tierMaterial[i - 1]

		event.custom({
			"type": "ad_astra:nasa_workbench",
			"ingredients": [
				{
					"item": `cmi:tier_${i}_rocket_nose_cone`
				},
				{
					"item": `cmi:tier_${i}_rocket_body`
				},
				{
					"item": `cmi:tier_${i}_rocket_body`
				},
				{
					"item": `cmi:tier_${i}_rocket_body`
				},
				{
					"item": `cmi:tier_${i}_rocket_body`
				},
				{
					"item": `cmi:tier_${i}_rocket_body`
				},
				{
					"item": `cmi:tier_${i}_rocket_body`
				},
				{
					"item": `cmi:tier_${i}_rocket_fin`
				},
				{
					"item": `ad_astra:${material}_tank`
				},
				{
					"item": `ad_astra:${material}_tank`
				},
				{
					"item": `cmi:tier_${i}_rocket_fin`
				},
				{
					"item": `cmi:tier_${i}_rocket_fin`
				},
				{
					"item": `ad_astra:${material}_engine`
				},
				{
					"item": `cmi:tier_${i}_rocket_fin`
				}
			],
			"result": {
				"count": 1,
				"id": `ad_astra:tier_${i}_rocket`
			}
		})
	}
})
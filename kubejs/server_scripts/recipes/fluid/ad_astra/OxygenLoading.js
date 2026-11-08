ServerEvents.recipes((event) => {
	event.custom({
		"type": "ad_astra:oxygen_loading",
		"cookingtime": 1,
		"energy": 1,
		"input": {
			"ingredient": {
				"tag": "forge:oxygen"
			},
			"millibuckets": 25
		},
		"result": {
			"fluid": "ad_astra:oxygen",
			"millibuckets": 25
		}
	}).id("ad_astra:oxygen_loading/oxygen_from_oxygen_loading_oxygen")
})
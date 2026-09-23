ServerEvents.recipes((event) => {
	function addStationRecipe(namespace, name, tier) {
		return event.custom({
			type: "ad_astra:space_station_recipe",
			dimension: `${namespace}:${name}_orbit`,
			ingredients: [
				{
					"count": 32,
					"ingredient": {
						"tag": "forge:plates/stainless_steel"
					}
				},
				{
					"count": 32,
					"ingredient": {
						"tag": "forge:rods/aluminum"
					}
				},
				{
					"count": 32,
					"ingredient": {
						"tag": "forge:plates/polyolefin"
					}
				},
				{
					"count": 32,
					"ingredient": {
						"tag": `create:mechanisms/astronautic`
					}
				}
			],
			structure: "ad_astra:space_station"
		}).id(`${namespace}:recipes/space_station/${name}_orbit_space_station`)
	}

	addStationRecipe("ad_astra", "earth", 1)
	addStationRecipe("ad_astra", "moon", 1)
	addStationRecipe("cmi", "dionysus", 1)
	addStationRecipe("ad_astra", "mars", 2)
	addStationRecipe("cmi", "hephaestus", 2)
	addStationRecipe("ad_astra", "venus", 3)
	addStationRecipe("ad_astra", "mercury", 3)
	addStationRecipe("ad_astra", "glacio", 4)
})
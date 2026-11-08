ServerEvents.recipes((event) => {
	/**
	 * 
	 * @param {Special.Mod} namespace 
	 * @param {string} name 
	 * @returns 
	 */
	function addStationRecipe(namespace, name) {
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

	addStationRecipe("ad_astra", "earth")
	addStationRecipe("ad_astra", "moon")
	addStationRecipe("cmi", "dionysus")
	addStationRecipe("ad_astra", "mars")
	addStationRecipe("cmi", "hephaestus")
	addStationRecipe("ad_astra", "venus")
	addStationRecipe("ad_astra", "mercury")
	addStationRecipe("ad_astra", "glacio")
})
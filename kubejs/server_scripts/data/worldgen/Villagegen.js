ServerEvents.highPriorityData((event) => {
	let villageBiomes = [
		"desert",
		"plains",
		"savanna",
		"snowy",
		"taiga"
	]

	let buildingTypes = [
		"tinker",
		"clinic",
		"mill",
		"fisherman_cabin",
		"library",
		"restaurant"
	]

	let streetTypes = [
		"straight",
		"corner",
		"crossroad"
	]

	let centerTypes = [
		"tower"
	]

	villageBiomes.forEach((biome) => {
		let templatePool = {
			elements: [],
			fallback: `cmi:village/${biome}/terminators`
		}
		buildingTypes.forEach((type) => {
			templatePool.elements.push({
				element: {
					element_type: "minecraft:legacy_single_pool_element",
					location: `cmi:village/${biome}/houses/${type}`,
					processors: "minecraft:mossify_10_percent",
					projection: "rigid"
				},
				weight: 4
			})
		})
		for (let i = 1; i <= 6; i++) {
			templatePool.elements.push({
				"element": {
					element_type: "minecraft:legacy_single_pool_element",
					location: `cmi:village/${biome}/farms/${i}`,
					processors: "minecraft:farm_plains",
					projection: "rigid"
				},
				"weight": 4
			})
		}
		templatePool.elements.push({
			"element": {
				"element_type": "minecraft:empty_pool_element"
			},
			"weight": 3
		})

		event.addJson(`cmi:worldgen/template_pool/village/${biome}/houses.json`, templatePool)

		let streetPool = {
			elements: [],
			fallback: `cmi:village/${biome}/terminators`
		}
		streetTypes.forEach((type) => {
			for (let i = 1; i <= 3; i++) {
				let weight = 6

				if (type == "crossroad") {
					weight = 2
				}
				if (type == "corner") {
					weight = 3
				}
				streetPool.elements.push({
					element: {
						element_type: "minecraft:legacy_single_pool_element",
						location: `cmi:village/${biome}/streets/${type}_${i}`,
						processors: "cmi:road",
						projection: "terrain_matching"
					},
					"weight": weight
				})
			}
		})

		event.addJson(`minecraft:worldgen/template_pool/village/${biome}/streets.json`, streetPool)

		let terminatorPool = {
			elements: [],
			fallback: "minecraft:empty"
		}

		for (let i = 1; i <= 3; i++) {
			terminatorPool.elements.push({
				element: {
					element_type: "minecraft:legacy_single_pool_element",
					location: `cmi:village/${biome}/terminators/terminator_${i}`,
					processors: "cmi:road",
					projection: "terrain_matching"
				},
				weight: 1
			})
		}

		event.addJson(`cmi:worldgen/template_pool/village/${biome}/terminators`, terminatorPool)
	})
})
ServerEvents.highPriorityData((event) => {
	let villageBiomes = [
		// "desert",
		"plains",
		// "savanna",
		// "snowy",
		// "taiga"
	]

	const SLOTS_PER_VILLAGE = 8

	let buildingTypes = [
		{
			id: "cabin_1",
			perVillage: 0.4
		},
		{
			id: "cabin_2",
			perVillage: 0.5
		},
		{
			id: "cabin_3",
			perVillage: 0.4
		},
		{
			id: "clinic",
			perVillage: 0.4
		},
		{
			id: "dyeing",
			perVillage: 0.2
		},
		{
			id: "fisherman",
			perVillage: 0.3
		},
		{
			id: "grain",
			perVillage: 0.3
		},
		{
			id: "library",
			perVillage: 0.3
		},
		{
			id: "mill",
			perVillage: 0.35
		},
		{
			id: "restaurant",
			perVillage: 0.25
		},
		{
			id: "tinker",
			perVillage: 0.85
		},
		{
			id: "toilet",
			perVillage: 0.5
		},
		{
			id: "train",
			perVillage: 0.85
		}
	]

	let farmCount = 6
	let farmWeight = 4
	let emptyWeight = 3
	let slotChance = []

	for (let i = 0; i < buildingTypes.length; i++) {
		if (buildingTypes[i].perSlot != null) {
			slotChance.push(buildingTypes[i].perSlot)
		} else {
			slotChance.push(1 - Math.pow(1 - buildingTypes[i].perVillage, 1 / SLOTS_PER_VILLAGE))
		}
	}

	let specialChance = 0
	for (let i = 0; i < slotChance.length; i++) {
		specialChance = specialChance + slotChance[i]
	}

	if (specialChance > 0.95) {
		console.warn(`[VillageGen] 每槽位概率合计 ${specialChance} 太接近 1, 已整体缩放到 0.95`)
		let scale = 0.95 / specialChance
		for (let i = 0; i < slotChance.length; i++) {
			slotChance[i] = slotChance[i] * scale
		}
		specialChance = 0.95
	}

	let backgroundWeight = farmCount * farmWeight + emptyWeight
	let rawWeights = []
	for (let i = 0; i < slotChance.length; i++) {
		rawWeights.push(slotChance[i] * backgroundWeight / (1 - specialChance))
	}
	rawWeights.push(farmWeight)
	rawWeights.push(emptyWeight)

	let maxRawWeight = 0
	for (let i = 0; i < rawWeights.length; i++) {
		if (rawWeights[i] > maxRawWeight) {
			maxRawWeight = rawWeights[i]
		}
	}

	let weightScale = 150 / maxRawWeight
	for (let i = 0; i < rawWeights.length; i++) {
		let weight = Math.round(rawWeights[i] * weightScale)
		if (weight < 1) {
			weight = 1
		}
		if (weight > 150) {
			weight = 150
		}
		rawWeights[i] = weight
	}

	let buildingWeights = []
	for (let i = 0; i < buildingTypes.length; i++) {
		buildingWeights.push(rawWeights[i])
	}
	let farmWeightFinal = rawWeights[rawWeights.length - 2]
	let emptyWeightFinal = rawWeights[rawWeights.length - 1]

	let logText = "[VillageGen] 房屋池："
	for (let i = 0; i < buildingTypes.length; i++) {
		if (i > 0) {
			logText = logText + ", "
		}
		let perVillage = Math.round((1 - Math.pow(1 - slotChance[i], SLOTS_PER_VILLAGE)) * 100)
		logText = `${logText + buildingTypes[i].id} 每村约${perVillage}% 权重${buildingWeights[i]}`
	}
	logText = `${logText}, 农田权重${farmWeightFinal}, 空地权重${emptyWeightFinal}`
	console.info(logText)

	let streetTypes = [
		{
			id: "straight",
			weight: 6
		},
		{
			id: "corner",
			weight: 3
		},
		{
			id: "crossroad",
			weight: 2
		}
	]

	let terminatorWeight = 1

	villageBiomes.forEach((biome) => {
		let templatePool = {
			elements: [],
			fallback: `cmi:village/${biome}/terminators`
		}

		buildingTypes.forEach((building, index) => {
			templatePool.elements.push({
				element: {
					element_type: "minecraft:legacy_single_pool_element",
					location: `cmi:village/${biome}/houses/${building.id}`,
					processors: "minecraft:mossify_10_percent",
					projection: "rigid"
				},
				weight: buildingWeights[index]
			})
		})

		for (let i = 1; i <= farmCount; i++) {
			templatePool.elements.push({
				element: {
					element_type: "minecraft:legacy_single_pool_element",
					location: `cmi:village/${biome}/farms/${i}`,
					processors: "minecraft:farm_plains",
					projection: "rigid"
				},
				weight: farmWeightFinal
			})
		}

		templatePool.elements.push({
			element: {
				element_type: "minecraft:empty_pool_element"
			},
			weight: emptyWeightFinal
		})

		event.addJson(`minecraft:worldgen/template_pool/village/${biome}/houses.json`, templatePool)

		let streetPool = {
			elements: [],
			fallback: `cmi:village/${biome}/terminators`
		}

		streetTypes.forEach((street) => {
			for (let i = 1; i <= 3; i++) {
				streetPool.elements.push({
					element: {
						element_type: "minecraft:legacy_single_pool_element",
						location: `cmi:village/${biome}/streets/${street.id}_${i}`,
						processors: "cmi:road",
						projection: "terrain_matching"
					},
					weight: street.weight
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
				weight: terminatorWeight
			})
		}

		event.addJson(`cmi:worldgen/template_pool/village/${biome}/terminators`, terminatorPool)
	})
})
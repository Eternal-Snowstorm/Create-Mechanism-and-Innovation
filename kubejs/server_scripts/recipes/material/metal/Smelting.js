ServerEvents.recipes((event) => {
	let { minecraft, mekanism, immersiveengineering, thermal, cmi } = event.getRecipes()
	let types = [
		"forge:ores",
		"forge:raw_materials",
		"forge:dusts",
		"create:crushed_raw_materials",
		"mekanism:dirty_dusts"
	]
	let meltingLevels = {
		furnace: 1092,
		blastFurnace: 1542,
		carKiln: 1953,
		arcFurnace: 2115,
		thermalFurnace: 2524,
		blazingBloodCarKiln: 3094
	}
	let directSmeltingDisabledMetals = ["aluminum", "uranium"]
	let directSmeltingDisabledTypes = [
		"forge:raw_materials",
		"forge:ores",
		"create:crushed_raw_materials",
		"mekanism:dirty_dusts"
	]

	types.forEach((type) => {
		CmiMetal.getAll().forEach((material) => {
			let metal = material.getId()
			let metalId = metal.toString()
			let ingotId = Ingredient.of(`#forge:ingots/${metal}`).getItemIds()
			let meltingPoint = CmiMetal.getMetal(metal).getMeltingPoint()
			let directSmeltingDisabled = directSmeltingDisabledMetals.includes(metalId)
				&& directSmeltingDisabledTypes.includes(type)

			event.remove([{
				type: "minecraft:smelting",
				input: `#${type}/${metal}`
			}, {
				type: "minecraft:blasting",
				input: `#${type}/${metal}`
			}, {
				type: "immersiveengineering:arc_furnace",
				input: `#${type}/${metal}`
			}, {
				type: "mekanism:smelting",
				input: `#${type}/${metal}`
			}, {
				type: "thermal:furnace",
				input: `#${type}/${metal}`
			}, {
				id: `immersiveengineering:arcfurnace/raw_block_${metal}`
			}])

			if (Ingredient.isNotNull(`#${type}/${metal}`) && !directSmeltingDisabled) {
				if (meltingPoint <= meltingLevels.furnace) {
					minecraft.smelting(ingotId[0], `#${type}/${metal}`)
				}

				if (meltingPoint <= meltingLevels.blastFurnace) {
					minecraft.blasting(ingotId[0], `#${type}/${metal}`)
				}

				if (meltingPoint <= meltingLevels.carKiln) {
					event.custom({
						"type": "immersiveindustry:car_kiln",
						"input": {
							"tag": `${type}/${metal}`
						},
						"results": [
							{
								"item": ingotId[0]
							}
						],
						"time": 200,
						"tickEnergy": 32
					})
				}
				if (meltingPoint <= meltingLevels.thermalFurnace) {
					thermal.furnace(ingotId[0], `#${type}/${metal}`)
				}

				if (meltingPoint <= meltingLevels.blazingBloodCarKiln && meltingPoint > meltingLevels.carKiln) {
					event.custom({
						"type": "immersiveindustry:car_kiln",
						"input_fluid": {
							"tag": "tconstruct:blazing_blood",
							"amount": 1000
						},
						"inputs": [
							{
								"base_ingredient": {
									"tag": `${type}/${metal}`
								},
								"count": 4
							}
						],
						"results": [
							{
								"item": ingotId[0],
								"count": 2
							}
						],
						"time": 500,
						"tickEnergy": 80
					})
				}

				if (meltingPoint <= meltingLevels.arcFurnace) {
					immersiveengineering.arc_furnace(ingotId[0])
						.input(`#${type}/${metal}`)
						.additives([])
				}

				mekanism.smelting(ingotId[0], `#${type}/${metal}`)

				cmi.electronic_blast_furnace()
					.inputItems(`#${type}/${metal}`)
					.outputItems(ingotId[0])
					.inputFE(10000)
					.duration(20 * 3)
			}
		})
	})
})

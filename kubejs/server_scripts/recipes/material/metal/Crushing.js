ServerEvents.recipes((event) => {
	let { create, thermal, mekanism } = event.getRecipes()

	CmiMetal.getAll().forEach((material) => {
		let metal = material.getId()
		const RAW_ORE = `#forge:raw_materials/${metal}`
		const RAW_BLOCK = `#forge:storage_blocks/raw_${metal}`
		const CRUSHED = `#create:crushed_raw_materials/${metal}`
		const ORE = `#forge:ores/${metal}`
		const EXP_NUGGET = "create:experience_nugget"
		const INGOT = `#forge:ingots/${metal}`
		const DUST = `#forge:dusts/${metal}`

		if (Ingredient.isNotNull(DUST)) {
			create.crushing([
				highPriorityItem(DUST)
			], INGOT)

			thermal.pulverizer([
				highPriorityItem(DUST)
			], INGOT)

			mekanism.crushing(highPriorityItem(DUST),
				INGOT)
		}

		if (Ingredient.isNotNull(CRUSHED)) {
			if (Ingredient.isNotNull(RAW_BLOCK)) {
				create.crushing([
					highPriorityItem(CRUSHED, 9),
					Item.of(`9x ${EXP_NUGGET}`).withChance(0.75)
				], RAW_BLOCK)
			} else {
				// console.warn(`No storage block found for raw ${metal}!`)
			}
			if (Ingredient.isNotNull(RAW_ORE)) {
				create.crushing([
					highPriorityItem(CRUSHED),
					Item.of(EXP_NUGGET).withChance(0.75)
				], RAW_ORE)
			} else {
				// console.warn(`No raw material found for ${metal}!`)
			}
			if (Ingredient.isNotNull(ORE)) {
				create.crushing([
					highPriorityItem(CRUSHED),
					Item.of(Ingredient.getFirstItemId(CRUSHED)).withChance(0.75),
					Item.of(EXP_NUGGET).withChance(0.75),
					Item.of("minecraft:cobblestone").withChance(0.125)
				], ORE)
			} else {
				// console.warn(`No ore found for ${metal}!`)
			}
		} else {
			// console.warn(`No crushed raw material found for ${metal}!`)
		}

		event.remove([
			{
				type: "create:crushing",
				output: CRUSHED
			}, {
				type: "create:crushing",
				output: RAW_ORE
			}, {
				"type": "mekanism:crushing",
				"output": DUST
			}, {
				"type": "thermal:pulverizer",
				"output": DUST
			}, {
				"type": "mekanism:crushing",
				"output": DUST
			}, {
				"type": "ae2:inscriber",
				"output": DUST
			}, {
				"type": "immersiveengineering:crusher",
				"output": DUST
			}
		])
	})
})
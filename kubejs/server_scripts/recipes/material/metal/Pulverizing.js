ServerEvents.recipes((event) => {
	let { thermal, immersiveengineering, mekanism } = event.getRecipes()

	CmiMetal.getAll().forEach((material) => {
		let metal = material.getId()
		const INGOT = `#forge:ingots/${metal}`
		const RAW_ORE = `#forge:raw_materials/${metal}`
		const RAW_BLOCK = `#forge:storage_blocks/raw_${metal}`
		const ORE = `#forge:ores/${metal}`
		const DUST = `#forge:dusts/${metal}`

		if (Ingredient.isNotNull(DUST)) {
			thermal.pulverizer(DUST, [
				INGOT
			]).energy(2000)

			immersiveengineering.crusher(highPriorityItem(DUST))
				.secondaries([])
				.input(INGOT)

			mekanism.crushing(DUST, INGOT)
			if (Ingredient.isNotNull(RAW_ORE)) {
				thermal.pulverizer(Item.of(Ingredient.getFirstItemId(DUST)).withChance(1.25), [
					RAW_ORE
				])

				immersiveengineering.crusher(highPriorityItem(DUST), RAW_ORE)
					.secondaries(Item.of(Ingredient.getFirstItemId(DUST)).withChance(1 / 3))

				// mekanism.enriching(`4x ${DUST}`, `3x ${RAW_ORE}`)
			} else {
				// console.warn(`No raw material found for ${metal}!`)
			}
			if (Ingredient.isNotNull(ORE)) {
				thermal.pulverizer(highPriorityItem(DUST, 2), [
					ORE
				])

				immersiveengineering.crusher(highPriorityItem(DUST, 2))
					.secondaries([])
					.input(ORE)

				// mekanism.enriching(`2x ${DUST}`, ORE)

			} else {
				// console.warn(`No ore found for ${metal}!`)
			}
			if (Ingredient.isNotNull(RAW_BLOCK)) {
				immersiveengineering.crusher(highPriorityItem(DUST, 12))
					.secondaries([])
					.input(RAW_BLOCK)

				// mekanism.enriching(`12x ${DUST}`, RAW_BLOCK)
			} else {
				// console.warn(`No storage block found for raw ${metal}!`)
			}

		} else {
			// console.warn(`No dust found for ${metal}!`)

		}

		event.remove([
			{
				type: "immersiveengineering:crusher",
				output: DUST
			}, {
				type: "thermal:pulverizer",
				output: DUST
			}, {
				type: "mekanism:crushing",
				output: DUST
			}
		])
	})
})
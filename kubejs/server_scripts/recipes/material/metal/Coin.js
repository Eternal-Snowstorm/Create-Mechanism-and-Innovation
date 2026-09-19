ServerEvents.recipes((event) => {
	let { thermal, immersiveengineering } = event.getRecipes()

	CmiMetal.getAll().forEach((material) => {
		let metal = material.getId()
		const INGOT = `#forge:ingots/${metal}`
		const NUGGET = `#forge:nuggets/${metal}`
		const COIN = `#forge:coins/${metal}`

		if (Ingredient.isNotNull(COIN)) {
			thermal.press(highPriorityItem(COIN, 3), [
				INGOT,
				"cmi:coin_mold"
			])

			thermal.press(highPriorityItem(COIN, 3), [
				INGOT,
				"cmi:coin_clay_mold"
			])

			immersiveengineering.metal_press(highPriorityItem(COIN, 3))
				.input(INGOT)
				.mold("cmi:coin_mold")

			if (Ingredient.isNotNull(NUGGET)) {
				thermal.press(highPriorityItem(COIN), [
					`3x ${NUGGET}`,
					"cmi:coin_mold"
				]).energy(800)

			} else {
				// console.warn(`No nuggets found for ${metal}!`)
			}
		} else {
			// console.warn(`No coin found for ${metal}!`)
		}

		event.remove([
			{
				type: "thermal:press",
				output: COIN
			}
		])
	})
})
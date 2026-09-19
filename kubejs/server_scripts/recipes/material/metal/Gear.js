ServerEvents.recipes((event) => {
	let { thermal, immersiveengineering } = event.getRecipes()

	CmiMetal.getAll().forEach((material) => {
		let metal = material.getId()
		const INGOT = `#forge:ingots/${metal}`
		const GEAR = `#forge:gears/${metal}`

		if (Ingredient.isNotNull(GEAR)) {
			thermal.press(highPriorityItem(GEAR), [
				`4x ${INGOT}`,
				"cmi:gear_mold"
			])

			thermal.press(highPriorityItem(GEAR), [
				`4x ${INGOT}`,
				"cmi:gear_clay_mold"
			])

			immersiveengineering.metal_press(GEAR)
				.input(`4x ${INGOT}`)
				.mold("cmi:gear_mold")
		} else {
			// console.warn(`No gear found for ${metal}!`)
		}

		event.remove([
			{
				type: "thermal:press",
				output: GEAR
			}, {
				type: "immersiveengineering:metal_press",
				output: GEAR
			}
		])
	})
})
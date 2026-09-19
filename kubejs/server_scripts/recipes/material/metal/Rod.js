ServerEvents.recipes((event) => {
	let { createaddition, thermal, immersiveengineering, createdieselgenerators } = event.getRecipes()

	CmiMetal.getAll().forEach((material) => {
		let metal = material.getId()
		const INGOT = `#forge:ingots/${metal}`
		const ROD = `#forge:rods/${metal}`

		if (Ingredient.isNotNull(ROD)) {
			createaddition.rolling(highPriorityItem(ROD, 2), [
				INGOT
			])

			createdieselgenerators.wire_cutting(highPriorityItem(ROD), [
				INGOT
			])

			thermal.press(highPriorityItem(ROD, 2), [
				INGOT,
				"cmi:rod_mold"
			])

			thermal.press(highPriorityItem(ROD, 2), [
				INGOT,
				"cmi:rod_clay_mold"
			])

			immersiveengineering.metal_press(highPriorityItem(ROD, 2))
				.input(INGOT)
				.mold("cmi:rod_mold")
		} else {
			// console.warn(`No rod found for ${metal}!`)
		}

		event.remove([
			{
				type: "createaddition:rolling",
				output: ROD
			}, {
				type: "createdieselgenerators:wire_cutting",
				output: ROD
			}, {
				type: "immersiveengineering:metal_press",
				output: ROD
			}, {
				type: "thermal:press",
				output: ROD
			}
		])
	})
})
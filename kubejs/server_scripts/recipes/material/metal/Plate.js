ServerEvents.recipes((event) => {
	let { createdieselgenerators, create, thermal, immersiveengineering } = event.getRecipes()

	CmiMetal.getAll().forEach((material) => {
		let metal = material.getId()
		const INGOT = `#forge:ingots/${metal}`
		const PLATE = `#forge:plates/${metal}`

		if (Ingredient.isNotNull(PLATE)) {
			event.remove([
				{
					type: "create:pressing",
					output: PLATE
				}, {
					type: "thermal:press",
					output: PLATE
				}, {
					type: "immersiveengineering:metal_press",
					output: PLATE
				}
			])
			const OUTPUT = getHighPriorityItem(PLATE)

			if (OUTPUT != null) {
				create.pressing(OUTPUT, [
					INGOT
				])
				createdieselgenerators.hammering(OUTPUT, [
					INGOT
				])
				thermal.press(OUTPUT, [
					INGOT,
					"cmi:plate_mold"
				])
				thermal.press(OUTPUT, [
					INGOT,
					"cmi:plate_clay_mold"
				])
				immersiveengineering.metal_press(PLATE)
					.input(INGOT)
					.mold("cmi:plate_mold")
			} else {
				// console.warn(`No plate found for ${metal}!`)
			}
		}
	})
})
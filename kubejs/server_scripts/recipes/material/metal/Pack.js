ServerEvents.recipes((event) => {
	let { thermal } = event.getRecipes()

	CmiMetal.getAll().forEach((material) => {
		let metal = material.getId()
		const INGOT = `#forge:ingots/${metal}`
		const BLOCK = `#forge:storage_blocks/${metal}`
		const NUGGET = `#forge:nuggets/${metal}`
		const RAW = `#forge:raw_materials/${metal}`
		const RAW_BLOCK = `#forge:storage_blocks/raw_${metal}`

		if (Ingredient.isNotNull(BLOCK)) {

			thermal.press(highPriorityItem(BLOCK), [
				`9x ${INGOT}`,
				"cmi:3x3_packing_clay_mold"
			])

			thermal.press(highPriorityItem(INGOT, 9), [
				BLOCK,
				"cmi:unpack_clay_mold"
			])

		} else {
			// console.warn(`No storage block found for ${metal}!`)
		}

		if (Ingredient.isNotNull(NUGGET)) {

			thermal.press(highPriorityItem(INGOT), [
				`9x ${NUGGET}`,
				"cmi:3x3_packing_clay_mold"
			])

			thermal.press(highPriorityItem(NUGGET, 9), [
				INGOT,
				"cmi:unpack_clay_mold"
			])

		} else {
			// console.warn(`No nugget found for ${metal}!`)
		}

		if (Ingredient.isNotNull(RAW) && Ingredient.isNotNull(RAW_BLOCK)) {
			
			thermal.press(highPriorityItem(RAW_BLOCK), [
				`9x ${RAW}`,
				"cmi:3x3_packing_clay_mold"
			])
			
			thermal.press(highPriorityItem(RAW, 9), [
				RAW_BLOCK,
				"cmi:unpack_clay_mold"
			])
		} else {
			// console.warn(`No raw material or raw material block found for ${metal}!`)
		}

	})
})
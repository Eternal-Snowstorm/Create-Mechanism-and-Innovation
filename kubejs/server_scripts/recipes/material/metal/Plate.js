ServerEvents.recipes((event) => {
	let { createdieselgenerators, create, thermal, immersiveengineering, mekanism, cmi } = event.getRecipes()

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

	// 复合碳纤维板
	mekanism.compressing(
		"cmi:composite_carbon_fiber_plate",
		"cmi:incomplete_composite_carbon_fiber_plate",
		"2x mekanism:osmium"
	)

	// 复合钨钢板
	mekanism.combining(
		"cmi:composite_tungsten_steel_plate",
		"cmi:incomplete_tungsten_steel_plate",
		"#forge:plates/tungsten_steel"
	)

	// 复合磁导板
	cmi.electronic_blast_furnace()
		.inputItems("cmi:superconducting_mercury_plate")
		.inputFluids([
			Fluid.of("cmi:composite_magnetic_fluid", 100)
		])
		.outputItems("cmi:composite_magnetic_conduction_plate")
		.inputFE(114514)
		.duration(20 * 3)
})
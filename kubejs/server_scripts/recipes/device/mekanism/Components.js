// Mekanism · 通用组件（四色气体组件与钢制机壳）
ServerEvents.recipes((event) => {
	let { thermal_extra, neoecoae } = event.getRecipes()

	// 设备组件
	addRecipe(neoecoae)
		.itemOutput("cmi:basalz_general_component")
		.inputFluid(Fluid.of("thermalconstruct:basalz_blood", 1000))
		.inputItems([
			"#forge:gears/chromeplated_steel",
			"#forge:plates/stainless_steel",
			"#forge:plates/osmium",
			"cmi:basalz_unit"
		])
		.energy(2000)

	addRecipe(neoecoae)
		.itemOutput("cmi:blaze_general_component")
		.inputFluid(Fluid.of("tconstruct:blazing_blood", 1000))
		.inputItems([
			"#forge:gears/chromeplated_steel",
			"#forge:plates/stainless_steel",
			"#forge:plates/osmium",
			"cmi:blaze_unit"
		])
		.energy(2000)

	addRecipe(neoecoae)
		.itemOutput("cmi:blitz_general_component")
		.inputFluid(Fluid.of("thermalconstruct:blitz_blood", 1000))
		.inputItems([
			"#forge:gears/chromeplated_steel",
			"#forge:plates/stainless_steel",
			"#forge:plates/osmium",
			"cmi:blitz_unit"
		])
		.energy(2000)

	addRecipe(neoecoae)
		.itemOutput("cmi:blizz_general_component")
		.inputFluid(Fluid.of("thermalconstruct:blizz_blood", 1000))
		.inputItems([
			"#forge:gears/chromeplated_steel",
			"#forge:plates/stainless_steel",
			"#forge:plates/osmium",
			"cmi:blizz_unit"
		])
		.energy(2000)

	addRecipe(neoecoae)
		.itemOutput("2x mekanism:steel_casing")
		.inputItems([
			"2x #forge:plates/stainless_steel",
			"cmi:osmium_tile",
			"#forge:gears/chromeplated_steel"
		])
		.energy(2000)
})

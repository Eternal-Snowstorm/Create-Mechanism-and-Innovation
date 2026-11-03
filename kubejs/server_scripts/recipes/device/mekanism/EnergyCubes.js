// Mekanism · 能量单元（基础/高级/精英/终极）
ServerEvents.recipes((event) => {
	let { thermal_extra, neoecoae } = event.getRecipes()


	// 能量单元
	addRecipe(neoecoae)
		.itemOutput("mekanism:basic_energy_cube")
		.inputItems([
			"2x mekanism:energy_tablet",
			"4x #forge:plates/industrial_iron",
			Casing.STAINLESS_STEEL,
			"2x #mekanism:alloys/enriched"
		])
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.energy(2000)
		.id("mekanism:energy_cube/basic")


	addRecipe(neoecoae)
		.itemOutput("mekanism:advanced_energy_cube")
		.inputItems([
			"2x mekanism:energy_tablet",
			"4x #forge:plates/industrial_iron",
			"mekanism:basic_energy_cube",
			"2x #mekanism:alloys/infused"
		])
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.energy(2000)
		.id("mekanism:energy_cube/advanced")


	addRecipe(neoecoae)
		.itemOutput("mekanism:elite_energy_cube")
		.inputItems([
			"2x mekanism:energy_tablet",
			"4x #forge:plates/industrial_iron",
			"mekanism:advanced_energy_cube",
			"2x #mekanism:alloys/reinforced"
		])
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.energy(2000)
		.id("mekanism:energy_cube/elite")


	addRecipe(neoecoae)
		.itemOutput("mekanism:ultimate_energy_cube")
		.inputItems([
			"2x mekanism:energy_tablet",
			"4x #forge:plates/industrial_iron",
			"mekanism:elite_energy_cube",
			"2x #mekanism:alloys/atomic"
		])
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.energy(2000)
		.id("mekanism:energy_cube/ultimate")
})

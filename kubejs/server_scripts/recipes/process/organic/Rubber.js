ServerEvents.recipes((event) => {
	let { farmersdelight, create, tconstruct, vintageimprovements } = event.getRecipes()

	// 橡胶粉
	vintageimprovements.vibrating(Item.of("cmi:rubber_dust").withChance(0.15), [
		"thermal:rubberwood_leaves"
	])
	vintageimprovements.vibrating(Item.of("cmi:rubber_dust").withChance(0.05), [
		"cmi:rubber_tree_bark"
	])

	// 橡胶
	create.compacting("thermal:rubber", [
		Fluid.of("thermal:latex", 200)
	])

	//橡胶板
	create.pressing("cmi:rubber_plate", [
		"thermal:rubber"
	])
	farmersdelight.cutting("2x cmi:rubber_plate", [
		"thermal:rubber"
	], "#forge:tools/knives")

	// 熔融硫化橡胶
	create.mixing(Fluid.of("cmi:cured_rubber", 200), [
		"#forge:plates/rubber",
		"#forge:dusts/sulfur",
		Fluid.of("cmi:vinegar", 200)
	]).heatRequirement(CmiHeatLevel.GRILLED)

	create.mixing(Fluid.of("cmi:cured_rubber", 200), [
		"#forge:dusts/rubber",
		"#forge:dusts/sulfur",
		Fluid.of("cmi:vinegar", 200)
	]).heatRequirement(CmiHeatLevel.GRILLED)

	// 硫化橡胶
	tconstruct.casting_table("thermal:cured_rubber")
		.fluid(Fluid.of("cmi:cured_rubber", 200))
		.cooling_time(20)

	tconstruct.casting_basin("thermal:cured_rubber_block")
		.fluid(Fluid.of("cmi:cured_rubber", 800))
		.cooling_time(80)

	vintageimprovements.pressurizing(Fluid.of("cmi:cured_rubber", 1000), [
		"#forge:dusts/sulfur",
		CreateFluidIngredient.ofTagId("forge:steam", 200),
		Fluid.of("thermal:latex", 500)
	]).secondaryFluidInput(0).heatRequirement(CmiHeatLevel.GRILLED)
})
ServerEvents.recipes((event) => {
	let { farmersdelight, create, createdieselgenerators, tconstruct, vintageimprovements } = event.getRecipes()

	// 醋
	createdieselgenerators.basin_fermenting(Fluid.of("cmi:vinegar", 200), [
		"#forge:seeds/rice",
		Fluid.of("minecraft:water", 200)
	])

	// 醋酸
	createdieselgenerators.distillation([
		Fluid.of("cmi:vinegar_acid", 100),
		Fluid.of("minecraft:water", 100),
	], [
		Fluid.of("cmi:vinegar", 200)
	]).heatRequirement(CmiHeatLevel.HEATED)

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
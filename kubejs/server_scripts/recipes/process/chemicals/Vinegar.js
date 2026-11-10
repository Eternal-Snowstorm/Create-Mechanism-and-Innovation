ServerEvents.recipes((event) => {
	let { createdieselgenerators, immersiveengineering } = event.getRecipes()

	// 醋
	createdieselgenerators.basin_fermenting(Fluid.of("cmi:vinegar", 200), [
		"#forge:seeds/rice",
		Fluid.of("minecraft:water", 200)
	])

	// 醋(发酵罐)
	immersiveengineering.fermenter(
		"#forge:seeds/rice",
		Fluid.of("cmi:vinegar", 500),
		Item.of("createaddition:biomass").withChance(0.1)
	).energy(1200)

	// 醋酸
	createdieselgenerators.distillation([
		Fluid.of("cmi:vinegar_acid", 100),
		Fluid.of("minecraft:water", 100),
	], [
		Fluid.of("cmi:vinegar", 200)
	]).heatRequirement(CmiHeatLevel.HEATED)
})
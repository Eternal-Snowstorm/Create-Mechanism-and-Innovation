ServerEvents.recipes((event) => {
	let { vintageimprovements } = event.getRecipes()

	// 细雪
	vintageimprovements.vacuumizing(Fluid.of("tconstruct:powdered_snow", 1000), [
		"minecraft:snow_block"
	]).id("vintageimprovements:vacuumizing/powder_snow")
})
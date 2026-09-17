ServerEvents.recipes((event) => {
	let { create, vintageimprovements } = event.getRecipes()

	// 不稳红石
	vintageimprovements.pressurizing(Fluid.of("thermal:redstone", 125), [
		"#forge:dusts/redstone"
	]).heatRequirement(CmiHeatLevel.HEATED)

	// 硫酸
	vintageimprovements.pressurizing(Fluid.of("mekanism:sulfuric_acid", 1000), [
		Fluid.of("minecraft:water", 1000),
		Fluid.of("mekanism:sulfur_trioxide", 1000)
	]).processingTime(500).id("vintageimprovements:pressurizing/sulfuric_acid")

	vintageimprovements.pressurizing(Fluid.of("tconstruct:molten_iron", 90), [
		["#forge:dusts/iron", "#create:crushed_raw_materials/iron"]
	]).heated().processingTime(80)

	// 高温蒸汽
	vintageimprovements.pressurizing(Fluid.of("create_steam_ages:high_temperature_steam", 1000), [
		{ fluidTag: "forge:steam", amount: 1000 },
		{ fluidTag: "forge:steam", amount: 1000 }
	]).secondaryFluidInput(1).heatRequirement(CmiHeatLevel.GRILLED)

	// 细雪
	vintageimprovements.vacuumizing(Fluid.of("tconstruct:powdered_snow", 1000), [
		"minecraft:snow_block"
	]).id("vintageimprovements:vacuumizing/powder_snow")
})
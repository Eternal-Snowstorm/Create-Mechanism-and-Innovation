ServerEvents.recipes((event) => {
	let { kubejs, create, tconstruct } = event.getRecipes()

	create.deploying("immersive_aircraft:industrial_gears", [
		"#forge:gears/iron",
		"#forge:gears/copper"
	]).id("immersive_aircraft:industrial_gears")

	create.deploying("immersive_aircraft:sturdy_pipes", [
		"create:fluid_pipe",
		"#forge:plates/industrial_iron"
	]).id("immersive_aircraft:sturdy_pipes")

	create.deploying("immersive_aircraft:improved_landing_gear", [
		"ad_astra:wheel",
		"create:metal_girder"
	]).id("immersive_aircraft:improved_landing_gear")

	create.deploying("immersive_aircraft:enhanced_propeller", [
		"immersive_aircraft:propeller",
		"immersiveengineering:windmill_sail"
	]).id("immersive_aircraft:enhanced_propeller")

	tconstruct.casting_table("immersive_aircraft:hull_reinforcement")
		.fluid(Fluid.of("cmi:molten_andesite_alloy", 90))
		.cast("immersive_aircraft:hull")
		.cooling_time(20 * 3)
		.cast_consumed(true)
		.id("immersive_aircraft:hull_reinforcement")

	tconstruct.casting_table("immersive_aircraft:steel_boiler")
		.fluid(Fluid.of("tconstruct:molten_steel", 270))
		.cast("immersive_aircraft:boiler")
		.cooling_time(20 * 3)
		.cast_consumed(true)
		.id("immersive_aircraft:steel_boiler")
})
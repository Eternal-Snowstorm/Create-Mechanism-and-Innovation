ServerEvents.recipes((event) => {
	let { kubejs, tconstruct } = event.getRecipes()

	// 螺旋桨
	kubejs.shaped("immersive_aircraft:propeller", [
		"AA ",
		" B ",
		" AA"
	], {
		A: "#forge:plates/andesite_alloy",
		B: "#create:shaft"
	}).id("immersive_aircraft:propeller")

	// 锅炉
	kubejs.shaped("immersive_aircraft:boiler", [
		"AAA",
		"A A",
		"ABA"
	], {
		A: "#forge:plates/copper",
		B: Mechanisms.STONE.COM
	}).id("immersive_aircraft:boiler")

	// 发动机
	kubejs.shaped("immersive_aircraft:engine", [
		"ABA",
		"BCB",
		"DED"
	], {
		A: "createdieselgenerators:engine_piston",
		B: "#forge:plates/industrial_iron",
		C: Mechanisms.ANDESITE.COM,
		D: "#forge:plates/andesite_alloy",
		E: "immersive_aircraft:boiler"
	}).id("immersive_aircraft:engine")

	// 机身
	tconstruct.casting_table("immersive_aircraft:hull")
		.fluid(Fluid.of("cmi:molten_andesite_alloy", 90))
		.cast("tconstruct:pattern")
		.cooling_time(20 * 3)
		.cast_consumed(true)
		.id("immersive_aircraft:hull")
})
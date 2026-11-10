ServerEvents.recipes((event) => {
	let { createdieselgenerators, tconstruct } = event.getRecipes()

	// 雷电合金杆
	createdieselgenerators.compression_molding("thermal:blitz_rod", [
		"thermal:blitz_powder",
		"thermal:blitz_powder",
		"thermal:blitz_powder",
		"thermal:blitz_powder"
	], "createdieselgenerators:lines").heated()

	// 霜冻合金杆
	createdieselgenerators.compression_molding("thermal:blizz_rod", [
		"thermal:blizz_powder",
		"thermal:blizz_powder",
		"thermal:blizz_powder",
		"thermal:blizz_powder"
	], "createdieselgenerators:lines").heated()

	// 岩石合金杆
	createdieselgenerators.compression_molding("thermal:basalz_rod", [
		"thermal:basalz_powder",
		"thermal:basalz_powder",
		"thermal:basalz_powder",
		"thermal:basalz_powder",
	], "createdieselgenerators:lines").heated()

	// 玻璃杆
	tconstruct.casting_table("cmi:glass_rod")
		.fluid(Fluid.of("tconstruct:molten_glass", 100))
		.cast("#tconstruct:casts/multi_use/rod")
		.cooling_time(20 * 2)
		.cast_consumed(false)
})
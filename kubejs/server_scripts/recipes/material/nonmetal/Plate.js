ServerEvents.recipes((event) => {
	let { createdieselgenerators, tconstruct, thermal, cmi } = event.getRecipes()

	// 石板
	createdieselgenerators.hammering("cmi:stone_plate", [
		"minecraft:flint"
	])

	tconstruct.casting_table("cmi:stone_plate")
		.cast("#tconstruct:casts/multi_use/plate")
		.fluid(Fluid.of("minecraft:lava", 100))
		.cooling_time(20 * 2)

	tconstruct.casting_table("cmi:stone_plate")
		.cast("#tconstruct:casts/single_use/plate")
		.fluid(Fluid.of("minecraft:lava", 100))
		.cooling_time(20 * 2)
		.cast_consumed(true)

	// 坚固板
	tconstruct.casting_table("create:sturdy_sheet")
		.fluid(Fluid.of("tconstruct:molten_obsidian", 250))
		.cast("#tconstruct:casts/multi_use/plate")
		.cooling_time(100)
		.cast_consumed(false)
		.id("create:sequenced_assembly/sturdy_sheet")

	tconstruct.casting_table("create:sturdy_sheet")
		.fluid(Fluid.of("tconstruct:molten_obsidian", 250))
		.cast("#tconstruct:casts/single_use/plate")
		.cooling_time(100)
		.cast_consumed(true)

	thermal.chiller("create:sturdy_sheet", [
		Fluid.of("tconstruct:molten_obsidian", 250),
		"#tconstruct:casts/multi_use/plate"
	]).energy(4800)

	// 聚烯烃板
	thermal.chiller("thermal_extra:polyolefin_plate", [
		Fluid.of("thermal_extra:polyolefin", 1000),
		"#tconstruct:casts/multi_use/plate"
	]).energy(8000).keepIngredient([
		"thermal_extra:chiller_plate_cast",
		"tconstruct:plate_cast"
	]).id("thermal_extra:machine/chiller/polyolefin")

	// 聚合物板
	cmi.electronic_blast_furnace()
		.inputItems("mekanism:hdpe_sheet")
		.inputFluids([
			Fluid.of("cmi:radon", 100),
			Fluid.of("cmi:radiation_resistant_creosote", 100)
		])
		.outputItems("alexscaves:polymer_plate")
		.inputFE(10000)
		.duration(20 * 3)
})

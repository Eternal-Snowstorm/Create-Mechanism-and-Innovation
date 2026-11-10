ServerEvents.recipes((event) => {
	let { create, thermal_extra, cmi } = event.getRecipes()

	// Delta溶液
	cmi.chemical_reactor()
		.outputFluids(Fluid.of("cmi:delta_unstable_solution", 100))
		.inputFluids([
			Fluid.of("immersiveengineering:redstone_acid", 200),
			Fluid.of("cmi:bromine", 100)
		])
		.inputItems("2x #cmi:delta_blackstone_source")
		.inputFE(4000)

	// 铂溶液
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/silver").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "cmi:delta_unstable_solution", 100).toJson(),
		"result": Fluid.of("cmi:platinum_solution", 100).toJson()
	})

	// 脱水
	thermal_extra.endothermic_dehydrator("cmi:dirty_platinum_dust", [
		Fluid.of("cmi:platinum_solution", 100)
	])

	// 电镀液
	create.mixing(Fluid.of("cmi:plating_solution", 1000), [
		"#forge:dusts/chromium",
		Fluid.of("mekanism:sulfuric_acid", 500)
	])
})
ServerEvents.recipes((event) => {
	let { mekanism, cmi } = event.recipes

	// 霜原木碎块
	mekanism.crushing(
		"2x cmi:glacian_chunk",
		"ad_astra:glacian_log"
	)

	// 雪球
	mekanism.injecting(
		"2x minecraft:snowball",
		"#cmi:glacian_plant",
		"mekanism:steam"
	)

	mekanism.injecting(
		"2x minecraft:snowball",
		"#cmi:glacian_plant",
		"mekanism:water_vapor"
	)

	// 培养基
	cmi.chemical_reactor()
		.inputItems("10x cmi:glacian_chunk")
		.inputFluids(Fluid.of("minecraft:water", 10000))
		.outputItems([
			"10x createdieselgenerators:wood_chip",
			"cmi:culture_medium"
		])
		.inputFE(1000000)
		.duration(20 * 5)

	// 霜原芽
	mekanism.sawing(
		"cmi:glacian_sapling",
		"2x createdieselgenerators:wood_chip",
		Item.of("cmi:glacian_sprout").withChance(0.5)
	)

	// 复制酶溶液
	cmi.chemical_reactor()
		.inputItems([
			"cmi:glacian_sprout",
			"cmi:culture_medium"
		])
		.outputFluids(Fluid.of("cmi:copy_enzyme_solution", 50))
		.inputFE(1000000)
		.duration(20 * 5)

	// 复制
	cmi.chemical_reactor()
		.inputFluids(Fluid.of("cmi:copy_enzyme_solution", 100))
		.inputItems("mekanism:pellet_antimatter")
		.outputItems("2x mekanism:pellet_antimatter")
		.inputFE(10000000)
		.duration(20 * 10)
})
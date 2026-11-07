ServerEvents.recipes((event) => {
	let { cmi, thermal } = event.getRecipes()

	// 轻硅醚
	cmi.chemical_reactor()
		.inputItems([
			"#forge:silicon"
		])
		.inputFluids(Fluid.of("cmi:light_olefin", 100))
		.outputFluids(Fluid.of("cmi:light_silicone_ether", 200))
		.inputFE(1600)
		.duration(10)

	// 聚硅醚
	cmi.chemical_reactor()
		.inputFluids(Fluid.of("cmi:light_silicone_ether", 2000))
		.outputFluids(Fluid.of("cmi:polysilicone_ether", 2000))
		.inputFE(32 * (20 * 10))
		.duration(20 * 10)

	// 液态硅橡胶
	cmi.chemical_reactor()
		.inputFluids([
			Fluid.of("cmi:polysilicone_ether", 2000),
			Fluid.of("cmi:vinegar_acid", 100)
		])
		.outputFluids(Fluid.of("cmi:silicon_rubber", 4000))
		.inputFE(32 * (20 * 10))
		.duration(20 * 10)

	// 硅橡胶
	thermal.chiller("cmi:silicon_rubber", [
		Fluid.of("cmi:silicon_rubber", 200)
	])
	thermal.chiller("cmi:silicon_rubber_plate", [
		Fluid.of("cmi:silicon_rubber", 200),
		"#tconstruct:casts/multi_use/plate"
	])
})

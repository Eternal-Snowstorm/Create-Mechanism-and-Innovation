ServerEvents.recipes((event) => {
	let { cmi, mekanism, thermal, tconstruct, thermal_extra } = event.getRecipes()

	// 电离红色沙尘
	cmi.electrolyzer()
		.inputItems("ad_astra:mars_sand")
		.outputItems("cmi:ionized_red_dust")
		.duration(20)

	// 方铅岩粉
	mekanism.crushing(
		"cmi:galena_dust",
		"alexscaves:galena"
	)

	// 磁性源质
	thermal.pyrolyzer("cmi:magnetic_source", [
		"#forge:dusts/galena"
	])

	// 磁氧体合金
	cmi.electrolyzer()
		.inputItems("cmi:magnetic_source")
		.outputItems("cmi:magnetic_alloy")

	// 磁性沉淀
	cmi.chemical_reactor()
		.inputItems([
			"cmi:magnetic_source",
			"cmi:ionized_red_dust"
		])
		.outputItems("cmi:magnetic_sediment")
		.outputFluids([
			Fluid.of("cmi:germanium_solution", 100)
		])
		.duration(20 * 2)

	// 锗混合物
	cmi.chemical_reactor()
		.inputItems("2x #mekanism:dirty_dusts/zinc")
		.inputFluids([
			Fluid.of("cmi:germanium_solution", 500)
		])
		.outputItems("4x cmi:germanium_mixture")

	// 富集锗铁混合物
	mekanism.enriching(
		"cmi:enriched_germanium_iron_mixture",
		"cmi:germanium_mixture"
	)

	// 耐火材料粉末
	cmi.electrolyzer()
		.inputItems("cmi:magnetic_sediment")
		.inputFluids([
			Fluid.of("cmi:molten_azure_neodymium", 100),
			Fluid.of("cmi:molten_scarlet_neodymium", 100)
		])
		.outputItems("cmi:refractory_material_powder")
		.outputFluids([
			Fluid.of("cmi:molten_neodymium_mixture", 200)
		])
		.duration(20 * 2)

	// 溴系阻燃剂
	cmi.chemical_reactor()
		.inputItems("2x cmi:refractory_material_powder")
		.inputFluids([
			Fluid.of("cmi:bromine", 200)
		])
		.outputItems("cmi:brominated_flame_retardants")
		.duration(20 * 2)

	// 阻燃塑料
	thermal_extra.component_assembly("2x cmi:flame_retardant_plastic", [
		"alexscaves:polymer_plate",
		"cmi:brominated_flame_retardants"
	]).energy(12000)

	// 富铁粘液
	cmi.electrolyzer()
		.inputItems("2x cmi:enriched_germanium_iron_mixture")
		.inputFluids([
			Fluid.of("cmi:molten_neodymium_mixture", 200)
		])
		.outputItems("cmi:dragonite")
		.outputFluids([
			Fluid.of("cmi:ferrouslime", 125)
		])
		.duration(20 * 2)

	// 富铁粘液球
	tconstruct.casting_table("alexscaves:ferrouslime_ball")
		.fluid(Fluid.of("cmi:ferrouslime", 250))
		.cooling_time(20 * 2)

	tconstruct.melting(Fluid.of("cmi:ferrouslime", 250))
		.ingredient("#forge:slimeball/ferrous")
		.time(20 * 2)
		.temperature(114)

	// 复合磁流体
	cmi.chemical_reactor()
		.inputItems("2x #forge:dusts/etrium")
		.inputFluids([
			Fluid.of("cmi:ferrouslime", 50)
		])
		.outputFluids([
			Fluid.of("cmi:composite_magnetic_fluid", 100)
		])
		.duration(20 * 2)

	// 辉龙石粉
	mekanism.crushing(
		"cmi:dragonite_dust",
		"cmi:dragonite"
	)

	// 锗晶体
	mekanism.reaction(
		"4x cmi:dragonite_dust",
		MekType.Gas.of("mekanism:sulfuric_acid", 200),
		Fluid.of("cmi:germanium_solution", 100),
		"cmi:germanium_crystal"
	).duration(60).energyRequired(12000)

	// 压电陶瓷
	mekanism.metallurgic_infusing(
		"cmi:piezoelectric_ceramic",
		"cmi:magnetic_alloy",
		"cmi:titanium_oxide"
	)
})
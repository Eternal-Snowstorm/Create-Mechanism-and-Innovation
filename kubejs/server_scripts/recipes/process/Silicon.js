ServerEvents.recipes((event) => {
	let { create, vintageimprovements, thermal, cmi, immersiveengineering } = event.getRecipes()

	// 石英粉
	create.crushing("thermal:quartz_dust", [
		"#forge:gems/quartz"
	])
	create.milling("thermal:quartz_dust", [
		"#forge:gems/quartz"
	])

	// 纯净沙
	create.emptying([
		Fluid.of("cmi:pure_sand", 100),
		"thermal:niter_dust"
	], [
		"#minecraft:sand"
	])

	// 纯净石英粉
	vintageimprovements.pressurizing([
		"cmi:pure_quartz_dust",
		"thermal:slag"
	], [
		"#forge:dusts/quartz",
		"cmi:lime_dust"
	]).heated()

	vintageimprovements.pressurizing([
		"cmi:pure_quartz_dust",
		"thermal:slag"
	], [
		Fluid.of("cmi:pure_sand", 100),
		"cmi:lime_dust"
	]).heated()

	// 玻璃
	create.mixing(Fluid.of("tconstruct:molten_glass", 250), [
		Fluid.of("cmi:pure_sand", 200),
		"#forge:dusts/lime"
	]).heated()

	create.mixing(Fluid.of("tconstruct:molten_glass", 250), [
		Fluid.of("cmi:pure_sand", 200),
		"cmi:plant_ash"
	]).heated()

	create.mixing(Fluid.of("tconstruct:molten_glass", 250), [
		Fluid.of("tconstruct:molten_quartz", 200),
		"#forge:dusts/lime"
	]).heatRequirement(CmiHeatLevel.GRILLED)

	create.mixing(Fluid.of("tconstruct:molten_glass", 250), [
		Fluid.of("tconstruct:molten_quartz", 200),
		"cmi:plant_ash"
	]).heatRequirement(CmiHeatLevel.GRILLED)

	// 硅混合物
	create.mixing([
		"cmi:silicon_mixture",
		Item.of("cmi:silicon_mixture", 2).withChance(0.1),
		Item.of("create:scorchia").withChance(0.5)
	], [
		"#forge:dusts/coal_coke",
		"#forge:dusts/pure_quartz",
		Fluid.of("tconstruct:seared_stone", 250)
	]).superheated()

	create.mixing([
		"cmi:silicon_mixture",
		Item.of("cmi:silicon_mixture", 2).withChance(0.1),
		Item.of("create:scoria").withChance(0.5)
	], [
		"#forge:dusts/coal_coke",
		"#forge:dusts/pure_quartz",
		Fluid.of("tconstruct:scorched_stone", 250)
	]).superheated()

	// 硅
	immersiveengineering.blast_furnace("ae2:silicon")
		.input("cmi:silicon_mixture")
		.slag("thermal:slag")
		.time(20 * 30)

	// 硅板
	vintageimprovements.curving("ae2:printed_silicon", [
		"#forge:silicon"
	]).itemAsHead("cmi:plate_mold")

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
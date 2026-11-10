// UNCERTAIN_PLAN
ServerEvents.recipes((event) => {
	let { kubejs, tconstruct, cmi, create, neoecoae } = event.getRecipes()

	// CMI 图标
	kubejs.shaped("cmi:cmi_icon", [
		"A  ",
		" B ",
		"  C"
	], {
		A: "cmi:innovation_crystal_wafer",
		B: "cmi:dreamcore_wire",
		C: "cmi:mechanium_ingot"
	})

	// 幻晶线
	tconstruct.casting_table(Material.Dreamcores.WIRE.withCount(2))
		.cast("#tconstruct:casts/multi_use/wire")
		.fluid(Material.Dreamcores.SOLIDIFIED)
		.cooling_time(20 * 10)
		.cast_consumed(false)

	// 械钢
	cmi.electronic_blast_furnace()
		.inputItems("cmi:mechanium_ore")
		.outputFluids([
			Fluid.of("cmi:molten_mechanium", 120)
		])
		.inputFE(676767)
		.duration(20 * 10)

	// 创造溶液
	create.emptying([
		Fluid.of("cmi:creative_solution", 10),
		"cmi:dreamcore_seed"
	], [
		"cmi:cmi_icon"
	])

	// 幻晶线圈
	neoecoae.integrated_working_station()
		.itemOutput("2x cmi:dreamcore_coil")
		.inputItems([
			Mechanisms.ANTI.COM,
			Material.Dreamcores.WIRE.withCount(16),
			"8x cmi:mechanium_ingot"
		])
		.energy(100000)

	// DTMA 能量核心
	neoecoae.integrated_working_station()
		.itemOutput("cmi:dtma_dreamcore_energy_core")
		.inputItems([
			Mechanisms.ANTI.COM,
			"fluxnetworks:gargantuan_flux_storage",
			"4x cmi:dreamcore_coil",
			"16x cmi:innovation_crystal_wafer",
			Material.Dreamcores.WIRE.withCount(16),
			"16x cmi:mechanium_ingot",
			"cmi:cmi_icon"
		])
		.energy(1000000)

	// 械钢机壳
	neoecoae.integrated_working_station()
		.itemOutput("4x cmi:mechanium_casing")
		.inputItems([
			Casing.IRON,
			Casing.STEEL,
			Casing.STAINLESS_STEEL,
			Casing.ALUMINUM_ALLOY,
			Casing.BLACK_TUNGSTEN,
			"4x cmi:mechanium_ingot"
		])
		.energy(100000)

	neoecoae.large_integrated_working_station()
		.itemOutput("16x cmi:mechanium_casing")
		.inputItems([
			Casing.ANDESITE,
			Casing.COPPER,
			Casing.IRON,
			Casing.BRASS,
			Casing.THERMAL,
			Casing.SMART,
			Casing.COMPUTE,
			Casing.STEEL,
			Casing.STAINLESS_STEEL,
			Casing.ALUMINUM_ALLOY,
			Casing.BLACK_TUNGSTEN,
			"16x cmi:mechanium_ingot"
		])
		.energy(100000)

	// 械钢锭
	tconstruct.casting_table("cmi:mechanium_ingot")
		.fluid(Fluid.of("cmi:molten_mechanium", 90))
		.cast("#tconstruct:casts/multi_use/ingot")
		.cooling_time(20 * 10)
		.cast_consumed(false)
})
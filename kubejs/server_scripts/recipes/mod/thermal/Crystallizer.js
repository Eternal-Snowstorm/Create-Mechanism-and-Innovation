ServerEvents.recipes((event) => {
	let { thermal } = event.getRecipes()

	// 钴电解质
	thermal.crystallizer("cmi:cobalt_electrolyte", [
		"#forge:dusts/cobalt",
		Fluid.of("immersiveengineering:redstone_acid", 100)
	])

	// 富集锇结晶
	thermal.crystallizer("cmi:enriched_osmium_crystal", [
		"cmi:pure_semi_molten_osmium",
		Fluid.of("minecraft:water", 1000)
	])

	// 石墨烯
	thermal.crystallizer("cmi:graphene", [
		"cmi:carbon_deposition_catalytic_plate",
		Fluid.of("cmi:hdpe", 100)
	])

	// 未成形碳纳米管
	thermal.crystallizer("cmi:incomplete_carbon_nanotube", [
		"cmi:graphene",
		Fluid.of("cmi:polymeric_carbon_solution", 50)
	])

	// 纯净石英
	thermal.crystallizer("cmi:pure_quartz_prism", [
		"#forge:dusts/pure_quartz",
		Fluid.of("cmi:crystal_catalyt", 200)
	]).energy(4000)

	// 幻晶原石
	thermal.crystallizer("2x cmi:dreamcore_ore", [
		"cmi:dreamcore_seed",
		Fluid.of("cmi:crystal_catalyt", 200)
	]).energy(4000)

	// RGB宝石
	thermal.crystallizer("thermal:sapphire", [
		"#forge:dusts/sapphire",
		Fluid.of("cmi:crystal_catalyt", 200)
	])

	thermal.crystallizer("thermal:ruby", [
		"#forge:dusts/ruby",
		Fluid.of("cmi:crystal_catalyt", 200)
	])

	thermal.crystallizer("minecraft:emerald", [
		"#forge:dusts/emerald",
		Fluid.of("cmi:crystal_catalyt", 200)
	]).id("thermal:machines/crystallizer/crystallizer_emerald")
})
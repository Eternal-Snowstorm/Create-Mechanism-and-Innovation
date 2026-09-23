ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 富集合金
	mekanism.metallurgic_infusing(
		"cmi:enriched_alloy",
		"#forge:ingots/aluminum",
		"cmi:cobalt_electrolyte"
	)

	// 灌注合金
	mekanism.metallurgic_infusing(
		"mekanism:alloy_infused",
		"#forge:ingots/chromium",
		MekType.InfuseType.of("mekanism:redstone", 20)
	).id("mekanism:metallurgic_infusing/alloy/infused")

	// 强化合金
	mekanism.metallurgic_infusing(
		"mekanism:alloy_reinforced",
		"#forge:ingots/titanium",
		MekType.InfuseType.of("cmi:etrium", 20)
	).id("mekanism:metallurgic_infusing/alloy/reinforced")

	// 原子合金
	mekanism.metallurgic_infusing(
		"mekanism:alloy_atomic",
		"#forge:ingots/superconducting_mercury",
		MekType.InfuseType.of("cmi:infuse_quantum", 20)
	).id("mekanism:metallurgic_infusing/alloy/atomic")

	// 碳纳米管
	mekanism.metallurgic_infusing(
		"cmi:carbon_nanotube",
		"cmi:incomplete_carbon_nanotube",
		"cmi:infuse_osmium"
	)

	// 恩特罗水晶
	mekanism.metallurgic_infusing(
		"cmi:entro_crystal",
		"ae2:charged_certus_quartz_crystal",
		"cmi:etrium"
	)

	// 碳化硅
	mekanism.metallurgic_infusing(
		"cmi:silicon_carbide",
		"ae2:silicon",
		"mekanism:carbon"
	)

	// 压电陶瓷
	mekanism.metallurgic_infusing(
		"cmi:piezoelectric_ceramic",
		"cmi:magnetic_alloy",
		"cmi:titanium_oxide"
	)

	// 湮灭奇点
	mekanism.metallurgic_infusing(
		"extendedae_plus:oblivion_singularity",
		"ae2:singularity",
		"cmi:chaotic_void"
	).id("extendedae_plus:transform/oblivion_singularity")
})
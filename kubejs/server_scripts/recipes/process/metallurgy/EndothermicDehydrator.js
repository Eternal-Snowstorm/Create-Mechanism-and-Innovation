ServerEvents.recipes((event) => {
	let { thermal_extra } = event.getRecipes()

	// 钨反应物
	thermal_extra.endothermic_dehydrator("cmi:tungsten_reactant", [
		Fluid.of("cmi:activated_graphite", 100),
		"cmi:raw_tungsten_dust"
	])

	// 高密度聚乙烯丸
	thermal_extra.endothermic_dehydrator("mekanism:hdpe_pellet", [
		Fluid.of("cmi:hdpe", 1000)
	])
})
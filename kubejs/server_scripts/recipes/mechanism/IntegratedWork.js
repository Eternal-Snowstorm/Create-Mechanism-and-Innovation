ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	function addRecipe() {
		return neoecoae.integrated_working_station()
	}

	// 气密构件基座
	addRecipe()
		.itemOutput("cmi:air_tight_mechanism_basement")
		.energy(2000)
		.inputFluid(Fluid.of("tconstruct:molten_glass", 1000))
		.inputItems([
			"2x #forge:plates/osmium",
			"#forge:gears/chromeplated_steel",
			"#vintageimprovements:springs/gold",
			"#forge:plates/polyolefin"
		])

	// 基础通用构件基座
	addRecipe()
		.itemOutput("cmi:basic_mekanism_mechanism_basement")
		.energy(2000)
		.inputFluid(Fluid.of("cmi:silicon_rubber", 100))
		.inputItems([
			"2x #forge:plates/stainless_steel",
			"cmi:enriched_alloy",
			"cmi:basic_electronic_components",
			"4x cmi:optical_fiber"
		])

	// 高级通用构件基座
	addRecipe()
		.itemOutput("cmi:advanced_mekanism_mechanism_basement")
		.energy(2000)
		.inputFluid(Fluid.of("cmi:silicon_rubber", 100))
		.inputItems([
			"2x #forge:plates/stainless_steel",
			"mekanism:alloy_infused",
			"cmi:advanced_electronic_components",
			"4x cmi:optical_fiber"
		])

	// 精英通用构件基座
	addRecipe()
		.itemOutput("cmi:elite_mekanism_mechanism_basement")
		.energy(2000)
		.inputFluid(Fluid.of("cmi:silicon_rubber", 100))
		.inputItems([
			"2x #forge:plates/stainless_steel",
			"mekanism:alloy_reinforced",
			"cmi:elite_electronic_components",
			"4x cmi:optical_fiber"
		])

	// 终级通用构件基座
	addRecipe()
		.itemOutput("cmi:ultimate_mekanism_mechanism_basement")
		.energy(2000)
		.inputFluid(Fluid.of("cmi:silicon_rubber", 100))
		.inputItems([
			"2x #forge:plates/stainless_steel",
			"mekanism:alloy_atomic",
			"cmi:ultimate_electronic_components",
			"4x cmi:optical_fiber"
		])

	// 计算构件基座
	addRecipe()
		.itemOutput("cmi:computing_mechanism_basement")
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 100))
		.energy(2000)
		.inputItems([
			"2x #forge:plates/silicon_carbide",
			"#forge:plates/silicon_rubber",
			"2x #forge:plates/platinum",
			"4x #forge:wires/fluix"
		])

	// 航空构件基座
	addRecipe()
		.itemOutput("cmi:aeronautic_mechanism_basement")
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.energy(2000)
		.inputItems([
			"2x #forge:plates/aluminum_alloy",
			"4x cmi:graphene",
			"ad_astra:etrionic_capacitor",
			"4x cmi:optical_fiber"
		])


	// 宇航构件基座
	addRecipe()
		.itemOutput("cmi:astronautic_mechanism_basement")
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.energy(2000)
		.inputItems([
			"2x #forge:plates/titanium",
			"4x cmi:carbon_nanotube",
			"ad_astra:etrionic_capacitor",
			"4x cmi:optical_fiber"
		])

})
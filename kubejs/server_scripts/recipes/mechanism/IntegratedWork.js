ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	function addRecipe() {
		return neoecoae.integrated_working_station()
	}

	// 气密构件基座
	addRecipe()
		.itemOutput(Mechanisms.AIR.BAS)
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
		.itemOutput(Mechanisms.BASIC.BAS)
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
		.itemOutput(Mechanisms.ADVANCED.BAS)
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
		.itemOutput(Mechanisms.ELITE.BAS)
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
		.itemOutput(Mechanisms.ULTIMATE.BAS)
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
		.itemOutput(Mechanisms.COMPUTE.BAS)
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
		.itemOutput(Mechanisms.AERO.BAS)
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
		.itemOutput(Mechanisms.ASTRO.BAS)
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.energy(2000)
		.inputItems([
			"2x #forge:plates/titanium",
			"4x cmi:carbon_nanotube",
			"ad_astra:etrionic_capacitor",
			"4x cmi:optical_fiber"
		])

	// 核构件基座
	addRecipe()
		.itemOutput(Mechanisms.NUKE.BAS)
		.inputFluid(Fluid.tag("tag", "forge:cements", 1000))
		.energy(2000)
		.inputItems([
			"2x #forge:plates/lead",
			"2x alexscaves:polymer_plate",
			"#forge:plates/refined_glowstone",
			"4x #forge:wires/fluix"
		])

	// 反物质构件基座
	addRecipe()
		.itemOutput(Mechanisms.ANTI.BAS)
		.inputFluid(Fluid.of("neoecoae:cryotheum_solution", 90))
		.energy(2000)
		.inputItems([
			"2x #forge:plates/titanium_alloy",
			"#forge:ingots/azure_neodymium",
			"#forge:plates/refined_obsidian",
			"extendedae_plus:oblivion_singularity"
		])
})
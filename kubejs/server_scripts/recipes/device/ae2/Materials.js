ServerEvents.recipes((event) => {
	let { thermal_extra, neoecoae } = event.getRecipes()

	// 无线接收器
	thermal_extra.component_assembly("ae2:wireless_receiver", [
		"ae2:fluix_pearl",
		"create:transmitter",
		"#forge:plates/iron",
		Mechanisms.ENDER.COM
	]).id("ae2:network/wireless_part")

	// 智能机壳
	thermal_extra.component_assembly("2x cmi:smart_casing", [
		"#forge:plates/iron",
		"#forge:plates/silver",
		"ae2:charged_certus_quartz_crystal",
		"thermal:cured_rubber",
		Fluid.of("thermal:resin", 100)
	])

	// 计算机壳
	neoecoae.integrated_working_station()
		.itemOutput("cmi:computing_casing")
		.inputFluid(Fluid.of("cmi:structural_plastic", 200))
		.inputItems([
			"#forge:gems/entro",
			"#forge:plates/silicon_rubber",
			"#forge:plates/stainless_steel",
			"2x #forge:plates/platinum"
		])
		.energy(2000)

	// 铝合金机壳
	neoecoae.integrated_working_station()
		.itemOutput("2x neoecoae:aluminum_alloy_casing")
		.inputFluid(Fluid.of("cmi:structural_plastic", 400))
		.inputItems([
			"cmi:computing_casing",
			"2x #forge:plates/silicon_rubber",
			"4x #forge:plates/aluminum_alloy",
			"mekanism:structural_glass",
			"2x neoecoae:crystal_ingot"
		])
		.energy(2000)
		.id("neoecoae:aluminum_alloy_casing")

	// 黑钨合金机壳
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:black_tungsten_alloy_casing")
		.inputFluid(Fluid.of("cmi:structural_plastic", 400))
		.inputItems([
			"cmi:computing_casing",
			"2x #forge:plates/silicon_rubber",
			"4x #forge:plates/black_tungsten_alloy",
			"mekanism:structural_glass",
			"2x neoecoae:crystal_ingot"
		])
		.energy(2000)
		.id("neoecoae:black_tungsten_alloy_casing")

	// 超低温铝合金机壳
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:cryogenic_aluminum_alloy_casing")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 200))
		.inputItems([
			"neoecoae:aluminum_alloy_casing",
			"2x #forge:plates/silicon_rubber",
			"4x neoecoae:cryotheum_crystal",
			"4x #forge:plates/energized_superconductive"
		])
		.energy(2000)
		.id("neoecoae:cryogenic_aluminum_alloy_casing")

	// 样板
	thermal_extra.component_assembly("4x ae2:blank_pattern", [
		"#forge:plates/silver",
		"#forge:gems/certus_quartz",
		"ae2:logic_processor",
		Fluid.of("immersiveengineering:redstone_acid", 100)
	]).id("ae2:network/crafting/patterns_blank")

	// 破坏核心
	thermal_extra.component_assembly("2x ae2:annihilation_core", [
		Mechanisms.SMART.COM,
		"#forge:dusts/fluix",
		"#forge:ingots/refined_radiance"
	]).id("ae2:materials/annihilationcore")

	// 成型核心
	thermal_extra.component_assembly("2x ae2:formation_core", [
		Mechanisms.SMART.COM,
		"#forge:dusts/fluix",
		"#forge:ingots/shadow_steel"
	]).id("ae2:materials/formationcore")

	// 散热单元
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:phase_change_air_cooler")
		.inputFluid(Fluid.of("cmi:glacious_cryotheum", 1000))
		.inputItems([
			"4x #forge:plates/aluminum_alloy",
			"8x neoecoae:cryotheum_crystal",
			"4x #forge:plates/invar",
			"2x #forge:gems/energized_fluix_crystal",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:phase_change_air_cooler")
})
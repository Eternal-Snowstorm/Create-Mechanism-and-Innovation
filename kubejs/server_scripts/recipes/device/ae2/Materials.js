// AE2 · 基础材料（线缆、石英纤维、工具、智能机壳、空白模板、湮灭/形成核心）
ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, neoecoae } = event.getRecipes()

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
		.inputFluid(Fluid.of("thermal:resin", 100))
		.inputItems([
			"#forge:plates/stainless_steel",
			"#forge:plates/platinum",
			"cmi:entro_crystal",
			"cmi:silicon_rubber"
		])

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
})

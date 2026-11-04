// AE2 · 基础材料（线缆、石英纤维、工具、智能机壳、空白模板、湮灭/形成核心）
ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, neoecoae } = event.getRecipes()

	// 福鲁伊克斯色ME玻璃线缆
	kubejs.shaped("8x ae2:fluix_glass_cable", [
		"AAA",
		"ABA",
		"AAA"
	], {
		B: "ae2:fluix_crystal",
		A: "cmi:optical_fiber"
	}).id("ae2:network/cables/glass_fluix")

	// 石英纤维
	kubejs.shaped("ae2:quartz_fiber", [
		"AA",
		"AA"
	], {
		A: "cmi:optical_fiber"
	}).id("ae2:network/parts/quartz_fiber_part")

	// 网络工具
	kubejs.shapeless("ae2:network_tool", [
		"#ae2:quartz_wrench",
		Mechanisms.SMART.COM
	]).id("ae2:tools/network_tool")

	// 样板编辑器
	kubejs.shapeless("expatternprovider:pattern_modifier", [
		"ae2:blank_pattern",
		Mechanisms.SMART.COM
	]).id("expatternprovider:pattern_modifier")

	// 无线连接工具
	kubejs.shapeless("expatternprovider:wireless_tool", [
		"ae2:wireless_receiver",
		Mechanisms.SMART.COM
	]).id("expatternprovider:wireless_tool")

	// 机壳
	thermal_extra.component_assembly("2x cmi:smart_casing", [
		"#forge:plates/iron",
		"#forge:plates/silver",
		"ae2:charged_certus_quartz_crystal",
		"thermal:cured_rubber",
		Fluid.of("thermal:resin", 100)
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

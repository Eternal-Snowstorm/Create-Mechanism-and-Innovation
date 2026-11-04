// AE2 · 终端与显示器（终端/合成终端/编码终端/读取终端/监控器/箱子）
ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, neoecoae } = event.getRecipes()

	// 照明面板
	thermal_extra.component_assembly("ae2:semi_dark_monitor", [
		"ae2:quartz_glass",
		Mechanisms.PHOTO.COM,
		"#forge:plates/silver",
		"#forge:plates/signalum"
	]).id("ae2:network/parts/panels_semi_dark_monitor")

	// ME终端
	thermal_extra.component_assembly("ae2:terminal", [
		"#ae2:illuminated_panel",
		"ae2:annihilation_core",
		"ae2:formation_core",
		Mechanisms.SMART.COM
	]).id("ae2:network/parts/terminals")

	// 合成终端
	kubejs.shapeless("ae2:crafting_terminal", [
		"ae2:terminal",
		"create:crafting_blueprint"
	]).id("ae2:network/parts/terminals_crafting")

	// 样板编码
	thermal_extra.component_assembly("ae2:pattern_encoding_terminal", [
		"#ae2:illuminated_panel",
		Mechanisms.SMART.COM,
		"#forge:ingots/overcharged_alloy"
	]).id("ae2:network/parts/terminals_pattern_encoding")

	// 样板管理
	thermal_extra.component_assembly("ae2:pattern_access_terminal", [
		"#ae2:illuminated_panel",
		Mechanisms.SMART.COM,
		"create:transmitter"
	]).id("ae2:network/parts/terminals_pattern_access")

	// 监控器
	thermal_extra.component_assembly("ae2:storage_monitor", [
		"#ae2:illuminated_panel",
		Mechanisms.SMART.COM
	]).id("ae2:network/parts/monitors_storage")

	// 交换监控器
	thermal_extra.component_assembly("ae2:conversion_monitor", [
		"ae2:storage_monitor",
		"ae2:annihilation_core",
		"ae2:formation_core"
	]).id("ae2:network/parts/monitors_conversion")

	// ME箱子
	thermal_extra.component_assembly("ae2:chest", [
		Casing.SMART,
		"ae2:terminal",
		"#ae2:glass_cable"
	]).id("ae2:network/blocks/storage_chest")
})

// AE2 · 总线与平面（接口/样板供应器/P2P 隧道/存储总线/输入输出总线/切换总线/形成湮灭平面）
ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, neoecoae } = event.getRecipes()

	// ME接口
	thermal_extra.component_assembly("ae2:interface", [
		Casing.SMART,
		"ae2:annihilation_core",
		"ae2:formation_core"
	]).id("ae2:network/blocks/interfaces_interface")

	// 样板供应器
	kubejs.shapeless("ae2:pattern_provider", [
		"#ae2:interface",
		"minecraft:crafting_table"
	]).id("ae2:network/blocks/pattern_providers_interface")

	// P2P
	thermal_extra.component_assembly("2x ae2:me_p2p_tunnel", [
		Mechanisms.SMART.COM,
		"#ae2:glass_cable",
		"#forge:plates/silver",
		"#forge:gems/fluix"
	]).id("ae2:network/parts/tunnels_me")

	// 存储总线
	thermal_extra.component_assembly("ae2:storage_bus", [
		"#ae2:interface",
		"create:andesite_funnel",
		"create:andesite_tunnel"
	]).id("ae2:network/parts/storage_bus")

	// 输入总线
	thermal_extra.component_assembly("ae2:import_bus", [
		"ae2:annihilation_core",
		"create:andesite_tunnel"
	]).id("ae2:network/parts/import_bus")

	// 输出总线
	thermal_extra.component_assembly("ae2:export_bus", [
		"ae2:formation_core",
		"create:andesite_funnel"
	]).id("ae2:network/parts/export_bus")

	// 触发总线
	thermal_extra.component_assembly("ae2:toggle_bus", [
		"ae2:fluix_glass_cable",
		"minecraft:lever"
	]).id("ae2:network/parts/toggle_bus")

	// 成型面板
	thermal_extra.component_assembly("ae2:formation_plane", [
		"ae2:formation_core",
		"create:brass_hand"
	]).id("ae2:network/parts/formation_plane")

	// 破坏面板
	thermal_extra.component_assembly("ae2:annihilation_plane", [
		"ae2:annihilation_core",
		"thermal:drill_head"
	]).id("ae2:network/parts/annihilation_plane_alt")
})

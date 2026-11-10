ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, minecraft, neoecoae } = event.getRecipes()

	// 线缆锚
	kubejs.shapeless("ae2:cable_anchor", [
		"#ae2:knife",
		"#forge:plates/andesite"
	]).id("ae2:network/parts/cable_anchor")

	// 石英纤维
	kubejs.shaped("ae2:quartz_fiber", [
		"AA",
		"AA"
	], {
		A: "cmi:optical_fiber"
	}).id("ae2:network/parts/quartz_fiber_part")

	// 触发总线
	thermal_extra.component_assembly("4x ae2:toggle_bus", [
		"cmi:optical_fiber",
		Mechanisms.REDSTONE.COM
	]).id("ae2:network/parts/toggle_bus")

	// 照明面板
	thermal_extra.component_assembly("ae2:semi_dark_monitor", [
		"ae2:quartz_glass",
		Mechanisms.PHOTO.COM,
		"#forge:plates/silver",
		"#forge:plates/signalum"
	]).id("ae2:network/parts/panels_semi_dark_monitor")

	// ME接口
	thermal_extra.component_assembly("ae2:interface", [
		Casing.SMART,
		"ae2:annihilation_core",
		"ae2:formation_core"
	]).id("ae2:network/blocks/interfaces_interface")

	minecraft.stonecutting("ae2:interface", [
		"extendedae_plus:tag_inventory_me_interface"
	])

	// 扩展合成
	thermal_extra.component_assembly("expatternprovider:ex_crafting_terminal", [
		"ae2:crafting_terminal",
		"thermal:saw_blade",
		"#forge:hammers"
	]).id("expatternprovider:ex_crafting_terminal")

	// 标签接口
	minecraft.stonecutting("extendedae_plus:tag_inventory_me_interface", [
		"ae2:interface"
	]).id("extendedae_plus:tag_inventory_me_interface")

	// 样板供应器
	thermal_extra.component_assembly("ae2:pattern_provider", [
		"ae2:interface",
		Mechanisms.SMART.COM,
		"create:crafting_blueprint"
	]).id("ae2:network/blocks/pattern_providers_interface")

	// P2P
	thermal_extra.component_assembly("2x ae2:me_p2p_tunnel", [
		Mechanisms.SMART.COM,
		"#ae2:glass_cable",
		"#forge:plates/silver",
		"#forge:gems/fluix"
	]).id("ae2:network/parts/tunnels_me")

	// 成型面板
	thermal_extra.component_assembly("ae2:formation_plane", [
		"ae2:formation_core",
		"create:brass_hand",
		"#forge:plates/silver"
	]).id("ae2:network/parts/formation_plane")

	// 破坏面板
	thermal_extra.component_assembly("ae2:annihilation_plane", [
		"ae2:annihilation_core",
		"thermal:drill_head",
		"#forge:plates/silver"
	]).id("ae2:network/parts/annihilation_plane_alt")

	// 输入总线
	thermal_extra.component_assembly("ae2:import_bus", [
		"ae2:annihilation_core",
		"ae2:quartz_fiber",
		"#forge:plates/silver"
	]).id("ae2:network/parts/import_bus")

	// 输出总线
	thermal_extra.component_assembly("ae2:export_bus", [
		"ae2:formation_core",
		"ae2:quartz_fiber",
		"#forge:plates/silver"
	]).id("ae2:network/parts/export_bus")

	minecraft.stonecutting("ae2:export_bus", [
		"ae2:export_bus",
		"expatternprovider:tag_export_bus",
		"expatternprovider:mod_export_bus",
		"expatternprovider:precise_export_bus",
		"expatternprovider:threshold_export_bus"
	])

	// 标签输出总线
	minecraft.stonecutting("expatternprovider:tag_export_bus", [
		"ae2:export_bus",
		"expatternprovider:tag_export_bus",
		"expatternprovider:mod_export_bus",
		"expatternprovider:precise_export_bus",
		"expatternprovider:threshold_export_bus"
	]).id("expatternprovider:tag_export_bus")

	// 模组输出总线
	minecraft.stonecutting("expatternprovider:mod_export_bus", [
		"ae2:export_bus",
		"expatternprovider:tag_export_bus",
		"expatternprovider:mod_export_bus",
		"expatternprovider:precise_export_bus",
		"expatternprovider:threshold_export_bus"
	]).id("expatternprovider:mod_export_bus")

	// 精确输出总线
	minecraft.stonecutting("expatternprovider:precise_export_bus", [
		"ae2:export_bus",
		"expatternprovider:tag_export_bus",
		"expatternprovider:mod_export_bus",
		"expatternprovider:precise_export_bus",
		"expatternprovider:threshold_export_bus"
	]).id("expatternprovider:pre_bus")

	// 阈值输出总线
	minecraft.stonecutting("expatternprovider:threshold_export_bus", [
		"ae2:export_bus",
		"expatternprovider:tag_export_bus",
		"expatternprovider:mod_export_bus",
		"expatternprovider:precise_export_bus",
		"expatternprovider:threshold_export_bus"
	]).id("expatternprovider:threshold_export_bus")

	// 标准发信器
	thermal_extra.component_assembly("ae2:level_emitter", [
		Mechanisms.REDSTONE.COM,
		"cmi:optical_fiber"
	]).id("ae2:network/parts/level_emitter")

	minecraft.stonecutting("ae2:level_emitter", [
		"ae2:level_emitter",
		"ae2:energy_level_emitter",
		"expatternprovider:threshold_level_emitter"
	])

	// 能源发信器
	minecraft.stonecutting("ae2:energy_level_emitter", [
		"ae2:level_emitter",
		"ae2:energy_level_emitter",
		"expatternprovider:threshold_level_emitter"
	]).id("ae2:network/parts/energy_level_emitter")

	// 阈值发信器
	minecraft.stonecutting("expatternprovider:threshold_level_emitter", [
		"ae2:level_emitter",
		"ae2:energy_level_emitter",
		"expatternprovider:threshold_level_emitter"
	]).id("expatternprovider:threshold_level_emitter")

	// 存储总线
	thermal_extra.component_assembly("ae2:storage_bus", [
		"#ae2:interface",
		Mechanisms.SMART.COM
	]).id("ae2:network/parts/storage_bus")

	minecraft.stonecutting("ae2:storage_bus", [
		"ae2:storage_bus",
		"expatternprovider:tag_storage_bus",
		"expatternprovider:mod_storage_bus",
		"expatternprovider:precise_storage_bus"
	])

	// 标签存储总线
	minecraft.stonecutting("expatternprovider:tag_storage_bus", [
		"ae2:storage_bus",
		"expatternprovider:tag_storage_bus",
		"expatternprovider:mod_storage_bus",
		"expatternprovider:precise_storage_bus"
	]).id("expatternprovider:tag_storage_bus")

	// 模组存储总线
	minecraft.stonecutting("expatternprovider:mod_storage_bus", [
		"ae2:storage_bus",
		"expatternprovider:tag_storage_bus",
		"expatternprovider:mod_storage_bus",
		"expatternprovider:precise_storage_bus"
	]).id("expatternprovider:mod_storage_bus")

	// 精确存储总线
	minecraft.stonecutting("expatternprovider:precise_storage_bus", [
		"ae2:storage_bus",
		"expatternprovider:tag_storage_bus",
		"expatternprovider:mod_storage_bus",
		"expatternprovider:precise_storage_bus"
	]).id("expatternprovider:precise_storage_bus")

	// 扩展输入
	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:ex_import_bus_part")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"#forge:plates/platinum",
			Mechanisms.COBALT.COM,
			"ae2:import_bus"
		]).id("expatternprovider:ebus_in")

	// 扩展输出
	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:ex_export_bus_part")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"#forge:plates/platinum",
			Mechanisms.COBALT.COM,
			"ae2:export_bus"
		]).id("expatternprovider:ebus_out")

	// IO升级
	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:io_bus_upgrade")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"#forge:plates/platinum",
			Mechanisms.COBALT.COM
		]).id("expatternprovider:ebus_upgrade")

	// 扩展样管
	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:ex_pattern_access_part")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"ae2:wireless_receiver",
			Mechanisms.SMART.COM,
			"ae2:pattern_access_terminal"
		]).id("expatternprovider:epa")

	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:pattern_terminal_upgrade")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"ae2:wireless_receiver",
			Mechanisms.SMART.COM
		]).id("expatternprovider:epa_upgrade")
})
// AE2 · 网络机器（压印器/充能器/控制器/驱动器/能量元件/冷凝器/IO 端口/加速器/合成单元/分子装配室）
ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, neoecoae } = event.getRecipes()


	// 压印机
	thermal_extra.component_assembly("ae2:inscriber", [
		Casing.SMART,
		Mechanisms.SMART.COM,
		"ae2:fluix_crystal",
		"cmi:hammer_head"
	]).id("ae2:network/blocks/inscribers")


	// 充能器
	kubejs.shaped("ae2:charger", [
		"PAP",
		" G ",
		"PAP"
	], {
		P: "#forge:plates/iron",
		G: "#forge:gears/signalum",
		A: "#forge:gems/amethyst"
	}).id("ae2:network/blocks/crystal_processing_charger")


	// 无线发信
	thermal_extra.component_assembly("ae2:wireless_receiver", [
		"ae2:fluix_pearl",
		"create:transmitter",
		"#forge:plates/iron",
		Mechanisms.ENDER.COM
	]).id("ae2:network/wireless_part")


	thermal_extra.component_assembly("ae2:wireless_access_point", [
		Casing.SMART,
		Mechanisms.SMART.COM,
		"ae2:wireless_receiver"
	]).id("ae2:network/wireless_access_point")


	// 控制器
	kubejs.shaped("ae2:controller", [
		"MSM",
		"SCS",
		"MSM"
	], {
		M: Mechanisms.SMART.COM,
		S: "ae2:sky_dust",
		C: Casing.SMART
	}).id("ae2:network/blocks/controller")


	// 驱动器
	thermal_extra.component_assembly("ae2:drive", [
		Casing.SMART,
		Mechanisms.SMART.COM,
		"cmi:ferrit_core",
		"#forge:gems/fluix"
	]).id("ae2:network/blocks/storage_drive")


	// 电池
	thermal_extra.component_assembly("ae2:energy_cell", [
		Casing.SMART,
		"#forge:dusts/fluix",
		"#ae2:all_certus_quartz"
	]).id("ae2:network/blocks/energy_energy_cell")


	// 物质聚合器
	thermal_extra.component_assembly("ae2:condenser", [
		Casing.SMART,
		"#forge:dusts/fluix",
	]).id("ae2:network/blocks/io_condenser")


	// 能源接收器
	kubejs.shaped("ae2:energy_acceptor", [
		" AA",
		"AC ",
		" AA"
	], {
		A: "#forge:wires/copper",
		C: Casing.SMART
	}).id("ae2:network/blocks/energy_energy_acceptor")


	// ME IO端口
	thermal_extra.component_assembly("ae2:io_port", [
		"ae2:drive",
		Mechanisms.SMART.COM,
		"#ae2:glass_cable"
	]).id("ae2:network/blocks/io_port")


	// 催生器
	thermal_extra.component_assembly("ae2:growth_accelerator", [
		Casing.SMART,
		"ae2:fluix_block",
		"#ae2:glass_cable"
	]).id("ae2:network/blocks/crystal_processing_growth_accelerator")


	// 合成单元
	thermal_extra.component_assembly("ae2:crafting_unit", [
		Casing.SMART,
		Mechanisms.SMART.COM
	]).id("ae2:network/crafting/cpu_crafting_unit")


	// 并行处理单元
	kubejs.shapeless("ae2:crafting_accelerator", [
		"ae2:crafting_unit",
		Mechanisms.SMART.COM
	]).id("ae2:network/crafting/cpu_crafting_accelerator")


	// 分子装配室
	thermal_extra.component_assembly("ae2:molecular_assembler", [
		Casing.SMART,
		"ae2:annihilation_core",
		"ae2:formation_core",
		"minecraft:crafting_table",
		"ae2:quartz_glass"
	]).id("ae2:network/crafting/molecular_assembler")


	// 水晶共振器
	thermal_extra.component_assembly("ae2:crystal_resonance_generator", [
		Casing.SMART,
		Mechanisms.COIL.COM,
		"ae2:fluix_block",
		"ae2:charged_certus_quartz_crystal"
	]).id("ae2:network/crystal_resonance_generator")


	// 谐振仓
	thermal_extra.component_assembly("ae2:vibration_chamber", [
		Casing.SMART,
		Mechanisms.COIL.COM,
		Mechanisms.STONE.COM,
		"#forge:plates/copper",
		"#forge:plates/copper"
	]).id("ae2:network/blocks/energy_vibration_chamber")


	// 空间塔
	thermal_extra.component_assembly("ae2:spatial_pylon", [
		Casing.SMART,
		"ae2:fluix_crystal",
		"ae2:fluix_glass_cable",
		Mechanisms.ENDER.COM
	]).id("ae2:network/blocks/spatial_io_pylon")


	// 空间io端口
	thermal_extra.component_assembly("ae2:spatial_io_port", [
		"ae2:io_port",
		"#ae2:glass_cable",
		Mechanisms.ENDER.COM
	]).id("ae2:network/blocks/spatial_io_port")
})

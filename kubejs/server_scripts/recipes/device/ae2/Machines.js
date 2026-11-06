// AE2 · 网络机器（压印器/充能器/控制器/驱动器/能量元件/冷凝器/IO 端口/加速器/合成单元/分子装配室）
ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, neoecoae } = event.getRecipes()

	// 元件工作台
	thermal_extra.component_assembly("ae2:cell_workbench", [
		Casing.SMART,
		"ae2:calculation_processor",
		"#forge:plates/signalum"
	]).id("ae2:network/blocks/cell_workbench")

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

	// 物质聚合器
	thermal_extra.component_assembly("ae2:condenser", [
		Casing.SMART,
		Mechanisms.SMART.COM,
		"#forge:dusts/void"
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

	// 空间io端口
	thermal_extra.component_assembly("ae2:spatial_io_port", [
		"ae2:io_port",
		"#ae2:glass_cable",
		Mechanisms.ENDER.COM
	]).id("ae2:network/blocks/spatial_io_port")

	// 拓展充能器
	thermal_extra.component_assembly("expatternprovider:ex_charger", [
		Casing.SMART,
		Mechanisms.SMART.COM,
		"#forge:gems/fluix",
		"ae2:charger"
	]).id("expatternprovider:ex_charger")

	// 装罐机
	thermal_extra.component_assembly("expatternprovider:caner", [
		Casing.SMART,
		Mechanisms.SMART.COM,
		"#forge:gems/fluix",
		Mechanisms.COPPER.COM
	]).id("expatternprovider:caner")

	// 水晶修复器
	thermal_extra.component_assembly("expatternprovider:crystal_fixer", [
		Casing.SMART,
		Mechanisms.SMART.COM,
		"#forge:gems/fluix",
		"neoecoae:energized_crystal"
	]).id("expatternprovider:crystal_fixer")

	// 拓展压印机
	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:ex_inscriber")
		.inputItems([
			Casing.COMPUTE,
			"ae2:inscriber",
			Mechanisms.COMPUTE.COM,
			"neoecoae:energized_fluix_crystal"
		])
		.energy(2000)
		.id("expatternprovider:ex_inscriber")

	// 拓展IO端口
	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:ex_io_port")
		.inputItems([
			Casing.COMPUTE,
			"ae2:io_port",
			Mechanisms.COMPUTE.COM,
			"neoecoae:energized_fluix_crystal"
		])
		.energy(2000)
		.id("expatternprovider:ex_io_port")

	// 电路切片机
	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:circuit_cutter")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.COMPUTE,
			"3x thermal:saw_blade",
			Mechanisms.COMPUTE.COM,
			"neoecoae:energized_fluix_crystal"
		])
		.energy(2000)
		.id("expatternprovider:circuit_cutter")

	// 拓展电路切片机
	neoecoae.integrated_working_station()
		.itemOutput("extendedae_plus:circuit_cutter_plus")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.COMPUTE,
			"expatternprovider:circuit_cutter",
			Mechanisms.COMPUTE.COM,
			"neoecoae:energized_fluix_crystal",
			Mechanisms.GOLD.COM,
			"4x extendedae_plus:oblivion_singularity"
		])
		.energy(2000)
		.id("extendedae_plus:circuit_cutter_plus")
})
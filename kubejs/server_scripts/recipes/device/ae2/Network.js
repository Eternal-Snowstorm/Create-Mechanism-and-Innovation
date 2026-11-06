ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, neoecoae, minecraft } = event.getRecipes()

	// 无线发信
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

	// 能源元件
	thermal_extra.component_assembly("ae2:energy_cell", [
		Casing.SMART,
		"#forge:dusts/fluix",
		"thermal:cured_rubber",
		"#forge:plates/vanadium"
	]).id("ae2:network/blocks/energy_energy_cell")

	// 致密能源元件
	thermal_extra.component_assembly("ae2:dense_energy_cell", [
		"ae2:energy_cell",
		"#forge:dusts/fluix",
		Mechanisms.COIL.COM,
		"#forge:plates/vanadium"
	]).id("ae2:network/blocks/energy_dense_energy_cell")

	// 合成单元
	thermal_extra.component_assembly("ae2:crafting_unit", [
		Casing.SMART,
		Mechanisms.SMART.COM
	]).id("ae2:network/crafting/cpu_crafting_unit")

	// 并行处理单元
	kubejs.shapeless("ae2:crafting_accelerator", [
		"ae2:crafting_unit",
		Mechanisms.GOLD.COM
	]).id("ae2:network/crafting/cpu_crafting_accelerator")

	kubejs.shapeless("extendedae_plus:4x_crafting_accelerator", [
		"ae2:crafting_accelerator",
		Mechanisms.GOLD.COM
	]).id("extendedae_plus:network/crafting/4x_crafting_accelerator")

	kubejs.shapeless("extendedae_plus:16x_crafting_accelerator", [
		"extendedae_plus:4x_crafting_accelerator",
		Mechanisms.GOLD.COM
	]).id("extendedae_plus:network/crafting/16x_crafting_accelerator")

	kubejs.shapeless("extendedae_plus:64x_crafting_accelerator", [
		"extendedae_plus:16x_crafting_accelerator",
		Mechanisms.GOLD.COM
	]).id("extendedae_plus:network/crafting/64x_crafting_accelerator")

	kubejs.shapeless("extendedae_plus:256x_crafting_accelerator", [
		"extendedae_plus:64x_crafting_accelerator",
		Mechanisms.GOLD.COM
	]).id("extendedae_plus:network/crafting/256x_crafting_accelerator")

	kubejs.shapeless("extendedae_plus:1024x_crafting_accelerator", [
		"extendedae_plus:256x_crafting_accelerator",
		Mechanisms.GOLD.COM
	]).id("extendedae_plus:network/crafting/1024x_crafting_accelerator")

	// 分子装配室
	thermal_extra.component_assembly("ae2:molecular_assembler", [
		Casing.SMART,
		"ae2:annihilation_core",
		"ae2:formation_core",
		"create:crafting_blueprint",
		"ae2:quartz_glass"
	]).id("ae2:network/crafting/molecular_assembler")

	// 水晶共振器
	thermal_extra.component_assembly("ae2:crystal_resonance_generator", [
		Casing.SMART,
		Mechanisms.COIL.COM,
		"ae2:fluix_block",
		"ae2:charged_certus_quartz_crystal"
	]).id("ae2:network/crystal_resonance_generator")

	// 缓存元件
	thermal_extra.component_assembly("expatternprovider:ingredient_buffer", [
		Casing.SMART,
		"ae2:quartz_glass",
		Mechanisms.WOODEN.COM
	]).id("expatternprovider:ingredient_buffer")

	// 谐振仓
	thermal_extra.component_assembly("ae2:vibration_chamber", [
		Casing.SMART,
		Mechanisms.COIL.COM,
		Mechanisms.STONE.COM,
		"#forge:plates/copper"
	]).id("ae2:network/blocks/energy_vibration_chamber")

	// 催生器
	thermal_extra.component_assembly("ae2:growth_accelerator", [
		Casing.SMART,
		"ae2:fluix_block",
		"#ae2:glass_cable"
	]).id("ae2:network/blocks/crystal_processing_growth_accelerator")

	// 空间塔
	thermal_extra.component_assembly("ae2:spatial_pylon", [
		Casing.SMART,
		"ae2:fluix_crystal",
		"#ae2:glass_cable",
		Mechanisms.ENDER.COM
	]).id("ae2:network/blocks/spatial_io_pylon")

	// ME箱子
	thermal_extra.component_assembly("ae2:chest", [
		Casing.SMART,
		"ae2:terminal",
		"#ae2:glass_cable"
	]).id("ae2:network/blocks/storage_chest")

	// 空间锚
	thermal_extra.component_assembly("ae2:spatial_anchor", [
		Casing.SMART,
		"ae2:fluix_crystal",
		Mechanisms.SMART.COM,
		Mechanisms.ENDER.COM
	]).id("ae2:network/blocks/spatial_anchor")

	// 扩展接口
	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:ex_interface")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.COMPUTE,
			Mechanisms.COMPUTE.COM,
			"tconstruct:pattern",
			"ae2:interface"
		]).id("expatternprovider:ei")

	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:interface_upgrade")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.COMPUTE,
			Mechanisms.COMPUTE.COM,
			"tconstruct:pattern"
		]).id("expatternprovider:ei_upgrade")

	// 扩展样板
	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:ex_pattern_provider")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.COMPUTE,
			Mechanisms.COMPUTE.COM,
			"create:crafting_blueprint",
			"ae2:pattern_provider"
		]).id("expatternprovider:epp")

	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:pattern_provider_upgrade")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.COMPUTE,
			Mechanisms.COMPUTE.COM,
			"create:crafting_blueprint"
		]).id("expatternprovider:epp_upgrade")

	// 扩展驱动
	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:ex_drive")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.COMPUTE,
			Mechanisms.COMPUTE.COM,
			"2x #forge:gems/energized_fluix_crystal",
			"ae2:drive"
		]).id("expatternprovider:ex_drive")

	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:drive_upgrade")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.COMPUTE,
			Mechanisms.COMPUTE.COM,
			"#forge:gems/energized_fluix_crystal"
		]).id("expatternprovider:ex_drive_upgrade")

	// 扩展分子装配
	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:ex_molecular_assembler")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Mechanisms.GOLD.COM,
			"4x #forge:gems/entro",
			"2x #forge:gems/energized_fluix_crystal",
			"ae2:molecular_assembler"
		]).id("expatternprovider:ex_molecular_assembler")

	// 超大接口
	neoecoae.integrated_working_station()
		.itemOutput("expatternprovider:oversize_interface")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Mechanisms.GOLD.COM,
			"4x #forge:gems/entro",
			"2x #forge:gems/energized_fluix_crystal",
			"expatternprovider:ex_interface"
		]).id("expatternprovider:oversize_interface")

	// 镜像样板
	minecraft.stonecutting("extendedae_plus:mirror_pattern_provider", [
		"ae2:pattern_provider"
	]).id("extendedae_plus:mirror_pattern_provider")

	minecraft.stonecutting("ae2:pattern_provider", [
		"extendedae_plus:mirror_pattern_provider"
	])

	// 样板供应控制器
	neoecoae.integrated_working_station()
		.itemOutput("extendedae_plus:network_pattern_controller")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			Casing.COMPUTE,
			Mechanisms.COMPUTE.COM,
			"ae2:pattern_provider"
		]).id("extendedae_plus:network_pattern_controller")
})
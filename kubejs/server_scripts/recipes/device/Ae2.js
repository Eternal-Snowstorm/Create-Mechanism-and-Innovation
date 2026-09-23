ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, neoecoae } = event.getRecipes()
	const DRIVE = /^ae2:(?!.*portable)(?!.*spatial).*cell(?!.*workbench$).+$/;

	event.remove([
		{
			type: "minecraft:crafting_shaped",
			output: DRIVE
		}
	])

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

	// ME物品元件外壳
	kubejs.shaped("2x ae2:item_cell_housing", [
		"XYX",
		"YMY",
		"XYX"
	], {
		M: Mechanisms.WOODEN.COM,
		X: "#forge:plates/iron",
		Y: "ae2:quartz_glass",
	}).id("ae2:network/cells/item_cell_housing")

	// ME流体元件外壳
	kubejs.shaped("2x ae2:fluid_cell_housing", [
		"XYX",
		"YMY",
		"XYX"
	], {
		M: Mechanisms.COPPER.COM,
		X: "#forge:plates/copper",
		Y: "ae2:quartz_glass"
	}).id("ae2:network/cells/fluid_cell_housing")

	// ME化学元件外壳
	kubejs.shaped("2x appmek:chemical_cell_housing", [
		"PAP",
		"AMA",
		"PAP"
	], {
		P: "#forge:plates/osmium",
		A: "ae2:quartz_glass",
		M: Mechanisms.AIR.COM
	}).id("appmek:chemical_cell_housing")

	// 网络工具
	kubejs.shapeless("ae2:network_tool", [
		"#ae2:quartz_wrench",
		Mechanisms.SMART.COM
	]).id("ae2:tools/network_tool")

	// 机壳
	thermal_extra.component_assembly("2x cmi:smart_casing", [
		"#forge:plates/iron",
		"#forge:plates/silver",
		"ae2:charged_certus_quartz_crystal",
		"thermal:cured_rubber",
		Fluid.of("thermal:resin", 100)
	])

	// 压印机
	thermal_extra.component_assembly("ae2:inscriber", [
		Casing.SMART,
		Mechanisms.SMART.COM,
		"ae2:fluix_crystal",
		"cmi:hammer_head"
	]).id("ae2:network/blocks/inscribers")

	// 1k 存储单元
	thermal_extra.component_assembly("ae2:cell_component_1k", [
		"ae2:logic_processor",
		"#forge:plates/silver",
		"#forge:dusts/certus_quartz",
		"cmi:ferrit_core",
		Fluid.of("immersiveengineering:redstone_acid", 100)
	]).id("ae2:network/cells/item_storage_components_cell_1k_part")

	// 4k 存储单元
	kubejs.shapeless("ae2:cell_component_4k", [
		"2x ae2:cell_component_1k",
		"#forge:plates/silver"
	]).id("ae2:network/cells/item_storage_components_cell_4k_part")

	// 16k 存储单元
	kubejs.shapeless("ae2:cell_component_16k", [
		"3x ae2:cell_component_1k",
		"#forge:plates/silver"
	]).id("ae2:network/cells/item_storage_components_cell_16k_part")

	kubejs.shapeless("ae2:cell_component_16k", [
		"ae2:cell_component_1k",
		"ae2:cell_component_4k"
	])

	// 64k 存储单元
	kubejs.shapeless("ae2:cell_component_64k", [
		"4x ae2:cell_component_1k",
		"#forge:plates/silver"
	]).id("ae2:network/cells/item_storage_components_cell_64k_part")

	kubejs.shapeless("ae2:cell_component_64k", [
		"2x ae2:cell_component_1k",
		"ae2:cell_component_4k"
	])

	kubejs.shapeless("ae2:cell_component_64k", [
		"ae2:cell_component_1k",
		"ae2:cell_component_16k"
	])

	// 256k 存储单元
	kubejs.shapeless("ae2:cell_component_256k", [
		"5x ae2:cell_component_1k",
		"#forge:plates/silver"
	]).id("ae2:network/cells/item_storage_components_cell_256k_part")

	kubejs.shapeless("ae2:cell_component_256k", [
		"3x ae2:cell_component_1k",
		"ae2:cell_component_4k"
	])

	kubejs.shapeless("ae2:cell_component_256k", [
		"2x ae2:cell_component_1k",
		"ae2:cell_component_16k"
	])

	kubejs.shapeless("ae2:cell_component_256k", [
		"ae2:cell_component_1k",
		"ae2:cell_component_64k"
	])

	// 2^3空间组件
	thermal_extra.component_assembly("ae2:spatial_cell_component_2", [
		"ae2:engineering_processor",
		"#forge:plates/platinum",
		"ae2:fluix_dust",
		"cmi:ferrit_core"
	]).id("ae2:network/cells/spatial_components")

	// 16^3空间组件
	kubejs.shapeless("ae2:spatial_cell_component_16", [
		"2x ae2:spatial_cell_component_2",
		"#forge:plates/platinum"
	]).id("ae2:network/cells/spatial_components_0")

	// 128^3空间组件
	kubejs.shapeless("ae2:spatial_cell_component_128", [
		"3x ae2:spatial_cell_component_2",
		"#forge:plates/platinum"
	]).id("ae2:network/cells/spatial_components_1")

	kubejs.shapeless("ae2:spatial_cell_component_128", [
		"ae2:spatial_cell_component_2",
		"ae2:spatial_cell_component_16"
	])

	// 样板
	thermal_extra.component_assembly("4x ae2:blank_pattern", [
		"#forge:plates/silver",
		"#forge:gems/certus_quartz",
		"ae2:logic_processor",
		Fluid.of("immersiveengineering:redstone_acid", 100)
	]).id("ae2:network/crafting/patterns_blank")

	// 内存卡
	kubejs.shaped("ae2:memory_card", [
		"PMP",
		"WEW"
	], {
		P: "#forge:plates/iron",
		M: Mechanisms.SMART.COM,
		W: "#forge:wires/signalum",
		E: "#forge:plates/electrum"
	}).id("ae2:tools/network_memory_card")

	// 充能器
	kubejs.shaped("ae2:charger", [
		"PAP",
		" M ",
		"PAP"
	], {
		P: "#forge:plates/iron",
		M: Mechanisms.COIL.COM,
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

	// 照明面板
	thermal_extra.component_assembly("ae2:semi_dark_monitor", [
		"ae2:quartz_glass",
		Mechanisms.PHOTO.COM,
		"#forge:plates/silver",
		"#forge:plates/signalum"
	]).id("ae2:network/parts/panels_semi_dark_monitor")

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

	// ME箱子
	thermal_extra.component_assembly("ae2:chest", [
		Casing.SMART,
		"ae2:terminal",
		"#ae2:glass_cable"
	]).id("ae2:network/blocks/storage_chest")

	// 卡
	thermal_extra.component_assembly("4x ae2:basic_card", [
		"#forge:plates/iron",
		Mechanisms.SMART.COM,
		"thermal:cured_rubber",
		"#forge:ingots/electrum"
	]).id("ae2:materials/basiccard")

	thermal_extra.component_assembly("4x ae2:advanced_card", [
		"#forge:plates/silver",
		Mechanisms.SMART.COM,
		"thermal:cured_rubber",
		"#forge:ingots/etrium"
	]).id("ae2:materials/advancedcard")

	thermal_extra.component_assembly("ae2:wireless_booster", [
		"#forge:plates/silver",
		Mechanisms.ENDER.COM,
		"#forge:dusts/fluix"
	]).id("ae2:network/wireless_booster")

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

	// P2P
	thermal_extra.component_assembly("2x ae2:me_p2p_tunnel", [
		Mechanisms.SMART.COM,
		"#ae2:glass_cable",
		"#forge:plates/silver",
		"#forge:gems/fluix"
	]).id("ae2:network/parts/tunnels_me")

	// 熵变机械臂
	thermal_extra.component_assembly("ae2:entropy_manipulator", [
		Mechanisms.SMART.COM,
		Mechanisms.NATURE.COM,
		"ae2:fluix_crystal",
		"ae2:energy_cell",
		"#forge:rods/silver"
	]).id("ae2:tools/misctools_entropy_manipulator")

	// 充能手杖
	thermal_extra.component_assembly("ae2:charged_staff", [
		Mechanisms.COIL.COM,
		"ae2:charged_certus_quartz_crystal",
		"#forge:rods/silver"
	]).id("ae2:tools/misctools_charged_staff")

	// 染色器
	thermal_extra.component_assembly("ae2:color_applicator", [
		Mechanisms.SMART.COM,
		Mechanisms.COLOR.COM,
		"#forge:plates/silver",
		"ae2:energy_cell",
		"#forge:rods/silver"
	]).id("ae2:tools/network_color_applicator")

	// 物质炮
	thermal_extra.component_assembly("ae2:matter_cannon", [
		Mechanisms.SMART.COM,
		Mechanisms.ANDESITE.COM,
		"#forge:ingots/silver",
		"ae2:energy_cell",
		"#forge:rods/silver"
	]).id("ae2:tools/matter_cannon")

	// 元件工作台
	thermal_extra.component_assembly("ae2:cell_workbench", [
		Casing.SMART,
		"ae2:calculation_processor"
	]).id("ae2:network/blocks/cell_workbench")

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

	// 量子环
	thermal_extra.component_assembly("ae2:quantum_ring", [
		"#forge:plates/silver",
		"ae2:energy_cell",
		Mechanisms.COMPUTE.COM,
		"ae2:sky_dust"
	]).id("ae2:network/blocks/quantum_ring")

	// 量子链接仓
	thermal_extra.component_assembly("ae2:quantum_link", [
		"ae2:quartz_glass",
		Mechanisms.ENDER.COM,
		"ae2:fluix_pearl"
	]).id("ae2:network/blocks/quantum_link")

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

	// 放置工具
	thermal_extra.component_assembly("meplacementtool:me_placement_tool", [
		"#forge:rods/silver",
		"ae2:wireless_terminal",
		"constructionwand:iron_wand"
	]).id("meplacementtool:me_placement_tool")

	// 多方块放置工具
	thermal_extra.component_assembly("meplacementtool:multiblock_placement_tool", [
		"#forge:rods/silver",
		"ae2:wireless_terminal",
		"constructionwand:infinity_wand"
	]).id("meplacementtool:multiblock_placement_tool")

	//  线缆放置工具
	thermal_extra.component_assembly("meplacementtool:me_cable_placement_tool", [
		"#forge:rods/silver",
		"ae2:wireless_terminal",
		Mechanisms.COLOR.COM,
		"ae2:smart_dense_cable"
	]).id("meplacementtool:me_cable_placement_tool")

	// ME光束成型器
	thermal_extra.component_assembly("me_beam_former:beam_former_part", [
		"#forge:plates/aluminum",
		"#forge:plates/silver",
		Mechanisms.PHOTO.COM,
		"ae2:fluix_pearl",
		"#ae2:glass_cable"
	]).id("me_beam_former:beam_former_part")

	// 大型光束成型器
	thermal_extra.component_assembly("me_beam_former:beam_former_block", [
		"me_beam_former:beam_former_part",
		"#forge:plates/platinum",
		Mechanisms.SMART.COM,
		"ae2:fluix_pearl"
	]).id("me_beam_former:beam_former_block")

	// 全向光束成型器
	thermal_extra.component_assembly("me_beam_former:omni_beam_former_block", [
		"me_beam_former:beam_former_block",
		"cmi:piezoelectric_ceramic",
		"cmi:magnetic_contact",
		Mechanisms.COMPUTE.COM
	]).id("me_beam_former:omni_beam_former_block")

	neoecoae.integrated_working_station()
		.itemOutput("cmi:computing_casing")
		.inputItems([
			"#forge:plates/stainless_steel",
			"#forge:plates/platinum",
			"cmi:entro_crystal",
			"cmi:silicon_rubber"
		])
		.inputFluid(Fluid.of("thermal:resin", 100))
})
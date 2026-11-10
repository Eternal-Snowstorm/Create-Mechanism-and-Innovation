ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra } = event.getRecipes()

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
		"create:transmitter",
		"#forge:dusts/fluix",
		"#forge:plates/etrium"
	]).id("ae2:network/wireless_booster")

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

	// 熵变机械臂
	thermal_extra.component_assembly("ae2:entropy_manipulator", [
		Mechanisms.SMART.COM,
		Mechanisms.NETHER.COM,
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
		"#forge:rods/silver"
	]).id("ae2:tools/network_color_applicator")

	// 物质炮
	thermal_extra.component_assembly("ae2:matter_cannon", [
		Mechanisms.SMART.COM,
		Mechanisms.ANDESITE.COM,
		"#forge:ingots/silver",
		"#forge:rods/silver"
	]).id("ae2:tools/matter_cannon")

	// 封装胶带
	thermal_extra.component_assembly("expatternprovider:me_packing_tape", [
		Mechanisms.SMART.COM,
		"create:bound_cardboard_block",
		"#forge:ingots/silver",
		"#forge:rods/silver"
	]).id("expatternprovider:tape")

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
})
ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

    // 漏斗
    kubejs.shaped("3x minecraft:hopper", [
        "X X",
        "XMX",
        " X "
    ], {
        M: Mechanisms.WOODEN.COM,
        X: ["#forge:plates/tin", "#forge:plates/iron"],
    }).id("minecraft:hopper")

	// 传送带
	kubejs.shaped("4x create:belt_connector", [
		"AAA",
		"AAA"
	], {
		A: "thermal:cured_rubber"
	}).id("create:crafting/kinetics/belt_connector")

	// 溜槽
	kubejs.shaped("16x create:chute", [
		"X X",
		" M ",
		"X X"
	], {
		X: "#forge:plates/industrial_iron",
		M: Mechanisms.WOODEN.COM
	})

	// 黄铜溜槽
	kubejs.shaped("16x create_connected:brass_chute", [
		"X X",
		" M ",
		"X X"
	], {
		X: "#forge:plates/brass",
		M: Mechanisms.WOODEN.COM
	})

	// 物品舱口
	kubejs.shapeless("2x create:item_hatch", [
		"2x #forge:plates/andesite_alloy",
		"#forge:plates/industrial_iron"
	]).id("create:crafting/logistics/item_hatch")

	// 物品保险库
	kubejs.shaped("create:item_vault", [
		"A",
		"M",
		"A"
	], {
		A: "#forge:plates/industrial_iron",
		M: Mechanisms.WOODEN.COM
	}).id('create:crafting/kinetics/item_vault')

	kubejs.shaped("create_connected:item_silo", [
		"AMA"
	], {
		A: "#forge:plates/industrial_iron",
		M: Mechanisms.WOODEN.COM
	}).id("create_connected:crafting/kinetics/item_silo")

	// 移动式存储接口
	kubejs.shapeless("2x create:portable_storage_interface", [
		Casing.ANDESITE,
		Mechanisms.WOODEN.COM,
		"#forge:plates/industrial_iron"
	]).id("create:crafting/kinetics/portable_storage_interface")

	// 移动式流体接口
	kubejs.shapeless("2x create:portable_fluid_interface", [
		Casing.COPPER,
		Mechanisms.COPPER.COM,
		"#forge:plates/industrial_iron"
	]).id("create:crafting/kinetics/portable_fluid_interface")

	// 移动式能量接口
	kubejs.shapeless("2x createaddition:portable_energy_interface", [
		Casing.BRASS,
		Mechanisms.COIL.COM,
		"#forge:plates/industrial_iron"
	]).id("createaddition:crafting/portable_energy_interface")

	// 安山漏斗
	kubejs.shaped("4x create:andesite_funnel", [
		"A",
		"B"
	], {
		A: "#forge:plates/andesite_alloy",
		B: "thermal:cured_rubber"
	}).id("create:crafting/logistics/andesite_funnel")

	// 安山隧道
	kubejs.shaped("4x create:andesite_tunnel", [
		"AA",
		"BB"
	], {
		A: "#forge:plates/andesite_alloy",
		B: "thermal:cured_rubber"
	}).id("create:crafting/logistics/andesite_tunnel")

	// 黄铜漏斗
	kubejs.shapeless("create:brass_funnel", [
		"create:andesite_funnel",
		Mechanisms.ANDESITE.COM,
		"#forge:plates/brass"
	]).id("create:crafting/logistics/brass_funnel")

	// 黄铜隧道
	kubejs.shapeless("create:brass_tunnel", [
		"create:andesite_tunnel",
		Mechanisms.ANDESITE.COM,
		"#forge:plates/brass"
	]).id("create:crafting/logistics/brass_tunnel")

	// 智能溜槽
	kubejs.shapeless("create:smart_chute", [
		"create:chute",
		Mechanisms.ANDESITE.COM,
		"#forge:plates/brass"
	]).id("create:crafting/kinetics/smart_chute")

	// 物流接口
	kubejs.shaped("create_connected:inventory_access_port", [
		" A ",
		"AMI",
		" A "
	], {
		A: "#forge:plates/brass",
		I: "#forge:plates/industrial_iron",
		M: Mechanisms.WOODEN.COM
	}).id("create_connected:crafting/kinetics/inventory_access_port")
})
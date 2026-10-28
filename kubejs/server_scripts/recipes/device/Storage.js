ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 背包
	kubejs.shaped("sophisticatedbackpacks:backpack", [
		"XYX",
		"XMX",
		"YYY"
	], {
		M: Mechanisms.WOODEN.COM,
		X: "#forge:string",
		Y: ["#forge:leather", "tconstruct:silky_cloth"]
	}).id("sophisticatedbackpacks:backpack")

	// 空白升级
	kubejs.shaped("sophisticatedbackpacks:upgrade_base", [
		"XYX",
		"YMY",
		"XYX"
	], {
		M: Mechanisms.WOODEN.COM,
		X: "#forge:rods/andesite",
		Y: ["#forge:leather", "tconstruct:silky_cloth"]
	}).id("sophisticatedbackpacks:upgrade_base")

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

	// 打包机
	kubejs.shaped("2x create:packager", [
		"PMP",
		"IBI",
		"PCP"
	], {
		P: "#forge:plates/andesite_alloy",
		M: Mechanisms.ANDESITE.COM,
		I: "#forge:plates/industrial_iron",
		B: "create:cardboard_block",
		C: Casing.ANDESITE
	}).id("create:crafting/logistics/packager")

	// 流体打包机
	kubejs.shaped("2x fluidlogistics:fluid_packager", [
		"PMP",
		"IBI",
		"PCP"
	], {
		P: "#forge:plates/copper",
		M: Mechanisms.COPPER.COM,
		I: "#forge:plates/industrial_iron",
		B: "fluidlogistics:waterproof_cardboard_block",
		C: Casing.COPPER
	}).id("fluidlogistics:fluid_packager")

	// 蛙港
	kubejs.shaped("create:package_frogport", [
		"PP ",
		"BMS",
		" C "
	], {
		P: "#forge:plates/industrial_iron",
		B: "#forge:slimeballs",
		M: Mechanisms.ANDESITE.COM,
		S: "#vintageimprovements:springs/andesite",
		C: Casing.ANDESITE
	}).id("create:crafting/logistics/package_frogport")

	// 发信器
	// 红石
	kubejs.shaped("2x create:redstone_link", [
		"T",
		"M",
		"C"
	], {
		T: "create:transmitter",
		M: Mechanisms.REDSTONE.COM,
		C: Casing.ANDESITE
	}).id("create:crafting/logistics/redstone_link")
	// 仓储
	kubejs.shaped("2x create:stock_link", [
		"T",
		"M",
		"C"
	], {
		T: "create:transmitter",
		M: Mechanisms.WOODEN.COM,
		C: Casing.ANDESITE
	}).id("create:crafting/logistics/stock_link")
	// 显示
	kubejs.shaped("2x create:display_link", [
		"T",
		"M",
		"C"
	], {
		T: "create:transmitter",
		M: Mechanisms.PHOTO.COM,
		C: Casing.BRASS
	}).id("create:crafting/logistics/display_link")

	// 发报机
	kubejs.shaped("create:stock_ticker", [
		" G ",
		"PMT",
		" C "
	], {
		G: "#forge:glass",
		P: "#forge:plates/gold",
		M: Mechanisms.ANDESITE.COM,
		T: "create:transmitter",
		C: Casing.ANDESITE
	}).id("create:crafting/logistics/stock_ticker")

	// 请求器
	kubejs.shaped("create:redstone_requester", [
		" T ",
		"PMP",
		" C "
	], {
		T: "create:transmitter",
		P: "#forge:plates/industrial_iron",
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE
	}).id("create:crafting/logistics/redstone_requester")

	// 工厂仪表
	kubejs.shaped("create:factory_gauge", [
		"T",
		"B",
		"P"
	], {
		T: "create:transmitter",
		P: "#forge:plates/industrial_iron",
		B: "#forge:plates/brass"
	}).id("create:crafting/logistics/factory_gauge")

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
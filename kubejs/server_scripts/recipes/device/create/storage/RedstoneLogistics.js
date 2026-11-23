ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 发信器
	// 红石
	kubejs.shaped("2x create:redstone_link", [
		"A",
		"B",
		"C"
	], {
		A: "create:transmitter",
		B: Mechanisms.REDSTONE.COM,
		C: Casing.ANDESITE
	}).id("create:crafting/logistics/redstone_link")

	// 仓储
	kubejs.shaped("2x create:stock_link", [
		"A",
		"B",
		"C"
	], {
		A: "create:transmitter",
		B: Mechanisms.WOODEN.COM,
		C: Casing.ANDESITE
	}).id("create:crafting/logistics/stock_link")

	// 显示
	kubejs.shaped("2x create:display_link", [
		"A",
		"B",
		"C"
	], {
		A: "create:transmitter",
		B: Mechanisms.PHOTO.COM,
		C: Casing.BRASS
	}).id("create:crafting/logistics/display_link")

	// 发报机
	kubejs.shaped("create:stock_ticker", [
		" A ",
		"BCD",
		" E "
	], {
		A: "#forge:glass",
		B: "#forge:plates/gold",
		C: Mechanisms.ANDESITE.COM,
		D: "create:transmitter",
		E: Casing.ANDESITE
	}).id("create:crafting/logistics/stock_ticker")

	// 请求器
	kubejs.shaped("create:redstone_requester", [
		" A ",
		"BCB",
		" D "
	], {
		A: "create:transmitter",
		B: "#forge:plates/industrial_iron",
		C: Mechanisms.ANDESITE.COM,
		D: Casing.ANDESITE
	}).id("create:crafting/logistics/redstone_requester")

	// 工厂仪表
	kubejs.shaped("create:factory_gauge", [
		"A",
		"B",
		"C"
	], {
		A: "create:transmitter",
		B: "#forge:plates/brass",
		C: "#forge:plates/industrial_iron"
	}).id("create:crafting/logistics/factory_gauge")
})
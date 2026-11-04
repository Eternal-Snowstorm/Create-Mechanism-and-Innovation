// Create · 红石与库存信号（红石链接/库存链接/显示链接/行情板/请求器/工厂仪表）
ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

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
})

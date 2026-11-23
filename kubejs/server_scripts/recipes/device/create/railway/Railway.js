ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 车站
	kubejs.shaped("2x create:track_station", [
		"A",
		"B",
		"C"
	], {
		A: "#ad_astra:flags",
		B: Casing.RAILWAY,
		C: Mechanisms.RAILWAY.COM
	}).id("create:crafting/kinetics/track_station")

	// 燃料储罐
	kubejs.shaped("2x railways:fuel_tank", [
		" A ",
		"ABA",
		" A "
	], {
		A: "#forge:plates/obsidian",
		B: "#forge:glass"
	}).id("railways:crafting/fuel_tank")

	// 燃料接口
	kubejs.shapeless("2x railways:portable_fuel_interface", [
		Casing.RAILWAY,
		Mechanisms.RAILWAY.COM,
		"#forge:plates/industrial_iron"
	]).id("railways:crafting/portable_fuel_interface")

	// 侦测器
	kubejs.shaped("2x create:track_observer", [
		"A",
		"B",
		"C"
	], {
		A: "minecraft:comparator",
		B: Casing.RAILWAY,
		C: Mechanisms.RAILWAY.COM
	}).id("create:crafting/kinetics/track_observer")

	// 信号机
	kubejs.shaped("2x create:track_signal", [
		"A",
		"B",
		"C"
	], {
		A: "create:transmitter",
		B: Casing.RAILWAY,
		C: Mechanisms.RAILWAY.COM
	}).id("create:crafting/kinetics/track_signal")

	// 连挂器
	kubejs.shaped("2x railways:track_coupler", [
		"A",
		"B",
		"C"
	], {
		A: "create:minecart_coupling",
		B: Casing.RAILWAY,
		C: Mechanisms.RAILWAY.COM
	}).id("railways:crafting/track_coupler")

	// 控制器
	kubejs.shaped("create:controls", [
		"A",
		"B",
		"C"
	], {
		A: "create_connected:control_chip",
		B: Casing.RAILWAY,
		C: Mechanisms.RAILWAY.COM
	}).id("create:crafting/kinetics/controls")

	// 机械眼
	kubejs.shapeless("railways:remote_lens", [
		"create_rns:polished_resonant_amethyst",
		"create:transmitter",
		Mechanisms.RAILWAY.COM
	]).id("railways:crafting/remote_lens")

	// 邮箱
	CmiGlobal.DYE_COLOR_GROUP.forEach((color) => {
		kubejs.shaped(`2x create:${color}_postbox`, [
			"A",
			"B",
			"C"
		], {
			A: `#forge:dyes/${color}`,
			B: "minecraft:barrel",
			C: Mechanisms.RAILWAY.COM
		}).id(`create:crafting/logistics/${color}_postbox`)
	})

	// 铁路放置器
	kubejs.shaped("railway_automation:track_placer", [
		" A ",
		"BCB",
		"DED"
	], {
		A: Mechanisms.RAILWAY.COM,
		B: "create:transmitter",
		C: Casing.RAILWAY,
		D: "#forge:plates/iron",
		E: "#create:tracks"
	}).id("railway_automation:track_placer")
})
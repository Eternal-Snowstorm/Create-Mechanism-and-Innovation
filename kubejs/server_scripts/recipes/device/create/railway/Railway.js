// Create: Railways · 列车设备（车站/燃料罐/加油接口/观测器/信号机/车钩/控制台/邮筒）
ServerEvents.recipes((event) => {
	let { kubejs, create } = event.getRecipes()


	// 车站
	kubejs.shaped("2x create:track_station", [
		"A",
		"C",
		"M"
	], {
		A: "#ad_astra:flags",
		C: Casing.RAILWAY,
		M: Mechanisms.RAILWAY.COM
	}).id("create:crafting/kinetics/track_station")


	// 燃料储罐
	kubejs.shaped("2x railways:fuel_tank", [
		" P ",
		"PGP",
		" P "
	], {
		P: "#forge:plates/obsidian",
		G: "#forge:glass"
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
		"C",
		"M"
	], {
		A: "minecraft:comparator",
		C: Casing.RAILWAY,
		M: Mechanisms.RAILWAY.COM
	}).id("create:crafting/kinetics/track_observer")


	// 信号机
	kubejs.shaped("2x create:track_signal", [
		"A",
		"C",
		"M"
	], {
		A: "create:transmitter",
		C: Casing.RAILWAY,
		M: Mechanisms.RAILWAY.COM
	}).id("create:crafting/kinetics/track_signal")


	// 连挂器
	kubejs.shaped("2x railways:track_coupler", [
		"A",
		"C",
		"M"
	], {
		A: "create:minecart_coupling",
		C: Casing.RAILWAY,
		M: Mechanisms.RAILWAY.COM
	}).id("railways:crafting/track_coupler")


	// 控制器
	kubejs.shaped("create:controls", [
		"A",
		"C",
		"M"
	], {
		A: "create_connected:control_chip",
		C: Casing.RAILWAY,
		M: Mechanisms.RAILWAY.COM
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
			"D",
			"B",
			"M"
		], {
			D: `#forge:dyes/${color}`,
			B: "minecraft:barrel",
			M: Mechanisms.RAILWAY.COM
		}).id(`create:crafting/logistics/${color}_postbox`)
	})
})

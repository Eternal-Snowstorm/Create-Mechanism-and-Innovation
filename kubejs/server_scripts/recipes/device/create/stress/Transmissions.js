// Create · 传动件（齿轮箱/垂直齿轮箱/并联齿轮箱/六向齿轮箱/链条齿轮/曲柄/过载离合器）
ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 齿轮箱
	kubejs.shaped("create:gearbox", [
		" A ",
		"ABA",
		" A "
	], {
		A: "#create:incomplete_cogwheels",
		B: Casing.ANDESITE
	}).id("create:crafting/kinetics/gearbox")

	kubejs.shaped("create:vertical_gearbox", [
		"A A",
		" B ",
		"A A"
	], {
		A: "#create:incomplete_cogwheels",
		B: Casing.ANDESITE
	}).id("create:crafting/kinetics/vertical_gearbox")

	kubejs.shapeless("create_connected:parallel_gearbox", [
		"create:gearbox",
		"#create:incomplete_large_cogwheels"
	]).id("create_connected:crafting/kinetics/parallel_gearbox")

	kubejs.shapeless("create_connected:six_way_gearbox", [
		"create_connected:parallel_gearbox",
		"#create:incomplete_large_cogwheels"
	]).id("create_connected:crafting/kinetics/six_way_gearbox_from_parallel")

	kubejs.shapeless("create_connected:six_way_gearbox", [
		"create:gearbox",
		"2x #create:incomplete_large_cogwheels"
	]).id("create_connected:crafting/kinetics/six_way_gearbox_from_gearbox")

	kubejs.shaped("create_connected:six_way_gearbox", [
		"AB ",
		"BCB",
		" BA"
	], {
		A: "#create:incomplete_large_cogwheels",
		B: "#create:incomplete_cogwheels",
		C: Casing.ANDESITE
	}).id("create_connected:crafting/kinetics/six_way_gearbox")

	kubejs.shapeless("create_connected:encased_chain_cogwheel", [
		"create:encased_chain_drive",
		"#create:incomplete_cogwheels"
	]).id("create_connected:crafting/kinetics/encased_chain_cogwheel")

	kubejs.shapeless("create_connected:crank_wheel", [
		"create:hand_crank",
		"#create:incomplete_cogwheels"
	]).id("create_connected:crafting/kinetics/crank_wheel")

	kubejs.shapeless("create_connected:large_crank_wheel", [
		"create:hand_crank",
		"#create:incomplete_large_cogwheels"
	]).id("create_connected:crafting/kinetics/large_crank_wheel")

	// 过应力离合器
	kubejs.shapeless("create_connected:overstress_clutch", [
		Casing.ANDESITE,
		"create:electron_tube",
		"create:shaft",
		"#forge:plates/iron"
	])
})

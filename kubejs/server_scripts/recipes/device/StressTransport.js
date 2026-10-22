ServerEvents.recipes((event) => {
	let { kubejs, create } = event.getRecipes()

	// 传动
	// 齿轮
	let cogwheelMaterials = [
		"bronze",
		"cast_iron",
		"steel",
	]
	cogwheelMaterials.forEach((material) => {
		// 小齿轮
		kubejs.shapeless(`cmi:incomplete_${material}_cogwheel`, [
			`#forge:plates/${material}`,
			"#forge:hammers"
		]).damageIngredient("#forge:hammers")

		create.deploying(`cmi:${material}_cogwheel`, [
			`cmi:incomplete_${material}_cogwheel`,
			"#create:shaft"
		])

		create.deploying(`cmi:${material}_cogwheel`, [
			"create:shaft",
			`cmi:incomplete_${material}_cogwheel`
		])

		kubejs.shapeless(`cmi:${material}_cogwheel`, [
			`cmi:incomplete_${material}_cogwheel`,
			"#create:shaft"
		])

		// 大齿轮
		kubejs.shapeless(`cmi:incomplete_${material}_large_cogwheel`, [
			`2x #forge:plates/${material}`,
			"#forge:hammers"
		]).damageIngredient("#forge:hammers")

		create.cutting(`cmi:incomplete_${material}_large_cogwheel`, [
			`#forge:gears/${material}`
		])

		create.cutting(`2x cmi:incomplete_${material}_cogwheel`, [
			`cmi:incomplete_${material}_large_cogwheel`
		])

		create.deploying(`cmi:${material}_large_cogwheel`, [
			`cmi:incomplete_${material}_large_cogwheel`,
			"#create:shaft"
		])

		create.deploying(`cmi:${material}_large_cogwheel`, [
			"create:shaft",
			`cmi:incomplete_${material}_large_cogwheel`
		])

		kubejs.shapeless(`cmi:${material}_large_cogwheel`, [
			`cmi:incomplete_${material}_large_cogwheel`,
			"#create:shaft"
		])

		kubejs.shapeless(`cmi:${material}_large_cogwheel`, [
			`cmi:${material}_cogwheel`,
			`#forge:plates/${material}`
		])
	})

	// 齿轮
	kubejs.shapeless("cmi:incomplete_cogwheel", [
		"#minecraft:planks",
		"#minecraft:axes"
	]).damageIngredient("#minecraft:axes", 1)

	create.cutting("2x cmi:incomplete_cogwheel", [
		"cmi:incomplete_large_cogwheel"
	])

	create.deploying("create:cogwheel", [
		"cmi:incomplete_cogwheel",
		"#create:shaft"
	]).id("create:deploying/cogwheel")

	create.deploying("create:cogwheel", [
		"create:shaft",
		"cmi:incomplete_cogwheel"
	])

	kubejs.shapeless("create:cogwheel", [
		"cmi:incomplete_cogwheel",
		"#create:shaft"
	]).id("create:crafting/kinetics/cogwheel")

	// 大齿轮
	kubejs.shapeless("cmi:incomplete_large_cogwheel", [
		"2x #minecraft:planks",
		"#minecraft:axes"
	]).damageIngredient("#minecraft:axes", 1)

	create.cutting("2x cmi:incomplete_large_cogwheel", [
		"#forge:gears/wooden"
	])

	create.deploying("create:large_cogwheel", [
		"cmi:incomplete_large_cogwheel",
		"#create:shaft"
	]).id("create:deploying/large_cogwheel")

	create.deploying("create:large_cogwheel", [
		"create:shaft",
		"cmi:incomplete_large_cogwheel"
	])

	kubejs.shapeless("create:large_cogwheel", [
		"cmi:incomplete_large_cogwheel",
		"#create:shaft"
	]).id("create:crafting/kinetics/large_cogwheel")

	kubejs.shapeless("create:large_cogwheel", [
		"create:cogwheel",
		"#minecraft:planks"
	]).id("create:crafting/kinetics/large_cogwheel_from_little")

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
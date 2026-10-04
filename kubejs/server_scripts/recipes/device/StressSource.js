ServerEvents.recipes((event) => {
	let { kubejs, create } = event.getRecipes()
	let Inc = {
		ENGINE: "cmi:incomplete_steam_engine"
	}

	// 应力源
	// 风车轴承
	kubejs.shaped("create:windmill_bearing", [
		"X",
		"C",
		"M"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#forge:plates/stone",
	}).id("create:crafting/kinetics/windmill_bearing")

	// 水车
	kubejs.shaped("create:water_wheel", [
		" A ",
		"ABA",
		" A "
	], {
		A: "immersiveengineering:waterwheel_segment",
		B: Casing.ANDESITE
	}).id("create:crafting/kinetics/water_wheel")

	// 大水车
	kubejs.shaped("create:large_water_wheel", [
		"A A",
		" B ",
		"A A"
	], {
		A: "immersiveengineering:waterwheel_segment",
		B: "create:water_wheel"
	}).id("create:crafting/kinetics/large_water_wheel")

	kubejs.shaped("create:large_water_wheel", [
		"AAA",
		"ABA",
		"AAA"
	], {
		A: "immersiveengineering:waterwheel_segment",
		B: Casing.ANDESITE
	})

	// 小引擎
	kubejs.shaped("createdieselgenerators:diesel_engine", [
		"ABA",
		"BCB",
		"DDD"
	], {
		A: "createdieselgenerators:engine_piston",
		B: "#forge:plates/brass",
		C: "create:precision_mechanism",
		D: "tconstruct:seared_brick"
	}).id("creatediselgenerators:diesel_engine")

	// 中引擎
	kubejs.shaped("createdieselgenerators:large_diesel_engine", [
		"ABA",
		"BCB",
		"DDD"
	], {
		A: "createdieselgenerators:engine_piston",
		B: "#forge:plates/cast_iron",
		C: "cmi:light_engineering_mechanism",
		D: "tconstruct:scorched_brick"
	}).id("creatediselgenerators:large_diesel_engine")

	// 大引擎
	kubejs.shaped("createdieselgenerators:huge_diesel_engine", [
		"ABA",
		"CDC",
		"AEA"
	], {
		A: "#forge:plates/steel",
		B: "minecraft:flint_and_steel",
		C: "cmi:heavy_engineering_mechanism",
		D: "create:steam_engine",
		E: "create:fluid_pipe"
	}).id("creatediselgenerators:huge_diesel_engine")

	let materials = [
		{
			id: "bronze",
			block: "tconstruct:seared_bricks"
		},
		{
			id: "cast_iron",
			block: "tconstruct:scorched_bricks"
		},
		{
			id: "steel",
			block: "immersiveengineering:blastbrick"
		}
	]
	materials.forEach((material) => {
		let { id, block } = material

		let ingot = `#forge:ingots/${id}`
		let plate = `#forge:plates/${id}`

		// 太阳能锅炉
		kubejs.shaped(`cmi:${id}_solar_boiler`, [
			"ABA",
			"ACA",
			"DDD"
		], {
			A: [plate, ingot],
			B: "#forge:plates/silver",
			C: Mechanisms.COPPER.COM,
			D: block
		})

		// 锅炉
		kubejs.shaped(`steampowered:${id}_boiler`, [
			"AAA",
			"ACA",
			"ABA"
		], {
			A: [plate, ingot],
			B: "create:fluid_pipe",
			C: "create:fluid_tank"
		})

		// 固体燃烧室
		kubejs.shaped(`steampowered:${id}_burner`, [
			"AAA",
			"ABA",
			"CCC"
		], {
			A: [plate, ingot],
			B: Mechanisms.STONE.COM,
			C: block
		})

		// 流体燃烧室
		kubejs.shaped(`cmi:${id}_fluid_burner`, [
			"AAA",
			"ABA",
			"CCC"
		], {
			A: [plate, ingot],
			B: Mechanisms.COPPER.COM,
			C: block
		})

		// 蒸汽引擎
		kubejs.shaped(`steampowered:${id}_steam_engine`, [
			"ABE",
			"MCF",
			"ABE"
		], {
			A: plate,
			B: ingot,
			C: Casing.BRONZE,
			M: Mechanisms.STEAM.COM,
			E: "create:andesite_alloy",
			F: "create:shaft"
		})

		// 飞轮
		kubejs.shaped(`steampowered:${id}_flywheel`, [
			"AB ",
			"CFB",
			"AB "
		], {
			A: "createdieselgenerators:engine_piston",
			B: plate,
			C: Casing.BRONZE,
			F: "create:flywheel"
		})
	})

	// 蒸汽引擎
	create.sequenced_assembly("create:steam_engine", [
		Casing.COPPER
	], [
		create.deploying(Inc.ENGINE, [
			Inc.ENGINE,
			"cmi:bronze_mechanism"
		]),
		create.cutting(Inc.ENGINE, [
			Inc.ENGINE
		]),
		create.deploying(Inc.ENGINE, [
			Inc.ENGINE,
			"createdieselgenerators:engine_piston"
		]),
		create.deploying(Inc.ENGINE, [
			Inc.ENGINE,
			"#forge:plates/steel"
		]),
		create.deploying(Inc.ENGINE, [
			Inc.ENGINE,
			"create:precision_mechanism"
		])
	]).loops(1).transitionalItem(Inc.ENGINE)
		.id("create:crafting/kinetics/steam_engine")

})
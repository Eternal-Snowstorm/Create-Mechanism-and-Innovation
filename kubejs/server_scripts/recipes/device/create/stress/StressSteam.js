ServerEvents.recipes((event) => {
	let { kubejs, create } = event.getRecipes()
	let Inc = {
		ENGINE: "cmi:incomplete_steam_engine"
	}

	let materials = [
		{
			id: "bronze",
			block: "tconstruct:seared_bricks",
			namespace: "steam_letters"
		},
		{
			id: "cast_iron",
			block: "tconstruct:scorched_bricks",
			namespace: "cmi"
		},
		{
			id: "steel",
			block: "immersiveengineering:blastbrick",
			namespace: "cmi"
		}
	]

	materials.forEach((material) => {
		let { id, block, namespace } = material

		// 太阳能锅炉
		kubejs.shaped(`${namespace}:${id}_solar_boiler`, [
			"ABA",
			"ACA",
			"DDD"
		], {
			A: [`#forge:plates/${id}`, `#forge:ingots/${id}`],
			B: "#forge:plates/silver",
			C: Mechanisms.STEAM.COM,
			D: block
		})

		// 锅炉
		kubejs.shaped(`${namespace}:${id}_boiler`, [
			"AAA",
			"ABA",
			"ACA"
		], {
			A: [`#forge:plates/${id}`, `#forge:ingots/${id}`],
			B: "create:fluid_tank",
			C: "create:fluid_pipe"
		})

		// 固体燃烧室
		kubejs.shaped(`${namespace}:${id}_solid_burner`, [
			"AAA",
			"ABA",
			"CCC"
		], {
			A: [`#forge:plates/${id}`, `#forge:ingots/${id}`],
			B: Mechanisms.STONE.COM,
			C: block
		})

		// 流体燃烧室
		kubejs.shaped(`${namespace}:${id}_fluid_burner`, [
			"AAA",
			"ABA",
			"CCC"
		], {
			A: [`#forge:plates/${id}`, `#forge:ingots/${id}`],
			B: Mechanisms.COPPER.COM,
			C: block
		})

		// 蒸汽引擎
		kubejs.shaped(`${namespace}:${id}_steam_engine`, [
			"ABC",
			"DEF",
			"ABC"
		], {
			A: `#forge:plates/${id}`,
			B: `#forge:ingots/${id}`,
			C: "create:andesite_alloy",
			D: Mechanisms.STEAM.COM,
			E: Casing.BRONZE,
			F: "create:shaft"
		})

		// 飞轮
		kubejs.shaped(`${namespace}:${id}_steam_flywheel`, [
			"AB ",
			"CDB",
			"AB "
		], {
			A: "createdieselgenerators:engine_piston",
			B: `#forge:plates/${id}`,
			C: Casing.BRONZE,
			D: "create:flywheel"
		})
	})

	// 蒸汽引擎
	create.sequenced_assembly("create:steam_engine", [
		Casing.COPPER
	], [
		create.deploying(Inc.ENGINE, [
			Inc.ENGINE,
			Mechanisms.STEAM.COM
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
	]).transitionalItem(Inc.ENGINE)
		.loops(1)
		.id("create:crafting/kinetics/steam_engine")
})
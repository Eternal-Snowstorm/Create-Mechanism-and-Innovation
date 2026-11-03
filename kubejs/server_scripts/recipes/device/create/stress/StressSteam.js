// Create · 蒸汽动力（青铜/铸铁/钢三系锅炉与蒸汽引擎装配线）
ServerEvents.recipes((event) => {
	let { kubejs, create } = event.getRecipes()

	let Inc = "cmi:incomplete_steam_engine"

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
			"ACA",
			"ABA"
		], {
			A: [`#forge:plates/${id}`, `#forge:ingots/${id}`],
			B: "create:fluid_pipe",
			C: "create:fluid_tank"
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
			"ABE",
			"MCF",
			"ABE"
		], {
			A: `#forge:plates/${id}`,
			B: `#forge:ingots/${id}`,
			C: Casing.BRONZE,
			M: Mechanisms.STEAM.COM,
			E: "create:andesite_alloy",
			F: "create:shaft"
		})

		// 飞轮
		kubejs.shaped(`${namespace}:${id}_steam_flywheel`, [
			"AB ",
			"CFB",
			"AB "
		], {
			A: "createdieselgenerators:engine_piston",
			B: `#forge:plates/${id}`,
			C: Casing.BRONZE,
			F: "create:flywheel"
		})
	})



	// 蒸汽引擎
	create.sequenced_assembly("create:steam_engine", [
		Casing.COPPER
	], [
		create.deploying(Inc, [
			Inc,
			"cmi:bronze_mechanism"
		]),
		create.cutting(Inc, [
			Inc
		]),
		create.deploying(Inc, [
			Inc,
			"createdieselgenerators:engine_piston"
		]),
		create.deploying(Inc, [
			Inc,
			"#forge:plates/steel"
		]),
		create.deploying(Inc, [
			Inc,
			"create:precision_mechanism"
		])
	]).transitionalItem(Inc)
		.loops(1)
		.id("create:crafting/kinetics/steam_engine")
})

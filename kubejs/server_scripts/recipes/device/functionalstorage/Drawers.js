ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 镶框压缩抽屉配对关系
	const FRAMED_COMPACTING_PAIRS = [
		["simple_compacting_drawer", "framed_simple_compacting_drawer"],
		["compacting_drawer", "compacting_framed_drawer"]
	]

	// 物品抽屉
	Drawers.WOODS.forEach((drawer) => {
		Drawers.TYPES.forEach((type) => {
			// 拼接物品 id
			let drawerId = `${drawer.id}_${type}`

			// 执行配方
			kubejs.shaped(Item.of(drawerId, type), Drawers.PATTERNS[type], {
				A: `#minecraft:planks/${drawer.wood}`,
				B: Mechanisms.WOODEN.COM
			}).id(drawerId)
		})
	})

	// 流体抽屉
	Drawers.TYPES.forEach((type) => {
		let drawerId = `functionalstorage:fluid_${type}`

		kubejs.shaped(Item.of(drawerId, type), Drawers.PATTERNS[type], {
			A: "#forge:plates/iron",
			B: Mechanisms.COPPER.COM
		}).id(drawerId)
	})

	// 镶框抽屉
	Drawers.TYPES.forEach((type) => {
		let drawerId = `functionalstorage:framed_${type}`

		kubejs.shapeless(drawerId, [
			`#functionalstorage:drawers/${type}`,
			"#copycats:copycat_block"
		]).id(drawerId)
	})

	// 简易压缩抽屉
	kubejs.shaped("functionalstorage:simple_compacting_drawer", [
		"PAP",
		" M ",
		"PAP"
	], {
		P: "#forge:plates/stone",
		A: "tconstruct:pattern",
		M: Mechanisms.WOODEN.COM
	}).id("functionalstorage:simple_compacting_drawer")

	// 压缩抽屉
	kubejs.shaped("functionalstorage:compacting_drawer", [
		"PAP",
		"MIM",
		"PAP"
	], {
		P: "#forge:plates/stone",
		A: "tconstruct:pattern",
		M: Mechanisms.WOODEN.COM,
		I: Mechanisms.IRON.COM
	}).id("functionalstorage:compacting_drawer")

	// 镶框压缩抽屉
	FRAMED_COMPACTING_PAIRS.forEach(([base, framed]) => {
		let baseId = `functionalstorage:${base}`
		let framedId = `functionalstorage:${framed}`

		kubejs.shapeless(framedId, [
			baseId,
			"#copycats:copycat_block"
		]).id(framedId)
	})
})

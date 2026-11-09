// Create · 齿轮（青铜/铸铁/钢三系小齿轮与大齿轮）
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

		create.cutting(`2x cmi:incomplete_${material}_large_cogwheel`, [
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
})

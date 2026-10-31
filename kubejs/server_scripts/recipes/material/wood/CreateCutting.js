ServerEvents.recipes((event) => {
	let { kubejs, create, farmersdelight } = event.getRecipes()

	// 木板批量处理
	// event.forEachRecipe({
	// 	type: "minecraft:crafting_shapeless",
	// 	output: "#minecraft:planks",
	// 	input: "#minecraft:logs",
	// }, (recipes) => {
	// 	let outputItem = recipes.getOriginalRecipeResult().getId()
	// 	let inputItem = recipes.getOriginalRecipeIngredients()[0].getItemIds()[0]

	// 	kubejs.shapeless(Item.of(outputItem, 4), inputItem)
	// })

	// 木板切木台阶
	let cutSlabWood = [
		"minecraft:oak",
		"minecraft:dark_oak",
		"minecraft:birch",
		"minecraft:spruce",
		"minecraft:jungle",
		"minecraft:acacia",
		"minecraft:mangrove",
		"minecraft:cherry",
		"ad_astra:glacian",
		"thermal:rubberwood",
		"minecraft:crimson",
		"minecraft:warped",
		"ad_astra:aeronos",
		"ad_astra:strophar",
		"minecraft:bamboo",
		"mynethersdelight:powdery"
	]
	cutSlabWood.forEach((id) => {
		create.cutting(`2x ${id}_slab`, `${id}_planks`)
	})

	let cutSlabWoodTcon = [
		"tconstruct:greenheart",
		"tconstruct:skyroot",
		"tconstruct:enderbark",
		"tconstruct:bloodshroom",
	]
	cutSlabWoodTcon.forEach((id) => {
		create.cutting(`2x ${id}_planks_slab`, `${id}_planks`)
	})

	event.forEachRecipe({
		type: "create:cutting",
		input: "#minecraft:logs",
		output: "#forge:stripped_logs",
	}, (recipes) => {
		let outputItem = recipes.getOriginalRecipeResult().getId()
		let inputItem = recipes.getOriginalRecipeIngredients()[0].getItemIds()[0]
		let id = recipes.getId()

		if (inputItem == "thermal:rubberwood_log") {
			return
		}
		create.cutting([
			Item.of(outputItem, 1),
			"farmersdelight:tree_bark"
		], [
			inputItem
		]).id(id)
	})

	// 树苗
	WoodMaterials.forEach((wood) => {
		let { SAPLING, LEAVE } = wood

		create.cutting([
			LEAVE,
			Item.of("minecraft:stick", 2)
		], SAPLING)
	})

	create.cutting([
		"2x minecraft:stick"
	], [
		"#minecraft:wooden_slabs"
	])

	create.cutting([
		"thermal:stripped_rubberwood_log",
		"cmi:rubber_tree_bark"
	], [
		"thermal:rubberwood_log"
	]).id("create:cutting/runtime_generated/compat/thermal/rubberwood_log_to_stripped_rubberwood_log")
})
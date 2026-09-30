ServerEvents.recipes((event) => {
	// region define Recipe
	/**
	 * IE 园艺玻璃罩配方构造器
	 *
	 * @constructor
	 */
	function ClocheRecipeBuilder() {
		/** 
		 * @type {Internal.JsonObject}
		 */
		this.recipe = {
			type: "immersiveengineering:cloche"
		}
	}

	/**
	 * 输入作物
	 *
	 * @param {Internal.Ingredient_} item
	 * @returns {ClocheRecipeBuilder}
	 */
	ClocheRecipeBuilder.prototype.input = function (item) {
		this.recipe.input = Ingredient.of(item).toJson()
		return this
	}

	/**
	 * 渲染配置
	 *
	 * @param {"crop" | "generic"} type
	 * @param {Internal.Block_} block
	 * @returns {ClocheRecipeBuilder}
	 */
	ClocheRecipeBuilder.prototype.render = function (type, block) {
		this.recipe.render = {
			type: type,
			block: block
		}
		return this
	}

	/**
	 * 设置输出数组
	 *
	 * @param {Internal.JsonObject[]} results
	 * @returns {ClocheRecipeBuilder}
	 */
	ClocheRecipeBuilder.prototype.results = function (results) {
		this.recipe.results = results
		return this
	}

	/**
	 * 土壤
	 *
	 * @param {Internal.Ingredient_} soil
	 * @returns {ClocheRecipeBuilder}
	 */
	ClocheRecipeBuilder.prototype.soil = function (soil) {
		this.recipe.soil = Ingredient.of(soil).toJson()
		return this
	}

	/**
	 * 生长时间(tick)
	 *
	 * @param {number} time
	 * @returns {ClocheRecipeBuilder}
	 */
	ClocheRecipeBuilder.prototype.time = function (time) {
		this.recipe.time = time
		return this
	}

	/**
	 * 构建配方
	 */
	ClocheRecipeBuilder.prototype.build = function () {
		return event.custom(this.recipe)
	}

	/**
	 *
	 * @param {Internal.ItemStack_} id
	 * @param {number} [count=1]
	 * @returns 
	 */
	function setResult(id, count) {
		if (typeof count === "undefined") {
			count = 1
		}
		return Item.of(id, count).toJson()
	}

	// region add Recipes

	// 橡树
	new ClocheRecipeBuilder()
		.input("minecraft:oak_sapling")
		.render("generic", "minecraft:oak_sapling")
		.results([
			setResult("minecraft:oak_log"),
			setResult("minecraft:oak_leaves"),
			setResult("minecraft:oak_sapling"),
			setResult("minecraft:apple")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 白桦
	new ClocheRecipeBuilder()
		.input("minecraft:birch_sapling")
		.render("generic", "minecraft:birch_sapling")
		.results([
			setResult("minecraft:birch_log"),
			setResult("minecraft:birch_leaves"),
			setResult("minecraft:birch_sapling")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 云杉
	new ClocheRecipeBuilder()
		.input("minecraft:spruce_sapling")
		.render("generic", "minecraft:spruce_sapling")
		.results([
			setResult("minecraft:spruce_log"),
			setResult("minecraft:spruce_leaves"),
			setResult("minecraft:spruce_sapling")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 金合欢
	new ClocheRecipeBuilder()
		.input("minecraft:acacia_sapling")
		.render("generic", "minecraft:acacia_sapling")
		.results([
			setResult("minecraft:acacia_log"),
			setResult("minecraft:acacia_leaves"),
			setResult("minecraft:acacia_sapling")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 深色橡木
	new ClocheRecipeBuilder()
		.input("minecraft:dark_oak_sapling")
		.render("generic", "minecraft:dark_oak_sapling")
		.results([
			setResult("minecraft:dark_oak_log"),
			setResult("minecraft:dark_oak_leaves"),
			setResult("minecraft:dark_oak_sapling"),
			setResult("minecraft:apple")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 红树
	new ClocheRecipeBuilder()
		.input("minecraft:mangrove_propagule")
		.render("generic", "minecraft:mangrove_propagule")
		.results([
			setResult("minecraft:mangrove_log"),
			setResult("minecraft:mangrove_leaves"),
			setResult("minecraft:mangrove_roots"),
			setResult("minecraft:mangrove_propagule")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 樱花
	new ClocheRecipeBuilder()
		.input("minecraft:cherry_sapling")
		.render("generic", "minecraft:cherry_sapling")
		.results([
			setResult("minecraft:cherry_log"),
			setResult("minecraft:cherry_leaves"),
			setResult("minecraft:cherry_sapling")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 杜鹃
	new ClocheRecipeBuilder()
		.input("minecraft:azalea")
		.render("generic", "minecraft:azalea")
		.results([
			setResult("minecraft:oak_log"),
			setResult("minecraft:azalea_leaves"),
			setResult("minecraft:azalea")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 开花杜鹃
	new ClocheRecipeBuilder()
		.input("minecraft:flowering_azalea")
		.render("generic", "minecraft:flowering_azalea")
		.results([
			setResult("minecraft:oak_log"),
			setResult("minecraft:flowering_azalea_leaves"),
			setResult("minecraft:flowering_azalea")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 南洋
	new ClocheRecipeBuilder()
		.input("alexscaves:pewen_sapling")
		.render("generic", "alexscaves:pewen_sapling")
		.results([
			setResult("alexscaves:pewen_log"),
			setResult("alexscaves:pine_nuts"),
			setResult("alexscaves:pewen_sapling"),
			setResult("alexscaves:pewen_sap")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 远古
	new ClocheRecipeBuilder()
		.input("alexscaves:ancient_sapling")
		.render("generic", "alexscaves:ancient_sapling")
		.results([
			setResult("minecraft:jungle_log"),
			setResult("alexscaves:ancient_leaves"),
			setResult("alexscaves:ancient_sapling"),
			setResult("alexscaves:tree_star")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 荆棘
	new ClocheRecipeBuilder()
		.input("alexscaves:thornwood_sapling")
		.render("generic", "alexscaves:thornwood_sapling")
		.results([
			setResult("alexscaves:thornwood_log"),
			setResult("alexscaves:thornwood_sapling"),
			setResult("alexscaves:thornwood_branch")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 橡胶
	new ClocheRecipeBuilder()
		.input("thermal:rubberwood_sapling")
		.render("generic", "thermal:rubberwood_sapling")
		.results([
			setResult("thermal:rubberwood_log"),
			setResult("thermal:rubberwood_leaves"),
			setResult("thermal:rubberwood_sapling"),
			setResult("thermal:rubber")
		])
		.soil("#minecraft:dirt")
		.time(20 * 20)
		.build()

	// 大地粘液
	new ClocheRecipeBuilder()
		.input("tconstruct:earth_slime_sapling")
		.render("generic", "tconstruct:earth_slime_sapling")
		.results([
			setResult("tconstruct:greenheart_log"),
			setResult("tconstruct:earth_slime_leaves"),
			setResult("tconstruct:earth_slime_sapling"),
			setResult("minecraft:slime_ball")
		])
		.soil("tconstruct:earth_slime_dirt")
		.time(20 * 20)
		.build()

	// 碧空粘液
	new ClocheRecipeBuilder()
		.input("tconstruct:sky_slime_sapling")
		.render("generic", "tconstruct:sky_slime_sapling")
		.results([
			setResult("tconstruct:skyroot_log"),
			setResult("tconstruct:sky_slime_leaves"),
			setResult("tconstruct:sky_slime_sapling"),
			setResult("tconstruct:sky_slime_ball")
		])
		.soil("tconstruct:sky_slime_dirt")
		.time(20 * 20)
		.build()

	// 碧空粘液
	new ClocheRecipeBuilder()
		.input("tconstruct:ender_slime_sapling")
		.render("generic", "tconstruct:ender_slime_sapling")
		.results([
			setResult("tconstruct:enderbark_log"),
			setResult("tconstruct:ender_slime_leaves"),
			setResult("tconstruct:ender_slime_sapling"),
			setResult("tconstruct:ender_slime_ball")
		])
		.soil("tconstruct:ender_slime_dirt")
		.time(20 * 20)
		.build()

	// 血菌
	new ClocheRecipeBuilder()
		.input("tconstruct:blood_slime_sapling")
		.render("generic", "tconstruct:blood_slime_sapling")
		.results([
			setResult("tconstruct:bloodshroom_log"),
			setResult("tconstruct:blood_slime_leaves"),
			setResult("tconstruct:blood_slime_sapling"),
			setResult("tconstruct:ichor_slime_ball")
		])
		.soil("tconstruct:ichor_slime_dirt")
		.time(20 * 20)
		.build()

	// 稻米
	new ClocheRecipeBuilder()
		.input("#forge:seeds/rice")
		.render("crop", "kaleidoscope_cookery:rice_crop")
		.results([
			setResult("kaleidoscope_cookery:rice_panicle", 2)
		])
		.soil("minecraft:mud")
		.time(20 * 50)
		.build()

	// 番茄
	new ClocheRecipeBuilder()
		.input("#forge:seeds/tomato")
		.render("crop", "kaleidoscope_cookery:tomato_crop")
		.results([
			setResult("kaleidoscope_cookery:tomato", 4)
		])
		.soil("minecraft:dirt")
		.time(20 * 50)
		.build()
		.id("farmersdelight:integration/immersiveengineering/cloche/tomato")

	// 辣椒
	new ClocheRecipeBuilder()
		.input("#forge:seeds/chilipepper")
		.render("crop", "kaleidoscope_cookery:chili_crop")
		.results([
			setResult("kaleidoscope_cookery:red_chili", 2),
			setResult("kaleidoscope_cookery:green_chili")
		])
		.soil("minecraft:dirt")
		.time(20 * 50)
		.build()

	// 生菜
	new ClocheRecipeBuilder()
		.input("#forge:seeds/lettuce")
		.render("crop", "kaleidoscope_cookery:lettuce_crop")
		.results([
			setResult("kaleidoscope_cookery:lettuce", 2)
		])
		.soil("minecraft:dirt")
		.time(20 * 50)
		.build()

	// endregion

	// 草木灰肥料
	event.custom({
		type: "immersiveengineering:fertilizer",
		growthModifier: 1.2,
		input: {
			tag: "forge:plant_ash"
		}
	})

	// 金坷垃
	event.custom({
		type: "immersiveengineering:fertilizer",
		growthModifier: 2.5,
		input: {
			tag: "forge:dusts/fertilizer"
		}
	})
})
let $JsonObject =
	Java.loadClass("com.google.gson.JsonObject")
let $JsonArray =
	Java.loadClass("com.google.gson.JsonArray")

ServerEvents.recipes((event) => {
	event.custom({
		"type": "tconstruct:incremental_modifier",
		"allow_crystal": false,
		"amount_per_item": 1,
		"input": {
			"item": "create:experience_nugget"
		},
		"needed_per_level": 72,
		"result": "tconstruct:swiftstrike",
		"slots": {
			"upgrades": 1
		},
		"tools": {
			"tag": "tconstruct:modifiable/melee/weapon"
		}
	}).id("tconstruct:tools/modifiers/upgrade/swiftstrike_from_shard")

	event.custom({
		"type": "tconstruct:incremental_modifier",
		"allow_crystal": false,
		"amount_per_item": 9,
		"input": {
			"item": "create:experience_block"
		},
		"leftover": "create:experience_nugget",
		"needed_per_level": 72,
		"result": "tconstruct:swiftstrike",
		"slots": {
			"upgrades": 1
		},
		"tools": {
			"tag": "tconstruct:modifiable/melee/weapon"
		}
	}).id("tconstruct:tools/modifiers/upgrade/swiftstrike_from_block")

	/**
	 * 创建 TCon 输入材料 JSON
	 *
	 * 无 count：输出普通材料 {"tag": ...} / {"item": ...}
	 * 有 count：包装成 TCon SizedIngredient 格式
	 * {"ingredient": <材料>, "amount_needed": <数量>}
	 *
	 * @param {Internal.Ingredient_} ingredient
	 * @param {number} [count]
	 * @returns {Internal.JsonElement_ | {ingredient: Internal.JsonElement_, amount_needed: number}}
	 */
	function ingredientJson(ingredient, count) {
		let json = Ingredient.of(ingredient).toJson()

		if (typeof count !== "undefined") {
			return {
				ingredient: json,
				amount_needed: count
			}
		}

		return json
	}

	/**
	 * 创建 Modifier 输入材料 JSON
	 *
	 * 每个槽位只写一种材料, 支持:
	 * - `"minecraft:iron_ingot"`：单材料, 消耗 1 个
	 * - `["minecraft:iron_ingot", 3]`：单材料, 消耗 3 个
	 * - `["minecraft:iron_ingot", "#forge:ingots/gold"]`：同数量多选一
	 *
	 * 注意：匠魂不支持同一槽位不同备选带不同数量；
	 * 需要不同消耗时请拆成多条配方, 每槽写一个 [材料, 数量]
	 *
	 * @param {Internal.Ingredient_ | [Internal.Ingredient_, number] | Internal.Ingredient_[]} input
	 * @returns {Internal.JsonElement_}
	 */
	function inputJson(input) {
		// 单个 Ingredient
		if (!Array.isArray(input)) {
			return ingredientJson(input)
		}

		// [ingredient, count]
		if (input.length === 2 && typeof input[1] === "number") {
			return ingredientJson(input[0], input[1])
		}

		// [ingredient, ingredient, ...]：多选一（数量同为 1）
		let json = new $JsonObject()
		let array = new $JsonArray()

		input.forEach((ingredient) => {
			array["add(com.google.gson.JsonElement)"](Ingredient.of(ingredient).toJson())
		})

		json.add("ingredient", array)

		return json
	}

	/**
	 * TConstruct Modifier 配方构造器
	 *
	 * @constructor
	 * @param {string} modifier Modifier ID
	 * @returns {Internal.JsonElement_}
	 */
	function ModifierRecipeBuilder(modifier) {
		this.recipe = {
			type: "tconstruct:modifier",
			result: modifier
		}
		return this
	}

	/**
	 * 是否允许水晶
	 *
	 * @param {boolean} [allow]
	 * @returns {ModifierRecipeBuilder}
	 */
	ModifierRecipeBuilder.prototype.allowCrystal = function (allow) {
		if (typeof allow !== "undefined") {
			this.recipe.allow_crystal = allow
		}
		return this
	}

	/**
	 * 是否检查 Trait 等级
	 *
	 * @param {boolean} [check]
	 * @returns {ModifierRecipeBuilder}
	 */
	ModifierRecipeBuilder.prototype.checkTraitLevel = function (check) {
		if (typeof check !== "undefined") {
			this.recipe.check_trait_level = check
		}
		return this
	}

	/**
	 * 设置工具
	 *
	 * @param {Internal.Ingredient_ | Internal.Ingredient_[]} ingredients
	 * @returns {ModifierRecipeBuilder}
	 */
	ModifierRecipeBuilder.prototype.tools = function (ingredients) {
		if (Array.isArray(ingredients)) {
			let array = new $JsonArray()

			ingredients.forEach((ingredient) => {
				array["add(com.google.gson.JsonElement)"](Ingredient.of(ingredient).toJson())
			})

			this.recipe.tools = array
		} else {
			this.recipe.tools = Ingredient.of(ingredients).toJson()
		}

		return this
	}

	/**
	 * 设置 Modifier 等级
	 *
	 * @param {number} min
	 * @param {number} [max]
	 * @returns {ModifierRecipeBuilder}
	 */
	ModifierRecipeBuilder.prototype.level = function (min, max) {
		if (typeof max === "undefined") {
			this.recipe.level = min
			return this
		}

		this.recipe.level = {
			min: min,
			max: max
		}
		return this
	}

	/**
	 * 设置槽位
	 *
	 * @param {ModifierSlotType} type 
	 * @param {number} count
	 * @returns {ModifierRecipeBuilder}
	 */
	ModifierRecipeBuilder.prototype.slots = function (type, count) {
		this.recipe.slots = {}
		this.recipe.slots[type] = count
		return this
	}

	/**
	 * 设置输入材料
	 *
	 * 每个元素对应一个输入槽位, 支持:
	 * - `"minecraft:iron_ingot"`：单材料, 消耗 1 个
	 * - `["minecraft:iron_ingot", 3]`：单材料, 消耗 3 个
	 * - `["minecraft:iron_ingot", "#forge:ingots/gold"]`：同数量多选一
	 *
	 * @param {(Internal.Ingredient_ | [Internal.Ingredient_, number] | Internal.Ingredient_[])[]} inputs
	 * @returns {ModifierRecipeBuilder}
	 */
	ModifierRecipeBuilder.prototype.inputs = function (inputs) {
		this.recipe.inputs = inputs.map((input) => {
			return inputJson(input)
		})

		return this
	}

	/**
	 * 
	 * @param {ResourceLocation_} [id]
	 * @returns 
	 */
	ModifierRecipeBuilder.prototype.build = function (id) {
		if (typeof id === "undefined") {
			return event.custom(this.recipe)
		}
		return event.custom(this.recipe)
			.id(id)
	}

	// 死穴
	new ModifierRecipeBuilder("nebula_tinker:acupoint")
		.allowCrystal(true)
		.checkTraitLevel(true)
		.tools("#tconstruct:modifiable/held")
		.slots("abilities", 1)
		.level(1)
		.inputs([
			"cmi:blackstone_source_alpha",
			"cmi:blackstone_source_beta",
			"cmi:blackstone_source_gamma",
			"#forge:gems/charged_amethyst",
			"#forge:gems/charged_amethyst"
		])
		.build(NebulaTinker.loadResource("tinker/modifier/ability/acupoint"))

	// 狂乱
	new ModifierRecipeBuilder("nebula_tinker:frenzy")
		.allowCrystal(true)
		.checkTraitLevel(true)
		.level(1)
		.tools("#tconstruct:modifiable/held")
		.slots("abilities", 1)
		.inputs([
			"#forge:dusts/quartz",
			"#create:mechanisms/cobalt",
			"#forge:dusts/quartz",
			"#forge:gems/charged_amethyst",
			"#forge:gems/charged_amethyst"
		])
		.build(NebulaTinker.loadResource("tinker/modifier/ability/frenzy"))

	// 因果截断
	new ModifierRecipeBuilder("nebula_tinker:causal_truncation")
		.allowCrystal(true)
		.checkTraitLevel(true)
		.level(1)
		.tools("#tconstruct:modifiable/melee/primary")
		.slots("abilities", 1)
		.inputs([
			"#forge:plates/uranium",
			"#create:mechanisms/nether",
			"#forge:plates/uranium",
			"#forge:slimeball/blood",
			"#forge:slimeball/blood"
		])
		.build(NebulaTinker.loadResource("tinker/modifier/ability/causal_truncation"))

	// 发条
	new ModifierRecipeBuilder("nebula_tinker:clockwork")
		.allowCrystal(true)
		.checkTraitLevel(true)
		.level(1)
		.tools("#tconstruct:modifiable/melee")
		.slots("abilities", 1)
		.inputs([
			"cmi:andesite_mechanism"
		])
		.build(NebulaTinker.loadResource("tinker/modifier/ability/clockwork"))

	// 增强
	new ModifierRecipeBuilder("tconstruct:draconic")
		.allowCrystal(true)
		.checkTraitLevel(false)
		.tools("#tconstruct:modifiable")
		.inputs([
			"tconstruct:dragon_scale",
			"#forge:gears/titanium",
			"tconstruct:dragon_scale",
			"#forge:plates/titanium",
			"#forge:plates/titanium"
		])
		.build(NebulaTinker.loadResource("tinker/modifier/slotless/draconic"))

	// 铭刻
	new ModifierRecipeBuilder("tconstruct:writable")
		.allowCrystal(true)
		.checkTraitLevel(false)
		.tools("#tconstruct:modifiable")
		.inputs([
			"#forge:plates/silver",
			"minecraft:writable_book",
			"#forge:plates/silver",
			"ae2:sky_dust",
			"ae2:sky_dust"
		])
		.build(NebulaTinker.loadResource("tinker/modifier/slotless/writable"))

	// 擒王
	new ModifierRecipeBuilder("nebula_tinker:capture_king")
		.allowCrystal(true)
		.tools("#tconstruct:modifiable/held")
		.level(1, 5)
		.slots("abilities", 1)
		.inputs([
			Mechanisms.SCULK.COM
		])
		.build(NebulaTinker.loadResource("tinker/modifier/abilities/capture_king"))

	// 收束
	new ModifierRecipeBuilder("nebula_tinker:converge")
		.allowCrystal(true)
		.tools("#tconstruct:modifiable/ranged")
		.level(1, 3)
		.slots("upgrades", 1)
		.inputs([
			"thermal:rf_coil",
			"functionalstorage:redstone_upgrade",
			"thermal:rf_coil"
		])
		.build(NebulaTinker.loadResource("tinker/modifier/upgrades/converge"))

	// 生命回响
	new ModifierRecipeBuilder("nebula_tinker:death_echo")
		.allowCrystal(true)
		.tools("#tconstruct:modifiable/held")
		.level(1, 3)
		.slots("abilities", 1)
		.inputs([
			"#vintageimprovements:springs/blaze",
			"kaleidoscope_nether:blaze_heart",
			"#vintageimprovements:springs/blaze",
			"tconstruct:blazing_bone",
			"tconstruct:blazing_bone"
		])
		.build(NebulaTinker.loadResource("tinker/modifier/abilities/death_echo"))

	// 魔化
	new ModifierRecipeBuilder("nebula_tinker:demonization")
		.allowCrystal(true)
		.tools("#tconstruct:modifiable/held")
		.level(1, 3)
		.slots("upgrades", 1)
		.inputs([
			"nebula_tinker:demonization_stone",
			"#create:shadow_steel"
		])
		.build(NebulaTinker.loadResource("tinker/modifier/upgrades/demonization"))

	// 神化
	new ModifierRecipeBuilder("nebula_tinker:divinization")
		.allowCrystal(true)
		.tools("#tconstruct:modifiable/held")
		.level(1, 3)
		.slots("upgrades", 1)
		.inputs([
			"nebula_tinker:divinization_stone",
			"create:refined_radiance"
		])
		.build(NebulaTinker.loadResource("tinker/modifier/upgrades/divinization"))

	// 杀戮节奏
	new ModifierRecipeBuilder("nebula_tinker:killing_rhythm")
		.allowCrystal(true)
		.tools("#tconstruct:modifiable/held")
		.level(1, 3)
		.slots("abilities", 1)
		.inputs([
			"thermal_extra:soul_sand_dust",
			"cmi:resonant_tube",
			"thermal_extra:soul_sand_dust",
			"cmi:charged_amethyst",
			"cmi:charged_amethyst"
		])
		.build(NebulaTinker.loadResource("tinker/modifier/abilities/killing_rhythm"))

	// 喜水
	new ModifierRecipeBuilder("nebula_tinker:aquadynamic")
		.allowCrystal(true)
		.tools("#tconstruct:modifiable/held")
		.level(1, 3)
		.slots("abilities", 1)
		.inputs([
			"minecraft:prismarine_shard",
			"minecraft:heart_of_the_sea",
			"minecraft:prismarine_shard"
		])
		.build(NebulaTinker.loadResource("tinker/modifier/abilities/aquadynamic"))

	// 自动修复
	new ModifierRecipeBuilder("tinkersmossymodifier:auto_repair")
		.allowCrystal(true)
		.tools("#tconstruct:modifiable/durability")
		.level(1, 3)
		.slots("upgrades", 1)
		.inputs([
			"tinkersmossymodifier:ball_of_moss",
			Mechanisms.NATURE.COM,
			"tinkersmossymodifier:ball_of_moss"
		])
		.build(useEmiId("jei:/tinkersmossymodifier/tools/modifiers/upgrade/auto_repair"))

	// 长臂猿
	new ModifierRecipeBuilder("cmi:extendo")
		.allowCrystal(true)
		.tools("tconstruct:plate_chestplate")
		.slots("upgrades", 2)
		.level(1)
		.inputs([
			"create:deployer",
			"create:deployer"
		])
		.build()

	// 不毁
	new ModifierRecipeBuilder("tconstruct:unbreakable")
		.allowCrystal(true)
		.checkTraitLevel(true)
		.slots("abilities", 1)
		.level(1)
		.tools("#tconstruct:modifiable/durability")
		.inputs([
			"#forge:plates/dense_obsidian",
			Mechanisms.RAILWAY.COM,
			"#forge:plates/dense_obsidian",
			"#forge:ingots/netherite",
			"#forge:ingots/netherite"
		])
		.build("tconstruct:tools/modifiers/ability/unbreakable")

	// 潜水
	new ModifierRecipeBuilder("cmi:diving")
		.allowCrystal(true)
		.checkTraitLevel(true)
		.level(1)
		.tools("tconstruct:plate_helmet")
		.inputs([
			"#create:diving_helmets"
		])
		.build()

	// 延展
	new ModifierRecipeBuilder("tconstruct:expanded")
		.allowCrystal(true)
		.checkTraitLevel(true)
		.tools("#tconstruct:modifiable/held")
		.inputs([
			"#forge:plates/amethyst_bronze",
			"cmi:gold_mechanism",
			"#forge:plates/amethyst_bronze",
			"#vintageimprovements:springs/amethyst_bronze",
			"#vintageimprovements:springs/amethyst_bronze"
		])
		.build()
		.id("tconstruct:tools/modifiers/ability/expanded")

	let luckRecipes = [
		[1, "#forge:dyes/blue", true],
		[2, "#forge:gems/diamond", false],
		[3, "#forge:storage_blocks/diamond", false]
	]

	let lapisInputs = [
		["#forge:gems/lapis", 63],
		["#forge:storage_blocks/lapis", 7]
	]

	let luckTools = [
		"#tconstruct:modifiable/melee/weapon",
		"#tconstruct:modifiable/harvest",
		"#tconstruct:modifiable/ranged/launcher"
	]

	luckRecipes.forEach(([level, core, hasSlots]) => {
		lapisInputs.forEach(([lapisTag, count]) => {
			let builder = new ModifierRecipeBuilder("tconstruct:luck")
				.allowCrystal(true)
				.level(level)
				.tools(luckTools)
				.inputs([
					core,
					[lapisTag, count],
					[lapisTag, count],
					[lapisTag, count],
					[lapisTag, count]
				])

			if (hasSlots) {
				builder.slots("abilities", 1)
			}

			builder.build()
		})
	})
})
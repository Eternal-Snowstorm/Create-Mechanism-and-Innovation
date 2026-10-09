// priority: 10
let $MekanismAPI =
	Java.loadClass("mekanism.api.MekanismAPI")
let $Slurry =
	Java.loadClass("mekanism.api.chemical.slurry.Slurry")
let $Gas =
	Java.loadClass("mekanism.api.chemical.gas.Gas")
let $InfuseType =
	Java.loadClass("mekanism.api.chemical.infuse.InfuseType")
let $Chemical =
	Java.loadClass("mekanism.api.chemical.Chemical")
let $Pigment =
	Java.loadClass("mekanism.api.chemical.pigment.Pigment")

/**
 * 设置命名空间优先级
 * 越往前的命名空间优先级越高
 */
let namespacePriority = [
	"cmi",
	"vintageimprovements",
	"thermal",
	"thermalconstruct",
	"thermalendergy",
	"thermal_extra",
	"create",
	"createdeco",
	"ae2",
	"neoecoae",
	"ad_astra",
	"createaddition",
	"immersiveengineering",
	"mekanism",
	"alexscaves",
	"tconstruct",
	"minecraft"
]

/**
 * 
 * @param {Internal.Ingredient_} tag 
 * 
 * @returns 
 */
function getHighPriorityItem(tag) {
	/**
	 * @type {string}
	 */
	let currentNamespace = null
	/**
	 * @type {string}
	 */
	let outputId = null
	/**
	 * @type {string}
	 */
	let priorityValue = null

	if (!Ingredient.isNotNull(tag)) {
		return "cmi:cmi_icon"
	}

	let ids = null

	/*
	 * count 对本函数无用(返回的是物品 id 字符串), 且 withCount 返回的
	 * IngredientWithCount 没有 getItemIds 方法, 统一走 getItemIds()
	 */
	ids = Ingredient.of(tag)
		.getItemIds()
		.toArray()

	// 遍历获取到的tag下每个物品的命名空间
	if (ids.length > 0) {
		ids.forEach((id) => {
			const itemId = String(id)

			if (itemId !== "minecraft:barrier") {
				currentNamespace = ResourceLocation.parse(itemId).getNamespace()

				for (let i = 0; i < namespacePriority.length; i++) {
					if (currentNamespace === namespacePriority[i]) {
						if (priorityValue == null || i < priorityValue) {
							outputId = itemId
							priorityValue = i
						}
						break
					}
				}
			}
		})
		return outputId
	}
	return "cmi:cmi_icon"
}

/**
 * 
 * @param {Internal.Ingredient_} ingredient 
 * @param {number} [count] 
 * @returns 
 */
function highPriorityItem(ingredient, count) {
	if (count == null) {
		return Item.of(getHighPriorityItem(ingredient))
	}
	return Item.of(getHighPriorityItem(ingredient), count)
}

/**
 * 解析金属对应的熔融流体 id
 * 
 * 按命名空间直接推导流体 id, 用Fluid.exists(流体注册表, 模组加载时即就绪)校验
 *  
 * ServerEvents.recipes 触发时机早于流体 tag 加载, tag 表为空导致全部返回 null
 *
 * @param {string} metal 金属 id
 * @returns
 */
function resolveMoltenFluid(metal) {
	let namespace = CmiMetal.getMetal(metal).getNamespace()

	// 按命名空间标记优先, 其余作为兜底
	let candidates = []
	if (namespace === "t") {
		candidates.push(`thermalconstruct:molten_${metal}`)
	} else if (namespace === "c") {
		candidates.push(`cmi:molten_${metal}`)
	} else {
		candidates.push(`tconstruct:molten_${metal}`)
	}
	candidates.push(`tconstruct:molten_${metal}`)
	candidates.push(`cmi:molten_${metal}`)
	candidates.push(`thermalconstruct:molten_${metal}`)

	for (let i = 0; i < candidates.length; i++) {
		let id = candidates[i]

		if (Fluid.exists(id)) {
			return id
		}
	}

	return null
}

/**
 * @param {"slurry" | "gas" | "infuse_type" | "pigment"} type
 * @param {Internal.ResourceKey<Internal.Registry>} registryName
 * @param {*} clazz
 */
function makeType(type, registryName, clazz) {
	let of = makeOf(type)

	return {
		/**
		 * @param {ResourceLocation_} id
		 * @returns {boolean}
		 */
		exists(id) {
			return RegistryInfo.of(registryName, clazz).hasValue(id)
		},

		/**
		 * @param {string} id
		 * @param {number} [amount=1000]
		 * @returns {Object}
		 */
		of(id, amount) {
			return of(id, amount)
		}
	}
}

const MekType = {
	Slurry: makeType(
		"slurry",
		$MekanismAPI.SLURRY_REGISTRY_NAME,
		$Slurry
	),
	Gas: makeType(
		"gas",
		$MekanismAPI.GAS_REGISTRY_NAME,
		$Gas
	),
	InfuseType: makeType(
		"infuse_type",
		$MekanismAPI.INFUSE_TYPE_REGISTRY_NAME,
		$InfuseType
	),
	Pigment: makeType(
		"pigment",
		$MekanismAPI.PIGMENT_REGISTRY_NAME,
		$Pigment
	)
}

/**
 * @param {string} type
 * @returns {(id: string, amount?: number) => Object}
 */
function makeOf(type) {
	return function (id, amount) {
		let obj = {}
		obj[type] = id
		obj.amount = amount == null ? 1000 : amount
		return obj
	}
}

const IEIngredient = {
	/**
	 * 
	 * @param {Internal.ItemStack_} input 
	 * @returns 
	 */
	of(input) {
		if (Array.isArray(input)) {
			let count = 0
			let inps = []

			for (let i of input) {
				let item = Item.of(i, 1).toJson()

				if (count === 0) {
					count = Item.of(i)
						.getCount()
				}
				inps.push(item)
			}
			return {
				base_ingredient: inps,
				count: count
			}
		}

		return {
			base_ingredient: Item.of(input)
				.withCount(1)
				.toJson(),
			count: Item.of(input)
				.getCount()
		}
	}
}

const SmeltingRecipes = {
	/**
	 * 添加熔炼配方: 熔炉+高炉+烟熏
	 *
	 * @param {Internal.RecipesEventJS} event 配方事件
	 * @param {OutputItem_} output 输出产物
	 * @param {InputItem_} input 输入成分
	 * @returns
	 */
	all(event, output, input) {
		let { minecraft } = event.getRecipes()

		let smelting = minecraft
			.smelting(output, input)
			.cookingTime(20 * 10)

		let blasting = minecraft
			.blasting(output, input)
			.cookingTime(20 * 5)

		let smoking = minecraft
			.smoking(output, input)
			.cookingTime(20 * 5)

		return {
			smelting: smelting,
			blasting: blasting,
			smoking: smoking
		}
	},

	/**
	 * 注册：高炉 + 熔炉
	 *
	 * @param {Internal.RecipesEventJS} event 配方事件
	 * @param {OutputItem_} output 输出产物
	 * @param {InputItem_} input 输入成分
	 * @returns 
	 */
	blasting(event, output, input) {
		let { minecraft } = event.getRecipes()

		let blasting = minecraft
			.blasting(output, input)
			.cookingTime(20 * 5)

		let smelting = minecraft
			.smelting(output, input)
			.cookingTime(20 * 10)

		return {
			blasting: blasting,
			smelting: smelting
		}
	},

	/**
	 * 注册：烟熏 + 熔炉
	 *
	 * @param {Internal.RecipesEventJS} event 配方事件
	 * @param {OutputItem_} output 输出产物
	 * @param {InputItem_} input 输入成分
	 * @returns 
	 */
	smoking(event, output, input) {
		let { minecraft } = event.getRecipes()

		let smelting = minecraft
			.smelting(output, input)
			.cookingTime(20 * 10)

		let smoking = minecraft
			.smoking(output, input)
			.cookingTime(20 * 5)

		return {
			smelting: smelting,
			smoking: smoking
		}
	}
}

/**
 * 
 * @param {Internal.Ingredient_} tag 
 * @returns 
 */
function getItemsUnderTag(tag) {
	if (!Ingredient.isNotNull(tag)) {
		console.error(`${CmiGlobal.DEBUG_MESSAGE} Tag item search error`)
		return null
	}
	let ids = Ingredient.of(tag).getItemIds()
	if (ids.length < 1) {
		console.error(`${CmiGlobal.DEBUG_MESSAGE} Tag item search error`)
		return null
	}
	return ids
}

let removedRecipesSet = new Set()

function removedRecipes() {
	return removedRecipesSet
}

/**
 * 收集当前配方事件中已经失效的"原始配方"ID.
 *
 * 失效分两种:
 *   1. 被删除 (removeRecipe / event.remove 等);
 *   2. 被同 ID 的新配方覆盖 —— KubeJS 生成最终配方表时 addedRecipes 会覆盖
 *      originalRecipes, 旧的那一份就不再生效了.
 *
 * 为什么代理脚本需要它: `event.forEachRecipe` 遍历的是 KubeJS 载入时的原始
 * 配方表 (RecipesEventJS#originalRecipes), 它只会滤掉"本次事件里被标记 removed"
 * 的配方; 而通过 `event.remove` 之外的途径失效(典型: 被同 ID 覆盖)的旧配方
 * 依然会被遍历到, 不额外过滤就会把已经失效的配方一起代理出去.
 *
 * 用法见 recipes/mod/mbd2/proxy/*.js
 *
 * @param {Internal.RecipesEventJS} event 
 * @returns {Set<string>} 失效的原始配方 ID
 */
function deadOriginalRecipeIds(event) {
	let ids = new Set()

	for (let id of removedRecipes()) {
		ids.add(id)
	}

	for (let recipe of event.addedRecipes) {
		ids.add(String(recipe.getId()))
	}

	return ids
}

/**
 *
 * @param {Internal.RecipeJS_} recipe 
 * @returns {Internal.JsonObject_}
 */
function materializeRecipeJson(recipe) {
	let json = recipe.json

	// 数据包配方 / event.custom 配方: json 本来就是最终内容
	if (json == null || !json.has("type") || String(json.get("type").getAsString()) !== "unknown") {
		return json
	}

	try {
		recipe.serialize()
	} catch (error) {
		console.warn(`[MBD2 Proxy] Failed to serialize recipe ${recipe.getId()}: ${error}`)
	}

	return recipe.json
}

/**
 *
 * @param {Internal.RecipesEventJS_} event 
 * @param {string} type 配方类型 ID
 * @param {Internal.Consumer_<Internal.RecipeJS_>} consumer 
 */
function forEachLiveRecipe(event, type, consumer) {
	let deadIds = deadOriginalRecipeIds(event)

	// id(String) -> 当前生效的那份配方
	let liveRecipes = new Map()

	event.forEachRecipe({
		type: type
	}, (recipe) => {
		let id = String(recipe.getId())

		if (deadIds.has(id)) {
			console.log(`[MBD2 Proxy] Skipping dead recipe: ${id}`)
			return
		}

		liveRecipes.set(id, recipe)
	})

	let added = []

	for (let recipe of event.addedRecipes) {
		added.push(recipe)
	}

	for (let recipe of added) {
		if (String(recipe.getType()) !== type) {
			continue
		}

		if (materializeRecipeJson(recipe) == null) {
			console.warn(`[MBD2 Proxy] Skipping recipe without json: ${recipe.getId()}`)
			continue
		}

		liveRecipes.set(String(recipe.getId()), recipe)
	}

	liveRecipes.forEach((recipe) => {
		consumer(recipe)
	})
}

/**
 *
 * @param {string} name 
 * @param {Internal.RecipesEventJS_} event 
 * @param {Internal.Consumer_<Internal.RecipesEventJS_>} fn 
 */
function safeProxy(name, event, fn) {
	try {
		fn(event)
	} catch (error) {
		console.error(`[MBD2 Proxy] ${name} failed: ${error}`)
	}
}

/**
 *
 * @param {Internal.JsonObject_} json 
 * @param {string} key 
 * @returns {Internal.JsonArray_}
 */
function jsonArrayOf(json, key) {
	if (json == null || !json.has(key)) {
		return null
	}

	return json.get(key).getAsJsonArray()
}

/**
 * 
 *  同时兼容正常配方ID和 EMI Copy 出来的假ID
 *
 *  @example
 *  removeRecipe(event, "treetap:water_from_crying_obsidian")
 *  removeRecipe(event, [
 *     "treetap:water_from_crying_obsidian",
 *     "minecraft:iron_ingot"
 *  ])
 * @param {Internal.RecipesEventJS} event 
 * @param {string | string[]} ids 
 */
function removeRecipe(event, ids) {
	(ids instanceof Array ? ids : [ids])
		.forEach((id) => {
			let realId = id

			// EMI/JEI Copy ID 修正
			if (id.startsWith("jei:/")) {
				realId = id
					.replace("jei:/", "")
					.replace("/", ":")
			}

			removedRecipes().add(realId)
			event.remove({
				id: realId
			})
		})
}

/**
 * 用于修正 EMI 返回的配方 ID.
 *
 * 主要用于调用 `RecipeJS#id(ResourceLocation_)` 直接替换配方时
 * 
 * EMI 所复制的的 ID 可能为 `jei:/namespace/path`
 * 
 * 无法直接作为 `RecipeJS#id(ResourceLocation_)` 的参数使用, 因此需要先进行转换.
 *
 * @example
 * ServerEvents.recipes((event) => {
 * 	let { kubejs } = event.getRecipes()
 *
 * 	kubejs.shapeless("minecraft:stone", [
 * 		"minecraft:apple",
 * 		"minecraft:gold_ingot"
 * 	]).id(useEmiId("jei:/minecraft/stone"))
 * })
 *
 * @param {ResourceLocation_} id 配方 ID.
 * @returns {ResourceLocation_} 转换后的配方 ID.
 */
function useEmiId(id) {
	id = String(id)

	if (id.startsWith("jei:/")) {
		id = id.substring(5)
		id = id.replace("/", ":")
	}

	return ResourceLocation.tryParse(id)
}

const NativeEvent = {
	/**
	  * 
	  * @template T
	  * @param {T} event 
	  * @param {Internal.Consumer_<InstanceType<T>>} handler 
	  * @returns
	  */
	of(event, handler) {
		NativeEvents.onEvent(event, handler)
	}
}
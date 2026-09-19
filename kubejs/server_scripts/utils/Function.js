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
 * 让"用 builder 新建的配方"的 json 变成可读内容.
 *
 * KubeJS 的坑: `create.mixing(...)` / `tconstruct.melting(...)` /
 * `immersiveengineering.arc_furnace(...)` 这类 builder 配方, 在
 * ServerEvents.recipes 执行期间 recipe.json 里只有一个 {"type":"unknown"}
 * 占位对象 —— 真正的字段要等事件结束后 post() -> createRecipe() -> serialize()
 * 才写进去 (见 RecipeConstructor$Factory#create 与 RecipeJS#createRecipe).
 *
 * 所以事件期间直接读 builder 配方的 json 只会拿到空内容, 取子字段还会直接抛
 * TypeError 把整轮代理带崩. 这里遇到占位对象就主动 serialize() 一次.
 * 提前写没有副作用: createRecipe() 之后会把 type 覆盖成正确值.
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
 * 遍历所有"当前真正生效"的指定类型配方 —— 生成代理配方统一走这个.
 *
 * 不能直接用裸的 `event.forEachRecipe`, 原因是:
 *   1. 它遍历的是 KubeJS 载入时的原始配方表 (RecipesEventJS#originalRecipes),
 *      被同 ID 新配方覆盖的旧配方依然会被遍历到 —— 用 deadOriginalRecipeIds 滤掉;
 *   2. 被覆盖 / 由 KubeJS 新建的配方只存在于 addedRecipes 里, 遍历不到 —— 补一遍;
 *   3. addedRecipes 里 builder 建的配方 json 还是占位对象 —— 用
 *      materializeRecipeJson 先物化, 否则读出来是空配方甚至直接抛错.
 *
 * @param {Internal.RecipesEventJS_} event 
 * @param {string} type 配方类型 ID
 * @param {function(Internal.RecipeJS_)} consumer 
 */
function forEachLiveRecipe(event, type, consumer) {
	let deadIds = deadOriginalRecipeIds(event)

	event.forEachRecipe({
		type: type
	}, (recipe) => {
		let id = String(recipe.getId())

		if (deadIds.has(id)) {
			console.log(`[MBD2 Proxy] Skipping dead recipe: ${id}`)
			return
		}

		consumer(recipe)
	})

	// 先复制一份: 代理配方自身也会写进 addedRecipes,
	// 直接在 Java 集合上边遍历边加会抛 ConcurrentModificationException.
	let added = []

	for (let recipe of event.addedRecipes) {
		added.push(recipe)
	}

	for (let recipe of added) {
		if (String(recipe.getType()) !== type) {
			continue
		}

		// builder 建的配方此时 json 还只是 {"type":"unknown"} 占位, 必须先物化
		if (materializeRecipeJson(recipe) == null) {
			console.warn(`[MBD2 Proxy] Skipping recipe without json: ${recipe.getId()}`)
			continue
		}

		consumer(recipe)
	}
}

/**
 * 跑一个代理函数, 单个出错不影响其它代理.
 *
 * KubeJS 会把异常抛出整个 ServerEvents.recipes 回调, 所以一条配方解析失败就
 * 会让同一个监听器里后面所有代理一起消失(日志里只留一行 ERROR, 极难发现).
 *
 * @param {string} name 
 * @param {Internal.RecipesEventJS_} event 
 * @param {function(Internal.RecipesEventJS_)} fn 
 */
function safeProxy(name, event, fn) {
	try {
		fn(event)
	} catch (error) {
		console.error(`[MBD2 Proxy] ${name} failed: ${error}`)
	}
}

/**
 * 安全取 json 里的数组字段, 取不到返回 null.
 *
 * 代理脚本的遍历范围现在包含 addedRecipes, 配方来源比以前杂, 直接写
 * `json.get(key).getAsJsonArray()` 一旦碰上缺字段就会抛 TypeError, 而
 * KubeJS 会把异常抛出整个 ServerEvents.recipes 回调 —— 后面所有代理都会
 * 跟着一起消失, 所以统一在这里兜一层.
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
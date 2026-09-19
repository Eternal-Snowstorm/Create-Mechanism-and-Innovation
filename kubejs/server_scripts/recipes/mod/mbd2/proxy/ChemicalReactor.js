// priority: -100
//
// 必须最后加载.
//
// ServerEvents.recipes 的各个回调是按"脚本加载顺序"依次执行的, 而 KubeJS 是按
// 文件系统遍历顺序加载脚本的(Windows 上近似大小写不敏感的字典序), 于是
// recipes/RemoveAll.js 这类删除脚本反而排在 recipes/mod/mbd2/proxy/* 之后才跑.
// 之前代理脚本执行时, 删除 / 覆盖都还没发生, 所以会把已经失效的配方一起代理出去.
// priority 越小加载越晚, -100 保证所有删除 / 覆盖 / 替换脚本都执行完毕.
ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	let idBlackList = [
		"palettes",
		"dye",
		"concrete",
		"compat/tconstruct"
	]

	/**
	 * 
	 * @param {Internal.RecipeJS_} recipe 
	 */
	function addProxyRecipe(recipe) {
		let json = recipe.json
		let id = String(recipe.getId())

		if (json == null) {
			return
		}

		if (idBlackList.some((keyword) => {
			return id.includes(keyword)
		})) {
			return
		}

		let ingredients = jsonArrayOf(json, "ingredients")
		let results = jsonArrayOf(json, "results")

		if (results == null && json.has("result")) {
			results = [json.get("result")]
		}

		// 缺输入或缺产物的配方代理过去也是坏配方, 直接跳过
		if (ingredients == null || results == null) {
			console.warn(`[MBD2 Proxy] Skipping malformed mixing recipe: ${id}`)
			return
		}

		let builder = cmi.chemical_reactor()

		addIngredients(builder, ingredients)
		addResults(builder, results)

		builder.duration(20 * 5)
			.perTick((recipe) => {
				recipe.inputFE(50)
			})
			.id(`${id}_mbd2_proxy`)
	}

	// 统一遍历"当前真正生效"的 create:mixing 配方:
	// 滤掉被删除 / 被同 ID 覆盖的旧配方, 并补上被覆盖 / 新建的那一份
	// (具体语义见 utils/Function.js 里的 forEachLiveRecipe)
	safeProxy("chemical_reactor", event, () => {
		forEachLiveRecipe(event, "create:mixing", (recipe) => {
			addProxyRecipe(recipe)
		})
	})
})

/**
 * 
 * @param {GsonObject_} json 
 * @param {string} key 
 * @param {number} fallback 
 * @returns 
 */
function getInt(json, key, fallback) {
	return json.has(key) ? json.get(key).getAsInt() : fallback
}

/**
 * 
 * @param {GsonObject_} json 
 * @param {string} key 
 * @param {number} fallback 
 * @returns 
 */
function getFloat(json, key, fallback) {
	return json.has(key) ? json.get(key).getAsFloat() : fallback
}

/**
 * 
 * @param {string} id 
 * @param {number} count 
 * @returns 
 */
function stackString(id, count) {
	return count > 1 ? `${count}x ${id}` : id
}

/**
 * 
 * @param {Internal.JsonElement_} entry 
 * @returns 
 */
function itemIngredientOf(entry) {
	if (entry.isJsonArray()) {
		let alternatives = []

		for (let alternative of entry.getAsJsonArray()) {
			let ingredient = itemIngredientOf(alternative)

			if (ingredient !== null) {
				alternatives.push(ingredient)
			}
		}

		return alternatives
	}

	if (!entry.isJsonObject()) {
		return null
	}

	let json = entry.getAsJsonObject()
	let count = getInt(json, "count", 1)

	if (json.has("item")) {
		return stackString(json.get("item").getAsString(), count)
	}
	if (json.has("tag")) {
		return stackString(`#${json.get("tag").getAsString()}`, count)
	}
}

/**
 * 
 * @param {Internal.JsonElement_} entry 
 * @returns 
 */
/**
 *
 * @param {Internal.JsonElement_} entry
 * @returns
 */
function inputFluidOf(entry) {
	if (!entry.isJsonObject()) {
		return null
	}

	let json = entry.getAsJsonObject()
	let amount = getInt(json, "amount", 1000)

	if (json.has("fluid")) {
		return Fluid.of(json.get("fluid").getAsString(), amount)
	}

	if (json.has("fluidTag")) {
		let tag = json.get("fluidTag").getAsString()

		return MBDFluidIngredient.ofTagId(tag, amount)
	}

	return null
}

/**
 * 
 * @param {Internal.JsonElement_} entry 
 * @returns 
 */
function outputFluidOf(entry) {
	if (!entry.isJsonObject()) {
		return null
	}

	let json = entry.getAsJsonObject()

	if (!json.has("fluid")) {
		return null
	}

	return Fluid.of(
		json.get("fluid").getAsString(),
		getInt(json, "amount", 1000)
	)
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS} builder 
 * @param {Internal.Iterable_<Internal.JsonElement_>} ingredients 
 */
function addIngredients(builder, ingredients) {
	for (let entry of ingredients) {
		let inputFluid = inputFluidOf(entry)

		if (inputFluid !== null) {
			builder.inputFluids(inputFluid)
			continue
		}

		let inputItem = itemIngredientOf(entry)

		if (inputItem !== null) {
			builder.inputItems(inputItem)
		}
	}
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS} builder 
 * @param {Internal.Iterable_<Internal.JsonElement_>} results 
 */
function addResults(builder, results) {
	for (let entry of results) {
		let outputFluid = outputFluidOf(entry)

		if (outputFluid !== null) {
			builder.outputFluids(outputFluid)
			continue
		}

		let outputItem = itemIngredientOf(entry)

		if (outputItem !== null) {
			let chance = entry.isJsonObject()
				? getFloat(entry.getAsJsonObject(), "chance", 1)
				: 1

			if (chance !== 1) {
				builder.chance(chance)
			}

			builder.outputItems(outputItem)

			if (chance !== 1) {
				builder.chance(1)
			}
		}
	}
}
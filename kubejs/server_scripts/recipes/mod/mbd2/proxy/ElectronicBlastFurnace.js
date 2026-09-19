// priority: -100
//
// 必须最后加载.
//
// ServerEvents.recipes 的各个回调是按"脚本加载顺序"依次执行的, 而 KubeJS 是按
// 文件系统遍历顺序读脚本的, recipes/RemoveAll.js 这类删除脚本反而排在
// recipes/mod/mbd2/proxy/* 之后才跑. 之前代理脚本执行时删除 / 覆盖都还没发生,
// 于是把已经失效的配方也一起代理了.
// priority 越小加载越晚, -100 保证所有删除 / 覆盖 / 替换脚本都执行完毕.
ServerEvents.recipes((event) => {
	// 逐个兜错: 一个代理抛异常不该把后面几个一起带走
	safeProxy("ebf/arc_furnace", event, proxyArcFurnace)
	safeProxy("ebf/melting", event, proxyMelting)
	safeProxy("ebf/alloy", event, proxyAlloy)
	safeProxy("ebf/alloying", event, proxyAlloying)
	safeProxy("ebf/car_kiln", event, proxyCarKiln)
	safeProxy("ebf/rotary_kiln", event, proxyRotaryKiln)
})

/**
 * 
 * @param {Internal.RecipesEventJS_} event 
 */
function proxyArcFurnace(event) {
	let { cmi } = event.getRecipes()

	forEachLiveRecipe(event, "immersiveengineering:arc_furnace", (recipe) => {
		let json = sourceJsonOf(recipe)
		let id = recipe.getId()
		let results = jsonArrayOf(json, "results")

		// 没有产物的话代理过去也是坏配方
		if (results == null) {
			console.warn(`[MBD2 Proxy] Skipping arc_furnace recipe without results: ${id}`)
			return
		}

		let builder = cmi.electronic_blast_furnace()

		addIngredient(builder, json.get("input"))

		if (json.has("additives")) {
			addIngredients(builder, jsonArrayOf(json, "additives"))
		}

		addResults(builder, results)

		builder.duration(getInt(json, "time", 200))
			.perTick((recipe) => {
				let energy = getInt(json, "energy", 0)
				let time = getInt(json, "time", 1)

				recipe.inputFE(Math.ceil(energy / time))
			})
			.id(`${id}_mbd2_proxy`)
	})
}

/**
 * 
 * @param {Internal.RecipesEventJS_} event 
 */
function proxyMelting(event) {
	let { cmi } = event.getRecipes()

	forEachLiveRecipe(event, "tconstruct:melting", (recipe) => {
		let json = sourceJsonOf(recipe)
		let id = recipe.getId()
		let ingredientJson = json.get("ingredient")

		if (id.includes("cluster")) {
			return
		}

		let builder = cmi.electronic_blast_furnace()

		addIngredient(builder, ingredientJson, id)

		addFluidResult(builder, json.get("result"))

		addFluidResults(builder, jsonArrayOf(json, "byproducts"))

		builder.duration(getInt(json, "time", 100))
			.id(`${id}_mbd2_proxy`)
	})
}

/**
 * 
 * @param {Internal.RecipesEventJS_} event 
 */
function proxyAlloy(event) {
	let { cmi } = event.getRecipes()

	forEachLiveRecipe(event, "tconstruct:alloy", (recipe) => {
		let json = sourceJsonOf(recipe)
		let id = recipe.getId()
		let inputs = jsonArrayOf(json, "inputs")

		if (inputs == null) {
			console.warn(`[MBD2 Proxy] Skipping alloy recipe without inputs: ${id}`)
			return
		}

		let builder = cmi.electronic_blast_furnace()

		addFluidIngredients(builder, inputs)

		addFluidResult(builder, json.get("result"))

		builder.id(`${id}_mbd2_proxy`)
	})
}

/**
 *
 * @param {Internal.RecipesEventJS_} event
 */
function proxyAlloying(event) {
	// 数据包里的原有配方 + 手写 event.custom / KubeJS 新建的配方都要代理,
	// forEachLiveRecipe 已经同时覆盖这两种来源, 并滤掉失效的旧配方
	forEachLiveRecipe(event, "ad_astra:alloying", (recipe) => {
		proxyAlloyingRecipe(event, recipe)
	})
}

ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()
})

/**
 * @param {Internal.RecipesEventJS_} event
 * @param {Internal.RecipeJS_} recipe
 */
function proxyAlloyingRecipe(event, recipe) {
	let { cmi } = event.getRecipes()
	let json = sourceJsonOf(recipe)
	let id = String(recipe.getId())

	// Ad Astra 的 result 是 {count, id} 而不是 {item, count}, 单独按 id 匹配
	let result = json != null && json.has("result") ? json.get("result").getAsJsonObject() : null

	if (result == null || !result.has("id")) {
		console.warn(`[MBD2 Proxy] Skipping malformed ad_astra:alloying recipe: ${id}`)
		return
	}

	let outputId = result.get("id").getAsString()
	let count = getInt(result, "count", 1)

	let builder = cmi.electronic_blast_furnace()

	builder.outputItems(stackString(outputId, count))

	addIngredients(builder, jsonArrayOf(json, "ingredients"))

	builder.duration(getInt(json, "cookingtime", 100))
		.perTick((recipe) => {
			recipe.inputFE(getInt(json, "energy", 0))
		})
		.id(`ad_astra:${outputId.split(":").pop()}_mbd2_proxy`)

	console.log(`[EBF] proxied ad_astra:alloying -> ad_astra:${outputId.split(":").pop()}_mbd2_proxy | ${count}x ${outputId}`)
}

/**
 *
 * @param {Internal.RecipesEventJS_} event
 */
function proxyCarKiln(event) {
	let { cmi } = event.getRecipes()

	forEachLiveRecipe(event, "immersiveindustry:car_kiln", (recipe) => {
		let json = sourceJsonOf(recipe)
		let id = recipe.getId()
		let results = jsonArrayOf(json, "results")

		if (results == null) {
			console.warn(`[MBD2 Proxy] Skipping car_kiln recipe without results: ${id}`)
			return
		}

		let builder = cmi.electronic_blast_furnace()

		// 单物品输入
		if (json.has("input")) {
			addIngredient(builder, json.get("input"))
		}

		// 多物品输入
		addIngredients(builder, jsonArrayOf(json, "inputs"))

		// 流体输入
		if (json.has("input_fluid")) {
			addFluidIngredient(builder, json.get("input_fluid"))
		}

		// 输出
		addResults(builder, results)

		builder.duration(getInt(json, "time", 200))
			.perTick((recipe) => {
				recipe.inputFE(getInt(json, "tickEnergy", 0))
			})
			.id(`${id}_mbd2_proxy`)
	})
}

/**
 * @param {Internal.RecipesEventJS_} event
 */
function proxyRotaryKiln(event) {
	let { cmi } = event.getRecipes()

	forEachLiveRecipe(event, "immersiveindustry:rotary_kiln", (recipe) => {
		let json = sourceJsonOf(recipe)
		let id = recipe.getId()

		let builder = cmi.electronic_blast_furnace()

		addIngredient(builder, json.get("input"))

		addResult(builder, json.get("result"))

		if (json.has("result_fluid")) {
			addFluidResult(builder, json.get("result_fluid"))
		}

		builder.duration(getInt(json, "time", 200))
			.perTick((recipe) => {
				recipe.inputFE(getInt(json, "tickEnergy", 0))
			})
			.id(`${id}_mbd2_proxy`)
	})
}

/**
 * 
 * @param {Internal.JsonObject_} json
 * @param {string} key
 * @param {number} fallback
 * @returns 
 */
function getInt(json, key, fallback) {
	return json.has(key) ? json.get(key).getAsInt() : fallback
}

/**
 * 
 * @param {Internal.JsonObject_} json
 * @param {string} key
 * @param {number} fallback
 * @returns 
 */
function getFloat(json, key, fallback) {
	return json.has(key) ? json.get(key).getAsFloat() : fallback
}

/**
 * 
 * @param {Internal.RecipeJS_} recipe 
 * @returns 
 */
function sourceJsonOf(recipe) {
	return recipe.originalJson == null ? recipe.json : recipe.originalJson
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
 * @param {number} countMultiplier
 * @returns 
 */
function itemIngredientOf(entry, countMultiplier) {
	if (entry == null) {
		return null
	}

	countMultiplier = countMultiplier == null ? 1 : countMultiplier

	if (entry.isJsonArray()) {
		let list = []

		for (let e of entry.getAsJsonArray()) {
			let ingredient = itemIngredientOf(e, countMultiplier)

			if (ingredient != null) {
				list.push(ingredient)
			}
		}

		return list.length == 0 ? null : list
	}

	if (!entry.isJsonObject()) {
		return null
	}

	let json = entry.getAsJsonObject()
	let count = getInt(json, "count", 1) * countMultiplier

	if (json.has("base_ingredient")) {
		return itemIngredientOf(json.get("base_ingredient"), count)
	}

	if (json.has("ingredient")) {
		return itemIngredientOf(json.get("ingredient"), count)
	}

	if (json.has("match")) {
		return itemIngredientOf(json.get("match"), count)
	}

	if (json.has("children")) {
		return itemIngredientOf(json.get("children"), count)
	}

	if (json.has("ingredients")) {
		return itemIngredientOf(json.get("ingredients"), count)
	}

	if (json.has("input")) {
		return itemIngredientOf(json.get("input"), count)
	}

	if (json.has("output")) {
		return itemIngredientOf(json.get("output"), count)
	}

	if (json.has("value")) {
		return itemIngredientOf(json.get("value"), count)
	}

	if (json.has("item")) {
		return stackString(json.get("item").getAsString(), count)
	}

	if (json.has("tag")) {
		let tag = json.get("tag").getAsString()

		return stackString(`#${tag}`, count)
	}

	if (json.has("id")) {
		return stackString(json.get("id").getAsString(), count)
	}

	return null
}

/**
 * 
 * @param {Internal.JsonElement_} entry 
 * @returns 
 */
function inputFluidOf(entry) {
	if (entry == null || !entry.isJsonObject()) {
		return null
	}

	let json = entry.getAsJsonObject()
	let amount = getInt(json, "amount", 1000)

	if (json.has("fluid")) {
		return Fluid.of(json.get("fluid").getAsString(), amount)
	}

	if (json.has("tag") && json.has("amount")) {
		let tag = json.get("tag").getAsString()

		return MBDFluidIngredient.ofTagId(tag, amount)
	}

	if (json.has("fluidTag")) {
		let fluidTag = json.get("fluidTag").getAsString()

		return MBDFluidIngredient.ofTagId(fluidTag, amount)
	}

	return null
}

/**
 * 
 * @param {Internal.JsonElement_} entry 
 * @returns 
 */
function outputFluidOf(entry) {
	if (entry == null || !entry.isJsonObject()) {
		return null
	}

	let json = entry.getAsJsonObject()
	let amount = getInt(json, "amount", 1000)

	if (json.has("fluid")) {
		return Fluid.of(json.get("fluid").getAsString(), amount)
	}

	if (json.has("tag") && json.has("amount")) {
		let tag = json.get("tag").getAsString()

		return MBDFluidIngredient.ofTagId(tag, amount)
	}

	return null
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS_} builder 
 * @param {Internal.JsonElement_} entry 
 * @returns 
 */
function addIngredient(builder, entry) {
	if (entry == null) {
		return
	}

	let fluid = inputFluidOf(entry)

	if (fluid != null) {
		builder.inputFluids(fluid)
		return
	}

	let ingredient = itemIngredientOf(entry)

	if (ingredient == null) {
		return
	}

	if (Array.isArray(ingredient)) {
		builder.inputItems([ingredient])
		return
	}

	builder.inputItems(ingredient)
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS_} builder
 * @param {Internal.JsonElement_} entry
 */
function addIngredients(builder, ingredients) {
	// 现在遍历范围包含 addedRecipes, 兜一下空值, 避免一条怪配方把整轮代理全部中断
	if (ingredients == null) {
		return
	}

	for (let ingredient of ingredients) {
		addIngredient(builder, ingredient)
	}
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS_} builder 
 * @param {Internal.JsonElement_} entry 
 */
function addFluidIngredient(builder, entry) {
	let fluid = inputFluidOf(entry)

	if (fluid != null) {
		builder.inputFluids(fluid)
	}
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS_} builder
 * @param {Internal.JsonArray_} ingredients
 */
function addFluidIngredients(builder, ingredients) {
	if (ingredients == null) {
		return
	}

	for (let entry of ingredients) {
		addFluidIngredient(builder, entry)
	}
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS_} builder
 * @param {Internal.JsonElement_} entry
 * @returns 
 */
function addResult(builder, entry) {
	let fluid = outputFluidOf(entry)

	if (fluid != null) {
		builder.outputFluids(fluid)
		return
	}

	let item = itemIngredientOf(entry)

	if (item == null) {
		return
	}

	let chance = entry.isJsonObject()
		? getFloat(entry.getAsJsonObject(), "chance", 1)
		: 1

	if (chance != 1) {
		builder.chance(chance)
	}

	builder.outputItems(item)

	if (chance != 1) {
		builder.chance(1)
	}
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS_} builder
 * @param {Internal.JsonArray_} results
 */
function addResults(builder, results) {
	if (results == null) {
		return
	}

	for (let entry of results) {
		addResult(builder, entry)
	}
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS_} builder
 * @param {Internal.JsonElement_} entry
 */
function addFluidResult(builder, entry) {
	let fluid = outputFluidOf(entry)

	if (fluid != null) {
		builder.outputFluids(fluid)
	}
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS_} builder
 * @param {Internal.JsonArray_} results
 */
function addFluidResults(builder, results) {
	if (results == null) {
		return
	}

	for (let entry of results) {
		addFluidResult(builder, entry)
	}
}
// priority: -100
//
// 必须最后加载.
//
// ServerEvents.recipes 的各个回调是按"脚本加载顺序"依次执行的, 而 KubeJS 是按
// 文件系统遍历顺序读脚本的, recipes/RemoveAll.js 这类删除脚本反而排在
// recipes/mod/mbd2/proxy/* 之后才跑. 之前代理脚本执行时删除 / 覆盖都还没发生,
// 于是把已经失效的配方也一起代理了.
// priority 越小加载越晚, -100 保证所有删除 / 覆盖 / 替换脚本都执行完毕.
//
// 解析 / 拼槽位的函数(getInt, sourceJsonOf, itemIngredientOf, inputFluidOf,
// outputFluidOf, asItemSlots, addIngredient(s), addResult(s), addFluidResult(s))
// 全部由 utils/MbdProxyHelper.js 提供. 不要在本文件里再抄一份: KubeJS 的所有
// server 脚本共享同一个顶层作用域, 重复定义会静默互相覆盖, 实际跑的是哪一份
// 取决于脚本加载顺序(原因见该文件头注释).
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
	forEachLiveRecipe(event, "ad_astra:alloying", (recipe) => {
		proxyAlloyingRecipe(event, recipe)
	})
}

/**
 * @param {Internal.RecipesEventJS_} event
 * @param {Internal.RecipeJS_} recipe
 */
function proxyAlloyingRecipe(event, recipe) {
	let { cmi } = event.getRecipes()
	let json = sourceJsonOf(recipe)
	let id = String(recipe.getId())

	let result = json != null
		&& json.has("result")
		? json.get("result").getAsJsonObject()
		: null

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

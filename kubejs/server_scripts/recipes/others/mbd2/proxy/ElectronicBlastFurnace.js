// priority: -100

const EBF_INPUT_SLOT = null
const EBF_EXCLUDED_INPUT_TAGS = [
	"forge:ores",
	"mekanism:dirty_dusts",
	"forge:dusts",
	"forge:raw_materials",
	"create:crushed_raw_materials"
]

const EBF_EXCLUDED_INPUT_TAG_PREFIXES = [
	"forge:storage_blocks/raw_"
]

ServerEvents.recipes((event) => {
	safeProxy("ebf/arc_furnace", event, proxyArcFurnace)
	safeProxy("ebf/alloying", event, proxyAlloying)
	safeProxy("ebf/alloy", event, proxyAlloy)
	// safeProxy("ebf/melting", event, proxyMelting)
	// safeProxy("ebf/car_kiln", event, proxyCarKiln)
	// safeProxy("ebf/rotary_kiln", event, proxyRotaryKiln)
})

/**
 * 单个物品原料 id 是否落在排除名单的标签家族里.
 *
 * @param {string} id 形如 "#forge:dusts/iron" / "#forge:ores" / "minecraft:iron_ingot"
 * @returns {boolean}
 */
function isExcludedArcFurnaceIngredient(id) {
	if (typeof id != "string" || !id.startsWith("#")) {
		return false
	}

	let tag = id.substring(1)

	let inFamily = EBF_EXCLUDED_INPUT_TAGS.some((excluded) => {
		return tag == excluded || tag.startsWith(`${excluded}/`)
	})

	if (inFamily) {
		return true
	}

	return EBF_EXCLUDED_INPUT_TAG_PREFIXES.some((prefix) => {
		return tag.startsWith(prefix)
	})
}

/**
 * 解析后的输入槽位是否命中排除名单.
 *
 * 候选数组(一个槽位任选其一)按「任一命中即排除」处理: 宁可少代理一条,
 * 也不要把整类材料的配方漏进电子高炉.
 *
 * @param {*} slot itemSlotOf() 的返回值, 可能为 null
 * @returns {boolean}
 */
function isExcludedArcFurnaceInput(slot) {
	if (slot == null) {
		return false
	}

	if (slot.kind == "candidates") {
		return slot.ids.some(isExcludedArcFurnaceIngredient)
	}

	return isExcludedArcFurnaceIngredient(slot.id)
}

/**
 * 
 * @param {Internal.RecipesEventJS_} event 
 */
function proxyArcFurnace(event) {
	let { cmi } = event.getRecipes()

	let proxied = 0
	let skipped = 0

	forEachLiveRecipe(event, "immersiveengineering:arc_furnace", (recipe) => {
		let json = sourceJsonOf(recipe)
		let id = recipe.getId()
		let results = jsonArrayOf(json, "results")

		if (results == null) {
			console.warn(`[MBD2 Proxy] Skipping arc_furnace recipe without results: ${id}`)
			return
		}

		if (isExcludedArcFurnaceInput(itemSlotOf(json.get("input")))) {
			skipped++

			if (CmiGlobal.isDebug) {
				console.info(`[EBF] arc_furnace 跳过整类材料配方: ${id}`)
			}
			return
		}

		let builder = cmi.electronic_blast_furnace()

		addIngredient(builder, json.get("input"), EBF_INPUT_SLOT)

		if (json.has("additives")) {
			addIngredients(builder, jsonArrayOf(json, "additives"), EBF_INPUT_SLOT)
		}

		addResults(builder, results)

		if (json.has("slag")) {
			addResult(builder, json.get("slag"))
		}

		let time = Math.max(1, getInt(json, "time", 200))
		let energy = getInt(json, "energy", 0)
		let perTickFE = Math.ceil(energy / time)

		builder.duration(time)
			.perTick((recipe) => {
				// IE 的 energy 是整条配方的总耗能, 这里换算成每 tick
				recipe.inputFE(perTickFE)
			})
			.id(`${id}_mbd2_proxy`)

		proxied++

		if (CmiGlobal.isDebug) {
			console.info(`[EBF] arc_furnace -> ${id}_mbd2_proxy | in=${EBF_INPUT_SLOT} ${time}t ${perTickFE}FE/t | out=${results.size()}${json.has("slag") ? " +slag" : ""}`)
		}
	})

	let slotDesc = EBF_INPUT_SLOT == null ? "通配(不绑槽位名)" : EBF_INPUT_SLOT

	console.info(`[EBF] arc_furnace 代理完成: ${proxied} 条, 按整类材料跳过 ${skipped} 条 (物品输入: ${slotDesc})`)
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

		addIngredient(builder, ingredientJson, "input_melting")

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
	let proxied = 0

	forEachLiveRecipe(event, "ad_astra:alloying", (recipe) => {
		if (proxyAlloyingRecipe(event, recipe)) {
			proxied++
		}
	})

	console.info(`[EBF] ad_astra:alloying 代理完成: ${proxied} 条 (物品输入统一绑 '${EBF_INPUT_SLOT}')`)
}

/**
 *
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
		return false
	}

	let outputId = result.get("id").getAsString()
	let count = getInt(result, "count", 1)

	let builder = cmi.electronic_blast_furnace()

	builder.outputItems(stackString(outputId, count))

	addIngredients(builder, jsonArrayOf(json, "ingredients"), EBF_INPUT_SLOT)

	let cookingTime = Math.max(1, getInt(json, "cookingtime", 100))
	let energy = getInt(json, "energy", 0)

	builder.duration(cookingTime)
		.perTick((recipe) => {
			recipe.inputFE(energy)
		})
		.id(`ad_astra:${outputId.split(":").pop()}_mbd2_proxy`)

	console.info(`[EBF] ad_astra:alloying -> ad_astra:${outputId.split(":").pop()}_mbd2_proxy | in=${EBF_INPUT_SLOT} ${cookingTime}t ${energy}FE/t | out=${count}x ${outputId}`)

	return true
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

		if (json.has("input")) {
			addIngredient(builder, json.get("input"), "input_car_kiln")
		}

		addIngredients(builder, jsonArrayOf(json, "inputs"), "input_car_kiln")

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

		addIngredient(builder, json.get("input"), "input_rotary_kiln")

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

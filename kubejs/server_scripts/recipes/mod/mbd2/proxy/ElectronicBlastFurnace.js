// priority: -100

/**
 * 必须最后加载.
 * 
 * ServerEvents.recipes 的各个回调是按"脚本加载顺序"依次执行的, 而 KubeJS 是按
 * 文件系统遍历顺序读脚本的, recipes/RemoveAll.js 这类删除脚本反而排在
 * recipes/mod/mbd2/proxy/* 之后才跑. 之前代理脚本执行时删除 / 覆盖都还没发生,
 * 于是把已经失效的配方也一起代理了.
 * priority 越小加载越晚, -100 保证所有删除 / 覆盖 / 替换脚本都执行完毕.
 * 解析 / 拼槽位的函数(getInt, sourceJsonOf, itemIngredientOf, inputFluidOf,
 * outputFluidOf, asItemSlots, addIngredient(s), addResult(s), addFluidResult(s))
 * 全部由 utils/MbdProxyHelper.js 提供. 不要在本文件里再抄一份: KubeJS 的所有
 * server 脚本共享同一个顶层作用域, 重复定义会静默互相覆盖, 实际跑的是哪一份
 * 取决于脚本加载顺序(原因见该文件头注释).
 */
/**
 * 电弧炉 / 合金代理共用的物品输入槽位名.
 *
 * 机器侧 trait 与 slotName 的对应(见 ldlib/assets/mbd2/multiblock/electronic_blast_furnace.mb):
 *
 *   input_item_0 -> input_melting                      (1 格, 匠魂熔炼专用)
 *   input_item_1 -> input_arc, input_alloying          (1 格)
 *   input_item_2 -> input_alloying                     (1 格)
 *   input_item_3 -> input_car_kiln, input_alloying     (1 格)
 *   input_item_4 -> input_rotary_kiln, input_alloying  (1 格)
 *
 * 两条硬约束:
 *   1. 每个物品输入 trait 只有 1 格(slotSize=1), 所以多材料配方必须绑一个
 *      **横跨多个格子**的 slotName, 否则材料怎么放都凑不齐;
 *   2. MBDRecipe#handlerContentsInternal 是按
 *      `槽位名集合.containsAll(配方内容用到的 slotName 集合)` 逐个槽位判断
 *      能否参与匹配的 —— 同一个配方的所有物品输入必须绑**同一个** slotName.
 *      一旦绑成两个名字, 就只有同时挂着这两个名字的槽位能接手, 而
 *      input_arc 只挂在 input_item_1 上(且只有 1 格).
 *
 * 所以统一绑 input_alloying: 它横跨 input_item_1..4 共 4 格, 足以容纳
 * IE 电弧炉的 1 主料 + 1 添加剂(实测全库 78 条 arc_furnace 配方的 additives
 * 最多 1 项)以及 ad_astra 合金的最多 4 种原料.
 *
 * 也就是说: 走代理的这些配方, 材料要放进 UI 左侧第 2~5 格 —— 第 1 格挂的是
 * input_melting(匠魂熔炼专用), 且对应槽位只有 1 格, 放那里任何代理配方都不会匹配.
 *
 * 为什么默认走通配(null)而不是绑 input_alloying:
 *   机器 .mb 里这 5 个 trait 的 slotNames 是以 Compound 形式存的
 *   (形如 { p = 'input_alloying', t = 15 }, 见 _nbt_tool.py dump), 而
 *   RecipeCapabilityTraitDefinition.slotNames 是 String[] —— 一旦 MBD2 侧
 *   没能把这层 Compound 解成字符串, 槽位的 slotNames 就是空的, 于是带
 *   slotName 的配方内容会被所有槽位拒绝(containsAll 失败), 配方永远不启动;
 *   反倒是"未命名内容"走通配路径, 任意槽位都能消费 —— 这正是同文件里手写配方
 *   (不调 slotName) 能跑、而代理配方跑不起来的差别所在.
 *
 * 所以这里默认 null: applyIngredientSlot 在 slotName 为假值时不包 slotName
 * 回调, 内容以空槽位名提交, 行为和手写配方完全一致, 材料放任意格都能匹配.
 * 等确认过 .mb 的 slotNames 能被正确读取后, 想恢复槽位隔离就把下面这行改回
 * 字符串 "input_alloying"(横跨 input_item_1..4 共 4 格).
 */
const EBF_INPUT_SLOT = null

ServerEvents.recipes((event) => {
	safeProxy("ebf/arc_furnace", event, proxyArcFurnace)
	// safeProxy("ebf/melting", event, proxyMelting)
	// safeProxy("ebf/alloy", event, proxyAlloy)
	safeProxy("ebf/alloying", event, proxyAlloying)
	// safeProxy("ebf/car_kiln", event, proxyCarKiln)
	// safeProxy("ebf/rotary_kiln", event, proxyRotaryKiln)
})

/**
 * 
 * @param {Internal.RecipesEventJS_} event 
 */
function proxyArcFurnace(event) {
	let { cmi } = event.getRecipes()

	let proxied = 0

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

		// 主料与添加剂必须绑同一个 slotName(原因见文件顶部 EBF_INPUT_SLOT 注释).
		// 旧写法把两者都绑 input_arc, 而 input_arc 只挂在 input_item_1 上、
		// 该 trait 只有 1 格 —— "1 主料 + 1 添加剂"要挤进同一格, 永远无法满足,
		// 表现为机器收下材料却一直不启动.
		addIngredient(builder, json.get("input"), EBF_INPUT_SLOT)

		if (json.has("additives")) {
			addIngredients(builder, jsonArrayOf(json, "additives"), EBF_INPUT_SLOT)
		}

		addResults(builder, results)

		// IE 的 arc_furnace 带 slag 副产物(炉渣), 旧写法整条丢掉
		if (json.has("slag")) {
			addResult(builder, json.get("slag"))
		}

		// time 兜底到 1, 免得源配方写 time:0 时下面除零变成 Infinity
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

	console.info(`[EBF] arc_furnace 代理完成: ${proxied} 条 (物品输入统一绑 '${EBF_INPUT_SLOT}')`)
}

/**
 * 
 * @param {Internal.RecipesEventJS_} event 
 */
// function proxyMelting(event) {
// 	let { cmi } = event.getRecipes()

// 	forEachLiveRecipe(event, "tconstruct:melting", (recipe) => {
// 		let json = sourceJsonOf(recipe)
// 		let id = recipe.getId()
// 		let ingredientJson = json.get("ingredient")

// 		if (id.includes("cluster")) {
// 			return
// 		}

// 		let builder = cmi.electronic_blast_furnace()

// 		addIngredient(builder, ingredientJson, "input_melting")

// 		addFluidResult(builder, json.get("result"))

// 		addFluidResults(builder, jsonArrayOf(json, "byproducts"))

// 		builder.duration(getInt(json, "time", 100))
// 			.id(`${id}_mbd2_proxy`)
// 	})
// }

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

	// 合金原料同样绑 input_alloying —— 它横跨 4 格, 最多容纳 4 种原料
	addIngredients(builder, jsonArrayOf(json, "ingredients"), EBF_INPUT_SLOT)

	let cookingTime = Math.max(1, getInt(json, "cookingtime", 100))
	let energy = getInt(json, "energy", 0)

	builder.duration(cookingTime)
		.perTick((recipe) => {
			// ad_astra 的 energy 字段按其机器语义是每 tick 耗能, 直接沿用
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

		// 单物品输入
		if (json.has("input")) {
			addIngredient(builder, json.get("input"), "input_car_kiln")
		}

		// 多物品输入
		addIngredients(builder, jsonArrayOf(json, "inputs"), "input_car_kiln")

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

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
/**
 * arc_furnace 代理的输入排除名单.
 *
 * 电子高炉的定位是「合金机」: 只保留合金类配方. 凡是「整类材料」的配方
 * (原矿 / 粗矿 / 粗矿块 / 粉 / 脏粉) 一律不代理 —— 它们都是前段工序量产的产物,
 * 该由别的机器处理, 代理过来只会塞满配方表并与既有工序重复.
 *
 * 分两张表, 因为这两类标签的命名方式不一样:
 *   - 家族表: 命中标签本身, 也命中它的子标签(forge:dusts 命中 forge:dusts/iron);
 *   - 前缀表: 命中以该串开头的标签. 粗矿块是 forge:storage_blocks/raw_iron,
 *     它并不是某个「.../raw」标签的子标签, 只好按前缀匹配.
 *
 * 为什么必须这样匹配而不是全等: IE 配方里写的全是带子路径的具体标签, 实测
 * 精确等于 #forge:dusts / #forge:ores 的配方一条都没有, 只做全等等于规则不生效.
 *
 * 实测 IE 1.20.1 的 78 条 arc_furnace 配方: 家族表跳过 38 条, 再加上粗矿 15 条、
 * 粗矿块 15 条, 共跳过 68 条, 只留下 10 条(7 条合金 + 钢 + 绝缘玻璃 + 下界合金碎片).
 */
const EBF_EXCLUDED_INPUT_TAGS = [
	"forge:ores",
	"mekanism:dirty_dusts",
	"forge:dusts",
	"forge:raw_materials",
	"create:crushed_raw_materials"
]

/**
 * 按前缀排除的标签(粗矿块).
 */
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

		// 没有产物的话代理过去也是坏配方
		if (results == null) {
			console.warn(`[MBD2 Proxy] Skipping arc_furnace recipe without results: ${id}`)
			return
		}

		// 整类材料(原矿 / 脏粉 / 粉)的配方不代理, 名单见 EBF_EXCLUDED_INPUT_TAGS
		if (isExcludedArcFurnaceInput(itemSlotOf(json.get("input")))) {
			skipped++

			if (CmiGlobal.isDebug) {
				console.info(`[EBF] arc_furnace 跳过整类材料配方: ${id}`)
			}
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

	let slotDesc = EBF_INPUT_SLOT == null ? "通配(不绑槽位名)" : EBF_INPUT_SLOT

	console.info(`[EBF] arc_furnace 代理完成: ${proxied} 条, 按整类材料跳过 ${skipped} 条 (物品输入: ${slotDesc})`)
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

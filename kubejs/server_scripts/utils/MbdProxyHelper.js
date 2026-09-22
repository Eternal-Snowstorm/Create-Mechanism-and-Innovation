// MBD2 配方代理的公共工具.
//
// 为什么必须只有一份实现:
//   KubeJS 把同一个 pack 下的所有脚本放进同一个顶层作用域执行
//   (dev.latvian.mods.kubejs.script.ScriptManager#topLevelScope), 所以
//   `function foo() {}` 是全局的 —— 两个代理脚本各写一份同名实现时,
//   后加载的那份会静默覆盖前一份, 而 ScriptFile.compareTo 只比较 priority,
//   同 priority 时谁在后由文件收集顺序决定(等于未定义行为).
//   于是"改了 A 文件却跑的是 B 文件的实现"这种事会真的发生, 所以这些
//   共用的解析 / 拼槽位函数只在这里定义一份, 代理脚本里不许再抄.
//
// 槽位与候选(重点):
//   MBD2 的 `inputItems(InputItem...)` / `outputItems(InputItem...)` 是 varargs,
//   **每一个参数**才是一个槽位(MBD2 侧一个 InputItem -> 一个
//   SizedIngredient -> 一个 Content -> 配方界面一个格子). 而 ingredients /
//   results 里形如
//
//       [ { "tag": "forge:raw_chicken" }, { "tag": "forge:raw_pork" } ]
//
//   的数组是"一个槽位, 任选其一"(vanilla 的 ingredient alternatives),
//   要表达成一个 Ingredient 再塞进 varargs:
//
//       builder.inputItems(["a", "b"])                // 两个槽位: a 和 b 都要  (错)
//       builder.inputItems([["a", "b"]])              // 靠"多套一层数组", 实测仍会被拆开
//       builder.inputItems(IngredientJS.of(["a","b"])) // 一个槽位: a 或 b      (对)
//
//   所以统一走 asItemSlots(): 候选数组先经 IngredientJS.of 压成一个多候选
//   Ingredient(ListJS.of -> IngredientPlatformHelper.or), 交给 varargs 的就是
//   一个普通对象, 不再依赖 Rhino 对嵌套数组的包装行为.
//   空数组不会走到这里 —— itemIngredientOf 对解析不出任何候选的数组返回 null.
//   流体走 inputFluids / outputFluids, 只传单个 Fluid, 不涉及这层.
//
// 同材料归并(重点):
//   "同一个材料在 ingredients 里连写几遍"是原版写法(apple_cider = apple + apple
//   + sugar, 语义是"要 2 个苹果"), 逐条 inputItems 会让 MBD2 生成两个各 1x 的
//   Content —— 配方界面两个格子、机器也要两个槽位, 就是"相同的多个材料被分别
//   单个填入配方格子". 输入侧统一走 mergeIngredientSlots(): 相同材料数量相加,
//   输出 "2x minecraft:apple" 一条. MBD2 的 ItemRecipeHandler 跨槽累计提取,
//   所以合并后不会更难满足, 反而省槽位. (产物侧不归并: 每条产物可能带各自的
//   chance, 合并会串味.)
let $IngredientJS =
	Java.loadClass("dev.latvian.mods.kubejs.item.ingredient.IngredientJS")

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
 * @param {string} id 
 * @param {number} count 
 * @returns 
 */
function stackString(id, count) {
	return count > 1 ? `${count}x ${id}` : id
}

/**
 * 取配方"原始 json".
 *
 * KubeJS 用 builder 新建的配方, recipe.json 此时还是 {"type":"unknown"} 占位,
 * 需要 originalJson 才能读到真正写进去的内容.
 *
 * @param {Internal.RecipeJS_} recipe 
 * @returns {Internal.JsonObject_}
 */
function sourceJsonOf(recipe) {
	return recipe.originalJson == null ? recipe.json : recipe.originalJson
}

/**
 * 把一个 json 条目解析成"物品原料".
 *
 * 返回 string 表示单物品; 返回 string[] 表示一个槽位里的多个候选
 * (调用方必须用 asItemSlots 包一层再交给 varargs); 返回 null 表示这个
 * 条目不是物品原料, 调用方应跳过.
 *
 * @param {Internal.JsonElement_} entry 
 * @param {number} countMultiplier 
 * @returns {string | string[] | null}
 */
function itemIngredientOf(entry, countMultiplier) {
	if (entry == null) {
		return null
	}

	countMultiplier = countMultiplier == null ? 1 : countMultiplier

	if (entry.isJsonArray()) {
		let alternatives = []

		for (let alternative of entry.getAsJsonArray()) {
			let ingredient = itemIngredientOf(alternative, countMultiplier)

			if (ingredient != null) {
				alternatives.push(ingredient)
			}
		}

		// 一个都没解析出来时必须返回 null: 空数组交给 varargs 等于"没有参数",
		// 而补上嵌套后的 `inputItems([[]])` 会变成一个"空原料"的幽灵槽位.
		return alternatives.length == 0 ? null : alternatives
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
		return stackString(`#${json.get("tag").getAsString()}`, count)
	}

	if (json.has("id")) {
		return stackString(json.get("id").getAsString(), count)
	}

	// 解析不出原料的条目(自定义 ingredient / 流体对象等)必须显式返回 null.
	// 漏掉 return 会变成 undefined, 而 `undefined != null` 为假只是巧合 ——
	// 调用方一旦用 `!== null` 判断就会把 undefined 当成合法原料传下去,
	// MBD2 那边 Arrays.stream(items).map(InputItem::ingredient) 直接 NPE,
	// 异常会顺着 safeProxy 冒出去, 把整轮代理全部中断.
	return null
}

/**
 * 解析流体输入条目.
 *
 * `{"tag": ..., "amount": ...}` 这种带 amount 的 tag 是流体(tconstruct 的写法);
 * 不带 amount 的 `{"tag": ...}` 是物品 tag, 这里不能认, 否则 create:mixing
 * 里的物品标签会被当成流体吃掉.
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
		return MBDFluidIngredient.ofTagId(json.get("tag").getAsString(), amount)
	}

	if (json.has("fluidTag")) {
		return MBDFluidIngredient.ofTagId(json.get("fluidTag").getAsString(), amount)
	}

	return null
}

/**
 * 解析流体产出条目.
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
		return MBDFluidIngredient.ofTagId(json.get("tag").getAsString(), amount)
	}

	return null
}

/**
 * 把一个槽位的物品变成 inputItems / outputItems 需要的"一个参数".
 *
 * 字符串原样返回; 候选数组(minecraft ingredient alternatives)先压成**一个**
 * Ingredient 再返回 —— 让 varargs 只收到一个非数组对象, 于是一个槽位就是
 * 一个 Content(候选憋在这一个 Ingredient 里面).
 *
 * 不要试图用"再套一层数组"来表达候选: 数组参数最终会被按元素转换成
 * InputItem, 一层套一层的写法在 Rhino/KubeJS 的重载与包装链上并不安全
 * (实测候选仍会被拆成多个槽位). 直接构造 Ingredient 才是确定的写法:
 *   IngredientJS.of(["a", "b"])  ->  ListJS.of -> IngredientPlatformHelper.or(...)
 *     -> 一个多候选 Ingredient(或, 不是且)
 *
 * @param {string | string[]} item 
 * @returns {string | Internal.Ingredient_}
 */
function asItemSlots(item) {
	if (!Array.isArray(item)) {
		return item
	}

	// Ingredient 本身不带数量, 候选里的 "2x " 前缀会让解析失败(KubeJS 的
	// IngredientJS.parse 不认数量前缀), 所以候选统一剥掉数量 —— 同一槽位的
	// "任选其一" 本来也只能共用一个数量, MBD2 的 SizedIngredient 也是这么存的.
	return $IngredientJS.of(item.map((candidate) => {
		return String(candidate).replace(/^\d+x /, "")
	}))
}

/**
 * 把 "2x minecraft:apple" / "#forge:ingots" 拆成 id 与数量.
 *
 * @param {string} item 
 * @returns {{ id: string, count: number }}
 */
function splitStackString(item) {
	let match = /^(\d+)x (.+)$/.exec(String(item))

	if (match == null) {
		return { id: String(item), count: 1 }
	}

	return { id: match[2], count: parseInt(match[1], 10) }
}

/**
 * 流体条目 -> { kind, id, amount }.
 *
 * 这里先留下 id/amount 而不是直接构造 Fluid, 才能把"同一种流体写两遍"归并成
 * 一条(输入流体没有概率语义, 数量相加是等价的).
 *
 * @param {Internal.JsonElement_} entry 
 * @returns 
 */
function fluidSlotOf(entry) {
	if (entry == null || !entry.isJsonObject()) {
		return null
	}

	let json = entry.getAsJsonObject()
	let amount = getInt(json, "amount", 1000)

	if (json.has("fluid")) {
		return { kind: "fluid", id: json.get("fluid").getAsString(), amount: amount }
	}

	if (json.has("tag") && json.has("amount")) {
		return { kind: "fluidTag", id: json.get("tag").getAsString(), amount: amount }
	}

	if (json.has("fluidTag")) {
		return { kind: "fluidTag", id: json.get("fluidTag").getAsString(), amount: amount }
	}

	return null
}

/**
 * 物品条目 -> 槽位: { kind: "item", id, count } 或 { kind: "candidates", ids }.
 *
 * @param {Internal.JsonElement_} entry 
 * @returns 
 */
function itemSlotOf(entry) {
	let parsed = itemIngredientOf(entry)

	if (parsed == null) {
		return null
	}

	if (Array.isArray(parsed)) {
		// 候选数组 = 一个槽位任选其一; Ingredient 不带数量, 候选统一剥掉 "Nx " 前缀
		return {
			kind: "candidates",
			ids: parsed.map((candidate) => {
				return splitStackString(candidate).id
			})
		}
	}

	let split = splitStackString(parsed)

	return { kind: "item", id: split.id, count: split.count }
}

/**
 * 
 * @param {Internal.JsonElement_} entry 
 * @returns 
 */
function ingredientSlotOf(entry) {
	if (entry == null) {
		return null
	}

	let fluid = fluidSlotOf(entry)

	return fluid != null ? fluid : itemSlotOf(entry)
}

/**
 * 
 * @param {string} slot 
 * @returns {string}
 */
function slotKeyOf(slot) {
	return slot.kind == "candidates"
		? `candidates ${slot.ids.join(" ")}`
		: `${slot.kind} ${slot.id}`
}

/**
 * 把条目列表归并成"一种材料一个槽位": 相同材料重复出现时数量相加.
 *
 * create:mixing 里"同一个材料连写几遍"非常常见(create_central_kitchen 的
 * apple_cider 就是 apple + apple + sugar), 原版 Create 里那是"要 2 个苹果".
 * 逐条 inputItems 会生成两个各 1x 的 Content —— 配方界面两个格子、机器也要
 * 占两个槽位, 也就是"相同的多个材料被分别单个填入配方格子". 归并成一条
 * "2x minecraft:apple" 才等价: MBD2 的
 * ItemSlotCapabilityTrait$ItemRecipeHandler 是跨槽累计提取的(单个槽不够会继续
 * 找下一个槽, 直到候选需求量清零才把这条内容判定为满足), 所以"一个槽位要 2 个
 * 苹果"不会比"两个槽位各要 1 个"更严格.
 *
 * 候选数组不参与数量累加(它本身没有数量概念), 只有完全相同的候选集合会合并.
 *
 * @param {Internal.Iterable_<Internal.JsonElement_>} entries 
 * @returns 
 */
function mergeIngredientSlots(entries) {
	let order = []
	let byKey = new Map()

	for (let entry of entries) {
		let slot = ingredientSlotOf(entry)

		if (slot == null) {
			continue
		}

		let key = slotKeyOf(slot)
		let exist = byKey.get(key)

		if (exist == null) {
			byKey.set(key, slot)
			order.push(slot)
			continue
		}

		if (slot.kind == "item") {
			exist.count += slot.count
		} else if (slot.kind == "fluid" || slot.kind == "fluidTag") {
			exist.amount += slot.amount
		}
	}

	return order
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS_} builder 
 * @param {*} slot 
 */
function applyIngredientSlot(builder, slot) {
	if (slot.kind == "item") {
		builder.inputItems(stackString(slot.id, slot.count))
		return
	}

	if (slot.kind == "candidates") {
		builder.inputItems(asItemSlots(slot.ids))
		return
	}

	if (slot.kind == "fluid") {
		builder.inputFluids(Fluid.of(slot.id, slot.amount))
		return
	}

	if (slot.kind == "fluidTag") {
		builder.inputFluids(MBDFluidIngredient.ofTagId(slot.id, slot.amount))
	}
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS_} builder 
 * @param {Internal.JsonElement_} entry 
 * @returns 
 */
function addIngredient(builder, entry) {
	addIngredients(builder, [entry])
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS_} builder 
 * @param {Internal.JsonArray_} ingredients 
 */
function addIngredients(builder, ingredients) {
	// 遍历范围包含 addedRecipes, 兜一下空值, 避免一条怪配方把整轮代理全部中断
	if (ingredients == null) {
		return
	}

	for (let slot of mergeIngredientSlots(ingredients)) {
		applyIngredientSlot(builder, slot)
	}
}

/**
 * 
 * @param {Internal.MBDRecipeSchema$MBDRecipeJS_} builder 
 * @param {Internal.JsonElement_} entry 
 * @returns 
 */
function addResult(builder, entry) {
	if (entry == null) {
		return
	}

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

	// 产物同样要吃嵌套: 候选数组直传会被摊成多个产物槽位
	builder.outputItems(asItemSlots(item))

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

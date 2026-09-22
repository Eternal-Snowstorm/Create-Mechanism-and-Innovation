// priority: -100
//
// 必须最后加载.
//
// ServerEvents.recipes 的各个回调是按"脚本加载顺序"依次执行的, 而 KubeJS 是按
// 文件系统遍历顺序加载脚本的(Windows 上近似大小写不敏感的字典序), 于是
// recipes/RemoveAll.js 这类删除脚本反而排在 recipes/mod/mbd2/proxy/* 之后才跑.
// 之前代理脚本执行时, 删除 / 覆盖都还没发生, 所以会把已经失效的配方一起代理出去.
// priority 越小加载越晚, -100 保证所有删除 / 覆盖 / 替换脚本都执行完毕.
//
// 解析 / 拼槽位的函数(getInt, itemIngredientOf, inputFluidOf, asItemSlots,
// addIngredients, addResults ...)全部由 utils/MbdProxyHelper.js 提供.
// 不要在本文件里再抄一份: KubeJS 的所有 server 脚本共享同一个顶层作用域,
// 重复定义会静默互相覆盖, 实际跑的是哪一份取决于脚本加载顺序(原因见该文件头注释).
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

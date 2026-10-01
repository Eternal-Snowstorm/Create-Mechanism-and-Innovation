// priority: 0
let $UUID =
	Java.loadClass("java.util.UUID")

ServerEvents.highPriorityData((event) => {
	const RECIPE_TYPE = "thermal_extra:component_assembly"
	const ENERGY = 16000
	const RANDOM_UUID = $UUID.randomUUID()

	/**
	 * 已登记的配方
	 * 
	 * @type {ComponRecipe[]}
	 */
	let recipes = []

	/**
	 * 解析物品或标签写法
	 * 
	 * "4x thermal:laser_diode" => { item: "thermal:laser_diode", count: 4 }
	 * "4x #forge:ingots/iron" => { tag: "forge:ingots/iron", count: 4 }
	 * 
	 * @param {string} text 条目文本, 数量前缀可省略, x 大小写不限
	 * @returns {Internal.JsonObject_}
	 */
	function parse(text) {
		let count = 1
		text = String(text).trim()
		const MATCHED = /^(\d+)\s*[xX*]\s*(.+)$/.exec(text)
		if (MATCHED) {
			count = parseInt(MATCHED[1], 10)
			text = MATCHED[2].trim()
		}
		return text.startsWith("#") ? {
			tag: text.substring(1),
			count: count
		} : {
			item: text,
			count: count
		}
	}

	/**
	 * 把单个条目转成 ingredient / result 的 JSON
	 * 
	 * @param {Internal.InputFluid_ | InputItem_ | OutputItem_} entry 条目, 数组表示任一满足
	 * @returns {Internal.JsonObject_ | Internal.JsonObject_[]} 数组即 compound ingredient
	 */
	function toJson(entry) {
		if (Array.isArray(entry)) {
			return entry.map(toJson)
		}
		if (entry.getAmount) {
			return {
				fluid: entry.getId(),
				amount: entry.getAmount()
			}
		}
		if (entry.getCount) {
			// ItemStack, 数量取它自带的 count
			return parse(entry.getCount() + "x " + entry.getId())
		}
		return parse(entry)
	}

	/**
	 * 统一成数组, 单个条目会包成单元素数组
	 * 
	 * @param {any} value 条目或数组
	 * @returns {any[]}
	 */
	function asArray(value) {
		return Array.isArray(value) ? value : [value]
	}

	/**
	 * 配方ID转数据包路径
	 * 
	 * "mekanism:steel_casing" -> "mekanism:recipes/steel_casing"
	 * 
	 * @param {string} recipeId 配方ID
	 * @returns {string}
	 */
	function dataPath(recipeId) {
		return recipeId.replace(":", ":recipes/")
	}

	/**
	 * 组件装配配方 builder
	 * 
	 * @constructor
	 * @param {Internal.OutputFluid_ | OutputItem_ | string} output 产物
	 * @param {(Internal.InputFluid_ | InputItem_ | string)[]} inputs 原料
	 */
	function ComponRecipe(output, inputs) {
		// 由 .id() 指定的配方ID, 为空则用随机 UUID
		this.recipeId = null
		this.recipe = {
			type: RECIPE_TYPE,
			energy: ENERGY,
			ingredients: asArray(inputs).map(toJson),
			result: asArray(output).map(toJson)
		}
		recipes.push(this)
	}

	/**
	 * 指定配方ID, 用于覆盖同ID的原配方
	 * 
	 * @param {string} id 配方ID, 如 "pipez:item_pipe"
	 * @returns {ComponRecipe}
	 */
	ComponRecipe.prototype.id = function (id) {
		this.recipeId = id
		return this
	}

	/**
	 * 登记一条组件装配配方
	 * 
	 * @param {Internal.OutputFluid_ | OutputItem_ | string} output 产物
	 * @param {(Internal.InputFluid_ | InputItem_ | string)[]} inputs 原料
	 * @returns {ComponRecipe}
	 */
	function addComponRecipe(output, inputs) {
		return new ComponRecipe(output, inputs)
	}

	// 二极管
	addComponRecipe("4x thermal:laser_diode", [
		"#forge:wires/electrum",
		"#forge:plates/invar",
		"#forge:prisms/pure_quartz"
	])

	// 电子元件
	addComponRecipe("2x immersiveengineering:component_electronic", [
		"thermal:laser_diode",
		"#forge:treated_wood_slab",
		"#forge:gems/quartz",
		"#forge:wires/electrum"
	]).id("immersiveengineering:blueprint/component_electronic")

	// 锇砖瓦
	addComponRecipe("2x cmi:osmium_tile", [
		"#forge:plates/aluminum",
		"#forge:plates/osmium",
		Fluid.of("cmi:structural_plastic", 200)
	])

	// 钢制机壳
	addComponRecipe(Casing.STAINLESS_STEEL, [
		"#forge:plates/stainless_steel",
		"cmi:osmium_tile",
		"#forge:gears/chromeplated_steel"
	]).id("mekanism:steel_casing")

	// 通量线圈
	addComponRecipe("thermal:rf_coil", [
		"#forge:plates/gold",
		"#forge:plates/signalum"
	])

	// 萤石流明管道
	addComponRecipe("cmi:glowstone_lumen_tube", [
		"#forge:plates/cobalt",
		"#forge:plates/lumium"
	])

	// 机器框架
	addComponRecipe("thermal:machine_frame", [
		"#forge:plates/invar",
		Casing.INDUSTRY,
		"#forge:rods/tin"
	])

	// 铁机壳
	addComponRecipe("cmi:iron_casing", [
		"#forge:plates/iron",
		Casing.INDUSTRY,
		"#forge:rods/copper"
	])

	// 钢机壳
	addComponRecipe(Casing.STEEL, [
		"#forge:plates/steel",
		Casing.INDUSTRY,
		"#forge:rods/electrum"
	])

	// PZ管道
	addComponRecipe("16x pipez:item_pipe", [
		"#forge:gears/invar",
		Mechanisms.THERMAL.COM,
		"#forge:plates/industrial_iron",
		Mechanisms.WOODEN.COM,
		"thermal:cured_rubber"
	]).id("pipez:item_pipe")

	addComponRecipe("16x pipez:fluid_pipe", [
		"#forge:gears/invar",
		Mechanisms.THERMAL.COM,
		"#forge:plates/industrial_iron",
		Mechanisms.COPPER.COM,
		"thermal:cured_rubber"
	]).id("pipez:fluid_pipe")

	addComponRecipe("16x pipez:energy_pipe", [
		"#forge:gears/invar",
		Mechanisms.THERMAL.COM,
		"#forge:plates/industrial_iron",
		Mechanisms.REDSTONE.COM,
		"thermal:cured_rubber"
	]).id("pipez:energy_pipe")

	addComponRecipe("16x pipez:gas_pipe", [
		"#forge:gears/invar",
		Mechanisms.THERMAL.COM,
		"#forge:plates/industrial_iron",
		Mechanisms.AIR.COM,
		"thermal:cured_rubber"
	]).id("pipez:gas_pipe")

	addComponRecipe("16x pipez:universal_pipe", [
		"pipez:item_pipe",
		"pipez:fluid_pipe",
		"pipez:energy_pipe",
		"pipez:gas_pipe"
	]).id("pipez:universal_pipe")

	// 红石伺服器
	addComponRecipe("2x thermal:redstone_servo", [
		Fluid.of("immersiveengineering:redstone_acid", 200),
		"#forge:plates/iron"
	]).id("thermal_extra:machine/component_assembly/redstone_servo")

	// 并行升级 +4
	addComponRecipe("cmi:4_parallel_upgrade", [
		"cmi:2_parallel_upgrade",
		["#forge:ingots/cobalt", "#forge:plates/cobalt"],
		"immersiveengineering:component_electronic",
		"#forge:gears/rose_gold",
		"#forge:gears/rose_gold"
	])

	// 并行升级 +4 流体配方虽然麻烦, 但是相对应的造价更便宜
	addComponRecipe("cmi:4_parallel_upgrade", [
		"cmi:2_parallel_upgrade",
		"immersiveengineering:component_electronic",
		["#forge:ingots/cobalt", "#forge:plates/cobalt"],
		"#forge:dusts/redstone",
		Fluid.of("tconstruct:molten_rose_gold", 90)
	])

	/**
	 * 取配方ID, 没写 .id() 的配方共用一个随机 UUID 前缀, 再用下标区分
	 * 
	 * 数据包路径必须带 recipes/, 否则 RecipeManager 不会把它当成配方加载
	 * 
	 * @param {ComponRecipe} recipe 已登记的配方
	 * @param {number} index 配方在列表中的下标
	 * @returns 数据包路径
	 */	
	function getRecipeId(recipe, index) {
		return recipe.recipeId
			? dataPath(recipe.recipeId)
			: `cmi:recipes/kjs/${RANDOM_UUID.toString()}-${index}`
	}

	recipes.forEach((recipe, index) => {
		event.addJson(getRecipeId(recipe, index), recipe.recipe)
	})
})
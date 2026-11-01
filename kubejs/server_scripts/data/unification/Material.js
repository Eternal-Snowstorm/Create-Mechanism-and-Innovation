ServerEvents.highPriorityData((event) => {

	/**
	 *
	 * @param {string} name 
	 */
	function MaterialUnification(name) {
		/** 
		 * @type {string} 材料名称 
		 */
		this.materialName = name

		/** 
		 * @type {string[]} 已注册的 unification 名称列表 (用于防重复)  
		 */
		this.registered = []
	}

	/**
	 * 内部方法: 执行注册, 并防重复
	 * @param {string} name - 文件名
	 * @param {string | string[]} match - 要匹配的标签(支持单个或数组)
	 * @param {Internal.Item_} item - 替换为的物品
	 * @private
	 */
	MaterialUnification.prototype._addUnification = function (name, match, item) {
		if (this.registered.includes(name)) {
			console.warn(`[MaterialUnification] 已存在: ${name}, 跳过重复注册`)
			return
		}
		addUnification(name, match, item)
		this.registered.push(name)
	}

	/**
	 * 替换锭
	 * @param {Internal.Item_} ingotId - 替换为的锭物品
	 * @returns {MaterialUnification} 返回自身, 支持链式调用
	 */
	MaterialUnification.prototype.replaceIngot = function (ingotId) {
		this._addUnification(
			`${this.materialName}_ingot`,
			`#forge:ingots/${this.materialName}`,
			ingotId
		)
		return this
	}

	/**
	 * 替换粒
	 * @param {Internal.Item_} nuggetId - 替换为的粒物品
	 * @returns {MaterialUnification}
	 */
	MaterialUnification.prototype.replaceNugget = function (nuggetId) {
		this._addUnification(
			`${this.materialName}_nugget`,
			`#forge:nuggets/${this.materialName}`,
			nuggetId
		)
		return this
	}

	/**
	 * 替换方块
	 * @param {Internal.Item_} blockId - 替换为的方块物品
	 * @returns {MaterialUnification}
	 */
	MaterialUnification.prototype.replaceBlock = function (blockId) {
		this._addUnification(
			`${this.materialName}_block`,
			`#forge:storage_blocks/${this.materialName}`,
			blockId
		)
		return this
	}

	/**
	 * 替换板
	 * @param {Internal.Item_} plateId - 替换为的板物品
	 * @returns {MaterialUnification}
	 */
	MaterialUnification.prototype.replacePlate = function (plateId) {
		this._addUnification(
			`${this.materialName}_plate`,
			`#forge:plates/${this.materialName}`,
			plateId
		)
		return this
	}

	/**
	 * 替换粉
	 * @param {Internal.Item_} dustId - 替换为的粉物品
	 * @returns {MaterialUnification}
	 */
	MaterialUnification.prototype.replaceDust = function (dustId) {
		this._addUnification(
			`${this.materialName}_dust`,
			`#forge:dusts/${this.materialName}`,
			dustId
		)
		return this
	}

	/**
	 * 替换杆
	 * @param {Internal.Item_} rodId - 替换为的杆物品
	 * @returns {MaterialUnification}
	 */
	MaterialUnification.prototype.replaceRod = function (rodId) {
		this._addUnification(
			`${this.materialName}_rod`,
			`#forge:rods/${this.materialName}`,
			rodId
		)
		return this
	}

	/**
	 * 替换线
	 * @param {Internal.Item_} wireId - 替换为的线物品
	 * @returns {MaterialUnification}
	 */
	MaterialUnification.prototype.replaceWire = function (wireId) {
		this._addUnification(
			`${this.materialName}_wire`,
			`#forge:wires/${this.materialName}`,
			wireId
		)
		return this
	}

	/**
	 * 替换粗矿
	 * @param {Internal.Item_} rawOreId - 替换为的粗矿物品
	 * @returns {MaterialUnification}
	 */
	MaterialUnification.prototype.replaceRawOre = function (rawOreId) {
		this._addUnification(
			`raw_${this.materialName}`,
			`#forge:raw_materials/${this.materialName}`,
			rawOreId
		)
		return this
	}

	/**
	 * 替换粗矿块
	 * @param {Internal.Item_} rawOreBlockId - 替换为的粗矿块物品
	 * @returns {MaterialUnification}
	 */
	MaterialUnification.prototype.replaceRawOreBlock = function (rawOreBlockId) {
		this._addUnification(
			`raw_${this.materialName}_block`,
			`#forge:storage_blocks/raw_${this.materialName}`,
			rawOreBlockId
		)
		return this
	}

	/**
	 * 通用替换方法, 支持自定义类型
	 * @param {string} suffix - 文件名后缀 (如 "foil") 
	 * @param {string} tagSuffix - Forge 标签后缀 (如 "foils") , 将拼接为 "#forge:{tagSuffix}/{name}"
	 * @param {Internal.Item_} itemId - 替换为的物品
	 * @returns {MaterialUnification}
	 */
	MaterialUnification.prototype.replaceType = function (suffix, tagSuffix, itemId) {
		this._addUnification(
			`${this.materialName}_${suffix}`,
			`#forge:${tagSuffix}/${this.materialName}`,
			itemId
		)
		return this
	}

	/**
	 * 
	 * @example add("coal_coke", addUnification("#forge:coal_coke", "thermal:coal_coke"))
	 * @param {string} name 文件名称
	 * @param {string | string[]} match 
	 * @param {Internal.Item_ | Internal.Ingredient_} item 
	 * @returns 
	 */
	function addUnification(name, match, item) {
		if (name == null || name.trim() === "") {
			console.error("File name cannot be null or empty")
			return
		}

		if (match == null) {
			console.error("Match cannot be null")
			return
		}

		if (item == null) {
			console.error("Item cannot be null")
			return
		}

		let matchArray = Array.isArray(match) ? match : [match]

		let itemUnification = {
			matchItems: matchArray,
			resultItems: item
		}

		event.addJson(`oei:replacements/${name}.json`, itemUnification)
		return this
	}

	// 铁
	new MaterialUnification("iron")
		.replaceDust("thermal:iron_dust")
		.replacePlate("thermal:iron_plate")
		.replaceRod("thermal_extra:iron_rod")

	// 金
	new MaterialUnification("gold")
		.replaceDust("thermal:gold_dust")
		.replacePlate("thermal:gold_plate")
		.replaceRod("thermal_extra:gold_rod")

	// 铜
	new MaterialUnification("copper")
		.replaceDust("thermal:copper_dust")
		.replaceNugget("create:copper_nugget")
		.replacePlate("thermal:copper_plate")
		.replaceRod("thermal_extra:copper_rod")
		.replaceWire("createaddition:copper_wire")

	// 锡
	new MaterialUnification("tin")
		.replaceIngot("thermal:tin_ingot")
		.replaceDust("thermal:tin_dust")
		.replaceNugget("steam_letters:tin_nugget")
		.replaceBlock("thermal:tin_block")
		.replaceRawOreBlock("thermal:raw_tin_block")
		.replacePlate("steam_letters:tin_plate")
		.replaceRod("thermal_extra:tin_rod")
		.replaceRawOre("thermal:raw_tin")

	// 铅
	new MaterialUnification("lead")
		.replaceIngot("thermal:lead_ingot")
		.replaceDust("thermal:lead_dust")
		.replaceNugget("thermal:lead_nugget")
		.replaceBlock("thermal:lead_block")
		.replaceRawOreBlock("thermal:raw_lead_block")
		.replacePlate("thermal:lead_plate")
		.replaceRod("thermal_extra:lead_rod")
		.replaceWire("vintageimprovements:lead_wire")
		.replaceRawOre("thermal:raw_lead")

	// 铀
	new MaterialUnification("uranium")
		.replaceIngot("mekanism:ingot_uranium")
		.replaceDust("mekanism:dust_uranium")
		.replaceNugget("alexcaves:uranium_shard")
		.replaceBlock("immersiveengineering:storage_uranium")
		.replaceRawOreBlock("immersiveengineering:raw_block_uranium")
		.replaceRawOre("alexscaves:uranium")

	// 青铜
	new MaterialUnification("bronze")
		.replaceIngot("steam_letters:bronze_ingot")
		.replaceDust("thermal:bronze_dust")
		.replaceNugget("thermal:bronze_nugget")
		.replaceBlock("thermal:bronze_block")
		.replacePlate("steam_letters:bronze_plate")
		.replaceRod("thermal_extra:bronze_rod")

	// 钻石
	new MaterialUnification("diamond")
		.replaceDust("createaddition:diamond_grit")

	// 绿宝石
	new MaterialUnification("emerald")
		.replaceDust("thermal:emerald_dust")

	// 下界合金
	new MaterialUnification("netherite")
		.replaceDust("thermal:netherite_dust")
		.replaceNugget("createdeco:netherite_nugget")
		.replacePlate("createdeco:netherite_sheet")
		.replaceRod("thermal_extra:netherite_rod")

	// 青金石
	new MaterialUnification("lapis")
		.replaceDust("thermal:lapis_dust")

	// 黑曜石
	new MaterialUnification("obsidian")
		.replaceDust("create:powdered_obsidian")

	// 石英
	new MaterialUnification("quartz")
		.replaceDust("thermal:quartz_dust")

	// 钢
	new MaterialUnification("steel")
		.replaceIngot("cmi:steel_ingot")
		.replaceDust("cmi:steel_dust")
		.replaceNugget("cmi:steel_nugget")
		.replaceBlock("cmi:steel_block")
		.replacePlate("cmi:steel_plate")
		.replaceRod("vintageimprovements:steel_rod")
		.replaceWire("vintageimprovements:steel_wire")

	// 硫磺
	new MaterialUnification("sulfur")
		.replaceDust("alexcaves:sulfur_dust")
		.replaceBlock("vintageimprovements:sulfur_block")

	// 木
	new MaterialUnification("wood")
		.replaceDust("mekanism:sawdust")

	// 铝
	new MaterialUnification("aluminum")
		.replaceIngot("neoecoae:aluminum_ingot")
		.replaceDust("neoecoae:aluminum_dust")
		.replaceBlock("neoecoae:aluminum_block")
		.replaceRawOreBlock("neoecoae:raw_aluminum_block")
		.replaceRod("vintageimprovements:aluminum_rod")
		.replaceWire("vintageimprovements:aluminum_wire")
		.replaceRawOre("neoecoae:raw_aluminum_ore")

	// 银
	new MaterialUnification("silver")
		.replaceIngot("thermal:silver_ingot")
		.replaceDust("thermal:silver_dust")
		.replaceNugget("thermal:silver_nugget")
		.replaceBlock("thermal:silver_block")
		.replaceRawOreBlock("thermal:raw_silver_block")
		.replacePlate("thermal:silver_plate")
		.replaceRod("thermal_extra:silver_rod")
		.replaceRawOre("thermal:raw_silver")

	// 镍
	new MaterialUnification("nickel")
		.replaceIngot("thermal:nickel_ingot")
		.replaceDust("thermal:nickel_dust")
		.replaceNugget("thermal:nickel_nugget")
		.replaceBlock("thermal:nickel_block")
		.replaceRawOreBlock("thermal:raw_nickel_block")
		.replacePlate("thermal:nickel_plate")
		.replaceRod("thermal_extra:nickel_rod")
		.replaceRawOre("thermal:raw_nickel")

	// 康铜
	new MaterialUnification("constantan")
		.replaceDust("thermal:constantan_dust")
		.replaceNugget("thermal:constantan_nugget")
		.replaceBlock("thermal:constantan_block")
		.replacePlate("thermal:constantan_plate")
		.replaceRod("thermal_extra:constantan_rod")

	// 琥珀金
	new MaterialUnification("electrum")
		.replaceIngot("thermal:electrum_ingot")
		.replaceDust("thermal:electrum_dust")
		.replaceNugget("createaddition:electrum_nugget")
		.replaceBlock("thermal:electrum_block")
		.replacePlate("thermal:electrum_plate")
		.replaceRod("thermal_extra:electrum_rod")
		.replaceWire("createaddition:electrum_wire")

	// 硝石
	new MaterialUnification("niter")
		.replaceDust("thermal:niter_dust")

	// 木炭
	new MaterialUnification("charcoal")
		.replaceBlock("thermal:charcoal_block")

	// 玫瑰金
	new MaterialUnification("rose_gold")
		.replaceIngot("tconstruct:rose_gold_ingot")
		.replaceNugget("tconstruct:rose_gold_nugget")
		.replaceBlock("tconstruct:rose_gold_block")
		.replacePlate("vintageimprovements:rose_gold_sheet")

	// 焦煤
	new MaterialUnification("coal_coke")
		.replaceBlock("thermal:coal_coke_block")

	// 共振紫水晶
	new MaterialUnification("charged_amethyst")
		.replaceType("gem", "gems", "cmi:charged_amethyst")

	// 安山合金
	new MaterialUnification("andesite_alloy")
		._addUnification("andesite_alloy_plate", [
			"#forge:plates/andesite",
			"#forge:plates/andesite_alloy"
		], "vintageimprovements:andesite_sheet")

	// 末影
	new MaterialUnification("enderium")
		.replacePlate("thermal:enderium_plate")
		.replaceRod("thermal_extra:enderium_rod")

	// 流明
	new MaterialUnification("lumium")
		.replacePlate("thermal:lumium_plate")
		.replaceRod("thermal_extra:lumium_rod")

	// 信素
	new MaterialUnification("signalum")
		.replacePlate("thermal:signalum_plate")
		.replaceRod("thermal_extra:signalum_rod")

	// 殷钢
	new MaterialUnification("invar")
		.replacePlate("thermal:invar_plate")

	// 钴
	new MaterialUnification("cobalt")
		.replacePlate("vintageimprovements:cobalt_sheet")

	// 黏钢
	new MaterialUnification("slimesteel")
		.replacePlate("vintageimprovements:slimesteel_sheet")

	// 皇后史莱姆
	new MaterialUnification("queens_slime")
		.replacePlate("vintageimprovements:queens_slime_sheet")

	// 玛玉灵
	new MaterialUnification("manyullyn")
		.replacePlate("vintageimprovements:manyullyn_sheet")

	// 黑色科斯林青铜
	new MaterialUnification("hepatizon")
		.replacePlate("vintageimprovements:hepatizon_sheet")

	// 紫水晶青铜
	new MaterialUnification("amethyst_bronze")
		.replacePlate("vintageimprovements:amethyst_bronze_sheet")
	
	// 钨
	new MaterialUnification("tungsten")
		.replaceIngot("cmi:tungsten_ingot")
})
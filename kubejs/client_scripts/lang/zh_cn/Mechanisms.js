ClientEvents.lang("zh_cn", (event) => {
	/**
	 * 
	 * @param {string} material 
	 * @param {string} value 
	 */
	function addMechanismMachineLang(material, value) {
		event.add(`block.${Cmi.MODID}.${material}_machine`, `${value}机器`)
	}

	/**
	 * 
	 * @param {string} material 
	 * @param {string} value 
	 */
	function addMechanismLang(material, value) {
		event.add(`item.${Cmi.MODID}.${material}_mechanism`, `${value}构件`)
		event.add(`item.${Cmi.MODID}.incomplete_${material}_mechanism`, `${value}构件(半成品)`)
	}

	/**
	 * 
	 * @param {string} material 
	 * @param {string} value 
	 */
	function addCraftingIncompleteLang(material, value) {
		event.add(`item.${Cmi.MODID}.${material}_mechanism_basement`, `${value}构件底座`)
		event.add(`item.${Cmi.MODID}.${material}_mechanism_augment`, `${value}构件组件`)
	}

	/**
	 * 
	 * @param {string} material 
	 * @param {string} value 
	 */
	function addRandomMechanismLang(material, value) {
		event.add(`item.${Cmi.MODID}.${material}_random_mechanism`, `${value}随机构件`)
	}

	/**
	 * 
	 * @param {string} material 
	 * @param {string} value 
	 */
	function addMechanismPartLang(material, value) {
		event.add(`item.${Cmi.MODID}.${material}_mechanism_part`, `${value}构件零件`)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} value 
	 */
	function addFlashDriveLang(key, value) {
		event.add(`item.${Cmi.MODID}.${key}_mechanism_flash_drive`, `${value}构件闪存盘`)
	}

	addMechanismPartLang("basic", "基础")
	addMechanismPartLang("mechanical", "机械")
	addMechanismPartLang("flux", "通量")
	addMechanismPartLang("magical", "魔力")
	addMechanismPartLang("quantum", "量子")
	addMechanismPartLang("engineering", "工程")
	addMechanismPartLang("mekanism", "通用")
	addMechanismPartLang("final", "终章")
	addMechanismPartLang("space", "太空")

	let mechanismGroup = [
		["nature", "自然"],
		["wooden", "木质"],
		["stone", "石质"],
		["iron", "铁质"],
		["copper", "铜质"],
		["andesite", "安山"],
		["photosensitive", "感光"],
		["gold", "金质"],
		["cobalt", "钴质"],
		["thermal", "热力"],
		["reinforced", "强化"],
		// ["resonant", "谐振"],
		["railway", "铁路"],
		["ender", "末影"],
		["light_engineering", "轻型工程"],
		["heavy_engineering", "重型工程"],
		["enchanted", "附魔"],
		["smart", "智能"],
		["computing", "计算"],
		["tier_1_aviation", "壹级科技航天"],
		["tier_2_aviation", "贰级科技航天"],
		["tier_3_aviation", "叁级科技航天"],
		["tier_4_aviation", "肆级科技航天"],
		["basic_mekanism", "基础通用"],
		["advanced_mekanism", "高级通用"],
		["elite_mekanism", "精英通用"],
		["ultimate_mekanism", "终极通用"],
		["nuclear", "核"],
		["antimatter", "反物质"],
		["coil", "线圈"],
		["sculk", "幽匿"],
		["colorful", "多彩"],
		["pig_iron", "生铁"],
		["nether", "下界"],
		["creative", "创造"],
		["precision", "精密"],
		["redstone", "红石"],
		["potion", "秘药"],
		["bronze", "青铜"],
		["air_tight", "气密"],
		["aeronautic", "航空"],
		["astronautic", "宇航"]
	]
	mechanismGroup.forEach(([material, name]) => {
		addFlashDriveLang(material, name)
		addMechanismLang(material, name)
		addMechanismMachineLang(material, name)
		addCraftingIncompleteLang(material, name)
	})

	let randomMechanismGroup = [
		["basic", "基础"],
		["mechanical", "机械"],
		["engineering", "工程"],
		["flux", "通量"],
		["magical", "魔力"],
		["quantum", "量子"],
		["mekanism", "通用"],
		["space", "太空"],
		["random", "随机"]
	]
	randomMechanismGroup.forEach(([material, name]) => {
		addRandomMechanismLang(material, name)
	})
})

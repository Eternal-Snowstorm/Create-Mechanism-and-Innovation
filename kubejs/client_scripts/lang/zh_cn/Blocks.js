ClientEvents.lang("zh_cn", (event) => {
	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addBlockLang(key, name) {
		event.add(`block.${Cmi.MODID}.${key}`, name)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addOreNodeLang(key, name) {
		event.add(`block.${Cmi.MODID}.${key}_deposit_block`, `${name}矿藏`)
		event.add(`block.create_rns.${key}_deposit_block`, `${name}矿藏`)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addMachineLang(key, name) {
		event.add(`block.${Cmi.MODID}.${key}`, name)
		event.add(`machine.${Cmi.MODID}.${key}`, name)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addCasingLang(key, name) {
		event.add(`block.${Cmi.MODID}.${key}_casing`, `${name}机壳`)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addBuildLang(key, name) {
		event.add(`block.${Cmi.MODID}.${key}_slab`, `${name}台阶`)
		event.add(`block.${Cmi.MODID}.${key}_stairs`, `${name}楼梯`)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addDrawerLang(key, name) {
		event.add(`block.${Cmi.MODID}.${key}_1`, `${name}抽屉(1x1)`)
		event.add(`block.${Cmi.MODID}.${key}_2`, `${name}抽屉(1x2)`)
		event.add(`block.${Cmi.MODID}.${key}_4`, `${name}抽屉(2x2)`)
	}

	addCasingLang("iron", "铁")
	addCasingLang("bronze", "青铜")
	addCasingLang("steel", "钢")
	addCasingLang("smart", "智能")
	addCasingLang("computing", "高级计算")

	addBlockLang("rocket_pattern", "火箭模版")
	addBlockLang("tier_1_rocket_frame", "一阶火箭框架")
	addBlockLang("tier_2_rocket_frame", "二阶火箭框架")
	addBlockLang("tier_3_rocket_frame", "三阶火箭框架")
	addBlockLang("tier_4_rocket_frame", "四阶火箭框架")
	addBlockLang("accelerator", "构件之力催生器")
	addBlockLang("osmium_tile", "锇砖瓦")
	addBlockLang("compression_end_stone_dust_block", "压缩末地石粉块")
	addBlockLang("crucible_base", "底座")
	addBlockLang("crucible_tuyere", "风口")
	addBlockLang("industrial_frame", "工程块框架")
	addBlockLang("peat_block", "泥炭块")
	addBlockLang("oil_shale", "油页岩")
	addBlockLang("combustion_medium_block", "燃烧介质块")
	addBlockLang("radsand", "辐射沙")
	addBlockLang("kaolinite", "高岭土")
	addBlockLang("refractory_grout", "耐火砖泥")
	addBlockLang("entro_block", "恩特罗块")

	addBlockLang("eden_crystal", "伊甸水晶")

	addBlockLang("impact_pile", "冲击桩")
	addBlockLang("void_spring", "虚空涌泉")

	addBlockLang("broken_andesite_drill_head", "损坏的安山岩制钻头")
	addBlockLang("broken_copper_drill_head", "损坏的铜制钻头")
	addBlockLang("broken_brass_drill_head", "损坏的黄铜制钻头")

	addBlockLang("cracked_concrete", "碎裂的混凝土")
	addBlockLang("bar_acid", "酸洗钢筋")
	addBlockLang("bar_concrete", "带混凝土的结构钢筋")
	addBlockLang("bar_normal", "结构钢筋")
	addBlockLang("bar_rust", "锈蚀钢筋")
	addBlockLang("bar_rust_concrete", "带混凝土的锈蚀钢筋")
	addBlockLang("radar", "雷达")
	addBlockLang("broken_radar", "损坏的雷达")
	addBlockLang("white_reinforced_concrete", "白色钢筋混凝土")
	addBlockLang("white_reinforced_concrete_stairs", "白色钢筋混凝土楼梯")
	addBlockLang("white_reinforced_concrete_slab", "白色钢筋混凝土台阶")
	addBlockLang("white_reinforced_concrete_wall", "白色钢筋混凝土墙")
	addBlockLang("gray_reinforced_concrete", "灰色钢筋混凝土")
	addBlockLang("gray_reinforced_concrete_stairs", "灰色钢筋混凝土楼梯")
	addBlockLang("gray_reinforced_concrete_slab", "灰色钢筋混凝土台阶")
	addBlockLang("gray_reinforced_concrete_wall", "灰色钢筋混凝土墙")
	addBlockLang("power_supply", "电源")
	addBlockLang("transformer", "变压器")
	addBlockLang("tracking_array", "追踪阵列")
	addBlockLang("modem", "调制解调器")
	addBlockLang("broken_power_supply", "损坏的电源")
	addBlockLang("broken_transformer", "损坏的变压器")
	addBlockLang("broken_tracking_array", "损坏的追踪阵列")
	addBlockLang(`broken_modem`, "损坏的调制解调器")
	addBlockLang("piggy_bank", "破旧的存钱罐")

	addBlockLang("chiseled_copper", "雕纹铜块")
	addBlockLang("exposed_chiseled_copper", "斑驳的雕纹铜块")
	addBlockLang("weathered_chiseled_copper", "锈蚀的雕纹铜块")
	addBlockLang("oxidized_chiseled_copper", "氧化的雕纹铜块")
	addBlockLang("waxed_chiseled_copper", "涂蜡的雕纹铜块")
	addBlockLang("waxed_exposed_chiseled_copper", "涂蜡的斑驳雕纹铜块")
	addBlockLang("waxed_weathered_chiseled_copper", "涂蜡的锈蚀雕纹铜块")
	addBlockLang("waxed_oxidized_chiseled_copper", "涂蜡的氧化雕纹铜块")

	addOreNodeLang("vanadium", "钒矿")
	addOreNodeLang("platinum", "铂矿")
	addOreNodeLang("cheese", "奶酪")
	addOreNodeLang("coal", "煤炭")
	addOreNodeLang("oil_shale", "油页岩")
	addOreNodeLang("aluminum", "铝")
	addOreNodeLang("osmium", "锇矿")

	addMachineLang("flash_disk_writer", "闪存盘写入器")
	addMachineLang("chemical_gas_extractor", "化学气体抽取器")
	addMachineLang("steam_boiler", "青铜蒸汽锅炉")
	addMachineLang("radar_terminal", "雷达终端")

	// 制作组fumo
	addBlockLang("re_construction", "Re_Construction")
	addBlockLang("dkrkoo_weihe", "dkrkoo为何")
	addBlockLang("dropper_qwq", "⑨Dropper_QWQ⑨")
	addBlockLang("117458866249", "117458866249")
	addBlockLang("random_mechanism", "随机构件")
	addBlockLang("eternalsnowstorm", "逐日炎雪_中微子")
	addBlockLang("qi_month", "柒月")
	addBlockLang("ein_nameuwu", "幽灵猫")
	addBlockLang("huanchenxiaohuli", "幻想星辰")
	addBlockLang("belalus", "Belalus")
	addBlockLang("fiber_optics", "FiberOptics")
	addBlockLang("ye_anqing", "燕栖")
	addBlockLang("sakura_star_cn", "MF.")
	addBlockLang("qicaijie", "亓才孑")
	addBlockLang("flash_yi", "闪电羿")
	addBlockLang("keyxeldesu", "一只键盘虾")
	addBlockLang("sergei", "谢尔盖")
	addBlockLang("lirx_ovo", "栗子")

	// build
	addBuildLang("brass", "黄铜")
	addBuildLang("industrial_iron", "工业铁")

	addDrawerLang("rubberwood", "橡胶木")
})
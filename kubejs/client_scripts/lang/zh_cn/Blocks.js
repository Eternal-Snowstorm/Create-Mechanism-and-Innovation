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
		event.add(`block.${Cmi.MODID}.${key}`, name)
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

	// 机壳
	addCasingLang("iron", "铁")
	addCasingLang("bronze", "青铜")
	addCasingLang("steel", "钢")
	addCasingLang("smart", "智能")
	addCasingLang("computing", "高级计算")
	addCasingLang("airtight", "气密")

	// 火箭
	addBlockLang("rocket_pattern", "火箭模版")
	addBlockLang("tier_1_rocket_frame", "一阶火箭框架")
	addBlockLang("tier_2_rocket_frame", "二阶火箭框架")
	addBlockLang("tier_3_rocket_frame", "三阶火箭框架")
	addBlockLang("tier_4_rocket_frame", "四阶火箭框架")

	// 资源性方块
	addBlockLang("peat_block", "泥炭块")
	addBlockLang("oil_shale", "油页岩")
	addBlockLang("combustion_medium_block", "燃烧介质块")
	addBlockLang("radsand", "辐射沙")
	addBlockLang("kaolinite", "高岭土")
	addBlockLang("refractory_grout", "耐火砖泥")

	// 功能性方块
	addBlockLang("impact_pile", "冲击桩")
	addBlockLang("void_spring", "虚空涌泉")
	addBlockLang("eden_crystal", "伊甸水晶")
	addBlockLang("redstone_diode_base", "红石二极管基底")
	addBlockLang("brass_diode_base", "黄铜二极管基底")
	addBlockLang("piggy_bank", "破旧的存钱罐")
	addBlockLang("crucible_base", "底座")
	addBlockLang("crucible_tuyere", "风口")
	addBlockLang("industrial_frame", "工程块框架")
	addBlockLang("accelerator", "构件之力催生器")

	// 雷达设备
	addBlockLang("radar", "雷达")
	addBlockLang("power_supply", "电源")
	addBlockLang("transformer", "变压器")
	addBlockLang("tracking_array", "追踪阵列")
	addBlockLang("modem", "调制解调器")

	// 损坏的雷达设备
	addBlockLang("broken_radar", "损坏的雷达")
	addBlockLang("broken_power_supply", "损坏的电源")
	addBlockLang("broken_transformer", "损坏的变压器")
	addBlockLang("broken_tracking_array", "损坏的追踪阵列")
	addBlockLang(`broken_modem`, "损坏的调制解调器")
	
	// 钻井
	addBlockLang("driller_cooler_input_bus", "钻机冷却剂输入总线")
	addBlockLang("driller_cooler_output_bus", "钻机冷却剂输出总线")
	addBlockLang("driller_bearing", "钻机轴承")
	addBlockLang("driller_head", "钻头")
	addBlockLang("driller_fluid_pump", "钻机液泵")
	addBlockLang("driller_gas_pump", "钻机气泵")

	// 混凝土
	addBlockLang("white_reinforced_concrete", "白色钢筋混凝土")
	addBlockLang("gray_reinforced_concrete", "灰色钢筋混凝土")
	addBlockLang("light_gray_reinforced_concrete", "浅灰色钢筋混凝土")
	addBlockLang("black_reinforced_concrete", "黑色钢筋混凝土")
	addBlockLang("red_reinforced_concrete", "红色钢筋混凝土")
	addBlockLang("orange_reinforced_concrete", "橙色钢筋混凝土")
	addBlockLang("yellow_reinforced_concrete", "黄色钢筋混凝土")
	addBlockLang("green_reinforced_concrete", "绿色钢筋混凝土")
	addBlockLang("cyan_reinforced_concrete", "青色钢筋混凝土")
	addBlockLang("blue_reinforced_concrete", "蓝色钢筋混凝土")
	addBlockLang("purple_reinforced_concrete", "紫色钢筋混凝土")
	addBlockLang("magenta_reinforced_concrete", "洋红色钢筋混凝土")
	addBlockLang("lime_reinforced_concrete", "黄绿色钢筋混凝土")
	addBlockLang("light_blue_reinforced_concrete", "淡蓝色钢筋混凝土")
	addBlockLang("pink_reinforced_concrete", "粉色钢筋混凝土")
	addBlockLang("brown_reinforced_concrete", "棕色钢筋混凝土")

	// 幻晶
	addBlockLang("dreamcore_coil", "幻晶线圈")
	addBlockLang("dtma_dreamcore_energy_core", "DTMA 幻晶能量核心")

	// 雕纹铜块
	addBlockLang("chiseled_copper", "雕纹铜块")
	addBlockLang("exposed_chiseled_copper", "斑驳的雕纹铜块")
	addBlockLang("weathered_chiseled_copper", "锈蚀的雕纹铜块")
	addBlockLang("oxidized_chiseled_copper", "氧化的雕纹铜块")
	addBlockLang("waxed_chiseled_copper", "涂蜡的雕纹铜块")
	addBlockLang("waxed_exposed_chiseled_copper", "涂蜡的斑驳雕纹铜块")
	addBlockLang("waxed_weathered_chiseled_copper", "涂蜡的锈蚀雕纹铜块")
	addBlockLang("waxed_oxidized_chiseled_copper", "涂蜡的氧化雕纹铜块")

	// 其他方块
	addBlockLang("entro_block", "恩特罗块")
	addBlockLang("deposit_dust_block", "矿藏粉末块")
	addBlockLang("osmium_tile", "锇砖瓦")
	addBlockLang("compression_end_stone_dust_block", "压缩末地石粉块")

	// 矿藏
	addOreNodeLang("vanadium", "钒矿")
	addOreNodeLang("platinum", "铂矿")
	addOreNodeLang("cheese", "奶酪")
	addOreNodeLang("coal", "煤炭")
	addOreNodeLang("oil_shale", "油页岩")
	addOreNodeLang("aluminum", "铝")
	addOreNodeLang("osmium", "锇矿")

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

	// 建筑方块
	addBuildLang("brass", "黄铜")
	addBuildLang("industrial_iron", "工业铁")
	addBuildLang("ceramic_tile", "瓷砖")

	// 抽屉
	addDrawerLang("rubberwood", "橡胶木")
})
ClientEvents.lang("zh_cn", (event) => {
	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addItemLang(key, name) {
		event.add(`item.${Cmi.MODID}.${key}`, name)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addCellItemLang(key, name) {
		event.add(`item.${Cmi.MODID}.${key}_cell`, `${name}硬盘`)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} text1 
	 * @param {string} text2 
	 */
	function addCellLang(key, text1, text2) {
		event.add(`text.${Cmi.MODID}.cell.${key}.page_1`, text1)
		event.add(`text.${Cmi.MODID}.cell.${key}.page_2`, text2)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addCastItemLang(key, name) {
		event.add(`item.${Cmi.MODID}.${key}_cast`, `${name}金质铸模`)
		event.add(`item.${Cmi.MODID}.${key}_sand_cast`, `${name}沙子铸模`)
		event.add(`item.${Cmi.MODID}.${key}_red_sand_cast`, `${name}红沙铸模`)
		event.add(`item.${Cmi.MODID}.bronze_${key}_cast`, `${name}青铜质铸模`)
	}

	// 锭
	addItemLang("togni_leets", "钢錠")
	addItemLang("overcharged_alloy_ingot", "超载合金锭")
	addItemLang("electrolized_redstone", "电离中和红石")
	addItemLang("refined_iron_bloom", "精炼铁方坯")
	addItemLang("enriched_alloy", "富集合金")
	addItemLang("silicon_carbide", "碳化硅")
	addItemLang("entro_alloy", "恩特罗合金")
	addItemLang("refractory_brick_bloom", "耐火砖坯")
	addItemLang("pure_semi_molten_osmium", "半熔融锇")
	addItemLang("activated_graphite_ingot", "活化石墨锭")
	addItemLang("magnetic_alloy", "磁性合金")
	addItemLang("piezoelectric_ceramic", "压电陶瓷")
	addItemLang("polymerization_catalytic_alloy", "聚合催化合金")
	addItemLang("deposition_catalytic_alloy", "沉积催化合金")

	// 板
	addItemLang("stone_plate", "石板")
	addItemLang("dense_sturdy_sheet", "致密坚固板")
	addItemLang("redstone_plate", "红石板")
	addItemLang("inscribed_silicon", "线刻硅板")
	addItemLang("rubber_plate", "橡胶板")
	addItemLang("silicon_carbide_plate", "碳化硅板")
	addItemLang("graphene", "石墨烯")
	addItemLang("flame_retardant_plastic", "阻燃塑料")
	addItemLang("silicon_rubber_plate", "硅橡胶板")
	addItemLang("composite_tungsten_steel_plate", "复合钨钢板")
	addItemLang("composite_carbon_fiber_plate", "复合碳纤板")
	addItemLang("composite_magnetic_conduction_plate", "复合磁导板")
	addItemLang("ethylene_polymerization_catalytic_plate", "乙烯聚合催化片")
	addItemLang("carbon_deposition_catalytic_plate", "碳沉积催化片")
	addItemLang("carbon_polymerization_catalytic_plate", "碳聚合催化片")

	// 粉
	addItemLang("andesite_dust", "安山岩粉")
	addItemLang("lime_dust", "石灰粉")
	addItemLang("asurine_dust", "皓蓝石粉")
	addItemLang("crimsite_dust", "绯红岩粉")
	addItemLang("ochrum_dust", "赭金沙粉")
	addItemLang("veridium_dust", "辉绿岩粉")
	addItemLang("calcite_dust", "方解石粉")
	addItemLang("galena_dust", "方铅岩粉")
	addItemLang("machalite_dust", "燕雀石粉")
	addItemLang("dragonite_dust", "辉龙石粉")
	addItemLang("purified_quartz_dust", "高纯石英粉")
	addItemLang("rubber_dust", "橡胶粉")
	addItemLang("furnaced_lime", "生石灰")
	addItemLang("sludge_extract", "淤泥提取物")
	addItemLang("silicon_mixture", "硅混合物")
	addItemLang("magnesium_hydroxide", "氢氧化镁")
	addItemLang("brominated_flame_retardants", "溴系阻燃剂")
	addItemLang("plant_ash", "草木灰")
	addItemLang("deposit_dust", "矿藏粉末")
	addItemLang("red_mud", "赤泥")
	addItemLang("aluminum_oxide", "氧化铝")
	addItemLang("trinitrotoluene", "三硝基甲苯")
	addItemLang("nitrocellulose", "硝化纤维")
	addItemLang("void_dust", "虚空粉")
	addItemLang("chaotic_void_dust", "混沌虚空粉")
	addItemLang("acid_washed_mercury_rock", "酸洗水星岩")
	addItemLang("pyrolyzed_moon_rock_residue", "热解月岩残渣")
	addItemLang("dense_oxide_film", "致密氧化物薄膜")
	addItemLang("alkaline_neodymium_sediment", "碱性钕沉淀")
	addItemLang("ionized_red_dust", "电离红色沙尘")
	addItemLang("magnetic_sediment", "磁性沉淀")
	addItemLang("refractory_material_powder", "耐火材料粉")
	addItemLang("raw_titanium_dust", "粗钛粉")
	addItemLang("raw_tungsten_dust", "粗钨粉")
	addItemLang("raw_titanium_mixture", "粗钛混合物")
	addItemLang("tungsten_mixture", "钨混合物")
	addItemLang("tungsten_reactant", "钨反应物")
	addItemLang("raw_tungsten_dust", "粗钨粉")
	addItemLang("neodymium_mixture", "钕混合物")
	addItemLang("germanium_mixture", "锗混合物")
	addItemLang("etrium_mixture", "埃特恩混合物")
	addItemLang("entro_peroxide_dust", "过氧化恩特罗粉")
	addItemLang("reduced_entro_dust", "还原恩特罗粉")
	addItemLang("entro_compound", "恩特罗化合物")
	addItemLang("entro_oxidizer", "恩特罗氧化剂")
	addItemLang("sodium_reducing_agent", "钠还原剂")
	addItemLang("venus_stone_dust", "金星岩粉")

	// 晶体
	addItemLang("charged_amethyst", "充能紫水晶")
	addItemLang("alpha_blackstone_source", "Α(Alpha)型黑石源质")
	addItemLang("beta_blackstone_source", "Β(Beta)型黑石源质")
	addItemLang("gamma_blackstone_source", "Γ(Gamma)型黑石源质")
	addItemLang("delta_blackstone_source", "Δ(Delta)型黑石源质")
	addItemLang("source_ruby", "红源晶")
	addItemLang("source_sapphire", "蓝源晶")
	addItemLang("source_emeraid", "绿源晶")
	addItemLang("enriched_osmium_crystal", "富集锇结晶")
	addItemLang("purified_silicon_crystal", "纯化硅晶")
	addItemLang("single_crystal_silicon", "单晶硅")
	addItemLang("enriched_silicon", "富集硅")
	addItemLang("pure_sapphire_compound", "纯净蓝宝石化合物")
	addItemLang("enriched_germanium_iron_mixture", "富集锗铁混合物")
	addItemLang("germanium_crystal", "锗晶体")
	addItemLang("infuse_osmium", "灌注锇")
	addItemLang("machalite", "燕雀石")
	addItemLang("dragonite", "辉龙石")
	addItemLang("magnetic_source", "磁性源质")
	addItemLang("entro_peroxide_crystal", "过氧化恩特罗水晶")
	addItemLang("etrium_peroxide_crystal", "过氧化埃忒恩水晶")
	addItemLang("reduced_entro_crystal", "还原恩特罗水晶")
	addItemLang("ionized_entro_crystal", "电离恩特罗水晶")
	addItemLang("crystal_molten_entro", "晶态熔融恩特罗水晶")
	addItemLang("spiritcore_ore", "精晶原石")
	addItemLang("titanium_crystal", "钛晶体")
	addItemLang("cobalt_electrolyte", "钴电解质")
	addItemLang("pure_source", "纯净晶源")

	// 机械零件
	addItemLang("rubber_hand", "橡胶手部零件")
	addItemLang("chromeplated_steel_gear", "镀铬钢齿轮")
	addItemLang("composite_carbon_fiber_gear", "复合碳纤齿轮")
	addItemLang("andesite_casing_framework", "安山机壳框架")
	addItemLang("brass_casing_framework", "黄铜机壳框架")
	addItemLang("bronze_casing_framework", "青铜机壳框架")
	addItemLang("copper_casing_framework", "铜机壳框架")

	// 电子元件
	addItemLang("redstone_wire", "红石线")
	addItemLang("empty_exe", "空程序.exe")
	addItemLang("empty_flash_drive", "空白闪存盘")
	addItemLang("programmed_flash_drive", "已编程闪存盘")
	addItemLang("motor_rotor", "电动机转子")
	addItemLang("entro_crystal", "恩特罗水晶")
	addItemLang("concurrent_processor", "并发处理器")
	addItemLang("printed_concurrent_processor", "并发电路板")
	addItemLang("concurrent_processor_press", "并发压印模板")
	addItemLang("resonant_tube", "共振管")
	addItemLang("diode", "二极管")
	addItemLang("glowstone_lumen_tube", "萤石流明管道")
	addItemLang("thermal_unit", "热力通量单元")
	addItemLang("basalz_unit", "大地震撼单元")
	addItemLang("blaze_unit", "烈焰燃烧单元")
	addItemLang("blitz_unit", "狂风催化单元")
	addItemLang("blizz_unit", "暴雪冷凝单元")
	addItemLang("basalt_general_component", "大地碎裂组件")
	addItemLang("blaze_general_component", "烈焰焚烬组件")
	addItemLang("blitz_general_component", "狂风卷袭组件")
	addItemLang("blizz_general_component", "暴雪冻结组件")
	addItemLang("nuke_cooler", "冷却设备")
	addItemLang("ferrit_core", "铁氧体磁芯")
	addItemLang("magnetic_contact", "磁触点")
	addItemLang("osmium_wafer", "锇晶圆")
	addItemLang("silicon_wafer", "硅晶圆")
	addItemLang("germanium_wafer", "锗晶圆")
	addItemLang("entro_alloy_wafer", "恩特罗合金晶圆")
	addItemLang("basic_electronic_components", "基础电子元件")
	addItemLang("advanced_electronic_components", "高级电子元件")
	addItemLang("elite_electronic_components", "精英电子元件")
	addItemLang("ultimate_electronic_components", "终极电子元件")

	// 工具
	addItemLang("geological_hammer", "地质锤(调试工具)")
	addItemLang("initial_item_kit", "初始套件箱")
	addItemLang("super_knife", "纯粹小刀")
	addItemLang("wooden_knife", "木质小刀")
	addItemLang("wooden_faucet", "木质龙头")
	addItemLang("cast_iron_faucet", "铸铁龙头")
	addItemLang("steel_faucet", "钢质龙头")
	addItemLang("overcharged_alloy_faucet", "超载合金龙头")
	addItemLang("paxel", "镐尖斧")
	addItemLang("handheld_crafting_table", "手持工作台")
	addItemLang("flint_hammer", "燧石锤")
	addItemLang("iron_hammer", "铁锤")
	addItemLang("diamond_hammer", "钻石锤")
	addItemLang("astral_core", "繁星核心")

	// 半成品
	addItemLang("incomplete_cogwheel", "齿轮(半成品)")
	addItemLang("incomplete_bronze_cogwheel", "青铜齿轮(半成品)")
	addItemLang("incomplete_cast_iron_cogwheel", "铸铁齿轮(半成品)")
	addItemLang("incomplete_steel_cogwheel", "钢齿轮(半成品)")
	addItemLang("incomplete_large_cogwheel", "大齿轮(半成品)")
	addItemLang("incomplete_bronze_large_cogwheel", "青铜大齿轮(半成品)")
	addItemLang("incomplete_cast_iron_large_cogwheel", "铸铁大齿轮(半成品)")
	addItemLang("incomplete_steel_large_cogwheel", "钢大齿轮(半成品)")
	addItemLang("incomplete_gas_container", "气体容器(半成品)")
	addItemLang("incomplete_advanced_control_circuit", "高级控制电路(半成品)")
	addItemLang("incomplete_elite_control_circuit", "精英控制电路(半成品)")
	addItemLang("incomplete_ultimate_control_circuit", "终极控制电路(半成品)")
	addItemLang("incomplete_electron_tube", "电子管(半成品)")
	addItemLang("incomplete_resonant_tube", "共振管(半成品)")
	addItemLang("incomplete_carbon_nanotube", "碳纳米管(半成品)")
	addItemLang("incomplete_tungsten_steel_plate", "复合钨钢板(半成品)")
	addItemLang("incomplete_composite_carbon_fiber_plate", "复合碳纤板(半成品)")
	addItemLang("incomplete_upgrade_augment_1", "硬化整合组件(半成品)")
	addItemLang("incomplete_upgrade_augment_2", "强化整合组件(半成品)")
	addItemLang("incomplete_upgrade_augment_3", "谐振整合组件(半成品)")
	addItemLang("incomplete_upgrade_augment_4", "龙钢整合组件(半成品)")
	addItemLang("incomplete_upgrade_augment_5", "深渊整合组件(半成品)")
	addItemLang("incomplete_upgrade_augment_6", "铝整合组件(半成品)")
	addItemLang("incomplete_upgrade_augment_7", "不锈钢整合组件(半成品)")
	addItemLang("incomplete_upgrade_augment_8", "钛合金整合组件(半成品)")
	addItemLang("incomplete_upgrade_augment_9", "钨钢整合组件(半成品)")

	addItemLang("incomplete_tier_1_rocket_frame", "一阶火箭框架(半成品)")
	addItemLang("incomplete_tier_2_rocket_frame", "二阶火箭框架(半成品)")
	addItemLang("incomplete_tier_3_rocket_frame", "三阶火箭框架(半成品)")
	addItemLang("incomplete_tier_4_rocket_frame", "四阶火箭框架(半成品)")
	addItemLang("incomplete_tier_1_rocket", "一阶火箭(半成品)")
	addItemLang("incomplete_tier_2_rocket", "二阶火箭(半成品)")
	addItemLang("incomplete_tier_3_rocket", "三阶火箭(半成品)")
	addItemLang("incomplete_tier_4_rocket", "四阶火箭(半成品)")

	addItemLang("incomplete_scanning_module", "扫描模块(半成品)")
	addItemLang("incomplete_scanner", "扫描器(半成品)")
	addItemLang("incomplete_aviation_cell", "航天硬盘(半成品)")
	addItemLang("combined_component_4k", "4K ME整合组件")
	addItemLang("combined_component_16k", "16K ME整合组件")
	addItemLang("combined_component_64k", "64K ME整合组件")
	addItemLang("combined_component_256k", "256K ME整合组件")
	addItemLang("combined_spatial_component_16", "16^3 空间整合组件")
	addItemLang("combined_spatial_component_128", "128^3 空间整合组件")

	addItemLang("bucket", "桶(?)")
	addItemLang("blood_slime_ball", "黏血球")
	addItemLang("raw_platinum_particles", "粗制铂微粒")
	addItemLang("platinum_crystal_nucleus", "铂晶核")
	addItemLang("platinum_shard", "铂碎片")
	addItemLang("wood_chip_briquette", "木屑块")
	addItemLang("compressed_wood_chip_briquette", "压缩木屑块")
	addItemLang("densely_packed_wood_chip_briquette", "致密压缩木屑块")
	addItemLang("creosote_wood_chip_briquette", "浸油致密压缩木屑块")
	addItemLang("small_coal_coke", "小块焦炭")
	addItemLang("andesite_alloy_noodle_stage0", "安山合金刀削面(阶段0)")
	addItemLang("andesite_alloy_noodle_stage1", "安山合金刀削面(阶段1)")
	addItemLang("andesite_alloy_noodle_stage2", "安山合金刀削面(阶段2)")
	addItemLang("andesite_alloy_noodle", "安山合金刀削面")
	addItemLang("peat", "泥炭")
	addItemLang("rubber_tree_bark", "橡胶树皮")
	addItemLang("grass_fiber", "草纤维")
	addItemLang("grass_string", "草绳")
	addItemLang("sugarcane_fiber", "甘蔗纤维")
	addItemLang("drawer_upgrade_template", "抽屉升级模板")
	addItemLang("guide", "指南")
	addItemLang("carbon_nanotube", "碳纳米管")
	addItemLang("titanium_alloy_mesh", "钛合金网")
	addItemLang("activated_graphite_chunk", "活化石墨碎块")
	addItemLang("titanium_alloy_coil", "钛合金线圈")
	addItemLang("parchment", "奇怪的羊皮纸")
	addItemLang("torn_parchment_a", "撕开的羊皮纸(甲)")
	addItemLang("torn_parchment_b", "撕开的羊皮纸(乙)")

	addItemLang("dreamcore_crystal", "幻晶晶簇")
	addItemLang("dreamcore_ore", "幻晶原石")
	addItemLang("dreamcore_seed", "幻晶晶种")

	addItemLang("power_supply_repair_kit", "电源修复包")
	addItemLang("transformer_repair_kit", "变压器修复包")
	addItemLang("tracker_repair_kit", "追踪阵列修复包")
	addItemLang(`modem_repair_kit`, "调制解调器修复包")

	addItemLang("radar_repair_kit", "雷达修复包")

	addItemLang("tier_1_rocket_nose_cone", "一阶火箭鼻锥")
	addItemLang("tier_2_rocket_nose_cone", "二阶火箭鼻锥")
	addItemLang("tier_3_rocket_nose_cone", "三阶火箭鼻锥")
	addItemLang("tier_4_rocket_nose_cone", "四阶火箭鼻锥")

	addItemLang("tier_1_rocket_fin", "一阶火箭尾翼")
	addItemLang("tier_2_rocket_fin", "二阶火箭尾翼")
	addItemLang("tier_3_rocket_fin", "三阶火箭尾翼")
	addItemLang("tier_4_rocket_fin", "四阶火箭尾翼")

	addItemLang("tier_1_rocket_body", "一阶火箭箭身")
	addItemLang("tier_2_rocket_body", "二阶火箭箭身")
	addItemLang("tier_3_rocket_body", "三阶火箭箭身")
	addItemLang("tier_4_rocket_body", "四阶火箭箭身")

	addItemLang("aluminum_upgrade_augment", "铝整合组件")
	addItemLang("stainless_steel_upgrade_augment", "不锈钢整合组件")
	addItemLang("titanium_alloy_upgrade_augment", "钛合金整合组件")
	addItemLang("tungsten_steel_upgrade_augment", "钨钢整合组件")

	addItemLang("amethyst_bronze_upgrade", "紫水晶青铜升级")
	addItemLang("rose_gold_upgrade", "玫瑰金升级")
	addItemLang("steel_upgrade", "钢升级")
	addItemLang("hepatizon_upgrade", "黑色柯林斯青铜升级")

	addItemLang("steam_cast_iron_upgrade", "铸铁蒸汽升级组件")
	addItemLang("steam_steel_upgrade", "钢制蒸汽升级组件")

	addItemLang("music_disc_mechanism", "Mechanism - Belalus")

	addItemLang("hammer_head", "冲压头")
	addItemLang("kaolinite_ball", "高岭土球")
	addItemLang("cmi_icon", "CMI 图标")

	addItemLang("purified_quartz", "高纯石英")
	addItemLang("silicon_rubber", "硅橡胶")
	addItemLang("andesite_aggregate", "安山混合物")
	addItemLang("vanadium_ore_chunk", "钒矿物碎块")
	addItemLang("platinum_ore_chunk", "铂矿物碎块")
	addItemLang("obsidian_cell", "黑曜石元件")

	addItemLang("sculk_chunk", "幽匿碎块")
	addItemLang("dead_sculk", "失活幽匿")
	addItemLang("active_sculk", "活化幽匿")
	addItemLang("sculk_bonemeal", "幽匿骨粉")
	addItemLang("sculk_bone", "幽匿之骨")
	addItemLang("sculk_circuit", "幽匿电路板")

	addItemLang("filled_fuel_rod", "燃料棒")
	addItemLang("empty_fuel_rod", "空燃料棒")
	addItemLang("refined_nuke_waste", "精炼核废料")
	addItemLang("refined_radiation_rock", "精炼辐射岩")
	addItemLang("acid_washed_radiation_rock", "酸洗辐射岩")
	addItemLang("plutonium_ionized_crystal", "钚电离结晶")
	addItemLang("radioactive_sediment", "放射性沉淀")
	addItemLang("raw_polonium_dust", "粗钋粉")
	addItemLang("reduced_polonium", "还原钋")
	addItemLang("raw_polonium", "粗钋")

	addItemLang("optical_fiber", "光纤")
	addItemLang("fluix_wire", "福鲁伊克斯线")

	addItemLang("parallel_upgrade", "%sx 并行升级")

	addItemLang("frost_cake_base", "寒霜蛋糕胚")

	let moldList = [
		["plate", "板状"],
		["gear", "齿轮状"],
		["rod", "棒状"],
		["bullet", "子弹"],
		["wire", "线"],
		["2x2_packing", "2x2打包"],
		["3x3_packing", "3x3打包"],
		["unpack", "解包"],
		["coin", "硬币"],
		["mechanism", "构件"],
		["blank", "空白"]
	]
	moldList.forEach(([name, value]) => {
		addItemLang(`${name}_mold`, `${value}模具`)
		addItemLang(`${name}_clay_mold`, `${value}黏土模具`)
	})

	addCastItemLang("mechanism", "构件")
	addCastItemLang("nugget", "粒")

	addCellItemLang("empty", "空白")
	addCellItemLang("tier_1_aviation", "壹级科技航天")
	addCellItemLang("tier_2_aviation", "贰级科技航天")
	addCellItemLang("tier_3_aviation", "叁级科技航天")
	addCellItemLang("tier_4_aviation", "肆级科技航天")

	event.add("gui.cmi.cell.page_turning", "§b翻页")
	addCellLang(
		"tier_1",
		"§b莫托斯\n§b调查报告\n§b半径: 1,553km\n§b轨道: 环绕伊甸 396.200km\n§b质量: 68.3x10^21kg\n§b大气层: 无\n§b莫托斯是伊甸的卫星. 与地球的月球相似, 它主宰着伊甸\n§b的潮汐变化, 是这颗行星生态平衡中不可或缺的存在. \n§b然而, 莫托斯的地下结构远比人类最初的推测复杂. 纵横\n§b交错的通道在数十公里之外重新汇合, 最终汇入一个巨\n§b大的主洞腔. 地质探测显示, 这些洞穴大多形成于早期岩\n§b浆冷却阶段, 后期又被地下气体反复侵蚀扩大. 洞壁留存\n§b着明显的高温熔蚀痕迹, 部分区域甚至仍维持微弱的地热\n§b活动. \n§b在主洞腔的穹顶上, 分布着大量能反射银蓝色光辉的天\n§b然结晶带. 矿物分析表明, 这些结晶富含钴与银元素, 是\n§b莫托斯地下极为独特的矿脉结构. \n§b有趣的是, 人类在早期探索宇宙时, 曾流传过\"月亮是奶\n§b酪\"做的一说, 甚至还因此拍过一部粗糙的科幻电影. 谁\n§b也没想到, 若干世纪后, 在莫托斯表层裂缝中, 人们竟真\n§b的发现了一种质地柔软、颜色淡黄的物质, 看上去颇有\n§b几分\"奶酪\"的模样. \n§b化验结果显示, 这种物质含有复杂的有机化合物与水\n§b合结构, 其形成机制尚不明朗. 科研人员半开玩笑地称,\n§b它也许正是判断莫托斯是否存在生命迹象的关键——或\n§b者, 至少能证明人类的想象力一向走在科学前面. ",
		"§b迪奥尼索斯\n§b调查报告\n§b半径: 739km\n§b轨道: 环绕伊甸 931.400km\n§b质量: 2.4x10^21kg\n§b大气层: 有\n§b自奥林匹斯星系被发现以来, 狄奥尼索斯作为伊甸的第二\n§b卫星就一直受到重点关注. 该卫星处于宜居带中, 且具\n§b有大气层, 自然环境不可不谓得天独厚. 然而与伊甸不同\n§b的是, 派向狄奥尼索斯的探测器大多没能传回数据, 着陆\n§b器也大多在降落过程中就奇怪的传回了电子设备烧毁的\n§b报告. \n§b起初人类认为是狄奥尼索斯大气层成分快速腐蚀或烧穿\n§b了探测器外壳, 但是这个猜想在数个超量堆叠了防腐蚀\n§b与隔热材料的探测器同样着陆失败后被推翻. \n§b这时, 一群工程师突然抱出了一批数个世纪前抢救欧洲\n§b某核泄露事件的设备操作资料, 提出了一个大胆的猜想：\n§b这个星球表面核辐射超标. \n§b一个超轻型卫星被发向了奥林匹斯星系, 它的载重非常\n§b少: 一个盖革计数器, 一个通讯装置, 一个电源. \n§b当看到卫星发回的盖革计数器数据后, 几乎所有人都陷入\n§b了沉默. "
	)
	addCellLang(
		"tier_2",
		"§b阿瑞斯\n§b调查报告\n§b半径: 3,742km\n§b轨道: 环绕恒星 1.6AU\n§b质量: 687.2x10^21kg\n§b大气层: 有\n§b阿瑞斯在伊甸殖民计划的早期被定位为\"资源性星体\"它的\n§b大气稀薄, 地表寒冷. 然而与严酷的气候相比, 其地形却\n§b出奇地平缓, 广袤的平原几乎贯穿整个星球. \n§b在这些平原之中, 分布着数量不多但极具特征的寒冷区\n§b域. 在那里, 大型冰刺如森林般耸立, 地表常年被薄雪覆\n§b盖, 温度长期维持在冰点以下. 经过多次探测与交流后, \n§b研究者将这一系列区域命名为\"阿瑞斯极冠\". \n§b阿瑞斯的岩石结构与火星极为相似, 富含氧化铁的岩石呈\n§b现鲜艳的红色, 对于奥林匹斯星系的开发是不可多得的丰\n§b富钢铁来源. 同时, 阿瑞斯星球表面丰富的水储量也为人\n§b类在此建立工业基地提供了极大的便利. \n§b阿瑞斯地表有着大量凸起的石头阴影, 据推测是风化的硬\n§b质岩石. 这来自阿瑞斯频繁的地质变化. 将硬质岩石推到\n§b地表, 再经过风化, 地表就会出现大量凸起的碎石块. ",
		"§b赫菲斯托斯\n§b调查报告\n§b半径: 5,513km\n§b轨道: 环绕恒星 2.3AU\n§b质量: 833.9x10^21kg\n§b大气层: 有\n§b赫菲斯托斯是奥林匹斯星系内侧的一颗岩石星球. 该星球\n§b拥有极其丰富的铁钕矿物成分. 因为未知原因, 星球中所\n§b有的磁性金属元素都以具有磁性的结晶形态存在, 以至于\n§b赫菲斯托斯的磁场极其紊乱, 并不适合电子设备着陆考察\n§b与远程电磁波通信. \n§b由于极其紊乱的强电磁环境, 这个星球的地层中金属分布\n§b极其诡异, 其中的部分矿物甚至形成了自然的高纯铁, 自\n§b然钕磁铁,乃至天然钢材. 这些天然金属材料似乎也催生了\n§b一些以电磁能驱动的生物, 甚至基础的文明. \n§b据Olympus_21033考察队记载, 这个星球的野生生物\n§b对于人类并不友善, 一旦与其相遇请一定做好战斗准备. \n§b赫菲斯托斯的磁性金属似乎有着一些更加奇怪的性能, 对\n§b于人类技术来说成本极高的带有自动追踪能力的箭矢与\n§b远程操控悬浮工具的设备, 似乎可以使用这里的磁铁材料\n§b轻易制造. "
	)
	addCellLang(
		"tier_3",
		"§b赫尔墨斯\n§b调查报告\n§b半径: 2,243km\n§b轨道: 环绕恒星 0.32AU\n§b质量: 211.7x10^21kg\n§b大气层: 无\n§b赫尔墨斯是整个星系最靠近恒星的行星. 强烈的电磁辐射\n§b与强大引力造成的潮汐锁定使得星表平均温度逾越两千摄\n§b氏度, 这也是为什么赫尔墨斯的石头总是焦黑色的. 第一\n§b批星系探查器在进入恒星轨道后差点因为强光的掩盖没\n§b能发现这颗星球. 太阳系人类常以水星与这颗行星进行对\n§b比, 并且证明了双方的极大相似性. \n§b由于星表温度极高, 着陆在这个星球上需要强力的隔热与\n§b冷却设备支持, 否则地球生物很容易在如此高温下顷刻碳\n§b化. \n§b探测器传回的数据中, 有一个内容非常有意思. 赫尔墨斯\n§b表面遍布着大量气体喷口, 而其中喷出的气体富含汞金\n§b属. 这种特殊的地质现象在一旦考察清楚储量, 将会为人\n§b类的电子工业与化学工业提供一批质量极高, 体量极大的\n§b原料. ",
		"§b阿弗洛狄忒\n§b调查报告\n§b半径: 4,913km\n§b轨道: 环绕恒星 0.63AU\n§b质量: 772.1x10^21kg\n§b大气层: 有\n§b阿弗洛狄忒是奥林匹斯星系的第二颗行星. 该星球的大气\n§b成分含有丰富的硫、氯资源, 腐蚀性极强. 此前降落的十\n§b三个短期探测器有七个因为电子设备腐蚀而没能达到设\n§b计寿命, 足见星球大气腐蚀性之强. 星球大气层内强烈的\n§b硫化还原氛围似乎制造了许多耐腐蚀性极强的材料, 其中\n§b更是有见所未见的红色强耐热金属材料. \n§b阿弗洛狄忒的强还原氛围似乎也催生了一种与猪灵文明\n§b极其相似的文明, 闪亮且抗腐蚀性强的金仍然是这个文明\n§b的核心金属材料, 也许从这个文明身上可以窥见曾经的猪\n§b灵文明的影子. \n§b阿弗洛狄忒的星表岩石硫含量极高, 予以适当氧化即可从\n§b中提取单质硫乃至硫酸. "
	)
	addCellLang(
		"tier_4",
		"§b哈迪斯\n§b调查报告\n§b半径: 5,623km\n§b轨道: 环绕气体行星 气体行星轨道 5.3AU\n§b质量: 912.4x10^21kg\n§b大气层: 有\n§b哈迪斯是奥林匹斯星系最外层的一颗气体行星卫星. 由于\n§b星球表面有水存在, 又距离恒星过远, 这颗星球表面覆盖\n§b着无边的冰原. 作为降落难度较低的外围星球, 人类的考\n§b察队与开发先遣队一致以这颗卫星为前哨站执行勘察与\n§b环境改造. 丰富的水资源也为这颗星球上建立的考察站\n§b提供了充足的核聚变能源. \n§b在原计划于3个月内返回的Olympus_21043考察队遇\n§b难后, 考察站在整整十余年期间缺乏维护, 导致了严重的\n§b损坏. \n§b哈迪斯的冻土中含有大量金属资源, 据考察, 其地层中还\n§b含有大量的煤炭. 这就意味着除了可见的类似羊的消费者\n§b外, 这个星球的生态体系中还有一些低矮的生产者. \n§b星球地表疏松的水结晶同样提示着人类, 这里仍然拥有让\n§b水汽化或升华的条件. 但是没有人知道具体的条件. 遇难\n§b的考察队员曾提出, 可能是哈迪斯的地热会导致冰雪融化, \n§b但是可惜她再也没有机会看到这个景象了...",
		"§b哈迪斯\n§b调查报告\n§b半径: 5,623km\n§b轨道: 环绕气体行星 气体行星轨道 5.3AU\n§b质量: 912.4x10^21kg\n§b大气层: 有\n§b哈迪斯是奥林匹斯星系最外层的一颗气体行星卫星. 由于\n§b星球表面有水存在, 又距离恒星过远, 这颗星球表面覆盖\n§b着无边的冰原. 作为降落难度较低的外围星球, 人类的考\n§b察队与开发先遣队一致以这颗卫星为前哨站执行勘察与\n§b环境改造. 丰富的水资源也为这颗星球上建立的考察站\n§b提供了充足的核聚变能源. \n§b在原计划于3个月内返回的Olympus_21043考察队遇\n§b难后, 考察站在整整十余年期间缺乏维护, 导致了严重的\n§b损坏. \n§b哈迪斯的冻土中含有大量金属资源, 据考察, 其地层中还\n§b含有大量的煤炭. 这就意味着除了可见的类似羊的消费者\n§b外, 这个星球的生态体系中还有一些低矮的生产者. \n§b星球地表疏松的水结晶同样提示着人类, 这里仍然拥有让\n§b水汽化或升华的条件. 但是没有人知道具体的条件. 遇难\n§b的考察队员曾提出, 可能是哈迪斯的地热会导致冰雪融化, \n§b但是可惜她再也没有机会看到这个景象了..."
	)
})
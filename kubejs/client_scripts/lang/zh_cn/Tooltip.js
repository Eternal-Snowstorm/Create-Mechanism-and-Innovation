ClientEvents.lang("zh_cn", (event) => {
	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addCommonTooltipLang(key, name) {
		event.add(`tooltip.${key}`.replace(":", "."), `§b${name}`)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addCustomTooltipLang(key, name) {
		event.add(key, name)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addCommonJadeTipLang(key, name) {
		event.add(`jade.info.cmi.${key}`.replace(":", "."), `${name}`)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string[]} names 
	 */
	function addCommonJadeTipLangs(key, names) {
		names.forEach((name, index) => {
			event.add(`jade.info.cmi.${key}.${index + 1}`.replace(":", "."), `${name}`)
		})
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addJEIInfoLang(key, name) {
		event.add(`jei.info.${key}`.replace(":", "."), name)
	}

	addCommonTooltipLang("cmi:re_construction", "整合包主创")
	addCommonTooltipLang("cmi:dkrkoo_weihe", "吉祥物")
	addCommonTooltipLang("cmi:dropper_qwq", "美工")
	addCommonTooltipLang("cmi:117458866249", "程序")
	addCommonTooltipLang("cmi:random_mechanism", "程序")
	addCommonTooltipLang("cmi:eternalsnowstorm", "程序")
	addCommonTooltipLang("cmi:qi_month", "程序")
	addCommonTooltipLang("cmi:ein_nameuwu", "策划")
	addCommonTooltipLang("cmi:huanchenxiaohuli", "吉祥物")
	addCommonTooltipLang("cmi:belalus", "音乐")
	addCommonTooltipLang("cmi:fiber_optics", "程序")
	addCommonTooltipLang("cmi:ye_anqing", "程序")
	addCommonTooltipLang("cmi:sakura_star_cn", "社区管理")
	addCommonTooltipLang("cmi:qicaijie", "程序")
	addCommonTooltipLang("cmi:flash_yi", "任务")
	addCommonTooltipLang("cmi:keyxeldesu", "美工")
	addCommonTooltipLang("cmi:sergei", "建筑")
	addCommonTooltipLang("cmi:lirx_owo", "程序")

	addCommonTooltipLang("tconstruct:seared_heater", "焦黑加热器最多提供937°C / 1718.6°F")
	addCommonTooltipLang("#cmi:block/machine_block", "只有装饰作用(暂时)")
	addCommonTooltipLang("cmi:pig_iron_mechanism", "可无限次食用")
	addCommonTooltipLang("cmi:acceleratable", "§v按住Shift查看构件之力催生器用途")
	addCommonTooltipLang("cmi:stone_mechanism", "§c手持右键圆石可将其转换为石头")
	addCommonTooltipLang("cmi:copper_mechanism", "§6手持右键可以投掷出水瓶")
	addCommonTooltipLang("cmi:ender_mechanism", "§d手持右键随机传送, 手持潜行右键记录当前坐标")
	addCommonTooltipLang("cmi:enchanted_mechanism", "§9手持右键方块可生成经验")
	addCommonTooltipLang("cmi:nature_mechanism", "§a手持右键方块可以替代骨粉的功能")
	addCommonTooltipLang("cmi:nuclear_mechanism", "§3手持右键可以清除身上残留的辐射")
	addCommonTooltipLang("cmi:wooden_mechanism", "§a手持右键方块可以替代树木肥料的功能")
	addCommonTooltipLang("cmi:photosensitive_mechanism", "§f装备于构件饰品栏可获得夜视效果")
	addCommonTooltipLang("cmi:cobalt_mechanism", "§9装备于构件饰品栏可获得急迫与速度效果")
	addCommonTooltipLang("cmi:nether_mechanism", "§4装备于构件饰品栏可获得抗火效果")
	addCommonTooltipLang("cmi:thermal_mechanism", "§b装备于构件饰品栏可以获得力量效果\n§b攻击会少量扣除血量\n§b连续造成伤害可以回复血量")
	addCommonTooltipLang("cmi:gold_mechanism", "§a装备于构件饰品栏可以使箭矢伤害无视无敌帧")
	addCommonTooltipLang("cmi:sculk_mechanism", "§v手持右键可以发射一道音波尖啸")
	addCommonTooltipLang("cmi:geographycal_hammer.developer1", "手持右键潜行方块获取方块硬度")
	addCommonTooltipLang("cmi:geographycal_hammer.developer2", "副手手持潜行右键获取主手物品ID")
	addCommonTooltipLang("cmi:geographycal_hammer.not_developer", "似乎有一种神秘的力量阻止了你使用这个物品")
	addCommonTooltipLang("cmi:charged_amethyst", "拿到耳边能听到它一直在发出嗡嗡嗡的声音")
	addCommonTooltipLang("alexscaves:notor_gizmo", "第一个只能通过探险获得")
	addCommonTooltipLang("#minecraft:pickaxes", "副手潜行+右键可破坏矿物节点(无掉落物)")
	addCommonTooltipLang("#minecraft:infiniburn_all", "上方的火焰可以无限燃烧")
	addCommonTooltipLang("cmi:potion_mechanism", "右键获取大多数正面buff")
	addCommonTooltipLang("cmi:super_knife", "经魔力灌注, 难以磨损")
	addCommonTooltipLang("#cmi:special_ores", "该矿石只能在蒸汽矿石处理机内处理")
	addCommonTooltipLang("#cmi:multiblock_machine_controller", "制作多方块接口时不消耗")
	addCommonTooltipLang("cmi:stone_plate", "把字刻在石头上")
	addCommonTooltipLang("cmi:creosote_wood_chip_briquette", "能吃哦")
	addCommonTooltipLang("#forge:ingots/siltsteel", "自浑浊淤泥中升华, 历经繁复萃取与催化精炼, 终获此一泓清冽碧波")
	addCommonTooltipLang("cmi:overcharged_alloy_faucet", "§c所以你的意思是...你就拿超载合金锭做了这个?")
	addCommonTooltipLang("ad_astra:ice_shard", "可以打破冰块获得, 并且受时运效果影响")
	addCommonTooltipLang("#cmi:broken_drill_heads", "破损的钻头, 修复后可以正常使用")
	addCommonTooltipLang("immersiveindustry:electrolyzer", "需要通电使用")
	addCommonTooltipLang("portality:controller", "制作模块时不会消耗自身")
	addCommonTooltipLang("cmi:parchment", `有些能量不是由燃料产生的, 而是靠"遇见"`)
	addCommonTooltipLang("moreburners:heat_upgrade", "使{moreburners:electric_burner, 1}电磁炉达到更高的加热等级")
	addCommonTooltipLang("create:basin", "使用{minecraft:sponge, 1}海绵可以清空内部所有流体")
	addCommonTooltipLang("create:sail_frame", `不再支持作为风帆为{create:windmill_bearing, 1}风车轴承产生应力`)
	addCommonTooltipLang("cmi:astral_core", "用于激活{cmi:eden_crystal, 1}星环传送门的核心§c 小心落雷")
	addCommonTooltipLang("cmi:obsidian_cell", "你似乎搞砸了💀")
	addCommonTooltipLang("minecraft:sugar_cane", "食用会返还一个甘蔗纤维")
	addCommonTooltipLang("#cmi:machine_port", "制作时不消耗机器核心")
	addCommonTooltipLang("#cmi:machine_core", "制作接口时不消耗")
	addCommonTooltipLang("#forge:tools/wrench", "工作台制作构件时不消耗")
	addCommonTooltipLang("#railways:filled_paint_pitchers", "此模组的{create:mechanical_mixer, 1}混合搅拌染色配方已被隐藏，你可以用{railways:white_paint_pitcher, 1}白色染色配方类推其他被隐藏的染色配方")

	addCommonTooltipLang("cmi:steam_cast_iron_upgrade", "可用于将青铜蒸汽锅炉部件升级为铸铁材质")
	addCommonTooltipLang("cmi:steam_steel_upgrade", "可用于将铸铁蒸汽锅炉部件升级为钢材质")

	addCommonJadeTipLangs("tconstruct:seared_heater", [
		"自身最多提供 937°C / 1718.6°F",
		"使用{tconstruct:seared_fuel_tank, 1}焦黑燃料储罐加入燃料升温"
	])
	addCommonJadeTipLang("immersiveindustry:crucible", "自身最多提供 1000°C, 使用{immersiveengineering:blastfurnace_preheater, 1}预热器升温")

	addJEIInfoLang("thermal:rubber", "橡胶是一种由植物胶乳加工而来的产物\n而植物胶乳一般只存在内橡胶树的树皮内, 当然部分橡胶树原木内也存在少量植物胶乳")
	addJEIInfoLang("cmi:andesite_alloy_noodle", `"意大利面就应该拌42号混凝土. 因为这个螺丝钉的长度, 它很容易会直接影响到挖掘机的扭距, 你往里砸的时候, 一瞬间它就会产生大量的高能蛋白, 俗称UFO. 会严重影响经济的发展. 照你这么说, 炸鸡块要用92#汽油, 毕竟我们无法用光学透镜探测苏格拉底, 如果二氧化氢持续侵蚀这个机床组件, 那么我们早晚要在斐波那契曲线上安装一个胶原蛋白, 否则我们将无法改变蜜雪冰城与阿尔别克的叠加状态, 因为众所周知爱吃鸡摩人在捕鲲的时候往往需要用氢的同位素当做诱饵, 但是原子弹的新鲜程度又会直接影响到我国东南部的季风和洋流, 所以说在西伯利亚地区开设农学院显然是不合理的. \n我知道你一定会反驳我, 告诉我农业的底层思维是什么, 就是不用化肥农药和种子, 还包括生命之源氮气, 使甲烷分子直接转化成能够捕获放射性元素释放的β射线的单质, 并且使伽马射线在常温下就能用老虎钳折弯成78°, 否则在用望远镜观察细胞结构时, 根本发现不了时空重叠时到底要叠几层才能使潼关肉夹馍更酥脆的原因. "`)
	addJEIInfoLang("minecraft:andesite", `在本包, 安山岩生产主要方式有5种\n一种是通过热力膨胀的造石机\n一种是通过安山岩磨成粉后加工的增值线\n一种是熔岩和水触碰的刷石机, 和造石机一样, 在下方放置安山合金块可以刷出安山岩(动力泵一样生效)\n一种是前往"安山岩洞窟"群系, 这是一个全是安山岩的洞窟\n最后一种则是通过构件催生器来生产`)
	addJEIInfoLang("ad_astra:cryo_fuel_bucket", "水和冰在经过外星科技处理后竟然可以用作火箭燃料, 那我是不是同样可以作用于其他地方呢..?\n但是这种流体产率非常低, 我需要想办法进行大批量的生产才能确保需求量自由")
	addJEIInfoLang("cmi:bucket", "似是一种巨大的力量塑造的诡异造物\n它有着令人倍感亲切的形状, 却处于一种令人不寒而栗的陌生角度\n这巨大的力量, 炽热, 强大又致命\n善良者受其腐化\n卑鄙者因其强大\n收容之器受其影响, 转为包覆之具, 幸于并无灵魂, 于我没有危害")
	addJEIInfoLang("#ad_astra:power_consumption_machines", "该Mod的机器每个面都有能量输入的上限\n如果想要不会断电确保产量你可能需要给每个面都连接一根电线")
	addJEIInfoLang("#cmi:faucet", "右键橡胶原木有25%概率获得1个橡胶\n有10%概率会将其变为去皮橡胶原木\n每次右键都会消耗1点耐久, 耐久归零后工具损坏")
	addJEIInfoLang("#cmi:liquid_output", "淤泥泵在每次工作时, 会产出100mB ~ 200mB的淤泥\n初始概率为1.3%, 有概率产出10000mB淤泥, 如果抽中了那么概率重置为1.3%\n若未抽中, 那么每次运作时概率提升为当前的1.02倍, 最多提升至100%\n第499次未抽中时, 那么在第500次有50%概率产出10000mB, 否则产出5000mB, 随后概率重置为1.3%\n第999次未抽中时, 那么在第1000次必定产出10000mB, 随后概率重置为1.3%\n若单个淤泥泵连续5次产出10000mB, 将向所有玩家发送提示信息")
	addJEIInfoLang("#cmi:peat_gen", `泥炭是一种上好的燃料, 单个泥炭可以烧炼4个物品\n只会在"红树林沼泽"和"沼泽"群系的地表生成\n并且挖掘泥炭块时将会受到"时运"和"精准采集"的附魔效果影响`)
	addJEIInfoLang("cmi:sludge_extract", "制作此物品需向机器中安装 整合组件 或 扩容储罐构造")
	addJEIInfoLang("#easyrepair:repair_item_pouchs", "向其中装入修补件或修复材料并装备后, 手中的工具损坏时会自动修复")
	addJEIInfoLang("#railways:filled_paint_pitchers", "此模组的混合搅拌染色配方已被隐藏，仅保留白色染色配方\n你可以用白色染色配方类推其他被隐藏的染色配方")

	addCustomTooltipLang("tooltip.moreburners.electric_burner.1", "§b电力驱动的{create:blaze_burner, 1}烈焰人燃烧室")
	addCustomTooltipLang("tooltip.moreburners.electric_burner.2", "§b通上{createaddition:electrum_spool, 1}电后会缓慢的升温, 需要保持供电")
	addCustomTooltipLang("tooltip.cmi.fan", "§b可加快{[tconstruct:seared_table, tconstruct:scorched_table, tconstruct:seared_basin, tconstruct:scorched_basin], 1}{#tconstruct:casts, 1}铸造冷却速度")
	addCustomTooltipLang("tooltip.cmi.cast", "§b冷却时可被{[create:encased_fan, ratatouille:oven_fan], 1}鼓风机加速")
})
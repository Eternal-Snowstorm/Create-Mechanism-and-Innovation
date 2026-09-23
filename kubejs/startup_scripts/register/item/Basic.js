StartupEvents.registry("item", (event) => {
	/**
	 * @param {string} name 注册ID
	 * @param {string} type 注册类型
	 * @returns 
	 */
	function addItem(name, type) {
		if (type === undefined) {
			return event.create(`${Cmi.MODID}:${name}`)
		}
		return event.create(`${Cmi.MODID}:${name}`, type)
	}
	/**
	 * @param {string} name 注册ID
	 * @param {string} type 注册类型
	 * @returns 
	 */
	function addMaterial(name, type) {
		if (type === undefined) {
			return event.create(`${Cmi.MODID}:${name}`)
				.texture(Cmi.loadResource(`item/material/${name}`))
		}
		return event.create(`${Cmi.MODID}:${name}`, type)
			.texture(Cmi.loadResource(`item/material/${name}`))
	}

	// 图标
	addItem("cmi_icon")
		.texture(Cmi.loadResource("item/packicon"))

	// 幻晶晶体
	addMaterial("dreamcore_crystal")
		.glow(true)
		.tag("forge:gems")
		.tag("forge:gems/dreamcore")

	// 幻晶原石
	addMaterial("dreamcore_ore")
		.glow(true)
		.tag("forge:raw_materials")
		.tag("forge:raw_materials/dreamcore")

	// 幻晶晶种
	addMaterial("dreamcore_seed")
		.glow(true)

	// 黏血球
	addItem("blood_slime_ball")
		.texture(Cmi.loadResource("item/material/blood_slime_ball"))
		.tag("forge:slimeballs")
		.tag("forge:slimeball/blood")

	// 淤泥提取物
	addItem("sludge_extract")
		.texture(Cmi.loadResource("item/material/sludge_extract"))

	// 甘蔗纤维
	addItem("sugarcane_fiber")
		.texture(Cmi.loadResource("item/material/sugarcane_fiber"))

	// 泥炭
	addItem("peat")
		.texture(Cmi.loadResource("item/material/peat"))
		.burnTime(800)

	// 木屑加工系列
	addItem("wood_chip_briquette")
		.texture(Cmi.loadResource("item/material/wood_chip/stage_1"))
		.burnTime(200 * 16)

	addItem("compressed_wood_chip_briquette")
		.texture(Cmi.loadResource("item/material/wood_chip/stage_2"))
		.burnTime(200 * 16 * 4)

	addItem("densely_packed_wood_chip_briquette")
		.texture(Cmi.loadResource("item/material/wood_chip/stage_3"))
		.burnTime(200 * (16 * 4) * 4)

	addItem("creosote_wood_chip_briquette")
		.texture(Cmi.loadResource("item/material/wood_chip/done"))
		.burnTime(200 * ((16 * 4) * 4) * 4)
		.food((builder) => {
			builder.hunger(20)
				.saturation(1)
				.effect("immersiveengineering:flammable", 20 * 60, 5, 1)
				.effect("minecraft:blindness", 20 * 60, 5, 1)
				.effect("minecraft:nausea", 20 * 60, 5, 1)
				.effect("minecraft:instant_damage", 1, 1, 1)
				.eaten((event) => {
					let { player, level, hand } = event
					let key = `message.${Cmi.MODID}.food.creosote_wood_chip_briquette`

					if (hand !== InteractionHand.MAIN_HAND && !level.isClientSide()) {
						player.displayClientMessage(Component.translatable(key).blue(), true)
					}
				})
		})

	// 热力单元
	addItem("thermal_unit")
		.texture(Cmi.loadResource("item/material/unit/thermal"))

	// 大地震撼单元
	addItem("basalz_unit")
		.texture(Cmi.loadResource("item/material/unit/basalz"))

	// 烈焰燃烧单元
	addItem("blaze_unit")
		.texture(Cmi.loadResource("item/material/unit/blaze"))

	// 狂风催化单元
	addItem("blitz_unit")
		.texture(Cmi.loadResource("item/material/unit/blitz"))

	// 暴雪冷凝单元
	addItem("blizz_unit")
		.texture(Cmi.loadResource("item/material/unit/blizz"))

	// 大地碎裂组件
	addItem("basalt_general_component")
		.modelJson(componentModel("basalt"))
		.tag("cmi:general_components")

	// 烈焰焚烬组件
	addItem("blaze_general_component")
		.modelJson(componentModel("blaze"))
		.tag("cmi:general_components")

	// 狂风卷袭组件
	addItem("blitz_general_component")
		.modelJson(componentModel("blitz"))
		.tag("cmi:general_components")

	// 暴雪冻结组件
	addItem("blizz_general_component")
		.modelJson(componentModel("blizz"))
		.tag("cmi:general_components")

	// 小块焦炭
	addItem("small_coal_coke")
		.burnTime(200 * 2)
		.texture(Cmi.loadResource("item/material/small_coal_coke"))

	// 电离中和红石
	addMaterial("electrolized_redstone")

	// 萤石流明管道
	addMaterial("glowstone_lumen_tube")

	// 高岭土
	addMaterial("kaolinite_ball")

	// 电动机转子
	addMaterial("motor_rotor")

	// 共振管
	addMaterial("resonant_tube")

	// 硅混合物
	addMaterial("silicon_mixture")

	// 硅橡胶
	addMaterial("silicon_rubber")

	// 升级模板
	addMaterial("drawer_upgrade_template")

	// 橡胶树皮
	addMaterial("rubber_tree_bark")

	// 草纤维
	addMaterial("grass_fiber")

	// 矿物碎块
	addMaterial("vanadium_ore_chunk")
		.tag("forge:raw_nuggets")
		.tag("forge:raw_nuggets/vanadium")

	addMaterial("platinum_ore_chunk")
		.tag("forge:raw_nuggets")
		.tag("forge:raw_nuggets/platinum")

	// 草绳
	addMaterial("grass_string")
		.tag("forge:string")

	// 溴化阻燃剂
	addMaterial("brominated_flame_retardants")

	// 冷却设备
	addMaterial("nuke_cooler")

	// 冲压头
	addMaterial("hammer_head")

	// 铁氧体磁芯	
	addMaterial("ferrit_core")

	// 光纤
	addMaterial("optical_fiber")
		.tag("forge:wires")

	// 磁触点
	addMaterial("magnetic_contact")

	// 黑曜石元件
	addMaterial("obsidian_cell")

	// 碳纳米管
	addMaterial("carbon_nanotube")

	// 钛合金网
	addMaterial("titanium_alloy_mesh")

	// 活化石墨碎块
	addMaterial("activated_graphite_chunk")

	// 未成形的碳纳米管
	addMaterial("incomplete_carbon_nanotube")

	// 强化复合齿轮
	addMaterial("composite_carbon_fiber_gear")

	// 钛合金线圈
	addMaterial("titanium_alloy_coil")

	// 锇晶圆
	addMaterial("osmium_wafer")

	// 硅晶圆
	addMaterial("silicon_wafer")

	// 锗晶圆
	addMaterial("germanium_wafer")

	// 恩特罗合金晶圆
	addMaterial("entro_alloy_wafer")

	// 基础电子元件
	addMaterial("basic_electronic_components")

	// 高级电子元件
	addMaterial("advanced_electronic_components")

	// 精英电子元件
	addMaterial("elite_electronic_components")

	// 终极电子元件
	addMaterial("ultimate_electronic_components")

	// 待组装钨钢板
	addMaterial("incomplete_tungsten_steel_plate")

	// 精炼核废料
	addMaterial("refined_nuke_waste")

	// 精炼辐射岩
	addMaterial("refined_radiation_rock")

	// 酸洗辐射岩
	addMaterial("acid_washed_radiation_rock")

	// 燃料棒
	addMaterial("filled_fuel_rod")
	addMaterial("empty_fuel_rod")

	// 钚电离结晶
	addMaterial("plutonium_ionized_crystal")

	// 放射性沉淀
	addMaterial("radioactive_sediment")

	// 粗钋
	addMaterial("raw_polonium")

	// 粗钋粉
	addMaterial("raw_polonium_dust")

	// 还原钋
	addMaterial("reduced_polonium")

	// 待组装复合板
	addMaterial("incomplete_composite_carbon_fiber_plate")

	// 电离恩特罗水晶
	addMaterial("ionized_entro_crystal")

	// 晶态熔融恩特罗水晶
	addMaterial("crystal_molten_entro")

	// 恩特罗合金
	addItem("entro_alloy")
		.texture("expatternprovider:item/entro_ingot")

	// 恩特罗系列
	addItem("entro_crystal")
		.texture("expatternprovider:item/entro_crystal")
		.tag("forge:gems/entro")
		.tag("forge:gems")

	addItem("concurrent_processor")
		.texture("expatternprovider:item/concurrent_processor")

	addItem("printed_concurrent_processor")
		.texture("expatternprovider:item/concurrent_processor_print")

	addItem("concurrent_processor_press")
		.texture("expatternprovider:item/concurrent_processor_press")

	// 寒霜蛋糕胚
	addItem("frost_cake_base")
		.texture(Cmi.loadResource("item/material/frost_cake_base"))
		.tag("create:upright_on_belt")

	// 羊皮纸
	addItem("parchment")
		.texture(Cmi.loadResource("item/material/parchment/parchment"))
	addItem("torn_parchment_a")
		.texture(Cmi.loadResource("item/material/parchment/torn_parchment_a"))
	addItem("torn_parchment_b")
		.texture(Cmi.loadResource("item/material/parchment/torn_parchment_b"))

	// 蒸汽升级
	addItem("steam_cast_iron_upgrade")
		.texture(Cmi.loadResource("item/upgrade/steam/cast_iron"))
		.tag(Cmi.loadResource("steam_upgrades"))

	addItem("steam_steel_upgrade")
		.texture(Cmi.loadResource("item/upgrade/steam/steel"))
		.tag(Cmi.loadResource("steam_upgrades"))

	// C10
	// 融冰木碎块
	addMaterial("glacian_chunk")

	// 重组幻晶
	addMaterial("dreamcore_rc")

	// 富集幻晶
	addMaterial("dreamcore_enriched")

	// 电离幻晶
	addMaterial("dreamcore_electrolized")

	// 源质幻晶
	addMaterial("dreamcore_source")

	// 热解幻晶
	addMaterial("dreamcore_pyrolysis")

	// 高能幻晶
	addMaterial("dreamcore_charged")

	// 革新幻晶
	addMaterial("dreamcore_i")

	function componentModel(type) {
		return {
			"parent": "cmi:item/computing_cell",
			"textures": {
				"texture": `cmi:item/component/${type}_cell`
			}
		}
	}

	let SomeModelsJson = {
		cogwheel: function (material) {
			const PARENT = "cmi:item/cogwheels/cogwheel"
			const PARTICLE = `steampowered:block/cogwheel/${material}_cogwheel`
			const COGWHEEL = `steampowered:block/cogwheel/${material}_cogwheel`
			return {
				"parent": PARENT,
				"textures": {
					"particle": PARTICLE,
					"1_2": COGWHEEL
				}
			}
		},
		largeCogwheel: function (material) {
			const PARENT = "cmi:item/cogwheels/large_cogwheel"
			const PARTICLE = `steampowered:block/cogwheel/${material}_large_cogwheel`
			const LARGE_COGWHEEL = `steampowered:block/cogwheel/${material}_large_cogwheel`

			return {
				"parent": PARENT,
				"textures": {
					"4": LARGE_COGWHEEL,
					"particle": PARTICLE
				}
			}
		},
		casingFrame: function (material) {
			return {
				"parent": "cmi:item/casing_framework/main",
				"textures": {
					"side": `cmi:item/framework/${material}`
				}
			}
		}
	}

	addItem("incomplete_cogwheel")
		.modelJson({
			"parent": "create:block/cogwheel_shaftless"
		})
		.tag("create:incomplete_cogwheels")

	addItem("incomplete_large_cogwheel")
		.modelJson({
			"parent": "create:block/large_cogwheel_shaftless"
		})
		.tag("create:incomplete_large_cogwheels")

	let cogwheelMaterials = [
		"bronze",
		"cast_iron",
		"steel"
	]
	cogwheelMaterials.forEach((metal) => {
		addItem(`incomplete_${metal}_cogwheel`)
			.modelJson(SomeModelsJson.cogwheel(metal))
			.tag("create:incomplete_cogwheels")

		addItem(`incomplete_${metal}_large_cogwheel`)
			.modelJson(SomeModelsJson.largeCogwheel(metal))
			.tag("create:incomplete_large_cogwheels")
	})

	let casingFrame = [
		"andesite",
		"brass",
		"bronze",
		"copper"
	]
	casingFrame.forEach((frame) => {
		addItem(`${frame}_casing_framework`)
			.modelJson(SomeModelsJson.casingFrame(frame))
			.tag(`cmi:casing_framework`)
			.tag(`cmi:casing_framework/${frame}`)
	})
})
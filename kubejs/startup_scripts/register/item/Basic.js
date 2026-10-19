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

	// 金坷垃
	addMaterial("fertilizer")
		.tag("forge:dusts")
		.tag(`forge:dusts/fertilizer`)

	// 幻晶
	let dreamcoreTypes = [
		"crystal",
		"ore",
		"seed",
		"recombine",
		"enriched",
		"electrolized",
		"source",
		"pyrolysis",
		"charged",
		"innovation"
	]

	dreamcoreTypes.forEach((type) => {
		addItem(`dreamcore_${type}`)
			.texture(Cmi.loadResource(`item/material/dreamcores/${type}`))
			.glow(true)
	})

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

	let unitTypes = [
		"basalz",
		"blaze",
		"blitz",
		"blizz"
	]

	unitTypes.forEach((type) => {
		addItem(`${type}_unit`)
			.texture(Cmi.loadResource(`item/material/unit/${type}`))

		addItem(`${type}_general_component`)
			.modelJson(componentModel(type))
			.tag("cmi:general_components")
	})

	// 小块焦炭
	addMaterial("small_coal_coke")
		.burnTime(200 * 2)

	// 萤石流明管道
	addMaterial("glowstone_lumen_tube")

	// 高岭土
	addMaterial("kaolinite_ball")

	// 电动机转子
	addMaterial("motor_rotor")

	// 共振管
	addMaterial("resonant_tube")

	// 硅橡胶
	addMaterial("silicon_rubber")

	// 升级模板
	addMaterial("drawer_upgrade_template")

	// 橡胶树皮
	addMaterial("rubber_tree_bark")

	// 草纤维
	addMaterial("grass_fiber")

	// 矿物碎块
	addItem("vanadium_ore_chunk")
		.texture(Cmi.loadResource("item/material/raw/nugget/vanadium"))
		.tag("forge:raw_nuggets")
		.tag("forge:raw_nuggets/vanadium")

	addMaterial("platinum_ore_chunk")
		.texture(Cmi.loadResource("item/material/raw/nugget/platinum"))
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

	// 磁触点
	addMaterial("magnetic_contact")

	// 黑曜石元件
	addItem("obsidian_cell")
		.texture(Cmi.loadResource("item/material/cell/obsidian"))

	// 碳纳米管
	addMaterial("carbon_nanotube")

	// 钛合金网
	addMaterial("titanium_alloy_mesh")

	// 活化石墨碎块
	addMaterial("activated_graphite_chunk")

	// 钛合金线圈
	addMaterial("titanium_alloy_coil")

	// 电子元件
	let mekTiers = [
		"basic",
		"advanced",
		"elite",
		"ultimate"
	]

	mekTiers.forEach((tier) => {
		addItem(`${tier}_electronic_components`)
			.texture(Cmi.loadResource(`item/material/electronic_components/${tier}`))
			.tag(Cmi.loadResource("electronic_components"))
			.tag(Cmi.loadResource(`electronic_components/${tier}`))
	})

	// 燃料棒
	addMaterial("filled_fuel_rod")
	addMaterial("empty_fuel_rod")

	// 放射性物品
	let radioactiveItems = [
		"acid_washed_radiation_rock", // 酸洗辐射岩
		"plutonium_ionized_crystal", // 钚电离结晶
		"radioactive_sediment", // 放射性沉淀
		"raw_polonium", // 粗钋
		"raw_polonium_dust", // 粗钋粉
		"reduced_polonium", // 还原钋
		"refined_radiation_rock", // 精炼辐射岩
		"refined_nuke_waste" // 精炼核废料
	]

	radioactiveItems.forEach((item) => {
		addItem(item)
			.texture(Cmi.loadResource(`item/material/radiation/${item}`))
			.tag(Cmi.loadResource("radioactive_items"))
	})

	// 并发处理器
	addItem("concurrent_processor")
		.texture("expatternprovider:item/concurrent_processor")

	addItem("printed_concurrent_processor")
		.texture("expatternprovider:item/concurrent_processor_print")

	addItem("concurrent_processor_press")
		.texture("expatternprovider:item/concurrent_processor_press")

	// 寒霜蛋糕胚
	addMaterial("frost_cake_base")
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

	// 霜原木碎块
	addMaterial("glacian_chunk")

	// 培养基
	addMaterial("culture_medium")

	// 霜原芽
	addMaterial("glacian_sprout")

	/**
	 * 
	 * @param {string} type 
	 * @returns 
	 */
	function componentModel(type) {
		return {
			"parent": "cmi:item/computing_cell",
			"textures": {
				"texture": `cmi:item/component/${type}_cell`
			}
		}
	}

	let SomeModelsJson = {
		/**
		 * 
		 * @param {string} material 
		 * @returns 
		 */
		cogwheel(material) {
			const PARENT = "cmi:item/cogwheels/cogwheel"
			const PARTICLE = `cmi:block/cogwheel/${material}/small`
			const COGWHEEL = `cmi:block/cogwheel/${material}/small`

			return {
				"parent": PARENT,
				"textures": {
					"particle": PARTICLE,
					"1_2": COGWHEEL
				}
			}
		},
		/**
		 * 
		 * @param {string} material 
		 * @returns 
		 */
		largeCogwheel(material) {
			const PARENT = "cmi:item/cogwheels/large_cogwheel"
			const PARTICLE = `cmi:block/cogwheel/${material}/large`
			const LARGE_COGWHEEL = `cmi:block/cogwheel/${material}/large`

			return {
				"parent": PARENT,
				"textures": {
					"4": LARGE_COGWHEEL,
					"particle": PARTICLE
				}
			}
		},
		/**
		 * 
		 * @param {string} material 
		 * @returns 
		 */
		casingFrame(material) {
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
		.tag(Cmi.loadResource("incomplete_items"))

	addItem("incomplete_large_cogwheel")
		.modelJson({
			"parent": "create:block/large_cogwheel_shaftless"
		})
		.tag("create:incomplete_large_cogwheels")
		.tag(Cmi.loadResource("incomplete_items"))

	let cogwheelMaterials = [
		"bronze",
		"cast_iron",
		"steel"
	]
	cogwheelMaterials.forEach((metal) => {
		addItem(`incomplete_${metal}_cogwheel`)
			.modelJson(SomeModelsJson.cogwheel(metal))
			.tag("create:incomplete_cogwheels")
			.tag(Cmi.loadResource("incomplete_items"))

		addItem(`incomplete_${metal}_large_cogwheel`)
			.modelJson(SomeModelsJson.largeCogwheel(metal))
			.tag("create:incomplete_large_cogwheels")
			.tag(Cmi.loadResource("incomplete_items"))
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
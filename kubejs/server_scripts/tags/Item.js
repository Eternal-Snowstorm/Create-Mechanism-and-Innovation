// priority: 11
ServerEvents.tags("item", (event) => {
	// 添加标签
	let add = advancedAdd.bind(event)

	// 木板变体
	event.get("tconstruct:wood_variants/planks")
		.add("thermal:rubberwood_planks")

	// 构件
	event.get("create:mechanisms")
		.add("create:precision_mechanism")
		.add("vintageimprovements:redstone_module")
		.add("cmi:nuclear_mechanism")

	event.get("create:mechanisms/precision")
		.add("create:precision_mechanism")

	event.get("create:mechanisms/redstone")
		.add("vintageimprovements:redstone_module")

	event.get("create:mechanisms/nuclear")
		.add("cmi:nuclear_mechanism")

	// 构件半成品
	event.get("create:incomplete_mechanisms")
		.add("create:incomplete_precision_mechanism")
		.add("vintageimprovements:incomplete_redstone_module")
		.add("cmi:incomplete_nuclear_mechanism")

	// 航天构件
	for (let i = 1; i <= 4; i++) {
		event.get(`cmi:tier_${i}_aviation_mechanism`)
			.add(`cmi:tier_${i}_aviation_mechanism`)
	}

	// DYE_COLOR_GROUP 遍历
	CmiGlobal.DYE_COLOR_GROUP.forEach((colors) => {
		// 多彩构件
		event.get(`forge:dyes/${colors}`)
			.add("cmi:colorful_mechanism")

		// 潜影盒
		event.get("minecraft:shulker_boxes")
			.add("minecraft:shulker_box")
			.add(`minecraft:${colors}_shulker_box`)
	})

	// mek 化学品储罐
	event.get("mekanism:chemical_tanks")
		.add("mekanism:basic_chemical_tank")
		.add("mekanism:elite_chemical_tank")
		.add("mekanism:ultimate_chemical_tank")
		.add("mekanism:creative_chemical_tank")

	// 锤子
	event.get("createdieselgenerators:hammers")
		.add("createdieselgenerators:hammer")

	// 修复材料包
	event.get("easyrepair:repair_item_pouchs")
		.add("easyrepair:repair_item_pouch_i")
		.add("easyrepair:repair_item_pouch_ii")
		.add("easyrepair:repair_item_pouch_iii")

	// 机动流体储罐
	event.get("create:fluid_tanks")
		.add("fluidlogistics:multi_fluid_tank")
		.add("fluidlogistics:horizontal_multi_fluid_tank")
		.add("create:fluid_tank")
		.add("create_connected:fluid_vessel")

	// 石英玻璃原料
	event.get("cmi:quartz_glass_material")
		.add("#forge:dusts/quartz")
		.add("#forge:dusts/pure_quartz")
		.add("#forge:dusts/certus_quartz")

	// 铁锭
	event.get("c:iron_ingots")
		.add("#forge:ingots/iron")

	// 抽屉
	event.get("functionalstorage:drawers/rubberwood_1")
		.add("functional_storage_js:rubberwood_1")

	event.get("functionalstorage:drawers/rubberwood_2")
		.add("functional_storage_js:rubberwood_2")

	event.get("functionalstorage:drawers/rubberwood_4")
		.add("functional_storage_js:rubberwood_4")

	// 伪装方块
	event.get("create:copycats")
		.add([
			"create:copycat_panel",
			"copycats:copycat_flat_pane",
			"copycats:copycat_vertical_slice",
			"copycats:copycat_vertical_stairs",
			"copycats:copycat_vertical_step",
			"create_connected:copycat_vertical_step",
			"copycats:copycat_vertical_half_layer",
			"copycats:copycat_half_layer",
			"copycats:copycat_half_panel",
			"create_connected:copycat_block",
			"copycats:copycat_block",
			"copycats:copycat_large_cogwheel",
			"copycats:copycat_cogwheel",
			"copycats:copycat_shaft",
			"copycats:copycat_layer",
			"create_connected:copycat_board",
			"copycats:copycat_board",
			"create:copycat_step",
			"copycats:copycat_wooden_button",
			"create_connected:copycat_stairs",
			"copycats:copycat_stairs",
			"copycats:copycat_fluid_pipe",
			"copycats:copycat_beam",
			"create_connected:copycat_beam",
			"copycats:copycat_stacked_half_layer",
			"copycats:copycat_board",
			"create_connected:copycat_board",
			"copycats:copycat_wooden_pressure_plate",
			"copycats:copycat_pane",
			"copycats:copycat_wall",
			"create_connected:copycat_wall",
			"copycats:copycat_corner_slice",
			"copycats:copycat_slice",
			"copycats:copycat_light_weighted_pressure_plate",
			"copycats:copycat_stone_button",
			"copycats:copycat_stone_pressure_plate",
			"create_connected:copycat_slab",
			"copycats:copycat_slab",
			"copycats:copycat_ladder",
			"copycats:copycat_iron_trapdoor",
			"copycats:copycat_board",
			"create_connected:copycat_board",
			"copycats:copycat_byte",
			"copycats:copycat_byte_panel",
			"copycats:copycat_ghost_block",
			"create_connected:copycat_fence",
			"copycats:copycat_fence",
			"create_connected:copycat_fence_gate",
			"copycats:copycat_fence_gate",
			"copycats:copycat_heavy_weighted_pressure_plate",
			"copycats:copycat_iron_door",
			"copycats:copycat_door",
			"copycats:copycat_trapdoor",
			"copycats:copycat_vertical_slope",
			"copycats:copycat_slope_layer",
			"copycats:copycat_folding_door",
			"copycats:copycat_sliding_door",
			"copycats:copycat_slope",
			"railways:copycat_headstock_split_knuckle_coupler",
			"railways:copycat_headstock_buffer",
			"railways:copycat_headstock_link_and_pin",
			"railways:copycat_headstock_link_and_pin_linkless",
			"railways:copycat_headstock_knuckle_coupler",
			"railways:copycat_headstock_screwlink_coupler"
		])

	// 矿藏
	event.get("cmi:ore_deposits")
		.add("create_rns:iron_deposit_block")
		.add("create_rns:copper_deposit_block")
		.add("create_rns:zinc_deposit_block")
		.add("create_rns:gold_deposit_block")
		.add("create_rns:redstone_deposit_block")
		.add("create_rns:tin_deposit_block")
		.add("create_rns:lead_deposit_block")
		.add("create_rns:silver_deposit_block")
		.add("create_rns:nickel_deposit_block")
		.add("create_rns:cobalt_deposit_block")
		.add("create_rns:quartz_deposit_block")
		.add("create_rns:uranium_deposit_block")
		.add("create_rns:depleted_deposit_block")

	// 太阳能蒸汽机
	event.get("cmi:solar_boilers")
		.add("cmi:bronze_solar_boiler")
		.add("cmi:cast_iron_solar_boiler")
		.add("cmi:steel_solar_boiler")

	// 可割出植物纤维的草
	event.get("cmi:grass_fiber")
		.add("minecraft:grass")
		.add("minecraft:tall_grass")
		.add("minecraft:seagrass")
		.add("tconstruct:earth_slime_tall_grass")
		.add("tconstruct:sky_slime_tall_grass")
		.add("tconstruct:ender_slime_tall_grass")
		.add("tconstruct:blood_slime_tall_grass")

	// 主世界石英矿
	event.get("cmi:overworld_quartz_ore")
		.add("cmi:quartz_ore")
		.add("cmi:deepslate_quartz_ore")

	// 榨糖原料
	event.get("cmi:sugar_raw_material")
		.add("minecraft:sugar_cane")
		.add("minecraft:beetroot")

	// 无限燃烧 Tooltip
	event.get("minecraft:infiniburn_all")
		.add("forge:storage_blocks/coal")
		.add("forge:storage_blocks/charcoal")

	// 建筑手杖
	event.get("constructionwand:wand")
		.add("constructionwand:stone_wand")
		.add("constructionwand:iron_wand")
		.add("constructionwand:diamond_wand")
		.add("constructionwand:infinity_wand")

	// 抽屉
	event.get("functionalstorage:drawer")
		.add("#functionalstorage:fluid_drawer")
		.add("#functionalstorage:item_drawer")
		.add("functionalstorage:ender_drawer")

	event.get("functionalstorage:item_drawer")
		.add("#functionalstorage:drawer/wood")
		.add("#functionalstorage:compacting_drawer")
		.add("functionalstorage:framed_1")
		.add("functionalstorage:framed_2")
		.add("functionalstorage:framed_4")

	event.get("functionalstorage:fluid_drawer")
		.add("functionalstorage:fluid_1")
		.add("functionalstorage:fluid_2")
		.add("functionalstorage:fluid_4")

	event.get("functionalstorage:compacting_drawer")
		.add("functionalstorage:compacting_drawer")
		.add("functionalstorage:simple_compacting_drawer")
		.add("functionalstorage:compacting_framed_drawer")
		.add("functionalstorage:framed_simple_compacting_drawer")

	let drawerMaterialWoods = [
		"oak",
		"spruce",
		"birch",
		"jungle",
		"acacia",
		"dark_oak",
		"cherry",
		"mangrove",
		"crimson",
		"warped",
		"cmi:rubberwood"
	]
	drawerMaterialWoods.forEach((woodName) => {
		let woodId =
			woodName.includes(":") ? woodName : `functionalstorage:${woodName}`

		let woodType = woodName.split(":").pop()

		let drawerType = [1, 2, 4]

		drawerType.forEach((type) => {
			let drawerId = `${woodId}_${type}`
			event.get(`functionalstorage:drawers/${woodType}/${type}`)
				.add(drawerId)

			event.get("functionalstorage:drawer/wood")
				.add(drawerId)
		})
	})

	// 背罐
	event.get("create:backtanks")
		.add("create:copper_backtank")
		.add("create:netherite_backtank")

	// 潜水头盔
	event.get("create:diving_helmets")
		.add("create:copper_diving_helmet")
		.add("create:netherite_diving_helmet")

	// 泥炭生成
	event.get("cmi:peat_gen")
		.add("cmi:peat_block")
		.add("cmi:peat")

	// 特殊矿石
	event.get("cmi:special_ores")
		.add("#forge:raw_materials/galena")
		.add("#forge:raw_materials/osmiridium")
		.add("#forge:raw_materials/uraninite")
		.add("#forge:raw_materials/argentite")
		.add("#forge:raw_materials/stannine")
		.add("#forge:raw_materials/veridium")
		.add("#forge:raw_materials/lateritic_nickel")
		.add("#forge:raw_materials/pyrite")
		.add("#forge:raw_materials/sphalerite")
		.add("#forge:raw_materials/variscite")

	// 大型锅炉燃料
	event.get("cmi:large_boiler_fuel")
		.add("#forge:coal_coke")
		.add("#forge:gems/diamond")

	// 农夫乐事刀子
	event.get("farmersdelight:tools/knives")
		.add("#forge:tools/knives")
		.add("tconstruct:dagger")

	// 树皮
	event.get("cmi:tree_barks")
		.add("farmersdelight:tree_bark")
		.add("cmi:rubber_tree_bark")

	// 镐子
	event.get("minecraft:pickaxes")
		.add("#forge:tools/paxels")

	// 锄头
	event.get("minecraft:hoes")
		.add("tconstruct:mattock")

	// 工作桌
	event.get("cmi:tables")
		.add("#forge:workbenches")
		.add("tconstruct:tinkers_anvil")
		.add("tconstruct:scorched_anvil")
		.add("tconstruct:part_builder")
		.add("tconstruct:tinker_station")
		.add("tconstruct:modifier_worktable")

	// 下界植株
	event.get("cmi:nether_crops")
		.add("minecraft:nether_sprouts")
		.add("minecraft:nether_wart")
		.add("mynethersdelight:crimson_fungus_colony")
		.add("mynethersdelight:warped_fungus_colony")
		.add("mynethersdelight:powder_cannon")
		.add("kaleidoscope_cookery:chili_seed")

	// 物品容器
	event.get("cmi:item_container")
		.add("#forge:chests")
		.add("#forge:barrels")
		.add("#functionalstorage:item_drawer")

	// 流体储罐
	event.get("cmi:fluid_tanks")
		.add("create:fluid_tank")
		.add("create_connected:fluid_vessel")
		.add("railways:fuel_tank")
		.add("create:creative_fluid_tank")
		.add("create_connected:creative_fluid_vessel")
		.add("tconstruct:seared_fuel_tank")
		.add("tconstruct:seared_ingot_tank")
		.add("tconstruct:scorched_fuel_tank")
		.add("tconstruct:scorched_ingot_tank")
		.add("mekanism:basic_fluid_tank")
		.add("mekanism:advanced_fluid_tank")
		.add("mekanism:elite_fluid_tank")
		.add("mekanism:ultimate_fluid_tank")
		.add("mekanism:creative_fluid_tank")
		.add("#functionalstorage:fluid_drawer")

	// 电池
	event.get("cmi:batteries")
		.add("mekanism:basic_energy_cube")
		.add("mekanism:advanced_energy_cube")
		.add("mekanism:elite_energy_cube")
		.add("mekanism:ultimate_energy_cube")
		.add("mekanism:creative_energy_cube")
		.add("createaddition:modular_accumulator")
		.add("createaddition:creative_energy")
		.add("immersiveengineering:capacitor_lv")
		.add("immersiveengineering:capacitor_mv")
		.add("immersiveengineering:capacitor_hv")
		.add("thermal:energy_cell")

	// 工匠铁砧
	event.get("tconstruct:tinkers_anvil")
		.add("tconstruct:tinkers_anvil")
		.add("tconstruct:scorched_anvil")

	// 传动杆
	event.get("create:shaft")
		.add("create:shaft")
		.add("copycats:copycat_shaft")

	// 齿轮
	event.get("create:cogwheel")
		.add("create:cogwheel")
		.add("copycats:copycat_cogwheel")

	// 大齿轮
	event.get("create:large_cogwheel")
		.add("create:large_cogwheel")
		.add("copycats:copycat_large_cogwheel")

	// 耗能机器
	event.get("ad_astra:power_consumption_machines")
		.add("ad_astra:oxygen_distributor")
		.add("ad_astra:gravity_normalizer")
		.add("ad_astra:energizer")
		.add("ad_astra:compressor")
		.add("ad_astra:oxygen_loader")
		.add("ad_astra:fuel_refinery")
		.add("ad_astra:etrionic_blast_furnace")
		.add("ad_astra:cryo_freezer")
		.add("ad_astra:oxygen_sensor")
		.add("ad_astra:water_well")

	// 抽屉升级
	event.get("functionalstorage:upgrades")
		.add("functionalstorage:copper_upgrade")
		.add("functionalstorage:gold_upgrade")
		.add("functionalstorage:diamond_upgrade")
		.add("functionalstorage:netherite_upgrade")
		.add("functionalstorage:iron_downgrade")
		.add("functionalstorage:max_storage_upgrade")
		.add("functionalstorage:collector_upgrade")
		.add("functionalstorage:puller_upgrade")
		.add("functionalstorage:pusher_upgrade")
		.add("functionalstorage:creative_vending_upgrade")
		.add("functionalstorage:void_upgrade")
		.add("functionalstorage:redstone_upgrade")

	// 热力能源炉
	event.get("thermal:dynamos")
		.add("thermal:dynamo_stirling")
		.add("thermal:dynamo_magmatic")
		.add("thermal:dynamo_compression")
		.add("thermal_extra:dynamo_frost")
		.add("thermal:dynamo_numismatic")
		.add("thermal:dynamo_lapidary")
		.add("thermal:dynamo_disenchantment")
		.add("thermal:dynamo_gourmand")

	// 热力机器
	event.get("thermal:machines")
		.add("thermal_extra:advanced_refinery")
		.add("thermal_extra:nitratic_igniter")
		.add("thermal_extra:fluid_mixer")
		.add("thermal_extra:component_assembly")
		.add("thermal_extra:endothermic_dehydrator")

	// 可放入饰品栏的构件
	event.get("curios:mechanisms")
		.add("cmi:cobalt_mechanism")
		.add("cmi:photosensitive_mechanism")
		.add("cmi:nether_mechanism")
		.add("cmi:thermal_mechanism")
		.add("cmi:gold_mechanism")
		.add("cmi:nuclear_mechanism")

	// 量器
	event.get("tconstruct:gauge")
		.add("tconstruct:seared_fuel_gauge")
		.add("tconstruct:seared_ingot_gauge")

	// 氧化铝
	event.get("cmi:aluminum_oxide")
		.add("cmi:aluminum_oxide")

	// 压印模板
	event.get("ae2:inscriber_presses")
		.add("cmi:concurrent_processor_press")
		.add("ae2:name_press")

	// 冲压头
	event.get("vintageimprovements:curving_heads")
		.add("ae2:calculation_processor_press")
		.add("ae2:engineering_processor_press")
		.add("ae2:logic_processor_press")
		.add("cmi:concurrent_processor_press")
		.add("neoecoae:superconducting_processor_press")

	// 铸模
	event.get("thermal:crafting/casts")
		.add("thermalconstruct:bronze_cast_tool_handle")
		.add("thermalconstruct:bronze_cast_bow_grip")
		.add("thermalconstruct:bronze_cast_bow_limb")
		.add("thermalconstruct:bronze_cast_helmet_plating")
		.add("thermalconstruct:bronze_cast_chestplate_plating")
		.add("thermalconstruct:bronze_cast_leggings_plating")
		.add("thermalconstruct:bronze_cast_maille")
		.add("thermalconstruct:bronze_cast_small_axe_head")
		.add("thermalconstruct:bronze_cast_small_blade")
		.add("thermalconstruct:bronze_cast_adze_head")
		.add("thermalconstruct:bronze_cast_hammer_head")
		.add("thermalconstruct:bronze_cast_broad_blade")
		.add("thermalconstruct:bronze_cast_broad_axe_head")
		.add("thermalconstruct:bronze_cast_large_plate")
		.add("thermalconstruct:bronze_cast_tool_binding")
		.add("thermalconstruct:bronze_cast_tough_binding")
		.add("thermalconstruct:bronze_cast_gear")
		.add("thermalconstruct:bronze_cast_coin")
		.add("thermalconstruct:bronze_cast_wire")
		.add("thermalconstruct:bronze_cast_pick_head")
		.add("#tconstruct:casts/gold")

	event.get("tconstruct:casts")
		.add("thermal:chiller_ingot_cast")
		.add("thermal_extra:chiller_plate_cast")
		.add("thermal:chiller_rod_cast")

	event.get("tconstruct:casts/multi_use")
		.add("thermal:chiller_ingot_cast")
		.add("thermal_extra:chiller_plate_cast")
		.add("thermal:chiller_rod_cast")

	event.get("tconstruct:casts/multi_use/ingot")
		.add("thermal:chiller_ingot_cast")
	event.get("tconstruct:casts/multi_use/plate")
		.add("thermal_extra:chiller_plate_cast")
	event.get("tconstruct:casts/multi_use/rod")
		.add("thermal:chiller_rod_cast")

	// 模具
	event.get("thermal:crafting/dies")
		.add("cmi:coin_mold")
		.add("cmi:gear_mold")
		.add("cmi:2x2_packing_mold")
		.add("cmi:3x3_packing_mold")
		.add("cmi:unpack_mold")
		.add("cmi:plate_mold")

	// 催生晶体
	event.get("cmi:crystals")
		.add("minecraft:amethyst_shard")
		.add("minecraft:quartz")
		.add("ae2:certus_quartz_crystal")
		.add("tconstruct:earth_slime_crystal")
		.add("tconstruct:sky_slime_crystal")
		.add("tconstruct:ichor_slime_crystal")
		.add("tconstruct:ender_slime_crystal")

	// 移除晶体
	event.get("mekanism:crystals")
		.remove("mekanism:crystal_gold")
	event.get("mekanism:crystals/gold")
		.remove("mekanism:crystal_gold")

	// 机动燃烧燃料
	event.get("create:blaze_burner_fuel/special")
		.add("cmi:creosote_wood_chip_briquette")
		.add("tconstruct:blazing_blood_bucket")

	// 传送带套壳
	event.get("cmi:beltcasing")
		.add("create:andesite_casing")
		.add("create:brass_casing")

	// 可被套壳
	event.get("cmi:encasable")
		.add("create:shaft")
		.add("create:belt")

	// 可被拆壳
	event.get("cmi:uncasingable")
		.add("create:brass_encased_shaft")
		.add("create:andesite_encased_shaft")

	// 天然粉末
	event.get("cmi:natural_powders")
		.add("minecraft:blaze_powder")
		.add("thermal:basalz_powder")
		.add("thermal:blitz_powder")
		.add("thermal:blizz_powder")

	// 传送器组件
	event.get("portality:portality_module")
		.add("portality:module_energy")
		.add("portality:module_fluids")
		.add("portality:module_items")
		.add("portality:module_interdimensional")

	// 再丢一下进了水就会爆炸! 加钠
	event.get("cmi:sodium_explosive")
		.add("#forge:ingots/sodium")
		.add("#forge:plates/sodium")
		.add("#forge:dusts/sodium")
		.add("#forge:nuggets/sodium")
		.add("#forge:storage_blocks/sodium")

	// Delta 黑石源质
	event.get("cmi:delta_blackstone_source")
		.add("cmi:delta_blackstone_source")

	// 火把
	event.get("cmi:torch")
		.add("minecraft:torch")
		.add("minecraft:soul_torch")
		.add("minecraft:redstone_torch")
		.add("alexscaves:bioluminescent_torch")
		.add("mynethersdelight:powdery_torch")

	// 南瓜
	event.get("cmi:pumpkin")
		.add("minecraft:pumpkin")
		.add("minecraft:carved_pumpkin")
		.add("minecraft:jack_o_lantern")

	// 灯笼
	event.get("cmi:lantern")
		.add("minecraft:lantern")
		.add("minecraft:soul_lantern")

	// 木桶/碗
	event.get("treetap:wooden_buckets")
		.add("minecraft:bowl")

	// 月岩
	event.get("ad_astra:moon_stones")
		.add("ad_astra:moon_cobblestone")
		.add("ad_astra:moon_deepslate")
		.add("ad_astra:moon_stone")

	// 水星岩
	event.get("ad_astra:mercury_stones")
		.add("ad_astra:mercury_stone")
		.add("ad_astra:mercury_cobblestone")

	// 金星岩
	event.get("ad_astra:venus_stones")
		.add("ad_astra:venus_sandstone")
		.add("ad_astra:venus_stone")
		.add("ad_astra:venus_cobblestone")

	// 锤子
	event.get("forge:hammers")
		.add("#createdieselgenerators:hammers")
		.add("thermal_extra:signalum_hammer")
		.add("thermal_extra:lumium_hammer")
		.add("thermal_extra:enderium_hammer")
		.add("thermal_extra:soul_infused_hammer")
		.add("thermal_extra:shellite_hammer")
		.add("thermal_extra:twinite_hammer")
		.add("thermal_extra:dragonsteel_hammer")
		.add("thermal_extra:abyssal_hammer")
		.add("immersiveengineering:hammer")
		.add("tconstruct:sledge_hammer")
		.add("tconstruct:vein_hammer")

	// 削皮木
	event.get("forge:stripped_logs")
		.add("thermal:stripped_rubberwood_log")

	event.get("forge:stripped_logs/rubberwood")
		.add("thermal:stripped_rubberwood_wood")
		.add("thermal:stripped_rubberwood_log")

	// 可发酵物
	event.get("forge:fermentable")
		.add("minecraft:melon_slice")
		.add("minecraft:glow_berries")
		.add("minecraft:apple")
		.add("#forge:crops/tomato")
		.add("minecraft:beetroot")
		.add("minecraft:sweet_berry")
		.add("#forge:crops/potato")

	// 稻穗
	event.get("forge:rice_panicle")
		.add("farmersdelight:rice_panicle")
		.add("kaleidoscope_cookery:rice_panicle")

	// 奶酪 
	event.get("forge:cheese")
		.add("ad_astra:cheese")
		.add("tconstruct:cheese_ingot")

	event.get("forge:cheese_block")
		.add("ad_astra:cheese_block")
		.add("tconstruct:cheese_block")

	// 小刀 
	event.get("forge:tools/knives")
		.add("tconstruct:dagger")

	// 箱子 
	event.get("forge:chests")
		.add("ae2:smooth_sky_stone_chest")

	// 沙子 
	event.get("forge:sand")
		.add("#minecraft:sand")

	event.get("minecraft:sand")
		.add("#forge:sand")

	// 石头 
	event.get("forge:stone")
		.add("#forge:cobblestone")

	// 矿物 
	event.get("forge:ores")
		.add("ad_astra:moon_cheese_ore")

	event.get("forge:ores/cheese")
		.add("ad_astra:moon_cheese_ore")

	// 棱镜玻璃 
	event.get("forge:glass/prism")
		.add("cmi:polished_quartz_prism")

	// 盐 
	event.get("forge:salt")
		.add("ratatouille:salt")
		.add("cmi:nacl")

	// 冰 
	event.get("forge:ice")
		.add("minecraft:ice")
		.add("minecraft:packed_ice")
		.add("minecraft:blue_ice")
		.add("ratatouille:frozen_block")

	// 史莱姆球 
	event.get("forge:slimeballs")
		.add("alexscaves:ferrouslime_ball")

	event.get("forge:slimeball/ferrous")
		.add("alexscaves:ferrouslime_ball")

	// 锭 
	event.get("forge:ingots")
		.add("createdeco:industrial_iron_ingot")
		.add("edenring:astrallium")
		.add("#forge:ingots/prismalium")
		.add("#forge:ingots/andesite_alloy")
		.add("#forge:ingots/melodium")
		.add("#forge:ingots/stellarium")

	event.get("forge:ingots/andesite_alloy")
		.add("create:andesite_alloy")

	event.get("forge:ingots/industrial_iron")
		.add("createdeco:industrial_iron_ingot")

	event.get("forge:ingots/andesite")
		.add("create:andesite_alloy")

	event.get("forge:ingots/astrallium")
		.add("edenring:astrallium")

	add("forge:ingots/scarlet_neodymium", "alexscaves:scarlet_neodymium_ingot")
	add("forge:ingots/azure_neodymium", "alexscaves:azure_neodymium_ingot")

	removeTagAllId("forge:ingots/netherite_scrap")
		.add("minecraft:netherite_scrap")

	removeTagAllId("forge:ingots/netherite")
		.add("minecraft:netherite_ingot")

	// 粒 
	event.get("forge:nuggets")
		.add("createdeco:industrial_iron_nugget")

	event.get("forge:nuggets/industrial_iron")
		.add("createdeco:industrial_iron_nugget")

	removeTagAllId("forge:nuggets/netherite")
		.add("tconstruct:netherite_nugget")
		.add("createdeco:netherite_nugget")

	removeTagAllId("forge:nuggets/netherite_scrap")
		.add("tconstruct:debris_nugget")

	// 存储块 
	event.get("forge:storage_blocks")
		.add("create:industrial_iron_block")
		.add("ad_astra:etrium_block")

	event.get("forge:storage_blocks/industrial_iron")
		.add("create:industrial_iron_block")

	event.get("forge:storage_blocks/etrium")
		.add("ad_astra:etrium_block")

	// 板 
	event.get("forge:plates")
		.add("createdeco:zinc_sheet")
		.add("createdeco:netherite_sheet")
		.add("createdeco:andesite_sheet")
		.add("createdeco:industrial_iron_sheet")
		.add("mekanism:hdpe_sheet")

	event.get("forge:plates/andesite_alloy")
		.add("vintageimprovements:andesite_sheet")
		.add("createdeco:andesite_sheet")

	event.get("forge:plates/zinc")
		.add("createdeco:zinc_sheet")

	event.get("forge:plates/netherite")
		.add("createdeco:netherite_sheet")

	event.get("forge:plates/industrial_iron")
		.add("createdeco:industrial_iron_sheet")

	event.get("forge:plates/polyolefin")
		.add("thermal_extra:polyolefin_plate")

	event.get("forge:plates/andesite")
		.add("#forge:plates/andesite_alloy")

	add("forge:plates/silicon", "ae2:printed_silicon")

	// 杆 
	event.get("forge:rods")
		.add("immersiveengineering:stick_steel")
		.add("immersiveengineering:stick_aluminum")

	// 粉 
	event.get("forge:dusts/niter")
		.add("immersiveengineering:dust_saltpeter")

	event.get("forge:dusts/wood")
		.add("createdieselgenerators:wood_chip")

	event.get("forge:dusts/salt")
		.add("#forge:salt")

	// 宝石
	add("forge:gems/charged_amethyst", "create_rns:resonant_amethyst")

	// 粗矿
	event.get("forge:raw_materials/desh_scrap")
		.add("ad_astra:raw_desh")

	event.get("forge:raw_materials/ostrum_scrap")
		.add("ad_astra:raw_ostrum")

	event.get("forge:raw_materials/calorite_scrap")
		.add("ad_astra:raw_calorite")

	add("forge:raw_materials/scarlet_neodymium", "alexscaves:raw_scarlet_neodymium")
	add("forge:raw_materials/azure_neodymium", "alexscaves:raw_azure_neodymium")
	add("forge:raw_materials/astrallium", "edenring:raw_astrallium")

	removeTagAllId("forge:raw_materials/desh")
	removeTagAllId("forge:raw_materials/ostrum")
	removeTagAllId("forge:raw_materials/calorite")

	// 工作台 
	event.get("forge:workbenches")
		.add("immersiveengineering:craftingtable")
		.add("edenring:auritis_crafting_table")
		.add("edenring:balloon_mushroom_crafting_table")
		.add("edenring:pulse_tree_crafting_table")
		.add("edenring:brain_tree_crafting_table")

	// 遍历粉碎矿石
	let crushedMaterialGroup = [
		"iron",
		"gold",
		"copper",
		"zinc",
		"osmium",
		"silver",
		"tin",
		"lead",
		"aluminum",
		"uranium",
		"nickel",
		"platinum"
	]
	crushedMaterialGroup.forEach((material) => {
		event.get(`create:crushed_raw_materials/${material}`)
			.add(`create:crushed_raw_${material}`)
	})

	// 遍历锭、粒、板、杆
	let materialTypes = [
		"ingot",
		"nugget",
		"plate",
		"rod"
	]
	materialTypes.forEach((metal) => {
		event.get(`forge:${metal}s/etrium`)
			.add(`ad_astra:etrium_${metal}`)

		event.get(`forge:${metal}s`)
			.add(`ad_astra:etrium_${metal}`)
	})

	// 遍历粗矿粒
	let rawNuggetMetals = [
		"copper",
		"iron",
		"gold",
		"tin",
		"lead",
		"silver",
		"nickel",
		"aluminum",
		"uranium",
		"osmium",
		"zinc"
	]
	rawNuggetMetals.forEach((metal) => {
		event.get(`forge:raw_nuggets/${metal}`)
			.add(`thermal_extra:${metal}_ore_chunk`)

		event.get(`forge:raw_nuggets`)
			.add(`thermal_extra:${metal}_ore_chunk`)
	})

	// 遍历装备
	let armorTypes = [
		{ armor: "helmet", tag: "helmets" },
		{ armor: "chestplate", tag: "chestplates" },
		{ armor: "leggings", tag: "leggings" },
		{ armor: "boots", tag: "boots" },
	]
	armorTypes.forEach((armorType) => {
		let { armor, tag } = armorType
		// 防雷装
		event.get("edenring:lightning_protection")
			.add(`minecraft:iron_${armor}`)

		// astrallium 装备
		let astralliumArmor = `edenring:astrallium_${armor}`
		event.get("forge:armor/astrallium")
			.add(astralliumArmor)

		event.get("forge:armors")
			.add(astralliumArmor)

		event.get(`forge:armors/${tag}`)
			.add(astralliumArmor)

		// 锁链装备
		event.get("minecraft:armors/chainmail")
			.add(`minecraft:chainmail_${armor}`)
	})

	// 遍历工具
	let toolTpyes = [
		"sword",
		"pickaxe",
		"axe",
		"hoe",
		"shovel"
	]
	toolTpyes.forEach((tool) => {
		// astrallium 工具
		let astralliumTool = `edenring:astrallium_${tool}`
		event.get("minecraft:tools")
			.add(astralliumTool)

		event.get(`minecraft:${tool}s`)
			.add(astralliumTool)

		event.get("forge:tools")
			.add(astralliumTool)

		event.get("forge:tools/astrallium")
			.add(astralliumTool)
	})

	// 遍历木料
	WoodMaterials.forEach((type) => {
		let { PLANKS, NAME } = type
		event.get(`minecraft:planks/${NAME}`)
			.add(PLANKS)
	})

	/**
	 * 
	 * @param {Special.ItemTag} tag 
	 * @returns 
	 */
	function removeTagAllId(tag) {
		return event.get(tag)
			.removeAll()
	}
})
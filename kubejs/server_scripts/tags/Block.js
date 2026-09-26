// priority: 11
ServerEvents.tags("block", (event) => {
	// 烟熏源
	event.get("cmi:smoke_source")
		.add("#forge:storage_blocks/coal_coke")

	// 热源
	event.get("cmi:heat_sources")
		.add("minecraft:lava")
		.add("#farmersdelight:heat_sources")
		.remove("mynethersdelight:magma_cake")

	// 冰冻催化剂
	event.get("cmi:freezing_catalyst")
		.add("minecraft:powder_snow")
		.add("create_connected:fan_freezing_catalyst")

	// 矿藏
	event.get("cmi:ore_deposits")
		.add([
			"create_rns:iron_deposit_block",
			"create_rns:copper_deposit_block",
			"create_rns:zinc_deposit_block",
			"create_rns:gold_deposit_block",
			"create_rns:redstone_deposit_block",
			"create_rns:tin_deposit_block",
			"create_rns:lead_deposit_block",
			"create_rns:silver_deposit_block",
			"create_rns:nickel_deposit_block",
			"create_rns:cobalt_deposit_block",
			"create_rns:quartz_deposit_block",
			"create_rns:uranium_deposit_block",
			"create_rns:depleted_deposit_block"
		])

	// 主世界石英矿
	event.get("cmi:overworld_quartz_ore")
		.add("cmi:quartz_ore")
		.add("cmi:deepslate_quartz_ore")

	// 无限燃烧
	event.get("minecraft:infiniburn_all")
		.add("forge:storage_blocks/coal")
		.add("forge:storage_blocks/charcoal")
		.add("minecraft:nether_bricks")

	// 可以割出植物纤维的草
	event.get("cmi:grass_fiber")
		.add([
			"minecraft:grass",
			"minecraft:tall_grass",
			"minecraft:seagrass",
			"tconstruct:earth_slime_tall_grass",
			"tconstruct:sky_slime_tall_grass",
			"tconstruct:ender_slime_tall_grass",
			"tconstruct:blood_slime_tall_grass"
		])

	// 集装箱
	event.get("mekanism:cardboard_blacklist")
		.add("#minecraft:leaves")

	// 下界农田
	event.get("cmi:nether_farmland")
		.add("minecraft:netherrack")
		.add("minecraft:crimson_nylium")
		.add("minecraft:warped_nylium")
		.add("minecraft:soul_sand")
		.add("minecraft:soul_soil")
		.add("mynethersdelight:resurgent_soil")
		.add("mynethersdelight:resurgent_soil_farmland")

	// 泥土
	event.get("minecraft:dirt")
		.remove("mynethersdelight:resurgent_soil_farmland")

	// 热力机器
	event.get("thermal:machines")
		.add("thermal_extra:endothermic_dehydrator")
		.add("thermal_extra:nitratic_igniter")
		.add("thermal_extra:fluid_mixer")
		.add("thermal_extra:component_assembly")
		.add("thermal_extra:advanced_refinery")

	// 热力发电机
	event.get("thermal:dynamos")
		.add("thermal_extra:dynamo_frost")

	// 镐挖掘
	event.get("minecraft:mineable/pickaxe")
		.remove("treetap:tap")

	// 斧挖掘
	event.get("minecraft:mineable/axe")
		.add("treetap:tap")

	// 热力设备
	event.add("thermal:devices")
		.add([
			"thermal_extra:device_harvester",
			"thermal_extra:device_lava_gen",
			"thermal:tinker_bench",
			"thermal:charge_bench",
			"thermal:device_tree_extractor",
			"thermal:device_fisher",
			"thermal:device_composter",
			"thermal:device_water_gen",
			"thermal:device_rock_gen",
			"thermal:energy_cell",
			"thermal:fluid_cell",
			"thermal:device_tree_extractor",
			"thermal:device_fisher",
			"thermal:device_composter",
			"thermal:device_water_gen",
			"thermal:device_rock_gen",
			"thermal:device_collector",
			"thermal:device_xp_condenser",
			"thermal:device_nullifier",
			"thermal:device_potion_diffuser",
			"thermal:machine_frame",
			"thermal:energy_cell_frame",
			"thermal:fluid_cell_frame"
		])

	// 可生长金葡萄
	event.get("kaleidoscope_tavern:can_grow_gold_grape")
		.add("alexscaves:coprolith")

	// 风扇吹风可通过
	event.get("create:fan_transparent")
		.add("tconstruct:seared_basin")

	// 扳手可拆除
	event.get("create:wrench_pickup")
		.add([
			"#thermal:machines",
			"#thermal:dynamos",
			"#thermal:devices",

			"#forge:storage_blocks",
			"#forge:sheetmetals",

			"@mm",
			"@steampowered",
			"@createdeco",
			"@farmersdelight",
			"@ftbquests",
			"@immersiveindustry",
			"@functionalstorage",
			"@mynethersdelight",
			"@portality",
			"@sophisticatedbackpacks",
			"@pipez",
			"@rechiseledcreate",

			"#kaleidoscope_cookery:sittable",
			"#kaleidoscope_cookery:table",
			"kaleidoscope_cookery:stove",
			"kaleidoscope_cookery:pot",
			"kaleidoscope_cookery:shawarma_spit",
			"kaleidoscope_cookery:straw_block",
			"kaleidoscope_cookery:pot",
			"kaleidoscope_cookery:stockpot",
			"kaleidoscope_cookery:chopping_board",
			"kaleidoscope_cookery:steamer",
			"kaleidoscope_cookery:teapot",
			"kaleidoscope_cookery:kitchenware_racks",
			"kaleidoscope_cookery:fruit_basket",
			"kaleidoscope_cookery:enamel_basin",
			"kaleidoscope_cookery:recipe_item",
			"kaleidoscope_cookery:oil_pot",

			"ad_astra:launch_pad",
			"ad_astra:cable_duct",
			"ad_astra:fluid_pipe_duct",
			"ad_astra:coal_generator",
			"ad_astra:compressor",
			"ad_astra:etrionic_blast_furnace",
			"ad_astra:nasa_workbench",
			"ad_astra:fuel_refinery",
			"ad_astra:oxygen_loader",
			"ad_astra:solar_panel",
			"ad_astra:water_well",
			"ad_astra:oxygen_distributor",
			"ad_astra:gravity_normalizer",
			"ad_astra:energizer",
			"ad_astra:cryo_freezer",
			"ad_astra:oxygen_sensor",
			"#ad_astra:globes",

			"create_rns:mine_head",
			"#cmi:coils",

			"immersiveengineering:craftingtable",
			"immersiveengineering:workbench",
			"immersiveengineering:circuit_table",
			"immersiveengineering:gunpowder_barrel",
			"immersiveengineering:wooden_barrel",
			"immersiveengineering:turntable",
			"immersiveengineering:crate",
			"immersiveengineering:reinforced_crate",
			"immersiveengineering:sorter",
			"immersiveengineering:item_batcher",
			"immersiveengineering:fluid_sorter",
			"immersiveengineering:windmill",
			"immersiveengineering:watermill",
			"immersiveengineering:logic_unit",
			"immersiveengineering:razor_wire",
			"immersiveengineering:capacitor_lv",
			"immersiveengineering:capacitor_mv",
			"immersiveengineering:capacitor_hv",
			"immersiveengineering:metal_barrel",
			"immersiveengineering:fluid_pump",
			"immersiveengineering:fluid_placer",
			"immersiveengineering:blastfurnace_preheater",
			"immersiveengineering:furnace_heater",
			"immersiveengineering:dynamo",
			"immersiveengineering:thermoelectric_generator",
			"immersiveengineering:electric_lantern",
			"immersiveengineering:charging_station",
			"immersiveengineering:fluid_pipe",
			"immersiveengineering:sample_drill",
			"immersiveengineering:tesla_coil",
			"immersiveengineering:floodlight",
			"immersiveengineering:turret_chem",
			"immersiveengineering:turret_gun",
			"immersiveengineering:cloche",
			"immersiveengineering:electromagnet",
			"immersiveengineering:coil_lv",
			"immersiveengineering:coil_mv",
			"immersiveengineering:coil_hv",
			"immersiveengineering:rs_engineering",
			"immersiveengineering:heavy_engineering",
			"immersiveengineering:light_engineering",
			"immersiveengineering:generator",
			"immersiveengineering:radiator",
			"immersiveengineering:steel_fence",
			"immersiveengineering:alu_fence",
			"immersiveengineering:steel_post",
			"immersiveengineering:alu_post",
			"immersiveengineering:transformer",
			"immersiveengineering:transformer_hv",
			"immersiveengineering:breaker_switch",
			"immersiveengineering:redstone_breaker",
			"immersiveengineering:current_transformer",
			"immersiveengineering:connector_redstone",
			"immersiveengineering:connector_probe",
			"immersiveengineering:connector_bundled",
			"immersiveengineering:treated_scaffold",
			"immersiveengineering:treated_fence",
			"immersiveengineering:stairs_treated_wood_horizontal",
			"immersiveengineering:stairs_treated_wood_vertical",
			"immersiveengineering:stairs_treated_wood_packaged",
			"#forge:treated_wood",
			"immersiveengineering:lightning_rod",
			"immersiveengineering:coke_oven",
			"immersiveengineering:blast_furnace",
			"immersiveengineering:advanced_blast_furnace",
			"immersiveengineering:alloy_smelter",
			"immersiveengineering:crusher",
			"immersiveengineering:fermenter",
			"immersiveengineering:diesel_generator",
			"immersiveengineering:metal_press",
			"immersiveengineering:assembler",
			"immersiveengineering:auto_workbench",
			"immersiveengineering:bottling_machine",
			"immersiveengineering:silo",
			"immersiveengineering:tank",
			"immersiveengineering:mixer",
			"immersiveengineering:refinery",
			"immersiveengineering:squeezer",
			"immersiveengineering:bucket_wheel",
			"immersiveengineering:excavator",
			"immersiveengineering:sawmill",
			"immersiveengineering:arc_furnace",
			"#immersiveengineering:mineable/hammer",

			"#cmi:tables",
			"#tconstruct:tables",
			"tconstruct:seared_melter",
			"tconstruct:seared_heater",
			"tconstruct:scorched_alloyer",
			"tconstruct:smeltery_controller",
			"tconstruct:foundry_controller",
			"tconstruct:seared_drain",
			"tconstruct:seared_duct",
			"tconstruct:seared_chute",
			"tconstruct:scorched_drain",
			"tconstruct:scorched_duct",
			"tconstruct:scorched_chute",
			"tconstruct:seared_fuel_tank",
			"tconstruct:seared_fuel_gauge",
			"tconstruct:seared_ingot_tank",
			"tconstruct:seared_ingot_gauge",
			"tconstruct:scorched_fuel_tank",
			"tconstruct:scorched_fuel_gauge",
			"tconstruct:scorched_ingot_tank",
			"tconstruct:scorched_duct",
			"tconstruct:scorched_chute",
			"tconstruct:seared_fuel_tank",
			"tconstruct:seared_fuel_gauge",
			"tconstruct:seared_ingot_tank",
			"tconstruct:seared_ingot_gauge",
			"tconstruct:scorched_fuel_tank",
			"tconstruct:scorched_fuel_gauge",
			"tconstruct:scorched_ingot_tank",
			"tconstruct:seared_table",
			"tconstruct:scorched_table",
			"tconstruct:seared_basin",
			"tconstruct:scorched_basin",
			"tconstruct:seared_casting_tank",
			"tconstruct:scorched_proxy_tank",
			"tconstruct:seared_fluid_cannon",
			"tconstruct:scorched_fluid_cannon",
			"tconstruct:seared_bricks",
			"tconstruct:scorched_bricks",
			"tconstruct:seared_glass",
			"tconstruct:scorched_glass",
			"tconstruct:seared_faucet",
			"tconstruct:scorched_faucet",
			"tconstruct:seared_channel",
			"tconstruct:scorched_channel"
		])

	// 矿物
	event.get("forge:ores")
		.add("ad_astra:moon_cheese_ore")

	event.get("forge:ores/cheese")
		.add("ad_astra:moon_cheese_ore")

	event.get("minecraft:needs_stone_tool")
		.add("#cmi:coils")

	event.get("minecraft:mineable/pickaxe")
		.add("#cmi:coils")

	// 平台填充
	event.get("industrial_platform:no_drop_blocks")
		.add([
			"create:polished_cut_andesite",
			"create:polished_cut_diorite",
			"create:polished_cut_ochrum",
			"create:polished_cut_scorchia",
			"create:layered_deepslate"
		])

	// 遍历木头列表
	WoodMaterials.forEach((wood) => {
		let { STRIPPED_LOG, STRIPPED_WOOD } = wood

		event.get("treetap:tappable")
			.add([STRIPPED_LOG, STRIPPED_WOOD])
	})

	// 移除
	removeTagAllId("treetap:tappable")

	event.get("treetap:tappable")
		.add([
			"thermal:stripped_rubberwood_log",
			"thermal:stripped_rubberwood_wood"
		])

	// 风帆
	event.get("create:windmill_sails")
		.remove("create:sail_frame")

	/**
	 * 
	 * @param {Special.BlockTag} tag 
	 * @returns 
	 */
	function removeTagAllId(tag) {
		return event.get(tag)
			.removeAll()
	}
})
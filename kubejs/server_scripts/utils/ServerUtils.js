// priority: 18

// 构件相关物品统一调用
const Mechanisms = Object.freeze({
	// C0
	WOODEN: Object.freeze({
		COM: Item.of("cmi:wooden_mechanism"),
		INC: Item.of("cmi:incomplete_wooden_mechanism")
	}),
	STONE: Object.freeze({
		COM: Item.of("cmi:stone_mechanism"),
		INC: Item.of("cmi:incomplete_stone_mechanism")
	}),
	REDSTONE: Object.freeze({
		COM: Item.of("vintageimprovements:redstone_module"),
		INC: Item.of("vintageimprovements:incomplete_redstone_module")
	}),
	NATURE: Object.freeze({
		COM: Item.of("cmi:nature_mechanism"),
		INC: Item.of("cmi:incomplete_nature_mechanism")
	}),
	// C1
	ANDESITE: Object.freeze({
		COM: Item.of("cmi:andesite_mechanism"),
		INC: Item.of("cmi:incomplete_andesite_mechanism"),
		BAS: Item.of("cmi:andesite_mechanism_basement")

	}),
	COPPER: Object.freeze({
		COM: Item.of("cmi:copper_mechanism"),
		INC: Item.of("cmi:incomplete_copper_mechanism"),
		BAS: Item.of("cmi:copper_mechanism_basement")
	}),
	IRON: Object.freeze({
		COM: Item.of("cmi:iron_mechanism"),
		INC: Item.of("cmi:incomplete_iron_mechanism"),
		BAS: Item.of("cmi:iron_mechanism_basement")
	}),
	PIG_IRON: Object.freeze({
		COM: Item.of("cmi:pig_iron_mechanism"),
		INC: Item.of("cmi:incomplete_pig_iron_mechanism")
	}),
	POTION: Object.freeze({
		COM: Item.of("cmi:potion_mechanism"),
		INC: Item.of("cmi:incomplete_potion_mechanism")
	}),
	// C2
	STEAM: Object.freeze({
		COM: Item.of("cmi:bronze_mechanism"),
		INC: Item.of("cmi:incomplete_bronze_mechanism")
	}),
	RAILWAY: Object.freeze({
		COM: Item.of("cmi:railway_mechanism"),
		INC: Item.of("cmi:incomplete_railway_mechanism")
	}),
	NETHER: Object.freeze({
		COM: Item.of("cmi:nether_mechanism"),
		INC: Item.of("cmi:incomplete_nether_mechanism")
	}),
	ENCHANTED: Object.freeze({
		COM: Item.of("cmi:enchanted_mechanism"),
		INC: Item.of("cmi:incomplete_enchanted_mechanism")
	}),
	//C3
	COIL: Object.freeze({
		COM: Item.of("cmi:coil_mechanism"),
		INC: Item.of("cmi:incomplete_coil_mechanism"),
		AUG: Item.of("cmi:coil_mechanism_augment")
	}),
	PHOTO: Object.freeze({
		COM: Item.of("cmi:photosensitive_mechanism"),
		INC: Item.of("cmi:incomplete_photosensitive_mechanism")
	}),
	PRECISION: Object.freeze({
		COM: Item.of("create:precision_mechanism"),
		INC: Item.of("create:incomplete_precision_mechanism")
	}),
	COLOR: Object.freeze({
		COM: Item.of("cmi:colorful_mechanism"),
		INC: Item.of("cmi:incomplete_colorful_mechanism")
	}),
	SCULK: Object.freeze({
		COM: Item.of("cmi:sculk_mechanism"),
		INC: Item.of("cmi:incomplete_sculk_mechanism")
	}),
	// C4
	THERMAL: Object.freeze({
		COM: Item.of("cmi:thermal_mechanism"),
		INC: Item.of("cmi:incomplete_thermal_mechanism"),
		AUG: Item.of("cmi:thermal_mechanism_augment")
	}),
	LIGHT: Object.freeze({
		COM: Item.of("cmi:light_engineering_mechanism"),
		INC: Item.of("cmi:incomplete_light_engineering_mechanism"),
		AUG: Item.of("cmi:light_engineering_mechanism_augment")
	}),
	SMART: Object.freeze({
		COM: Item.of("cmi:smart_mechanism"),
		INC: Item.of("cmi:incomplete_smart_mechanism"),
		AUG: Item.of("cmi:smart_mechanism_augment")
	}),
	GOLD: Object.freeze({
		COM: Item.of("cmi:gold_mechanism"),
		INC: Item.of("cmi:incomplete_gold_mechanism"),
		AUG: Item.of("thermal:rf_coil")
	}),
	// C5
	REINFORCED: Object.freeze({
		COM: Item.of("cmi:reinforced_mechanism"),
		INC: Item.of("cmi:incomplete_reinforced_mechanism"),
		AUG: Item.of("cmi:reinforced_mechanism_augment")
	}),
	HEAVY: Object.freeze({
		COM: Item.of("cmi:heavy_engineering_mechanism"),
		INC: Item.of("cmi:incomplete_heavy_engineering_mechanism"),
		AUG: Item.of("cmi:heavy_engineering_mechanism_augment")
	}),
	ENDER: Object.freeze({
		COM: Item.of("cmi:ender_mechanism"),
		INC: Item.of("cmi:incomplete_ender_mechanism"),
		BAS: Item.of("cmi:ender_mechanism_basement")
	}),
	COBALT: Object.freeze({
		COM: Item.of("cmi:cobalt_mechanism"),
		INC: Item.of("cmi:incomplete_cobalt_mechanism"),
		AUG: Item.of("cmi:glowstone_lumen_tube")
	}),
	// C6
	BASIC: Object.freeze({
		COM: Item.of("cmi:basic_mekanism_mechanism"),
		INC: Item.of("cmi:incomplete_basic_mekanism_mechanism"),
		BAS: Item.of("cmi:basic_mekanism_mechanism_basement")
	}),
	COMPUTE: Object.freeze({
		COM: Item.of("cmi:computing_mechanism"),
		INC: Item.of("cmi:incomplete_computing_mechanism"),
		BAS: Item.of("cmi:computing_mechanism_basement")
	}),
	// C7
	ADVANCED: Object.freeze({
		COM: Item.of("cmi:advanced_mekanism_mechanism"),
		INC: Item.of("cmi:incomplete_advanced_mekanism_mechanism"),
		BAS: Item.of("cmi:advanced_mekanism_mechanism_basement")
	}),
	AIR: Object.freeze({
		COM: Item.of("cmi:air_tight_mechanism"),
		INC: Item.of("cmi:incomplete_air_tight_mechanism"),
		BAS: Item.of("cmi:air_tight_mechanism_basement")
	}),
	AERO: Object.freeze({
		COM: Item.of("cmi:aeronautic_mechanism"),
		INC: Item.of("cmi:incomplete_aeronautic_mechanism"),
		BAS: Item.of("cmi:aeronautic_mechanism_basement")
	}),
	// C8
	ELITE: Object.freeze({
		COM: Item.of("cmi:elite_mekanism_mechanism"),
		INC: Item.of("cmi:incomplete_elite_mekanism_mechanism"),
		BAS: Item.of("cmi:elite_mekanism_mechanism_basement")
	}),
	NUKE: Object.freeze({
		COM: Item.of("cmi:nuclear_mechanism"),
		INC: Item.of("cmi:incomplete_nuclear_mechanism"),
		BAS: Item.of("cmi:nuclear_mechanism_basement")
	}),
	ASTRO: Object.freeze({
		COM: Item.of("cmi:astronautic_mechanism"),
		INC: Item.of("cmi:incomplete_astronautic_mechanism"),
		BAS: Item.of("cmi:astronautic_mechanism_basement")
	}),
	// C9
	ULTIMATE: Object.freeze({
		COM: Item.of("cmi:ultimate_mekanism_mechanism"),
		INC: Item.of("cmi:incomplete_ultimate_mekanism_mechanism"),
		BAS: Item.of("cmi:ultimate_mekanism_mechanism_basement")
	}),
	ANTI: Object.freeze({
		COM: Item.of("cmi:antimatter_mechanism"),
		INC: Item.of("cmi:incomplete_antimatter_mechanism"),
		BAS: Item.of("cmi:antimatter_mechanism_basement")
	}),
	PART: Object.freeze({
		BASIC: Item.of("cmi:basic_mechanism_part"),
		MAGIC: Item.of("cmi:magical_mechanism_part"),
		MECHA: Item.of("cmi:mechanical_mechanism_part"),
		ENGIN: Item.of("cmi:engineering_mechanism_part"),
		FLUX: Item.of("cmi:flux_mechanism_part"),
		GENERAL: Item.of("cmi:mekanism_mechanism_part"),
		SPACE: Item.of("cmi:space_mechanism_part"),
		QUANTUM: Item.of("cmi:quantum_mechanism_part")
	})
})

let Material = Object.freeze({
	Incomplete: Object.freeze({
		Circuit: Object.freeze({
			ADVANCED: Item.of("cmi:incomplete_advanced_control_circuit"),
			ELITE: Item.of("cmi:incomplete_elite_control_circuit"),
			ULTIMATE: Item.of("cmi:incomplete_ultimate_cotrol_circuit"),
			LOGIC: Item.of("cmi:incomplete_logic_processor"),
			CALCULATION: Item.of("cmi:incomplete_calculation_processor"),
			ENGINEERING: Item.of("cmi:incomplete_engineering_processor"),
			SUPERCONDUCTING: Item.of("cmi:incomplete_quantum_processor")
		})
	})
})

// 处理器
let Print = Object.freeze({
	LOGIC: "ae2:printed_logic_processor",
	CALCULATION: "ae2:printed_calculation_processor",
	ENGINEERING: "ae2:printed_engineering_processor",
	CONCURRENT: "cmi:printed_concurrent_processor",
	SUPERCONDUCTING: "neoecoae:superconducting_processor_print"
})

let Processor = Object.freeze({
	CONTROL: "create_connected:control_chip",
	LOGIC: "ae2:logic_processor",
	CALCULATION: "ae2:calculation_processor",
	ENGINEERING: "ae2:engineering_processor",
	CONCURRENT: "cmi:concurrent_processor",
	SUPERCONDUCTING: "neoecoae:superconducting_processor"
})

// 机壳系列
let Casing = Object.freeze({
	ANDESITE: "create:andesite_casing",
	COPPER: "create:copper_casing",
	BRONZE: "cmi:bronze_casing",
	BRASS: "create:brass_casing",
	RAILWAY: "create:railway_casing",
	INDUSTRY: "cmi:industrial_frame",
	IRON: "cmi:iron_casing",
	STEEL: "cmi:steel_casing",
	SMART: "cmi:smart_casing",
	THERMAL: "thermal:machine_frame",
	COMPUTE: "cmi:computing_casing",
	STAINLESS_STEEL: "mekanism:steel_casing",
	ALUMINUM_ALLOY: "neoecoae:aluminum_alloy_casing",
	BLACK_TUNGSTEN: "neoecoae:black_tungsten_alloy_casing"
})

// 木材系列
let Wood = Object.freeze({
	OAK: Object.freeze({
		NAME: "oak",
		SAPLING: "minecraft:oak_sapling",
		LEAVE: "minecraft:oak_leaves",
		LOG: "minecraft:oak_log",
		STRIPPED_LOG: "minecraft:stripped_oak_log",
		WOOD: "minecraft:oak_wood",
		STRIPPED_WOOD: "minecraft:stripped_oak_wood",
		PLANKS: "minecraft:oak_planks"
	}),
	SPRUCE: Object.freeze({
		NAME: "spruce",
		SAPLING: "minecraft:spruce_sapling",
		LEAVE: "minecraft:spruce_leaves",
		LOG: "minecraft:spruce_log",
		STRIPPED_LOG: "minecraft:stripped_spruce_log",
		WOOD: "minecraft:spruce_wood",
		STRIPPED_WOOD: "minecraft:stripped_spruce_wood",
		PLANKS: "minecraft:spruce_planks"
	}),
	BIRCH: Object.freeze({
		NAME: "birch",
		SAPLING: "minecraft:birch_sapling",
		LEAVE: "minecraft:birch_leaves",
		LOG: "minecraft:birch_log",
		STRIPPED_LOG: "minecraft:stripped_birch_log",
		WOOD: "minecraft:birch_wood",
		STRIPPED_WOOD: "minecraft:stripped_birch_wood",
		PLANKS: "minecraft:birch_planks"
	}),
	JUNGLE: Object.freeze({
		NAME: "jungle",
		SAPLING: "minecraft:jungle_sapling",
		LEAVE: "minecraft:jungle_leaves",
		LOG: "minecraft:jungle_log",
		STRIPPED_LOG: "minecraft:stripped_jungle_log",
		WOOD: "minecraft:jungle_wood",
		STRIPPED_WOOD: "minecraft:stripped_jungle_wood",
		PLANKS: "minecraft:jungle_planks"
	}),
	ACACIA: Object.freeze({
		NAME: "acacia",
		SAPLING: "minecraft:acacia_sapling",
		LEAVE: "minecraft:acacia_leaves",
		LOG: "minecraft:acacia_log",
		STRIPPED_LOG: "minecraft:stripped_acacia_log",
		WOOD: "minecraft:acacia_wood",
		STRIPPED_WOOD: "minecraft:stripped_acacia_wood",
		PLANKS: "minecraft:acacia_planks"
	}),
	DARK_OAK: Object.freeze({
		NAME: "dark_oak",
		SAPLING: "minecraft:dark_oak_sapling",
		LEAVE: "minecraft:dark_oak_leaves",
		LOG: "minecraft:dark_oak_log",
		STRIPPED_LOG: "minecraft:stripped_dark_oak_log",
		WOOD: "minecraft:dark_oak_wood",
		STRIPPED_WOOD: "minecraft:stripped_dark_oak_wood",
		PLANKS: "minecraft:dark_oak_planks"
	}),
	MANGROVE: Object.freeze({
		NAME: "mangrove",
		SAPLING: "minecraft:mangrove_propagule",
		LEAVE: "minecraft:mangrove_leaves",
		LOG: "minecraft:mangrove_log",
		STRIPPED_LOG: "minecraft:stripped_mangrove_log",
		WOOD: "minecraft:mangrove_wood",
		STRIPPED_WOOD: "minecraft:stripped_mangrove_wood",
		PLANKS: "minecraft:mangrove_planks"
	}),
	CHERRY: Object.freeze({
		NAME: "cherry",
		SAPLING: "minecraft:cherry_sapling",
		LEAVE: "minecraft:cherry_leaves",
		LOG: "minecraft:cherry_log",
		STRIPPED_LOG: "minecraft:stripped_cherry_log",
		WOOD: "minecraft:cherry_wood",
		STRIPPED_WOOD: "minecraft:stripped_cherry_wood",
		PLANKS: "minecraft:cherry_planks"
	}),
	CRIMSON: Object.freeze({
		NAME: "crimson",
		SAPLING: "minecraft:crimson_fungus",
		LEAVE: "minecraft:nether_wart_block",
		LOG: "minecraft:crimson_stem",
		STRIPPED_LOG: "minecraft:stripped_crimson_stem",
		WOOD: "minecraft:crimson_hyphae",
		STRIPPED_WOOD: "minecraft:stripped_crimson_hyphae",
		PLANKS: "minecraft:crimson_planks"
	}),
	WARPED: Object.freeze({
		NAME: "warped",
		SAPLING: "minecraft:warped_fungus",
		LEAVE: "minecraft:warped_wart_block",
		LOG: "minecraft:warped_stem",
		STRIPPED_LOG: "minecraft:stripped_warped_stem",
		WOOD: "minecraft:warped_hyphae",
		STRIPPED_WOOD: "minecraft:stripped_warped_hyphae",
		PLANKS: "minecraft:warped_planks"
	}),
	RUBBERWOOD: Object.freeze({
		NAME: "rubberwood",
		SAPLING: "thermal:rubberwood_sapling",
		LEAVE: "thermal:rubberwood_leaves",
		LOG: "thermal:rubberwood_log",
		STRIPPED_LOG: "thermal:stripped_rubberwood_log",
		WOOD: "thermal:rubberwood_wood",
		STRIPPED_WOOD: "thermal:stripped_rubberwood_wood",
		PLANKS: "thermal:rubberwood_planks"
	}),
	GREENHEART: Object.freeze({
		NAME: "greenheart",
		SAPLING: "tconstruct:earth_slime_sapling",
		LEAVE: "tconstruct:earth_slime_leaves",
		LOG: "tconstruct:greenheart_log",
		STRIPPED_LOG: "tconstruct:stripped_greenheart_log",
		WOOD: "tconstruct:greenheart_wood",
		STRIPPED_WOOD: "tconstruct:stripped_greenheart_wood",
		PLANKS: "tconstruct:greenheart_planks"
	}),
	SKYROOT: Object.freeze({
		NAME: "skyroot",
		SAPLING: "tconstruct:sky_slime_sapling",
		LEAVE: "tconstruct:sky_slime_leaves",
		LOG: "tconstruct:skyroot_log",
		STRIPPED_LOG: "tconstruct:stripped_skyroot_log",
		WOOD: "tconstruct:skyroot_wood",
		STRIPPED_WOOD: "tconstruct:stripped_skyroot_wood",
		PLANKS: "tconstruct:skyroot_planks"
	}),
	ENDERBARK: Object.freeze({
		NAME: "enderbark",
		SAPLING: "tconstruct:ender_slime_sapling",
		LEAVE: "tconstruct:ender_slime_leaves",
		LOG: "tconstruct:enderbark_log",
		STRIPPED_LOG: "tconstruct:stripped_enderbark_log",
		WOOD: "tconstruct:enderbark_wood",
		STRIPPED_WOOD: "tconstruct:stripped_enderbark_wood",
		PLANKS: "tconstruct:enderbark_planks"
	})
})

let CDGMolds = Object.freeze({
	CDG: Object.freeze({
		BOWL: "createdieselgenerators:bowl",
		LINES: "createdieselgenerators:lines",
		CHAIN: "createdieselgenerators:chain",
		BAR: "createdieselgenerators:bar",
	}),
	CMI: Object.freeze({
		PLATE: "cmi:plate",
	})
})

let WoodMaterials = [
	Wood.OAK,
	Wood.SPRUCE,
	Wood.BIRCH,
	Wood.JUNGLE,
	Wood.ACACIA,
	Wood.DARK_OAK,
	Wood.MANGROVE,
	Wood.CHERRY,
	Wood.RUBBERWOOD,
	Wood.GREENHEART,
	Wood.SKYROOT,
	Wood.ENDERBARK
]
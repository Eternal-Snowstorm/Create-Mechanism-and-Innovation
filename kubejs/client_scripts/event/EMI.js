// ClientEvents.highPriorityAssets((event) => {
// 	addEmiRecipeFilter("remove_steel", {
// 		id: "/jei:/cmi/immersiveengineering/blast_furnace/steel_ingot/"
// 	})

// 	addEmiRecipeFilter("grinding", {
// 		category: "vintageimprovements:grinder_sandpaper_polishing"
// 	})

// 	addEmiAddingRecipe("polished_quartz_prism_from_world", {
// 		"type": "emi:world_interaction",
// 		"left": "#item:forge:gems/quartz",
// 		"right": "#item:forge:deepslate",
// 		"output": [
// 			"item:cmi:polished_quartz_prism",
// 			"item:thermal:quartz_dust"
// 		]
// 	})

// 	/**
// 	 * @param {string} path
// 	 * @param {Internal.JsonElement_} filter
// 	 * 具体请看 {@link https://github.com/emilyploszaj/emi/wiki/Recipe-Filters EMI Recipe Filters Wiki}
// 	 */
// 	function addEmiRecipeFilter(path, filter) {
// 		event.add(loadEmi(`recipe/filters/${path}`), {
// 			filters: [filter]
// 		})
// 	}

// 	/**
// 	 * 
// 	 * @param {string} path 
// 	 * @param {Internal.JsonElement_} json
// 	 * 具体请看 {@link https://github.com/emilyploszaj/emi/wiki/Adding-Recipes EMI Adding Recipes Wiki}
// 	 */
// 	function addEmiAddingRecipe(path, json) {
// 		event.add(loadEmi(`recipe/additions/${path}`), json)
// 	}
// })

// EmiPlusPlusEvents.registerGroups((event) => {
// 	addGroup("forge:storage_blocks", "#forge:storage_blocks")
// 	addGroup("forge:dusts", "#forge:dusts")
// 	addGroup("forge:ingots", "#forge:ingots")
// 	addGroup("forge:nuggets", "#forge:nuggets")
// 	addGroup("forge:plates", "#forge:plates")
// 	addGroup("forge:rods", "#forge:rods")
// 	addGroup("forge:wires", "#forge:wires")
// 	addGroup("forge:gears", "#forge:gears")
// 	addGroup("forge:raw_materials", "#forge:raw_materials")
// 	addGroup("forge:gems", "#forge:gems")
// 	addGroup("forge:ores", "#forge:ores")

// 	addGroup("create:crushed_raw_materials", "#create:crushed_raw_materials")

// 	addGroup("mekanism:dirty_dusts", "#mekanism:dirty_dusts")
// 	addGroup("mekanism:clumps", "#mekanism:clumps")
// 	addGroup("mekanism:shards", "#mekanism:shards")
// 	addGroup("mekanism:crystals", "#mekanism:crystals")

// 	addGroup("vintageimprovements:springs", "#vintageimprovements:springs")
// 	addGroup("vintageimprovements:small_springs", "#vintageimprovements:small_springs")

// 	addGroup("forge:armors", "#forge:armors")
// 	addGroup("forge:tools", "#forge:tools")

// 	addGroup("forge:dyes", "#forge:dyes")

// 	addGroup("create:mechanisms", "#create:mechanisms")
// 	addGroup("create:incomplete_mechanisms", "#create:incomplete_mechanisms")
// 	addGroup("cmi:mechanism_flash_drives", "#cmi:mechanism_flash_drives")
// 	addGroup("cmi:block/machine_block", "#cmi:block/machine_block")

// 	addGroup("forge:glass", "#forge:glass")
// 	addGroup("forge:glass_panes", "#forge:glass_panes")

// 	addGroup("minecraft:shulker_boxes", "#minecraft:shulker_boxes")

// 	addGroup("alexscaves:concrete", "#alexscaves:concrete")
// 	addGroup("mekanism:colorable/concrete_powder", "#mekanism:colorable/concrete_powder")

// 	addGroup("functionalstorage:drawer", "#functionalstorage:drawer")

// 	addGroup("railways:long_stack", "#railways:long_stack")
// 	addGroup("railways:coalburner_stack", "#railways:coalburner_stack")
// 	addGroup("railways:woodburner_stack", "#railways:woodburner_stack")
// 	addGroup("railways:oilburner_stack", "#railways:oilburner_stack")
// 	addGroup("railways:streamlined_stack", "#railways:streamlined_stack")

// 	addGroup("tconstruct:casts", "#tconstruct:casts")

// 	addGroup("tconstruct:staff", [
// 		"tconstruct:sky_staff",
// 		"tconstruct:earth_staff",
// 		"tconstruct:ichor_staff",
// 		"tconstruct:ender_staff",
// 	])

// 	let tcon = [
// 		"tconstruct:pick_head",
// 		"tconstruct:tool_binding",
// 		"tconstruct:tough_handle",
// 		"tconstruct:repair_kit",
// 		"tconstruct:small_axe_head",
// 		"tconstruct:small_blade",
// 		"tconstruct:adze_head",
// 		"tconstruct:hammer_head",
// 		"tconstruct:broad_axe_head",
// 		"tconstruct:broad_blade",
// 		"tconstruct:large_plate",
// 		"tconstruct:tool_handle",
// 		"tconstruct:arrow_head",
// 		"tconstruct:arrow_shaft",
// 		"tconstruct:tough_binding",
// 		"tconstruct:bow_limb",
// 		"tconstruct:bow_grip",
// 		"tconstruct:bowstring",
// 		"tconstruct:fletching",
// 		"tconstruct:helmet_plating",
// 		"tconstruct:chestplate_plating",
// 		"tconstruct:leggings_plating",
// 		"tconstruct:boots_plating",
// 		"tconstruct:maille",
// 		"tconstruct:shield_core",
// 		"tconstruct:modifier_crystal",

// 		"tconstruct:smeltery_controller",
// 		"tconstruct:seared_drain",
// 		"tconstruct:seared_duct",
// 		"tconstruct:seared_chute",
// 		"tconstruct:foundry_controller",
// 		"tconstruct:scorched_drain",
// 		"tconstruct:scorched_duct",
// 		"tconstruct:scorched_chute",

// 		"tconstruct:pickaxe",
// 		"tconstruct:pickadze",
// 		"tconstruct:mattock",
// 		"tconstruct:hand_axe",
// 		"tconstruct:kama",
// 		"tconstruct:dagger",
// 		"tconstruct:sword",
// 		"tconstruct:sledge_hammer",
// 		"tconstruct:vein_hammer",
// 		"tconstruct:excavator",
// 		"tconstruct:broad_axe",
// 		"tconstruct:cleaver",
// 		"tconstruct:crossbow",
// 		"tconstruct:longbow",
// 		"tconstruct:fishing_rod",
// 		"tconstruct:javelin",
// 		"tconstruct:arrow",
// 		"tconstruct:shuriken",
// 		"tconstruct:throwing_axe",
// 		"tconstruct:melting_pan",
// 		"tconstruct:war_pick",
// 		"tconstruct:swasher",
// 		"tconstruct:travelers_helmet",
// 		"tconstruct:travelers_chestplate",
// 		"tconstruct:travelers_leggings",
// 		"tconstruct:travelers_boots",
// 		"tconstruct:travelers_shield",
// 		"tconstruct:plate_helmet",
// 		"tconstruct:plate_chestplate",
// 		"tconstruct:plate_leggings",
// 		"tconstruct:plate_boots",
// 		"tconstruct:battlesign",
// 		"tconstruct:plate_shield",
// 		"tconstruct:slime_helmet",
// 	]
// 	tcon.forEach((part) => {
// 		addGroup(part, part)
// 	})

// 	/**
// 	 * 
// 	 * @param {string} id 
// 	 * @param {Internal.Ingredient_} ingredient 
// 	 */
// 	function addGroup(id, ingredient) {
// 		event.register(id, ingredient)
// 	}
// })

// /**
//  * 
//  * @param {string} path 
//  * @returns 
//  */
// function loadEmi(path) {
// 	return ResourceLocation.fromNamespaceAndPath("emi", path)
// }
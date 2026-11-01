ServerEvents.highPriorityData((event) => {
	// 农作物箱
	addUnification("carrot_crate", [
		"#forge:storage_blocks/carrot"
	], "farmersdelight:carrot_crate")

	addUnification("potato_crate", [
		"#forge:storage_blocks/potato"
	], "farmersdelight:potato_crate")

	addUnification("beetroot_crate", [
		"#forge:storage_blocks/beetroot"
	], "farmersdelight:beetroot_crate")

	addUnification("onion_crate", [
		"thermal:onion_block"
	], "farmersdelight:onion_crate")

	addUnification("rice_bag", [
		"thermal:rice_block"
	], "farmersdelight:rice_bag")

	addUnification("tomato_crate", [
		"thermal:tomato_block"
	], "farmersdelight:tomato_crate")

	addUnification("straw_bale", [
		"#forge:storage_blocks/rice_panicle"
	], "kaleidoscope_cookery:straw_block")

	// 虚设蜂箱漏斗
	addUnification("dummy_hive_hopper_base", [
		"cmi:dummy_hive_hopper_base"
	], "thermal:device_hive_extractor")

	addUnification("dummy_hive_hopper_beehive", [
		"cmi:dummy_hive_hopper_beehive"
	], "minecraft:beehive")

	addUnification("dummy_hive_hopper_bee_nest", [
		"cmi:dummy_hive_hopper_bee_nest"
	], "minecraft:bee_nest")

	// 矿石方块
	addUnification("uranium_ore", [
		"#forge:ores/uranium"
	], "alexscaves:radrock_uranium_ore")

	addUnification("lead_ore", [
		"thermal:lead_ore",
		"mekanism:lead_ore",
		"immersiveengineering:ore_lead"
	], "thermal:lead_ore")

	addUnification("deepslate_lead_ore", [
		"thermal:deepslate_lead_ore",
		"mekanism:deepslate_lead_ore",
		"immersiveengineering:deepslate_ore_lead"
	], "thermal:deepslate_lead_ore")

	addUnification("nickel_ore", [
		"thermal:nickel_ore",
		"immersiveengineering:ore_nickel"
	], "thermal:nickel_ore")

	addUnification("deepslate_nickel_ore", [
		"thermal:deepslate_nickel_ore",
		"immersiveengineering:deepslate_ore_nickel"
	], "thermal:deepslate_nickel_ore")

	addUnification("silver_ore", [
		"thermal:silver_ore",
		"immersiveengineering:ore_silver"
	], "thermal:silver_ore")

	addUnification("deepslate_silver_ore", [
		"thermal:deepslate_silver_ore",
		"immersiveengineering:deepslate_ore_silver"
	], "thermal:deepslate_silver_ore")

	addUnification("tin_ore", [
		"thermal:tin_ore",
		"mekanism:tin_ore"
	], "thermal:tin_ore")

	addUnification("deepslate_tin_ore", [
		"thermal:deepslate_tin_ore",
		"mekanism:deepslate_tin_ore"
	], "thermal:deepslate_tin_ore")

	addUnification("steel_cluster", [
		"tconstruct:steel_cluster"
	], "minecraft:air")

	// 工作站
	addUnification("crafting_station", [
		"tconstruct:crafting_station"
	], "craftingstationjei:crafting_station")

	// 流体舱口
	addUnification("fluid_hatch", [
		"create_dragons_plus:fluid_hatch"
	], "fluidlogistics:fluid_hatch")

	// 煤炭矿藏
	addUnification("coal_deposit", [
		"cmi:coal_deposit_block"
	], "create_rns:coal_deposit_block")

	// 线圈
	addUnification("copper_coil", [
		"immersiveengineering:coil_lv"
	], "cmi:copper_coil")

	addUnification("electrum_coil", [
		"immersiveengineering:coil_mv"
	], "cmi:electrum_coil")

	addUnification("steel_coil", [
		"immersiveengineering:coil_hv"
	], "cmi:steel_coil")

	// 工作盆
	addUnification("advanced_basin", [
		"fluidlogistics:copper_basin"
	], "steam_letters:bronze_basin")

	/**
	 * 
	 * @param {string} name 
	 * @param {Special.Block | Special.BlockTags | (Special.Block | Special.BlockTags)[]} blocks 
	 * @param {Special.Block} result 
	 */
	function addUnification(name, blocks, result) {
		if (blocks === null) {
			console.error(`Blocks ${blocks} cannot be null`)
			return
		}

		if (result === null) {
			console.error(`Result ${result} cannot be null`)
			return
		}

		let itemUnification = [
			{
				matchItems: blocks,
				resultItems: result
			}
		]

		event.addJson(`oei:replacements/${name}.json`, itemUnification)
	}
})
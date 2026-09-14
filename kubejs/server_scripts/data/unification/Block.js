ServerEvents.highPriorityData((event) => {
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

	addUnification("carrot_crate", [
		"#forge:storage_blocks/carrot",
	], "farmersdelight:carrot_crate")

	addUnification("potato_crate", [
		"#forge:storage_blocks/potato",
	], "farmersdelight:potato_crate")

	addUnification("beetroot_crate", [
		"#forge:storage_blocks/beetroot",
	], "farmersdelight:beetroot_crate")

	addUnification("straw_bale", [
		"#forge:storage_blocks/rice_panicle"
	], "kaleidoscope_cookery:straw_block")

	addUnification("crafting_station", [
		"tconstruct:crafting_station"
	], "craftingstationjei:crafting_station")

	addUnification("fluid_hatch", [
		"create_dragons_plus:fluid_hatch"
	], "fluidlogistics:fluid_hatch")

	addUnification("coal_deposit", [
		"cmi:coal_deposit_block"
	], "create_rns:coal_deposit_block")

	function addUnification(name, match, block) {
		let itemUnification = {
			matchItems: match,
			resultItems: block
		}
		event.addJson(`oei:replacements/${name}.json`, itemUnification)
		return this
	}
})
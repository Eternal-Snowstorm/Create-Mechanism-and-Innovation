ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	addCrushedSplashing("iron", "minecraft:redstone")
	addCrushedSplashing("gold", "thermal:cinnabar_dust")
	addCrushedSplashing("copper", "minecraft:clay_ball")
	addCrushedSplashing("zinc", "thermal:niter_dust")
	addCrushedSplashing("osmium", "mekanism:dust_fluorite")
	addCrushedSplashing("platinum", "cmi:end_stone_dust")
	addCrushedSplashing("silver", "cmi:sludge_extract")
	addCrushedSplashing("tin", "thermal:apatite_dust")
	addCrushedSplashing("lead", "minecraft:sugar")
	addCrushedSplashing("uranium", "immersiveengineering:dust_sulfur")
	addCrushedSplashing("nickel", "cmi:oil_shale_dust")
	addCrushedSplashing("cobalt", "thermal_extra:soul_sand_dust")
	addCrushedSplashing("vanadium", "thermal_extra:amethyst_dust")
	addCrushedSplashing("chromium", "thermal:ruby_dust")
	addCrushedSplashing("etrium", "ae2:certus_quartz_dust")
	addCrushedSplashing("tungsten", "cmi:lime_dust")
	addCrushedSplashing("ardite", "minecraft:glowstone_dust")
	addCrushedSplashing("aluminum", "thermal:sapphire_dust")

	function addCrushedSplashing(material, product) {
		let crushed = `#create:crushed_raw_materials/${material}`
		let dust = Ingredient.of(`#mekanism:dirty_dusts/${material}`).getItemIds()

		return create.splashing([
			Item.of(dust[0], 1),
			Item.of(product).withChance(0.25)
		], crushed)
	}
})
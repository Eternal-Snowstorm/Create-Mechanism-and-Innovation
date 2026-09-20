BlockEvents.modification((event) => {
	modifySoundType("mekanism:cardboard_box", SoundType.NETHERITE_BLOCK)

	modifySoundType([
		"immersiveengineering:coke_oven",
		"immersiveengineering:blast_furnace"
	], SoundType.DEEPSLATE_BRICKS)

	modifySoundType("treetap:tap", SoundType.WOOD)

	modifySoundType("vintageimprovements:vacuum_chamber", SoundType.COPPER)

	let materialSoundType = [
		"bronze",
		"cast_iron",
		"steel"
	]
	materialSoundType.forEach((materials) => {
		modifySoundType([
			`steampowered:${materials}_cogwheel`,
			`steampowered:${materials}_large_cogwheel`,
			`steampowered:${materials}_burner`,
			`steampowered:${materials}_boiler`,
			`steampowered:${materials}_steam_engine`,
			`steampowered:${materials}_flywheel`
		], SoundType.LANTERN)
	})

	// 矿藏
	let depositBlocks = [
		"create_rns:gold_deposit_block",
		"create_rns:zinc_deposit_block",
		"create_rns:copper_deposit_block",
		"create_rns:iron_deposit_block",
		"cmi:oil_shale_deposit_block",
		"cmi:coal_deposit_block",
		"cmi:cheese_deposit_block",
		"cmi:platinum_deposit_block",
		"cmi:vanadium_deposit_block",
		"cmi:aluminum_deposit_block",
		"create_rns:depleted_deposit_block",
		"create_rns:cobalt_deposit_block",
		"create_rns:quartz_deposit_block",
		"create_rns:uranium_deposit_block",
		"create_rns:silver_deposit_block",
		"create_rns:nickel_deposit_block",
		"create_rns:lead_deposit_block",
		"create_rns:tin_deposit_block",
		"create_rns:redstone_deposit_block"
	]
	depositBlocks.forEach((block) => {
		event.modify(block, (modify) => {
			modify.setDestroySpeed(-1)
			modify.setExplosionResistance(3600000)
		})
	})

	/**
	 * 
	 * @param {BlockStatePredicate_|BlockStatePredicate_[]} block 
	 * @param {SoundType_} sound 
	 */
	function modifySoundType(block, sound) {
		let ofArray = (block instanceof Array ? block : [block])
		ofArray.forEach((predicate) => {
			event.modify(predicate, (modify) => {
				modify.setSoundType(sound)
			})
		})
	}
})
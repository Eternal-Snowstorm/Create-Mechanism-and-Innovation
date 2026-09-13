JEIEvents.hideItems((event) => {
	/**
	 * 
	 * @param {Internal.Ingredient_} item 
	 */
	function hideItemFromJEI(item) {
		event.hide(item)
	}

	hideItemFromJEI("#cmi:io_debug_block")
	hideItemFromJEI("ae2:facade")
	hideItemFromJEI("cmi:parchment")
	hideItemFromJEI("cmi:torn_parchment_a")
	hideItemFromJEI("cmi:torn_parchment_b")
	hideItemFromJEI("vintageimprovements:belt_grinder")
	hideItemFromJEI("torcherino:torcherino")
	hideItemFromJEI("torcherino:lanterino")
	hideItemFromJEI("torcherino:lantern")
	hideItemFromJEI("torcherino:compressed_torcherino")
	hideItemFromJEI("torcherino:compressed_lanterino")
	hideItemFromJEI("torcherino:compressed_lantern")
	hideItemFromJEI("torcherino:double_compressed_torcherino")
	hideItemFromJEI("torcherino:double_compressed_lanterino")
	hideItemFromJEI("torcherino:double_compressed_lantern")
	hideItemFromJEI("@pipez_optimizer")
	hideItemFromJEI("steampowered:brass_flywheel")
	hideItemFromJEI("steampowered:furnace_engine")
})
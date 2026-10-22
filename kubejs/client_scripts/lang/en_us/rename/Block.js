ClientEvents.lang("en_us", (event) => {
	renameBlock("create:copper_backtank", "Bronze Backtank")
	renameBlock("create:netherite_backtank", "Steel Backtank")
	renameBlock("create_jetpack:jetpack", "Brass Jetpack")
	renameBlock("create_jetpack:netherite_jetpack", "Steel Jetpack")
	renameBlock("steam_letters:bronze_basin", "Copper Basin")

	/**
	 * 
	 * @param {Internal.Block_} block 
	 * @param {string} name 
	 */
	function renameBlock(block, name) {
		event.renameBlock(block, name)
	}
})
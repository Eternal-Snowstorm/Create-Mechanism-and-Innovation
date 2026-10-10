ClientEvents.lang("zh_cn", (event) => {
	renameBlock("create:copper_backtank", "青铜背罐")
	renameBlock("create:netherite_backtank", "钢制背罐")
	renameBlock("create_jetpack:jetpack", "黄铜喷气背包")
	renameBlock("create_jetpack:netherite_jetpack", "钢制喷气背包")

	/**
	 * 
	 * @param {Internal.Block_} block 
	 * @param {string} name 
	 */
	function renameBlock(block, name) {
		event.renameBlock(block, name)
		event.renameItem(block, name)
	}
})
ClientEvents.lang("zh_cn", (event) => {
	renameBlock("create:copper_backtank", "青铜背罐")
	renameBlock("create:netherite_backtank", "钢制背罐")
	renameBlock("create_jetpack:jetpack", "黄铜喷气背包")
	renameBlock("create_jetpack:netherite_jetpack", "钢制喷气背包")
	renameBlock("steam_letters:bronze_basin", "铜工作盆")

	renameBlock("ad_astra:desh_fluid_pipe", "黄铜流体管道")
	renameBlock("ad_astra:ostrum_fluid_pipe", "铸铁流体管道")
	renameBlock("ad_astra:steel_cable", "铜电缆")
	renameBlock("ad_astra:desh_cable", "琥珀金电缆")

	/**
	 * 
	 * @param {Internal.Block_} block 
	 * @param {string} name 
	 */
	function renameBlock(block, name) {
		event.renameBlock(block, name)
	}
})
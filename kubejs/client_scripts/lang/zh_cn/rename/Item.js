// ignored: true
ClientEvents.lang("zh_cn", (event) => {
	renameItem("create:brass_hand", "橡胶手部零件")

	/**
	 * 
	 * @param {Internal.ItemStack_} item 
	 * @param {string} name 
	 */
	function renameItem(item, name) {
		event.renameItem(item, name)
	}
})
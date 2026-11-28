ClientEvents.lang("en_us", (event) => {
	renameItem("create:brass_hand", "Rubber Hand")

	/**
	 * 
	 * @param {Internal.ItemStack_} item 
	 * @param {string} name 
	 */
	function renameItem(item, name) {
		event.renameItem(item, name)
	}
})
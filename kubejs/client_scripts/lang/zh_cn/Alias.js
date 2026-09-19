ClientEvents.lang("zh_cn", (event) => {
	addAliasLang("cardboard_box", "纸箱")

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addAliasLang(key, name) {
		event.add(`alias.${Cmi.MODID}.${key}`, name)
	}
})
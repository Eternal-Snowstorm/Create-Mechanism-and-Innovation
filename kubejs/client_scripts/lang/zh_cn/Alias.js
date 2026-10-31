ClientEvents.lang("zh_cn", (event) => {
	addAliasLang("cardboard_box", "纸箱")
	addAliasLang("fluid_transporter.1", "流体溜槽")
	addAliasLang("fluid_transporter.2", "铜溜槽")
	addAliasLang("salts", "盐巴")

	/**
	 * @param {string} key
	 * @param {string} name
	 */
	function addAliasLang(key, name) {
		event.add(`alias.${Cmi.MODID}.${key}`, name)
	}
})
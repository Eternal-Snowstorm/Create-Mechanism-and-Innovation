StartupEvents.registry("item", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addAloneWaferItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}_wafer`)

		builder.texture(Cmi.loadResource(`item/material/material/wafer/${name}`))
		builder.tag("forge:wafers")
		builder.tag(`forge:wafers/${name}`)

		return builder
	}

	// 锇晶圆
	addAloneWaferItem("osmium")

	// 硅晶圆
	addAloneWaferItem("silicon")

	// 锗晶圆
	addAloneWaferItem("germanium")

	// 恩特罗合金晶圆
	addAloneWaferItem("entro_alloy")
})
StartupEvents.registry("item", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @param {Color} color 
	 * @returns 
	 */
	function addColorRodItem(name, color) {
		let builder = event.create(`${Cmi.MODID}:${name}_rod`)

		builder.texture(Cmi.loadResource(`item/material/color/rod/rod`))
		builder.color(0, color)
		builder.tag("forge:rods")
		builder.tag(`forge:rods/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @param {string} type 
	 * @returns 
	 */
	function addNamedRodItem(name, type) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/rod/${type}`))
		builder.tag("forge:rods")
		builder.tag(`forge:rods/${type}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addAloneRodItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}_rod`)

		builder.texture(Cmi.loadResource(`item/material/material/rod/${name}`))
		builder.tag("forge:rods")
		builder.tag(`forge:rods/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addNonRodItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/rod/${name}`))

		return builder
	}

	addAloneRodItem("glass")
})
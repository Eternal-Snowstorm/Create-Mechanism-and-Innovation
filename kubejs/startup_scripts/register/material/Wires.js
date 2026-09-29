StartupEvents.registry("item", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @param {Color} color 
	 * @returns 
	 */
	function addColorWireItem(name, color) {
		let builder = event.create(`${Cmi.MODID}:${name}_wire`)

		builder.texture(Cmi.loadResource(`item/material/color/wire/wire`))
		builder.color(0, color)
		builder.tag("forge:wires")
		builder.tag(`forge:wires/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @param {string} type 
	 * @returns 
	 */
	function addNamedWireItem(name, type) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/wire/${type}`))
		builder.tag("forge:wires")
		builder.tag(`forge:wires/${type}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addAloneWireItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}_wire`)

		builder.texture(Cmi.loadResource(`item/material/material/wire/${name}`))
		builder.tag("forge:wires")
		builder.tag(`forge:wires/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addNonWireItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/wire/${name}`))

		return builder
	}

	addAloneWireItem("glass")
	addAloneWireItem("fluix")
})
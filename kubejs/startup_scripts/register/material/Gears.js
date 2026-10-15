StartupEvents.registry("item", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @param {Color} color 
	 * @returns 
	 */
	function addColorGearItem(name, color) {
		let builder = event.create(`${Cmi.MODID}:${name}_gear`)

		builder.texture(Cmi.loadResource(`item/material/color/gear/gear`))
		builder.color(0, color)
		builder.tag("forge:gears")
		builder.tag(`forge:gears/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @param {string} type 
	 * @returns 
	 */
	function addNamedGearItem(name, type) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/gear/${type}`))
		builder.tag("forge:gears")
		builder.tag(`forge:gears/${type}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addAloneGearItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}_gear`)

		builder.texture(Cmi.loadResource(`item/material/material/gear/${name}`))
		builder.tag("forge:gears")
		builder.tag(`forge:gears/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addNonGearItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/gear/${name}`))

		return builder
	}

	// 强化复合齿轮
	addAloneGearItem("composite_carbon_fiber")
})
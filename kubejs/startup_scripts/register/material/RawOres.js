StartupEvents.registry("item", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addAloneRawMaterial(name) {
		let builder = event.create(`${Cmi.MODID}:raw_${name}`)

		builder.texture(Cmi.loadResource(`item/material/raw/${name}`))
		builder.tag(`${Cmi.MODID}:raw_metals`)
		builder.tag("forge:raw_materials")
		builder.tag(`forge:raw_materials/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addAloneCrushedRawMaterial(name) {
		let builder = event.create(`${Cmi.MODID}:crushed_raw_${name}`)

		builder.texture(Cmi.loadResource(`item/material/crushed/${name}`))
		builder.tag(`${Cmi.MODID}:raw_metals`)
		builder.tag("create:crushed_raw_materials")
		builder.tag(`create:crushed_raw_materials/${name}`)

		return builder
	}

	addAloneRawMaterial("vanadium")
	addAloneRawMaterial("platinum")
	addAloneRawMaterial("chromium")
	addAloneRawMaterial("tungsten")
	addAloneRawMaterial("etrium")
	addAloneRawMaterial("titanium")
	addAloneRawMaterial("ardite")

	addAloneCrushedRawMaterial("ardite")
	addAloneCrushedRawMaterial("cobalt")
	addAloneCrushedRawMaterial("vanadium")
	addAloneCrushedRawMaterial("chromium")
	addAloneCrushedRawMaterial("etrium")
	addAloneCrushedRawMaterial("tungsten")
})
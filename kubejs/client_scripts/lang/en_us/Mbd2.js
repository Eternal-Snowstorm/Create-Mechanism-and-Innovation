ClientEvents.lang("en_us", (event) => {
	/**
	 * 
	 * @param {string} key 
	 * @param {string} value 
	 */
	function addMBDLang(key, value) {
		event.add(`block.${Cmi.MODID}.${key}`, value)

		event.add(`block.${Cmi.MODID}.${key}_input_bus`, `${value} Input Bus`)
		event.add(`block.${Cmi.MODID}.${key}_output_bus`, `${value} Output Bus`)

		event.add(`${Cmi.MODID}.${key}`, value)

		addIOerLang(key, "item", value, " Iten")
		addIOerLang(key, "fluid", value, " Fluid")
		addIOerLang(key, "energy", value, " Energy")
		addIOerLang(key, "gas", value, " Gas")
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} type 
	 * @param {string} value 
	 * @param {string} typeValue 
	 */
	function addIOerLang(key, type, value, typeValue) {
		event.add(`block.${Cmi.MODID}.${key}_${type}_input_bus`, `${value + typeValue} Input Bus`)
		event.add(`block.${Cmi.MODID}.${key}_${type}_output_bus`, `${value + typeValue} Output Bus`)
	}

	addMBDLang("reinforced_coke_oven", "Reinforced Coke Oven")
	addMBDLang("improved_rubber_extractor", "QM-0726 Improved Rubber Extractor")
	addMBDLang("chemical_reactor", "Chemical Reactor")
	addMBDLang("reinforced_chemical_reactor", "Reinforced Chemical Reactor")
	addMBDLang("electrolyzer", "Three-Phase Electrolyzer Machine")
	addMBDLang("electronic_blast_furnace", "Electronic Blast Furnace")
	addMBDLang("dimensionally_transcendent_mechanism_accelerator", "Dimensionally Transcendent Mechanism Accelerator(WIP)")
	addMBDLang("large_mixer", "Large Mixer")
	addMBDLang("radar_antenna", "Radar Antenna")
	addMBDLang("multi_type_driller", "Multi-Types Driller")
	addMBDLang("driller_cooler", "Multi-Types Driller Cooler")
	addMBDLang("dummy_hive_hopper_base", "Dummy Hive Hopper - Base")
	addMBDLang("dummy_hive_hopper_bee_nest", "Dummy Hive Hopper - Bee Nest")
	addMBDLang("dummy_hive_hopper_beehive", "Dummy Hive Hopper - Beehive")
	addMBDLang("seared", "Seared")
	addMBDLang("industrial_iron", "Industrial Iron")
	addMBDLang("steel", "Steel")
	addMBDLang("stainless_steel", "Stainless Steel")
	addMBDLang("air_tight", "Air Tight")
})
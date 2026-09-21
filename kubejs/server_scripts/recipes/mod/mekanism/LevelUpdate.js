ServerEvents.recipes(event => {
	/**
	 * 
	 * @param {string} name "mekanism:basic_smelting_factory"中的"smelting_factory"(工厂级起步)
	 * @param {Internal.Block_} lowestid 最低级的机器id(如"mekanism:energized_smelter", /kjs hand之后直接原封不动扔里面就行)
	 */
	function removeMekanismUpgrade(name, lowestid) {
		event.remove({
			output: `mekanism:basic_${name}`
		})
		event.remove({
			output: `mekanism:advanced_${name}`
		})
		event.remove({
			output: `mekanism:elite_${name}`
		})
		event.remove({
			output: `mekanism:ultimate_${name}`
		})
	}

	removeMekanismUpgrade("smelting_factory", "mekanism:energized_smelter")
	removeMekanismUpgrade("enriching_factory", "mekanism:enrichment_chamber")
	removeMekanismUpgrade("crushing_factory", "mekanism:crusher")
	removeMekanismUpgrade("compressing_factory", "mekanism:osmium_compressor")
	removeMekanismUpgrade("combining_factory", "mekanism:combiner")
	removeMekanismUpgrade("purifying_factory", "mekanism:purification_chamber")
	removeMekanismUpgrade("injecting_factory", "mekanism:chemical_injection_chamber")
	removeMekanismUpgrade("infusing_factory", "mekanism:metallurgic_infuser")
	removeMekanismUpgrade("sawing_factory", "mekanism:precision_sawmill")
	removeMekanismUpgrade("energy_cube", "immersiveengineering:capacitor_mv")
})
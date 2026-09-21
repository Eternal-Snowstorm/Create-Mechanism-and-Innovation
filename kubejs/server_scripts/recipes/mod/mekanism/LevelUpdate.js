ServerEvents.recipes(event => {
	let { kubejs } = event.getRecipes()

	// 举例, name就是"mekanism:basic_smelting_factory"中的"smelting_factory"(工厂级起步)
	// 而lowestid填最低级的机器id(如"mekanism:energized_smelter", /kjs hand之后直接原封不动扔里面就行)

	function RemoveMekUpgrade(name, lowestid) {
		event.remove({ output: `mekanism:basic_${name}` })
		event.remove({ output: `mekanism:advanced_${name}` })
		event.remove({ output: `mekanism:elite_${name}` })
		event.remove({ output: `mekanism:ultimate_${name}` })
	}

	RemoveMekUpgrade("smelting_factory", "mekanism:energized_smelter")
	RemoveMekUpgrade("enriching_factory", "mekanism:enrichment_chamber")
	RemoveMekUpgrade("crushing_factory", "mekanism:crusher")
	RemoveMekUpgrade("compressing_factory", "mekanism:osmium_compressor")
	RemoveMekUpgrade("combining_factory", "mekanism:combiner")
	RemoveMekUpgrade("purifying_factory", "mekanism:purification_chamber")
	RemoveMekUpgrade("injecting_factory", "mekanism:chemical_injection_chamber")
	RemoveMekUpgrade("infusing_factory", "mekanism:metallurgic_infuser")
	RemoveMekUpgrade("sawing_factory", "mekanism:precision_sawmill")
	RemoveMekUpgrade("energy_cube", "immersiveengineering:capacitor_mv")
})
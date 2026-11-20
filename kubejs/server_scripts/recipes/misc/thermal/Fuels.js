ServerEvents.recipes((event) => {
	let { thermal, thermal_extra } = event.getRecipes()

	thermal_extra.cold_fuel("ad_astra:ice_shard")
		.energy(1250)

	thermal.gourmand_fuel("#forge:cheese_block")
		.energy(6400)

	thermal.compression_fuel(Fluid.of("mekanism:nutritional_paste", 1000))
		.energy(19200)

	thermal.magmatic_fuel(Fluid.of("minecraft:lava", 1000))
		.energy(25000)

	thermal.magmatic_fuel(ThermalFluidIngredient.ofTagId("forge:steam", 1000))
		.energy(100000)

	thermal.magmatic_fuel(ThermalFluidIngredient.ofTagId("forge:superheated_steam", 1000))
		.energy(400000)
})
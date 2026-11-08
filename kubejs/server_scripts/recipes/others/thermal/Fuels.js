ServerEvents.recipes((event) => {
	let { thermal, thermal_extra } = event.getRecipes()

	thermal_extra.cold_fuel("ad_astra:ice_shard", 1250)
	thermal.gourmand_fuel("#forge:cheese_block", 6400)
	thermal.compression_fuel(Fluid.of("mekanism:nutritional_paste", 1000), 19200)
})
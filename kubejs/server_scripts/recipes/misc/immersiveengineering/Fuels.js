ServerEvents.recipes((event) => {
	addFuel("forge:creosote", 1300)
		.id("immersiveengineering:generator_fuel/creosote")
	addFuel("ad_astra:fuel", 1417)
	addFuel("forge:biodiesel", 1636)
		.id("immersiveengineering:generator_fuel/biodiesel")
	addFuel("forge:gasoline", 2043)
	addFuel("forge:diesel", 2113)
	addFuel("tconstruct:blazing_blood", 2638)

	function addFuel(tag, temperature) {
		return event.custom({
			type: "immersiveengineering:generator_fuel",
			burnTime: temperature / 10,
			fluidTag: tag
		})
	}
})
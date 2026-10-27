ServerEvents.recipes((event) => {
	let { steam_letters, tconstruct } = event.getRecipes()

	addFuel(Fluid.of("createdieselgenerators:plant_oil"), 1027)
	addFuel(Fluid.of("immersiveengineering:ethanol"), 1132)
	addFuel(Fluid.of("cmi:turbid_waste_liquid"), 1189)
	addFuel(Fluid.of("cmi:delta_unstable_solution"), 1206)
	addFuel(Fluid.of("createdieselgenerators:crude_oil"), 1220)
	addFuel(Fluid.of("immersiveengineering:creosote"), 1300)
	addFuel(Fluid.of("minecraft:lava"), 1346)
	addFuel(Fluid.of("ad_astra:fuel"), 1417)
	addFuel(Fluid.of("createdieselgenerators:biodiesel"), 1636)
	addFuel(Fluid.of("thermal:refined_fuel"), 2041)
	addFuel(Fluid.of("createdieselgenerators:gasoline"), 2043)
	addFuel(Fluid.of("createdieselgenerators:diesel"), 2113)
	addFuel(Fluid.of("tconstruct:blazing_blood"), 2638)
	addFuel(Fluid.of("ad_astra:cryo_fuel"), 4225)

	/**
	 *
	 * @param {Internal.FluidStackJS} fluid 流体id
	 * @param {number} temperature 温度
	 */
	function addFuel(fluid, temperature) {
		tconstruct.melting_fuel(fluid.withAmount(50))
			.duration(150)
			.rate(temperature / 100)
			.temperature(temperature)

		steam_letters.fluid_fuel(fluid, (temperature / 2))
	}
})
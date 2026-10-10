ServerEvents.recipes((event) => {
	let { createaddition } = event.getRecipes()

	addFluidFuel(Fluid.of("tconstruct:blazing_blood"), 1200, true)
	addFluidFuel(Fluid.of("cmi:kerosene"), 2400, true)

	/**
	 * 
	 * @param {Internal.FluidStackJS} fluid 流体
	 * @param {number} time 燃烧时间(单位秒)
	 * @param {Boolean} blue 是否蓝火
	 * @returns 
	 */
	function addFluidFuel(fluid, time, blue) {
		return createaddition.liquid_burning(fluid.withAmount(1000))
			.burnTime(20 * time)
			.superheated(blue)
	}
})
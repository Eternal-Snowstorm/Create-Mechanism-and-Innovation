ServerEvents.recipes((event) => {
	let { cmi, tconstruct } = event.getRecipes()

	addFuel(Fluid.of("createdieselgenerators:plant_oil"), 1027)
	addFuel(Fluid.of("immersiveengineering:ethanol"), 1132)
	addFuel(Fluid.of("cmi:turbid_waste_liquid"), 1189)
	addFuel(Fluid.of("cmi:delta_unstable_solution"), 1206)
	addFuel(Fluid.tag("tag", "forge:oil"), 1220)
	addFuel(Fluid.tag("tag", "forge:creosote"), 1300)
	addFuel(Fluid.of("minecraft:lava"), 1346)
	addFuel(Fluid.of("ad_astra:fuel"), 1417)
	addFuel(Fluid.of("createdieselgenerators:biodiesel"), 1636)
	addFuel(Fluid.of("thermal:refined_fuel"), 2041)
	addFuel(Fluid.of("createdieselgenerators:gasoline"), 2043)
	addFuel(Fluid.of("createdieselgenerators:diesel"), 2113)
	addFuel(Fluid.of("tconstruct:blazing_blood"), 2638)
	addFuel(Fluid.of("neoecoae:cryotheum_solution"), 4225)

	/**
	 * 添加匠魂流体燃料
	 * 速率由温度直接除100进行计算
	 * 例如传入1500度速率则返回15(1.5倍)
	 * 
	 * 如果想要替换默认燃料还不想破坏整体整齐性的话建议去Remove.js去删除配方
	 * 例如烈焰血的就是"tconstruct:smeltery/melting/fuel/blaze"
	 * 当然你要是硬要用.id()去替换我也阻止不了你
	 * 
	 * @param {Internal.FluidStackJS_} fluid 流体id
	 * @param {Number} temperature 温度
	 */
	function addFuel(fluid, temperature) {
		tconstruct.melting_fuel(fluid.withAmount(50))
			.duration(150)
			.rate(temperature / 100)
			.temperature(temperature)

		cmi.fluid_burn(fluid.withAmount(10), temperature / 10)
	}
})
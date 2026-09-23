ServerEvents.recipes((event) => {
	let { thermal_extra } = event.getRecipes()

	/**
	 * 
	 * @param {Internal.OutputFluid_[] | OutputItem_[]} output 
	 * @param {Internal.InputFluid_[] | InputItem_[]} inputs 
	 * @returns 
	 */
	function addComponRecipe(output, inputs) {
		return thermal_extra.component_assembly(output, inputs)
			.energy(16000)
	}

	// 二极管
	addComponRecipe("4x thermal:laser_diode", [
		"#forge:wires/electrum",
		"#forge:plates/invar",
		"#forge:prisms/pure_quartz"
	])

	// 电子元件
	addComponRecipe("2x immersiveengineering:component_electronic", [
		"thermal:laser_diode",
		"#forge:treated_wood_slab",
		"#forge:gems/quartz",
		"#forge:wires/electrum"
	]).id("immersiveengineering:blueprint/component_electronic")

	// 锇砖瓦
	addComponRecipe("2x cmi:osmium_tile", [
		"#forge:plates/aluminum",
		"#forge:plates/osmium",
		Fluid.of("cmi:structural_plastic", 200)
	])

	// 钢制机壳
	addComponRecipe(Casing.STAINLESS_STEEL, [
		"#forge:plates/stainless_steel",
		"cmi:osmium_tile",
		"#forge:gears/chromeplated_steel"
	]).id("mekanism:steel_casing")

	// 通量线圈
	addComponRecipe("thermal:rf_coil", [
		"#forge:plates/gold",
		"#forge:plates/signalum"
	])

	// 萤石流明管道
	addComponRecipe("cmi:glowstone_lumen_tube", [
		"#forge:plates/cobalt",
		"#forge:plates/lumium"
	])

	// 机器框架
	addComponRecipe("thermal:machine_frame", [
		"#forge:plates/invar",
		Casing.INDUSTRY,
		"#forge:rods/tin"
	])

	// 铁机壳
	addComponRecipe("cmi:iron_casing", [
		"#forge:plates/iron",
		Casing.INDUSTRY,
		"#forge:rods/copper"
	])

	// 钢机壳
	addComponRecipe(Casing.STEEL, [
		"#forge:plates/steel",
		Casing.INDUSTRY,
		"#forge:rods/electrum"
	])

	// PZ管道
	addComponRecipe("16x pipez:item_pipe", [
		"#forge:gears/invar",
		Mechanisms.THERMAL.COM,
		"#forge:plates/industrial_iron",
		Mechanisms.WOODEN.COM,
		"thermal:cured_rubber"
	]).id("pipez:item_pipe")

	addComponRecipe("16x pipez:fluid_pipe", [
		"#forge:gears/invar",
		Mechanisms.THERMAL.COM,
		"#forge:plates/industrial_iron",
		Mechanisms.COPPER.COM,
		"thermal:cured_rubber"
	]).id("pipez:fluid_pipe")

	addComponRecipe("16x pipez:energy_pipe", [
		"#forge:gears/invar",
		Mechanisms.THERMAL.COM,
		"#forge:plates/industrial_iron",
		Mechanisms.REDSTONE.COM,
		"thermal:cured_rubber"
	]).id("pipez:energy_pipe")

	addComponRecipe("16x pipez:gas_pipe", [
		"#forge:gears/invar",
		Mechanisms.THERMAL.COM,
		"#forge:plates/industrial_iron",
		Mechanisms.AIR.COM,
		"thermal:cured_rubber"
	]).id("pipez:gas_pipe")

	addComponRecipe("16x pipez:universal_pipe", [
		"pipez:item_pipe",
		"pipez:fluid_pipe",
		"pipez:energy_pipe",
		"pipez:gas_pipe"
	]).id("pipez:universal_pipe")

	// 红石伺服器
	addComponRecipe("2x thermal:redstone_servo", [
		Fluid.of("immersiveengineering:redstone_acid", 200),
		"#forge:plates/iron"
	]).id("thermal_extra:machine/component_assembly/redstone_servo")

	// 并行升级 +4
	addComponRecipe("cmi:4_parallel_upgrade", [
		"cmi:2_parallel_upgrade",
		["#forge:ingots/cobalt", "#forge:plates/cobalt"],
		"immersiveengineering:component_electronic",
		"#forge:gears/rose_gold",
		"#forge:gears/rose_gold"
	])

	// 并行升级 +4 流体配方虽然麻烦, 但是相对应的造价更便宜
	addComponRecipe("cmi:4_parallel_upgrade", [
		"cmi:2_parallel_upgrade",
		"immersiveengineering:component_electronic",
		["#forge:ingots/cobalt", "#forge:plates/cobalt"],
		"#forge:dusts/redstone",
		Fluid.of("tconstruct:molten_rose_gold", 90)
	])
})
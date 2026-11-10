ServerEvents.recipes((event) => {
	let { thermal_extra } = event.getRecipes()
	const ENERGY = 16000

	// 热力单元
	thermal_extra.component_assembly("cmi:thermal_unit", [
		Fluid.of("thermal:resin", 50),
		"#forge:plates/signalum",
		"#forge:plates/invar"
	]).energy(ENERGY)

	// 二极管
	thermal_extra.component_assembly("4x thermal:laser_diode", [
		"#forge:wires/electrum",
		"#forge:plates/invar",
		"#forge:prisms/pure_quartz"
	]).energy(ENERGY)

	// 电子元件
	thermal_extra.component_assembly("2x immersiveengineering:component_electronic", [
		"4x thermal:laser_diode",
		"#forge:treated_wood_slab",
		"#forge:gems/quartz",
		"#forge:wires/electrum"
	]).energy(ENERGY).id("immersiveengineering:blueprint/component_electronic")

	// 锇砖瓦
	thermal_extra.component_assembly("2x cmi:osmium_tile", [
		"#forge:plates/aluminum",
		"#forge:plates/osmium",
		Fluid.of("cmi:structural_plastic", 200)
	]).energy(ENERGY)

	// 钢制机壳
	thermal_extra.component_assembly(Casing.STAINLESS_STEEL, [
		"#forge:plates/stainless_steel",
		"cmi:osmium_tile",
		"#forge:gears/chromeplated_steel"
	]).energy(ENERGY).id("mekanism:steel_casing")

	// 通量线圈
	thermal_extra.component_assembly("thermal:rf_coil", [
		"#forge:plates/gold",
		"#forge:plates/signalum"
	]).energy(ENERGY)

	// 萤石流明管道
	thermal_extra.component_assembly("cmi:glowstone_lumen_tube", [
		"#forge:plates/cobalt",
		"#forge:plates/lumium"
	]).energy(ENERGY)

	// 机器框架
	thermal_extra.component_assembly("thermal:machine_frame", [
		"#forge:plates/invar",
		Casing.INDUSTRY,
		"#forge:rods/tin"
	]).energy(ENERGY)

	// 铁机壳
	thermal_extra.component_assembly("cmi:iron_casing", [
		"#forge:plates/iron",
		Casing.INDUSTRY,
		"#forge:rods/copper"
	]).energy(ENERGY)

	// 钢机壳
	thermal_extra.component_assembly(Casing.STEEL, [
		"#forge:plates/steel",
		Casing.INDUSTRY,
		"#forge:rods/electrum"
	]).energy(ENERGY)

	// PZ管道
	thermal_extra.component_assembly("16x pipez:item_pipe", [
		"#forge:gears/invar",
		Mechanisms.THERMAL.COM,
		"#forge:plates/industrial_iron",
		Mechanisms.WOODEN.COM,
		"thermal:cured_rubber"
	]).energy(ENERGY).id("pipez:item_pipe")

	thermal_extra.component_assembly("16x pipez:fluid_pipe", [
		"#forge:gears/invar",
		Mechanisms.THERMAL.COM,
		"#forge:plates/industrial_iron",
		Mechanisms.COPPER.COM,
		"thermal:cured_rubber"
	]).energy(ENERGY).id("pipez:fluid_pipe")

	thermal_extra.component_assembly("16x pipez:energy_pipe", [
		"#forge:gears/invar",
		Mechanisms.THERMAL.COM,
		"#forge:plates/industrial_iron",
		Mechanisms.REDSTONE.COM,
		"thermal:cured_rubber"
	]).energy(ENERGY).id("pipez:energy_pipe")

	thermal_extra.component_assembly("16x pipez:gas_pipe", [
		"#forge:gears/invar",
		Mechanisms.THERMAL.COM,
		"#forge:plates/industrial_iron",
		Mechanisms.AIR.COM,
		"thermal:cured_rubber"
	]).energy(ENERGY).id("pipez:gas_pipe")

	thermal_extra.component_assembly("16x pipez:universal_pipe", [
		"pipez:item_pipe",
		"pipez:fluid_pipe",
		"pipez:energy_pipe",
		"pipez:gas_pipe"
	]).energy(ENERGY).id("pipez:universal_pipe")

	// 红石伺服器
	thermal_extra.component_assembly("2x thermal:redstone_servo", [
		Fluid.of("immersiveengineering:redstone_acid", 200),
		"#forge:plates/iron"
	]).energy(ENERGY).id("thermal_extra:machine/component_assembly/redstone_servo")

	// 并行升级 +4
	thermal_extra.component_assembly("cmi:4_parallel_upgrade", [
		"cmi:2_parallel_upgrade",
		[
			"#forge:ingots/cobalt",
			"#forge:plates/cobalt"
		],
		"immersiveengineering:component_electronic",
		"#forge:gears/rose_gold",
		"#forge:gears/rose_gold"
	]).energy(ENERGY)

	// 并行升级 +4 流体配方虽然麻烦, 但是相对应的造价更便宜
	thermal_extra.component_assembly("cmi:4_parallel_upgrade", [
		"cmi:2_parallel_upgrade",
		"immersiveengineering:component_electronic",
		[
			"#forge:ingots/cobalt",
			"#forge:plates/cobalt"
		],
		"#forge:dusts/redstone",
		Fluid.of("tconstruct:molten_rose_gold", 90)
	]).energy(ENERGY)

	// 光谱的钥匙
	thermal_extra.component_assembly("meplacementtool:key_of_spectrum", [
		Mechanisms.COLOR.COM,
		"ae2:basic_card"
	]).energy(ENERGY).id("meplacementtool:key_of_spectrum")
})
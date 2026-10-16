ServerEvents.recipes((event) => {
	let { thermal_extra } = event.getRecipes()

	// 热力组件
	thermal_extra.component_assembly(`4x ${Mechanisms.THERMAL.AUG.getId()}`, [
		"#forge:gears/constantan",
		"thermal:rf_coil",
		"thermal:redstone_servo",
		"#forge:plates/vanadium"
	])

	// 轻工构件
	thermal_extra.component_assembly(`4x ${Mechanisms.LIGHT.AUG.getId()}`, [
		"#forge:gears/copper",
		"immersiveengineering:component_iron",
		"thermal:laser_diode"
	])

	// 智能构件
	thermal_extra.component_assembly(`4x ${Mechanisms.SMART.AUG.getId()}`, [
		"#forge:wires/signalum",
		"ae2:logic_processor",
		"ae2:calculation_processor",
		"ae2:engineering_processor"
	])

	// 强化构件
	thermal_extra.component_assembly(`4x ${Mechanisms.REINFORCED.AUG.getId()}`, [
		"#forge:gears/signalum",
		"cmi:glowstone_lumen_tube",
		"cmi:inscribed_silicon",
		"#forge:plates/lumium"
	])

	// 重工构件
	thermal_extra.component_assembly(`4x ${Mechanisms.HEAVY.AUG.getId()}`, [
		"#forge:gears/electrum",
		"immersiveengineering:component_steel",
		"immersiveengineering:electron_tube"
	])

	// 末影构件
	thermal_extra.component_assembly(`4x ${Mechanisms.ENDER.BAS.getId()}`, [
		"#forge:plates/enderium",
		"#forge:dusts/ender_pearl",
		"#forge:slimeball/ender"
	])

	// 金质构件
	thermal_extra.component_assembly(Mechanisms.GOLD.COM, [
		"#forge:plates/gold",
		Mechanisms.GOLD.AUG,
		"#forge:nuggets/gold",
		"#forge:dusts/cinnabar",
		Mechanisms.PART.FLUX
	])

	// 感光构件
	thermal_extra.component_assembly(Mechanisms.PHOTO.COM, [
		"#forge:prisms/polished_quartz",
		"cmi:resonant_tube",
		"#forge:prisms/pure_quartz",
		"#forge:dusts/amethyst",
		Mechanisms.PART.FLUX
	])

	// 热力构件
	thermal_extra.component_assembly(Mechanisms.THERMAL.COM, [
		"#forge:plates/invar",
		Mechanisms.THERMAL.AUG,
		"#forge:rods/nickel",
		"#forge:wires/copper",
		Mechanisms.PART.FLUX
	])

	// 强化构件
	thermal_extra.component_assembly(Mechanisms.REINFORCED.COM, [
		"#forge:plates/electrum",
		Mechanisms.REINFORCED.AUG,
		"#forge:rods/nickel",
		"#forge:wires/signalum",
		Mechanisms.PART.FLUX
	])

	// 线圈构件
	thermal_extra.component_assembly(Mechanisms.COIL.COM, [
		Fluid.of("immersiveengineering:redstone_acid", 200),
		"#forge:plates/iron",
		"cmi:motor_rotor",
		"#forge:plates/electrum",
		Mechanisms.PART.ENGIN
	])

	// 钴质构件
	thermal_extra.component_assembly(Mechanisms.COBALT.COM, [
		Fluid.of("tconstruct:molten_cobalt", 90),
		"#forge:plates/cobalt",
		Mechanisms.COBALT.AUG,
		"#forge:dusts/apatite",
		Mechanisms.PART.ENGIN
	])

	// 智能构件
	thermal_extra.component_assembly(Mechanisms.SMART.COM, [
		Fluid.of("immersiveengineering:redstone_acid", 100),
		"#forge:plates/silver",
		Mechanisms.SMART.AUG,
		"ae2:fluix_crystal",
		Mechanisms.PART.ENGIN
	])

	// 轻工构件
	thermal_extra.component_assembly(Mechanisms.LIGHT.COM, [
		Fluid.of("immersiveengineering:creosote", 100),
		"#forge:plates/industrial_iron",
		Mechanisms.LIGHT.AUG,
		"#forge:rods/constantan",
		Mechanisms.PART.ENGIN
	])

	// 重工构件
	thermal_extra.component_assembly(Mechanisms.HEAVY.COM, [
		Fluid.of("thermal_extra:lubricant", 100),
		"#forge:plates/steel",
		Mechanisms.HEAVY.AUG,
		"#forge:rods/invar",
		Mechanisms.PART.ENGIN
	])
})
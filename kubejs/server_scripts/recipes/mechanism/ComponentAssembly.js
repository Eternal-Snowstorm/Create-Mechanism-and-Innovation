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
})
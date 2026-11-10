ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra } = event.getRecipes()

	// 太阳能板
	kubejs.shaped("mekanismgenerators:solar_panel", [
		"ABA",
		"CMC",
		" C "
	], {
		A: "#forge:glass_panes",
		B: "#forge:plates/silicon",
		C: "#forge:plates/copper",
		M: Mechanisms.PHOTO.COM
	}).id("mekanismgenerators:solar_panel")

	// 能量板
	thermal_extra.component_assembly("mekanism:energy_tablet", [
		"#forge:plates/vanadium",
		"#forge:plates/industrial_iron",
		"#forge:plates/signalum",
		Fluid.of("cmi:molten_etrium", 90)
	]).id("mekanism:energy_tablet")
})
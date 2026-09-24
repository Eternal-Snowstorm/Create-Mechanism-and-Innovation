ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra } = event.getRecipes()

	// 燃煤发电机
	kubejs.shaped("ad_astra:coal_generator", [
		"ABA",
		"ACA",
		"DDD"
	], {
		A: ["#forge:ingots/iron", "#forge:plates/iron"],
		B: Mechanisms.IRON.COM,
		C: ["minecraft:furnace", "minecraft:blast_furnace", "minecraft:smoker"],
		D: "#forge:plates/industrial_iron",
	}).id("ad_astra:coal_generator")

	// 电力高炉
	thermal_extra.component_assembly("ad_astra:etrionic_blast_furnace", [
		"#forge:storage_blocks/steel",
		"#cmi:coils",
		Mechanisms.COIL.COM
	]).id("ad_astra:etrionic_blast_furnace")

	// 太阳能板
	kubejs.shaped("mekanismgenerators:solar_generator", [
		"BAB",
		"CDC"
	], {
		A: "mekanismgenerators:solar_panel",
		B: "#forge:glass",
		C: "#forge:plates/industrial_iron",
		D: "#forge:plates/vanadium"
	}).id("mekanismgenerators:generator/solar")

	thermal_extra.component_assembly("ad_astra:solar_panel", [
		"ad_astra:photovoltaic_etrium_cell",
		Casing.STEEL,
		"#forge:plates/vanadium",
		"#forge:plates/steel"
	]).id("ad_astra:solar_panel")

	thermal_extra.component_assembly("mekanismgenerators:advanced_solar_generator", [
		"ad_astra:photovoltaic_vesnium_cell",
		Mechanisms.LIGHT.COM,
		Casing.STEEL,
		"#forge:plates/vanadium",
		"#forge:plates/steel"
	])
		.id("mekanismgenerators:generator/advanced_solar")
})
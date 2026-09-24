ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 通风口
	kubejs.shaped("4x ad_astra:vent", [
		"AAA",
		"B B",
		"AAA"
	], {
		A: "#forge:rods/iron",
		B: "#forge:plates/iron"
	}).id("ad_astra:vent")

	// 风扇
	kubejs.shaped("ad_astra:fan", [
		"A A",
		" B ",
		"A A"
	], {
		A: "#forge:plates/stainless_steel",
		B: "#forge:ingots/aluminum_alloy"
	}).id("ad_astra:fan")

	// 太阳能电池
	kubejs.shaped("ad_astra:photovoltaic_etrium_cell", [
		"ABA",
		"CMC",
		" C "
	], {
		A: "#forge:glass_panes",
		B: "#forge:plates/silicon",
		C: "#forge:plates/etrium",
		M: Mechanisms.PHOTO.COM
	}).id("ad_astra:photovoltaic_etrium_cell")

	kubejs.shaped("ad_astra:photovoltaic_vesnium_cell", [
		"ABA",
		"CMC",
		" C "
	], {
		A: "#forge:glass_panes",
		B: "#forge:plates/silicon",
		C: "#forge:plates/silver",
		M: Mechanisms.PHOTO.COM
	}).id("ad_astra:photovoltaic_vesnium_cell")
})
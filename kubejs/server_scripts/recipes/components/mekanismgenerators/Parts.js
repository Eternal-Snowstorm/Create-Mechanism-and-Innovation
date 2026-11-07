ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

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
})

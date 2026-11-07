ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 青铜机壳
	create.deploying(Casing.BRONZE, [
		Casing.INDUSTRY,
		"cmi:bronze_casing_framework"
	]).id("steam_letters:item_application/bronze_casing_plate")

	create.item_application(Casing.BRONZE, [
		Casing.INDUSTRY,
		["#forge:ingots/bronze", "#forge:plates/bronze"]
	]).id("steam_letters:item_application/bronze_casing_ingot")
})

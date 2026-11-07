ServerEvents.recipes((event) => {
	let { farmersdelight, createdieselgenerators, create, minecraft, kubejs } = event.getRecipes()

	// 树皮切木屑
	farmersdelight.cutting("createdieselgenerators:wood_chip", [
		"#cmi:tree_barks"
	], "#minecraft:axes")
	create.cutting("createdieselgenerators:wood_chip", [
		"#cmi:tree_barks"
	])

	// 松香
	farmersdelight.cooking("thermal:rosin", [
		"#cmi:tree_barks",
		"#cmi:tree_barks",
		"#cmi:tree_barks",
		"#forge:rods/wooden"
	])

	// 防腐木板
	kubejs.shaped("4x immersiveengineering:treated_wood_horizontal", [
		" A ",
		"ABA",
		" A "
	], {
		A: "#minecraft:planks",
		B: "thermal:rosin"
	}).id("immersiveengineering:crafting/treated_wood_horizontal")

	// 生物质
	create.mixing("createaddition:biomass", [
		"3x #cmi:tree_barks",
		Fluid.of("createdieselgenerators:plant_oil", 100)
	]).heated()

	// 草木灰
	minecraft.smelting("cmi:plant_ash", "#createaddition:plants")
	minecraft.smelting("cmi:plant_ash", "#minecraft:flowers")
	minecraft.smelting("cmi:plant_ash", "#cmi:tree_barks")
	minecraft.smelting("cmi:plant_ash", "#minecraft:leaves")
	minecraft.smelting("cmi:plant_ash", "#forge:dusts/wood")

	// 有机肥料
	kubejs.shapeless("farmersdelight:organic_compost", [
		"minecraft:dirt",
		"#cmi:tree_barks",
		"cmi:plant_ash",
		"#forge:fuels/bio"
	]).id("farmersdelight:organic_compost_from_tree_bark")
	kubejs.shapeless("farmersdelight:organic_compost", [
		"minecraft:dirt",
		"minecraft:rotten_flesh",
		"cmi:plant_ash",
		"#forge:fuels/bio"
	]).id("farmersdelight:organic_compost_from_rotten_flesh")

	// 堆肥
	createdieselgenerators.basin_fermenting("thermal:compost", [
		"#cmi:tree_barks",
		"cmi:plant_ash",
		"#forge:fuels/bio"
	])
	createdieselgenerators.basin_fermenting("thermal:compost", [
		"minecraft:rotten_flesh",
		"cmi:plant_ash",
		"#forge:fuels/bio"
	])

	// 沃土
	create.item_application("farmersdelight:rich_soil", [
		"minecraft:dirt",
		"#forge:dusts/fertilizer"
	])
	create.item_application("farmersdelight:rich_soil_farmland", [
		"minecraft:farmland",
		"#forge:dusts/fertilizer"
	])
})
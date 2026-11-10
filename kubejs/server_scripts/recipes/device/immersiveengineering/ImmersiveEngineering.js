ServerEvents.recipes((event) => {
	let { kubejs, minecraft } = event.getRecipes()

	minecraft.stonecutting(Casing.INDUSTRY, "#forge:plates/industrial_iron")

	kubejs.shaped("4x immersiveengineering:radiator", [
		"ABA",
		"C C",
		"ABA"
	], {
		A: Casing.INDUSTRY,
		B: "#forge:plates/constantan",
		C: "#forge:rods/invar"
	}).id("immersiveengineering:crafting/radiator")

	kubejs.shaped("4x immersiveengineering:heavy_engineering", [
		"ABA",
		"B B",
		"ABA"
	], {
		A: Casing.INDUSTRY,
		B: Mechanisms.HEAVY.COM
	}).id("immersiveengineering:crafting/heavy_engineering")

	kubejs.shaped("4x immersiveengineering:light_engineering", [
		"ABA",
		"B B",
		"ABA"
	], {
		A: Casing.INDUSTRY,
		B: Mechanisms.LIGHT.COM
	}).id("immersiveengineering:crafting/light_engineering")

	kubejs.shaped("4x immersiveengineering:rs_engineering", [
		"ABA",
		"B B",
		"ABA"
	], {
		A: Casing.INDUSTRY,
		B: Mechanisms.REDSTONE.COM
	}).id("immersiveengineering:crafting/rs_engineering")

	kubejs.shaped("4x immersiveengineering:generator", [
		"ABA",
		"B B",
		"ABA"
	], {
		A: Casing.INDUSTRY,
		B: Mechanisms.COIL.COM
	}).id("immersiveengineering:crafting/generator")

	kubejs.shaped("4x cmi:crucible_base", [
		"ABA",
		"B B",
		"ABA"
	], {
		A: Casing.INDUSTRY,
		B: "#forge:plates/cast_iron"
	})

	kubejs.shapeless("cmi:crucible_tuyere", [
		"cmi:crucible_base",
		"immersiveengineering:component_iron"
	])

	kubejs.shaped("4x immersiveindustry:burning_chamber", [
		"ABA",
		"B B",
		"ABA"
	], {
		A: "cmi:crucible_base",
		B: "#forge:plates/invar"
	}).id("immersiveindustry:crafting/burning_chamber")

	kubejs.shaped("immersiveengineering:blastbrick", [
		"AA",
		"AA"
	], {
		A: "immersiveindustry:refractory_kiln_brick"
	}).id("immersiveengineering:crafting/blastbrick")

	kubejs.shaped("2x immersiveindustry:car_kiln_brick", [
		"BBB",
		"ABA",
		"PPP"
	], {
		A: "moreburners:nickel_coil",
		B: "immersiveindustry:refractory_kiln_brick",
		P: "#forge:plates/steel"
	}).id("immersiveindustry:crafting/car_kiln_brick")

	kubejs.shaped("2x immersiveindustry:rotary_kiln_cylinder", [
		"AAA",
		"BBB",
		"PPP"
	], {
		A: "immersiveindustry:refractory_kiln_brick",
		B: "tconstruct:scorched_brick",
		P: "#forge:plates/steel"
	}).id("immersiveindustry:crafting/rotary_kiln_cylinder")
})
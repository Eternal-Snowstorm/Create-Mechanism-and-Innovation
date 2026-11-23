ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 打包机
	kubejs.shaped("2x create:packager", [
		"ABA",
		"CDC",
		"AEA"
	], {
		A: "#forge:plates/andesite_alloy",
		B: Mechanisms.ANDESITE.COM,
		C: "#forge:plates/industrial_iron",
		D: "create:cardboard_block",
		E: Casing.ANDESITE
	}).id("create:crafting/logistics/packager")

	// 流体打包机
	kubejs.shaped("2x fluidlogistics:fluid_packager", [
		"ABA",
		"CDC",
		"AEA"
	], {
		A: "#forge:plates/copper",
		B: Mechanisms.COPPER.COM,
		C: "#forge:plates/industrial_iron",
		D: "fluidlogistics:waterproof_cardboard_block",
		E: Casing.COPPER
	}).id("fluidlogistics:fluid_packager")

	// 蛙港
	kubejs.shaped("create:package_frogport", [
		"AA ",
		"BCD",
		" E "
	], {
		A: "#forge:plates/industrial_iron",
		B: "#forge:slimeballs",
		C: Mechanisms.ANDESITE.COM,
		D: "#vintageimprovements:springs/andesite",
		E: Casing.ANDESITE
	}).id("create:crafting/logistics/package_frogport")
})
ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 打包机
	kubejs.shaped("2x create:packager", [
		"PMP",
		"IBI",
		"PCP"
	], {
		P: "#forge:plates/andesite_alloy",
		M: Mechanisms.ANDESITE.COM,
		I: "#forge:plates/industrial_iron",
		B: "create:cardboard_block",
		C: Casing.ANDESITE
	}).id("create:crafting/logistics/packager")

	// 流体打包机
	kubejs.shaped("2x fluidlogistics:fluid_packager", [
		"PMP",
		"IBI",
		"PCP"
	], {
		P: "#forge:plates/copper",
		M: Mechanisms.COPPER.COM,
		I: "#forge:plates/industrial_iron",
		B: "fluidlogistics:waterproof_cardboard_block",
		C: Casing.COPPER
	}).id("fluidlogistics:fluid_packager")

	// 蛙港
	kubejs.shaped("create:package_frogport", [
		"PP ",
		"BMS",
		" C "
	], {
		P: "#forge:plates/industrial_iron",
		B: "#forge:slimeballs",
		M: Mechanisms.ANDESITE.COM,
		S: "#vintageimprovements:springs/andesite",
		C: Casing.ANDESITE
	}).id("create:crafting/logistics/package_frogport")
})
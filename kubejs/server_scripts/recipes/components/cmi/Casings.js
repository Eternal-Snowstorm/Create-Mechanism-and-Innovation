ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 铁机壳
	kubejs.shaped("4x cmi:iron_casing", [
		"ABA",
		"BCB",
		"ABA"
	], {
		A: "#forge:plates/iron",
		B: Casing.INDUSTRY,
		C: "#forge:gears/copper"
	})

	// 钢机壳
	kubejs.shaped("8x cmi:steel_casing", [
		"ABA",
		"BCB",
		"ABA"
	], {
		A: "#forge:plates/steel",
		B: Casing.INDUSTRY,
		C: "#forge:gears/electrum"
	})

	// 铜线圈
	kubejs.shaped("4x cmi:copper_coil", [
		"A A",
		" B ",
		"A A"
	], {
		A: "#forge:wires/copper",
		B: "createaddition:spool"
	}).id("immersiveengineering:crafting/coil_lv")

	// 琥珀金线圈
	kubejs.shaped("4x cmi:electrum_coil", [
		"A A",
		" B ",
		"A A"
	], {
		A: "#forge:wires/electrum",
		B: "createaddition:spool"
	}).id("immersiveengineering:crafting/coil_mv")

	// 钢线圈
	kubejs.shaped("4x cmi:steel_coil", [
		"A A",
		" B ",
		"A A"
	], {
		A: "#forge:wires/steel",
		B: "createaddition:spool"
	}).id("immersiveengineering:crafting/coil_hv")
})
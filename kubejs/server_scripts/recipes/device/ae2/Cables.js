ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, minecraft, neoecoae } = event.getRecipes()

	// 福鲁伊克斯色ME玻璃线缆
	kubejs.shaped("8x ae2:fluix_glass_cable", [
		"AAA",
		"ABA",
		"AAA"
	], {
		B: "ae2:fluix_crystal",
		A: "cmi:optical_fiber"
	}).id("ae2:network/cables/glass_fluix")

	kubejs.shaped("4x ae2:fluix_glass_cable", [
		"AA",
		"AA"
	], {
		A: "cmi:fluix_wire"
	})

	//包层线缆
	kubejs.shaped("8x ae2:fluix_covered_cable", [
		"AAA",
		"ABA",
		"AAA"
	], {
		A: "ae2:fluix_glass_cable",
		B: "thermal:cured_rubber"
	}).id("ae2:network/cables/covered_fluix")

})
ServerEvents.recipes((event) => {
	let { kubejs, immersiveengineering, thermal } = event.getRecipes()

	// 铁机械零件
	immersiveengineering.blueprint("4x immersiveengineering:component_iron", [
		"4x #forge:plates/iron",
		"#forge:gears/copper"
	]).blueprint("components")
		.id("immersiveengineering:blueprint/component_iron")

	// 钢机械零件
	immersiveengineering.blueprint("4x immersiveengineering:component_steel", [
		"4x #forge:plates/steel",
		"#forge:gears/electrum"
	]).blueprint("components")
		.id("immersiveengineering:blueprint/component_steel")

	// 铁机械零件
	kubejs.shaped("2x immersiveengineering:component_iron", [
		"P P",
		" G ",
		"P P"
	], {
		P: "#forge:plates/iron",
		G: "#forge:gears/copper"
	}).id("immersiveengineering:crafting/component_iron")

	// 钢机械零件
	kubejs.shaped("2x immersiveengineering:component_steel", [
		"P P",
		" G ",
		"P P"
	], {
		P: "#forge:plates/steel",
		G: "#forge:gears/electrum"
	}).id("immersiveengineering:crafting/component_steel")

	// 水车部件
	kubejs.shaped("immersiveengineering:waterwheel_segment", [
		" AA",
		"A B",
		"AB "
	], {
		A: "#minecraft:wooden_slabs",
		B: "#forge:rods/wooden"
	}).id("immersiveengineering:crafting/waterwheel_segment")

	// 红石线圈
	kubejs.shaped("4x immersiveengineering:wirecoil_redstone", [
		" A ",
		"ABA",
		" A "
	], {
		A: "#forge:wires/signalum",
		B: "#forge:rods/wooden"
	}).id("immersiveengineering:crafting/wirecoil_redstone")

	// 小型空弹壳
	immersiveengineering.metal_press("2x immersiveengineering:empty_casing")
		.input("#forge:ingots/brass")
		.mold("cmi:bullet_mold")

	thermal.press("2x immersiveengineering:empty_casing", [
		"#forge:ingots/brass",
		"cmi:bullet_mold"
	])
})

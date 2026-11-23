ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 置物台
	kubejs.shapeless("create:depot", [
		Casing.ANDESITE,
		"#forge:plates/andesite"
	]).id("create:crafting/kinetics/depot")

	// 工作盆盖板
	kubejs.shaped("createdieselgenerators:basin_lid", [
		"ABA",
		"C C"
	], {
		A: "#forge:plates/andesite_alloy",
		B: "#forge:ingots/andesite_alloy",
		C: "thermal:rubberwood_planks"
	})

	// 弹射置物台
	kubejs.shapeless("create:weighted_ejector",
		["create:depot",
			Mechanisms.ANDESITE.COM
		]).id("create:crafting/kinetics/weighted_ejector")

	// 列车装配站
	kubejs.shaped("create:cart_assembler", [
		"ABA",
		"C C"
	], {
		A: "thermal:redstone_servo",
		B: Mechanisms.ANDESITE.COM,
		C: "#forge:plates/industrial_iron"
	}).id("create:crafting/kinetics/cart_assembler")

	// 升降机滑轮
	kubejs.shaped("create:elevator_pulley", [
		"A",
		"B",
		"C"
	], {
		A: Casing.BRASS,
		B: "thermal:cured_rubber_block",
		C: Mechanisms.ANDESITE.COM
	}).id("create:crafting/kinetics/elevator_pulley")

	// 控制器
	kubejs.shaped("create:contraption_controls", [
		"A",
		"B",
		"C"
	], {
		A: "create_connected:control_chip",
		B: Casing.ANDESITE,
		C: Mechanisms.ANDESITE.COM
	}).id("create:crafting/kinetics/contraption_controls")

	// 动力臂
	kubejs.shaped("create:mechanical_arm", [
		"ABC",
		"BD ",
		"EF "
	], {
		A: "#forge:ingots/andesite_alloy",
		B: "#forge:plates/brass",
		C: Mechanisms.ANDESITE.COM,
		D: "#vintageimprovements:small_springs/bronze",
		E: Mechanisms.PRECISION.COM,
		F: Casing.BRASS
	}).id("create:crafting/kinetics/mechanical_arm")

	// 动力合成器
	kubejs.shaped("3x create:mechanical_crafter", [
		"A",
		"B",
		"C"
	], {
		A: Mechanisms.PRECISION.COM,
		B: Casing.BRASS,
		C: "create:crafting_blueprint"
	}).id("create:crafting/kinetics/mechanical_crafter")
})
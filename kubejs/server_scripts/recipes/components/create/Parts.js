ServerEvents.recipes((event) => {
	let { kubejs, minecraft } = event.getRecipes()

	// 粉碎轮
	kubejs.shaped("create:crushing_wheel", [
		"ABA",
		"BCB",
		"ABA"
	], {
		A: "create:andesite_alloy_block",
		B: "thermal:iron_gear",
		C: "cmi:andesite_mechanism"
	})

	// 扇叶
	kubejs.shaped("create:propeller", [
		" A ",
		"ABA",
		" A "
	], {
		A: ["#forge:plates/iron", "#forge:plates/zinc"],
		B: "#forge:ingots/andesite_alloy"
	}).id("create:crafting/kinetics/propeller")

	kubejs.shaped("3x create:propeller", [
		" A ",
		"ABA",
		" A "
	], {
		A: "#forge:plates/industrial_iron",
		B: "#forge:ingots/andesite_alloy"
	})

	// 风帆框架
	kubejs.shaped("2x create:sail_frame", [
		"ABA",
		"B B",
		"ABA"
	], {
		A: "#forge:string",
		B: "#forge:rods/wooden"
	}).id("create:crafting/kinetics/sail_framefrom_conversion")

	// 风车叶片
	kubejs.shaped("4x create:white_sail", [
		" A ",
		"ABA",
		" A "
	], {
		A: "create:sail_frame",
		B: "immersive_aircraft:sail"
	}).id("create:crafting/kinetics/white_sail")

	// 搅拌头
	kubejs.shaped("create:whisk", [
		" A ",
		"BAB",
		"BBB"
	], {
		A: "create:andesite_alloy",
		B: ["#forge:plates/zinc", "#forge:plates/iron"]
	}).id("create:crafting/kinetics/whisk")

	// 红石发信器
	kubejs.shaped("4x create:transmitter", [
		" M ",
		"RRR",
		"WWW"
	], {
		M: Mechanisms.REDSTONE.COM,
		R: "#forge:rods/copper",
		W: "#forge:wires/copper"
	}).id("create:crafting/materials/transmitter")

	// 黄铜手
	kubejs.shaped("create:brass_hand", [
		" A ",
		"BBB",
		" B "
	], {
		A: "#forge:ingots/andesite_alloy",
		B: "thermal:cured_rubber"
	}).id("create:crafting/kinetics/brass_hand")

	// 金属梁
	minecraft.stonecutting("2x create:metal_girder",
		"#forge:plates/industrial_iron"
	).id("create:crafting/kinetics/metal_girder")

	// 安山梁
	minecraft.stonecutting("2x createdieselgenerators:andesite_girder",
		"#forge:plates/andesite_alloy"
	).id("createdieselgenerators:crafting/andesite_girder")

	// 线轴
	kubejs.shaped("16x createaddition:spool", [
		"A",
		"B",
		"A"
	], {
		A: "#forge:plates/iron",
		B: "#forge:rods/iron"
	}).id("createaddition:crafting/spool")
	
	// 铜线圈
	kubejs.shaped("moreburners:copper_coil", [
		"ABA",
		"ABA",
		"ABA"
	], {
		A: "#forge:wires/copper",
		B: "#forge:rods/copper"
	}).id("moreburners:copper_coil")

	// 电阻线圈
	kubejs.shaped("moreburners:nickel_coil", [
		"AAA",
		"ABA",
		"AAA"
	], {
		A: "#forge:plates/nickel",
		B: "moreburners:copper_coil"
	}).id("moreburners:resistance_coil")

	// 激光发射器
	kubejs.shaped("vintageimprovements:laser_item", [
		" A ",
		"BDB",
		" E "
	], {
		A: "#forge:dusts/redstone",
		B: "#forge:plates/copper",
		D: "createaddition:capacitor",
		E: Mechanisms.PHOTO.COM
	}).id("vintageimprovements:mechanical_crafting/laser")

	// 卷簧轮
	kubejs.shaped("vintageimprovements:spring_coiling_machine_wheel", [
		" A ",
		"ABA",
		" A "
	], {
		A: ["#forge:plates/iron", "#forge:plates/andesite_alloy"],
		B: "#forge:ingots/andesite_alloy"
	}).id("vintageimprovements:craft/spring_coiling_machine_wheel")
})

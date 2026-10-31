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

	// 电容
	kubejs.shaped("cmi:simple_battery", [
		" A ",
		"BBB",
		" C "
	], {
		A: "#forge:plates/copper",
		B: "#forge:dusts/redstone",
		C: "#forge:plates/zinc"
	}).id("createaddition:crafting/capacitor_1")

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

	// 水车部件
	kubejs.shaped("immersiveengineering:waterwheel_segment", [
		" AA",
		"A B",
		"AB "
	], {
		A: "#minecraft:wooden_slabs",
		B: "#forge:rods/wooden"
	}).id("immersiveengineering:crafting/waterwheel_segment")

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

	// 搅拌头
	kubejs.shaped("create:whisk", [
		" A ",
		"BAB",
		"BBB"
	], {
		A: "create:andesite_alloy",
		B: ["#forge:plates/zinc", "#forge:plates/iron"]
	}).id("create:crafting/kinetics/whisk")

	// 增产机壳
	let casingFrame = [
		"andesite",
		"brass",
		"bronze",
		"copper"
	]
	casingFrame.forEach((frame) => {
		minecraft.stonecutting(`4x cmi:${frame}_casing_framework`, `#forge:plates/${frame}`)
	})

	// 锯片
	kubejs.shaped("thermal:saw_blade", [
		" X ",
		"XYX",
		" X "
	], {
		X: "#forge:plates/iron",
		Y: "#forge:plates/andesite_alloy"
	}).id("thermal:saw_blade")

	// 钻头
	kubejs.shaped("thermal:drill_head", [
		"YY ",
		"Y X",
		" XX"
	], {
		X: "#forge:plates/iron",
		Y: "#forge:plates/andesite_alloy"
	}).id("thermal:drill_head")

	// 背罐
	kubejs.shaped("create:copper_backtank", [
		"AMA",
		"CBC",
		"PPP"
	], {
		A: "#forge:plates/andesite_alloy",
		M: Mechanisms.STEAM.COM,
		B: Casing.BRONZE,
		C: "thermal:cured_rubber",
		P: "#forge:plates/bronze"
	}).id("create:crafting/appliances/copper_backtank")

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

	// 红石发信器
	kubejs.shaped("4x create:transmitter", [
		" M ",
		"RRR",
		"WWW"
	], {
		M: Mechanisms.REDSTONE.COM,
		R: "#forge:rods/copper",
		W: "#forge:wires/copper"
	}).id('create:crafting/materials/transmitter')

	// 冲压头
	kubejs.shaped("cmi:hammer_head", [
		"PPP",
		"III",
		"PPP"
	], {
		P: [
			"#forge:plates/iron",
			"#forge:plates/andesite_alloy"
		],
		I: [
			"#forge:ingots/iron",
			"#forge:ingots/andesite_alloy"
		]
	})

	// 吸管
	kubejs.shaped("3x createaddition:straw", [
		"A A",
		"B B",
		"A A"
	], {
		A: [
			"#forge:ingots/copper",
			"#forge:plates/copper",
			"#forge:rods/copper",

			"#forge:ingots/tin",
			"#forge:plates/tin",
			"#forge:rods/tin",

			"#forge:ingots/bronze",
			"#forge:plates/bronze",
			"#forge:rods/bronze",

			"#forge:ingots/iron",
			"#forge:plates/iron",
			"#forge:rods/iron",

			"#forge:ingots/brass",
			"#forge:plates/brass",
			"#forge:rods/brass"
		],
		B: [
			"minecraft:dried_kelp",
			"minecraft:sugar_cane",
			"minecraft:bamboo",
			"#forge:bones"
		]
	})

	// 吸管
	kubejs.shaped("3x createaddition:straw", [
		"ABA",
		"   ",
		"ABA"
	], {
		A: [
			"#forge:ingots/copper",
			"#forge:plates/copper",
			"#forge:rods/copper",

			"#forge:ingots/tin",
			"#forge:plates/tin",
			"#forge:rods/tin",

			"#forge:ingots/bronze",
			"#forge:plates/bronze",
			"#forge:rods/bronze",

			"#forge:ingots/iron",
			"#forge:plates/iron",
			"#forge:rods/iron",

			"#forge:ingots/brass",
			"#forge:plates/brass",
			"#forge:rods/brass"
		],
		B: [
			"minecraft:dried_kelp",
			"minecraft:sugar_cane",
			"minecraft:bamboo",
			"#forge:bones"
		]
	})

	// 大型发酵储罐
	kubejs.shaped("2x createdieselgenerators:bulk_fermenter", [
		"AAA",
		"A A",
		"AAA"
	], {
		A: "#forge:plates/industrial_iron"
	})

	// 大型发酵储罐
	kubejs.shaped("createdieselgenerators:bulk_fermenter", [
		" A ",
		"A A",
		" A "
	], {
		A: "#forge:plates/industrial_iron"
	})

	// 大型发酵储罐
	kubejs.shaped("createdieselgenerators:bulk_fermenter", [
		"A A",
		"   ",
		"A A"
	], {
		A: "#forge:plates/industrial_iron"
	})

	// 线轴
	kubejs.shaped("16x createaddition:spool", [
		"A",
		"B",
		"A"
	], {
		A: "#forge:plates/iron",
		B: "#forge:rods/iron"
	}).id("createaddition:crafting/spool")

	// 升级
	kubejs.shaped("cmi:steam_cast_iron_upgrade", [
		" P ",
		"PGP",
		" P "
	], {

		P: "#forge:plates/cast_iron",
		G: "#forge:gears/bronze"
	})

	kubejs.shaped("cmi:steam_steel_upgrade", [
		" P ",
		"PGP",
		" P "
	], {
		P: "#forge:plates/steel",
		G: "#forge:gears/cast_iron"
	})

	// 暂时修复蒸汽锻锤配方
	kubejs.shaped("steam_letters:steam_hammer", [
		"ABA",
		"DCD",
		" E "
	], {
		A: "#forge:plates/bronze",
		B: Casing.BRONZE,
		C: "create:mechanical_press",
		D: Mechanisms.STEAM.COM,
		E: "#forge:storage_blocks/bronze"
	}).id("steam_letters:crafting/shaped/bronze/steam_hammer")
})
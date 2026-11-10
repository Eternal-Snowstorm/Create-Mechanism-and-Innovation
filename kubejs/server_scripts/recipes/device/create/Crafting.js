ServerEvents.recipes((event) => {
	let { kubejs, minecraft } = event.getRecipes()

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
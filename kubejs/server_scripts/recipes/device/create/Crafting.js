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
		"ABA",
		"CDC",
		"EEE"
	], {
		A: "#forge:plates/andesite_alloy",
		B: Mechanisms.STEAM.COM,
		C: "thermal:cured_rubber",
		D: Casing.BRONZE,
		E: "#forge:plates/bronze"
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
		" A ",
		"ABA",
		" A "
	], {

		A: "#forge:plates/cast_iron",
		B: "#forge:gears/bronze"
	})

	kubejs.shaped("cmi:steam_steel_upgrade", [
		" A ",
		"ABA",
		" A "
	], {
		A: "#forge:plates/steel",
		B: "#forge:gears/cast_iron"
	})

	// 蓄电池
	kubejs.shaped("createaddition:modular_accumulator", [
		"ABA",
		"CDC",
		"EFE"
	], {
		A: "thermal:cured_rubber",
		B: "#forge:rods/copper",
		C: "cmi:simple_battery",
		D: Casing.BRASS,
		E: "#forge:plates/brass",
		F: "#forge:plates/vanadium"
	}).id("createaddition:crafting/modular_accumulator_gold")
})
ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 多方块搭建器
	create.mechanical_crafting("mbtool:mbtool", [
		" ABA ",
		"CDEFA",
		"   GH",
		"    H"
	], {
		A: "#forge:plates/brass",
		B: "create:electron_tube",
		C: "#forge:gems/charged_amethyst",
		D: "#forge:tools/wrench",
		E: "create:empty_schematic",
		F: "#create:mechanisms/precision",
		G: "immersiveengineering:gunpart_hammer",
		H: "createdieselgenerators:kelp_handle",
	}).id("mbtool:mbtool")

	// 隔热背罐
	event.custom({
		"type": "create_jetpack:copy_nbt_mechanical_crafting",
		"pattern": [
			"PDMDP",
			"PFBFP",
			" SPS "
		],
		"key": {
			"P": Ingredient.of("#forge:plates/steel").toJson(),
			"D": Ingredient.of("#forge:plates/dense_obsidian").toJson(),
			"M": Mechanisms.NETHER.COM.toJson(),
			"F": Ingredient.of("#forge:fabric_hemp").toJson(),
			"B": Item.of("create:copper_backtank").toJson(),
			"S": Ingredient.of("#forge:plates/obsidian").toJson()
		},
		"result": Item.of("create:netherite_backtank").toJson()
	}).id("create:crafting/appliances/netherite_backtank")

	// 喷气背包
	event.custom({
		"type": "create_jetpack:copy_nbt_mechanical_crafting",
		"pattern": [
			" PSP ",
			"PMBMP",
			"PFGFP",
			" C C "
		],
		"key": {
			"P": Ingredient.of("#forge:plates/brass").toJson(),
			"S": Item.of("create:shaft").toJson(),
			"M": Mechanisms.PRECISION.COM.toJson(),
			"B": Item.of("create:copper_backtank").toJson(),
			"F": Item.of("create:propeller").toJson(),
			"G": Item.of("immersiveengineering:glider").toJson(),
			"C": Item.of("create:chute").toJson()
		},
		"result": Item.of("create_jetpack:jetpack").toJson()
	}).id("create_jetpack:jetpack")

	// 隔热喷气背包
	event.custom({
		"type": "create_jetpack:copy_nbt_mechanical_crafting",
		"pattern": [
			" PSP ",
			"PMBMP",
			"PFGFP",
			" C C "
		],
		"key": {
			"P": Ingredient.of("#forge:plates/brass").toJson(),
			"S": Item.of("create:shaft").toJson(),
			"M": Mechanisms.PRECISION.COM.toJson(),
			"B": Item.of("create:netherite_backtank").toJson(),
			"F": Item.of("create:propeller").toJson(),
			"G": Item.of("immersiveengineering:glider").toJson(),
			"C": Item.of("create:chute").toJson()
		},
		"result": Item.of("create_jetpack:netherite_jetpack").toJson()
	}).id("create_jetpack:netherite_jetpack")

	event.custom({
		"type": "create_jetpack:copy_nbt_mechanical_crafting",
		"pattern": [
			"PDMDP",
			"PFBFP",
			" SPS "
		],
		"key": {
			"P": Ingredient.of("#forge:plates/steel").toJson(),
			"D": Ingredient.of("#forge:plates/dense_obsidian").toJson(),
			"M": Mechanisms.NETHER.COM.toJson(),
			"F": Ingredient.of("#forge:fabric_hemp").toJson(),
			"B": Item.of("create_jetpack:jetpack").toJson(),
			"S": Ingredient.of("#forge:plates/obsidian").toJson()
		},
		"result": Item.of("create_jetpack:netherite_jetpack").toJson()
	}).id("create_jetpack:netherite_jetpack_upgrade")

	// 对称之杖
	create.mechanical_crafting("create:wand_of_symmetry", [
		" A ",
		"ARA",
		" M ",
		" B ",
		" H "
	], {
		A: "#forge:plates/andesite_alloy",
		R: "#forge:ingots/refined_radiance",
		M: Mechanisms.PRECISION.COM,
		B: "#forge:ingots/brass",
		H: "#forge:ingots/hepatizon"
	}).id("create:mechanical_crafting/wand_of_symmetry")

	// 指挥棒
	create.mechanical_crafting("fluidlogistics:hand_pointer", [
		" A ",
		"ARA",
		" M ",
		" B ",
		" H "
	], {
		A: "#forge:plates/andesite_alloy",
		R: "create:brass_hand",
		M: Mechanisms.PRECISION.COM,
		B: "#forge:ingots/brass",
		H: "#forge:ingots/hepatizon"
	})
})
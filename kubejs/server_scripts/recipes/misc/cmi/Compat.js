ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 玻璃瓶
	kubejs.shaped("3x minecraft:glass_bottle", [
		"A A",
		" A "
	], {
		A: ["#forge:glass", "#forge:prisms/polished_quartz"]
	}).id("minecraft:glass_bottle")

	// TNT
	kubejs.shaped("minecraft:tnt", [
		"AA",
		"AA"
	], {
		A: "cmi:trinitrotoluene"
	}).id("minecraft:tnt")

	// 冰
	kubejs.shapeless("minecraft:ice", [
		"4x ad_astra:ice_shard"
	])

	// 浮冰
	kubejs.shapeless("minecraft:packed_ice", [
		"4x minecraft:ice"
	])

	// 蓝冰
	kubejs.shapeless("minecraft:blue_ice", [
		"4x minecraft:packed_ice"
	])

	// 旗帜
	CmiGlobal.DYE_COLOR_GROUP.forEach((color) => {
		kubejs.shaped(`ad_astra:${color}_flag`, [
			"RFF",
			"RFF",
			"RD "
		], {
			R: "#forge:rods/iron",
			F: "#forge:fabric_hemp",
			D: `#forge:dyes/${color}`
		}).id(`ad_astra:${color}_flag`)
	})

	// 暗影钢
	kubejs.shapeless("create:shadow_steel", [
		"create:chromatic_compound",
		"#forge:dusts/void"
	])

	// 合成蓝图
	kubejs.shapeless("create:crafting_blueprint", [
		"#forge:nuggets/iron",
		"tconstruct:pattern",
		"minecraft:paper",
		"minecraft:paper"
	]).id("create:crafting/appliances/crafting_blueprint")

	// 蓝图
	kubejs.shapeless("create:empty_schematic", [
		"#forge:nuggets/iron",
		"minecraft:paper"
	]).id("create:crafting/schematics/empty_schematic")
})
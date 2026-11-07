ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 玻璃瓶
	kubejs.shaped("3x minecraft:glass_bottle", [
		"A A",
		" A "
	], {
		A: ["#forge:glass", "#forge:prisms/polished_quartz"]
	}).id("minecraft:glass_bottle")

	// 桶
	kubejs.shaped("minecraft:bucket", [
		"A A",
		" A "
	], {
		A: "#forge:plates/andesite_alloy"
	})

	// 催生器
	kubejs.shaped("cmi:accelerator", [
		"ABA",
		"CDC",
		"AEA"
	], {
		A: "#forge:stone",
		B: "#create:mechanisms/gold",
		C: "#create:mechanisms/stone",
		D: "#forge:gems/charged_amethyst",
		E: Mechanisms.IRON.COM
	}).id("cmi:accelerator")

	// 水井
	kubejs.shaped("cmi:water_well", [
		"ACA",
		"ABA",
		"AAA"
	], {
		A: "#forge:treated_wood",
		B: Mechanisms.COPPER.COM,
		C: "#forge:plates/iron"
	})

	// 熔岩井
	kubejs.shaped("cmi:lava_well", [
		"ACA",
		"ABA",
		"AAA"
	], {
		A: "tconstruct:nahuatl",
		B: Mechanisms.NETHER.COM,
		C: "#forge:plates/iron"
	})

	// 烈焰血井
	kubejs.shaped("cmi:blazing_blood_well", [
		"ACA",
		"ABA",
		"AAA"
	], {
		A: "tconstruct:blazewood",
		B: Mechanisms.NETHER.COM,
		C: "#forge:plates/iron"
	})

	// TNT
	kubejs.shaped("minecraft:tnt", [
		"AA",
		"AA"
	], {
		A: "cmi:trinitrotoluene"
	}).id("minecraft:tnt")

	// 群系指南针
	kubejs.shaped("naturescompass:naturescompass", [
		"AAA",
		"ABA",
		"CDC"
	], {
		A: "#minecraft:leaves",
		B: "minecraft:compass",
		C: "#minecraft:saplings",
		D: Mechanisms.WOODEN.COM
	}).id("naturescompass:natures_compass")

	// 结构指南针
	kubejs.shaped("explorerscompass:explorerscompass", [
		"AAA",
		"ABA",
		"CDC"
	], {
		A: "#forge:stone",
		B: "minecraft:compass",
		C: "minecraft:flint",
		D: Mechanisms.STONE.COM
	}).id("explorerscompass:explorers_compass")

	// 泥炭块
	kubejs.shaped("cmi:peat_block", [
		"AA",
		"AA"
	], {
		A: "cmi:peat"
	})

	// 黄铜楼梯
	kubejs.shaped("4x cmi:brass_stairs", [
		"A  ",
		"AA ",
		"AAA"
	], {
		A: "#forge:storage_blocks/brass"
	})

	// 恩特罗锭
	kubejs.shaped("cmi:entro_block", [
		"AAA",
		"AAA",
		"AAA"
	], {
		A: "#forge:gems/entro"
	})

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

	// 草绳
	kubejs.shapeless("cmi:grass_string", [
		"3x cmi:grass_fiber"
	])

	// 泥炭
	kubejs.shapeless("4x cmi:peat", [
		"cmi:peat_block"
	])

	// 暗影钢
	kubejs.shapeless("create:shadow_steel", [
		"create:chromatic_compound",
		"#forge:dusts/void"
	])

	kubejs.shapeless("9x cmi:entro_crystal", [
		"cmi:entro_block"
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

	// 矿藏粉末块
	kubejs.shaped("cmi:deposit_dust_block", [
		"AAA",
		"AAA",
		"AAA"
	], {
		A: "#forge:dusts/deposit"
	})

	event.custom({
		"type": "functionalstorage:custom_compacting",
		"higher_input": Item.of("cmi:deposit_dust_block"),
		"lower_input": Item.of("cmi:deposit_dust", 9)
	})

	// 钻井机冷却液端口
	kubejs.shapeless("cmi:driller_cooler_input_bus", [
		"cmi:airtight_casing",
		"cmi:nuke_cooler",
		"#forge:plates/industrial_iron"
	])
	kubejs.shapeless("cmi:driller_cooler_output_bus", [
		"cmi:airtight_casing",
		"cmi:nuke_cooler",
		"#forge:plates/industrial_iron"
	])

	// 水晶块
	kubejs.shaped("cmi:crystal_block", [
		"AA",
		"AA"
	], {
		A: "neoecoae:crystal_ingot"
	})

	kubejs.shapeless("4x neoecoae:crystal_ingot", [
		"cmi:crystal_block"
	])
})
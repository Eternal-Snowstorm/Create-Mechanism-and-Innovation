ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 木齿轮
	kubejs.shaped("cmi:wooden_gear", [
		" A ",
		"ABA",
		" A "
	], {
		A: "#minecraft:planks",
		B: "#forge:rods/wooden"
	})

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

	// 橡胶手
	kubejs.shaped("create:brass_hand", [
		" A ",
		"BBB",
		" B "
	], {
		A: "#forge:ingots/andesite_alloy",
		B: "thermal:cured_rubber"
	}).id("create:crafting/kinetics/brass_hand")

	// 冲击桩
	kubejs.shaped("cmi:impact_pile", [
		"A",
		"B",
		"B"
	], {
		A: "#forge:plates/invar",
		B: "#forge:rods/netherite"
	})

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

	// 红石线圈
	kubejs.shaped("4x immersiveengineering:wirecoil_redstone", [
		" A ",
		"ABA",
		" A "
	], {
		A: "#forge:wires/signalum",
		B: "#forge:rods/wooden"
	}).id("immersiveengineering:crafting/wirecoil_redstone")

	// 红石通量线圈
	kubejs.shaped("2x thermal:rf_coil", [
		"BAC",
		"A A",
		"CAB"
	], {
		A: "#forge:wires/signalum",
		B: "#forge:rods/gold",
		C: "#forge:plates/gold"
	}).id("thermal:rf_coil")

	// 萤石流明管道
	kubejs.shaped("2x cmi:glowstone_lumen_tube", [
		"CAB",
		"A A",
		"BAC"
	], {
		A: "#forge:wires/lumium",
		B: "#forge:rods/cobalt",
		C: "#forge:plates/cobalt"
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

	// 繁星核心
	kubejs.shaped("cmi:astral_core", [
		"ABA",
		"BCB",
		"ABA"
	], {
		A: "#forge:ingots/brass",
		B: "#forge:plates/electrum",
		C: "#forge:gems/charged_amethyst"
	})

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

	// 地图定位器
	kubejs.shaped("railway_automation:map_locator", [
		" A ",
		" B ",
		" C "
	], {
		A: "#forge:ingots/andesite_alloy",
		B: "minecraft:map",
		C: "#minecraft:planks"
	}).id("railway_automation:map_locator")

	// 铁路放置器
	kubejs.shaped("railway_automation:track_placer", [
		" M ",
		"ECE",
		"PRP"
	], {
		M: Mechanisms.RAILWAY.COM,
		E: "create:transmitter",
		C: Casing.RAILWAY,
		P: "#forge:plates/iron",
		R: "#create:tracks"
	}).id("railway_automation:track_placer")

	// 黏土模具
	kubejs.shapeless("4x cmi:blank_clay_mold", [
		"minecraft:clay"
	])

	kubejs.shapeless("cmi:blank_clay_mold", [
		"minecraft:clay_ball"
	])

	// 太阳能板
	kubejs.shaped("mekanismgenerators:solar_panel", [
		"ABA",
		"CMC",
		" C "
	], {
		A: "#forge:glass_panes",
		B: "#forge:plates/silicon",
		C: "#forge:plates/copper",
		M: Mechanisms.PHOTO.COM
	}).id("mekanismgenerators:solar_panel")


})
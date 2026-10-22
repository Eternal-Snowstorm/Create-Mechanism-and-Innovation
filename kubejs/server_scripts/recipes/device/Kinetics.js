ServerEvents.recipes((event) => {
	let { kubejs, create } = event.getRecipes()

	// 处理设备
	// 置物台
	kubejs.shapeless("create:depot", [
		Casing.ANDESITE,
		"#forge:plates/andesite"
	]).id("create:crafting/kinetics/depot")

	// 动力辊压机
	kubejs.shaped("create:mechanical_press", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "cmi:hammer_head"
	}).id("create:crafting/kinetics/mechanical_press")

	// 动力搅拌器
	kubejs.shaped("create:mechanical_mixer", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "create:whisk",
	}).id("create:crafting/kinetics/mechanical_mixer")

	// 鼓风机
	kubejs.shaped("create:encased_fan", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "create:propeller",
	}).id("create:crafting/kinetics/encased_fan")

	// 工作盆盖板
	kubejs.shaped("createdieselgenerators:basin_lid", [
		"ABA",
		"C C"
	], {
		A: "#forge:plates/andesite_alloy",
		B: "#forge:ingots/andesite_alloy",
		C: "thermal:rubberwood_planks"
	})

	// 动力轴承
	kubejs.shaped("create:mechanical_bearing", [
		"X",
		"C",
		"M"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#minecraft:planks",
	}).id("create:crafting/kinetics/mechanical_bearing")

	// 动力活塞
	kubejs.shaped("create:mechanical_piston", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "create:piston_extension_pole",
	}).id("create:crafting/kinetics/mechanical_piston")

	// 起重机轴承
	kubejs.shaped("create:gantry_carriage", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#create:cogwheel",
	}).id("create:crafting/kinetics/gantry_carriage")

	// 弹射置物台
	kubejs.shapeless("create:weighted_ejector",
		["create:depot",
			Mechanisms.ANDESITE.COM
		]).id("create:crafting/kinetics/weighted_ejector")

	// 石磨
	kubejs.shaped("create:millstone", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#forge:stone",
	}).id("create:crafting/kinetics/millstone")

	// 动力收割机
	kubejs.shaped("create:mechanical_harvester", [
		"XXX",
		" C ",
		" M "
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#forge:rods/andesite",
	}).id("create:crafting/kinetics/mechanical_harvester")

	// 动力犁
	kubejs.shaped("create:mechanical_plough", [
		"XXX",
		" C ",
		" M "
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#forge:plates/andesite_alloy",
	}).id("create:crafting/kinetics/mechanical_plough")

	// 动力压路机
	kubejs.shaped("2x create:mechanical_roller", [
		"CX ",
		"XMX",
		" X "
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#forge:plates/andesite_alloy",
	}).id("create:crafting/kinetics/mechanical_roller")

	// 振动台
	kubejs.shaped("vintageimprovements:vibrating_table", [
		" Y ",
		"XMX",
		" C "
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#vintageimprovements:springs/andesite",
		Y: "#minecraft:planks",
	}).id("vintageimprovements:craft/vibrating_table")

	// 轧机
	kubejs.shaped("createaddition:rolling_mill", [
		" M ",
		"XYX",
		" C "
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#forge:plates/andesite_alloy",
		Y: "#create:shaft",
	}).id("createaddition:crafting/rolling_mill")

	// 卷簧机
	kubejs.shaped("vintageimprovements:spring_coiling_machine", [
		"X",
		"C",
		"M"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "vintageimprovements:spring_coiling_machine_wheel",
	}).id("vintageimprovements:craft/spring_coiling_machine")

	// 冲压机
	kubejs.shaped("vintageimprovements:curving_press", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: ["#forge:plates/iron", "#forge:plates/andesite_alloy"]
	}).id("vintageimprovements:craft/curving_press")

	// 机械手
	kubejs.shaped("create:deployer", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "create:brass_hand"
	}).id("create:crafting/kinetics/deployer")

	// 动力锯
	kubejs.shaped("create:mechanical_saw", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "thermal:saw_blade"
	}).id("create:crafting/kinetics/mechanical_saw")

	// 动力钻头
	kubejs.shaped("create:mechanical_drill", [
		"M",
		"C",
		"X"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "thermal:drill_head"
	}).id("create:crafting/kinetics/mechanical_drill")

	// 列车装配站
	kubejs.shaped("create:cart_assembler", [
		"ABA",
		"C C"
	], {
		A: "thermal:redstone_servo",
		B: Mechanisms.ANDESITE.COM,
		C: "#forge:plates/industrial_iron"
	}).id("create:crafting/kinetics/cart_assembler")

	// 离心机
	kubejs.shaped("vintageimprovements:centrifuge", [
		"P P",
		"LML",
		"SCS"
	], {
		P: "#forge:plates/andesite_alloy",
		L: "#minecraft:logs",
		M: Mechanisms.ANDESITE.COM,
		S: "#vintageimprovements:springs/andesite",
		C: Casing.ANDESITE
	}).id("vintageimprovements:craft/centrifuge")

	// 发条轴承
	kubejs.shaped("create:clockwork_bearing", [
		"P",
		"C",
		"M"
	], {
		P: "#forge:plates/andesite_alloy",
		C: Casing.BRASS,
		M: Mechanisms.ANDESITE.COM
	}).id("create:crafting/kinetics/clockwork_bearing")

	// 升降机滑轮
	kubejs.shaped("create:elevator_pulley", [
		"C",
		"B",
		"M"
	], {
		C: Casing.BRASS,
		B: "thermal:cured_rubber_block",
		M: Mechanisms.ANDESITE.COM
	}).id("create:crafting/kinetics/elevator_pulley")

	// 控制器
	kubejs.shaped("create:contraption_controls", [
		"A",
		"C",
		"M"
	], {
		A: "create_connected:control_chip",
		C: Casing.ANDESITE,
		M: Mechanisms.ANDESITE.COM
	}).id("create:crafting/kinetics/contraption_controls")

	// 压缩机
	kubejs.shaped("vintageimprovements:vacuum_chamber", [
		" M ",
		"YCY",
		" X "
	], {
		M: Mechanisms.STEAM.COM,
		C: Casing.BRONZE,
		X: "create:mechanical_pump",
		Y: "#vintageimprovements:springs/bronze"
	}).id("vintageimprovements:craft/vacuum_chamber")

	// 动力臂
	kubejs.shaped("create:mechanical_arm", [
		"APK",
		"PS ",
		"MC "
	], {
		A: "#forge:ingots/andesite_alloy",
		P: "#forge:plates/brass",
		S: "#vintageimprovements:small_springs/bronze",
		K: Mechanisms.ANDESITE.COM,
		M: Mechanisms.PRECISION.COM,
		C: Casing.BRASS
	}).id("create:crafting/kinetics/mechanical_arm")

	// 动力合成器
	kubejs.shaped("3x create:mechanical_crafter", [
		"M",
		"C",
		"B"
	], {
		M: Mechanisms.PRECISION.COM,
		C: Casing.BRASS,
		B: "create:crafting_blueprint"
	}).id("create:crafting/kinetics/mechanical_crafter")

	// 可控燃烧室
	kubejs.shaped("createdieselgenerators:burner", [
		" B ",
		"AMA",
		" C "
	], {
		A: "#forge:plates/andesite_alloy",
		B: "#forge:plates/brass",
		M: Mechanisms.NETHER.COM,
		C: "create:empty_blaze_burner"
	}).id("createdieselgenerators:crafting/burner")

	// 特斯拉线圈
	create.mechanical_crafting("createaddition:tesla_coil", [
		"PAP",
		" I ",
		"BMB",
		"VCV"
	], {
		P: "#forge:plates/copper",
		A: "immersiveengineering:coil_lv",
		I: "#forge:ingots/andesite_alloy",
		B: "#forge:plates/brass",
		M: Mechanisms.COIL.COM,
		V: "#forge:plates/vanadium",
		C: Casing.BRASS
	}).id("createaddition:mechanical_crafting/tesla_coil")

	// 激光雕刻机
	create.mechanical_crafting("vintageimprovements:laser", [
		"VCV",
		"RMR",
		" G ",
		"PLP"
	], {
		V: "#forge:plates/vanadium",
		C: Casing.BRASS,
		R: "thermal:rf_coil",
		M: Mechanisms.PRECISION.COM,
		G: "#forge:gears/iron",
		P: "#forge:plates/industrial_iron",
		L: "vintageimprovements:laser_item"
	}).id("vintageimprovements:craft/laser")

	// 磨砂机
	kubejs.shaped("cmi:mechanical_belt_grinder", [
		"B",
		"C",
		"M"
	], {
		B: "vintageimprovements:grinder_belt",
		C: Casing.BRASS,
		M: Mechanisms.PRECISION.COM
	})

	// 马达
	kubejs.shaped("cmi:accelerator_motor", [
		"S",
		"C",
		"M"
	], {
		S: "#create:shaft",
		C: Casing.ANDESITE,
		M: Mechanisms.ANDESITE.COM
	})

	// 钻头
	kubejs.shaped("create_rns:mine_head", [
		"AA ",
		"ADI",
		" II"
	], {
		A: "#forge:ingots/andesite_alloy",
		D: "thermal:drill_head",
		I: "#forge:ingots/iron"
	}).id("create_rns:mine_head")

	// 开采轴承
	kubejs.shaped("create_rns:miner_bearing", [
		" P ",
		"ACA",
		" M "
	], {
		P: "#forge:plates/stone",
		A: "create_rns:polished_resonant_amethyst",
		C: Casing.ANDESITE,
		M: Mechanisms.ANDESITE.COM
	}).id("create_rns:miner_bearing")

	// 共振器
	kubejs.shaped("create_rns:resonator", [
		"T",
		"C"
	], {
		T: "cmi:resonant_tube",
		C: Casing.BRASS
	}).id("create_rns:resonator")

	create.mechanical_crafting("create_rns:stabilizing_resonator", [
		"DPD",
		"DPD",
		"SRS",
		"OOO"
	], {
		D: "#forge:dusts/certus_quartz",
		P: "#forge:plates/brass",
		S: "#forge:plates/stone",
		R: "create_rns:resonator",
		O: "#forge:plates/obsidian"
	}).id("create_rns:mechanical_crafting/stabilizing_resonator")

	create.mechanical_crafting("create_rns:shattering_resonator", [
		"DPD",
		"DPD",
		"SRS",
		"OOO"
	], {
		D: "#forge:dusts/redstone",
		P: "#forge:plates/brass",
		S: "#forge:plates/stone",
		R: "create_rns:resonator",
		O: "#forge:plates/obsidian"
	}).id("create_rns:mechanical_crafting/shattering_resonator")

	// 共振缓冲
	create.mechanical_crafting("create_rns:resonance_buffer", [
		"PTP",
		" B ",
		"PTP"
	], {
		P: "#forge:plates/stone",
		T: "cmi:resonant_tube",
		B: "#forge:storage_blocks/amethyst"
	}).id("create_rns:mechanical_crafting/resonance_buffer")
})
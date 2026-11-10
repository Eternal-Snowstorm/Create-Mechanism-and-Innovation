ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

    // 流体管道
    kubejs.shaped("8x create:fluid_pipe", [
        "AAA",
        "   ",
        "AAA"
    ], {
        A: "#forge:plates/copper"
    }).id("create:crafting/kinetics/fluid_pipe")

    kubejs.shaped("8x copycats:copycat_fluid_pipe", [
        "AAA",
        "   ",
        "AAA"
    ], {
        A: "#forge:plates/zinc"
    }).id("copycats:crafting/copycat_fluid_pipe")

	// 流体储罐阀门
	kubejs.shapeless("2x fluidlogistics:fluid_hatch", [
		"2x #forge:plates/copper",
		"#forge:plates/industrial_iron"
	]).id("create_dragons_plus:crafting/fluid_hatch")

	// 分液池
	kubejs.shaped("create:item_drain", [
		"X",
		"M",
		"C"
	], {
		M: Mechanisms.COPPER.COM,
		X: "minecraft:iron_bars",
		C: Casing.COPPER
	}).id("create:crafting/kinetics/item_drain")

	// 注液器
	verticalDevice(kubejs, "create:spout", "create:crafting/kinetics/spout", {
		M: Mechanisms.COPPER.COM,
		X: "thermal:cured_rubber",
		C: Casing.COPPER
	})

	// 高级注液器
	kubejs.shaped("steam_letters:advanced_spout", [
		"ABA",
		"CDC",
		" E "
	], {
		A: ["#forge:ingots/bronze", "#forge:plates/bronze"],
		B: "vintageimprovements:redstone_module",
		C: Mechanisms.COPPER.COM,
		D: "create:spout",
		E: "thermal:cured_rubber"
	}).id("steam_letters:crafting/shaped/advanced_spout")

	// 智能管道
	kubejs.shaped("2x create:smart_fluid_pipe", [
		"B",
		"P",
		"M"
	], {
		B: "#forge:plates/brass",
		P: "create:fluid_pipe",
		M: Mechanisms.COPPER.COM
	}).id("create:crafting/kinetics/smart_fluid_pipe")

	// 阀门
	kubejs.shaped("2x create:fluid_valve", [
		"I",
		"P",
		"M"
	], {
		I: "#forge:plates/iron",
		P: "create:fluid_pipe",
		M: Mechanisms.COPPER.COM
	}).id("create:crafting/kinetics/fluid_valve")

	// 软管滑轮
	kubejs.shaped("create:hose_pulley", [
		"C",
		"X",
		"M"
	], {
		M: Mechanisms.COPPER.COM,
		X: "thermal:cured_rubber_block",
		C: Casing.COPPER
	}).id("create:crafting/kinetics/hose_pulley")

	// 抽油机油泵
	kubejs.shaped("createdieselgenerators:pumpjack_hole", [
		" M ",
		"BCB",
		" A "
	], {
		M: Mechanisms.COPPER.COM,
		C: Casing.COPPER,
		B: "minecraft:chain",
		A: "create:fluid_pipe"
	}).id("createdieselgenerators:crafting/pumpjack_hole")

	// 智能龙头
	kubejs.shaped("fluidlogistics:smart_faucet", [
		"A",
		"B",
		"C"
	], {
		A: "#forge:plates/brass",
		B: Mechanisms.COPPER.COM,
		C: "#forge:plates/copper"
	}).id("fluidlogistics:smart_faucet")

	// 流体泵
	kubejs.shapeless("fluidlogistics:fluid_pump", [
		"create:fluid_pipe",
		"#create:shaft"
	]).id("fluidlogistics:fluid_pump")

	// 流体漏斗
	kubejs.shaped("fluidlogistics:smart_hopper", [
		"A A",
		"BMB",
		" A "
	], {
		A: "#forge:plates/copper",
		B: "#forge:plates/brass",
		M: Mechanisms.COPPER.COM
	}).id("fluidlogistics:smart_hopper")

	// 流体溜槽
	kubejs.shaped("4x fluidlogistics:fluid_transporter", [
		"A",
		"B",
		"A"
	], {
		A: "#forge:plates/copper",
		B: "#forge:ingots/copper"
	}).id("fluidlogistics:fluid_transporter")

	// 流体溜槽
	kubejs.shaped("16x fluidlogistics:fluid_transporter", [
		"A A",
		" B ",
		"A A"
	], {
		A: "#forge:plates/copper",
		B: Mechanisms.COPPER.COM
	})

	// 流体接口
	kubejs.shaped("fluidlogistics:multi_fluid_access_port", [
		" A ",
		"AMI",
		" A "
	], {
		A: "#forge:plates/brass",
		I: "#forge:plates/industrial_iron",
		M: Mechanisms.COPPER.COM
	}).id("fluidlogistics:multi_fluid_access_port")

    // 黄铜管道
    kubejs.shaped("8x ad_astra:desh_fluid_pipe", [
        "AAA",
        "   ",
        "AAA"
    ], {
        A: "#forge:plates/brass"
    }).id("ad_astra:desh_fluid_pipe")

    // 铸铁管道
    kubejs.shaped("8x ad_astra:ostrum_fluid_pipe", [
        "AAA",
        "   ",
        "AAA"
    ], {
        A: "#forge:plates/cast_iron"
    }).id("ad_astra:ostrum_fluid_pipe")
})
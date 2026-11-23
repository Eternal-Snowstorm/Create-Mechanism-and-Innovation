ServerEvents.recipes((event) => {
	let { kubejs, create } = event.getRecipes()

	// 钻头
	kubejs.shaped("create_rns:mine_head", [
		"AA ",
		"ABC",
		" CC"
	], {
		A: "#forge:ingots/andesite_alloy",
		B: "thermal:drill_head",
		C: "#forge:ingots/iron"
	}).id("create_rns:mine_head")

	// 开采轴承
	kubejs.shaped("create_rns:miner_bearing", [
		" A ",
		"BCB",
		" D "
	], {
		A: "#forge:plates/stone",
		B: "create_rns:polished_resonant_amethyst",
		C: Casing.ANDESITE,
		D: Mechanisms.ANDESITE.COM
	}).id("create_rns:miner_bearing")

	// 共振器
	kubejs.shaped("create_rns:resonator", [
		"A",
		"B"
	], {
		A: "cmi:resonant_tube",
		B: Casing.BRASS
	}).id("create_rns:resonator")

	// 稳定共振器
	create.mechanical_crafting("create_rns:stabilizing_resonator", [
		"ABA",
		"ABA",
		"CDC",
		"EEE"
	], {
		A: "#forge:dusts/certus_quartz",
		B: "#forge:plates/brass",
		C: "#forge:plates/stone",
		D: "create_rns:resonator",
		E: "#forge:plates/obsidian"
	}).id("create_rns:mechanical_crafting/stabilizing_resonator")

	// 破碎共振器
	create.mechanical_crafting("create_rns:shattering_resonator", [
		"ABA",
		"ABA",
		"CDC",
		"EEE"
	], {
		A: "#forge:dusts/redstone",
		B: "#forge:plates/brass",
		C: "#forge:plates/stone",
		D: "create_rns:resonator",
		E: "#forge:plates/obsidian"
	}).id("create_rns:mechanical_crafting/shattering_resonator")

	// 共振缓冲
	create.mechanical_crafting("create_rns:resonance_buffer", [
		"ABA",
		" C ",
		"ABA"
	], {
		A: "#forge:plates/stone",
		B: "cmi:resonant_tube",
		C: "#forge:storage_blocks/amethyst"
	}).id("create_rns:mechanical_crafting/resonance_buffer")

	// 抽油机曲柄
	create.mechanical_crafting("2x createdieselgenerators:pumpjack_crank", [
		"ABA",
		" C ",
		"DED",
		"FCF",
		"FFF"
	], {
		A: ["#forge:ingots/industrial_iron", "#forge:plates/industrial_iron"],
		B: "#forge:plates/invar",
		C: "#create:shaft",
		D: "#forge:storage_blocks/industrial_iron",
		E: Mechanisms.LIGHT.COM,
		F: ["#forge:ingots/steel", "#forge:plates/steel"]
	}).id("createdieselgenerators:mechanical_crafting/pumpjack_crank")

	// 抽油机驴头
	create.mechanical_crafting("2x createdieselgenerators:pumpjack_head", [
		"A A",
		"BCB",
		"A A"
	], {
		A: ["#forge:ingots/steel", "#forge:plates/steel"],
		B: ["#forge:ingots/industrial_iron", "#forge:plates/industrial_iron"],
		C: "thermal:cured_rubber_block"
	}).id("createdieselgenerators:crafting/pumpjack_head")

	// 抽油机轴承
	create.mechanical_crafting("2x createdieselgenerators:pumpjack_bearing", [
		"ABA",
		"CDC",
		"ABA"
	], {
		A: ["#forge:ingots/industrial_iron", "#forge:plates/industrial_iron"],
		B: ["#forge:ingots/steel", "#forge:plates/steel"],
		C: Mechanisms.LIGHT.COM,
		D: ["create:windmill_bearing", "create:mechanical_bearing", "create:clockwork_bearing"]
	}).id("createdieselgenerators:crafting/pumpjack_bearing")
})
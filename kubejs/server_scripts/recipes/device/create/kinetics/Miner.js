// Create: Ruins and Structures · 采矿与共振
ServerEvents.recipes((event) => {
	let { kubejs, create } = event.getRecipes()

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

	// 稳定共振器
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

	// 破碎共振器
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

	// 抽油机曲柄
	create.mechanical_crafting("2x createdieselgenerators:pumpjack_crank", [
		"ABA",
		" C ",
		"EDE",
		"FCF",
		"FFF"
	], {
		A: ["#forge:ingots/industrial_iron", "#forge:plates/industrial_iron"],
		B: "#forge:plates/invar",
		C: "#create:shaft",
		D: Mechanisms.LIGHT.COM,
		E: "#forge:storage_blocks/industrial_iron",
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

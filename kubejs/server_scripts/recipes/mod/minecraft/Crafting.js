ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 熔炉
	kubejs.shaped("minecraft:furnace", [
		"AAA",
		"A A",
		"BBB"
	], {
		A: "#forge:stone",
		B: "#forge:flints"
	}).id("minecraft:furnace")

	// 切石机
	kubejs.shaped("minecraft:stonecutter", [
		" A ",
		"BBB"
	], {
		A: "#forge:plates/iron",
		B: "#forge:stone"
	}).id("minecraft:stonecutter")

	// 箱子
	kubejs.shaped("4x minecraft:chest", [
		"AAA",
		"A A",
		"AAA"
	], {
		A: "#minecraft:logs"
	})

	// 高炉
	kubejs.shaped("minecraft:blast_furnace", [
		"AAA",
		"ABA",
		"CCC"
	], {
		A: "#forge:plates/andesite_alloy",
		B: "minecraft:furnace",
		C: "minecraft:smooth_stone"
	}).id("minecraft:blast_furnace")

	// 工业平台
	kubejs.shaped("industrial_platform:industrial_platform", [
		"ACB",
		"EDE",
		"EEE"
	], {
		A: "#forge:dyes/yellow",
		B: "#forge:dyes/black",
		C: "#forge:deepslate",
		D: "cmi:stone_mechanism",
		E: "#forge:stone"
	}).id("industrial_platform:platform")

	kubejs.shaped("industrial_platform:industrial_platform", [
		"BCA",
		"EDE",
		"EEE"
	], {
		A: "#forge:dyes/yellow",
		B: "#forge:dyes/black",
		C: "#forge:deepslate",
		D: "cmi:stone_mechanism",
		E: "#forge:stone"
	}).id("industrial_platform:platform_2")

	// 流体池
	kubejs.shaped("industrial_platform:fluid_pool", [
		"A B",
		"CDC",
		"CEC"
	], {
		A: "#forge:dyes/yellow",
		B: "#forge:dyes/black",
		C: "#forge:stone",
		D: "#forge:deepslate",
		E: "cmi:stone_mechanism",
	}).id("industrial_platform:pool")

	kubejs.shaped("industrial_platform:fluid_pool", [
		"B A",
		"CDC",
		"CEC"
	], {
		A: "#forge:dyes/yellow",
		B: "#forge:dyes/black",
		C: "#forge:stone",
		D: "#forge:deepslate",
		E: "cmi:stone_mechanism",
	}).id("industrial_platform:pool_2")

	// 蜘蛛网
	kubejs.shaped("minecraft:cobweb", [
		"A A",
		" A ",
		"A A"
	], {
		A: "#forge:string"
	})

	// 燧石锤子
	kubejs.shaped("cmi:flint_hammer", [
		"AAA",
		"ABA",
		" B "
	], {
		A: "minecraft:flint",
		B: "#forge:rods/wooden"
	})

	// 铁锤子
	kubejs.shaped("createdieselgenerators:hammer", [
		"AAA",
		"ABA",
		" B "
	], {
		A: "#forge:ingots/iron",
		B: "#forge:rods/wooden"
	}).id("createdieselgenerators:crafting/hammer")

	// 钻石锤子
	kubejs.shaped("cmi:diamond_hammer", [
		"AAA",
		"ABA",
		" B "
	], {
		A: "#forge:gems/diamond",
		B: "#forge:rods/wooden"
	})

	// 紫水晶簇
	kubejs.shaped("minecraft:amethyst_cluster", [
		"AAA",
		"AAA",
		"AAA"
	], {
		A: "#forge:gems/amethyst"
	})

	// 绿色染料
	kubejs.shapeless("2x minecraft:green_dye", [
		"#forge:dyes/yellow",
		"#forge:dyes/blue"
	])

	// 火药
	kubejs.shapeless("minecraft:gunpowder", [
		"#forge:dusts/sulfur",
		"2x #forge:dusts/niter",
		"3x #forge:dusts/charcoal"
	]).id("immersiveengineering:crafting/gunpowder_from_dusts")

	// 燧石
	kubejs.shapeless("2x minecraft:flint", [
		"3x minecraft:gravel"
	]).id("tconstruct:common/flint")

	// 光纤
	kubejs.shapeless("cmi:optical_fiber", [
		"4x cmi:glass_wire",
		"4x ae2:certus_quartz_dust",
		"thermal:cured_rubber"
	]).id("cmi:crafting/optical_fiber")

	// 工业铁方块
	kubejs.shaped("6x cmi:industrial_iron_slab", [
		"XXX"
	], {
		X: "create:industrial_iron_block"
	})

	kubejs.shaped("4x cmi:industrial_iron_stairs", [
		"X  ",
		"XX ",
		"XXX"
	], {
		X: "create:industrial_iron_block"
	})

	// 玻璃
	kubejs.shapeless("minecraft:glass", [
		"tconstruct:clear_glass"
	]).id("minecraft:glass")

	kubejs.shapeless("tconstruct:clear_glass", [
		"minecraft:glass"
	])
})
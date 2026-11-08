ServerEvents.recipes((event) => {
	let { kubejs, create, tconstruct } = event.getRecipes()
	const TEMPLATE = "cmi:drawer_upgrade_template"

	// 升级模板
	kubejs.shaped("2x cmi:drawer_upgrade_template", [
		"AAA",
		"BCB",
		"AAA"
	], {
		A: "#minecraft:planks",
		B: "#forge:stone",
		C: "cmi:wooden_mechanism"
	}).id("functionalstorage:upgrade_template")

	// 生铁
	tconstruct.casting_table("functionalstorage:iron_downgrade")
		.cast(TEMPLATE)
		.cast_consumed(true)
		.fluid(Fluid.of("tconstruct:molten_pig_iron", 180))
		.cooling_time(20 * 3)
		.id("functionalstorage:iron_downgrade")

	// 紫水晶青铜
	tconstruct.casting_table("functionalstorage:copper_upgrade")
		.cast(TEMPLATE)
		.cast_consumed(true)
		.fluid(Fluid.of("tconstruct:molten_amethyst_bronze", 720))
		.cooling_time(20 * 3)
		.id("functionalstorage:copper_upgrade")

	// 玫瑰金
	tconstruct.casting_table("functionalstorage:gold_upgrade")
		.cast(TEMPLATE)
		.cast_consumed(true)
		.fluid(Fluid.of("tconstruct:molten_rose_gold", 720))
		.cooling_time(20 * 3)
		.id("functionalstorage:gold_upgrade")

	// 钢
	tconstruct.casting_table("functionalstorage:diamond_upgrade")
		.cast(TEMPLATE)
		.cast_consumed(true)
		.fluid(Fluid.of("tconstruct:molten_steel", 360))
		.cooling_time(20 * 3)
		.id("functionalstorage:diamond_upgrade")

	// 黑色柯林斯青铜
	tconstruct.casting_table("functionalstorage:netherite_upgrade")
		.cast(TEMPLATE)
		.cast_consumed(true)
		.fluid(Fluid.of("tconstruct:molten_hepatizon", 360))
		.cooling_time(20 * 3)
		.id("functionalstorage:netherite_upgrade")

	// 虚空升级
	tconstruct.casting_table("functionalstorage:void_upgrade")
		.fluid(Fluid.of("tconstruct:molten_obsidian", 4000))
		.cast(TEMPLATE)
		.cast_consumed(true)
		.cooling_time(20 * 3)
		.id("functionalstorage:void_upgrade")

	// 输入升级
	create.deploying("functionalstorage:puller_upgrade", [
		TEMPLATE,
		"minecraft:hopper"
	]).id("functionalstorage:puller_upgrade")

	// 输出升级
	create.deploying("functionalstorage:pusher_upgrade", [
		"functionalstorage:puller_upgrade",
		"minecraft:redstone_torch"
	]).id("functionalstorage:pusher_upgrade")

	// 收集升级
	create.deploying("functionalstorage:collector_upgrade", [
		"functionalstorage:puller_upgrade",
		"minecraft:hopper"
	]).id("functionalstorage:collector_upgrade")

	// 红石升级
	create.deploying("functionalstorage:redstone_upgrade", [
		TEMPLATE,
		"minecraft:comparator"
	]).id("functionalstorage:redstone_upgrade")
})
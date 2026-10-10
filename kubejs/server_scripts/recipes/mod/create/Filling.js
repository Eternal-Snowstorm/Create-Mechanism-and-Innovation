ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 防腐木板
	create.filling("immersiveengineering:treated_wood_horizontal", [
		"#minecraft:planks",
		Fluid.of("immersiveengineering:creosote", 125)
	]).id("createaddition:filling/treated_wood_planks")

	// 石墨电极
	create.filling(Item.of("immersiveengineering:graphite_electrode").withNBT({
		Unbreakable: 1,
		Enchantments: [
			{}
		]
	}), [
		Fluid.of("cmi:hyper_experience", 1000),
		"immersiveengineering:graphite_electrode"
	])

	// 烈焰蛋糕
	create.filling("create:blaze_cake", [
		"create:blaze_cake_base",
		Fluid.of("minecraft:lava", 500)
	]).id("create:filling/blaze_cake")

	// 烈焰蛋糕
	create.filling("2x create:blaze_cake", [
		"create:blaze_cake_base",
		Fluid.of("tconstruct:blazing_blood", 500)
	]).id("create:filling/blaze_cake2")

	// 寒霜蛋糕
	create.filling("fluidlogistics:frost_cake", [
		"cmi:frost_cake_base",
		Fluid.of("tconstruct:powdered_snow", 500)
	]).id("fluidlogistics:cooling/frost_cake")

	// 寒霜蛋糕
	create.filling("2x fluidlogistics:frost_cake", [
		"cmi:frost_cake_base",
		Fluid.of("thermalconstruct:blizz_blood", 500)
	]).id("fluidlogistics:cooling/frost_cake2")

	// 寒霜蛋糕
	create.filling("4x fluidlogistics:frost_cake", [
		"cmi:frost_cake_base",
		Fluid.of("neoecoae:cryotheum_solution", 500)
	]).id("fluidlogistics:cooling/frost_cake3")

	// 超级刀
	create.filling("cmi:super_knife", [
		"farmersdelight:netherite_knife",
		Fluid.of("cmi:hyper_experience", 1000)
	])

	// 紫水晶
	create.filling("minecraft:small_amethyst_bud", [
		"#forge:dusts/amethyst",
		Fluid.of("cmi:crystal_catalyt", 50)
	])
	create.filling("minecraft:medium_amethyst_bud", [
		"minecraft:small_amethyst_bud",
		Fluid.of("cmi:crystal_catalyt", 50)
	])
	create.filling("minecraft:large_amethyst_bud", [
		"minecraft:medium_amethyst_bud",
		Fluid.of("cmi:crystal_catalyt", 50)
	])
	create.filling("minecraft:amethyst_cluster", [
		"minecraft:large_amethyst_bud",
		Fluid.of("cmi:crystal_catalyt", 50)
	])

	// 回响碎片
	create.filling("minecraft:echo_shard", [
		"cmi:charged_amethyst",
		Fluid.of("create_enchantment_industry:experience", 180)
	])

	// 高压蒸汽容器
	create.filling("steampowered:pressurized_steam_container", [
		"steampowered:pressurized_gas_container",
		CreateFluidIngredient.ofTagId("forge:steam", 1000)
	])

	// 幻晶原石
	create.filling("cmi:dreamcore_ore", [
		"cmi:dreamcore_seed",
		Fluid.of("cmi:crystal_catalyt", 200)
	])

	// 福鲁伊克斯线
	create.filling("cmi:fluix_wire", [
		"cmi:optical_fiber",
		Fluid.of("cmi:molten_fluix", 25)
	])

	// 扩容
	for (let level = 1; level <= 3; level++) {
		let input = level === 1
			? "minecraft:book"
			: Item.of("minecraft:enchanted_book")
				.enchant("create:capacity", level - 1)
				.strongNBT()

		let output = Item.of("minecraft:enchanted_book")
			.enchant("create:capacity", level)

		create.filling(output, [
			input,
			Fluid.of("tconstruct:molten_glass", 1000)
		])
	}
})
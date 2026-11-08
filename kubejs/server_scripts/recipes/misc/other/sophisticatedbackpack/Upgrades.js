ServerEvents.recipes((event) => {
	let { minecraft, tconstruct } = event.getRecipes()
	const BASE = "sophisticatedbackpacks:upgrade_base"

	// 堆叠青春版
	tconstruct.casting_table("sophisticatedbackpacks:stack_upgrade_starter_tier")
		.cast(BASE)
		.cast_consumed(true)
		.fluid(Fluid.of("cmi:molten_andesite_alloy", 720))
		.cooling_time(20 * 3)
		.id("sophisticatedbackpacks:stack_upgrade_starter_tier")

	// 堆叠T1
	tconstruct.casting_table("sophisticatedbackpacks:stack_upgrade_tier_1")
		.cast(BASE)
		.cast_consumed(true)
		.fluid(Fluid.of("tconstruct:molten_amethyst_bronze", 720))
		.cooling_time(20 * 3)
		.id("sophisticatedbackpacks:stack_upgrade_tier_1")

	// 堆叠T2
	tconstruct.casting_table("sophisticatedbackpacks:stack_upgrade_tier_2")
		.cast(BASE)
		.cast_consumed(true)
		.fluid(Fluid.of("tconstruct:molten_rose_gold", 720))
		.cooling_time(20 * 3)
		.id("sophisticatedbackpacks:stack_upgrade_tier_2")

	// 堆叠T3
	tconstruct.casting_table("sophisticatedbackpacks:stack_upgrade_tier_3")
		.cast(BASE)
		.cast_consumed(true)
		.fluid(Fluid.of("tconstruct:molten_steel", 720))
		.cooling_time(20 * 3)
		.id("sophisticatedbackpacks:stack_upgrade_tier_3")

	// 堆叠T4
	minecraft.smithing_transform(
		"sophisticatedbackpacks:stack_upgrade_tier_4",
		"minecraft:netherite_upgrade_smithing_template",
		"sophisticatedbackpacks:stack_upgrade_tier_3",
		"#forge:ingots/netherite"
	).id("sophisticatedbackpacks:stack_upgrade_tier_4")
})
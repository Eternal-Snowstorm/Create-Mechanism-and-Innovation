ServerEvents.recipes((event) => {
	let { tconstruct } = event.getRecipes()

	let castingMechanismMaterials = [
		["tconstruct:molten_iron", "cmi:iron_mechanism_basement", 1535],
		["tconstruct:molten_copper", "cmi:copper_mechanism_basement", 1085],
		["cmi:molten_andesite_alloy", "cmi:andesite_mechanism_basement", 760]
	]
	castingMechanismMaterials.forEach(([input, output, temp]) => {
		tconstruct.casting_table(output, Fluid.of(input, 90))
			.cast("#tconstruct:casts/multi_use/mechanism")
			.cooling_time(50)

		tconstruct.casting_table(output, Fluid.of(input, 90))
			.cast("#tconstruct:casts/single_use/mechanism")
			.cooling_time(50)
			.cast_consumed(true)

		tconstruct.melting(Fluid.of(input, 90))
			.ingredient(output)
			.temperature(temp)
			.time(100)
	})

	// 坚固板
	tconstruct.casting_table("create:sturdy_sheet")
		.fluid(Fluid.of("tconstruct:molten_obsidian", 90))
		.cast("#tconstruct:casts/multi_use/plate")
		.cooling_time(20 * 3)
		.cast_consumed(false)

	// 坚固板
	tconstruct.casting_table("create:sturdy_sheet")
		.fluid(Fluid.of("tconstruct:molten_obsidian", 90))
		.cast("#tconstruct:casts/single_use/plate")
		.cooling_time(20 * 3)
		.cast_consumed(true)

	// 丝绢
	tconstruct.casting_table("tconstruct:silky_cloth")
		.fluid(Fluid.of("tconstruct:molten_rose_gold", 90))
		.cast("farmersdelight:canvas")
		.cooling_time(20 * 2)
		.cast_consumed(true)
		.id("tconstruct:tools/modifiers/silky_cloth")

	// 铜工作台
	tconstruct.casting_basin("fluidlogistics:copper_basin")
		.fluid(Fluid.of("tconstruct:molten_copper", 90 * 8))
		.cast("create:basin")
		.cast_consumed(true)
		.cooling_time(20 * 4)
		.id("fluidlogistics:copper_basin")

	// 伊甸水晶
	tconstruct.casting_basin("cmi:eden_crystal")
		.fluid(Fluid.of("tconstruct:molten_electrum", 90 * 8))
		.cast("minecraft:amethyst_block")
		.cast_consumed(true)
		.cooling_time(20 * 4)

	// wc冰!
	tconstruct.casting_basin("minecraft:ice")
		.fluid(Fluid.of("minecraft:water", 1000))
		.cast("#forge:ice")
		.cooling_time(20)
		.cast_consumed(false)

	// 金构件铸模
	tconstruct.casting_table("cmi:mechanism_cast")
		.fluid(Fluid.of("tconstruct:molten_gold", 90))
		.cast("#create:mechanisms")
		.cooling_time(57)
		.cast_consumed(true)

	// 青铜构件铸模
	tconstruct.casting_table("cmi:bronze_mechanism_cast")
		.fluid(Fluid.of("tconstruct:molten_bronze", 360))
		.cast("#create:mechanisms")
		.cooling_time(57)
		.cast_consumed(true)

	// 沙子构件铸模
	tconstruct.molding_table("cmi:mechanism_sand_cast")
		.pattern("#create:mechanisms")
		.material("#tconstruct:casts/sand")

	// 红沙构件铸模
	tconstruct.molding_table("cmi:mechanism_red_sand_cast")
		.pattern("#create:mechanisms")
		.material("#tconstruct:casts/red_sand")

	// 安山合金
	tconstruct.casting_table("create:andesite_alloy")
		.fluid(Fluid.tag("tag", "cmi:andesite_alloy_material", 10))
		.cast("#forge:dusts/andesite")
		.cooling_time(20)
		.cast_consumed(true)

	// 青铜粒铸模
	tconstruct.casting_table("cmi:bronze_nugget_cast")
		.fluid(Fluid.of("tconstruct:molten_bronze", 360))
		.cast("#forge:nuggets")
		.cooling_time(57)
		.cast_consumed(true)

	// 熔铸炉控制器
	tconstruct.casting_basin("tconstruct:foundry_controller")
		.fluid(Fluid.of("tconstruct:molten_obsidian", 1000))
		.cast("tconstruct:scorched_alloyer")
		.cast_consumed(true)
		.cooling_time(220)
		.id("tconstruct:smeltery/casting/scorched/foundry_controller")

	// 机动栏杆系列
	tconstruct.casting_table("createdeco:andesite_bars")
		.fluid(Fluid.of("cmi:molten_andesite_alloy", 30))
		.cooling_time(35)

	// 石板
	tconstruct.casting_table("cmi:stone_plate")
		.cast("#tconstruct:casts/multi_use/plate")
		.fluid(Fluid.of("minecraft:lava", 100))
		.cooling_time(20 * 2)

	// 黏血球
	tconstruct.casting_table("cmi:blood_slime_ball")
		.fluid(Fluid.of("cmi:blood", 250))
		.cooling_time(20)

	// 人造皮革
	tconstruct.casting_table("immersiveengineering:ersatz_leather")
		.cast("immersiveengineering:hemp_fabric")
		.fluid(Fluid.of("thermal:resin", 125))
		.cooling_time(20 * 6)
		.cast_consumed(true)
		.id("immersiveengineering:crafting/ersatz_leather")

	// 石板
	tconstruct.casting_table("cmi:stone_plate")
		.cast("#tconstruct:casts/single_use/plate")
		.fluid(Fluid.of("minecraft:lava", 100))
		.cooling_time(20 * 2)
		.cast_consumed(true)

	// 列车时刻表
	tconstruct.casting_table("create:schedule")
		.fluid(Fluid.of("tconstruct:molten_gold", 45))
		.cast("#forge:plates/obsidian")
		.cooling_time(20)
		.cast_consumed(true)
		.id("create:crafting/kinetics/schedule")

	// 铸模
	tconstruct.casting_table("createdieselgenerators:mold")
		.fluid(Fluid.of("cmi:molten_industrial_iron", 90 * 2))
		.cooling_time(20 * 3)

	// 玻璃杆
	tconstruct.casting_table("cmi:glass_rod")
		.fluid(Fluid.of("tconstruct:molten_glass", 100))
		.cast("#tconstruct:casts/multi_use/rod")
		.cooling_time(20 * 2)
		.cast_consumed(false)

	// 强化高炉砖
	tconstruct.casting_basin("immersiveengineering:blastbrick_reinforced")
		.fluid(Fluid.of("tconstruct:molten_invar", 90 * 2))
		.cast("immersiveengineering:blastbrick")
		.cast_consumed(true)
		.cooling_time(20 * 2)
})
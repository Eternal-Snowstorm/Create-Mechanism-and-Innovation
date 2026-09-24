ServerEvents.recipes((event) => {
	let { create, thermal, thermal_extra, cmi, kubejs } = event.getRecipes()

	// 黑石源质
	thermal_extra.nitratic_igniter([
		"cmi:alpha_blackstone_source",
		"cmi:beta_blackstone_source",
		"cmi:gamma_blackstone_source"
	], [
		"minecraft:blackstone"
	])

	// Alpha
	// 晶体催生
	thermal.crystallizer("cmi:source_ruby", [
		Fluid.of("cmi:crystal_catalyt", 100),
		"cmi:alpha_blackstone_source"
	])
	// 磨制
	cmi.grinding("thermal:ruby", [
		"cmi:source_ruby"
	])
	// 磨粉
	thermal.pulverizer("thermal:ruby_dust", [
		"#forge:gems/ruby"
	])
	// 搓块
	kubejs.shaped("thermal:ruby_block", [
		"AAA",
		"AAA",
		"AAA",
	], {
		A: "#forge:gems/ruby"
	})
	// 分解
	kubejs.shapeless("9x thermal:ruby", [
		"#forge:storage_blocks/ruby"
	])
	// 溶解
	create.mixing(Fluid.of("cmi:chromium_solution", 200), [
		Fluid.of("mekanism:sulfuric_acid", 200),
		"#forge:dusts/ruby"
	])
	// 精炼
	thermal.refinery([
		"cmi:chromium_dust",
		Fluid.of("mekanism:sulfur_trioxide", 50)
	], [
		Fluid.of("cmi:chromium_solution", 200)
	])
	thermal_extra.advanced_refinery([
		"cmi:chromium_dust",
		Fluid.of("mekanism:sulfur_trioxide", 100)
	], [
		Fluid.of("cmi:chromium_solution", 200)
	])

	// Beta
	// 晶体催生
	thermal.crystallizer("cmi:source_sapphire", [
		Fluid.of("cmi:crystal_catalyt", 100),
		"cmi:beta_blackstone_source"
	])
	// 磨制
	cmi.grinding("thermal:sapphire", [
		"cmi:source_sapphire"
	])
	// 磨粉
	thermal.pulverizer("thermal:sapphire_dust", [
		"#forge:gems/sapphire"
	])
	// 搓块
	kubejs.shaped("thermal:sapphire_block", [
		"AAA",
		"AAA",
		"AAA",
	], {
		A: "#forge:gems/sapphire"
	})
	// 分解
	kubejs.shapeless("9x thermal:sapphire", [
		"#forge:storage_blocks/sapphire"
	])
	// //溶解
	// create.mixing(Fluid.of("cmi:titanium_solution", 200), [
	// 	Fluid.of("mekanism:sulfuric_acid", 200),
	// 	"#forge:dusts/sapphire"
	// ])
	// // 精炼
	// thermal.refinery([
	// 	"cmi:titanium_dust",
	// 	Fluid.of("mekanism:sulfur_trioxide", 50)
	// ], [
	// 	Fluid.of("cmi:titanium_solution", 200)
	// ])
	// thermal_extra.advanced_refinery([
	// 	"cmi:titanium_dust",
	// 	Fluid.of("mekanism:sulfur_trioxide", 100)
	// ], [
	// 	Fluid.of("cmi:titanium_solution", 200)
	// ])

	// Gamma
	// 晶体催生
	thermal.crystallizer("cmi:source_emeraid", [
		Fluid.of("cmi:crystal_catalyt", 100),
		"cmi:gamma_blackstone_source"
	])
	// 磨制
	cmi.grinding("minecraft:emerald", [
		"cmi:source_emeraid"
	])
	//溶解
	create.mixing(Fluid.of("cmi:cobalt_solution", 200), [
		Fluid.of("mekanism:sulfuric_acid", 200),
		"#forge:dusts/emerald"
	])
	// 精炼
	thermal.refinery([
		"thermalconstruct:cobalt_dust",
		Fluid.of("mekanism:sulfur_trioxide", 50)
	], [
		Fluid.of("cmi:cobalt_solution", 200)
	])
	thermal_extra.advanced_refinery([
		"thermalconstruct:cobalt_dust",
		Fluid.of("mekanism:sulfur_trioxide", 100)
	], [
		Fluid.of("cmi:cobalt_solution", 200)
	])

	// SO2
	thermal.pyrolyzer(Fluid.of("mekanism:sulfur_dioxide", 100), [
		"#forge:dusts/sulfur"
	])

	// Delta
	thermal.smelter("cmi:delta_blackstone_source", [
		"cmi:alpha_blackstone_source",
		"cmi:beta_blackstone_source",
		"cmi:gamma_blackstone_source"
	])

	// Delta溶液
	create.mixing(Fluid.of("cmi:delta_unstable_solution", 200), [
		"#cmi:delta_blackstone_source",
		"#forge:dusts/end_stone",
		Fluid.tag("tag", "forge:redstone_acid", 50)
	])

	// 铂溶液
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/silver").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "cmi:delta_unstable_solution", 100).toJson(),
		"result": Fluid.of("cmi:platinum_solution", 100).toJson()
	})

	// 脱水
	thermal_extra.endothermic_dehydrator("cmi:dirty_platinum_dust", [
		Fluid.of("cmi:platinum_solution", 100)
	])

	// 电镀液
	create.mixing(Fluid.of("cmi:plating_solution", 1000), [
		"#forge:dusts/chromium",
		Fluid.of("mekanism:sulfuric_acid", 500)
	])
})
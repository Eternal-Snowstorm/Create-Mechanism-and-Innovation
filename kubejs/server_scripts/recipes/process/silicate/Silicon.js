ServerEvents.recipes((event) => {
	let { create, vintageimprovements, immersiveengineering, mekanism } = event.getRecipes()

	// 硅混合物
	create.mixing([
		"cmi:silicon_mixture",
		Item.of("cmi:silicon_mixture", 2).withChance(0.1),
		Item.of("create:scorchia").withChance(0.5)
	], [
		"#forge:dusts/coal_coke",
		"#forge:dusts/pure_quartz",
		Fluid.of("tconstruct:seared_stone", 250)
	]).superheated()

	create.mixing([
		"cmi:silicon_mixture",
		Item.of("cmi:silicon_mixture", 2).withChance(0.1),
		Item.of("create:scoria").withChance(0.5)
	], [
		"#forge:dusts/coal_coke",
		"#forge:dusts/pure_quartz",
		Fluid.of("tconstruct:scorched_stone", 250)
	]).superheated()

	// 硅
	immersiveengineering.blast_furnace("ae2:silicon")
		.input("cmi:silicon_mixture")
		.slag("thermal:slag")
		.time(20 * 30)

	// 硅（电弧炉）
	immersiveengineering.arc_furnace("#forge:silicon")
		.input("cmi:silicon_mixture")
		.slag("#forge:slag")
		.additives([])
		.time(100)
		.energy(8000)

	// 硅板
	vintageimprovements.curving("ae2:printed_silicon", [
		"#forge:silicon"
	]).itemAsHead("cmi:plate_mold")

	// 碳化硅
	mekanism.metallurgic_infusing(
		"cmi:silicon_carbide",
		"ae2:silicon",
		"mekanism:carbon"
	)
	mekanism.metallurgic_infusing(
		"cmi:silicon_carbide",
		"ae2:silicon",
		"mekanism:diamond"
	)
})

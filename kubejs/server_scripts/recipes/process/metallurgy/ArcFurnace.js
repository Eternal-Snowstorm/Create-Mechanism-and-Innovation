ServerEvents.recipes((event) => {
	let { immersiveengineering } = event.getRecipes()

	// 不锈钢
	immersiveengineering.arc_furnace("#forge:ingots/stainless_steel")
		.input("#forge:ingots/steel")
		.slag("#forge:slag")
		.additives([
			"#forge:ingots/chromium",
			"#forge:ingots/invar"
		])
		.time(100)
		.energy(8000)

	// 钢
	immersiveengineering.arc_furnace("#forge:ingots/steel")
		.input("#forge:dusts/cast_iron")
		.slag("#forge:slag")
		.additives([
			"#forge:dusts/lime",
		])
		.time(400)
		.energy(8000)

	// 铝合金
	immersiveengineering.arc_furnace("3x #forge:ingots/aluminum_alloy")
		.input("2x #forge:ingots/aluminum")
		.slag("#forge:slag")
		.additives([
			"#forge:ingots/chromium",
			"2x #forge:dusts/energized_crystal"
		])
		.time(100)
		.energy(8000)
		.id("neoecoae:aluminum_alloy_dust")

	// 黑钨合金
	immersiveengineering.arc_furnace("3x #forge:ingots/black_tungsten_alloy")
		.input("2x #forge:ingots/tungsten")
		.slag("#forge:slag")
		.additives([
			"#forge:ingots/titanium",
			"2x #forge:dusts/energized_fluix_crystal"
		])
		.time(100)
		.energy(8000)
		.id("neoecoae:black_tungsten_alloy_dust")

	// 黄铜
	immersiveengineering.arc_furnace("4x create:brass_ingot")
		.input("3x #forge:ingots/copper")
		.additives([
			"#forge:ingots/zinc",
		])
		.time(400)
		.energy(8000)
		.id("immersiveengineering:arcfurnace/alloy_brass")

	// 琥珀金
	immersiveengineering.arc_furnace("4x thermal:rose_gold_ingot")
		.input("3x #forge:ingots/gold")
		.additives([
			"#forge:ingots/copper"
		])
		.time(400)
		.energy(8000)
		.id("immersiveengineering:arcfurnace/alloy_rose_gold")
})
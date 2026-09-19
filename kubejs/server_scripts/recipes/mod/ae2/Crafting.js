ServerEvents.recipes((event) => {
	let { kubejs, minecraft, create } = event.getRecipes()

	//包层线缆
	kubejs.shaped("8x ae2:fluix_covered_cable", [
		"AAA",
		"ABA",
		"AAA"
	], {
		A: "ae2:fluix_glass_cable",
		B: "thermal:cured_rubber"
	}).id("ae2:network/cables/covered_fluix")

	// 无限水元件
	let waterCell = Item.of("expatternprovider:infinity_cell")
		.withNBT({
			record: {
				"#c": "ae2:f",
				id: "minecraft:water"
			}
		})
	create.sequenced_assembly(waterCell, [
		"ae2:fluid_cell_housing"
	], [
		create.filling("ae2:fluid_cell_housing", [
			"ae2:fluid_cell_housing",
			Fluid.of("minecraft:water", 1000)
		]),
		create.deploying("ae2:fluid_cell_housing", [
			"ae2:fluid_cell_housing",
			"ae2:cell_component_16k"
		]),
		create.filling("ae2:fluid_cell_housing", [
			"ae2:fluid_cell_housing",
			Fluid.of("minecraft:water", 1000)
		]),
	]).transitionalItem("ae2:fluid_cell_housing")
		.loops(1)
		.id("expatternprovider:water_cell")

	// 无限圆石元件
	let cobblestoneCell = Item.of("expatternprovider:infinity_cell")
		.withNBT({
			record: {
				"#c": "ae2:i",
				id: "minecraft:cobblestone"
			}
		})
	create.sequenced_assembly(cobblestoneCell, [
		"ae2:item_cell_housing"
	], [
		create.filling("ae2:item_cell_housing", [
			"ae2:item_cell_housing",
			Fluid.of("minecraft:water", 1000)
		]),
		create.deploying("ae2:item_cell_housing", [
			"ae2:item_cell_housing",
			"ae2:cell_component_16k"
		]),
		create.filling("ae2:item_cell_housing", [
			"ae2:item_cell_housing",
			Fluid.of("minecraft:lava", 1000)
		])
	]).transitionalItem("ae2:item_cell_housing")
		.loops(1)
		.id("expatternprovider:cobblestone_cell")

	// 福鲁伊克斯色ME玻璃线缆
	kubejs.shaped("4x ae2:fluix_glass_cable", [
		"AA",
		"AA"
	], {
		A: "cmi:fluix_wire"
	})

	// 黑曜石元件
	let obsidianCell = Item.of("cmi:obsidian_cell")
		.withNBT({
			record: {
				"#c": "ae2:i",
				id: "minecraft:obsidian"
			}
		})
	create.sequenced_assembly(obsidianCell, [
		"ae2:item_cell_housing"
	], [
		create.filling("ae2:item_cell_housing", [
			"ae2:item_cell_housing",
			Fluid.of("minecraft:lava", 1000)
		]),
		create.deploying("ae2:item_cell_housing", [
			"ae2:item_cell_housing",
			"ae2:cell_component_16k"
		]),
		create.filling("ae2:item_cell_housing", [
			"ae2:item_cell_housing",
			Fluid.of("minecraft:water", 1000)
		])
	]).transitionalItem("ae2:item_cell_housing")
		.loops(1)
		.id("cmi:obsidian_cell")
})
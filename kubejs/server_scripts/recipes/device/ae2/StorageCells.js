// AE2 · 存储元件（清空原配方后重写外壳与 1k→256k 递推、空间元件）
ServerEvents.recipes((event) => {
	let { kubejs, create, thermal_extra, neoecoae } = event.getRecipes()
	const DRIVE = /^ae2:(?!.*portable)(?!.*spatial).*cell(?!.*workbench$).+$/;

	event.remove([
		{
			type: "minecraft:crafting_shaped",
			output: DRIVE
		}
	])

	// ME物品元件外壳
	kubejs.shaped("2x ae2:item_cell_housing", [
		"XYX",
		"YMY",
		"XYX"
	], {
		M: Mechanisms.WOODEN.COM,
		X: "#forge:plates/iron",
		Y: "ae2:quartz_glass",
	}).id("ae2:network/cells/item_cell_housing")

	// ME流体元件外壳
	kubejs.shaped("2x ae2:fluid_cell_housing", [
		"XYX",
		"YMY",
		"XYX"
	], {
		M: Mechanisms.COPPER.COM,
		X: "#forge:plates/copper",
		Y: "ae2:quartz_glass"
	}).id("ae2:network/cells/fluid_cell_housing")

	// ME化学元件外壳
	kubejs.shaped("2x appmek:chemical_cell_housing", [
		"PAP",
		"AMA",
		"PAP"
	], {
		P: "#forge:plates/osmium",
		A: "ae2:quartz_glass",
		M: Mechanisms.AIR.COM
	}).id("appmek:chemical_cell_housing")

	// 1k 存储单元
	thermal_extra.component_assembly("ae2:cell_component_1k", [
		"ae2:logic_processor",
		"#forge:plates/silver",
		"#forge:dusts/certus_quartz",
		"cmi:ferrit_core",
		Fluid.of("immersiveengineering:redstone_acid", 100)
	]).id("ae2:network/cells/item_storage_components_cell_1k_part")

	// 4k 存储单元
	kubejs.shapeless("ae2:cell_component_4k", [
		"2x ae2:cell_component_1k",
		"#forge:plates/silver"
	]).id("ae2:network/cells/item_storage_components_cell_4k_part")

	// 16k 存储单元
	kubejs.shapeless("ae2:cell_component_16k", [
		"3x ae2:cell_component_1k",
		"#forge:plates/silver"
	]).id("ae2:network/cells/item_storage_components_cell_16k_part")

	kubejs.shapeless("ae2:cell_component_16k", [
		"ae2:cell_component_1k",
		"ae2:cell_component_4k"
	])

	// 64k 存储单元
	kubejs.shapeless("ae2:cell_component_64k", [
		"4x ae2:cell_component_1k",
		"#forge:plates/silver"
	]).id("ae2:network/cells/item_storage_components_cell_64k_part")

	kubejs.shapeless("ae2:cell_component_64k", [
		"2x ae2:cell_component_1k",
		"ae2:cell_component_4k"
	])

	kubejs.shapeless("ae2:cell_component_64k", [
		"ae2:cell_component_1k",
		"ae2:cell_component_16k"
	])

	// 256k 存储单元
	kubejs.shapeless("ae2:cell_component_256k", [
		"5x ae2:cell_component_1k",
		"#forge:plates/silver"
	]).id("ae2:network/cells/item_storage_components_cell_256k_part")

	kubejs.shapeless("ae2:cell_component_256k", [
		"3x ae2:cell_component_1k",
		"ae2:cell_component_4k"
	])

	kubejs.shapeless("ae2:cell_component_256k", [
		"2x ae2:cell_component_1k",
		"ae2:cell_component_16k"
	])

	kubejs.shapeless("ae2:cell_component_256k", [
		"ae2:cell_component_1k",
		"ae2:cell_component_64k"
	])

	// 2^3空间组件
	thermal_extra.component_assembly("ae2:spatial_cell_component_2", [
		"ae2:engineering_processor",
		"#forge:plates/platinum",
		"ae2:fluix_dust",
		"cmi:ferrit_core"
	]).id("ae2:network/cells/spatial_components")

	// 16^3空间组件
	kubejs.shapeless("ae2:spatial_cell_component_16", [
		"2x ae2:spatial_cell_component_2",
		"#forge:plates/platinum"
	]).id("ae2:network/cells/spatial_components_0")

	// 128^3空间组件
	kubejs.shapeless("ae2:spatial_cell_component_128", [
		"3x ae2:spatial_cell_component_2",
		"#forge:plates/platinum"
	]).id("ae2:network/cells/spatial_components_1")

	kubejs.shapeless("ae2:spatial_cell_component_128", [
		"ae2:spatial_cell_component_2",
		"ae2:spatial_cell_component_16"
	])

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

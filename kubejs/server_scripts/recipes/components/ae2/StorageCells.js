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

	// ECO物品元件外壳
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:eco_item_cell_housing")
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 200))
		.inputItems([
			"8x #forge:plates/platinum",
			"8x #forge:plates/iron",
			"4x ae2:quartz_glass",
			Mechanisms.WOODEN.COM
		])
		.id("neoecoae:eco_item_cell_housing")

	// ECO流体元件外壳
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:eco_fluid_cell_housing")
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 200))
		.inputItems([
			"8x #forge:plates/platinum",
			"8x #forge:plates/copper",
			"4x ae2:quartz_glass",
			Mechanisms.COPPER.COM
		])
		.id("neoecoae:eco_fluid_cell_housing")

	// ECO化学元件外壳
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:eco_chemical_cell_housing")
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 200))
		.inputItems([
			"8x #forge:plates/platinum",
			"8x #forge:plates/osmium",
			"4x ae2:quartz_glass",
			Mechanisms.AIR.COM
		])
		.id("neoecoae:eco_chemical_cell_housing")

	// 1k 存储单元
	thermal_extra.component_assembly("ae2:cell_component_1k", [
		"ae2:logic_processor",
		"#forge:plates/silver",
		"#forge:dusts/certus_quartz",
		"cmi:ferrit_core",
		Fluid.of("immersiveengineering:redstone_acid", 100)
	]).id("ae2:network/cells/item_storage_components_cell_1k_part")

	// 4k 存储单元
	thermal_extra.component_assembly("ae2:cell_component_4k", [
		"2x ae2:cell_component_1k",
		"#forge:plates/silver"
	]).id("ae2:network/cells/item_storage_components_cell_4k_part")

	// 16k 存储单元
	thermal_extra.component_assembly("ae2:cell_component_16k", [
		"3x ae2:cell_component_1k",
		"#forge:plates/silver"
	]).id("ae2:network/cells/item_storage_components_cell_16k_part")

	thermal_extra.component_assembly("ae2:cell_component_16k", [
		"ae2:cell_component_1k",
		"ae2:cell_component_4k"
	])

	// 64k 存储单元
	thermal_extra.component_assembly("ae2:cell_component_64k", [
		"4x ae2:cell_component_1k",
		"#forge:plates/silver"
	]).id("ae2:network/cells/item_storage_components_cell_64k_part")

	thermal_extra.component_assembly("ae2:cell_component_64k", [
		"2x ae2:cell_component_1k",
		"ae2:cell_component_4k"
	])

	thermal_extra.component_assembly("ae2:cell_component_64k", [
		"ae2:cell_component_1k",
		"ae2:cell_component_16k"
	])

	// 256k 存储单元
	thermal_extra.component_assembly("ae2:cell_component_256k", [
		"5x ae2:cell_component_1k",
		"#forge:plates/silver"
	]).id("ae2:network/cells/item_storage_components_cell_256k_part")

	thermal_extra.component_assembly("ae2:cell_component_256k", [
		"3x ae2:cell_component_1k",
		"ae2:cell_component_4k"
	])

	thermal_extra.component_assembly("ae2:cell_component_256k", [
		"2x ae2:cell_component_1k",
		"ae2:cell_component_16k"
	])

	thermal_extra.component_assembly("ae2:cell_component_256k", [
		"ae2:cell_component_1k",
		"ae2:cell_component_64k"
	])

	// 16M 存储单元
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:eco_cell_component_16m")
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"16x ae2:cell_component_256k",
			"4x cmi:magnetic_contact",
			"4x #forge:plates/platinum",
			"4x #forge:dusts/energized_crystal",
			"4x #forge:alloys/enriched",
			Processor.SUPERCONDUCTING
		])
		.id("neoecoae:eco_cell_component_16m")

	// 64M 存储单元
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:eco_cell_component_64m")
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"4x neoecoae:eco_cell_component_16m",
			"4x #forge:plates/platinum",
			"4x #forge:dusts/energized_crystal",
			"4x #mekanism:alloys/infused",
			Processor.SUPERCONDUCTING
		])
		.id("neoecoae:eco_cell_component_64m")

	// 256M 存储单元
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:eco_cell_component_256m")
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.inputItems([
			"4x neoecoae:eco_cell_component_64m",
			"4x #forge:plates/platinum",
			"4x #forge:dusts/energized_crystal",
			"4x #forge:alloys/elite",
			Processor.SUPERCONDUCTING
		])
		.id("neoecoae:eco_cell_component_256m")

	// L4 闪存
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:eco_computation_cell_l4")
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 200))
		.inputItems([
			"neoecoae:eco_cell_component_16m",
			"4x #forge:plates/stainless_steel",
			"2x #forge:plates/energized_superconductive",
			"2x #forge:plates/platinum",
			"2x #forge:gems/energized_fluix_crystal",
			"neoecoae:crystal_matrix",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:eco_computation_cell_l4")

	// L6 闪存
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:eco_computation_cell_l6")
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 200))
		.inputItems([
			"neoecoae:eco_cell_component_64m",
			"4x #forge:plates/stainless_steel",
			"2x #forge:plates/energized_superconductive",
			"2x #forge:plates/platinum",
			"2x #forge:gems/energized_fluix_crystal",
			"neoecoae:crystal_matrix",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:eco_computation_cell_l6")

	// L9 闪存
	neoecoae.integrated_working_station()
		.itemOutput("neoecoae:eco_computation_cell_l9")
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 200))
		.inputItems([
			"neoecoae:eco_cell_component_256m",
			"4x #forge:plates/stainless_steel",
			"2x #forge:plates/energized_superconductive",
			"2x #forge:plates/platinum",
			"2x #forge:gems/energized_fluix_crystal",
			"neoecoae:crystal_matrix",
			Mechanisms.COMPUTE.COM
		])
		.id("neoecoae:eco_computation_cell_l9")

	// 2^3空间组件
	thermal_extra.component_assembly("ae2:spatial_cell_component_2", [
		"ae2:engineering_processor",
		"#forge:plates/platinum",
		"ae2:fluix_dust",
		"cmi:ferrit_core"
	]).id("ae2:network/cells/spatial_components")

	// 16^3空间组件
	thermal_extra.component_assembly("ae2:spatial_cell_component_16", [
		"2x ae2:spatial_cell_component_2",
		"#forge:plates/platinum"
	]).id("ae2:network/cells/spatial_components_0")

	// 128^3空间组件
	thermal_extra.component_assembly("ae2:spatial_cell_component_128", [
		"3x ae2:spatial_cell_component_2",
		"#forge:plates/platinum"
	]).id("ae2:network/cells/spatial_components_1")

	thermal_extra.component_assembly("ae2:spatial_cell_component_128", [
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
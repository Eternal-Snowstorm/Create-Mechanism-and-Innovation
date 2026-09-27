ServerEvents.recipes((event) => {
	let { minecraft } = event.getRecipes()

	minecraft.stonecutting("immersiveengineering:sheetmetal_iron", "#forge:plates/iron")
	minecraft.stonecutting("#forge:plates/iron", "immersiveengineering:sheetmetal_iron")

	minecraft.stonecutting("immersiveengineering:sheetmetal_copper", "#forge:plates/copper")
	minecraft.stonecutting("#forge:plates/copper", "immersiveengineering:sheetmetal_copper")

	minecraft.stonecutting("immersiveengineering:sheetmetal_steel", "#forge:plates/steel")
	minecraft.stonecutting("#forge:plates/steel", "immersiveengineering:sheetmetal_steel")

	minecraft.stonecutting("immersiveengineering:sheetmetal_aluminum", "#forge:plates/aluminum")
	minecraft.stonecutting("#forge:plates/aluminum", "immersiveengineering:sheetmetal_aluminum")

	minecraft.stonecutting("immersiveengineering:sheetmetal_lead", "#forge:plates/lead")
	minecraft.stonecutting("#forge:plates/lead", "immersiveengineering:sheetmetal_lead")

	minecraft.stonecutting("immersiveengineering:sheetmetal_silver", "#forge:plates/silver")
	minecraft.stonecutting("#forge:plates/silver", "immersiveengineering:sheetmetal_silver")

	minecraft.stonecutting("immersiveengineering:sheetmetal_uranium", "#forge:plates/uranium")
	minecraft.stonecutting("#forge:plates/uranium", "immersiveengineering:sheetmetal_uranium")

	minecraft.stonecutting("immersiveengineering:sheetmetal_nickel", "#forge:plates/nickel")
	minecraft.stonecutting("#forge:plates/nickel", "immersiveengineering:sheetmetal_nickel")

	minecraft.stonecutting("immersiveengineering:sheetmetal_constantan", "#forge:plates/constantan")
	minecraft.stonecutting("#forge:plates/constantan", "immersiveengineering:sheetmetal_constantan")

	minecraft.stonecutting("immersiveengineering:sheetmetal_electrum", "#forge:plates/electrum")
	minecraft.stonecutting("#forge:plates/electrum", "immersiveengineering:sheetmetal_electrum")

	minecraft.stonecutting("immersiveengineering:sheetmetal_gold", "#forge:plates/gold")
	minecraft.stonecutting("#forge:plates/gold", "immersiveengineering:sheetmetal_gold")

	minecraft.stonecutting("4x minecraft:pointed_dripstone", "minecraft:dripstone_block")

	minecraft.stonecutting("2x immersiveengineering:alu_scaffolding_standard", "#forge:plates/aluminum")
		.id("immersiveengineering:crafting/alu_scaffolding_standard")
	minecraft.stonecutting("immersiveengineering:alu_scaffolding_standard", "immersiveengineering:alu_scaffolding_wooden_top")
		.id("immersiveengineering:crafting/alu_scaffolding_standard_from_wooden_top")
	minecraft.stonecutting("immersiveengineering:alu_scaffolding_standard", "immersiveengineering:alu_scaffolding_grate_top")

	minecraft.stonecutting("immersiveengineering:alu_scaffolding_grate_top", "immersiveengineering:alu_scaffolding_standard")
		.id("immersiveengineering:crafting/alu_scaffolding_grate_top_from_standard")
	minecraft.stonecutting("immersiveengineering:alu_scaffolding_grate_top", "immersiveengineering:alu_scaffolding_wooden_top")

	minecraft.stonecutting("immersiveengineering:alu_scaffolding_wooden_top", "immersiveengineering:alu_scaffolding_grate_top")
		.id("immersiveengineering:crafting/alu_scaffolding_wooden_top_from_grate_top")
	minecraft.stonecutting("immersiveengineering:alu_scaffolding_wooden_top", "immersiveengineering:alu_scaffolding_standard")

	minecraft.stonecutting("2x immersiveengineering:steel_scaffolding_standard", "#forge:plates/steel")
		.id("immersiveengineering:crafting/steel_scaffolding_standard")
	minecraft.stonecutting("immersiveengineering:steel_scaffolding_standard", "immersiveengineering:steel_scaffolding_wooden_top")
		.id("immersiveengineering:crafting/steel_scaffolding_standard_from_wooden_top")
	minecraft.stonecutting("immersiveengineering:steel_scaffolding_standard", "immersiveengineering:steel_scaffolding_grate_top")

	minecraft.stonecutting("immersiveengineering:steel_scaffolding_grate_top", "immersiveengineering:steel_scaffolding_standard")
		.id("immersiveengineering:crafting/steel_scaffolding_grate_top_from_standard")
	minecraft.stonecutting("immersiveengineering:steel_scaffolding_grate_top", "immersiveengineering:steel_scaffolding_wooden_top")

	minecraft.stonecutting("immersiveengineering:steel_scaffolding_wooden_top", "immersiveengineering:steel_scaffolding_grate_top")
		.id("immersiveengineering:crafting/steel_scaffolding_wooden_top_from_grate_top")
	minecraft.stonecutting("immersiveengineering:steel_scaffolding_wooden_top", "immersiveengineering:steel_scaffolding_standard")

	minecraft.stonecutting("2x cmi:industrial_iron_slab", "create:industrial_iron_block")
	minecraft.stonecutting("cmi:industrial_iron_stairs", "create:industrial_iron_block")

	let treatedWood = [
		"immersiveengineering:treated_scaffold",
		"immersiveengineering:treated_wood_vertical",
		"immersiveengineering:treated_wood_packaged",
		"immersiveengineering:stairs_treated_wood_vertical",
		"immersiveengineering:stairs_treated_wood_horizontal",
		"immersiveengineering:stairs_treated_wood_packaged",
		"2x immersiveengineering:slab_treated_wood_horizontal",
		"2x immersiveengineering:slab_treated_wood_packaged",
		"2x immersiveengineering:slab_treated_wood_vertical",
		"6x immersiveengineering:treated_fence"
	]
	treatedWood.forEach((wood) => {
		minecraft.stonecutting(wood, "#forge:treated_wood")
	})

	let blazeWood = [
		"cmi:blazewood_scaffold",
		"2x tconstruct:blazewood_slab",
		"tconstruct:blazewood_stairs",
		"6x tconstruct:blazewood_fence"
	]
	blazeWood.forEach((wood) => {
		minecraft.stonecutting(wood, "tconstruct:blazewood")
	})

	let nahuatlWood = [
		"cmi:nahuatl_scaffold",
		"2x tconstruct:nahuatl_slab",
		"tconstruct:nahuatl_stairs",
		"6x tconstruct:nahuatl_fence"
	]
	nahuatlWood.forEach((wood) => {
		minecraft.stonecutting(wood, "tconstruct:nahuatl")
	})

	let barTypes = [
		"brass",
		"copper",
		"industrial_iron",
		"zinc"
	]
	barTypes.forEach((type) => {
		minecraft.stonecutting(`3x createdeco:${type}_bars`, `#forge:ingots/${type}`)
	})
})
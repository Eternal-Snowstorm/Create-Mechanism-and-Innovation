StartupEvents.modifyCreativeTab("kubejs:tab", (event) => {
	removeItemFromCreativeTab(event, [
		"#forge:chem_salts",
		"#create:mechanisms",
		"#create:incomplete_mechanisms",
		"#tconstruct:casts/multi_use/mechanism",
		"#tconstruct:casts/single_use/mechanism",
		"#tconstruct:casts/multi_use/nugget",
		`#${Cmi.MODID}:io_debug_block`,
		`#${Cmi.MODID}:mechanism_parts`,
		`#${Cmi.MODID}:metals`,
		`#${Cmi.MODID}:ores`,
		`#${Cmi.MODID}:raw_metals`,
		`#${Cmi.MODID}:ore_nodes`,
		`#${Cmi.MODID}:dev_doll`,
		`#${Cmi.MODID}:block/machine_block`,
		`#${Cmi.MODID}:incomplete_items`
	]).setDisplayName(Component.translatable(`itemGroup.${Cmi.MODID}.all`))
})

StartupEvents.modifyCreativeTab("create:base", (event) => {
	event.add([
		"create:chromatic_compound",
		"create:shadow_steel",
		"create:refined_radiance",
		"create:shadow_steel_casing",
		"create:refined_radiance_casing"
	])
})

StartupEvents.modifyCreativeTab("thermal_extra:resources", (event) => {
	event.add([
		"thermal_extra:polyolefin_plate"
	])
})

StartupEvents.modifyCreativeTab("tconstruct:smeltery", (event) => {
	event.add([
		"cmi:mechanism_cast",
		"cmi:mechanism_sand_cast",
		"cmi:mechanism_red_sand_cast"
	])
})

StartupEvents.modifyCreativeTab("thermalconstruct:thermal_construct_tab", (event) => {
	event.add([
		"cmi:bronze_mechanism_cast",
		"cmi:bronze_nugget_cast"
	])
})

StartupEvents.modifyCreativeTab("functionalstorage:main", (event) => {
	event.setIcon("functionalstorage:cherry_1")
})

StartupEvents.modifyCreativeTab("minecraft:tools_and_utilities", (event) => {
	removeItemFromCreativeTab(event, [
		"@mekanism"
	]).add([
		"mbd2:mbd_gadgets"
	])
})

StartupEvents.modifyCreativeTab("minecraft:redstone_blocks", (event) => {
	removeItemFromCreativeTab(event, [
		"@mekanism",
		"@mekanismgenerators",
		"mbd2:mbd_gadgets"
	])
})

StartupEvents.modifyCreativeTab("minecraft:functional_blocks", (event) => {
	event.remove("@mekanism")
})

StartupEvents.modifyCreativeTab("minecraft:ingredients", (event) => {
	removeItemFromCreativeTab(event, [
		"@mekanism",
		"@thermal",
		"@cmi",
		"@immersiveengineering",
		"@create"
	])
})


StartupEvents.modifyCreativeTab("thermal:thermal.items", (event) => {
	removeItemFromCreativeTab(event, [
		"@cmi"
	]).addBefore("thermal:rf_coil", [
		"thermal:laser_diode"
	])
})

StartupEvents.modifyCreativeTab("thermal:thermal.devices", (event) => {
	event.addBefore("thermal:device_tree_extractor", [
		"thermal:device_hive_extractor"
	])
})

StartupEvents.modifyCreativeTab("cmi:mechanisms", (event) => {
	addIngredientToCreativeTab(event, Ingredient.of("#cmi:block/machine_block"))
	addIngredientToCreativeTab(event, Ingredient.of("#cmi:mechanism_parts"))
})

/**
 * 
 * @param {Internal.CreativeTabEvent_} event 
 * @param {Ingredient_[]} removeItems 
 * @returns {Internal.CreativeTabEvent_}
 */
function removeItemFromCreativeTab(event, removeItems) {

	removeItems.forEach((item) => {
		event.remove(item)
	})

	return event
}

/**
 * 
 * @param {Internal.CreativeTabEvent_} event 
 * @param {Internal.Ingredient} ingredient 
 * @returns {Internal.CreativeTabEvent_}
 */
function addIngredientToCreativeTab(event, ingredient) {
	if (ingredient.checkInvalidation()) {
		console.warn("Invalid Ingredient!")
		return
	}

	let itemIds = ingredient.getItemIds()["toArray(java.lang.Object[])"]([""])

	itemIds.forEach((item) => {
		event.add(item)
	})

	return event
}
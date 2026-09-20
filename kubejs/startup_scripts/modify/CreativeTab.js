StartupEvents.modifyCreativeTab("kubejs:tab", (event) => {
	event.setDisplayName(Component.translatable(`itemGroup.${Cmi.MODID}.all`))

	let removeItemFromCreativeTab = [
		`#${Cmi.MODID}:io_debug_block`,
		"#forge:chem_salts",
		"#create:mechanisms",
		"#create:incomplete_mechanisms",
		`#${Cmi.MODID}:mechanism_parts`,
		`#${Cmi.MODID}:mechanism_flash_drives`,
		"#tconstruct:casts/multi_use/mechanism",
		"#tconstruct:casts/single_use/mechanism",
		"#tconstruct:casts/multi_use/nugget",
		`#${Cmi.MODID}:metals`,
		`#${Cmi.MODID}:ores`,
		`#${Cmi.MODID}:raw_metals`,
		`#${Cmi.MODID}:ore_nodes`,
		`#${Cmi.MODID}:dev_doll`,
		`#${Cmi.MODID}:block/machine_block`
	]
	removeItemFromCreativeTab.forEach((item) => {
		event.remove(item)
	})
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
	event.remove([
		"@mekanism"
	])

	event.add([
		"mbd2:mbd_gadgets"
	])
})
StartupEvents.modifyCreativeTab("minecraft:redstone_blocks", (event) => {
	event.remove([
		"@mekanism",
		"@mekanismgenerators",
		"mbd2:mbd_gadgets"
	])
})
StartupEvents.modifyCreativeTab("minecraft:functional_blocks", (event) => {
	event.remove([
		"@mekanism"
	])
})
StartupEvents.modifyCreativeTab("minecraft:ingredients", (event) => {
	event.remove([
		"@mekanism",
		"@create",
		"@thermal",
		"@cmi",
		"@immersiveengineering"
	])
})

StartupEvents.modifyCreativeTab("thermal:thermal.items", (event) => {
	event.addBefore("thermal:rf_coil", [
		"thermal:laser_diode"
	])
})

StartupEvents.modifyCreativeTab("thermal:thermal.devices", (event) => {
	event.addBefore("thermal:device_tree_extractor", [
		"thermal:device_hive_extractor"
	])
})

StartupEvents.modifyCreativeTab("cmi:mechanisms", (event) => {
	Ingredient.of("#cmi:mechanism_flash_drives")
		.getItemIds()
		.forEach((flashDrive) => {
			event.add(flashDrive)
		})
	Ingredient.of("#cmi:block/machine_block")
		.getItemIds()
		.forEach((machineBlock) => {
			event.add(machineBlock)
		})
	Ingredient.of("#cmi:mechanism_parts")
		.getItemIds()
		.forEach((mechanismParts) => {
			event.add(mechanismParts)
		})
})
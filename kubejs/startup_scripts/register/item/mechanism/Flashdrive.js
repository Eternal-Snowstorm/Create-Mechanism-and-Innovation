StartupEvents.registry("item", (event) => {
	// 已编程闪存盘
	// event.create(`${Cmi.MODID}:programmed_flash_drive`)
	// 	.texture(`${Cmi.MODID}:item/mechanism/flash_drive/programmed`)
	// 	.tag(`${Cmi.MODID}:mechanism_flash_drives`)
	// 	.tag(`${Cmi.MODID}:mechanism_flash_drives/blank`)

	// 精密
	// event.create(`${Cmi.MODID}:precision_mechanism_flash_drive`)
	// 	.texture(`${Cmi.MODID}:item/mechanism/flash_drive/precision`)
	// 	.tag(`${Cmi.MODID}:mechanism_flash_drives`)
	// 	.tag(`${Cmi.MODID}:mechanism_flash_drives/precision`)

	// 红石
	// event.create(`${Cmi.MODID}:redstone_mechanism_flash_drive`)
	// 	.texture(`${Cmi.MODID}:item/mechanism/flash_drive/redstone`)
	// 	.tag(`${Cmi.MODID}:mechanism_flash_drives`)
	// 	.tag(`${Cmi.MODID}:mechanism_flash_drives/redstone`)

	let mechanismRegister = [
		"nature",
		"wooden",
		"stone",
		"iron",
		"copper",
		"andesite",
		"bronze",
		"photosensitive",
		"gold",
		"cobalt",
		"nether",
		"thermal",
		"reinforced",
		// "resonant",
		"railway",
		"ender",
		"light_engineering",
		"heavy_engineering",
		"enchanted",
		"smart",
		"computing",
		"air_tight",
		"tier_1_aviation",
		"tier_2_aviation",
		"tier_3_aviation",
		"tier_4_aviation",
		"basic_mekanism",
		"advanced_mekanism",
		"elite_mekanism",
		"ultimate_mekanism",
		"nuclear",
		"antimatter",
		"coil",
		"sculk",
		"colorful",
		"creative",
		"pig_iron",
		"potion",
	]
	// mechanismRegister.forEach((material) => {
	// 	event.create(`${Cmi.MODID}:${material}_mechanism_flash_drive`)
	// 		.texture(`${Cmi.MODID}:item/mechanism/flash_drive/${material}`)
	// 		.tag(`${Cmi.MODID}:mechanism_flash_drives`)
	// 		.tag(`${Cmi.MODID}:mechanism_flash_drives/${material}`)
	// })
})
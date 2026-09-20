StartupEvents.registry("painting_variant", (event) => {

	addPainting("girl_of_cmi", 64, 64)

	// EternalSnowstorm
	addPainting("bug_is_right", 32, 16)
	addPainting("it_must_be_optifine", 16, 32)

	// RandomMechanism(随机构件)
	addPainting("random_mechanism_old", 32, 32)
	addPainting("random_mechanism", 32, 32)

	// Qi_Month
	addPainting("qi_month", 64, 64)

	// ⑨Dropper_QWQ⑨
	addPainting("sacabambaspis", 32, 32)

	//Re_Construction
	addPainting("ue_sit", 32, 32)
	addPainting("couple", 48, 48)
	addPainting("cuo", 32, 32)
	addPainting("win98", 128, 128)

	//driver
	addPainting("driver_advanced_mek", 16, 16)
	addPainting("driver_basic_mek", 16, 16)
	addPainting("driver_elite_mek", 16, 16)
	addPainting("driver_ultimate_mek", 16, 16)
	addPainting("driver_andesite", 16, 16)
	addPainting("driver_antimatter", 16, 16)
	addPainting("driver_cobalt", 16, 16)
	addPainting("driver_coil", 16, 16)
	addPainting("driver_colorful", 16, 16)
	addPainting("driver_copper", 16, 16)
	addPainting("driver_enchanted", 16, 16)
	addPainting("driver_ender", 16, 16)
	addPainting("driver_reinforced", 16, 16)
	addPainting("driver_gold", 16, 16)
	addPainting("driver_heavy_engineering", 16, 16)
	addPainting("driver_iron", 16, 16)
	addPainting("driver_light_engineering", 16, 16)
	addPainting("driver_nature", 16, 16)
	addPainting("driver_nether", 16, 16)
	addPainting("driver_nuclear", 16, 16)
	addPainting("driver_photosensitive", 16, 16)
	addPainting("driver_pig_iron", 16, 16)
	addPainting("driver_precision", 16, 16)
	addPainting("driver_resonant", 16, 16)
	addPainting("driver_sculk", 16, 16)
	addPainting("driver_stone", 16, 16)
	addPainting("driver_thermal", 16, 16)
	addPainting("driver_train", 16, 16)
	addPainting("driver_wooden", 16, 16)

	/**
	 * 
	 * @param {string} name 
	 * @param {number} width 
	 * @param {number} height 
	 * @returns 
	 */
	function addPainting(name, width, height) {
		let builder = event.create(`${Cmi.MODID}:${name}`)
		builder.width(width)
		builder.height(height)
		builder.tag("minecraft:placeable")

		return builder
	}
})
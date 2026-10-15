StartupEvents.registry("block", (event) => {
	/**
	 * 
	 * @param {string} name 注册id
	 * @returns
	 */
	function addRadarBlock(name) {
		return event.create(`${Cmi.MODID}:${name}`)
			.soundType(SoundType.NETHERITE_BLOCK)
			.waterlogged()
			.hardness(-1)
			.resistance(-1)
			.model(Cmi.loadResource(`block/radar/normal/${name}`))
	}

	/**
	 * 
	 * @param {string} name 注册id
	 * @returns
	 */
	function addBrokenRadarBlock(name) {
		return event.create(`${Cmi.MODID}:broken_${name}`)
			.soundType(SoundType.NETHERITE_BLOCK)
			.waterlogged()
			.hardness(-1)
			.resistance(-1)
			.model(Cmi.loadResource(`block/radar/broken/${name}`))
	}

	/**
	 * 
	 * @param {string} name 
	 * @param {Color_} color 
	 */
	function addConcreteBlock(name, color) {
		event.create(`${Cmi.MODID}:${name}_reinforced_concrete`)
			.soundType(SoundType.METAL)
			.noDrops()
			.requiresTool(true)
			.textureAll(Cmi.loadResource("block/custom/reinforced_concrete/main"))
			.color(color)
			.tagBlock(CmiToolType.PICKAXE.tag())
			.tagBlock(CmiMiningLevel.IRON.tag())
			.tagBlock("ae2:blacklisted/spatial")
			.tagBlock("mekanism:cardboard_blacklist")
			.hardness(50)
			.resistance(-1)
			.item((item) => {
				item.color(color)
			})
	}

	addConcreteBlock("gray", 0x565656)
	addConcreteBlock("white", 0xFFFFFF)
	addConcreteBlock("light_gray", 0xA0A3A5)
	addConcreteBlock("black", 0x262626)
	addConcreteBlock("red", 0xF90D0D)
	addConcreteBlock("orange", 0xF48A12)
	addConcreteBlock("yellow", 0xFFC400)
	addConcreteBlock("green", 0x14BA16)
	addConcreteBlock("cyan", 0x0ADFbb)
	addConcreteBlock("blue", 0x3431FC)
	addConcreteBlock("purple", 0xAF22F1)
	addConcreteBlock("magenta", 0xFF0D92)
	addConcreteBlock("lime", 0x66FF00)
	addConcreteBlock("light_blue", 0x81D5FF)
	addConcreteBlock("pink", 0xFFB6B6)
	addConcreteBlock("brown", 0x61440C)

	// 雷达
	addRadarBlock("radar")
		.box(6, 0, 6, 10, 16, 10, true)

	addBrokenRadarBlock("radar")
		.box(6, 0, 6, 10, 16, 10, true)

	// 变压器
	addRadarBlock("transformer")

	addBrokenRadarBlock("transformer")
		.notSolid()

	// 调制解调器
	addRadarBlock("modem")
		.notSolid()

	addBrokenRadarBlock("modem")
		.notSolid()

	// 追踪阵列
	addRadarBlock("tracking_array")

	addBrokenRadarBlock("tracking_array")
		.notSolid()

	// 电源
	addRadarBlock("power_supply")

	addBrokenRadarBlock("power_supply")
		.notSolid()
})
StartupEvents.registry("block", (event) => {
	/**
	 * 
	 * @param {string} name 注册id
	 * @param {string} type 注册类型
	 */
	function addBlock(name, type) {
		if (type === undefined) {
			return event.create(`${Cmi.MODID}:${name}`)
		}
		return event.create(`${Cmi.MODID}:${name}`, type)
	}

	function addConcreteBlock(name, color) {
		addBlock(`${name}_reinforced_concrete`)
			.soundType(SoundType.METAL)
			.noDrops()
			.requiresTool(true)
			.textureAll(Cmi.loadResource("block/custom/reinforced_concrete/reinforced_concrete"))
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
	addConcreteBlock("light_gray", 0xa0a3a5)
	addConcreteBlock("black", 0x262626)
	addConcreteBlock("red", 0xf90d0d)
	addConcreteBlock("orange", 0xf48a12)
	addConcreteBlock("yellow", 0xffc400)
	addConcreteBlock("green", 0x14ba16)
	addConcreteBlock("cyan", 0x0adfbb)
	addConcreteBlock("blue", 0x3431fc)
	addConcreteBlock("purple", 0xaf22f1)
	addConcreteBlock("magenta", 0xff0d92)
	addConcreteBlock("lime", 0x66ff00)
	addConcreteBlock("light_blue", 0x81d5ff)
	addConcreteBlock("pink", 0xffb6b6)
	addConcreteBlock("brown", 0x61440c)

	// 雷达
	addBlock(`radar`)
		.soundType(SoundType.NETHERITE_BLOCK)
		.waterlogged()
		.hardness(-1)
		.resistance(-1)
		.model(Cmi.loadResource("block/radar"))
		.box(6, 0, 6, 10, 16, 10, true)

	// 损坏雷达
	addBlock(`broken_radar`)
		.soundType(SoundType.NETHERITE_BLOCK)
		.waterlogged()
		.hardness(-1)
		.resistance(-1)
		.model(Cmi.loadResource("block/broken_radar_part/radar"))
		.box(6, 0, 6, 10, 16, 10, true)


	// 变压器
	addBlock("transformer")
		.soundType(SoundType.NETHERITE_BLOCK)
		.waterlogged()
		.hardness(-1)
		.resistance(-1)
		.model(Cmi.loadResource("block/transformer"))

	// 损坏变压器
	addBlock("broken_transformer")
		.soundType(SoundType.NETHERITE_BLOCK)
		.waterlogged()
		.hardness(-1)
		.resistance(-1)
		.model(Cmi.loadResource("block/broken_radar_part/transformer"))
		.notSolid()

	// 调制解调器
	addBlock("modem")
		.soundType(SoundType.NETHERITE_BLOCK)
		.waterlogged()
		.hardness(-1)
		.resistance(-1)
		.model(Cmi.loadResource("block/modem"))
		.notSolid()

	addBlock(`broken_modem`)
		.soundType(SoundType.NETHERITE_BLOCK)
		.waterlogged()
		.hardness(-1)
		.resistance(-1)
		.model(Cmi.loadResource("block/broken_radar_part/modem"))
		.notSolid()

	// 追踪阵列
	addBlock("tracking_array")
		.soundType(SoundType.NETHERITE_BLOCK)
		.waterlogged()
		.hardness(-1)
		.resistance(-1)
		.model(Cmi.loadResource("block/tracking_array"))

	// 损坏的追踪阵列
	addBlock("broken_tracking_array")
		.soundType(SoundType.NETHERITE_BLOCK)
		.waterlogged()
		.hardness(-1)
		.resistance(-1)
		.model(Cmi.loadResource("block/broken_radar_part/tracking_array"))
		.notSolid()

	// 电源
	addBlock("power_supply")
		.soundType(SoundType.NETHERITE_BLOCK)
		.waterlogged()
		.hardness(-1)
		.resistance(-1)
		.model(Cmi.loadResource("block/power_supply"))

	// 损坏的电源
	addBlock("broken_power_supply")
		.soundType(SoundType.NETHERITE_BLOCK)
		.waterlogged()
		.hardness(-1)
		.resistance(-1)
		.model(Cmi.loadResource(`block/broken_radar_part/power_supply`))
		.notSolid()
})
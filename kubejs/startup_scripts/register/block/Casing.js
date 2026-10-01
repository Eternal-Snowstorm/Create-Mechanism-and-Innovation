StartupEvents.registry("block", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addCasing(name) {
		let builder = event.create(`${Cmi.MODID}:${name}_casing`)

		builder.tag("create:casing")
		builder.tagBlock("create:wrench_pickup")

		return builder
	}

	// 铁
	addCasing("iron")
		.textureAll(Cmi.loadResource("block/casing/iron/casing"))
		.soundType(SoundType.METAL)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())

	// 青铜
	addCasing("bronze")
		.textureAll(Cmi.loadResource("block/casing/bronze/casing"))
		.soundType(SoundType.COPPER)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())

	// 钢
	addCasing("steel")
		.textureAll(Cmi.loadResource("block/casing/steel/casing"))
		.soundType(SoundType.METAL)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.IRON.tag())

	// 智能
	addCasing("smart")
		.model(Cmi.loadResource("block/casing/ae2/smart"))
		.soundType(SoundType.METAL)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.IRON.tag())

	// 高级计算
	addCasing("computing")
		.model(Cmi.loadResource("block/casing/ae2/computing"))
		.soundType(SoundType.METAL)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.IRON.tag())

	// 气密
	addCasing("airtight")
		.textureAll(Cmi.loadResource("block/casing/air_tight/casing"))
		.soundType(SoundType.METAL)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.DIAMOND.tag())
})
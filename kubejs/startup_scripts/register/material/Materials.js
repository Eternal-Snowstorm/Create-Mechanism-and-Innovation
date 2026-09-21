NebulaEvents.registerMaterial((event) => {
	event.namespace(Cmi.MODID)
	event.setCreativeTab("cmi:materials")

	// 木头
	event.register("wooden", MiningLevels.WOODEN)
		.color(0xAB7500, 0xAC8430)
		.gear(false)

	// 安山合金
	event.register("andesite_alloy", MiningLevels.WOODEN)
		.color(0xC7C8B8, 0x809587)
		.isMetal()
		.nugget()
		.molten()

	// 不锈钢
	event.register("stainless_steel", MiningLevels.DIAMOND)
		.color(0x647280, 0x4C5661)
		.isMetal()
		.ingot()
		.plate()
		.nugget()
		.block()
		.molten()

	// 铬
	event.register("chromium", MiningLevels.IRON)
		.color(0xEBE3E4, 0xB2ACAD)
		.isMetal()
		.ingot()
		.plate()
		.dust()
		.nugget()
		.block()
		.molten()
		.dirty()
		.clump()
		.shard()
		.crystal()
		.slurry()
		.dirtySlurry()

	// 铂
	event.register("platinum", MiningLevels.IRON)
		.color(0x92BDC2, 0x6F8F93)
		.isMetal()
		.ingot()
		.nugget()
		.block()
		.dust()
		.dirty()
		.clump()
		.shard()

	// 泓钢
	event.register("siltsteel", MiningLevels.DIAMOND)
		.color(0x40BAB6, 0x318D8A)
		.isMetal()
		.ingot()
		.plate()
		.nugget()
		.block()
		.dust()
		.molten()

	// 钢
	event.register("steel", MiningLevels.IRON)
		.color(0xA7A7A7, 0x121C37)
		.ingot()
		.plate()
		.nugget()
		.dust()
		.gear()
		.blockWithModel("immersiveengineering:block/storage_steel")
		.isMetal()

	// 铸铁
	event.register("cast_iron", MiningLevels.IRON)
		.color(0x454545, 0x343434)
		.isMetal()
		.ingot(false)
		.dust(false)
		.nugget(false)
		.gear(false)
		.block()
		.molten()

	// 工业铁
	event.register("industrial_iron", MiningLevels.IRON)
		.color(0x626262, 0x4E4E4E)
		.isMetal()
		.molten()

	// 埃忒恩
	event.register("etrium", MiningLevels.DIAMOND)
		.color(0xBAFCF6, 0x80D8B9)
		.isMetal()
		.molten()
		.dust()
		.dirty()
		.clump()
		.shard()
		.crystal()
		.slurry()
		.dirtySlurry()

	// 钒
	event.register("vanadium", MiningLevels.STONE)
		.color(0xD4E7E5, 0xB4CCC8)
		.isMetal()
		.dust()
		.molten()
		.dirty()
		.clump()
		.shard()
		.crystal()
		.slurry()
		.dirtySlurry()

	// 钨
	event.register("tungsten", MiningLevels.NETHER)
		.color(0x506070, 0x3D4955)
		.isMetal()
		.ingot(false)
		.nugget()
		.plate()
		.dust()
		.rod()
		.block()
		.dirty()
		.clump()
		.shard()
		.crystal()
		.slurry()
		.dirtySlurry()

	// 钨钢
	event.register("tungsten_steel", MiningLevels.DIAMOND)
		.color(0x74887D, 0x58675E)
		.isMetal()
		.ingot()
		.nugget()
		.plate()
		.block()
		.molten()
		.rod()
		.gear()
		.dust()

	// 暗影钢
	event.register("shadow_steel", MiningLevels.DIAMOND)
		.color(0x5F5D6A, 0x3F364C)
		.isMetal()
		.nugget()
		.molten()

	// 光辉石
	event.register("refined_radiance", MiningLevels.DIAMOND)
		.color(0xFFFFFF, 0xDBDDDE)
		.isMetal()
		.nugget()
		.molten()

	// 戴斯
	event.register("desh", MiningLevels.WOODEN)
		.color(0xD38B4C, 0xC57041)
		.isMetal()
		.molten()
		.dust()
		.gear()

	// 紫金
	event.register("ostrum", MiningLevels.WOODEN)
		.color(0xA66B72, 0x76525F)
		.isMetal()
		.molten()
		.dust()
		.gear()

	// 耐热金属
	event.register("calorite", MiningLevels.WOODEN)
		.color(0xC94D4E, 0x9C1F3E)
		.isMetal()
		.molten()
		.dust()
		.gear()

	// 赤钕合金
	event.register("scarlet_neodymium", MiningLevels.STONE)
		.color(0xB91919, 0x6F2021)
		.isMetal()
		.dust()
		.nugget()
		.molten()

	// 青钕合金
	event.register("azure_neodymium", MiningLevels.STONE)
		.color(0x1937BB, 0x202F6F)
		.isMetal()
		.dust()
		.nugget()
		.molten()

	// 镀铬钢
	event.register("chromeplated_steel", MiningLevels.DIAMOND)
		.isMetal()
		.color(0xE4DBDC, 0x726F73)
		.gear()

	// 超导汞
	event.register("superconducting_mercury", MiningLevels.DIAMOND)
		.color(0xA9C0FF, 0x7D84B8)
		.isMetal()
		.ingot()
		.plate()

	// 锌
	event.register("zinc", MiningLevels.STONE)
		.color(0xD3FCD9, 0xA3BE9E)
		.isMetal()
		.dirty()
		.clump()
		.shard()
		.crystal()
		.slurry()
		.dirtySlurry()

	// 铝
	event.register("aluminum", MiningLevels.STONE)
		.color(0xE1EEED, 0xC1C8CB)
		.isMetal()
		.dirty()
		.clump()
		.shard()
		.crystal()
		.slurry()
		.dirtySlurry()

	// 银
	event.register("silver", MiningLevels.STONE)
		.color(0x9DABB2, 0x748190)
		.isMetal()
		.dirty()
		.clump()
		.shard()

	// 镍
	event.register("nickel", MiningLevels.STONE)
		.color(0xC5B582, 0xAE9E74)
		.isMetal()
		.dirty()
		.clump()
		.shard()
		.crystal()
		.slurry()
		.dirtySlurry()

	// 钴
	event.register("cobalt", MiningLevels.IRON)
		.color(0x2375DA, 0x0752B6)
		.isMetal()
		.dirty()
		.clump()
		.shard()
		.crystal()
		.slurry()
		.dirtySlurry()

	// 钛
	event.register("titanium", MiningLevels.DIAMOND)
		.color(0xE2B1E3, 0xAB86AC)
		.isMetal()
		.ingot()
		.plate()
		.nugget()
		.dust()
		.rod()
		.gear()
		.block()
		.molten()
		.dirty()
		.clump()
		.shard()
		.crystal()
		.slurry()
		.dirtySlurry()

	// 磨制石英
	event.register("polished_quartz", MiningLevels.WOODEN)
		.color(0xae9e7f, 0xFFFFFF)
		.prism()

	// 纯净石英
	event.register("pure_quartz", MiningLevels.WOODEN)
		.color(0xa5f1ff, 0xFFFFFF)
		.dust()
		.prism()

	// 阿迪特
	event.register("ardite", MiningLevels.IRON)
		.color(0xECB200, 0xB27B00)
		.isMetal()
		.ingot()
		.dust()
		.nugget()
		.block()
		.molten()
		.dirty()
		.clump()
		.shard()
		.crystal()
		.slurry()
		.dirtySlurry()

	// 钛合金
	event.register("titanium_alloy", MiningLevels.DIAMOND)
		.color(0x00FFFF, 0x008080)
		.isMetal()
		.ingot()
		.plate()
		.nugget()
		.dust()
		.rod()
		.gear()
		.block()
		.molten()

	// 铝合金
	event.register("aluminum_alloy", MiningLevels.IRON)
		.color(0x7998B7, 0x2F4051)
		.isMetal()
		.ingot()
		.plate()
		.nugget()
		.dust()
		.rod()
		.gear()
		.block()
		.molten()

	// fluix
	event.register("fluix", MiningLevels.WOODEN)
		.color(0x915DCD, 0x373B72)
		.molten()
})
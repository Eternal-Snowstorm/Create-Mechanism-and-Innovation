let $MapColor =
	Java.loadClass("net.minecraft.world.level.material.MapColor")

StartupEvents.registry("block", (event) => {
	/**
	 * 
	 * @param {string} name 注册id
	 * @param 
	 */
	function addBlock(name, type) {
		if (type === undefined) {
			return event.create(`${Cmi.MODID}:${name}`)
		}
		return event.create(`${Cmi.MODID}:${name}`, type)
	}

	// 虚空涌泉
	addBlock("void_spring")
		.soundType(SoundType.STONE)
		.hardness(-1)
		.resistance(114514)

	// 冲击桩
	addBlock("impact_pile")
		.model(Cmi.loadResource("block/custom/impact_pile"))
		.defaultCutout()
		.soundType(SoundType.NETHERITE_BLOCK)
		.box(7, 0, 7, 9, 14, 9, true)
		.box(6, 14, 6, 10, 16, 10, true)
		.hardness(5)
		.resistance(5)

	// 破旧的存钱罐
	addBlock("piggy_bank", "cardinal")
		.soundType(SoundType.DECORATED_POT)
		.waterlogged()
		.notSolid()
		.defaultCutout()
		.box(9.75, 0, 12, 11.75, 2, 14)
		.box(5.25, 0, 12, 7.25, 2, 14)
		.box(9.75, 0, 5, 11.75, 2, 7)
		.box(9, 5.5, 12.25, 10, 7.5, 14.25)
		.box(8.13281, 8.00781, 7.75, 8.88281, 8.00781, 12.75)
		.box(5.24219, 2.75, 8.5, 5.24219, 7.5, 11.5)
		.box(11.75781, 2.75, 8.5, 11.75781, 7.5, 11.5)
		.box(5.25, 2, 5, 11.75, 8, 14)
		.box(5.25, 0, 5, 7.25, 2, 7)
		.box(5, 3.75, 0.75, 12, 9.75, 6.75)
		.box(7, 5.5, 0, 10, 7.5, 1)

	// 背景
	addBlock("green_screen")
		.lightLevel(15)

	// 锇砖瓦
	addBlock("osmium_tile")
		.soundType(SoundType.METAL)
		.hardness(6)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.IRON.tag())
		.requiresTool(true)

	// 泥炭
	addBlock("peat_block")
		.soundType(SoundType.MUD)
		.mapColor($MapColor.TERRACOTTA_CYAN)
		.hardness(1)
		.resistance(1)
		.tagBlock(CmiToolType.SHOVEL.tag())
		.tagBlock(CmiMiningLevel.WOODEN.tag())
		.tagBlock("minecraft:dirt")
		.tag("minecraft:stone")

	// 油页岩
	addBlock("oil_shale")
		.soundType(SoundType.DEEPSLATE)
		.hardness(15)
		.resistance(15)
		.tagBlock(CmiMiningLevel.NETHER.tag())
		.tagBlock(CmiToolType.PICKAXE.tag())
		.requiresTool(true)

	// 压缩末地粉块
	addBlock("compression_end_stone_dust_block")
		.soundType(SoundType.SAND)
		.hardness(6)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.WOODEN.tag())
		.requiresTool(true)

	// 坩埚底座
	addBlock("crucible_base")
		.textureAll(Cmi.loadResource("block/crucible/top"))
		.soundType(SoundType.METAL)
		.hardness(6)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.IRON.tag())
		.requiresTool(true)

	// 坩埚风口
	addBlock("crucible_tuyere")
		.soundType(SoundType.METAL)
		.hardness(6)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.IRON.tag())
		.requiresTool(true)

	// 工程块框架
	addBlock("industrial_frame")
		.textureAll("immersiveengineering:block/metal_decoration/steel_casing")
		.soundType(SoundType.METAL)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.IRON.tag())
		.defaultCutout()

	// 伊甸水晶
	addBlock("eden_crystal")
		.soundType(SoundType.AMETHYST)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.IRON.tag())

	// 辐射沙
	addBlock("radsand", "falling")
		.textureAll(Cmi.loadResource("block/radsand"))
		.soundType(SoundType.SAND)
		.hardness(0.5)
		.resistance(0.5)
		.tagBlock("minecraft:sand")
		.tagBlock(CmiToolType.SHOVEL.tag())

	// 高岭土块
	addBlock("kaolinite")
		.textureAll(Cmi.loadResource("block/kaolinite_block"))
		.soundType(SoundType.GRAVEL)
		.hardness(0.5)
		.resistance(0.5)
		.tagBlock(CmiToolType.SHOVEL.tag())

	// 耐火砖泥
	addBlock("refractory_grout")
		.textureAll(Cmi.loadResource("block/refractory_grout"))
		.soundType(SoundType.GRAVEL)
		.hardness(0.5)
		.resistance(0.5)
		.tagBlock(CmiToolType.SHOVEL.tag())

	// 恩特罗块
	addBlock("entro_block")
		.textureAll("expatternprovider:block/entro_block")
		.soundType(SoundType.STONE)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())
		.item((item) => {
			item.tag("forge:storage_blocks/entro")
				.tag("forge:storage_blocks")
		})

	// 铀块
	addBlock("uranium_block")
		.model("cmi:block/uranium_block")
		.soundType(SoundType.NETHERITE_BLOCK)
		.hardness(5)
		.resistance(5)
		.defaultTranslucent()
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())
		.item((item) => {
			item.tag("forge:storage_blocks/uranium")
				.tag("forge:storage_blocks")
		})

	// 钻探轴承
	addBlock("driller_bearing")
		.textureAll("cmi:block/machine/driller_placeholder")
		.soundType(SoundType.NETHERITE_BLOCK)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.IRON.tag())
		.requiresTool(true)

	// 钻头
	addBlock("driller_head")
		.textureAll("cmi:block/machine/driller_placeholder")
		.soundType(SoundType.NETHERITE_BLOCK)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.IRON.tag())
		.requiresTool(true)

	// 液泵
	addBlock("driller_fluid_pump")
		.textureAll("cmi:block/machine/driller_placeholder")
		.soundType(SoundType.NETHERITE_BLOCK)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.IRON.tag())
		.requiresTool(true)

	// 气泵
	addBlock("driller_gas_pump")
		.textureAll("cmi:block/machine/driller_placeholder")
		.soundType(SoundType.NETHERITE_BLOCK)
		.hardness(5)
		.resistance(5)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.IRON.tag())
		.requiresTool(true)

	// 瓷砖
	addBlock("ceramic_tile")
		.soundType(SoundType.STONE)
		.hardness(6)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())
		.requiresTool(true)

	// 瓷砖台阶
	addBlock("ceramic_tile_slab", "slab")
		.textureAll(Cmi.loadResource("block/ceramic_tile"))
		.soundType(SoundType.STONE)
		.hardness(6)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())
		.requiresTool(true)

	// 瓷砖楼梯
	addBlock("ceramic_tile_stairs", "stairs")
		.textureAll(Cmi.loadResource("block/ceramic_tile"))
		.soundType(SoundType.STONE)
		.hardness(6)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())
		.requiresTool(true)

	// DTMA幻晶能量核心
	addBlock("dtma_dreamcore_energy_core")
		.textureAll(Cmi.loadResource("block/dreamcore_core"))
		.soundType(SoundType.STONE)
		.hardness(6)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())
		.requiresTool(true)

	// 幻晶线圈
	addBlock("dreamcore_coil")
		.textureAll(Cmi.loadResource("block/dtma/coil_side"))
		.soundType(SoundType.STONE)
		.hardness(6)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())
		.requiresTool(true)

	// 矿藏粉末块
	addBlock("deposit_dust_block")
		.textureAll(Cmi.loadResource("block/deposit_dust_block"))
		.soundType(SoundType.TUFF)
		.hardness(3)
		.resistance(3)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.WOODEN.tag())
		.requiresTool(false)

	// 械钢矿石
	addBlock("mechanium_ore")
		.textureAll(Cmi.loadResource("block/mechanium_ore"))
		.soundType(SoundType.STONE)
		.hardness(6)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())
		.requiresTool(true)

	// 雕纹铜块
	addBlock("chiseled_copper")
		.textureAll(Cmi.loadResource("block/chiseled_copper/0"))
		.soundType(SoundType.COPPER)
		.hardness(3)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())

	addBlock("exposed_chiseled_copper")
		.textureAll(Cmi.loadResource("block/chiseled_copper/1"))
		.soundType(SoundType.COPPER)
		.hardness(3)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())

	addBlock("weathered_chiseled_copper")
		.textureAll(Cmi.loadResource("block/chiseled_copper/2"))
		.soundType(SoundType.COPPER)
		.hardness(3)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())

	addBlock("oxidized_chiseled_copper")
		.textureAll(Cmi.loadResource("block/chiseled_copper/3"))
		.soundType(SoundType.COPPER)
		.hardness(3)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())

	addBlock("waxed_chiseled_copper")
		.textureAll(Cmi.loadResource("block/chiseled_copper/0"))
		.soundType(SoundType.COPPER)
		.hardness(3)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())

	addBlock("waxed_exposed_chiseled_copper")
		.textureAll(Cmi.loadResource("block/chiseled_copper/1"))
		.soundType(SoundType.COPPER)
		.hardness(3)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())

	addBlock("waxed_weathered_chiseled_copper")
		.textureAll(Cmi.loadResource("block/chiseled_copper/2"))
		.soundType(SoundType.COPPER)
		.hardness(3)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())

	addBlock("waxed_oxidized_chiseled_copper")
		.textureAll(Cmi.loadResource("block/chiseled_copper/3"))
		.soundType(SoundType.COPPER)
		.hardness(3)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())

	// 红石二极管底座
	addBlock("redstone_diode_base")
		.hardness(3)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())
		.box(0, 0, 0, 16, 2, 16)
		.modelJson = {
			parent: "cmi:block/redstone_diode",
			textures: {
				"diode": "minecraft:block/smooth_stone"
			}
		}

	// 黄铜二极管底座
	addBlock("brass_diode_base", "cardinal")
		.hardness(3)
		.resistance(6)
		.tagBlock(CmiToolType.PICKAXE.tag())
		.tagBlock(CmiMiningLevel.STONE.tag())
		.box(0, 0, 0, 16, 2, 16)
		.modelJson = {
			parent: "cmi:block/redstone_diode",
			textures: {
				"diode": "create:block/diodes/brass_diode_base"
			}
		}
})
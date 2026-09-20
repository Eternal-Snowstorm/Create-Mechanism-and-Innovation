ServerEvents.highPriorityData((event) => {
	/**
	 * tag_match 类型的 target
	 *
	 * @param {string} stateId 生成的方块 ID
	 * @param {string} tag 替换目标标签
	 */
	function tagTarget(stateId, tag) {
		return {
			state: { Name: stateId },
			target: {
				predicate_type: "minecraft:tag_match",
				tag: tag
			}
		}
	}

	/**
	 * block_match 类型的 target
	 *
	 * @param {string} stateId 生成的方块 ID
	 * @param {string} block 替换目标方块
	 */
	function blockTarget(stateId, block) {
		return {
			state: { Name: stateId },
			target: {
				block: block,
				predicate_type: "minecraft:block_match"
			}
		}
	}

	/**
	 * 标准 placement 数组
	 *
	 * @param {number} count 每区块矿簇数量
	 * @param {object} height 高度范围配置
	 */
	function buildPlacement(count, height) {
		return [
			{ type: "minecraft:count", count: count },
			{ type: "minecraft:in_square" },
			{ type: "minecraft:height_range", height: height },
			{ type: "minecraft:biome" }
		]
	}

	/**
	 * uniform 高度范围
	 *
	 * @param {number} max 最高 Y
	 * @param {number} min 最低 Y
	 */
	function uniform(max, min) {
		return {
			type: "minecraft:uniform",
			max_inclusive: { absolute: max },
			min_inclusive: { absolute: min }
		}
	}

	/**
	 * trapezoid 高度范围
	 *
	 * @param {number} max 最高 Y
	 * @param {number} min 最低 Y
	 */
	function trapezoid(max, min) {
		return {
			type: "minecraft:trapezoid",
			max_inclusive: { absolute: max },
			min_inclusive: { absolute: min }
		}
	}

	/**
	 * 伊甸群系列表, eden 维度共用
	 */
	const EDEN_BIOMES = [
		"edenring:brainstorm",
		"edenring:golden_forest",
		"edenring:gravilite_debris_field",
		"edenring:lakeside_desert",
		"edenring:mycotic_forest",
		"edenring:old_mycotic_forest",
		"edenring:pulse_forest",
		"edenring:stone_garden",
		"edenring:wind_valley"
	]

	/**
	 * 注册一种矿石的维度生成
	 *
	 * @param {string} name 矿物 ID, 不含命名空间
	 * @param {string} type 生成维度
	 * @param {number} size 矿簇体积
	 */
	function addOreGeneratingType(name, type, size) {
		// 维度前缀 (决定资源文件路径与 biome_modifier 命名)
		const ORE_TYPE_PREFIX = {
			overworld: "",
			nether: "nether_",
			end: "end_",
			moon: "moon_",
			mars: "mars_",
			galena: "galena_",
			radrock: "radrock_"
		}
		const PREFIX = ORE_TYPE_PREFIX[type] ?? ""

		const configuredFeature = {
			type: "minecraft:ore",
			config: {
				discard_chance_on_air_exposure: 0.0,
				size: size,
				targets: []
			}
		}

		const placedFeature = {
			feature: `${Cmi.MODID}:${PREFIX}${name}`,
			placement: []
		}

		const biomeModifier = {
			type: "forge:add_features",
			biomes: [],
			features: `${Cmi.MODID}:${PREFIX}${name}`,
			step: "underground_ores"
		}

		/**
		 * 写出三个数据包 JSON
		 *
		 * @returns {this}
		 */
		function build() {
			event.addJson(`cmi:worldgen/configured_feature/${PREFIX}${name}`, configuredFeature)
			event.addJson(`cmi:worldgen/placed_feature/${PREFIX}${name}`, placedFeature)
			event.addJson(`cmi:forge/biome_modifier/${PREFIX}${name}`, biomeModifier)
			return this
		}

		/**
		 * 通用维度提交
		 *
		 * @param {string | string[]} biomes 群系或群系标签
		 * @param {number} count 每区块矿簇数量
		 * @param {object} height 高度范围
		 */
		function commit(biomes, count, height) {
			placedFeature.placement = buildPlacement(count, height)
			biomeModifier.biomes = biomes
			return build()
		}

		return {
			/**
			 * 主世界: 石头和深板岩
			 *
			 * @param {number} count 每区块矿簇数量
			 */
			overworld(count) {
				configuredFeature.config.targets = [
					tagTarget(`${Cmi.MODID}:${name}`, "minecraft:stone_ore_replaceables"),
					tagTarget(`${Cmi.MODID}:deepslate_${name}`, "minecraft:deepslate_ore_replaceables")
				]
				return commit("#minecraft:is_overworld", count, uniform(52, -54))
			},

			/**
			 * 主世界: 仅石头
			 *
			 * @param {number} count 每区块矿簇数量
			 */
			overworldWithStoneOnly(count) {
				configuredFeature.config.targets = [
					tagTarget(`${Cmi.MODID}:${name}`, "minecraft:stone_ore_replaceables")
				]
				return commit("#minecraft:is_overworld", count, uniform(52, 0))
			},

			/**
			 * 伊甸星环
			 *
			 * @param {number} count 每区块矿簇数量
			 */
			eden(count) {
				configuredFeature.config.targets = [
					tagTarget(`${Cmi.MODID}:${name}`, "minecraft:stone_ore_replaceables")
				]
				return commit(EDEN_BIOMES, count, trapezoid(200, 50))
			},

			/**
			 * 下界
			 *
			 * @param {number} count 每区块矿簇数量
			 */
			nether(count) {
				configuredFeature.config.targets = [
					blockTarget(`${Cmi.MODID}:nether_${name}`, "minecraft:netherrack")
				]
				return commit("#minecraft:is_nether", count, trapezoid(120, -8))
			},

			/**
			 * 末地
			 *
			 * @param {number} count 每区块矿簇数量
			 */
			end(count) {
				configuredFeature.config.targets = [
					blockTarget(`${Cmi.MODID}:end_${name}`, "minecraft:end_stone")
				]
				return commit("minecraft:end_highlands", count, trapezoid(120, 8))
			},

			/**
			 * 月球
			 *
			 * @param {number} count 每区块矿簇数量
			 */
			moon(count) {
				configuredFeature.config.targets = [
					blockTarget(`${Cmi.MODID}:moon_${name}`, "ad_astra:moon_stone")
				]
				return commit("ad_astra:lunar_wastelands", count, trapezoid(70, -60))
			},

			/**
			 * 火星
			 *
			 * @param {number} count 每区块矿簇数量
			 */
			mars(count) {
				configuredFeature.config.targets = [
					tagTarget(`${Cmi.MODID}:mars_${name}`, "ad_astra:mars_stone_replaceables")
				]
				return commit("ad_astra:martian_wastelands", count, trapezoid(56, -24))
			},

			/**
			 * 磁场洞穴: 方铅岩
			 * 生成 `cmi:galena_<name>` 替换 `alexscaves:galena`
			 *
			 * @param {number} count 每区块矿簇数量
			 */
			galena(count) {
				configuredFeature.config.targets = [
					blockTarget(`${Cmi.MODID}:galena_${name}`, "alexscaves:galena")
				]
				return commit("alexscaves:magnetic_caves", count, trapezoid(60, -60))
			},

			/**
			 * 毒化洞穴: 辐射岩
			 * 生成 `cmi:radrock_<name>`，替换 `alexscaves:radrock`
			 *
			 * @param {number} count 每区块矿簇数量
			 */
			radrock(count) {
				configuredFeature.config.targets = [
					blockTarget(`${Cmi.MODID}:radrock_${name}`, "alexscaves:radrock")
				]
				return commit("alexscaves:toxic_caves", count, trapezoid(60, -60))
			}
		}
	}

	// 赛特斯石英
	addOreGeneratingType("certus_quartz_ore", "overworld", 5)
		.overworld(2)

	// 幻晶
	addOreGeneratingType("dreamcore_crystal_ore", "overworld", 16)
		.overworldWithStoneOnly(4)

	// 锇
	addOreGeneratingType("osmium_ore", "nether", 7)
		.nether(10)

	// 氟石
	addOreGeneratingType("fluorite_ore", "nether", 6)
		.nether(7)

	// 银
	addOreGeneratingType("silver_ore", "moon", 8)
		.moon(7)

	// 埃忒恩
	addOreGeneratingType("etrium_ore", "overworld", 4)
		.overworld(4)

	// 石英
	addOreGeneratingType("quartz_ore", "overworld", 9)
		.overworld(10)

	// 钴
	addOreGeneratingType("cobalt_ore", "moon", 6)
		.moon(5)

	// 阿迪特
	addOreGeneratingType("ardite_ore", "nether", 8)
		.nether(6)

	// 铂
	addOreGeneratingType("platinum_ore", "moon", 4)
		.moon(4)

	// 钨
	addOreGeneratingType("tungsten_ore", "nether", 4)
		.nether(4)

	// 高岭土
	addOreGeneratingType("kaolinite", "overworld", 32)
		.eden(2)

	// 方铅加压铁矿石
	addOreGeneratingType("compressed_iron_ore", "galena", 6)
		.galena(4)

	// 方铅钛矿石
	addOreGeneratingType("titanium_ore", "galena", 5)
		.galena(3)

})
ServerEvents.highPriorityData((event) => {
	// 赛特斯石英
	addOreGeneratingType("certus_quartz_ore", "overworld", 5)
		.overworld(2)

	// 幻水晶
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

	/**
	 * 
	 * @param {string} name 矿物ID
	 * @param {"overworld" | "nether" | "end" | "moon" | "mars"} type 生成维度
	 * @param {number} size 矿簇体积
	 * @param {number} count 矿簇数量(单个区块)
	 * @returns 
	 */
	function addOreGeneratingType(name, type, size) {
		// 矿物类型
		let oreType = {
			"overworld": "",
			"nether": "nether_",
			"end": "end_",
			"moon": "moon_",
			"mars": "mars_"
		}

		// 已配置的地物
		let configuredFeature = {
			type: "minecraft:ore",
			config: {
				discard_chance_on_air_exposure: 0.0,
				size: size,
				targets: {}
			}
		}

		// 已放置的地物
		let placedFeature = {
			feature: `${Cmi.MODID}:${oreType[type]}${name}`,
			placement: {}
		}

		// 群系定义
		let biomeModifier = {
			type: "forge:add_features",
			biomes: {},
			features: `${Cmi.MODID}:${oreType[type]}${name}`,
			step: "underground_ores"
		}

		// 生成数据包
		function build() {
			event.addJson(`cmi:worldgen/configured_feature/${oreType[type]}${name}`, configuredFeature)
			event.addJson(`cmi:worldgen/placed_feature/${oreType[type]}${name}`, placedFeature)
			event.addJson(`cmi:forge/biome_modifier/${oreType[type]}${name}`, biomeModifier)
			return this
		}

		// 配置维度类型
		return {
			/**
			 * 主世界
			 * 
			 * @param {number} count 数量
			 * @returns 
			 */
			overworld(count) {
				configuredFeature.config.targets = [
					{
						state: {
							Name: `${Cmi.MODID}:${name}`
						},
						target: {
							predicate_type: "minecraft:tag_match",
							tag: "minecraft:stone_ore_replaceables"
						}
					},
					{
						state: {
							Name: `${Cmi.MODID}:deepslate_${name}`
						},
						target: {
							predicate_type: "minecraft:tag_match",
							tag: "minecraft:deepslate_ore_replaceables"
						}
					}
				]
				placedFeature.placement = [
					{
						type: "minecraft:count",
						count: count
					},
					{
						type: "minecraft:in_square"
					},
					{
						type: "minecraft:height_range",
						height: {
							type: "minecraft:uniform",
							max_inclusive: {
								absolute: 52
							},
							min_inclusive: {
								absolute: -54
							}
						}
					},
					{
						type: "minecraft:biome"
					}
				]
				biomeModifier.biomes = "#minecraft:is_overworld"
				build()
				return this
			},

			/**
			 * 主世界特殊
			 * 
			 * @param {number} count 数量
			 * @returns 
			 */
			overworldWithStoneOnly(count) {
				configuredFeature.config.targets = [
					{
						state: {
							Name: `${Cmi.MODID}:${name}`
						},
						target: {
							predicate_type: "minecraft:tag_match",
							tag: "minecraft:stone_ore_replaceables"
						}
					}
				]
				placedFeature.placement = [
					{
						type: "minecraft:count",
						count: count
					},
					{
						type: "minecraft:in_square"
					},
					{
						type: "minecraft:height_range",
						height: {
							type: "minecraft:uniform",
							max_inclusive: {
								absolute: 52
							},
							min_inclusive: {
								absolute: 0
							}
						}
					},
					{
						type: "minecraft:biome"
					}
				]
				biomeModifier.biomes = "#minecraft:is_overworld"
				build()
				return this
			},

			/**
			 * 伊甸
			 * 
			 * @param {number} count 数量
			 * @returns 
			 */
			eden(count) {
				configuredFeature.config.targets = [
					{
						state: {
							Name: `${Cmi.MODID}:${name}`
						},
						target: {
							predicate_type: "minecraft:tag_match",
							tag: "minecraft:stone_ore_replaceables"
						}
					}
				]
				placedFeature.placement = [
					{
						type: "minecraft:count",
						count: count
					},
					{
						type: "minecraft:in_square"
					},
					{
						type: "minecraft:height_range",
						height: {
							type: "minecraft:trapezoid",
							max_inclusive: {
								absolute: 200
							},
							min_inclusive: {
								absolute: 50
							}
						}
					},
					{
						type: "minecraft:biome"
					}
				]
				biomeModifier.biomes = [
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
				build()
				return this
			},

			/**
			 * 下界
			 * 
			 * @param {number} count 数量
			 * @returns 
			 */
			nether(count) {
				configuredFeature.config.targets = [
					{
						state: {
							Name: `${Cmi.MODID}:nether_${name}`
						},
						target: {
							block: "minecraft:netherrack",
							predicate_type: "minecraft:block_match"
						}
					}
				]
				placedFeature.placement = [
					{
						type: "minecraft:count",
						count: count
					},
					{
						type: "minecraft:in_square"
					},
					{
						type: "minecraft:height_range",
						height: {
							type: "minecraft:trapezoid",
							max_inclusive: {
								absolute: 120
							},
							min_inclusive: {
								absolute: -8
							}
						}
					},
					{
						type: "minecraft:biome"
					}
				]
				biomeModifier.biomes = "#minecraft:is_nether"
				build()
				return this
			},

			/**
			 * 末地
			 * 
			 * @param {number} count 数量
			 * @returns 
			 */
			end(count) {
				configuredFeature.config.targets = [
					{
						state: {
							"Name": `${Cmi.MODID}:end_${name}`
						},
						target: {
							block: "minecraft:end_stone",
							predicate_type: "minecraft:block_match"
						}
					}
				]
				placedFeature.placement = [
					{
						type: "minecraft:count",
						count: count
					},
					{
						type: "minecraft:in_square"
					},
					{
						type: "minecraft:height_range",
						height: {
							type: "minecraft:trapezoid",
							max_inclusive: {
								absolute: 120
							},
							min_inclusive: {
								absolute: 8
							}
						}
					},
					{
						type: "minecraft:biome"
					}
				]
				biomeModifier.biomes = "minecraft:end_highlands"
				build()
				return this
			},

			/**
			 * 月球
			 * 
			 * @param {number} count 数量
			 * @returns 
			 */
			moon(count) {
				configuredFeature.config.targets = [
					{
						"state": {
							"Name": `${Cmi.MODID}:moon_${name}`
						},
						"target": {
							"block": "ad_astra:moon_stone",
							"predicate_type": "minecraft:block_match"
						}
					}
				]
				placedFeature.placement = [
					{
						type: "minecraft:count",
						count: count
					},
					{
						type: "minecraft:in_square"
					},
					{
						type: "minecraft:height_range",
						height: {
							type: "minecraft:trapezoid",
							max_inclusive: {
								absolute: 70
							},
							min_inclusive: {
								absolute: -60
							}
						}
					},
					{
						"type": "minecraft:biome"
					}
				]
				biomeModifier.biomes = "ad_astra:lunar_wastelands"
				build()
				return this
			},

			/**
			 * 火星
			 * 
			 * @param {number} count 数量
			 * @returns 
			 */
			mars(count) {
				configuredFeature.config.targets = [
					{
						state: {
							"Name": `${Cmi.MODID}:mars_${name}`
						},
						target: {
							predicate_type: "minecraft:tag_match",
							tag: "ad_astra:mars_stone_replaceables"
						}
					}
				]
				placedFeature.placement = [
					{
						type: "minecraft:count",
						count: count
					},
					{
						type: "minecraft:in_square"
					},
					{
						type: "minecraft:height_range",
						height: {
							type: "minecraft:trapezoid",
							max_inclusive: {
								absolute: 56
							},
							min_inclusive: {
								absolute: -24
							}
						}
					},
					{
						type: "minecraft:biome"
					}
				]
				biomeModifier.biomes = "ad_astra:martian_wastelands"
				build()
				return this
			}
		}
	}
})
ServerEvents.highPriorityData((event) => {
	let structures = []
	let netherStructures = []
	let moonStructures = []

	/**
	 * 
	 * @param {string} name 结构名称
	 * @returns 
	 */
	function addNodeGen(name) {
		// 结构
		let structure = {
			type: "minecraft:jigsaw",
			biomes: [],
			size: 2,
			start_pool: `${Cmi.MODID}:ore_node/${name}_node`,
			step: "surface_structures",
			start_height: {
				absolute: 0
			},
			spawn_overrides: {},
			max_distance_from_center: 64,
			project_start_to_heightmap: "WORLD_SURFACE_WG",
			terrain_adaptation: "beard_thin",
			use_expansion_hack: false
		}

		// 结构池
		let depTemplatePool = {
			name: `${Cmi.MODID}:deposit_${name}`,
			fallback: "minecraft:empty",
			elements: [
				{
					element: {
						location: `${Cmi.MODID}:deposit/${name}/large`,
						element_type: "minecraft:single_pool_element",
						processors: "minecraft:empty",
						projection: "rigid"
					},
					weight: 2
				},
				{
					element: {
						location: `${Cmi.MODID}:deposit/${name}/medium`,
						element_type: "minecraft:single_pool_element",
						processors: "minecraft:empty",
						projection: "rigid"
					},
					weight: 2
				},
				{
					element: {
						location: `${Cmi.MODID}:deposit/${name}/small`,
						element_type: "minecraft:single_pool_element",
						processors: "minecraft:empty",
						projection: "rigid"
					},
					weight: 3
				}
			]
		}

		// 结构池
		let templatePool = {
			name: `${Cmi.MODID}:${name}`,
			fallback: "minecraft:empty",
			elements: [
				{
					weight: 1,
					element: {
						location: `${Cmi.MODID}:ore_node/${name}_node`,
						element_type: "minecraft:single_pool_element",
						processors: "minecraft:empty",
						projection: "rigid"
					}
				}
			]
		}

		// 生成数据包
		function build() {
			event.addJson(`cmi:worldgen/structure/ore_node/${name}_node`, structure)
			event.addJson(`cmi:worldgen/template_pool/ore_node/${name}_node`, templatePool)
			event.addJson(`cmi:worldgen/template_pool/deposit_${name}`, depTemplatePool)
			return this
		}

		// 配置群系类型
		return {
			/**
			 * 结构在主世界生成
			 * 
			 * @param {Number} weight 比重
			 * @returns 
			 */
			overworld: function (weight) {
				structure.biomes = "#create_rns:has_deposit"
				// 结构集
				structures.push(
					{
						structure: `${Cmi.MODID}:ore_node/${name}_node`,
						weight: weight
					}
				)
				build()
				return this
			},


			/**
			 * 结构在下界生成
			 * 
			 * @param {Number} weight 比重
			 * @returns 
			 */
			nether: function (weight) {
				let netherStructure = {
					type: "minecraft:jigsaw",
					biomes: "#create_rns:has_deposit_nether",
					size: 2,
					start_pool: `${Cmi.MODID}:ore_node/${name}_node`,
					step: "underground_structures",
					start_height: {
						type: "uniform",
						min_inclusive: {
							absolute: -96
						},
						max_inclusive: {
							absolute: -10
						}
					},
					spawn_overrides: {},
					max_distance_from_center: 64,
					project_start_to_heightmap: "WORLD_SURFACE_WG",
					terrain_adaptation: "beard_thin",
					use_expansion_hack: false
				}
				// 结构集
				netherStructures.push(
					{
						structure: `${Cmi.MODID}:ore_node/${name}_node`,
						weight: weight
					}
				)

				event.addJson(`cmi:worldgen/structure/ore_node/${name}_node`, netherStructure)
				event.addJson(`cmi:worldgen/template_pool/ore_node/${name}_node`, templatePool)
				event.addJson(`cmi:worldgen/template_pool/deposit_${name}`, depTemplatePool)
				return this
			},


			/**
			 * 结构在末地生成
			 * 
			 * @param {Number} weight 比重
			 * @returns 
			 */
			end: function (weight) {
				structure.biomes = "#minecraft:is_end"
				build()
				return this
			},


			/**
			 * 结构在月球生成
			 * 
			 * @param {Number} weight 比重
			 * @returns 
			 */
			moon: function (weight) {
				structure.biomes = [
					"ad_astra:lunar_wastelands"
				]
				// 结构集
				moonStructures.push(
					{
						structure: `${Cmi.MODID}:ore_node/${name}_node`,
						weight: weight
					}
				)
				build()
				return this
			},


			/**
			 * 结构在核能星球生成
			 * 
			 * @param {Number} weight 比重
			 * @returns 
			 */
			dionysus: function (weight) {
				structure.biomes = [
					"alexscaves:toxic_caves"
				]
				build()
				return this
			},


			/**
			 * 结构在火星生成
			 * 
			 * @param {Number} weight 比重
			 * @returns 
			 */
			mars: function (weight) {
				structure.biomes = [
					"ad_astra:martian_wastelands",
					"ad_astra:martian_polar_caps",
					"ad_astra:martian_canyon_creek"
				]
				build()
				return this
			},


			/**
			 * 结构在磁星生成
			 * 
			 * @param {Number} weight 比重
			 * @returns 
			 */
			hephaestus: function () {
				structure.biomes = [
					"alexscaves:magnetic_caves"
				]
				build()
				return this
			},

			// 金星
			venus: function () {
				structure.biomes = [
					"ad_astra:venus_wastelands"
				]
				build()
				return this
			},

			// 水星
			mercury: function () {
				structure.biomes = [
					"ad_astra:mercury_deltas"
				]
				build()
				return this
			},

			// 霜原星
			glacio: function () {
				structure.biomes = [
					"ad_astra:glacio_snowy_barrens",
					"ad_astra:glacio_ice_peaks"
				]
				build()
				return this
			}
		}
	}

	// 月球铂矿点
	addNodeGen("platinum")
		.moon(30)

	// 月球起司矿点
	addNodeGen("cheese")
		.moon(10)

	// 金矿点
	addNodeGen("gold")
		.overworld(50)

	// 铁矿点
	addNodeGen("iron")
		.overworld(100)

	// 铜矿点
	addNodeGen("copper")
		.overworld(100)

	// 锌矿点
	addNodeGen("zinc")
		.overworld(70)

	// 煤矿点
	addNodeGen("coal")
		.overworld(100)

	// 锡矿点
	addNodeGen("tin")
		.overworld(30)

	// 油页岩矿点
	addNodeGen("oil_shale")
		.overworld(40)

	// 银矿点
	addNodeGen("silver")
		.overworld(30)

	// 镍矿点
	addNodeGen("nickel")
		.overworld(40)

	// 红石矿点
	addNodeGen("redstone")
		.overworld(70)

	// 铅矿点
	addNodeGen("lead")
		.overworld(80)

	// 钒矿点
	addNodeGen("vanadium")
		.nether(40)

	// 石英
	addNodeGen("quartz")
		.nether(80)

	// 钴矿点
	addNodeGen("cobalt")
		.nether(40)

	// 锇矿点
	addNodeGen("osmium")
		.nether(80)

	let structureSet = {
		structures: structures,
		placement: {
			type: "minecraft:random_spread",
			salt: 376345692,
			spacing: 20,
			separation: 15
		}
	}

	let netherStructureSet = {
		structures: netherStructures,
		placement: {
			type: "minecraft:random_spread",
			salt: 395602385,
			spacing: 20,
			separation: 15
		}
	}

	let moonStructureSet = {
		structures: moonStructures,
		placement: {
			type: "minecraft:random_spread",
			salt: 698217869,
			spacing: 20,
			separation: 15
		}
	}

	event.addJson("cmi:worldgen/structure_set/ore_nodes", structureSet)
	event.addJson("cmi:worldgen/structure_set/nether_ore_nodes", netherStructureSet)
	event.addJson("cmi:worldgen/structure_set/moon_ore_nodes", moonStructureSet)
})

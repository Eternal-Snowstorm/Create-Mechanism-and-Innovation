StartupEvents.registry("block", (event) => {
	/**
	 * 继承父模型
	 * 
	 * @param {string} ore 
	 * @returns 
	 */
	function simpleOreNodeModel(ore) {
		const BACKGROUND = `create_rns:block/depleted_deposit_block`
		const ORE = `cmi:block/ore/node/${ore}`

		return {
			loader: "forge:composite",
			textures: {
				particle: BACKGROUND
			},
			parent: "block/block",
			children: {
				base: {
					parent: "block/cube_all",
					render_type: "solid",
					textures: {
						all: BACKGROUND
					}
				},
				overlay: {
					parent: "block/cube_all",
					render_type: "translucent",
					textures: {
						all: ORE
					}
				}
			}
		}
	}

	// Common Block Tag(s) List
	const COMMON_BLOCK_TAGS = [
		"mekanism:cardboard_blacklist",
		"ae2:blacklisted/spatial",
		"deepdrilling:ore_nodes",
		"create_rns:deposit_blocks"
	]

	// Common Item Tag(s) List
	const COMMON_ITEM_TAGS = [
		`${Cmi.MODID}:deposit_blocks`
	]

	/**
	 * 矿石节点
	 * @param {string} name 注册ID
	 * @param {MiningLevel} level 挖掘等级
	 * @param {number} hardness 硬度
	 * @constructor
	 */
	function OreNodeBlock(name) {
		this.name = name
	}
	OreNodeBlock.prototype.build = function () {
		let builder = event.create(`${Cmi.MODID}:${this.name}_deposit_block`)

		// 设置基础信息
		builder.hardness(-1)
		builder.resistance(3600000)
		builder.noDrops()

		// 设置音效
		builder.soundType(SoundType.DEEPSLATE)

		// 模型
		builder.modelJson = simpleOreNodeModel(this.name)

		// 设置方块Tag
		COMMON_BLOCK_TAGS.forEach((tag) => {
			builder.tagBlock(tag)
		})

		// 设置物品Tag
		COMMON_ITEM_TAGS.forEach((tag) => {
			builder.tagItem(tag)
		})
		return builder
	}

	new OreNodeBlock("vanadium").build()
	new OreNodeBlock("platinum").build()
	new OreNodeBlock("cheese").build()
	new OreNodeBlock("coal").build()
	new OreNodeBlock("oil_shale").build()
	new OreNodeBlock("aluminum").build()
})
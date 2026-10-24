ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	/**
	 * 每桶冷却剂支持运行时间
	 */
	let perCoolerBucketTicks = 20

	let types = [
		"item",
		"fluid",
		"gas"
	]

	const DRILLER_BLOCKS = {
		0: Cmi.loadResource("driller_head").toString(),
		1: Cmi.loadResource("driller_fluid_pump").toString(),
		2: Cmi.loadResource("driller_gas_pump").toString()
	}

	// 燃料(冷却剂)
	cmi.multi_type_driller()
		.duration(perCoolerBucketTicks)
		.isFuel(true)
		.inputFluids(Fluid.of("cmi:glacious_cryotheum", 1000))

	/**
	 * 
	 * @param {Internal.Block_} deposit - 矿藏方块
	 */
	function DrillingRecipe(deposit) {
		this.deposit = deposit

		/**
		 * @type {{item: Special.Recipes.MultiTypeDrillerCmi, fluid: Special.Recipes.MultiTypeDrillerCmi, gas: Special.Recipes.MultiTypeDrillerCmi}}
		 */
		this.recipe = {}

		this.settings = {
			duration: null,
			energy: null,
			biomes: [],
			id: null
		}
	}

	/**
	 * 惰性创建子配方, 未调用 .item()/.fluid()/.gas() 就不会生成对应配方
	 *
	 * @param {"item" | "fluid" | "gas"} type
	 * @returns {Special.Recipes.MultiTypeDrillerCmi}
	 */
	DrillingRecipe.prototype.getRecipe = function (type) {
		let recipe = this.recipe[type]

		if (recipe) {
			return recipe
		}

		recipe = autoRecipe(this.deposit, { item: 0, fluid: 1, gas: 2 }[type])
		this.recipe[type] = recipe

		let settings = this.settings

		if (settings.duration) {
			recipe.duration(settings.duration[0] * multiplierOf(type, settings.duration[1], settings.duration[2]))
		}

		if (settings.energy) {
			recipe.perTick(energyPerTick(settings.energy[0] * multiplierOf(type, settings.energy[1], settings.energy[2])))
		}

		settings.biomes.forEach((biome) => {
			recipe.biome(biome)
		})

		if (settings.id) {
			recipe.id(`${settings.id}/${type}`)
		}

		return recipe
	}

	/**
	 * 取对应类型的乘数
	 *
	 * @param {"item" | "fluid" | "gas"} type
	 * @param {number} [fluidMultiplier=1]
	 * @param {number} [gasMultiplier=1]
	 * @returns {number}
	 */
	function multiplierOf(type, fluidMultiplier, gasMultiplier) {
		return type === "fluid" ? (fluidMultiplier || 1) : type === "gas" ? (gasMultiplier || 1) : 1
	}

	/**
	 * 
	 * @param {OutputItem_[] | OutputItem_} output - 物品输出, 最多9种
	 * @returns {DrillingRecipe}
	 */
	DrillingRecipe.prototype.item = function (output) {
		let recipe = this.getRecipe("item")
		recipe.outputItems.apply(recipe, Array.prototype.slice.call(arguments))

		return this
	}

	/**
	 * 
	 * @param {Internal.OutputFluid_[] | Internal.OutputFluid_} output - 流体输出, 最多2种
	 * @returns {DrillingRecipe}
	 */
	DrillingRecipe.prototype.fluid = function (output) {
		let recipe = this.getRecipe("fluid")
		recipe.outputFluids.apply(recipe, Array.prototype.slice.call(arguments))

		return this
	}

	/**
	 * 
	 * @param {Internal.Gas_} output - 气体输出, 只能有1种
	 * @returns {DrillingRecipe}
	 */
	DrillingRecipe.prototype.gas = function (output) {
		this.getRecipe("gas").outputGases(output)

		return this
	}

	/**
	 * 
	 * @param {number} duration - 持续时间
	 * @param {number} [fluidMultiplier=1] - 流体配方持续时间乘数, 默认为1
	 * @param {number} [gasMultiplier=1] - 气体配方持续时间乘数, 默认为1
	 * @returns {DrillingRecipe}
	 */
	DrillingRecipe.prototype.duration = function (duration, fluidMultiplier, gasMultiplier) {
		this.settings.duration = [duration, fluidMultiplier, gasMultiplier]

		types.forEach((type) => {
			let recipe = this.recipe[type]

			if (recipe) {
				recipe.duration(duration * multiplierOf(type, fluidMultiplier, gasMultiplier))
			}
		})

		return this
	}

	/**
	 * 
	 * @param {number} energy - 每tick消耗能量
	 * @param {number} [fluidMultiplier=1] - 流体配方每tick消耗能量乘数, 默认为1
	 * @param {number} [gasMultiplier=1] - 气体配方每tick消耗能量乘数, 默认为1
	 * @returns {DrillingRecipe}
	 */
	DrillingRecipe.prototype.energy = function (energy, fluidMultiplier, gasMultiplier) {
		this.settings.energy = [energy, fluidMultiplier, gasMultiplier]

		types.forEach((type) => {
			let recipe = this.recipe[type]

			if (recipe) {
				recipe.perTick(energyPerTick(energy * multiplierOf(type, fluidMultiplier, gasMultiplier)))
			}
		})

		return this
	}

	/**
	 * 
	 * @param {Internal.Biome_ | Internal.Biome_[]} biomes - 生物群系, 必须为id字符串或id字符串数组
	 * @returns {DrillingRecipe}
	 */
	DrillingRecipe.prototype.biome = function (biomes) {
		let biomeList = Array.isArray(biomes) ? biomes : [biomes]

		biomeList.forEach((biome) => {
			this.settings.biomes.push(biome)

			let recipes = Object.values(this.recipe)

			recipes.forEach((recipe) => {
				recipe.biome(biome)
			})
		})

		return this
	}

	/**
	 * 
	 * @param {ResourceLocation_} id 
	 * @returns {DrillingRecipe}
	 */
	DrillingRecipe.prototype.id = function (id) {
		this.settings.id = id

		types.forEach((type) => {
			let recipe = this.recipe[type]

			if (recipe) {
				recipe.id(`${id}/${type}`)
			}
		})

		return this
	}

	/**
	 * 
	 * @param {number} energy
	 * @returns {(recipe: Special.Recipes.MultiTypeDrillerCmi) => Special.Recipes.MultiTypeDrillerCmi}
	 */
	function energyPerTick(energy) {
		return (recipe) => {
			recipe.inputFE(energy)
		}
	}

	/**
	 * 
	 * @param {Internal.Block_} deposit - 矿藏方块
	 * @param {number} block - 0:钻头, 1:钻机液泵, 2:钻机气泵
	 * @returns {Special.Recipes.MultiTypeDrillerCmi}
	 */
	function autoRecipe(deposit, block) {
		let recipe = cmi.multi_type_driller()

		recipe.blocksInStructure(9, IntWrapper.getMaxValue(), deposit)
		recipe.addCondition(BlockExistCondition["of(java.lang.String[])"](DRILLER_BLOCKS[block]))
		recipe.slotName("cooler", (coolerRecipe) => {
			coolerRecipe.perTick((perTickCoolerRecipe) => {
				perTickCoolerRecipe.outputFluids(Fluid.of("neoecoae:cryotheum_solution", 1000 / perCoolerBucketTicks))
			})
		})

		return recipe
	}

	new DrillingRecipe(Block.getBlock("create_rns:coal_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "mekanism:dust_coal"],
			["mekanism:dust_coal"],
			["mekanism:dust_coal", "cmi:deposit_dust"],
			["mekanism:dust_coal", "minecraft:coal"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["minecraft:coal", "minecraft:coal_ore", "minecraft:deepslate_coal_ore"],
			["mekanism:dust_coal", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["minecraft:diamond"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/coal")


	new DrillingRecipe(Block.getBlock("create_rns:redstone_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "create_rns:redstone_small_dust"],
			["create_rns:redstone_small_dust"],
			["thermal:quartz_dust", "cmi:deposit_dust"],
			["create_rns:redstone_small_dust", "minecraft:redstone"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["minecraft:redstone_ore", "minecraft:deepslate_redstone_ore"],
			["ae2:certus_quartz_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["create:rose_quartz"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/redstone")

	new DrillingRecipe(Block.getBlock("create_rns:quartz_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "thermal:quartz_dust"],
			["thermal:quartz_dust"],
			["tconstruct:cobalt_shard", "create:cinder_flour"],
			["ae2:certus_quartz_crystal", "minecraft:quartz"],
			["minecraft:blackstone", "minecraft:netherrack", "create:scoria", "minecraft:basalt", "cmi:deposit_dust"],
			["minecraft:nether_quartz_ore", "cmi:quartz_ore", "cmi:deepslate_quartz_ore"],
			["create_rns:redstone_small_dust", "minecraft:amethyst_shard", "tconstruct:ichor_slime_crystal"],
			["ae2:certus_quartz_crystal"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/quartz")

	new DrillingRecipe(Block.getBlock("cmi:vanadium_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "cmi:dirty_vanadium_dust"],
			["cmi:vanadium_ore_chunk"],
			["cmi:vanadium_ore_chunk", "create:cinder_flour"],
			["cmi:raw_vanadium", "cmi:crushed_raw_vanadium"],
			["minecraft:blackstone", "minecraft:netherrack", "create:scoria", "minecraft:basalt", "cmi:deposit_dust"],
			["cmi:nether_vanadium_ore"],
			["minecraft:quartz", "minecraft:amethyst_shard", "tconstruct:ichor_slime_crystal"],
			["minecraft:amethyst_block"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/vanadium")

	new DrillingRecipe(Block.getBlock("create_rns:cobalt_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "cmi:dirty_cobalt_dust"],
			["tconstruct:cobalt_shard"],
			["tconstruct:cobalt_shard", "create:cinder_flour"],
			["tconstruct:raw_cobalt", "cmi:crushed_raw_vanadium"],
			["minecraft:blackstone", "minecraft:netherrack", "create:scoria", "minecraft:basalt", "cmi:deposit_dust"],
			["tconstruct:cobalt_ore"],
			["tconstruct:knightmetal_shard", "minecraft:amethyst_shard", "tconstruct:ichor_slime_crystal"],
			["tconstruct:knightmetal_cluster"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/cobalt")

	new DrillingRecipe(Block.getBlock("create_rns:copper_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "mekanism:dirty_dust_copper"],
			["thermal_extra:copper_ore_chunk"],
			["thermal_extra:copper_ore_chunk", "cmi:veridium_dust"],
			["minecraft:raw_copper", "create:crushed_raw_copper"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["create:veridium", "minecraft:copper_ore", "minecraft:deepslate_copper_ore"],
			["minecraft:clay_ball", "minecraft:amethyst_shard", "tconstruct:sky_slime_crystal"],
			["minecraft:clay"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/copper")

	new DrillingRecipe(Block.getBlock("create_rns:iron_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "mekanism:dirty_dust_iron"],
			["thermal_extra:iron_ore_chunk"],
			["thermal_extra:iron_ore_chunk", "cmi:crimsite_dust"],
			["minecraft:raw_iron", "create:crushed_raw_iron"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["create:crimsite", "minecraft:iron_ore", "minecraft:deepslate_iron_ore"],
			["create_rns:redstone_small_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["minecraft:redstone"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/iron")

	new DrillingRecipe(Block.getBlock("create_rns:zinc_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "cmi:dirty_zinc_dust"],
			["thermal_extra:zinc_ore_chunk"],
			["thermal_extra:zinc_ore_chunk", "cmi:asurine_dust"],
			["create:raw_zinc", "create:crushed_raw_zinc"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["create:asurine", "create:zinc_ore", "create:deepslate_zinc_ore"],
			["thermal:niter_dust", "minecraft:amethyst_shard", "tconstruct:sky_slime_crystal"],
			["thermal:niter"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/zinc")

	new DrillingRecipe(Block.getBlock("create_rns:gold_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "mekanism:dirty_dust_gold"],
			["thermal_extra:gold_ore_chunk"],
			["thermal_extra:gold_ore_chunk", "cmi:ochrum_dust"],
			["minecraft:raw_gold", "create:crushed_raw_gold"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["create:ochrum", "minecraft:gold_ore", "minecraft:deepslate_gold_ore"],
			["thermal:quartz_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["minecraft:quartz"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/gold")

	new DrillingRecipe(Block.getBlock("create_rns:tin_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "mekanism:dirty_dust_tin"],
			["thermal_extra:tin_ore_chunk"],
			["thermal_extra:tin_ore_chunk", "thermal:apatite_dust"],
			["thermal:raw_tin", "create:crushed_raw_tin"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["thermal:apatite", "thermal:tin_ore", "thermal:deepslate_tin_ore"],
			["thermal:apatite_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["thermal:apatite"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/tin")

	new DrillingRecipe(Block.getBlock("create_rns:lead_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "mekanism:dirty_dust_lead"],
			["thermal_extra:lead_ore_chunk"],
			["thermal_extra:lead_ore_chunk", "alexscaves:gumball_pile"],
			["thermal:raw_lead", "create:crushed_raw_lead"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["alexscaves:candy_cane", "thermal:lead_ore", "thermal:deepslate_lead_ore"],
			["minecraft:sugar", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["alexscaves:caramel"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/lead")

	new DrillingRecipe(Block.getBlock("create_rns:nickel_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "cmi:dirty_nickel_dust"],
			["thermal_extra:nickel_ore_chunk"],
			["thermal_extra:nickel_ore_chunk", "cmi:oil_shale_dust"],
			["thermal:raw_nickel", "create:crushed_raw_nickel"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["cmi:oil_shale", "thermal:nickel_ore", "thermal:deepslate_nickel_ore"],
			["mekanism:dust_coal", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["minecraft:coal"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/nickel")

	new DrillingRecipe(Block.getBlock("create_rns:silver_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "cmi:dirty_silver_dust"],
			["thermal_extra:silver_ore_chunk"],
			["thermal_extra:silver_ore_chunk", "cmi:sludge_extract"],
			["thermal:raw_silver", "create:crushed_raw_silver"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["minecraft:mud", "thermal:silver_ore", "thermal:deepslate_silver_ore"],
			["cmi:dirty_etrium_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["cmi:raw_etrium"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/silver")

	new DrillingRecipe(Block.getBlock("create_rns:uranium_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "mekanism:dirty_dust_uranium"],
			["thermal_extra:uranium_ore_chunk"],
			["thermal_extra:uranium_ore_chunk", "mekanism:dirty_dust_uranium"],
			["immersiveengineering:raw_uranium", "create:crushed_raw_uranium"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["create:crushed_raw_uranium", "alexscaves:radrock_uranium_ore"],
			["thermal:sulfur_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["alexscaves:sulfur_cluster"]
		)
		.fluid(Fluid.of("alexscaves:acid", 1000))
		.gas("100x cmi:radon")
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/uranium")

	new DrillingRecipe(Block.getBlock("create_rns:osmium_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "mekanism:dirty_dust_osmium"],
			["thermal_extra:osmium_ore_chunk"],
			["thermal_extra:osmium_ore_chunk", "cmi:dirty_vanadium_dust"],
			["mekanism:raw_osmium", "create:crushed_raw_osmium"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["cmi:nether_osmium_ore", "mekanism:osmium_ore", "mekanism:deepslate_osmium_ore"],
			["mekanism:dust_fluorite", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["mekanism:fluorite_gem"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/osmium")

	new DrillingRecipe(Block.getBlock("cmi:aluminum_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "cmi:dirty_aluminum_dust"],
			["thermal_extra:aluminum_ore_chunk"],
			["thermal_extra:aluminum_ore_chunk", "cmi:red_mud"],
			["immersiveengineering:raw_aluminum", "create:crushed_raw_aluminum"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["create:crimsite", "immersiveengineering:ore_aluminum", "immersiveengineering:deepslate_ore_aluminum"],
			["cmi:dreamcore_seed", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["cmi:dreamcore_ore"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/aluminum")

	new DrillingRecipe(Block.getBlock("cmi:platinum_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "cmi:dirty_platinum_dust"],
			["cmi:platinum_ore_chunk"],
			["cmi:platinum_ore_chunk", "cmi:end_stone_dust"],
			["cmi:raw_platinum", "create:crushed_raw_platinum"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["minecraft:end_stone", "cmi:moon_platinum_ore"],
			["minecraft:glowstone_dust", "minecraft:amethyst_shard", "tconstruct:sky_slime_crystal"],
			["minecraft:glowstone"]
		)
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/platinum")

	new DrillingRecipe(Block.getBlock("cmi:oil_shale_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "cmi:oil_shale_dust"],
			["cmi:oil_shale_dust"],
			["cmi:oil_shale_dust", "cmi:deposit_dust"],
			["cmi:oil_shale_dust", "cmi:oil_shale"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["cmi:oil_shale"],
			["cmi:oil_shale_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["thermal:bitumen"]
		)
		.fluid(Fluid.of("createdieselgenerators:crude_oil", 1000))
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/oil_shale")

	new DrillingRecipe(Block.getBlock("cmi:cheese_deposit_block"))
		.item(["cmi:deposit_dust"],
			["cmi:deposit_dust", "ad_astra:cheese"],
			["tconstruct:cheese_ingot"],
			["ad_astra:cheese", "cmi:deposit_dust"],
			["tconstruct:cheese_ingot", "ad_astra:cheese"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["ad_astra:cheese_block", "tconstruct:cheese_block", "ad_astra:moon_cheese_ore"],
			["tconstruct:cheese_ingot", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			["ad_astra:cheese_block"]
		)
		.fluid(Fluid.of("minecraft:milk", 1000))
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:multi_type_driller/cheese")

	new DrillingRecipe(Block.getBlock("cmi:peat_block"))
		.gas("100x cmi:natural_gas")
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.biome(["minecraft:swamp", "minecraft:mangrove_swamp"])
		.id("cmi:multi_type_driller/natural_gas")
})
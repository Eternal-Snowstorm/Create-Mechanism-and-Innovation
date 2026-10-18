ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	/**
	 * 每桶冷却剂支持运行时间
	 */
	const perCoolerBucketTicks = 20

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
		/**
		 * @type {{item: Special.Recipes.MultiTypeDrillerCmi, fluid: Special.Recipes.MultiTypeDrillerCmi, gas: Special.Recipes.MultiTypeDrillerCmi}}
		 */
		this.recipe = {
			item: autoRecipe(deposit, 0),
			fluid: autoRecipe(deposit, 1),
			gas: autoRecipe(deposit, 2)
		}
	}

	/**
	 * 
	 * @param {OutputItem_[] | OutputItem_} output - 物品输出, 最多9种
	 * @returns {DrillingRecipe}
	 */
	DrillingRecipe.prototype.item = function (output) {
		this.recipe.item.outputItems(output)

		return this
	}

	/**
	 * 
	 * @param {Internal.OutputFluid_[] | Internal.OutputFluid_} output - 流体输出, 最多2种
	 * @returns {DrillingRecipe}
	 */
	DrillingRecipe.prototype.fluid = function (output) {
		this.recipe.fluid.outputFluids(output)

		return this
	}

	/**
	 * 
	 * @param {Internal.Gas_} output - 气体输出, 只能有1种
	 * @returns {DrillingRecipe}
	 */
	DrillingRecipe.prototype.gas = function (output) {
		this.recipe.gas.outputGases(output)

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
		this.recipe.item.duration(duration)
		this.recipe.fluid.duration((fluidMultiplier || 1) * duration)
		this.recipe.gas.duration((gasMultiplier || 1) * duration)

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
		this.recipe.item.perTick(energyPerTick(energy))
		this.recipe.fluid.perTick(energyPerTick((fluidMultiplier || 1) * energy))
		this.recipe.gas.perTick(energyPerTick((gasMultiplier || 1) * energy))

		return this
	}

	/**
	 * 
	 * @param {ResourceLocation_} id 
	 * @returns {DrillingRecipe}
	 */
	DrillingRecipe.prototype.id = function (id) {
		this.recipe.item.id(`${id}/item`)
		this.recipe.fluid.id(`${id}/fluid`)
		this.recipe.gas.id(`${id}/gas`)

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
		return cmi.multi_type_driller()
			.blocksInStructure(9, IntWrapper.getMaxValue(), deposit)
			.addCondition(BlockExistCondition["of(java.lang.String[])"](DRILLER_BLOCKS[block]))
			.slotName("cooler", (coolerRecipe) => {
				coolerRecipe.perTick((perTickCoolerRecipe) => {
					perTickCoolerRecipe.outputFluids(Fluid.of("neoecoae:cryotheum_solution", 1000 / perCoolerBucketTicks))
				})
			})
	}

	new DrillingRecipe(Block.getBlock("create_rns:iron_deposit_block"))
		.item([
			"cmi:deposit_dust",
			["cmi:deposit_dust", "thermal_extra:iron_ore_chunk"],
			"thermal_extra:iron_ore_chunk",
			["thermal:quartz_dust", "cmi:deposit_dust"],
			["minecraft:raw_iron", "create:crushed_raw_iron"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["minecraft:iron_ore", "minecraft:deepslate_iron_ore"],
			["minecraft:redstone", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			"mekanism:clump_iron"
		])
		.fluid(Fluid.of("tconstruct:molten_iron", 50))
		.gas("100x mekanism:hydrogen")
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)

	new DrillingRecipe(Block.getBlock("create_rns:redstone_deposit_block"))
		.item([
			"cmi:deposit_dust",
			["cmi:deposit_dust", "create_rns:redstone_small_dust"],
			"create_rns:redstone_small_dust",
			["thermal:quartz_dust", "cmi:deposit_dust"],
			["create_rns:redstone_small_dust", "minecraft:redstone"],
			["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"],
			["minecraft:redstone_ore", "minecraft:deepslate_redstone_ore"],
			["ae2:certus_quartz_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			"create:rose_quartz"
		])
		.fluid([
			Fluid.of("immersiveengineering:redstone_acid", 50),
			Fluid.of("thermal:redstone", 50)
		])
		.gas("100x mekanism:hydrogen")
		.duration(10)
		.energy(10000)

	new DrillingRecipe(Block.getBlock("create_rns:coal_deposit_block"))
		.item([
			"cmi:deposit_dust",
			["cmi:deposit_dust", "mekanism:dust_coal"],
			"mekanism:dust_coal",
			["minecraft:coal", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"],
			"minecraft:diamond"
		])
		.fluid(Fluid.of("create_dragon_plus:black_dye", 50))
		.gas("20x mekanism:hydrogen")
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)

	new DrillingRecipe(Block.getBlock("create_rns:copper_deposit_block"))
		.item([
			"cmi:deposit_dust",
			["cmi:deposit_dust", "mekanism:dirty_dust_copper"],
			"thermal_extra:copper_ore_chunk",
			["minecraft:raw_copper", "create:crushed_raw_copper"],
			["minecraft:clay_ball", "minecraft:amethyst_shard", "tconstruct:sky_slime_crystal"],
			"minecraft:clay"
		])
		.fluid(Fluid.of("tconstruct:molten_copper", 50))
		.gas("100x mekanism:oxygen")
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)

	new DrillingRecipe(Block.getBlock("create_rns:quartz_deposit_block"))
		.item([
			"cmi:deposit_dust",
			["cmi:deposit_dust", "thermal:quartz_dust"],
			"thermal:quartz_dust",
			["tconstruct:cobalt_shard", "create:cinder_flour"],
			["ae2:certus_quartz_crystal", "minecraft:quartz"],
			["minecraft:blackstone", "minecraft:netherrack", "cmi:deposit_dust"],
			["minecraft:nether_quartz_ore", "cmi:quartz_ore", "cmi:deepslate_quartz_ore"]
		])
		.fluid(Fluid.of("tconstruct:molten_quartz", 50))
		.gas("100x mekanism:hydrogen")
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)

	new DrillingRecipe(Block.getBlock("cmi:cheese_deposit_block"))
		.item([
			"cmi:deposit_dust",
			["cmi:deposit_dust", "ad_astra:cheese"],
			"tconstruct:cheese_ingot",
			["ad_astra:cheese", "cmi:deposit_dust"],
			["tconstruct:cheese_ingot", "ad_astra:cheese"],
			["tconstruct:cheese_ingot", "minecraft:amethyst_shard"],
			"ad_astra:cheese_block",
			"tconstruct:cheese_block",
			"ad_astra:moon_cheese_ore"
		])
		.fluid(Fluid.of("minecraft:milk", 50))
		.gas("20x mekanism:hydrogen")
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
})
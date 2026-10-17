ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	/**
	 * 
	 * @param {Internal.Block_} deposit - 矿藏方块
	 */
	function DrillingRecipe(deposit) {
		/**
		 * @type {{item: Special.Recipes.MultiTypeDrillerCmi, fluid: Special.Recipes.MultiTypeDrillerCmi, gas: Special.Recipes.MultiTypeDrillerCmi}}
		 */
		this.recipe = {
			item: cmi.multi_type_driller()
				.blocksInStructure(9, IntWrapper.getMaxValue(), deposit)
				.addCondition(new BlockExistCondition(Block.getBlock("cmi:driller_head")))
				.slotName("cooler", coolerOutputFluid),
			fluid: cmi.multi_type_driller()
				.blocksInStructure(9, IntWrapper.getMaxValue(), deposit)
				.addCondition(new BlockExistCondition(Block.getBlock("cmi:driller_fluid_pump")))
				.slotName("cooler", coolerOutputFluid),
			gas: cmi.multi_type_driller()
				.blocksInStructure(9, IntWrapper.getMaxValue(), deposit)
				.addCondition(new BlockExistCondition(Block.getBlock("cmi:driller_gas_pump")))
				.slotName("cooler", coolerOutputFluid)
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
		this.recipe.fluid.duration(duration * (fluidMultiplier ?? 1))
		this.recipe.gas.duration(duration * (gasMultiplier ?? 1))

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
		this.recipe.fluid.perTick(energyPerTick(energy * (fluidMultiplier ?? 1)))
		this.recipe.gas.perTick(energyPerTick(energy * (gasMultiplier ?? 1)))

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
		return (recipe) => recipe.inputFE(energy)
	}

	/**
	 * 
	 * @param {Special.Recipes.MultiTypeDrillerCmi} recipeS 
	 */
	function coolerOutputFluid(recipeS) {
		recipeS.perTick((recipeP) => {
			recipeP.outputFluids(Fluid.of("neoecoae:cryotheum_solution", 5000))
		})
	}

	new DrillingRecipe(Block.getBlock("create_rns:iron_deposit_block"))
		.item("cmi:deposit_dust")
		.fluid(Fluid.of("minecraft:water", 50))
		.gas("20x mekanism:hydrogen")
		.duration(100, 1.5, 2)
		.energy(100, 1, 2)
		.id("cmi:driller/iron")

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
		.gas("1000x mekanism:hydrogen")
		.duration(10)
		.energy(10000)
		.id("cmi:driller/redstone")
	
	cmi.multi_type_driller()
		.duration(1)
		.isFuel(true)
		.inputFluids(Fluid.of("cmi:glacious_cryotheum", 5000))
		.id("cmi:driller/fuel")
})
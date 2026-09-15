ServerEvents.recipes((event) => {
	let { create_rns } = event.getRecipes()

	/**
	 * 构造函数的builder
	 * 
	 * @param {InputItem_} depositBlock 被矿机开采的方块ID
	 */
	function MiningRecipe(depositBlock) {
		this.builder = create_rns.mining()
			.block(depositBlock.toString())
			.replaceWhenDepleted("create_rns:depleted_deposit_block")
			// 左右脑互搏这一块
			// .durability({
			// 	core: 200000,
			// 	edge: 75000,
			// 	random_spread: 0.2
			// })
			.durability(200000, 75000, 0.2)
		return this
	}
	/**
	 * 设置配方运行的维度, 若为空则默认为主世界
	 * 
	 * @param {ResourceLocation_} dimension 配方运行的维度
	 * @returns 
	 */
	MiningRecipe.prototype.dimension = function (dimension) {
		if (dimension === "minecraft:the_nether") {
			this.builder.nether()
		} else if (dimension === "minecraft:overworld") {
			this.builder.overworld()
		}
		return this
	}
	/**
	 * 
	 * @param {InputItem_[]} item 默认输出的产物
	 * @returns 
	 */
	MiningRecipe.prototype.defaultItem = function (item) {
		this.builder.yield((builder) => {
			builder.item(item)
		})
		return this
	}
	/**
	 * 设置"超频"催化下的开采产物
	 * 
	 * @param {Number} chance 产物输出的概率
	 * @param {InputItem_[]} item 该催化效果下输出的产物
	 * @returns 
	 */
	MiningRecipe.prototype.overclockItem = function (chance, item) {
		this.builder.yield((builder) => {
			builder.chance(chance)
			item.forEach((output) => {
				builder.item(output)
			})
			builder.catalyst("create_rns:overclock")
		})
		return this
	}
	/**
	 * 设置"微弱共振"催化下的开采产物
	 * 
	 * @param {Number} chance 产物输出的概率
	 * @param {InputItem_[]} item 该催化效果下输出的产物
	 * @returns 
	 */
	MiningRecipe.prototype.faintResonanceItem = function (chance, item) {
		this.builder.yield((builder) => {
			builder.chance(chance)
			item.forEach((output) => {
				builder.item(output)
			})
			builder.catalyst("create_rns:faint_resonance")
			builder.catalyst("create_rns:overclock")
			builder.jeiSlotColor("#968CB3")
		})
		return this
	}
	/**
	 * 设置"共振"催化下的开采产物
	 * 
	 * @param {Number} chance 产物输出的概率
	 * @param {InputItem_[]} item 该催化效果下输出的产物
	 * @returns 
	 */
	MiningRecipe.prototype.resonanceItem = function (chance, item) {
		this.builder.yield((builder) => {
			builder.chance(chance)
			item.forEach((output) => {
				builder.item(output)
			})
			builder.catalyst("create_rns:resonance")
			builder.catalyst("create_rns:overclock")
			builder.jeiSlotColor("#8572BF")
		})
		return this
	}
	/**
	 * 设置"微弱破碎共振"催化下的开采产物
	 * 
	 * @param {Number} chance 产物输出的概率
	 * @param {InputItem_[]} item 该催化效果下输出的产物
	 * @returns 
	 */
	MiningRecipe.prototype.faintShatterItem = function (chance, item) {
		this.builder.yield((builder) => {
			builder.chance(chance)
			item.forEach((output) => {
				builder.item(output)
			})
			builder.catalyst("create_rns:faint_shattering_resonance")
			builder.jeiSlotColor("#B28F8E")
		})
		return this
	}
	/**
	 * 设置"破碎共振"催化下的开采产物
	 * 
	 * @param {Number} chance 产物输出的概率
	 * @param {InputItem_[]} item 该催化效果下输出的产物
	 * @returns 
	 */
	MiningRecipe.prototype.shatterItem = function (chance, item) {
		this.builder.yield((builder) => {
			builder.chance(chance)
			item.forEach((output) => {
				builder.item(output)
			})
			builder.catalyst("create_rns:shattering_resonance")
			builder.catalyst("create_rns:overclock")
			builder.jeiSlotColor("#BF7672")
		})
		return this
	}

	/**
	 * 设置"微弱稳定共振"催化下的开采产物
	 * 
	 * @param {Number} chance 产物输出的概率
	 * @param {InputItem_[]} item 该催化效果下输出的产物
	 * @returns 
	 */
	MiningRecipe.prototype.faintStabilizeItem = function (chance, item) {
		this.builder.yield((builder) => {
			builder.chance(chance)
			item.forEach((output) => {
				builder.item(output)
			})
			builder.catalyst("create_rns:faint_stabilizing_resonance")
			builder.catalyst("create_rns:overclock")
			builder.jeiSlotColor("#8EA9B2")
		})
		return this
	}
	/**
	 * 设置"稳定共振"催化下的开采产物
	 * 
	 * @param {Number} chance 产物输出的概率
	 * @param {InputItem_[]} item 该催化效果下输出的产物
	 * @returns 
	 */
	MiningRecipe.prototype.stabilizeItem = function (chance, item) {
		this.builder.yield((builder) => {
			builder.chance(chance)
			item.forEach((output) => {
				builder.item(output)
			})
			builder.catalyst("create_rns:stabilizing_resonance")
			builder.catalyst("create_rns:overclock")
			builder.jeiSlotColor("#72ACBF")
		})
		return this
	}
	/**
	 * 最终执行配方的构建, 是实际输出配方的链式方法
	 * 该链式方法需要置于最后
	 * 
	 * @param {string} [id] 配方ID, 为空则自动生成kjs id
	 */
	MiningRecipe.prototype.build = function (id) {
		if (id != null) {
			this.builder.id(id)
		}
	}
	new MiningRecipe("create_rns:coal_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(5.0E-4, ["cmi:deposit_dust", "mekanism:dust_coal"])
		.overclockItem(0.5, ["mekanism:dust_coal"])
		.faintResonanceItem(0.05, ["mekanism:dust_coal", "cmi:deposit_dust"])
		.resonanceItem(5.0E-4, ["mekanism:dust_coal", "minecraft:coal"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["minecraft:coal", "minecraft:coal_ore", "minecraft:deepslate_coal_ore"])
		.faintStabilizeItem(0.15, ["mekanism:dust_coal", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["minecraft:diamond"])
		.build("create_rns:coal_deposit_block")

	new MiningRecipe("create_rns:redstone_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(5.0E-4, ["cmi:deposit_dust", "create_rns:redstone_small_dust"])
		.overclockItem(0.5, ["create_rns:redstone_small_dust"])
		.faintResonanceItem(0.05, ["thermal:quartz_dust", "cmi:deposit_dust"])
		.resonanceItem(5.0E-4, ["create_rns:redstone_small_dust", "minecraft:redstone"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["minecraft:redstone_ore", "minecraft:deepslate_redstone_ore"])
		.faintStabilizeItem(0.15, ["ae2:certus_quartz_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["create:rose_quartz"])
		.build("create_rns:redstone_deposit_block")

	new MiningRecipe("create_rns:quartz_deposit_block")
		.dimension("minecraft:the_nether")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(5.0E-4, ["cmi:deposit_dust", "thermal:quartz_dust"])
		.overclockItem(0.5, ["thermal:quartz_dust"])
		.faintResonanceItem(0.05, ["tconstruct:cobalt_shard", "create:cinder_flour"])
		.resonanceItem(5.0E-4, ["ae2:certus_quartz_crystal", "minecraft:quartz"])
		.faintShatterItem(1, ["minecraft:blackstone", "minecraft:netherrack", "create:scoria", "minecraft:basalt", "cmi:deposit_dust"])
		.shatterItem(0.3, ["minecraft:nether_quartz_ore", "cmi:quartz_ore", "cmi:deepslate_quartz_ore"])
		.faintStabilizeItem(0.15, ["create_rns:redstone_small_dust", "minecraft:amethyst_shard", "tconstruct:ichor_slime_crystal"])
		.stabilizeItem(0.06, ["ae2:certus_quartz_crystal"])
		.build("create_rns:nether_quartz_deposit_block")

	new MiningRecipe("cmi:vanadium_deposit_block")
		.dimension("minecraft:the_nether")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(5.0E-4, ["cmi:deposit_dust", "cmi:dirty_vanadium_dust"])
		.overclockItem(0.5, ["cmi:vanadium_ore_chunk"])
		.faintResonanceItem(0.05, ["cmi:vanadium_ore_chunk", "create:cinder_flour"])
		.resonanceItem(5.0E-4, ["cmi:raw_vanadium", "cmi:crushed_raw_vanadium"])
		.faintShatterItem(1, ["minecraft:blackstone", "minecraft:netherrack", "create:scoria", "minecraft:basalt", "cmi:deposit_dust"])
		.shatterItem(0.3, ["cmi:nether_vanadium_ore"])
		.faintStabilizeItem(0.15, ["minecraft:quartz", "minecraft:amethyst_shard", "tconstruct:ichor_slime_crystal"])
		.stabilizeItem(0.06, ["minecraft:amethyst_block"])
		.build()

	new MiningRecipe("create_rns:cobalt_deposit_block")
		.dimension("minecraft:the_nether")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(5.0E-4, ["cmi:deposit_dust", "cmi:dirty_cobalt_dust"])
		.overclockItem(0.5, ["tconstruct:cobalt_shard"])
		.faintResonanceItem(0.05, ["tconstruct:cobalt_shard", "create:cinder_flour"])
		.resonanceItem(5.0E-4, ["tconstruct:raw_cobalt", "cmi:crushed_raw_vanadium"])
		.faintShatterItem(1, ["minecraft:blackstone", "minecraft:netherrack", "create:scoria", "minecraft:basalt", "cmi:deposit_dust"])
		.shatterItem(0.3, ["tconstruct:cobalt_ore"])
		.faintStabilizeItem(0.15, ["tconstruct:knightmetal_shard", "minecraft:amethyst_shard", "tconstruct:ichor_slime_crystal"])
		.stabilizeItem(0.06, ["tconstruct:knightmetal_cluster"])
		.build("create_rns:nether_cobalt_deposit_block")

	new MiningRecipe("create_rns:copper_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "mekanism:dirty_dust_copper"])
		.overclockItem(0.5, ["thermal_extra:copper_ore_chunk"])
		.faintResonanceItem(0.05, ["thermal_extra:copper_ore_chunk", "cmi:veridium_dust"])
		.resonanceItem(0.2, ["minecraft:raw_copper", "create:crushed_raw_copper"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["create:veridium", "minecraft:copper_ore", "minecraft:deepslate_copper_ore"])
		.faintStabilizeItem(0.15, ["minecraft:clay_ball", "minecraft:amethyst_shard", "tconstruct:sky_slime_crystal"])
		.stabilizeItem(0.06, ["minecraft:clay"])
		.build("create_rns:copper_deposit_block")

	new MiningRecipe("create_rns:iron_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "mekanism:dirty_dust_iron"])
		.overclockItem(0.5, ["thermal_extra:iron_ore_chunk"])
		.faintResonanceItem(0.05, ["thermal_extra:iron_ore_chunk", "cmi:crimsite_dust"])
		.resonanceItem(0.2, ["minecraft:raw_iron", "create:crushed_raw_iron"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["create:crimsite", "minecraft:iron_ore", "minecraft:deepslate_iron_ore"])
		.faintStabilizeItem(0.15, ["create_rns:redstone_small_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["minecraft:redstone"])
		.build("create_rns:iron_deposit_block")

	new MiningRecipe("create_rns:zinc_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "cmi:dirty_zinc_dust"])
		.overclockItem(0.5, ["thermal_extra:zinc_ore_chunk"])
		.faintResonanceItem(0.05, ["thermal_extra:zinc_ore_chunk", "cmi:asurine_dust"])
		.resonanceItem(0.2, ["create:raw_zinc", "create:crushed_raw_zinc"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["create:asurine", "create:zinc_ore", "create:deepslate_zinc_ore"])
		.faintStabilizeItem(0.15, ["thermal:niter_dust", "minecraft:amethyst_shard", "tconstruct:sky_slime_crystal"])
		.stabilizeItem(0.06, ["thermal:niter"])
		.build("create_rns:zinc_deposit_block")

	new MiningRecipe("create_rns:gold_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "mekanism:dirty_dust_gold"])
		.overclockItem(0.5, ["thermal_extra:gold_ore_chunk"])
		.faintResonanceItem(0.05, ["thermal_extra:gold_ore_chunk", "cmi:ochrum_dust"])
		.resonanceItem(0.2, ["minecraft:raw_gold", "create:crushed_raw_gold"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["create:ochrum", "minecraft:gold_ore", "minecraft:deepslate_gold_ore"])
		.faintStabilizeItem(0.15, ["thermal:quartz_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["minecraft:quartz"])
		.build("create_rns:gold_deposit_block")

	new MiningRecipe("create_rns:gold_deposit_block")
		.dimension("minecraft:the_nether")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "mekanism:dirty_dust_gold"])
		.overclockItem(0.5, ["thermal_extra:gold_ore_chunk"])
		.faintResonanceItem(0.05, ["thermal_extra:gold_ore_chunk", "cmi:ochrum_dust"])
		.resonanceItem(0.2, ["minecraft:raw_gold", "create:crushed_raw_gold"])
		.faintShatterItem(1, ["minecraft:netherrack", "minecraft:basalt", "minecraft:blackstone", "create:scoria", "cmi:deposit_dust"])
		.shatterItem(0.3, ["create:ochrum", "minecraft:gold_ore", "minecraft:deepslate_gold_ore"])
		.faintStabilizeItem(0.15, ["thermal:quartz_dust", "minecraft:amethyst_shard", "tconstruct:ichor_slime_crystal"])
		.stabilizeItem(0.06, ["minecraft:quartz"])
		.build("create_rns:nether_gold_deposit_block")

	new MiningRecipe("create_rns:tin_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "mekanism:dirty_dust_tin"])
		.overclockItem(0.5, ["thermal_extra:tin_ore_chunk"])
		.faintResonanceItem(0.05, ["thermal_extra:tin_ore_chunk", "thermal:apatite_dust"])
		.resonanceItem(0.2, ["thermal:raw_tin", "create:crushed_raw_tin"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["thermal:apatite", "thermal:tin_ore", "thermal:deepslate_tin_ore"])
		.faintStabilizeItem(0.15, ["thermal:apatite_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["thermal:apatite"])
		.build("create_rns:tin_deposit_block")

	new MiningRecipe("create_rns:lead_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "mekanism:dirty_dust_lead"])
		.overclockItem(0.5, ["thermal_extra:lead_ore_chunk"])
		.faintResonanceItem(0.05, ["thermal_extra:lead_ore_chunk", "alexscaves:gumball_pile"])
		.resonanceItem(0.2, ["thermal:raw_lead", "create:crushed_raw_lead"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["alexscaves:candy_cane", "thermal:lead_ore", "thermal:deepslate_lead_ore"])
		.faintStabilizeItem(0.15, ["minecraft:sugar", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["alexscaves:caramel"])
		.build("create_rns:lead_deposit_block")

	new MiningRecipe("create_rns:nickel_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "cmi:dirty_nickel_dust"])
		.overclockItem(0.5, ["thermal_extra:nickel_ore_chunk"])
		.faintResonanceItem(0.05, ["thermal_extra:nickel_ore_chunk", "cmi:oil_shale_dust"])
		.resonanceItem(0.2, ["thermal:raw_nickel", "create:crushed_raw_nickel"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["cmi:oil_shale", "thermal:nickel_ore", "thermal:deepslate_nickel_ore"])
		.faintStabilizeItem(0.15, ["mekanism:dust_coal", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["minecraft:coal"])
		.build("create_rns:nickel_deposit_block")

	new MiningRecipe("create_rns:silver_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "cmi:dirty_silver_dust"])
		.overclockItem(0.5, ["thermal_extra:silver_ore_chunk"])
		.faintResonanceItem(0.05, ["thermal_extra:silver_ore_chunk", "cmi:sludge_extract"])
		.resonanceItem(0.2, ["thermal:raw_silver", "create:crushed_raw_silver"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["minecraft:mud", "thermal:silver_ore", "thermal:deepslate_silver_ore"])
		.faintStabilizeItem(0.15, ["cmi:dirty_etrium_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["cmi:raw_etrium"])
		.build("create_rns:silver_deposit_block")

	new MiningRecipe("create_rns:uranium_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "mekanism:dirty_dust_uranium"])
		.overclockItem(0.5, ["thermal_extra:uranium_ore_chunk"])
		.faintResonanceItem(0.05, ["thermal_extra:uranium_ore_chunk", "cmi:dirty_vanadium_dust"])
		.resonanceItem(0.2, ["immersiveengineering:raw_uranium", "create:crushed_raw_uranium"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["cmi:crushed_raw_vanadium", "alexscaves:radrock_uranium_ore"])
		.faintStabilizeItem(0.15, ["thermal:sulfur_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["alexscaves:sulfur_cluster"])
		.build("create_rns:uranium_deposit_block")

	new MiningRecipe("create_rns:osmium_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "mekanism:dirty_dust_osmium"])
		.overclockItem(0.5, ["thermal_extra:osmium_ore_chunk"])
		.faintResonanceItem(0.05, ["thermal_extra:osmium_ore_chunk", "cmi:dirty_vanadium_dust"])
		.resonanceItem(0.2, ["mekanism:raw_osmium", "create:crushed_raw_osmium"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["cmi:nether_osmium_ore", "mekanism:osmium_ore","mekanism:deepslate_osmium_ore"])
		.faintStabilizeItem(0.15, ["mekanism:dust_fluorite", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["mekanism:fluorite_gem"])
		.build("create_rns:osmium_deposit_block")

	new MiningRecipe("cmi:aluminum_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "cmi:dirty_aluminum_dust"])
		.overclockItem(0.5, ["thermal_extra:aluminum_ore_chunk"])
		.faintResonanceItem(0.05, ["thermal_extra:aluminum_ore_chunk", "cmi:red_mud"])
		.resonanceItem(0.2, ["immersiveengineering:raw_aluminum", "create:crushed_raw_aluminum"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["create:crimsite", "immersiveengineering:ore_aluminum", "immersiveengineering:deepslate_ore_aluminum"])
		.faintStabilizeItem(0.15, ["cmi:dreamcore_seed", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["cmi:dreamcore_ore"])
		.build()

	new MiningRecipe("cmi:platinum_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(0.3, ["cmi:deposit_dust", "cmi:dirty_platinum_dust"])
		.overclockItem(0.5, ["cmi:platinum_ore_chunk"])
		.faintResonanceItem(0.05, ["cmi:platinum_ore_chunk", "cmi:end_stone_dust"])
		.resonanceItem(0.2, ["cmi:raw_platinum", "create:crushed_raw_platinum"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["minecraft:end_stone", "cmi:moon_platinum_ore"])
		.faintStabilizeItem(0.15, ["minecraft:glowstone_dust", "minecraft:amethyst_shard", "tconstruct:sky_slime_crystal"])
		.stabilizeItem(0.06, ["minecraft:glowstone"])
		.build()

	new MiningRecipe("cmi:oil_shale_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(5.0E-4, ["cmi:deposit_dust", "cmi:oil_shale_dust"])
		.overclockItem(0.5, ["cmi:oil_shale_dust"])
		.faintResonanceItem(0.05, ["cmi:oil_shale_dust", "cmi:deposit_dust"])
		.resonanceItem(5.0E-4, ["cmi:oil_shale_dust", "cmi:oil_shale"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["cmi:oil_shale"])
		.faintStabilizeItem(0.15, ["cmi:oil_shale_dust", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["thermal:bitumen"])
		.build()

	new MiningRecipe("cmi:cheese_deposit_block")
		.defaultItem(["cmi:deposit_dust"])
		.overclockItem(5.0E-4, ["cmi:deposit_dust", "ad_astra:cheese"])
		.overclockItem(0.5, ["tconstruct:cheese_ingot"])
		.faintResonanceItem(0.05, ["ad_astra:cheese", "cmi:deposit_dust"])
		.resonanceItem(5.0E-4, ["tconstruct:cheese_ingot", "ad_astra:cheese"])
		.faintShatterItem(1, ["minecraft:cobblestone", "minecraft:tuff", "minecraft:calcite", "create:limestone", "cmi:deposit_dust"])
		.shatterItem(0.3, ["ad_astra:cheese_block", "tconstruct:cheese_block", "ad_astra:moon_cheese_ore"])
		.faintStabilizeItem(0.15, ["tconstruct:cheese_ingot", "minecraft:amethyst_shard", "tconstruct:earth_slime_crystal"])
		.stabilizeItem(0.06, ["ad_astra:cheese_block"])
		.build()
})
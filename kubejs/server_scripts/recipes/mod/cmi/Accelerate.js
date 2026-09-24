ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	// 安山构件
	addRecipe("cmi:andesite_mechanism", "minecraft:stone", [
		setOutput("minecraft:andesite", 0.2),
		setOutput("minecraft:iron_ore", 0.1),
		setOutput("create:zinc_ore", 0.1),
		setOutput("create:asurine", 0.1)
	])
	addRecipe("cmi:andesite_mechanism", "minecraft:deepslate", [
		setOutput("minecraft:tuff", 0.15),
		setOutput("minecraft:deepslate_iron_ore", 0.15),
		setOutput("create:deepslate_zinc_ore", 0.15),
		setOutput("create:asurine", 0.05)
	])

	// 钴质构件
	addRecipe("cmi:cobalt_mechanism", "minecraft:netherrack", [
		setOutput("tconstruct:cobalt_ore", 0.2)
	])

	// 铜质构件
	addRecipe("cmi:copper_mechanism", "minecraft:stone", [
		setOutput("minecraft:copper_ore", 0.1),
		setOutput("minecraft:gold_ore", 0.01),
		setOutput("minecraft:clay", 0.15),
		setOutput("thermal:sulfur_ore", 0.01),
		setOutput("create:veridium", 0.1)
	])
	addRecipe("cmi:copper_mechanism", "minecraft:deepslate", [
		setOutput("minecraft:deepslate_copper_ore", 0.05),
		setOutput("minecraft:deepslate_gold_ore", 0.05),
		setOutput("thermal:deepslate_sulfur_ore", 0.05),
		setOutput("create:veridium", 0.05)
	])

	// 附魔构件
	addRecipe("cmi:enchanted_mechanism", "minecraft:stone", [
		setOutput("minecraft:lapis_ore", 0.1),
	])
	addRecipe("cmi:enchanted_mechanism", "minecraft:deepslate", [
		setOutput("minecraft:deepslate_lapis_ore", 0.05),
		setOutput("create:experience_block", 0.01)
	])

	// 金质构件
	addRecipe("cmi:gold_mechanism", "minecraft:stone", [
		setOutput("minecraft:gold_ore", 0.1),
		setOutput("thermal:cinnabar_ore", 0.01),
		setOutput("cmi:quartz_ore", 0.05),
		setOutput("create:ochrum", 0.1)
	])
	addRecipe("cmi:gold_mechanism", "minecraft:deepslate", [
		setOutput("minecraft:deepslate_gold_ore", 0.05),
		setOutput("thermal:deepslate_cinnabar_ore", 0.05),
		setOutput("cmi:deepslate_quartz_ore", 0.05),
		setOutput("create:ochrum", 0.05)
	])
	addRecipe("cmi:gold_mechanism", "minecraft:netherrack", [
		setOutput("minecraft:nether_gold_ore", 0.15),
		setOutput("minecraft:nether_quartz_ore", 0.05)
	])
	addRecipe("cmi:gold_mechanism", "minecraft:blackstone", [
		setOutput("minecraft:gilded_blackstone", 0.3),
	])
	addRecipe("cmi:gold_mechanism", "minecraft:terracotta", [
		setOutput("minecraft:gold_ore", 0.2),
	])

	// 铁质构件
	addRecipe("cmi:iron_mechanism", "minecraft:stone", [
		setOutput("minecraft:iron_ore", 0.1),
		setOutput("minecraft:redstone_ore", 0.01),
		setOutput("create:crimsite", 0.1)
	])
	addRecipe("cmi:iron_mechanism", "minecraft:deepslate", [
		setOutput("minecraft:deepslate_iron_ore", 0.05),
		setOutput("minecraft:deepslate_redstone_ore", 0.05),
		setOutput("create:crimsite", 0.05)
	])

	// 下界构件
	addRecipe("cmi:nether_mechanism", "minecraft:netherrack", [
		setOutput("minecraft:blackstone", 0.1),
		setOutput("minecraft:magma_block", 0.03),
		setOutput("minecraft:soul_sand", 0.03),
		setOutput("minecraft:soul_soil", 0.03),
		setOutput("minecraft:gilded_blackstone", 0.03),
		setOutput("minecraft:nether_gold_ore", 0.01),
		setOutput("minecraft:ancient_debris", 0.001),
		setOutput("minecraft:nether_quartz_ore", 0.01),
		setOutput("minecraft:glowstone", 0.01)
	])
	addRecipe("cmi:nether_mechanism", "minecraft:stone", [
		setOutput("minecraft:netherrack", 0.5),
		setOutput("minecraft:blackstone", 0.01),
		setOutput("minecraft:magma_block", 0.01),
		setOutput("minecraft:soul_sand", 0.01),
	])

	// 精密构件
	addRecipe("create:precision_mechanism", "minecraft:stone", [
		setOutput("minecraft:copper_ore", 0.1),
		setOutput("create:zinc_ore", 0.1),
		setOutput("minecraft:redstone_ore", 0.01),
		setOutput("create:veridium", 0.1),
		setOutput("create:asurine", 0.1)
	])
	addRecipe("create:precision_mechanism", "minecraft:deepslate", [
		setOutput("minecraft:deepslate_copper_ore", 0.05),
		setOutput("create:deepslate_zinc_ore", 0.05),
		setOutput("minecraft:deepslate_redstone_ore", 0.05),
		setOutput("create:veridium", 0.05),
		setOutput("create:asurine", 0.05)
	])

	// 红石构件
	addRecipe("vintageimprovements:redstone_module", "minecraft:stone", [
		setOutput("minecraft:redstone_ore", 0.1),
		setOutput("thermal:lead_ore", 0.01)
	])
	addRecipe("vintageimprovements:redstone_module", "minecraft:deepslate", [
		setOutput("minecraft:deepslate_redstone_ore", 0.05),
		setOutput("thermal:deepslate_lead_ore", 0.05)
	])
	addRecipe("vintageimprovements:redstone_module", "minecraft:furnace", [
		setOutput("minecraft:piston", 0.05),
		setOutput("minecraft:observer", 0.05),
		setOutput("minecraft:dispenser", 0.05),
		setOutput("minecraft:dropper", 0.05),
		setOutput("minecraft:repeater", 0.05),
		setOutput("minecraft:comparator", 0.05)
	])

	// 智能构件
	addRecipe("cmi:smart_mechanism", "minecraft:stone", [
		setOutput("minecraft:gold_ore", 0.1),
		setOutput("minecraft:copper_ore", 0.01),
		setOutput("cmi:certus_quartz_ore", 0.01),
		setOutput("thermal:lead_ore", 0.01),
		setOutput("minecraft:sand", 0.2),
		setOutput("minecraft:redstone_ore", 0.01),
		setOutput("create:ochrum", 0.1),
		setOutput("create:veridium", 0.1)
	])
	addRecipe("cmi:smart_mechanism", "minecraft:deepslate", [
		setOutput("minecraft:deepslate_gold_ore", 0.05),
		setOutput("minecraft:deepslate_copper_ore", 0.05),
		setOutput("cmi:deepslate_certus_quartz_ore", 0.05),
		setOutput("thermal:deepslate_lead_ore", 0.05),
		setOutput("minecraft:deepslate_redstone_ore", 0.05),
		setOutput("create:ochrum", 0.05),
		setOutput("create:veridium", 0.05)
	])

	// 石质构件
	addRecipe("cmi:stone_mechanism", "minecraft:stone", [
		setOutput("tconstruct:seared_stone", 0.01),
		setOutput("create:scoria", 0.01),
		setOutput("minecraft:dripstone_block", 0.01),
		setOutput("create:limestone", 0.01)
	])
	addRecipe("cmi:stone_mechanism", "minecraft:deepslate", [
		setOutput("tconstruct:seared_stone", 0.05),
		setOutput("minecraft:tuff", 0.05),
		setOutput("create:scoria", 0.05),
		setOutput("minecraft:smooth_basalt", 0.05),
		setOutput("minecraft:calcite", 0.05),
	])

	// 木质构件
	addRecipe("cmi:wooden_mechanism", "minecraft:stone", [
		setOutput("minecraft:coal_ore", 0.1),
	])
	addRecipe("cmi:wooden_mechanism", "minecraft:deepslate", [
		setOutput("minecraft:deepslate_coal_ore", 0.05),
		setOutput("minecraft:deepslate_diamond_ore", 0.001)
	])

	// 自然构件
	addRecipe("cmi:nature_mechanism", "minecraft:stone", [
		setOutput("minecraft:grass_block", 0.1),
	])

	// 幽匿构件
	addRecipe("cmi:sculk_mechanism", "minecraft:deepslate", [
		setOutput("minecraft:sculk", 0.1),
		setOutput("minecraft:sculk_catalyst", 0.05),
	])

	// 蒸汽构件
	addRecipe("cmi:bronze_mechanism", "minecraft:stone", [
		setOutput("minecraft:copper_ore", 0.1),
		setOutput("thermal:tin_ore", 0.1),
		setOutput("create:veridium", 0.1)
	])
	addRecipe("cmi:bronze_mechanism", "minecraft:deepslate", [
		setOutput("minecraft:deepslate_copper_ore", 0.05),
		setOutput("thermal:deepslate_tin_ore", 0.05),
		setOutput("create:veridium", 0.05),
	])

	// 铁路构件
	addRecipe("cmi:railway_mechanism", "minecraft:stone", [
		setOutput("minecraft:copper_ore", 0.1),
		setOutput("create:zinc_ore", 0.1),
		setOutput("minecraft:obsidian", 0.01),
		setOutput("create:veridium", 0.1),
		setOutput("create:asurine", 0.1)
	])
	addRecipe("cmi:railway_mechanism", "minecraft:deepslate", [
		setOutput("minecraft:deepslate_copper_ore", 0.05),
		setOutput("create:deepslate_zinc_ore", 0.05),
		setOutput("minecraft:obsidian", 0.05),
		setOutput("create:veridium", 0.05),
		setOutput("create:asurine", 0.05)
	])

	/**
	 * 设置输出项Json
	 * 
	 * @param {Internal.Block_} id 
	 * @param {number} chance 
	 */
	function setOutput(id, chance) {
		return {
			"id": id,
			"chance": chance
		}
	}

	/**
	 * 定义配方轮子
	 * 
	 * @param {Internal.Ingredient_} input 
	 * @param {Internal.Block_} target 
	 * @param {{
	 * 		id: Internal.Block_,
	 * 		chance: number
	 * }[]} output
	 * @returns 
	 */
	function addRecipe(input, target, output) {
		return cmi.accelerator(output)
			.input(input)
			.target(target)
	}
})
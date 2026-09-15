ServerEvents.highPriorityData((event) => {
	addUnification("uranium_ore", [
		"#forge:ores/uranium"
	], "alexscaves:radrock_uranium_ore")

	addUnification("lead_ore", [
		"thermal:lead_ore",
		"mekanism:lead_ore",
		"immersiveengineering:ore_lead"
	], "thermal:lead_ore")

	addUnification("deepslate_lead_ore", [
		"thermal:deepslate_lead_ore",
		"mekanism:deepslate_lead_ore",
		"immersiveengineering:deepslate_ore_lead"
	], "thermal:deepslate_lead_ore")

	addUnification("nickel_ore", [
		"thermal:nickel_ore",
		"immersiveengineering:ore_nickel"
	], "thermal:nickel_ore")

	addUnification("deepslate_nickel_ore", [
		"thermal:deepslate_nickel_ore",
		"immersiveengineering:deepslate_ore_nickel"
	], "thermal:deepslate_nickel_ore")

	addUnification("silver_ore", [
		"thermal:silver_ore",
		"immersiveengineering:ore_silver"
	], "thermal:silver_ore")

	addUnification("deepslate_silver_ore", [
		"thermal:deepslate_silver_ore",
		"immersiveengineering:deepslate_ore_silver"
	], "thermal:deepslate_silver_ore")

	addUnification("tin_ore", [
		"thermal:tin_ore",
		"mekanism:tin_ore"
	], "thermal:tin_ore")

	addUnification("deepslate_tin_ore", [
		"thermal:deepslate_tin_ore",
		"mekanism:deepslate_tin_ore"
	], "thermal:deepslate_tin_ore")

	addUnification("steel_cluster", [
		"tconstruct:steel_cluster"
	], "minecraft:air")

	addUnification("carrot_crate", [
		"#forge:storage_blocks/carrot",
	], "farmersdelight:carrot_crate")

	addUnification("potato_crate", [
		"#forge:storage_blocks/potato",
	], "farmersdelight:potato_crate")

	addUnification("beetroot_crate", [
		"#forge:storage_blocks/beetroot",
	], "farmersdelight:beetroot_crate")

	addUnification("straw_bale", [
		"#forge:storage_blocks/rice_panicle"
	], "kaleidoscope_cookery:straw_block")

	addUnification("crafting_station", [
		"tconstruct:crafting_station"
	], "craftingstationjei:crafting_station")

	addUnification("fluid_hatch", [
		"create_dragons_plus:fluid_hatch"
	], "fluidlogistics:fluid_hatch")

	addUnification("coal_deposit", [
		"cmi:coal_deposit_block"
	], "create_rns:coal_deposit_block")

	/**
	 * 
	 * @param {string} name 
	 * @param {Special.Block | Special.BlockTag | (Special.Block | Special.BlockTag)[]} blocks 
	 * @param {Special.Block} result 
	 * @returns 
	 */
	function addUnification(name, blocks, result) {
		if (blocks === null) {
			console.error(`Blocks ${blocks} cannot be null`)
		}

		if (result === null) {
			console.error(`Block ${result} cannot be null`)
		}

		// Block.getBlock 查不到的方块返回的是 minecraft:air, 拿 id 回环比对来判断
		if (getBlock(result) === null) {
			console.error(`Block ${result} does not exist`)
			return
		}

		// 没装的方块跳过, 标签留给 OEB 自己解析
		let matchBlock = blocks.filter((block) => {
			if (block.startsWith("#")) {
				return true
			}

			if (getBlock(block) === null) {
				console.warn(`Block ${block} does not exist`)
				return false
			}

			return true
		})

		if (matchBlock.length === 0) {
			return
		}

		let blockUnification = {
			matchBlock: matchBlock,
			resultBlock: result
		}

		event.addJson(`oeb:replacements/${name}.json`, blockUnification)

		// 顺带统一方块的物品形态, 没有物品形态的方块自动过滤
		addItemUnification(name, matchBlock, result)
	}

	/** 
	 * 
	 * @param {string} name 
	 * @param {(Special.Block | Special.BlockTag)[]} blocks 
	 * @param {Special.Block} result 
	 * @returns 
	 */
	function addItemUnification(name, blocks, result) {
		let resultItem = getItem(result)

		if (resultItem === null) {
			return
		}

		let matchItem = blocks.map((block) => block.startsWith("#") ? block : getItem(block)).filter((item) => item !== null)

		if (matchItem.length === 0) {
			return
		}

		let itemUnification = {
			matchItems: matchItem,
			resultItems: resultItem
		}

		event.addJson(`oei:replacements/${name}.json`, itemUnification)
	}

	/**
	 * 存在的方块返回方块本身, 不存在则返回 null
	 * 
	 * @param {Special.Block} block 
	 * @returns {Internal.Block}
	 */
	function getBlock(block) {
		if (block.startsWith("#")) {
			return null
		}

		let type = Block.getBlock(block)

		if (type === null || Block.getId(type).toString() !== block) {
			return null
		}

		return type
	}

	/**
	 * 方块的物品形态, 没有物品形态则返回 null
	 * 
	 * @param {Special.Block} block 
	 * @returns {string}
	 */
	function getItem(block) {
		if (block === "minecraft:air") {
			return "minecraft:air"
		}

		let type = getBlock(block)

		if (type === null) {
			return null
		}

		let item = Item.getId(type.asItem()).toString()

		if (item === "minecraft:air") {
			return null
		}

		return item
	}
})
const CAST_IRON_UPGRADES = {
	"steampowered:bronze_boiler": "steampowered:cast_iron_boiler",
	"steampowered:bronze_burner": "steampowered:cast_iron_burner",
	"steampowered:bronze_steam_engine": "steampowered:cast_iron_steam_engine",
	"steampowered:bronze_flywheel": "steampowered:cast_iron_flywheel",
	"cmi:bronze_fluid_burner": "cmi:cast_iron_fluid_burner",
	"cmi:bronze_solar_boiler": "cmi:cast_iron_solar_boiler"
}

const STEEL_UPGRADES = {
	"steampowered:cast_iron_boiler": "steampowered:steel_boiler",
	"steampowered:cast_iron_burner": "steampowered:steel_burner",
	"steampowered:cast_iron_steam_engine": "steampowered:steel_steam_engine",
	"steampowered:cast_iron_flywheel": "steampowered:steel_flywheel",
	"cmi:cast_iron_fluid_burner": "cmi:steel_fluid_burner",
	"cmi:cast_iron_solar_boiler": "cmi:steel_solar_boiler"
}

BlockEvents.rightClicked((event) => {
	let { item, block, hand, player, level } = event

	upgradeCastIron(item, block, hand, player, level)
	upgradeSteel(item, block, hand, player, level)
})

/**
 * 
 * @param {Internal.ItemStack} item 
 * @param {Internal.BlockContainerJS_} block 
 * @param {InteractionHand} hand 
 * @param {Player} player 
 * @param {Internal.Level_} level
 * @returns 
 */
function upgradeCastIron(item, block, hand, player, level) {
	if (item.getId() !== "cmi:steam_cast_iron_upgrade") {
		return
	}

	/**
	 * @type {Internal.Block_}
	 */
	let targetId = CAST_IRON_UPGRADES[block.getId()]

	if (targetId) {
		upgradeBlock(item, block, player, hand, level, targetId)
	}
}

/**
 * 
 * @param {Internal.ItemStack} item 
 * @param {Internal.BlockContainerJS_} block 
 * @param {InteractionHand} hand 
 * @param {Player} player 
 * @param {Internal.Level_} level
 * @returns 
 */
function upgradeSteel(item, block, hand, player, level) {
	if (item.getId() !== "cmi:steam_steel_upgrade") {
		return
	}

	/**
	 * @type {Internal.Block_}
	 */
	let targetId = STEEL_UPGRADES[block.getId()]

	if (targetId) {
		upgradeBlock(item, block, player, hand, level, targetId)
	}
}

/**
 * 
 * @param {Internal.ItemStack} item 
 * @param {Internal.BlockContainerJS_} block 
 * @param {Player} player 
 * @param {InteractionHand_} hand
 * @param {Internal.Level_} level 
 * @param {Internal.Block_} targetId 
 */
function upgradeBlock(item, block, player, hand, level, targetId) {
	let properties = block.getProperties()
	let nbt = block.getEntityData()

	if (hand !== InteractionHand.MAIN_HAND) {
		return
	}

	player.swing()
	level.playSound(
		null,
		block.x,
		block.y,
		block.z,
		"minecraft:block.smithing_table.use",
		"blocks",
		0.5,
		1.0
	)
	block.set(targetId, properties)

	if (nbt) {
		block.setEntityData(nbt)
	}

	if (!player.isCreative()) {
		item.shrink(1)
	}
}
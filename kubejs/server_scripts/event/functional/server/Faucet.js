// ignored: true
BlockEvents.rightClicked((event) => {
	let { block, item, player, level } = event

	if (block.id === "thermal:rubberwood_log" && player.mainHandItem.hasTag("cmi:faucet")) {
		player.swing()
		if (item.getDamageValue() >= item.getMaxDamage()) {
			player.setItemInHand(event.hand, "minecraft:air")
			level.playSound(
				null,
				player.x,
				player.y,
				player.z,
				"minecraft:entity.item.break",
				"players",
				1.0,
				1.0
			)
			return
		}
		item.hurtAndBreak(1, player, (entity) => {
			entity.broadcastBreakEvent(entity.getUsedItemHand())
		})
		if (Math.random() < 0.25 && !player.isCreative()) {
			player.give("thermal:rubber")
		}
		if (Math.random() < 0.1 && !player.isCreative()) {
			block.set("thermal:stripped_rubberwood_log")
		}
	}
})
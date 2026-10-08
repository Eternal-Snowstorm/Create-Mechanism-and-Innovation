BlockEvents.rightClicked("minecraft:lightning_rod", (event) => {
	let { player, level, block } = event
	let pos = block.getPos()
	let itemInHand = player.getItemInHand(InteractionHand.MAIN_HAND)

	if (itemInHand.getId() === "cmi:charged_amethyst") {
		let lightning = level.createEntity("minecraft:lightning_bolt")
		let x = pos.getX()
		let y = pos.getY()
		let z = pos.getZ()

		lightning.setPos(x + 0.5, y + 1, z + 0.5)
		lightning.spawn()

		if (player.isCreative()) {
			return
		}

		player.swing()
		itemInHand.shrink(1)
		player.give("minecraft:amethyst_shard")
	}
})
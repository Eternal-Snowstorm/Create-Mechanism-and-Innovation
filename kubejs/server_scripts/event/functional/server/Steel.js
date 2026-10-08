ItemEvents.rightClicked((event) => {
	let { player, level, item, hand } = event

	if (item.getId() === "cmi:togni_leets" && hand.equals(InteractionHand.MAIN_HAND)) {
		player.swing()

		let tranKey = "message.cmi.togni_leets"
		player.tell(Component.translatable(tranKey).red())

		level.playSound(
			null,
			player.x,
			player.y,
			player.z,
			"cmi:meme.bruh",
			"players",
			1.0,
			1.0
		)
		if (!player.isCreative()) {
			item.shrink(1)
		}
	}
})
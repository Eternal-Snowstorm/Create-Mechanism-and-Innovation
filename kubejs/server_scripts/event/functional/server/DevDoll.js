BlockEvents.rightClicked((event) => {
	let { block, player, level, item, hand } = event
	let { x, y, z } = block

	if (!player || player.isFake() || !player.isCrouching()) {
		return
	}

	if (!item.isEmpty() || !hand.equals(InteractionHand.MAIN_HAND)) {
		return
	}

	if (!block.hasTag(Cmi.loadResource("dev_doll").toString())) {
		return
	}

	player.swing()

	level.playSound(
		null,
		player.x,
		player.y,
		player.z,
		"thermal:misc.tinker",
		"blocks",
		0.1,
		1
	)

	if (level instanceof $ServerLevel) {
		level.sendParticles(
			ParticleTypes.HEART,
			x + 0.5,
			y + 1,
			z + 0.5,
			2,
			0.5,
			1,
			0.5,
			Math.random() * 2
		)
	}
})
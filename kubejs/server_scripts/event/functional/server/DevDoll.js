BlockEvents.rightClicked((event) => {
	let { block, player, level, item, hand } = event

	let { x, y, z } = block

	// 判断玩家条件
	if (!player || player.isFake() || !player.isCrouching()) {
		return
	}

	// 判断主手是否为空
	if (!item.isEmpty() || !hand.equals(InteractionHand.MAIN_HAND)) {
		return
	}

	// 判断是否是玩偶
	if (!block.hasTag(Cmi.loadResource("dev_doll").toString())) {
		return
	}

	// 执行逻辑
	if (!level.isClientSide()) {
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

		level.runCommandSilent(`particle minecraft:heart ${x} ${y + 1} ${z} 0.5 1 0.5 ${Math.random() * 2} 2`)
	}
})
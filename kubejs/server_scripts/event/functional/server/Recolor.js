let $AEColor =
	Java.loadClass("appeng.api.util.AEColor")
let $IColorableBlockEntity =
	Java.loadClass("appeng.api.implementations.blockentities.IColorableBlockEntity")
let $BlockRecolorer =
	Java.loadClass("appeng.items.tools.powered.BlockRecolorer")

BlockEvents.rightClicked((event) => {
	let { level, item, hand, block, facing, player } = event

	// 从 AE2 的 16 种有效颜色中随机选一种
	const VALID_COLORS = $AEColor.VALID_COLORS
	let color = VALID_COLORS.get(Math.floor(Math.random() * VALID_COLORS.size()))

	const MECHAN = Mechanisms.COLOR.COM.getId()

	// 判断物品
	if (item.getId() !== MECHAN || hand !== InteractionHand.MAIN_HAND) {
		return
	}

	/**
	 * 方块实体
	 */
	let blockEntity = block.getEntity()

	// 判断是否是可染色的方块实体
	if (blockEntity instanceof $IColorableBlockEntity) {
		blockEntity.recolourBlock(facing, color, player)
		event.cancel()
		return
	}

	/**
	 * 未染色前的方块
	 */
	let uncolouredBlock = Block.getBlock(block.getId())

	/**
	 * 染色后的方块
	 * @type {Internal.Block_}
	 */
	let colouredBlock = $BlockRecolorer.recolor(uncolouredBlock, color)

	// 更新方块
	if (colouredBlock !== uncolouredBlock) {
		level.setBlockAndUpdate(block.getPos(), colouredBlock.defaultBlockState())
		event.cancel()
		return
	}
})
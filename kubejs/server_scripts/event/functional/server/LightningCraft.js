EntityEvents.spawned("minecraft:lightning_bolt", (event) => {
	let lightning = event.entity
	let player = event.getPlayer()
	let level = event.getLevel()

	/**
	 * 函数封装
	 * @param {Internal.ItemStack_} output 输出
	 * @param {Internal.ItemStack_} input 输入
	 */
	function addLightningCraft(output, input) {
		let targets = level.getEntitiesWithin(AABB.of(
			lightning.x - 3, lightning.y - 3, lightning.z - 3,
			lightning.x + 3, lightning.y + 3, lightning.z + 3
		)).filter((entity) => {
			return entity.type === "minecraft:item" && entity.item?.id === input
		})

		targets.forEach((entity) => {
			let { x, y, z } = entity

			let count = entity.item.count || 1

			entity.kill()

			for (let i = 0; i < count; i++) {
				let itemEntity = level.createEntity("minecraft:item")
				itemEntity.item = Item.of(output)
				let random = Math.random() * 0.4 - 0.2

				itemEntity.x = x + (random)
				itemEntity.y = y + (random)
				itemEntity.z = z + (random)
				itemEntity.mergeNbt({ Invulnerable: 1 })
				itemEntity.spawn()
			}
		})
	}

	/**
	 * Citron
	 * 函数封装
	 * @param {Internal.ItemStack_} output 输出
	 * @param {Internal.ItemStack_} input 输入
	 * @param {Number} arg1 
	 * @param {Number} arg2 
	 */
	function addConditionalLightningCraft(output, input, arg1, arg2) {
		if (Math.floor(lightning.x) !== ClientSeedHandler.getValue(arg1) ||
			Math.floor(lightning.z) !== ClientSeedHandler.getValue(arg2)
		) {
			return
		}

		let lightningPos = lightning.blockPosition()
		let inputBlock = Block.getBlock(input).getId()
		let outputBlock = Block.getBlock(output).defaultBlockState()

		if (DebugUserManager.isDebugger(player)) {
			console.log(ClientSeedHandler.getValue(arg1))
			console.log(ClientSeedHandler.getValue(arg2))
		}

		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				for (let r = -1; r <= 1; r++) {
					let centerX = lightningPos.getX()
					let centerY = lightningPos.getY()
					let centerZ = lightningPos.getZ()
					let currentX = centerX + i
					let currentY = centerY + j
					let currentZ = centerZ + r
					let currentPos = new BlockPos(currentX, currentY, currentZ)
					let currentBlockId = level.getBlock(currentPos).getId()

					if (currentBlockId == inputBlock) {
						level.setBlock(currentPos, outputBlock, 3)
					}
				}
			}
		}
	}

	addLightningCraft("cmi:bucket", "minecraft:bucket")
	addConditionalLightningCraft("torcherino:torcherino", "minecraft:torch", 1, 2)
	addConditionalLightningCraft("torcherino:lantern", "minecraft:lantern", 1, 2)
	addConditionalLightningCraft("torcherino:lanterino", "minecraft:jack_o_lantern", 1, 2)
	addConditionalLightningCraft("torcherino:compressed_torcherino", "torcherino:torcherino", 3, 4)
	addConditionalLightningCraft("torcherino:compressed_lantern", "torcherino:lantern", 3, 4)
	addConditionalLightningCraft("torcherino:compressed_lanterino", "torcherino:lanterino", 3, 4)
	addConditionalLightningCraft("torcherino:double_compressed_torcherino", "torcherino:compressed_torcherino", 5, 6)
	addConditionalLightningCraft("torcherino:double_compressed_lantern", "torcherino:compressed_lantern", 5, 6)
	addConditionalLightningCraft("torcherino:double_compressed_lanterino", "torcherino:compressed_lanterino", 5, 6)
})
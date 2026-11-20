BlockEvents.rightClicked((event) => {
	let { player, level, block } = event
	let pos = block.pos

	let hasWrench = player.getMainHandItem().hasTag("forge:tools/wrench")
	let hasHammer = player.getMainHandItem().hasTag("forge:hammers")
	let bedrock = Block.getBlock("minecraft:bedrock").defaultBlockState()

	if (block.getId() === "cmi:impact_pile" && hasHammer) {
		let below = level.getBlock(pos.below())
		if (below.getId() !== "minecraft:bedrock") {
			return
		}
		player.swing()

		let centerX = pos.x
		let centerZ = pos.z
		let centerY = pos.y

		let voidSpringPos = new BlockPos(centerX, centerY - 1, centerZ)
		let voidSpring = Block.getBlock("cmi:void_spring").defaultBlockState()
		level.destroyBlock(pos, false)
		level.destroyBlock(voidSpringPos, true)
		level.setBlock(voidSpringPos, voidSpring, 3)
		level.playSound(
			null,
			centerX,
			centerY,
			centerZ,
			"create:mechanical_press_activation",
			"players",
			0.3,
			1.0
		)

		for (let i = 2; i <= 5; i++) {
			if (centerY - i <= -64) {
				return
			}

			let currentPos = new BlockPos(centerX, centerY - i, centerZ)
			let currentBlock = level.getBlockState(currentPos)
			if (currentBlock !== bedrock) {
				level.setBlock(currentPos, bedrock, 3)
			}
		}
	}

	if (block.getId() === "cmi:impact_pile" && hasWrench) {
		let below = level.getBlock(pos.below())
		if (below.getId() !== "create:mechanical_drill" || below.properties.facing !== "down") {
			return
		}

		let centerX = pos.x
		let centerZ = pos.z
		let currentY = pos.y
		player.swing()

		level.server.scheduleInTicks(1, function tick() {
			if (currentY > -62) {

				let destroyPos = new BlockPos(centerX, currentY, centerZ)
				level.destroyBlock(destroyPos, false)

				currentY--
				level.server.scheduleInTicks(1, tick)

			} else {
				for (let i = -1; i <= 1; i++) {
					for (let j = -1; j <= 1; j++) {
						let destroyPos = new BlockPos(centerX + i, -60, centerZ + j)

						level.destroyBlock(destroyPos, false)
					}
				}
				let voidSpringPos = new BlockPos(centerX, -61, centerZ)
				let bedrockPos1 = new BlockPos(centerX, -62, centerZ)
				let bedrockPos2 = new BlockPos(centerX, -63, centerZ)
				let voidSpring = Block.getBlock("cmi:void_spring").defaultBlockState()

				level.setBlock(voidSpringPos, voidSpring, 3)
				level.setBlock(bedrockPos1, bedrock, 3)
				level.setBlock(bedrockPos2, bedrock, 3)
			}
		})
	}
})
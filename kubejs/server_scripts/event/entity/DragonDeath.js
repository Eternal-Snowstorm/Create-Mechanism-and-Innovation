let $EntityLeaveLevelEvent =
	Java.loadClass("net.minecraftforge.event.entity.EntityLeaveLevelEvent")
let $ServerPlayer =
	Java.loadClass("net.minecraft.server.level.ServerPlayer")

NativeEvent.of($EntityLeaveLevelEvent, (event) => {
	let entity = event.getEntity()
	let level = event.getLevel()
	let players = level.getPlayers()
	const STAGE_NAME = "dragon_death"

	if (level.isClientSide()) {
		return
	}

	if (entity.getType() !== "minecraft:ender_dragon") {
		return
	}

	players.forEach((entities) => {
		if (!(entities instanceof Player)) {
			return
		}

		/**
		 * @typedef {Player}
		 */
		let player = entities
		let stage = player.getStages()

		if (!player) {
			return
		}

		if (!stage.has(STAGE_NAME)) {
			stage.add(STAGE_NAME)

			level.playSound(
				null,
				player.x,
				player.y,
				player.z,
				"cmi:dragon_death",
				"players",
				0.25,
				1
			)

			if (player instanceof $ServerPlayer) {
				$CmiTips.triggerLoginTip(player)
			}
		}
	})
})
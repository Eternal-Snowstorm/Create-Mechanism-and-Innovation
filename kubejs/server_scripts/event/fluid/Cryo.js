(function () {
	let $LivingEvent$LivingTickEvent =
		Java.loadClass("net.minecraftforge.event.entity.living.LivingEvent$LivingTickEvent")
	let $BlockEvent$NeighborNotifyEvent =
		Java.loadClass("net.minecraftforge.event.level.BlockEvent$NeighborNotifyEvent")
	let $LivingEntity =
		Java.loadClass("net.minecraft.world.entity.LivingEntity")
	let $ModDamageSources =
		Java.loadClass("earth.terrarium.adastra.common.registry.ModDamageSources")
	let $Vec3 =
		Java.loadClass("net.minecraft.world.phys.Vec3")
	let $Mth =
		Java.loadClass("net.minecraft.util.Mth")

	NativeEvent.of($LivingEvent$LivingTickEvent, (event) => {
		let entity = event.getEntity()
		if (entity == null || !entity.isAlive()) {
			return
		}

		let level = entity.getLevel()
		let pos = entity.blockPosition()

		if (!isFluid(level, pos)) {
			return
		}

		if (entity instanceof $LivingEntity) {
			entity.makeStuckInBlock(level.getBlockState(pos), new $Vec3(0.9, 1.5, 0.9))

			if (level.isClientSide()) {
				let random = level.getRandom()
				let bl = entity.xOld !== entity.getX() || entity.zOld !== entity.getZ()

				if (bl && random.nextBoolean()) {
					level.addParticle(
						ParticleTypes.SNOWFLAKE,
						entity.getX(),
						pos.getY() + 1,
						entity.getZ(),
						$Mth.randomBetween(random, -1, 1) * 0.083333336,
						0.05,
						$Mth.randomBetween(random, -1, 1) * 0.083333336
					)
				}
			}

			entity.setIsInPowderSnow(true)
			entity.setTicksFrozen(JavaMath.min(
				entity.getTicksRequiredToFreeze(),
				entity.getTicksFrozen() + 5
			))

			if (!level.isClientSide()) {
				let cryoDamage = $ModDamageSources.create(
					level,
					$ModDamageSources.CRYO_FUEL
				)

				entity.setSharedFlagOnFire(false)
				entity.setRemainingFireTicks(0)
				entity.attack(cryoDamage, 4 * (entity.fireImmune() ? 2 : 1))
			}
		}
	})

	NativeEvent.of($BlockEvent$NeighborNotifyEvent, (event) => {
		let level = event.getLevel()
		if (level == null || level.isClientSide()) {
			return
		}

		let pos = event.getPos()
		let candidates = [pos]

		for (let side of event.getNotifiedSides()) {
			candidates.push(pos.relative(side))
		}

		for (let pos of candidates) {
			if (!level.isLoaded(pos)) {
				continue
			}
			let state = level.getBlockState(pos)
			if (state.getBlock().getId() !== "neoecoae:cryotheum_solution") {
				continue
			}

			if (shouldSpreadLiquid(level, pos)) {
				level["scheduleTick(net.minecraft.core.BlockPos,net.minecraft.world.level.material.Fluid,int)"](
					pos,
					state.getFluidState().getType(),
					state.getFluidState().getType().getTickDelay(level)
				)
			}
		}
	})

	/**
	 * 
	 * @param {Internal.Level_} level 
	 * @param {BlockPos_} pos 
	 * @returns 
	 */
	function shouldSpreadLiquid(level, pos) {
		let directions = [
			Direction.DOWN,
			Direction.SOUTH,
			Direction.NORTH,
			Direction.EAST,
			Direction.WEST
		]

		for (let direction of directions) {
			/**
			 * @type {BlockPos_}
			 */
			let blockPos = pos.relative(direction.getOpposite())

			if (!level.isLoaded(blockPos)) {
				continue
			}
			if (level.getBlockState(blockPos).getBlock().getId() === "minecraft:water") {
				level.setBlockAndUpdate(blockPos, Blocks.ICE.defaultBlockState())
				level.levelEvent(1501, pos, 0)
				return false
			}
		}

		return true
	}

	/**
	 * 
	 * @param {Internal.Level_} level 
	 * @param {BlockPos_} pos 
	 */
	function isFluid(level, pos) {
		return level.getBlockState(pos).getBlock().getId() === "neoecoae:cryotheum_solution"
			|| level.getBlockState(pos).getBlock().getId() === "cmi:glacious_cryotheum"
	}
})()
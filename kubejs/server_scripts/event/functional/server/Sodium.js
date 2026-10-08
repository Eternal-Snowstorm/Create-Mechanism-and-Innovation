let EXPLOSIVE_TAG = "cmi:sodium_explosive"
let EXPLOSION_POWER = 3.0
let CAUSES_FIRE = false
let EXPLOSION_INTERACTION = "none"
let CHECK_INTERVAL_TICKS = 5
let MAX_CHECKS = 120

/**
 * 
 * @param {Internal.Entity} item 
 * @param {Internal.Level} level 
 */
function explodeItemEntity(item, level) {
	let x = item.x
	let y = item.y
	let z = item.z
	item.kill()

	level.explode(item, x, y, z, EXPLOSION_POWER, CAUSES_FIRE, EXPLOSION_INTERACTION)
}

ItemEvents.dropped((event) => {
	let item = event.item
	if (!item || !item.hasTag(EXPLOSIVE_TAG)) {
		return
	}

	let itemEntity = event.itemEntity
	if (!itemEntity) {
		return
	}

	let level = event.level
	if (itemEntity.isInWater()) {
		explodeItemEntity(itemEntity, level)
		return
	}

	let checks = 0
	event.server.scheduleRepeatingInTicks(CHECK_INTERVAL_TICKS, (scheduledEvent) => {
		if (!itemEntity.isAlive()) {
			scheduledEvent.clear()
			return
		}

		if (itemEntity.isInWater()) {
			scheduledEvent.clear()
			explodeItemEntity(itemEntity, level)
			return
		}

		checks++
		if (checks >= MAX_CHECKS) {
			scheduledEvent.clear()
		}
	})
})
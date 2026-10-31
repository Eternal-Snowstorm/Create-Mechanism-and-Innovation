// ignored: true
EntityEvents.hurt((event) => {
	const { source, entity } = event
	const player = source.getPlayer()

	if (!player) {
		return
	}
	// if (entity.type != "powerful_dummy:test_dummy") return

	const data = entity.persistentData
	if (data.multiHitActive) {
		return
	}

	data.multiHitActive = true

	const damage = event.damage

	for (let i = 1; i <= 10; i++) {
		event.server.scheduleInTicks(i * 2, () => {
			if (!entity.isAlive()) {
				return
			}

			entity.hurtTime = 0
			entity.invulnerableTime = 0

			let multi = Math.random() * 0.4 + 1

			entity.attack(source, damage * multi)
		})
	}

	event.server.scheduleInTicks(20 + 2, () => {
		data.multiHitActive = false
	})
})
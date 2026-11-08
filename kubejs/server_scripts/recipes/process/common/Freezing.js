ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	// 浮冰
	cmi.freezing("minecraft:packed_ice", [
		"minecraft:ice"
	])

	// 蓝冰
	cmi.freezing("minecraft:blue_ice", [
		"minecraft:packed_ice"
	])
})
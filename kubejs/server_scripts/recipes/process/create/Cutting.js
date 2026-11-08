ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	create.cutting([
		"4x cmi:optical_fiber",
	], [
		"ae2:quartz_fiber"
	])
})

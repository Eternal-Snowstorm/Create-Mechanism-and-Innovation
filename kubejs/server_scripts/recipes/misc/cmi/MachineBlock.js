ServerEvents.recipes((event) => {
	let { minecraft } = event.getRecipes()

	CmiGlobal.mechanismGroup.forEach((type) => {
		let input = CmiGlobal.getMechanism(type)
		minecraft.stonecutting(`cmi:${type}_machine`, input)
	})
})
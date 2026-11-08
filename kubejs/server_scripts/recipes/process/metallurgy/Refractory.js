ServerEvents.recipes((event) => {
	let { minecraft } = event.getRecipes()

	minecraft.smelting("immersiveindustry:refractory_kiln_brick",
		"cmi:refractory_grout"
	)
})
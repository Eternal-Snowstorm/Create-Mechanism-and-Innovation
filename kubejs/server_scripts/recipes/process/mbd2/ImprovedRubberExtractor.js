ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	cmi.improved_rubber_extractor()
		.perTick((recipe) => {
			recipe.inputFE(250)
				.outputFluids(Fluid.of("thermal:latex", 125))
		})
})
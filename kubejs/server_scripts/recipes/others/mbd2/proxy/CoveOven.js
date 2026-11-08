let $CokeOvenRecipe =
	Java.loadClass("blusunrize.immersiveengineering.api.crafting.CokeOvenRecipe")

MBDRecipeTypeEvents.onTransferProxyRecipe(($) => {
	let event = $.getEvent()
	let { proxyRecipe, proxyRecipeId, proxyTypeId, recipeType } = event

	if (recipeType !== "cmi:reinforced_coke_oven") {
		return
	}
	if (proxyTypeId !== "immersiveengineering:coke_oven") {
		return
	}

	/**
	 * @type {Internal.CokeOvenRecipe}
	 */
	let recipe = proxyRecipe

	if (!(recipe instanceof $CokeOvenRecipe)) {
		return
	}

	/**
	 * @type {Internal.MBDRecipeSchema$MBDRecipeJS}
	 */
	let builder = recipeType.recipeBuilder()
	/**
	 * @type {Internal.FluidStackJS_}
	 */
	let creosote = "immersiveengineering:creosote"
	let input = recipe.input
	let output = recipe.output

	builder.inputItems(input.getBaseIngredient())
		.outputItems(output.get())
		.outputFluids(Fluid.of(creosote, recipe.creosoteOutput))
		.duration(recipe.time * 0.5)
		.id(proxyRecipeId + "_mbd2_proxy")

	event.mbdRecipe = builder.buildMBDRecipe()
})
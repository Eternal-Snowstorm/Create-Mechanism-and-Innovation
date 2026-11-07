ServerEvents.recipes((event) => {
	castingRecipes(event)
	moldRecipes(event)
	pressRecipes(event)
})

/**
 * 
 * @param {Internal.RecipesEventJS} event 
 */
function castingRecipes(event) {
	let { createdieselgenerators } = event.getRecipes()

	// 石板
	return createdieselgenerators.casting("cmi:stone_plate", [
		Fluid.of("minecraft:lava", 100)
	]).mold(CDGMolds.CMI.PLATE)
}

/**
 * @param {Internal.RecipesEventJS} event
 */
function moldRecipes(event) {
	let { create, kubejs } = event.getRecipes()

	addMoldRecipe(CDGMolds.CMI.PLATE)
	addMoldRecipe(CDGMolds.CDG.BAR)
	addMoldRecipe(CDGMolds.CDG.BOWL)
	addMoldRecipe(CDGMolds.CDG.CHAIN)
	addMoldRecipe(CDGMolds.CDG.LINES)

	return kubejs.shaped("createdieselgenerators:mold", [
		"AA",
		"AA"
	], {
		A: "#forge:plates/industrial_iron"
	})

	/**
	 * 
	 * @param {CDGMolds} id 
	 * @returns 
	 */
	function mold(id) {
		return Item.of("createdieselgenerators:mold")
			.withNBT({
				Mold: id
			})
	}

	/**
	 * 
	 * @param {CDGMolds} moldId 
	 * @returns 
	 */
	function addMoldRecipe(moldId) {
		return create.cutting(mold(moldId), [
			"createdieselgenerators:mold"
		])
	}
}

/**
 * @param {Internal.RecipesEventJS} event
 */
function pressRecipes(event) {
	let { create } = event.getRecipes()

	// 压印模具
	create.cutting([
		"ae2:silicon_press",
		"ae2:logic_processor_press",
		"ae2:calculation_processor_press",
		"ae2:engineering_processor_press",
		"cmi:concurrent_processor_press",
		"neoecoae:superconducting_processor_press"
	], [
		"ae2:mysterious_cube"
	])
}

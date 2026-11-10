ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 炸弹系列
	kubejs.shaped("4x thermal:explosive_grenade", [
		"BAB",
		"ABA",
		"BAB"
	], {
		A: "cmi:trinitrotoluene",
		B: "#forge:nuggets/iron"
	}).id("thermal:explosive_grenade_4")

	replaceBombRecipe("minecraft:ender_pearl", "ender")
	replaceBombRecipe("minecraft:glowstone_dust", "glowstone")
	replaceBombRecipe("minecraft:redstone", "redstone")
	replaceBombRecipe("#forge:slimeballs", "slime")
	replaceBombRecipe("minecraft:blaze_powder", "fire")
	replaceBombRecipe("thermal:blizz_powder", "ice")
	replaceBombRecipe("thermal:blitz_powder", "lightning")
	replaceBombRecipe("thermal:basalz_powder", "earth")

	/**
	 * 
	 * @param {Internal.Ingredient_} input 
	 * @param {string} bombname 
	 */
	function replaceBombRecipe(input, bombname) {
		kubejs.shaped(`thermal:${bombname}_tnt`, [
			" A ",
			"ABA",
			" A "
		], {
			A: input,
			B: "cmi:trinitrotoluene"
		}).id(`thermal:${bombname}_tnt`)

		kubejs.shaped(`4x thermal:${bombname}_grenade`, [
			"CAC",
			"ABA",
			"CAC"
		], {
			A: input,
			B: "cmi:trinitrotoluene",
			C: "#forge:nuggets/iron"
		}).id(`thermal:${bombname}_grenade_4`)
	}
})
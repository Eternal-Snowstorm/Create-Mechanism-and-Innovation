ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 锌粒
	create.milling("create:zinc_nugget", [
		"#create:copycats"
	])

	create.crushing([
		Item.of("create:zinc_nugget"),
		Item.of("create:zinc_nugget").withChance(0.5),
	], "#create:copycats")

	// 黄铜粒
	addCastingNugget("tconstruct:molten_brass", "create:brass_nugget")

	/**
	 * 
	 * @param {string} fluid 
	 * @param {string} result 
	 */
	function addCastingNugget(fluid, result) {
		// 金模具
		event.custom({
			type: "tconstruct:casting_table",
			cast: Ingredient.of("#tconstruct:casts/multi_use/nugget").toJson(),
			cooling_time: 20,
			fluid: Fluid.of(fluid, 10).toJson(),
			result: result
		})
		// 沙模具
		event.custom({
			type: "tconstruct:casting_table",
			cast: Ingredient.of("#tconstruct:casts/single_use/nugget").toJson(),
			cast_consumed: true,
			cooling_time: 20,
			fluid: Fluid.of(fluid, 10).toJson(),
			result: result
		})
	}
})
ServerEvents.recipes((event) => {
	let { create, createdieselgenerators } = event.getRecipes()

	// 糖浆
	create.compacting([
		Fluid.of("thermal:syrup", 100),
		"cmi:sugarcane_fiber"
	], "minecraft:sugar_cane")

	create.compacting(Fluid.of("thermal:syrup", 100), [
		"#forge:vegetables/beetroot"
	])

	// 纸
	create.emptying([
		Fluid.of("thermal:syrup", 10),
		"6x minecraft:paper"
	], "cmi:sugarcane_fiber")

	SmeltingRecipes.smoking(event, "3x minecraft:paper", "cmi:sugarcane_fiber")

	// 糖
	create.mixing("minecraft:sugar", [
		Fluid.of("thermal:syrup", 25)
	]).heatRequirement(CmiHeatLevel.GRILLED)

	/**
	 * 乙醇发酵配方
	 * 
	 * @param {(Internal.InputFluid_|InputItem_)[]} input 输入物品
	 * @param {number} amount 输出流体量
	 * @returns 
	 */
	function addEthanolRecipes(input, amount) {
		const ETHANOL = "immersiveengineering:ethanol"
		let recipe =
			createdieselgenerators.basin_fermenting(Fluid.of(ETHANOL, amount), [
				Fluid.of("thermal:syrup", amount),
				input
			]).processingTime(20 * 5)
		return recipe
	}

	addEthanolRecipes("#forge:vegetables/potato", 80)
	addEthanolRecipes("minecraft:melon_slice", 20)
	addEthanolRecipes("#forge:vegetables/tomato", 80)
	addEthanolRecipes("minecraft:sweet_berries", 50)
	addEthanolRecipes("minecraft:apple", 80)
	addEthanolRecipes("minecraft:glow_berries", 100)
	addEthanolRecipes("#forge:vegetables/beetroot", 40)
})
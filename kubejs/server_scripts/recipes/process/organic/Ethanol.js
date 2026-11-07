ServerEvents.recipes((event) => {
	let { createdieselgenerators, immersiveengineering } = event.getRecipes()

	// 乙醇（发酵罐）
	immersiveengineering.fermenter(
		"#forge:fermentable",
		Fluid.of("immersiveengineering:ethanol", 100),
		Item.of("createaddition:biomass").withChance(0.1)
	).energy(2400)

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

	// 大量发酵乙醇
	event.remove({
		id: "createdieselgenerators:bulk_fermenting/fermentable"
	})

	/**
	 * 乙醇发酵配方（发酵桶）
	 * 
	 * @param {(Internal.InputFluid_|InputItem_)[]} input 输入物品
	 * @param {number} amount 输出流体量
	 * @returns 
	 */
	function addBulkEthanolRecipes(input, amount) {
		const ETHANOL = "immersiveengineering:ethanol"
		let recipe = createdieselgenerators.bulk_fermenting(Fluid.of(ETHANOL, amount), [
			Fluid.of("thermal:syrup", amount),
			input
		]).processingTime(20 * 5)
		return recipe
	}

	addBulkEthanolRecipes("#forge:vegetables/potato", 80)
	addBulkEthanolRecipes("minecraft:melon_slice", 20)
	addBulkEthanolRecipes("#forge:vegetables/tomato", 80)
	addBulkEthanolRecipes("minecraft:sweet_berries", 50)
	addBulkEthanolRecipes("minecraft:apple", 80)
	addBulkEthanolRecipes("minecraft:glow_berries", 100)
	addBulkEthanolRecipes("#forge:vegetables/beetroot", 40)
})

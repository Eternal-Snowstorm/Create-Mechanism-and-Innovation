ServerEvents.recipes((event) => {
	/**
	 * 
	 * @param {Internal.Ingredient_} inputItem 
	 * @param {number} amount 
	 * @returns 
	 */
	function addCryoFreezingRecipe(inputItem, amount) {
		return event.custom({
			"type": "ad_astra:cryo_freezing",
			"cookingtime": 20,
			"energy": 2000,
			"ingredient": Ingredient.of(inputItem).toJson(),
			"result": {
				"fluid": "neoecoae:cryotheum_solution",
				"millibuckets": amount
			}
		})
	}

	// 寒冰碎片(按理说一个寒冰碎片应该是2.5mB...但是很明显写小数不太好, 所以只能四舍五入了)
	addCryoFreezingRecipe("ad_astra:ice_shard", 3)
		.id("ad_astra:cryo_freezing/cryo_fuel_from_cryo_freezing_ice_shard")

	// 冰
	addCryoFreezingRecipe("minecraft:ice", 10)
		.id("ad_astra:cryo_freezing/cryo_fuel_from_cryo_freezing_ice")

	// 浮冰
	addCryoFreezingRecipe("minecraft:packed_ice", 40)
		.id("ad_astra:cryo_freezing/cryo_fuel_from_cryo_freezing_packed_ice")

	// 蓝冰
	addCryoFreezingRecipe("minecraft:blue_ice", 160)
		.id("ad_astra:cryo_freezing/cryo_fuel_from_cryo_freezing_blue_ice")
})
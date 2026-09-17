ServerEvents.recipes((event) => {
	// 铸铁
	event.custom({
		"type": "ad_astra:alloying",
		"cookingtime": 20 * 5,
		"energy": 100,
		"ingredients": [
			Ingredient.of("#forge:ingots/iron").toJson(),
			Ingredient.of("#forge:coal_coke").toJson()
		],
		"result": {
			"id": "cmi:cast_iron_ingot",
			"count": 1
		}
	})

	// 铸铁块
	event.custom({
		"type": "ad_astra:alloying",
		"cookingtime": (20 * 5) * 9,
		"energy": 100,
		"ingredients": [
			Ingredient.of("#forge:storage_blocks/iron").toJson(),
			Ingredient.of("#forge:storage_blocks/coal_coke").toJson()
		],
		"result": {
			"id": "cmi:cast_iron_block",
			"count": 1
		}
	})
})
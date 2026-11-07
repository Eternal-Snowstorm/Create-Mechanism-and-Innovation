ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 富集合金
	mekanism.metallurgic_infusing(
		"cmi:enriched_alloy",
		"#forge:ingots/aluminum",
		"cmi:cobalt_electrolyte"
	)

	// 灌注合金
	mekanism.metallurgic_infusing(
		"mekanism:alloy_infused",
		"#forge:ingots/chromium",
		"2x mekanism:redstone"
	).id("mekanism:metallurgic_infusing/alloy/infused")

	// 强化合金
	mekanism.metallurgic_infusing(
		"mekanism:alloy_reinforced",
		"#forge:ingots/titanium",
		"2x mekanism:redstone"
	).id("mekanism:metallurgic_infusing/alloy/reinforced")

	// 原子合金
	mekanism.metallurgic_infusing(
		"mekanism:alloy_atomic",
		"#forge:ingots/superconducting_mercury",
		"2x mekanism:redstone"
	).id("mekanism:metallurgic_infusing/alloy/atomic")

	// 钨钢 from 粉
	mekanism.metallurgic_infusing(
		"cmi:tungsten_steel_dust",
		"#forge:dusts/tungsten",
	).chemicalInput({ amount: 20, tag: "mekanism:carbon" })

	// 钨钢 from 板
	mekanism.metallurgic_infusing(
		"cmi:tungsten_steel_plate",
		"#forge:plates/tungsten"
	).chemicalInput({ amount: 20, tag: "mekanism:carbon" })

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

	// 戴斯
	event.custom({
		"type": "ad_astra:alloying",
		"cookingtime": 100,
		"energy": 20,
		"ingredients": [
			Ingredient.of("#forge:raw_materials/desh_scrap").toJson(),
			Ingredient.of("#forge:ingots/aluminum").toJson()
		],
		"result": {
			"id": "ad_astra:desh_ingot",
			"count": 4
		}
	})

	// 紫金
	event.custom({
		"type": "ad_astra:alloying",
		"cookingtime": 100,
		"energy": 20,
		"ingredients": [
			Ingredient.of("#forge:raw_materials/ostrum_scrap").toJson(),
			Ingredient.of("#forge:ingots/titanium").toJson()
		],
		"result": {
			"id": "ad_astra:ostrum_ingot",
			"count": 4
		}
	})

	// 耐热金属
	event.custom({
		"type": "ad_astra:alloying",
		"cookingtime": 100,
		"energy": 20,
		"ingredients": [
			Ingredient.of("#forge:raw_materials/calorite_scrap").toJson(),
			Ingredient.of("#forge:ingots/osmium").toJson()
		],
		"result": {
			"id": "ad_astra:calorite_ingot",
			"count": 4
		}
	})
})

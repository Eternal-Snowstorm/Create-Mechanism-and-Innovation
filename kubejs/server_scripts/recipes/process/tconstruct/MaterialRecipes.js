ServerEvents.recipes((event) => {
	// leftover 封装
	function addLeftover(item, count) {
		return Item.of(item, count).toJson()
	}

	// 手搓材料封装
	function addMaterial(ingredient, material, value, leftover) {
		let recipe = {
			type: "tconstruct:material",
			ingredient: Ingredient.of(ingredient).toJson(),
			material: material,
			needed: 1,
			value: value
		}
		if (leftover) {
			recipe.leftover = leftover
		}
		return event.custom(recipe)
	}

	// 流体铸造工具封装
	function addMaterialFluid(fluid, material, amount, temperature) {
		return event.custom({
			type: "tconstruct:material_fluid",
			fluid: Fluid.of(fluid, amount).toJson(),
			temperature: temperature,
			output: material
		})
	}

	// 手搓
	addMaterial("minecraft:amethyst_block", "cmi:amethyst", 4, addLeftover("minecraft:amethyst_shard", 1))
	addMaterial("minecraft:amethyst_shard", "cmi:amethyst", 1)
	addMaterial("#forge:storage_blocks/andesite_alloy", "cmi:andesite_alloy", 9, addLeftover("create:andesite_alloy", 4))
	addMaterial("#forge:ingots/andesite_alloy", "cmi:andesite_alloy", 1)
	addMaterial("#forge:ingots/refined_radiance", "cmi:refined_radiance", 1)
	addMaterial("#forge:ingots/shadow_steel", "cmi:shadow_steel", 1)

	// 流体铸造
	addMaterialFluid("tconstruct:molten_amethyst", "cmi:amethyst", 90, 800)
	addMaterialFluid("cmi:molten_andesite_alloy", "cmi:andesite_alloy", 90, 800)
	addMaterialFluid("tconstruct:molten_brass", "cmi:brass", 90, 810)
	addMaterialFluid("cmi:molten_industrial_iron", "cmi:industrial_iron", 90, 810)
	addMaterialFluid("cmi:molten_cast_iron", "cmi:cast_iron", 90, 810)
	addMaterialFluid("cmi:molten_desh", "cmi:desh", 90, 810)
	addMaterialFluid("cmi:molten_ostrum", "cmi:ostrum", 90, 810)
	addMaterialFluid("cmi:molten_calorite", "cmi:calorite", 90, 810)
	addMaterialFluid("cmi:molten_stainless_steel", "cmi:stainless_steel", 90, 810)
})
ServerEvents.recipes((event) => {
	/**
	 * @constructor
	 * @param {Internal.ItemStack_} output
	 */
	function CircuitCutterRecipe(output) {
		this.recipe = {
			type: "expatternprovider:circuit_cutter",
			output: Item.of(output).toJson()
		}
	}

	/**
	 * @param {Internal.Ingredient_} ingredient
	 * @param {number} [amount]
	 * @returns {CircuitCutterRecipe}
	 */
	CircuitCutterRecipe.prototype.item = function (ingredient, amount) {
		this.recipe.item_input = {
			amount: amount || 1,
			ingredient: Ingredient.of(ingredient).toJson()
		}
		return this
	}

	/**
	 * @param {Internal.FluidStackJS_} fluid
	 * @param {number} amount
	 * @returns {CircuitCutterRecipe}
	 */
	CircuitCutterRecipe.prototype.fluid = function (fluid, amount) {
		this.recipe.fluid_input = {
			amount: amount,
			ingredient: {
				fluid: Fluid.of(fluid).id
			}
		}
		return this
	}

	/**
	 * @param {ResourceLocation_} [id]
	 * @returns
	 */
	CircuitCutterRecipe.prototype.build = function (id) {
		let recipe = event.custom(this.recipe)

		if (id) {
			recipe.id(id)
		}

		return recipe
	}

	// 锇晶圆
	new CircuitCutterRecipe("cmi:osmium_wafer")
		.item("cmi:enriched_osmium_crystal")
		.fluid("immersiveengineering:redstone_acid", 100)
		.build()

	// 硅晶圆
	new CircuitCutterRecipe("cmi:silicon_wafer")
		.item("cmi:single_crystal_silicon")
		.fluid("immersiveengineering:redstone_acid", 100)
		.build()

	// 锗晶圆
	new CircuitCutterRecipe("cmi:germanium_wafer")
		.item("cmi:germanium_crystal")
		.fluid("immersiveengineering:redstone_acid", 100)
		.build()

	// 恩特罗合金晶圆
	new CircuitCutterRecipe("cmi:entro_alloy_wafer")
		.item("cmi:entro_alloy")
		.fluid("immersiveengineering:redstone_acid", 100)
		.build()

	// 逻辑电路板
	new CircuitCutterRecipe(Item.of(Print.LOGIC, 9))
		.item("#forge:storage_blocks/electrum")
		.fluid("immersiveengineering:redstone_acid", 100)
		.build("expatternprovider:cutter/logic")

	// 计算电路板
	new CircuitCutterRecipe(Item.of(Print.CALCULATION, 4))
		.item("#forge:storage_blocks/certus_quartz")
		.fluid("immersiveengineering:redstone_acid", 100)
		.build("expatternprovider:cutter/calculation")

	// 工程电路板
	new CircuitCutterRecipe(Item.of(Print.ENGINEERING, 9))
		.item("#forge:storage_blocks/etrium")
		.fluid("immersiveengineering:redstone_acid", 100)
		.build("expatternprovider:cutter/engineering")

	// 并发电路板
	new CircuitCutterRecipe(Item.of(Print.CONCURRENT, 9))
		.item("#forge:storage_blocks/entro")
		.fluid("immersiveengineering:redstone_acid", 100)
		.build()

	// 超导电路板
	new CircuitCutterRecipe(Item.of(Print.SUPERCONDUCTING, 9))
		.item("neoecoae:energized_superconductive_block")
		.fluid("immersiveengineering:redstone_acid", 100)
		.build("neoecoae:circuit_cutter/superconducting_processor_print")

	// 乙烯聚合催化片
	new CircuitCutterRecipe("2x cmi:ethylene_polymerization_catalytic_plate")
		.item("cmi:polymerization_catalytic_alloy")
		.fluid("immersiveengineering:redstone_acid", 100)
		.build()

	// 碳沉积催化片
	new CircuitCutterRecipe("2x cmi:carbon_deposition_catalytic_plate")
		.item("cmi:deposition_catalytic_alloy")
		.fluid("immersiveengineering:redstone_acid", 100)
		.build()

	// 超导汞板
	new CircuitCutterRecipe("cmi:superconducting_mercury_plate")
		.item("cmi:superconducting_mercury_ingot")
		.fluid("immersiveengineering:redstone_acid", 100)
		.build()
})
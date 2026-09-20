ServerEvents.recipes((event) => {
	/**
	 * @constructor
	 * @param {Internal.ItemStack_} output
	 */
	function InscriberRecipe(output) {
		this.recipe = {
			type: "ae2:inscriber",
			ingredients: {},
			result: Item.of(output).toJson()
		}
	}

	/**
	 * @param {Internal.Ingredient_} input
	 * @returns
	 */
	InscriberRecipe.prototype.middle = function (input) {
		this.recipe.ingredients.middle = Ingredient.of(input).toJson()
		return this
	}

	/**
	 * @param {Internal.Ingredient_} input
	 * @returns 
	 */
	InscriberRecipe.prototype.top = function (input) {
		this.recipe.ingredients.top = Ingredient.of(input).toJson()
		return this
	}

	/**
	 * 
	 * @param {Internal.Ingredient_} input 
	 * @returns 
	 */
	InscriberRecipe.prototype.bottom = function (input) {
		this.recipe.ingredients.bottom = Ingredient.of(input).toJson()
		return this
	}

	InscriberRecipe.prototype.press = function () {
		this.recipe.mode = "press"
		return event.custom(this.recipe)
	}

	InscriberRecipe.prototype.inscribe = function () {
		this.recipe.mode = "inscribe"
		return event.custom(this.recipe)
	}

	// 压印模板	
	new InscriberRecipe("ae2:silicon_press")
		.top("ae2:silicon_press")
		.middle("#forge:plates/iron")
		.inscribe()

	new InscriberRecipe("ae2:logic_processor_press")
		.top("ae2:logic_processor_press")
		.middle("#forge:plates/iron")
		.inscribe()
		.id("ae2:inscriber/logic_processor_press")

	new InscriberRecipe("ae2:calculation_processor_press")
		.top("ae2:calculation_processor_press")
		.middle("#forge:plates/iron")
		.inscribe()
		.id("ae2:inscriber/calculation_processor_press")

	new InscriberRecipe("ae2:engineering_processor_press")
		.top("ae2:engineering_processor_press")
		.middle("#forge:plates/iron")
		.inscribe()
		.id("ae2:inscriber/engineering_processor_press")

	new InscriberRecipe("cmi:concurrent_processor_press")
		.top("cmi:concurrent_processor_press")
		.middle("#forge:plates/iron")
		.inscribe()

	new InscriberRecipe("neoecoae:superconducting_processor_press")
		.top("neoecoae:superconducting_processor_press")
		.middle("#forge:plates/iron")
		.inscribe()
		.id("neoecoae:inscriber/superconducting_processor_press")

	// 碳化硅板
	new InscriberRecipe("cmi:silicon_carbide_plate")
		.middle("cmi:silicon_carbide")
		.top("ae2:silicon_press")
		.inscribe()

	// 线刻硅板
	new InscriberRecipe("cmi:inscribed_silicon")
		.middle("ae2:printed_silicon")
		.top("#forge:wires/signalum")
		.press()

	// 铁氧体磁芯
	new InscriberRecipe("4x cmi:ferrit_core")
		.bottom("#forge:plates/nickel")
		.middle("#forge:plates/iron")
		.top("#forge:plates/zinc")
		.press()

	// 磁触点
	new InscriberRecipe("cmi:magnetic_contact")
		.bottom("cmi:piezoelectric_ceramic")
		.middle("cmi:ferrit_core")
		.top("cmi:composite_magnetic_conduction_plate")
		.press()

	// 控制芯片
	new InscriberRecipe(Processor.CONTROL)
		.top("#forge:plates/signalum")
		.middle("#forge:plates/copper")
		.bottom("#forge:plates/brass")
		.press()

	// 逻辑电路板
	new InscriberRecipe(Print.LOGIC)
		.top("ae2:logic_processor_press")
		.middle("#forge:ingots/electrum")
		.inscribe()
		.id("ae2:inscriber/logic_processor_print")

	// 工程电路板
	new InscriberRecipe(Print.ENGINEERING)
		.top("ae2:engineering_processor_press")
		.middle("#forge:ingots/etrium")
		.inscribe()
		.id("ae2:inscriber/engineering_processor_print")

	// 并发电路板
	new InscriberRecipe(Print.CONCURRENT)
		.top("cmi:concurrent_processor_press")
		.middle("#forge:gems/entro")
		.inscribe()

	// 逻辑处理器
	new InscriberRecipe(Processor.LOGIC)
		.bottom(Print.LOGIC)
		.middle("create:polished_rose_quartz")
		.top("cmi:inscribed_silicon")
		.press()
		.id("ae2:inscriber/logic_processor")

	// 计算处理器
	new InscriberRecipe(Processor.CALCULATION)
		.bottom(Print.CALCULATION)
		.middle("#forge:silicon")
		.top("cmi:inscribed_silicon")
		.press()
		.id("ae2:inscriber/calculation_processor")

	// 工程处理器
	new InscriberRecipe(Processor.ENGINEERING)
		.bottom(Print.ENGINEERING)
		.middle("#forge:gems/sapphire")
		.top("cmi:inscribed_silicon")
		.press()
		.id("ae2:inscriber/engineering_processor")

	// 并发处理器
	new InscriberRecipe(Processor.CONCURRENT)
		.bottom(Print.CONCURRENT)
		.middle("cmi:silicon_carbide")
		.top("cmi:inscribed_silicon")
		.press()

	// 超导处理器
	new InscriberRecipe(Processor.SUPERCONDUCTING)
		.bottom(Print.SUPERCONDUCTING)
		.middle("neoecoae:crystal_matrix")
		.top("cmi:inscribed_silicon")
		.press()
		.id("neoecoae:inscriber/superconducting_processor")

	// 基础电子元件
	new InscriberRecipe("cmi:basic_electronic_components")
		.top("cmi:enriched_alloy")
		.middle("cmi:osmium_wafer")
		.bottom("#forge:plates/copper")
		.press()

	// 高级电子元件
	new InscriberRecipe("cmi:advanced_electronic_components")
		.top("mekanism:alloy_infused")
		.middle("cmi:silicon_wafer")
		.bottom("#forge:plates/copper")
		.press()

	// 精英电子元件
	new InscriberRecipe("cmi:elite_electronic_components")
		.top("mekanism:alloy_reinforced")
		.middle("cmi:germanium_wafer")
		.bottom("#forge:plates/copper")
		.press()

	// 终极电子元件
	new InscriberRecipe("cmi:ultimate_electronic_components")
		.top("mekanism:alloy_atomic")
		.middle("cmi:entro_alloy_wafer")
		.bottom("#forge:plates/copper")
		.press()

	// 基础控制电路
	new InscriberRecipe("mekanism:basic_control_circuit")
		.top("cmi:inscribed_silicon")
		.middle("cmi:osmium_wafer")
		.bottom("#forge:alloys/enriched")
		.press()

	// 高级控制电路
	new InscriberRecipe("mekanism:advanced_control_circuit")
		.top("cmi:inscribed_silicon")
		.middle("cmi:silicon_wafer")
		.bottom("mekanism:alloy_infused")
		.press()

	// 精英控制电路
	new InscriberRecipe("mekanism:elite_control_circuit")
		.top("cmi:inscribed_silicon")
		.middle("cmi:germanium_wafer")
		.bottom("mekanism:alloy_reinforced")
		.press()

	// 终极控制电路
	new InscriberRecipe("mekanism:ultimate_control_circuit")
		.top("neoecoae:superconducting_processor")
		.middle("cmi:entro_alloy_wafer")
		.bottom("mekanism:alloy_atomic")
		.press()

})
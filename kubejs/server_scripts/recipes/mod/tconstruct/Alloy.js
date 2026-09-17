ServerEvents.recipes((event) => {
	let { tconstruct, create } = event.getRecipes()

	/**
	 * 
	 * @param {string} material 
	 * @param {number} count
	 */
	function alloyingRecipe(material, count) {
		this.material = material
		this.resultItem = Ingredient.of(`#forge:ingots/${material}`)
		this.resultFluid = Fluid.of(resolveMoltenFluid(material), 90 * count)
		this.meltingPoint = CmiMetal.getMetal(material).getMeltingPoint()
		this.alloyInput = []
		return this
	}

	/**
	 * 
	 * @param {Internal.InputFluid[]} input 
	 */
	alloyingRecipe.prototype.input = function (input) {
		this.alloyInput = input
		return this
	}

	alloyingRecipe.prototype.alloy = function (id) {
		let tconBuilder = tconstruct.alloy(this.resultFluid)
			.temperature(this.meltingPoint)
			.inputs(this.alloyInput)

		if (id != null) {
			tconBuilder.id(id)
		}

		return this
	}

	alloyingRecipe.prototype.mixing = function (id) {
		let createBuilder = create.mixing(
			this.resultFluid,
			this.alloyInput
		)

		if (this.meltingPoint <= 1132) {
			createBuilder.heatRequirement(CmiHeatLevel.GRILLED)
		} else if (this.meltingPoint <= 1814) {
			createBuilder.heated()
		} else {
			createBuilder.superheated()
		}

		if (id != null) {
			createBuilder.id(id)
		}
		return this
	}

	new alloyingRecipe("pig_iron", 2)
		.input([
			Fluid.of("tconstruct:molten_iron", 90),
			Fluid.of("cmi:blood", 500),
			Fluid.of("tconstruct:molten_clay", 250)
		])
		.mixing("createaddition:compat/tconstruct/pig_iron")

	new alloyingRecipe("pig_iron", 2)
		.input([
			Fluid.of("tconstruct:molten_iron", 90),
			Fluid.tag("tag", "cmi:pig_iron_material", 500),
			Fluid.of("tconstruct:molten_clay", 250)
		])
		.alloy("tconstruct:smeltery/alloys/molten_pig_iron")

	new alloyingRecipe("brass", 4)
		.input([
			Fluid.of("tconstruct:molten_copper", 270),
			Fluid.of("tconstruct:molten_zinc", 90)
		])
		.alloy("tconstruct:smeltery/alloys/molten_brass")
		.mixing("create:mixing/brass_ingot")

	new alloyingRecipe("bronze", 4)
		.input([
			Fluid.of("tconstruct:molten_copper", 270),
			Fluid.of("tconstruct:molten_tin", 90)
		])
		.alloy("tconstruct:smeltery/alloys/molten_bronze")
		.mixing()

	new alloyingRecipe("rose_gold", 4)
		.input([
			Fluid.of("tconstruct:molten_gold", 270),
			Fluid.of("tconstruct:molten_copper", 90)
		])
		.alloy("tconstruct:smeltery/alloys/molten_rose_gold")
		.mixing("createaddition:compat/tconstruct/rose_gold")

	new alloyingRecipe("electrum", 4)
		.input([
			Fluid.of("tconstruct:molten_gold", 270),
			Fluid.of("tconstruct:molten_silver", 90)
		])
		.alloy("tconstruct:smeltery/alloys/molten_electrum")
		.mixing("createaddition:mixing/electrum")

	new alloyingRecipe("invar", 3)
		.input([
			Fluid.of("tconstruct:molten_iron", 180),
			Fluid.of("tconstruct:molten_nickel", 90)
		])
		.alloy("tconstruct:smeltery/alloys/molten_invar")
		.mixing()

	new alloyingRecipe("constantan", 2)
		.input([
			Fluid.of("tconstruct:molten_copper", 90),
			Fluid.of("tconstruct:molten_nickel", 90)
		])
		.alloy("tconstruct:smeltery/alloys/molten_constantan")
		.mixing()

	new alloyingRecipe("signalum", 4)
		.input([
			Fluid.of("tconstruct:molten_lead", 90),
			Fluid.of("tconstruct:molten_copper", 270),
			Fluid.of("thermal:redstone", 400)
		])
		.alloy("tconstruct:smeltery/alloys/molten_signalum")
		.mixing()

	new alloyingRecipe("lumium", 4)
		.input([
			Fluid.of("tconstruct:molten_gold", 90),
			Fluid.of("tconstruct:molten_tin", 270),
			Fluid.of("thermal:glowstone", 500)
		])
		.alloy("tconstruct:smeltery/alloys/molten_lumium")
		.mixing()

	new alloyingRecipe("amethyst_bronze", 1)
		.input([
			Fluid.of("tconstruct:molten_copper", 90),
			Fluid.of("tconstruct:molten_amethyst", 100)
		])
		.alloy("tconstruct:smeltery/alloys/molten_amethyst_bronze")
		.mixing("createaddition:compat/tconstruct/amethyst_bronze")

	new alloyingRecipe("hepatizon", 2)
		.input([
			Fluid.of("tconstruct:molten_obsidian", 1000),
			Fluid.of("tconstruct:molten_cobalt", 90),
			Fluid.of("tconstruct:molten_copper", 180)
		])
		.alloy("tconstruct:smeltery/alloys/molten_hepatizon")
		.mixing("createaddition:compat/tconstruct/hepatizon")

	new alloyingRecipe("manyullyn", 4)
		.input([
			Fluid.of("tconstruct:molten_cobalt", 270),
			Fluid.of("tconstruct:molten_debris", 90)
		])
		.alloy("tconstruct:smeltery/alloys/molten_manyullyn")
		.mixing("createaddition:compat/tconstruct/manyullyn")

	new alloyingRecipe("slimesteel", 2)
		.input([
			Fluid.of("tconstruct:molten_iron", 90),
			Fluid.of("tconstruct:sky_slime", 250),
			Fluid.of("tconstruct:seared_stone", 250)
		])
		.alloy("tconstruct:smeltery/alloys/molten_slimesteel")
		.mixing("createaddition:compat/tconstruct/slimesteel")

	new alloyingRecipe("queens_slime", 2)
		.input([
			Fluid.of("tconstruct:molten_cobalt", 90),
			Fluid.of("tconstruct:molten_gold", 90),
			Fluid.of("tconstruct:magma", 250)
		])
		.alloy("tconstruct:smeltery/alloys/molten_queens_slime")
		.mixing("createaddition:compat/tconstruct/queens_slime")

	new alloyingRecipe("cinderslime", 2)
		.input([
			Fluid.of("tconstruct:molten_gold", 90),
			Fluid.of("tconstruct:ichor", 250),
			Fluid.of("tconstruct:scorched_stone", 250)
		])
		.alloy("tconstruct:smeltery/alloys/molten_cinderslime")
		.mixing()

	new alloyingRecipe("knightslime", 2)
		.input([
			Fluid.of("tconstruct:molten_cobalt", 90),
			Fluid.of("tconstruct:ender_slime", 250),
			Fluid.of("tconstruct:molten_obsidian", 250)
		])
		.alloy("tconstruct:smeltery/alloys/molten_knightslime")
		.mixing()
})
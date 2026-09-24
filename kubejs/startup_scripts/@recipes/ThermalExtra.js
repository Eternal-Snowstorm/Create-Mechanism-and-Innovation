new Schema("thermal_extra:advanced_refinery")
	.simpleKey("result", "outputFluidOrItemArray")
	.simpleKey("ingredients", "inputFluidArray")
	.simpleKey("energy", "intNumber", 100)

new Schema("thermal_extra:fluid_mixer")
	.simpleKey("result", "outputFluidArray")
	.simpleKey("ingredients", "inputFluidArray")
	.simpleKey("energy", "intNumber", 100)

new Schema("thermal_extra:component_assembly")
	.simpleKey("result", "outputFluidOrItemArray")
	.simpleKey("ingredients", "inputFluidOrItemArray")
	.simpleKey("energy", "intNumber", 100)

new Schema("thermal_extra:endothermic_dehydrator")
	.simpleKey("result", "outputFluidOrItem")
	.simpleKey("ingredients", "inputFluidOrItemArray")
	.simpleKey("energy", "intNumber", 100)

new Schema("thermal_extra:cold_fuel")
	.simpleKey("ingredient", "inputItem")
	.simpleKey("energy", "intNumber", 100)

new Schema("thermal_extra:terraceous_fuel")
	.simpleKey("ingredient", "inputItem")
	.simpleKey("energy", "intNumber", 100)

new Schema("thermal_extra:nitratic_igniter")
	.simpleKey("result", "outputItemArray")
	.simpleKey("ingredients", "inputItemArray")
	.simpleKey("energy", "intNumber", 100)
	.simpleKey("experience", "intNumber", 1)

new Schema("thermal_extra:nitratic_igniter_catalyst")
	.simpleKey("ingredient", "inputItem")
	.simpleKey("energy_mod", "intNumber", 1)
	.simpleKey("primary_mod", "intNumber", 1)
	.simpleKey("secondary_mod", "intNumber", 1)
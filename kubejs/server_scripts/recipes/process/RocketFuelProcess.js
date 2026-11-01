ServerEvents.recipes((event) => {
	let { cmi, thermal } = event.getRecipes()

	// 光合反应液
	cmi.chemical_reactor()
		.outputFluids(Fluid.of("cmi:photosyn_fluid", 1000))
		.inputFluids(Fluid.of("minecraft:water", 500))
		.inputItems([
			"minecraft:glowstone_dust",
			"16x #minecraft:leaves",
			"16x createaddition:biomass"
		])
		.perTick((recipe) => {
			recipe.inputFE(2000)
		})

	cmi.chemical_reactor()
		.outputFluids(Fluid.of("cmi:photosyn_fluid", 1000))
		.inputFluids(Fluid.of("minecraft:water", 500))
		.inputItems([
			"minecraft:glowstone_dust",
			"16x #minecraft:saplings",
			"16x createaddition:biomass"
		])
		.perTick((recipe) => {
			recipe.inputFE(2000)
		})

	cmi.chemical_reactor()
		.outputFluids(Fluid.of("cmi:photosyn_fluid", 1000))
		.inputFluids(Fluid.of("minecraft:water", 100))
		.inputItems([
			["edenring:volvox_block", "edenring:volvox_block_dense"]
		])
		.perTick((recipe) => {
			recipe.inputFE(2000)
		})

	// 少量氧气
	thermal.refinery(Fluid.of("mekanism:oxygen", 25), [
		Fluid.of("cmi:photosyn_fluid", 500)
	]).energy(2000)

	// 燃油
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:dusts/charcoal").toJson(),
		"energy": 120,
		"input0": {
			"amount": 25,
			"tag": "forge:oxygen"
		},
		"input1": {
			"amount": 250,
			"tag": "forge:kerosene"
		},
		"result": {
			"amount": 50,
			"fluid": "ad_astra:fuel",
		}
	})
})
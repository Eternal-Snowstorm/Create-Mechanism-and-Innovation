ServerEvents.recipes((event) => {
	let { immersiveengineering } = event.getRecipes()

	immersiveengineering.coke_oven("mekanism:dust_charcoal")
		.input("#forge:dusts/wood")
		.creosote(125)

	immersiveengineering.coke_oven("thermal:coal_coke")
		.input("minecraft:coal")
		.creosote(500)
		.time(1800)
		.id("immersiveengineering:cokeoven/coke")

	event.custom({
		"type": "immersiveindustry:rotary_kiln",
		"input": Item.of("minecraft:charcoal").toJson(),
		"result": Item.of("thermal:coal_coke").toJson(),
		"result_fluid": Fluid.of("immersiveengineering:creosote").toJson(),
		"time": 900,
		"tickEnergy": 56
	})
})
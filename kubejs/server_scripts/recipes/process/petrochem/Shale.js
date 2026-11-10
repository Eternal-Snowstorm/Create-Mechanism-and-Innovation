ServerEvents.recipes((event) => {
	let { create, thermal, thermal_extra } = event.getRecipes()

	// 油页岩粉
	create.milling("cmi:oil_shale_dust", [
		"cmi:oil_shale"
	])

	create.crushing([
		"2x cmi:oil_shale_dust",
		Item.of("cmi:oil_shale_dust").withChance(0.2)
	], "cmi:oil_shale")

	// 油页岩蒸汽
	thermal.pyrolyzer([
		Fluid.of("cmi:oil_shale_steam", 200),
		Item.of("immersiveengineering:slag").withChance(0.26),
		Item.of("thermal:bitumen").withChance(0.05)
	], "#forge:dusts/oil_shale")
		.energy(4000)

	// 蒸汽处理
	thermal_extra.advanced_refinery([
		Fluid.of("createdieselgenerators:crude_oil", 100),
		Fluid.of("mekanism:steam", 500),
		Fluid.of("cmi:turbid_waste_liquid", 400)
	], Fluid.of("cmi:oil_shale_steam", 1000))
		.energy(10000)
})
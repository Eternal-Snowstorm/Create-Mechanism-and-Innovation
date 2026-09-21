ServerEvents.recipes((event) => {
	let { create, thermal, thermal_extra } = event.getRecipes()

	thermal.refinery([
		"cmi:sludge_extract",
		Fluid.of("minecraft:water", 10000)
	], Fluid.of("cmi:sludge_suspension", 10000))

	thermal_extra.advanced_refinery([
		"2x cmi:sludge_extract",
		Fluid.of("minecraft:water", 10000)
	], Fluid.of("cmi:sludge_suspension", 10000))

	thermal.pyrolyzer("cmi:siltsteel_dust", [
		"cmi:sludge_extract"
	])

	create.mixing([
		Fluid.of("cmi:sludge_suspension", 1000),
		Item.of("cmi:crimsite_dust", 1).withChance(0.1),
		Item.of("cmi:ochrum_dust", 1).withChance(0.1),
		Item.of("cmi:veridium_dust", 1).withChance(0.1),
		Item.of("cmi:asurine_dust", 1).withChance(0.1)
	], [
		"cmi:deposit_dust",
		Fluid.of("minecraft:water", 1000)
	])
})
ServerEvents.recipes((event) => {
	let { createdieselgenerators, thermal, thermal_extra, tconstruct } = event.getRecipes()

	// 蒸馏
	createdieselgenerators.distillation([
		Fluid.of("cmi:bitumen", 500),
		Fluid.of("thermal:heavy_oil", 500),
		Fluid.of("thermal_extra:lubricant", 500),
		Fluid.of("cmi:sulfric_diesel", 500),
		Fluid.of("cmi:kerosene", 500),
		Fluid.of("thermal_extra:naphtha", 500)
	], Fluid.of("createdieselgenerators:crude_oil", 2000))
		.heatRequirement(CmiHeatLevel.HEATED)
		.id("createdieselgenerators:distillation/crude_oil")

	// 沥青冷却
	thermal.chiller("thermal:bitumen", [
		Fluid.of("cmi:bitumen", 200)
	]).energy(2000)

	tconstruct.casting_table("thermal:bitumen")
		.fluid(Fluid.of("cmi:bitumen", 200))
		.cooling_time(20)

	tconstruct.casting_basin("thermal:bitumen_block")
		.fluid(Fluid.of("cmi:bitumen", 1800))
		.cooling_time(180)

	// 重油
	thermal.refinery([
		Fluid.of("createdieselgenerators:gasoline", 50),
		Fluid.of("thermal_extra:lubricant", 50)
	], [
		Fluid.of("thermal:heavy_oil", 100)
	]).id("thermal:machines/refinery/refinery_heavy_oil")

	thermal_extra.advanced_refinery([
		Fluid.of("createdieselgenerators:gasoline", 50),
		Fluid.of("thermal_extra:lubricant", 100)
	], [
		Fluid.of("thermal:heavy_oil", 100)
	]).id("thermal_extra:machine/advanced_refinery/heavy_oil")

	// 煤油
	thermal.refinery([
		Fluid.of("createdieselgenerators:gasoline", 50),
		Fluid.of("thermal_extra:naphtha", 50)
	], [
		Fluid.of("cmi:kerosene", 100)
	])

	thermal_extra.advanced_refinery([
		Fluid.of("createdieselgenerators:gasoline", 50),
		Fluid.of("thermal_extra:naphtha", 100)
	], [
		Fluid.of("cmi:kerosene", 100)
	])

	// 柴油
	thermal.refinery([
		Fluid.of("createdieselgenerators:diesel", 50),
		"thermal:sulfur_dust"
	], [
		Fluid.of("cmi:sulfric_diesel", 100)
	])

	thermal_extra.advanced_refinery([
		Fluid.of("createdieselgenerators:diesel", 80),
		"thermal:sulfur_dust"
	], [
		Fluid.of("cmi:sulfric_diesel", 100)
	])

	// 轻烯烃 石脑油
	thermal.refinery([
		Fluid.of("thermal_extra:naphtha", 50),
		Fluid.of("cmi:light_olefin", 100)
	], [
		Fluid.of("createdieselgenerators:diesel", 100)
	])
	thermal_extra.advanced_refinery([
		Fluid.of("thermal_extra:naphtha", 100),
		Fluid.of("cmi:light_olefin", 200)
	], [
		Fluid.of("createdieselgenerators:diesel", 100)
	])
})
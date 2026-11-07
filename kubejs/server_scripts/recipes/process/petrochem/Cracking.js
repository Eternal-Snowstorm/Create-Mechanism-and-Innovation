ServerEvents.recipes((event) => {
	let { createdieselgenerators, thermal, thermal_extra } = event.getRecipes()

	// 裂化汽油
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/vanadium").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "forge:gasoline", 200).toJson(),
		"input1": Fluid.tag("tag", "forge:steam", 100).toJson(),
		"result": Fluid.of("cmi:cracked_gasoline", 200).toJson()
	})

	// 裂化柴油
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/vanadium").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "forge:steam", 100).toJson(),
		"input1": Fluid.tag("tag", "forge:diesel", 100).toJson(),
		"result": Fluid.of("cmi:cracked_diesel", 200).toJson()
	})

	// 裂化柴油分馏
	createdieselgenerators.distillation([
		Fluid.of("cmi:light_aldehyde", 750),
		Fluid.of("cmi:acetylene", 250)
	], Fluid.of("cmi:cracked_diesel", 1000))
		.heatRequirement(CmiHeatLevel.HEATED)

	// 裂化润滑油
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/vanadium").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "forge:steam", 100).toJson(),
		"input1": Fluid.tag("tag", "forge:lubricant", 100).toJson(),
		"result": Fluid.of("cmi:cracked_lubricating_oil", 200).toJson()
	})

	// 聚烯烃 煤油
	thermal.refinery([
		Fluid.of("thermal_extra:polyolefin", 50),
		Fluid.of("cmi:kerosene", 50)
	], [
		Fluid.of("cmi:cracked_lubricating_oil", 100)
	]).id("thermal_extra:machine/refinery/polyolefin")

	thermal_extra.advanced_refinery([
		Fluid.of("thermal_extra:polyolefin", 100),
		Fluid.of("cmi:kerosene", 50)
	], [
		Fluid.of("cmi:cracked_lubricating_oil", 100)
	]).id("thermal_extra:machine/advanced_refinery/polyolefin")

	// 石脑油 苯 轻烯烃
	createdieselgenerators.distillation([
		Fluid.of("thermal_extra:naphtha", 100),
		Fluid.of("cmi:benzene", 100),
		Fluid.of("cmi:light_olefin", 200),
	], [
		Fluid.of("cmi:cracked_gasoline", 500)
	]).heatRequirement(CmiHeatLevel.HEATED)

	// 苯 乙烯
	thermal.refinery([
		Fluid.of("cmi:benzene", 50),
		Fluid.of("mekanism:ethene", 50)
	], [
		Fluid.of("thermal_extra:naphtha", 100)
	]).id("thermal_extra:machine/refinery/naphtha")

	thermal_extra.advanced_refinery([
		Fluid.of("cmi:benzene", 50),
		Fluid.of("mekanism:ethene", 100)
	], [
		Fluid.of("thermal_extra:naphtha", 100)
	]).id("thermal_extra:machine/advanced_refinery/naphtha")

	// 苯酚 轻烯烃 from 杂酚油
	createdieselgenerators.distillation([
		Fluid.of("cmi:phenol", 50),
		Fluid.of("cmi:light_olefin", 50)
	], [
		Fluid.of("immersiveengineering:creosote", 100)
	]).heatRequirement(CmiHeatLevel.HEATED)

	// 轻芳烃
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/vanadium").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "forge:naphtha", 100).toJson(),
		"input1": Fluid.tag("tag", "forge:acetaldehyde", 100).toJson(),
		"result": Fluid.of("cmi:light_aromatics", 100).toJson()
	})

	// 苯 乙烯 from 轻芳烃
	thermal.refinery([
		Fluid.of("cmi:benzene", 50),
		Fluid.of("mekanism:ethene", 50)
	], [
		Fluid.of("cmi:light_aromatics", 100)
	])

	thermal_extra.advanced_refinery([
		Fluid.of("cmi:benzene", 50),
		Fluid.of("mekanism:ethene", 100)
	], [
		Fluid.of("cmi:light_aromatics", 100)
	])
})

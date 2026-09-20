ServerEvents.recipes((event) => {
	let { create, createdieselgenerators, thermal, thermal_extra, tconstruct, cmi } = event.getRecipes()

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

	// 裂化汽油
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/vanadium").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "forge:gasoline", 200).toJson(),
		"input1": Fluid.tag("tag", "forge:steam", 100).toJson(),
		"result": Fluid.of("cmi:cracked_gasoline", 200).toJson()
	})

	// 裂化柴油分馏
	createdieselgenerators.distillation([
		Fluid.of("cmi:light_aldehyde", 750),
		Fluid.of("cmi:acetylene", 250)
	], Fluid.of("cmi:cracked_diesel", 1000))
		.heatRequirement(CmiHeatLevel.HEATED)

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

	// 苯酚
	createdieselgenerators.distillation([
		Fluid.of("cmi:phenol", 50),
		Fluid.of("cmi:light_olefin", 50)
	], [
		Fluid.of("immersiveengineering:creosote", 100)
	]).heatRequirement(CmiHeatLevel.HEATED)

	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/iron").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "cmi:benzene", 100).toJson(),
		"input1": Fluid.tag("tag", "forge:ethene", 100).toJson(),
		"result": Fluid.of("cmi:phenol", 200).toJson()
	})

	// 酚醛树脂
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/copper").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "cmi:phenol", 100).toJson(),
		"input1": Fluid.tag("tag", "forge:acetaldehyde", 100).toJson(),
		"result": Fluid.of("immersiveengineering:phenolic_resin", 200).toJson()
	})

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

	// 裂化柴油
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/vanadium").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "forge:steam", 100).toJson(),
		"input1": Fluid.tag("tag", "forge:diesel", 100).toJson(),
		"result": Fluid.of("cmi:cracked_diesel", 200).toJson()
	})

	// 乙烯醇
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/silver").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "cmi:acetylene", 100).toJson(),
		"result": Fluid.of("cmi:vinyl_alcohol", 100).toJson()
	})

	// 聚乙烯醇
	cmi.chemical_reactor()
		.inputFluids(Fluid.of("cmi:vinyl_alcohol", 2000))
		.outputFluids(Fluid.of("cmi:polyvinyl_alcohol", 2000))
		.inputFE(32 * (20 * 10))
		.duration(20 * 10)

	// 结构塑胶
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/copper").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "cmi:light_aldehyde", 100).toJson(),
		"input1": Fluid.tag("tag", "cmi:polyvinyl_alcohol", 100).toJson(),
		"result": Fluid.of("cmi:structural_plastic", 200).toJson()
	})

	// 结构玻璃
	thermal.bottler("mekanism:structural_glass", [
		Fluid.of("cmi:structural_plastic", 200),
		"ae2:quartz_glass"
	])
		.id("mekanism:structural_glass")

	// 轻芳烃
	event.custom({
		"type": "immersiveengineering:refinery",
		"catalyst": Ingredient.of("#forge:plates/vanadium").toJson(),
		"energy": 120,
		"input0": Fluid.tag("tag", "forge:naphtha", 100).toJson(),
		"input1": Fluid.tag("tag", "forge:acetaldehyde", 100).toJson(),
		"result": Fluid.of("cmi:light_aromatics", 100).toJson()
	})

	// 苯 乙烯
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

	// 三硝基甲苯溶液
	cmi.chemical_reactor()
		.inputFluids([
			Fluid.of("cmi:nitric_acid", 2000),
			Fluid.of("cmi:light_aromatics", 1000)
		])
		.outputFluids(Fluid.of("cmi:trinitrotoluene_solution", 1000))
		.inputFE(32 * (20 * 10))
		.duration(20 * 10)

	// 三硝基甲苯
	thermal.refinery([
		"cmi:trinitrotoluene"
	], [
		Fluid.of("cmi:trinitrotoluene_solution", 100)
	])

	thermal_extra.advanced_refinery([
		"2x cmi:trinitrotoluene"
	], [
		Fluid.of("cmi:trinitrotoluene_solution", 100)
	])
})
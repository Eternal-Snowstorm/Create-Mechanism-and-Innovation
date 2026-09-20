// priority: 11
ServerEvents.tags("fluid", (event) => {

	// 可用作火箭燃料
	removeTagAllId("ad_astra:fuel")
		.add("ad_astra:fuel")
		.add("ad_astra:cryo_fuel")

	// 月球车燃油
	removeTagAllId("ad_astra:tier_1_rover_fuel")
		.add("ad_astra:fuel")
		.add("#forge:biodiesel")
		.add("#forge:diesel")
		.add("#forge:gasoline")
		.add("#tconstruct:blazing_blood")

	// Ada燃油
	// 高效率燃油
	event.get("ad_astra:efficient_fuel")
		.removeAll()

	// T1
	event.get("ad_astra:tier_1_rocket_fuel")
		.removeAll()
		.add([
			"ad_astra:fuel",
			"neoecoae:cryotheum_solution"
		])

	// T2
	event.get("ad_astra:tier_2_rocket_fuel")
		.removeAll()
		.add([
			"neoecoae:cryotheum_solution"
		])

	// T3
	event.get("ad_astra:tier_3_rocket_fuel")
		.removeAll()

	// T4
	event.get("ad_astra:tier_4_rocket_fuel")
		.removeAll()

	// 机械动力无限流体
	event.get("create:bottomless/allow")
		.add("cmi:sea_water")

	// 安山合金材料
	event.get("cmi:andesite_alloy_material")
		.add("tconstruct:molten_zinc")
		.add("tconstruct:molten_iron")

	// 生铁原料
	event.get("cmi:pig_iron_material")
		.add("#tconstruct:meat_soup")
		.add("cmi:blood")

	// 电镀液
	event.get("cmi:plating_solution")
		.add("cmi:plating_solution")

	// Delta 不稳定溶液
	event.get("cmi:delta_unstable_solution")
		.add("cmi:delta_unstable_solution")

	// 苯
	event.get("cmi:benzene")
		.add("cmi:benzene")

	// 苯酚
	event.get("cmi:phenol")
		.add("cmi:phenol")

	// 轻烯烃
	event.get("cmi:light_olefin")
		.add("cmi:light_olefin")

	// 轻乙醛
	event.get("cmi:light_aldehyde")
		.add("cmi:light_aldehyde")

	// 乙炔
	event.get("cmi:acetylene")
		.add("cmi:acetylene")

	// 聚乙烯醇
	event.get("cmi:polyvinyl_alcohol")
		.add("cmi:polyvinyl_alcohol")

	// 废盐水
	event.get("cmi:waste_brine")
		.add("cmi:waste_brine")

	// 海水
	event.get("cmi:sea_water")
		.add("cmi:sea_water")

	// 匠魂流体燃料
	event.get("tconstruct:fuels")
		.add("#forge:oil")
		.add("ad_astra:cryo_fuel")
		.add("ad_astra:fuel")
		.add("cmi:delta_unstable_solution")
		.add("cmi:turbid_waste_liquid")
		.add("createdieselgenerators:biodiesel")
		.add("createdieselgenerators:diesel")
		.add("createdieselgenerators:gasoline")
		.add("createdieselgenerators:plant_oil")
		.add("immersiveengineering:ethanol")
		.add("tconstruct:blazing_blood")
		.add("thermal:refined_fuel")

	// 热力附加材料
	let thermalExtraMaterials = [
		"soul_infused",
		"shellite",
		"dragonsteel",
		"twinite",
		"abyssal"
	]
	thermalExtraMaterials.forEach((material) => {
		event.get(`tconstruct:molten_${material}`)
			.add(`thermalconstruct:molten_${material}`)
	})

	// 高温蒸汽
	event.get("forge:high_temperature_steam")
		.remove("minecraft:lava")

	// 柴油
	event.get("forge:diesel")
		.add("thermal_extra:diesel")

	// 油
	event.get("forge:oil")
		.add("#forge:crude_oil")

	// 盐水
	event.get("forge:brine")
		.add("cmi:brine")

	// 蒸汽
	event.get("forge:steam")
		.add("steampowered:steam")
		.add("mekanism:steam")

	// 柴油
	event.get("forge:diesel")
		.add("cmi:sulfric_diesel")

	// 煤油
	event.get("forge:kerosene")
		.add("cmi:kerosene")

	// 番茄酱
	event.get("forge:sauce/tomato")
		.add("create_central_kitchen:tomato_sauce")

	// 熔融生铁
	event.get("forge:molten_pig_iron")
		.add("#tconstruct:molten_pig_iron")

	// 颜料
	event.get("forge:dyes")
		.add("railways:paint")

	CmiGlobal.DYE_COLOR_GROUP.forEach((color) => {
		event.get(`forge:cements/${color}`)
			.add(`createdieselgenerators:${color}_cement`)
			.add(`createdieselgenerators:flowing_${color}_cement`)

		event.get("forge:cements")
			.add(`createdieselgenerators:${color}_cement`)
			.add(`createdieselgenerators:flowing_${color}_cement`)
	})

	// 水
	removeTagAllId("minecraft:water")
		.add("minecraft:water")
		.add("minecraft:flowing_water")

	/**
	 * 
	 * @param {Special.FluidTag} tag 
	 * @returns 
	 */
	function removeTagAllId(tag) {
		return event.get(tag)
			.removeAll()
	}
})
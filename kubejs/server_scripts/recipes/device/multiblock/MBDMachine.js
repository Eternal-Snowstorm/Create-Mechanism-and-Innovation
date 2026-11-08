ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, neoecoae } = event.getRecipes()

	// 高级焦炉
	kubejs.shaped("cmi:reinforced_coke_oven", [
		"AAA",
		"BMB",
		"CCC"
	], {
		A: "tconstruct:seared_bricks",
		B: "tconstruct:scorched_brick",
		C: "tconstruct:scorched_bricks",
		M: Mechanisms.NETHER.COM
	})

	// 橡胶提取器
	kubejs.shaped("cmi:improved_rubber_extractor", [
		"AAA",
		"ABA",
		"AAA"
	], {
		A: ["#forge:ingots/industrial_iron", "#forge:plates/industrial_iron"],
		B: "thermal:device_tree_extractor"
	})

	// 反应釜
	thermal_extra.component_assembly("cmi:chemical_reactor", [
		Casing.STEEL,
		Mechanisms.LIGHT.COM,
		"#forge:gears/invar",
		"create:whisk"
	])

	thermal_extra.component_assembly("cmi:reinforced_chemical_reactor", [
		"cmi:chemical_reactor",
		Mechanisms.HEAVY.COM,
		"create:blaze_burner"
	])

	// 三相电解机
	thermal_extra.component_assembly("cmi:electrolyzer", [
		Mechanisms.HEAVY.COM,
		Casing.STEEL,
		"#forge:plates/aluminum",
		"immersiveengineering:component_electronic_adv"
	])

	// 电力高炉
	neoecoae.integrated_working_station()
		.itemOutput("cmi:electronic_blast_furnace")
		.inputItems([
			Casing.STAINLESS_STEEL,
			"ae2:semi_dark_monitor",
			"ad_astra:etrionic_capacitor",
			Mechanisms.NETHER.COM,
			Mechanisms.BASIC.COM
		])
		.energy(2000)
})
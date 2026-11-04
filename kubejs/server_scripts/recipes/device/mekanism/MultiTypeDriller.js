// Mekanism · 多方块钻机（主机与轴承/钻头/流体泵/气体泵）
ServerEvents.recipes((event) => {
	let { thermal_extra, neoecoae } = event.getRecipes()

	// 多元钻探机
	addRecipe(neoecoae)
		.itemOutput("cmi:multi_type_driller")
		.inputItems([
			"cmi:airtight_casing",
			"ae2:semi_dark_monitor",
			"ad_astra:etrionic_capacitor",
			"cmi:basalz_general_component",
			Mechanisms.BASIC.COM
		])
		.energy(2000)

	addRecipe(neoecoae)
		.itemOutput("cmi:driller_bearing")
		.inputItems([
			"cmi:airtight_casing",
			"mekanismgenerators:turbine_rotor",
			Mechanisms.BASIC.COM
		])
		.energy(2000)

	addRecipe(neoecoae)
		.itemOutput("cmi:driller_head")
		.inputItems([
			"cmi:airtight_casing",
			"create_rns:mine_head",
			"4x #forge:gems/diamond",
			Mechanisms.BASIC.COM
		])
		.energy(2000)

	addRecipe(neoecoae)
		.itemOutput("cmi:driller_fluid_pump")
		.inputItems([
			"cmi:airtight_casing",
			"thermal:drill_head",
			Mechanisms.COPPER.COM,
			Mechanisms.BASIC.COM
		])
		.energy(2000)

	addRecipe(neoecoae)
		.itemOutput("cmi:driller_gas_pump")
		.inputItems([
			"cmi:airtight_casing",
			"thermal:drill_head",
			Mechanisms.AIR.COM,
			Mechanisms.BASIC.COM
		])
		.energy(2000)
})

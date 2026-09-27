StartupEvents.registry("mekanism:gas", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @param {MaterialColor} color 
	 * @returns 
	 */
	function addMekanismGas(name, color) {
		return event.create(`${Cmi.MODID}:${name}`)
			.color(color)
	}

	// 硝化甘油
	addMekanismGas("nitroglycerine", 0xFFFBD3)

	// 氡
	addMekanismGas("radon", 0x00FF00)

	// 氡混合物
	addMekanismGas("radon_mixture", 0x008F00)

	// 精炼核废料
	addMekanismGas("refined_nuke_waste", 0x7CFC00)

	// 汞
	addMekanismGas("mercury", 0xA9C0FF)

	// 汞混合物
	addMekanismGas("mercury_mixture", 0xD2A9FF)

	// 过热汞混合物
	addMekanismGas("overheated_mercury_mixture", 0xD2A9FF)

	// 氦-3
	addMekanismGas("helium_3", 0xFFB0BA)

	// 硅基气相调节器
	addMekanismGas("silicon_gas_modulator", 0x002C55)

	// 裂变铀复合物
	addMekanismGas("fissile_uranium_compound", 0x008000)

	// 高能裂变燃料
	addMekanismGas("high_energy_fission_fuel", 0x00294E)

	// 中和钕泥浆
	addMekanismGas("neutralized_neodymium_slurry", 0x6549B0)

	// 钛氧化物
	addMekanismGas("titanium_oxide", 0x60459E)

	// 放射性混合物
	addMekanismGas("radioactive_mixture", 0x0D3A59)

	// 钚混合物
	addMekanismGas("plutonium_mixture", 0x50A6AE)

	// 核废料
	addMekanismGas("nuke_waste", 0x4F412A)

	// 用尽的核废料
	addMekanismGas("spent_nuke_waste", 0x262015)

	// 氢氧燃料
	addMekanismGas("hydrogen_oxygen_fuel", 0x9CDCF7)

	// 天然气
	addMekanismGas("natural_gas", 0xA7DDE7)

	// 轻烯烃
	addMekanismGas("light_olefin", 0x6FEAFF)

	// 甲烷
	addMekanismGas("methane", 0xDBDBDB)

	// 氮氧化物
	addMekanismGas("nitrogen_oxide", 0x82502F)
})
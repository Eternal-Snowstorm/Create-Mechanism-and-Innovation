StartupEvents.registry("fluid", (event) => {
	/**
	  * 
	  * @param {string} name 
	  * @returns 
	  */
	function addAloneFluid(name) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.flowingTexture(Cmi.loadResource(`fluid/${name}/flow`))
		builder.stillTexture(Cmi.loadResource(`fluid/${name}/still`))
		builder.renderType("translucent")
		builder.bucketItem.modelJson(setFluidBucketModel(name))

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @param {MaterialColor} color 
	 * @returns 
	 */
	function addColorFluid(name, color) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.color(color)
		builder.bucketColor(color)
		builder.flowingTexture(Cmi.loadResource("fluid/chemical/flow"))
		builder.stillTexture(Cmi.loadResource("fluid/chemical/still"))
		builder.translucent()
		builder.bucketItem.modelJson(setFluidBucketModel(name))

		return builder
	}

	// 晶体催生剂
	addColorFluid("crystal_catalyt", 0x90EE90)

	// 盐酸
	addAloneFluid("hydrochloric_acid")

	// 海水
	addAloneFluid("sea_water")

	// 浓缩海水
	addAloneFluid("concentrated_sea_water")

	// 含锂电解液
	addColorFluid("lithium_containing_electrolyte", 0x555100)

	// 硝酸
	addColorFluid("nitric_acid", 0xD6B000)

	// 卤水
	addColorFluid("brine", 0xA3A189)

	// 碱性卤水
	addColorFluid("alkaline_brine", 0x8FA8A4)

	// 废卤水
	addColorFluid("waste_brine", 0x3C3C3C)

	// 铂溶液
	addColorFluid("platinum_solution", 0xE1FFFF)

	// 铬溶液
	addColorFluid("chromium_solution", 0x98D9D9)

	// 钛溶液
	addColorFluid("titanium_solution", 0xE2B1E3)

	// 钴溶液
	addColorFluid("cobalt_solution", 0x2375DA)

	// 电镀液
	addColorFluid("plating_solution", 0x55AAAA)

	// 锗溶液
	addColorFluid("germanium_solution", 0xCEB58B)

	// 钕溶液
	addColorFluid("neodymium_solution", 0xC900FF)

	// 酸性溶液
	addColorFluid("acidity_solution", 0xFF00EE)

	// 抗辐射精炼液
	addColorFluid("radiation_resistant_creosote", 0x8b2929)

	// 熔融钕混合物
	addColorFluid("molten_neodymium_mixture", 0xC800FF)

	// 熔融含硅化合物
	addColorFluid("molten_silicon_containing_compound", 0x4D4D4D)

	// 熔融电离恩特罗
	addColorFluid("molten_ionized_entro", 0x009556)

	// 恩特罗电离液
	addColorFluid("ionized_entro_solution", 0x00C874)

	// 复合磁流体
	addColorFluid("composite_magnetic_fluid", 0x6549B0)

	// 液晶态恩特罗
	addColorFluid("liquid_crystal_entro", 0x9CFF00)

	// 液晶态埃忒恩
	addColorFluid("liquid_crystal_etrium", 0x58ECCD)

	// 晶态恩特罗溶液
	addColorFluid("crystal_entro_solution", 0x81B34A)

	// 过氧化恩特罗溶液
	addColorFluid("entro_peroxide_solution", 0x62E3D1)

	// 含钋电解液
	addColorFluid("polonium_containing_electrolyte", 0x399E7D)

	// 含钚电解液
	addColorFluid("plutonium_containing_electrolyte", 0x3C8A97)

	// 钋溶液
	addColorFluid("polonium_solution", 0xAEECC5)

	// 含钋溶液
	addColorFluid("polonium_containing_solution", 0x9BE9B8)

	// 含钚溶液
	addColorFluid("plutonium_containing_solution", 0x86E2FD)

	// 钚萃取液
	addColorFluid("plutonium_extract_solution", 0x9DEFF1)

	// 放射性酸溶液
	addColorFluid("radioactive_acid_solution", 0x052A0B)

	// 复制酶溶液
	addColorFluid("copy_enzyme_solution", 0xBE8BB0)

	// 固化幻晶
	addColorFluid("dreamcore_solidified", 0xE8AEFF)

})
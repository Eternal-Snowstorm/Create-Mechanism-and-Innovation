StartupEvents.registry("fluid", (event) => {
	/**
	 * 
	 * @param {string} name 注册id
	 * @returns 
	 */
	function addAloneFluid(name) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.flowingTexture(Cmi.loadResource(`fluid/${name}/flow`))
		builder.stillTexture(Cmi.loadResource(`fluid/${name}/still`))
		builder.renderType("translucent")
		builder.bucketItem.modelJson(setFluidBucketModel(name))

		console.log(`${Cmi.MODID}:${name}已注册!`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 注册id
	 * @param {MaterialColor} color 着色色号
	 * @returns 
	 */
	function addThickColorFluid(name, color) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.thinTexture(color)
		builder.bucketColor(color)
		builder.flowingTexture(Cmi.loadResource("fluid/metal/flow"))
		builder.stillTexture(Cmi.loadResource("fluid/metal/still"))
		builder.renderType("translucent")
		builder.bucketItem.modelJson(setFluidBucketModel(name))

		return builder
	}

	/**
	 * 
	 * @param {string} name 注册id
	 * @param {Color_} color 着色色号
	 * @returns 
	 */
	function addColorFluid(name, color) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.thinTexture(color)
		builder.bucketColor(color)
		builder.flowingTexture(Cmi.loadResource("fluid/chemical/flow"))
		builder.stillTexture(Cmi.loadResource("fluid/chemical/still"))
		builder.renderType("translucent")
		builder.bucketItem.modelJson(setFluidBucketModel(name))

		return builder
	}

	// 三硝基甲苯溶液
	addColorFluid("trinitrotoluene_solution", 0xFFEFA8)
	// 氡
	addColorFluid("radon", 0x00FF00)
	// 汞
	addColorFluid("mercury", 0xA9C0FF)
	// HDPE
	addColorFluid("hdpe", 0x564A6A)
	// 水晶蚀刻溶液
	addColorFluid("crystal_etching_solution", 0x364700)
	// 蓝宝石溶液
	addColorFluid("sapphire_solution", 0x004BFF)
	// 粗钛溶液
	addColorFluid("raw_titanium_solution", 0x813DFA)
	// 强化钛溶液
	addColorFluid("reinforced_titanium_solution", 0x6D26A5)
	// 纯净晶源
	addColorFluid("pure_crystal_source", 0xA40058)
	// 氦
	addColorFluid("helium", 0xFFB0BA)
	// 聚合碳溶液
	addColorFluid("polymeric_carbon_solution", 0x202020)
	// 活性石墨
	addColorFluid("activated_graphite", 0x200000)
	// 钨溶液
	addColorFluid("tungsten_solution", 0x283440)
	// 硅橡胶
	addThickColorFluid("silicon_rubber", 0xBBBBBB)
	// 熔融纯净硅
	addThickColorFluid("molten_pure_silicon", 0x182431)
	// 半熔融锇
	addThickColorFluid("semi_molten_osmium", 0xA6CCF2)
	// 沥青
	addAloneFluid("bitumen")
	// 油页岩蒸汽
	addAloneFluid("oil_shale_steam")
		.noBlock()
		.gaseous()
	// 血液
	addAloneFluid("blood")
	// 淤泥悬浮液
	addAloneFluid("sludge_suspension")
	// 硫化橡胶
	addAloneFluid("cured_rubber")
		.noBlock()
	// 溴
	addAloneFluid("bromine")
	// Delta 型不稳定溶液
	addAloneFluid("delta_unstable_solution")
	// 污浊废液
	addAloneFluid("turbid_waste_liquid")
	// 纯净沙
	addAloneFluid("pure_sand")
	// 极寒之凛冰
	addAloneFluid("glacious_cryotheum")
})
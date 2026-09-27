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
		builder.translucent()
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
		builder.flowingTexture(Cmi.loadResource("fluid/organic/flow"))
		builder.stillTexture(Cmi.loadResource("fluid/organic/still"))
		builder.translucent()
		builder.bucketItem.modelJson(setFluidBucketModel(name))

		return builder
	}

	// 醋
	addColorFluid("vinegar", 0xFAF3E0)

	// 煤油
	addColorFluid("kerosene", 0xFF6F6F)

	// 含硫柴油
	addColorFluid("sulfric_diesel", 0xFFDA69)

	// 裂化汽油
	addColorFluid("cracked_gasoline", 0xFF6F6F)

	// 裂化柴油
	addColorFluid("cracked_diesel", 0xDDCCBB)

	// 裂化润滑油
	addColorFluid("cracked_lubricating_oil", 0xFFFF99)

	// 乙炔
	addColorFluid("acetylene", 0xDADEDF)

	// 乙烯醇
	addColorFluid("vinyl_alcohol", 0x9988AA)

	// 醋酸
	addColorFluid("vinegar_acid", 0xE7FFF3)

	// 轻烯烃
	addColorFluid("light_olefin", 0x6FEAFF)

	// 苯
	addColorFluid("benzene", 0xFFF4AD)

	// 轻醛烃
	addColorFluid("light_aldehyde", 0xAACCFF)

	// 轻芳烃
	addColorFluid("light_aromatics", 0xEEDD66)

	// 轻硅醚
	addColorFluid("light_silicone_ether", 0xD4CFE8)

	// 苯酚
	addColorFluid("phenol", 0xFFD46F)

	// 聚乙烯醇
	addColorFluid("polyvinyl_alcohol", 0x887799)

	// 聚硅醚
	addColorFluid("polysilicone_ether", 0xB0A8D1)

	// 结构塑胶
	addColorFluid("structural_plastic", 0xAABBEE)

	// 三硝基甲苯溶液
	addColorFluid("fluid_nitroglycerine", 0xFFFBD3)

	// 富铁粘液
	addColorFluid("ferrouslime", 0x5b6463)

	// 光合反应液
	addColorFluid("photosyn_fluid", 0x00FA9A)

	// 甲烷燃油
	addColorFluid("methane_fuel", 0xDBDBDB)

	// 轻胺烃
	addColorFluid("light_amine", 0xFFA63F)

	// 氮氧化物
	addColorFluid("nitrogen_oxide", 0x82502F)

	// 联氨
	addColorFluid("hydrazines", 0x8C7050)

	// 联氨燃油
	addColorFluid("hydrazines_fuel", 0x845520)
})
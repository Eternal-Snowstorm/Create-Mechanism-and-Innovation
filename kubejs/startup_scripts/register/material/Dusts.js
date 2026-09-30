StartupEvents.registry("item", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @param {Color} color 
	 * @returns 
	 */
	function addColorDustItem(name, color) {
		let builder = event.create(`${Cmi.MODID}:${name}_dust`)

		builder.texture(Cmi.loadResource(`item/material/color/dust/dust`))
		builder.color(0, color)
		builder.tag("forge:dusts")
		builder.tag(`forge:dusts/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @param {string} type 
	 * @returns 
	 */
	function addNamedDustItem(name, type) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/dust/${type}`))
		builder.tag("forge:dusts")
		builder.tag(`forge:dusts/${type}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addAloneDustItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}_dust`)

		builder.texture(Cmi.loadResource(`item/material/material/dust/${name}`))
		builder.tag("forge:dusts")
		builder.tag(`forge:dusts/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addNonDustItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/dust/${name}`))

		return builder
	}

	// 末地石粉
	addColorDustItem("end_stone", 0xF6FABD)
	// 橡胶粉
	addColorDustItem("rubber", 0xECEBD6)
	// 皓蓝石粉
	addColorDustItem("asurine", 0x4e73ea)
	// 绯红岩粉
	addColorDustItem("crimsite", 0xbb3c26)
	// 赭金沙粉
	addColorDustItem("ochrum", 0x9b8005)
	// 辉绿岩粉
	addColorDustItem("veridium", 0x049146)
	// 粗钨粉
	addColorDustItem("raw_tungsten", 0x2B353F)

	// 安山岩粉
	addAloneDustItem("andesite")
	// 方解石粉
	addAloneDustItem("calcite")
	// 石灰粉
	addAloneDustItem("lime")
	// 油页岩粉
	addAloneDustItem("oil_shale")
	// 矿藏粉
	addAloneDustItem("deposit")
	// 虚空粉
	addAloneDustItem("void")
	// 混沌虚空粉
	addAloneDustItem("chaotic_void")
	// 方铅岩粉
	addAloneDustItem("galena")
	// 燕雀石粉
	addAloneDustItem("machalite")
	// 辉龙石粉
	addAloneDustItem("dragonite")
	// 过氧化恩特罗粉
	addAloneDustItem("entro_peroxide")
	// 还原恩特罗粉
	addAloneDustItem("reduced_entro")
	// 金星岩粉
	addAloneDustItem("venus_stone")

	// 金坷垃
	addNamedDustItem("fertilizer","fertilizer")

	// 纯净蓝宝石化合物
	addNonDustItem("pure_sapphire_compound")
	// 赤泥
	addNonDustItem("red_mud")
	// 热解月岩残渣
	addNonDustItem("pyrolyzed_moon_rock_residue")
	// 致密氧化物薄膜
	addNonDustItem("dense_oxide_film")
	// 电离红色沙尘
	addNonDustItem("ionized_red_dust")
	// 酸洗水星岩
	addNonDustItem("acid_washed_mercury_rock")
	// 耐火材料粉
	addNonDustItem("refractory_material_powder")
	// 粗钛混合物
	addNonDustItem("raw_titanium_mixture")
	// 钨混合物
	addNonDustItem("tungsten_mixture")
	// 钨反应物
	addNonDustItem("tungsten_reactant")
	// 锗混合物
	addNonDustItem("germanium_mixture")
	// 钕混合物
	addNonDustItem("neodymium_mixture")
	// 埃特恩混合物
	addNonDustItem("etrium_mixture")
	// 恩特罗化合物
	addNonDustItem("entro_compound")
	// 恩特罗氧化剂
	addNonDustItem("entro_oxidizer")
	// 碱性钕沉淀
	addNonDustItem("alkaline_neodymium_sediment")
	// 磁性沉淀
	addNonDustItem("magnetic_sediment")
	// 钠还原剂
	addNonDustItem("sodium_reducing_agent")
	// 三硝基甲苯
	addNonDustItem("trinitrotoluene")
	// 硝化纤维
	addNonDustItem("nitrocellulose")
	// 生石灰
	addNonDustItem("furnaced_lime")
	// 草木灰
	addNonDustItem("plant_ash").tag("forge:plant_ash")
})
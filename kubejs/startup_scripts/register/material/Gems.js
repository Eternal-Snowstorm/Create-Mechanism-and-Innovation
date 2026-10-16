StartupEvents.registry("item", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addAloneGemItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/gem/${name}`))
		builder.tag("forge:gems")
		builder.tag(`forge:gems/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @param {string} type 
	 * @returns 
	 */
	function addNamedGemItem(name, type) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/gem/${type}`))
		builder.tag("forge:gems")
		builder.tag(`forge:gems/${type}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addNonGemItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/gem/${name}`))

		return builder
	}

	// 充能紫水晶
	addAloneGemItem("charged_amethyst")
	// 单晶硅
	addAloneGemItem("single_crystal_silicon")
	// 红源晶
	addAloneGemItem("source_ruby")
	// 蓝源晶
	addAloneGemItem("source_sapphire")
	// 绿源晶
	addAloneGemItem("source_emeraid")

	// 恩特罗水晶
	addNamedGemItem("entro_crystal", "entro")
		.texture("expatternprovider:item/entro_crystal")

	// 黑石源质阿尔法
	addNonGemItem("alpha_blackstone_source")
	// 黑石源质贝塔
	addNonGemItem("beta_blackstone_source")
	// 黑石源质伽玛
	addNonGemItem("gamma_blackstone_source")
	// 黑石源质德尔塔
	addNonGemItem("delta_blackstone_source")
	// 灌注锇
	addNonGemItem("infuse_osmium")
	// 富集锇晶体
	addNonGemItem("enriched_osmium_crystal")
	// 富集硅
	addNonGemItem("enriched_silicon")
	// 锗晶体
	addNonGemItem("germanium_crystal")
	// 钴电解质
	addNonGemItem("cobalt_electrolyte")
	// 磁性源质
	addNonGemItem("magnetic_source")
	// 精晶原石
	addNonGemItem("spiritcore_ore")
	// 纯净晶源
	addNonGemItem("pure_source")
	// 富集锗铁混合物
	addNonGemItem("enriched_germanium_iron_mixture")
	// 还原恩特罗水晶
	addNonGemItem("reduced_entro_crystal")
	// 过氧化恩特罗水晶
	addNonGemItem("entro_peroxide_crystal")
	// 过氧化埃忒恩
	addNonGemItem("etrium_peroxide_crystal")
	// 燕雀石
	addNonGemItem("machalite")
	// 辉龙石
	addNonGemItem("dragonite")

})
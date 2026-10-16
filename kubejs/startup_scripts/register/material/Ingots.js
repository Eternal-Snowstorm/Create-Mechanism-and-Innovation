StartupEvents.registry("item", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @param {Color} color 
	 * @returns 
	 */
	function addColorIngotItem(name, color) {
		let builder = event.create(`${Cmi.MODID}:${name}_ingot`)

		builder.texture(Cmi.loadResource(`item/material/color/ingot/ingot`))
		builder.color(0, color)
		builder.tag("forge:ingots")
		builder.tag(`forge:ingots/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addIngotItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/ingot/${name}`))
		builder.tag("forge:ingots")
		builder.tag(`forge:ingots/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @param {string} type 
	 * @returns 
	 */
	function addNamedIngotItem(name, type) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/ingot/${type}`))
		builder.tag("forge:ingots")
		builder.tag(`forge:ingots/${type}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addAloneIngotItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}_ingot`)

		builder.texture(Cmi.loadResource(`item/material/material/ingot/${name}`))
		builder.tag("forge:ingots")
		builder.tag(`forge:ingots/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addNonIngotItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/ingot/${name}`))

		return builder
	}

	// 磁性合金
	addIngotItem("magnetic_alloy")
	// 聚合催化合金
	addIngotItem("polymerization_catalytic_alloy")
	// 沉积催化合金
	addIngotItem("deposition_catalytic_alloy")

	// 超载合金锭
	addAloneIngotItem("overcharged_alloy")
		.rarity("epic")
	// 活化石墨锭
	addAloneIngotItem("activated_graphite")

	// 精炼铁方坯
	addNonIngotItem("refined_iron_bloom")
	// 半熔融锇
	addNonIngotItem("pure_semi_molten_osmium")
	// 碳化硅
	addNonIngotItem("silicon_carbide")
	// 压电陶瓷
	addNonIngotItem("piezoelectric_ceramic")
	// 富集合金
	addNonIngotItem("enriched_alloy")
		.rarity("extra_green")
		.tag("forge:alloys")
		.tag("forge:alloys/enriched")
		.tag("mekanism:alloys")
		.tag("mekanism:alloys/enriched")
	// 恩特罗合金
	addNonIngotItem("entro_alloy")
		.texture("expatternprovider:item/entro_ingot")
		.tag("forge:alloys")
		.tag("forge:alloys/entro")
	// 电离中和红石
	addNonIngotItem("electrolized_redstone")
})
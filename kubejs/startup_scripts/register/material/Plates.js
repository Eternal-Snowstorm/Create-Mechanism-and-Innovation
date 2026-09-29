StartupEvents.registry("item", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @param {Color} color 
	 * @returns 
	 */
	function addColorPlateItem(name, color) {
		let builder = event.create(`${Cmi.MODID}:${name}_plate`)

		builder.texture(`${Cmi.MODID}:item/material/color/plate/plate`)
		builder.color(0, color)
		builder.tag("forge:plates")
		builder.tag(`forge:plates/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @param {string} type 
	 * @returns 
	 */
	function addNamedPlateItem(name, type) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(`${Cmi.MODID}:item/material/material/plate/${type}`)
		builder.tag("forge:plates")
		builder.tag(`forge:plates/${type}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addAlonePlateItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}_plate`)

		builder.texture(Cmi.loadResource(`item/material/material/plate/${name}`))
		builder.tag("forge:plates")
		builder.tag(`forge:plates/${name}`)

		return builder
	}

	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addNonPlateItem(name) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.texture(Cmi.loadResource(`item/material/material/plate/${name}`))

		return builder
	}

	// 石板
	addAlonePlateItem("stone")
	// 橡胶板
	addAlonePlateItem("rubber")
	// 碳化硅板
	addAlonePlateItem("silicon_carbide")
	// 硅橡胶板
	addAlonePlateItem("silicon_rubber")
	// 复合钨钢板
	addAlonePlateItem("composite_tungsten_steel")
	// 强化复合板
	addAlonePlateItem("composite_carbon_fiber")
	// 复合磁导板
	addAlonePlateItem("composite_magnetic_conduction")
	// 纳米复合板
	addAlonePlateItem("nano_composite")
	// 乙烯聚合催化片
	addAlonePlateItem("ethylene_polymerization_catalytic")
	// 碳沉积催化片
	addAlonePlateItem("carbon_deposition_catalytic")
	// 碳聚合催化片
	addAlonePlateItem("carbon_polymerization_catalytic")

	// 致密坚固板
	addNamedPlateItem("dense_sturdy_sheet", "dense_obsidian")

	// 线刻硅板
	addNonPlateItem("inscribed_silicon")
	// 阻燃塑料
	addNonPlateItem("flame_retardant_plastic")
	// 石墨烯
	addNonPlateItem("graphene")
})
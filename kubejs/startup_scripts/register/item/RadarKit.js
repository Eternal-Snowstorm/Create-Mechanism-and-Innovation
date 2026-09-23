StartupEvents.registry("item", (event) => {
	/**
	 * @param {string} name 注册ID
	 * @param {string} type 注册类型
	 * @returns 
	 */
	function addItem(name, type) {
		if (type === undefined) {
			return event.create(`${Cmi.MODID}:${name}`)
		}
		return event.create(`${Cmi.MODID}:${name}`, type)
	}

	// 火箭零件
	for (let i = 1; i <= 4; i++) {
		addItem(`tier_${i}_rocket_nose_cone`)
			.texture(Cmi.loadResource(`item/material/rocket_nose_cone/${i}`))
			.tag(`${Cmi.MODID}:rocket_nose_cones/tier_${i}`)
			.tag(`${Cmi.MODID}:rocket_nose_cones`)

		addItem(`tier_${i}_rocket_fin`)
			.texture(Cmi.loadResource(`item/material/rocket_fin/${i}`))
			.tag(`${Cmi.MODID}:rocket_fins/tier_${i}`)
			.tag(`${Cmi.MODID}:rocket_fins`)

		addItem(`tier_${i}_rocket_body`)
			.texture(Cmi.loadResource(`item/material/rocket_body/${i}`))
			.tag(`${Cmi.MODID}:rocket_bodies/tier_${i}`)
			.tag(`${Cmi.MODID}:rocket_bodies`)
	}

	//电源
	addItem("power_supply_repair_kit")
		.texture(Cmi.loadResource("item/space/power"))

	//变压
	addItem("transformer_repair_kit")
		.texture(Cmi.loadResource("item/space/trans"))

	//追踪
	addItem("tracker_repair_kit")
		.texture(Cmi.loadResource("item/space/track"))

	// 调制解调器
	addItem(`modem_repair_kit`)
		.texture(Cmi.loadResource("item/space/modem"))

	// 雷达
	addItem("radar_repair_kit")
		.texture(Cmi.loadResource("item/space/radar"))
})
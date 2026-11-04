// Thermal · 无动力装置（采树/捕鱼/造水/堆肥/造石/收集/经验凝结/销毁/药水扩散/蜂巢提取）
ServerEvents.recipes((event) => {
	let { thermal_extra, create, thermal, kubejs } = event.recipes

	// 树脂提取
	verticalDevice(kubejs, "thermal:device_tree_extractor", "thermal:device_tree_extractor", {
		M: Mechanisms.COPPER.COM,
		C: Casing.ANDESITE,
		X: "treetap:tap"
	})

	// 水产捕捞
	verticalDevice(kubejs, "thermal:device_fisher", "thermal:device_fisher", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "minecraft:fishing_rod"
	})

	// 蓄水器
	verticalDevice(kubejs, "thermal:device_water_gen", "thermal:device_water_gen", {
		M: Mechanisms.COPPER.COM,
		C: Casing.COPPER,
		X: "minecraft:bucket"
	})

	// 堆肥桶
	verticalDevice(kubejs, "thermal:device_composter", "thermal:device_composter", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "minecraft:composter"
	})

	// 造石机
	verticalDevice(kubejs, "thermal:device_rock_gen", "thermal:device_rock_gen", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "minecraft:piston"
	})

	// 真空漏斗
	verticalDevice(kubejs, "thermal:device_collector", "thermal:device_collector", {
		M: Mechanisms.ENDER.COM,
		C: Casing.THERMAL,
		X: "minecraft:hopper"
	})

	// 经验聚集
	verticalDevice(kubejs, "thermal:device_xp_condenser", "thermal:device_xp_condenser", {
		M: Mechanisms.ENCHANTED.COM,
		C: Casing.THERMAL,
		X: "thermal:xp_crystal"
	})

	// 销毁器
	verticalDevice(kubejs, "thermal:device_nullifier", "thermal:device_nullifier", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "minecraft:lava_bucket"
	})

	// 药水雾化
	verticalDevice(kubejs, "thermal:device_potion_diffuser", "thermal:device_potion_diffuser", {
		M: Mechanisms.ENCHANTED.COM,
		C: Casing.THERMAL,
		X: Mechanisms.POTION.COM
	})

	//蜂箱漏斗
	verticalDevice(kubejs, "thermal:device_hive_extractor", "thermal:device_hive_extractor", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "minecraft:shears",
	})
})

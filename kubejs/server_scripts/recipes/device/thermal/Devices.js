ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra } = event.getRecipes()

	// 树脂提取
	verticalDevice(kubejs, "thermal:device_tree_extractor", "thermal:device_tree_extractor", {
		A: Mechanisms.COPPER.COM,
		B: Casing.ANDESITE,
		C: "treetap:tap"
	})

	// 水产捕捞
	verticalDevice(kubejs, "thermal:device_fisher", "thermal:device_fisher", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "minecraft:fishing_rod"
	})

	// 蓄水器
	verticalDevice(kubejs, "thermal:device_water_gen", "thermal:device_water_gen", {
		A: Mechanisms.COPPER.COM,
		B: Casing.COPPER,
		C: "minecraft:bucket"
	})

	// 堆肥桶
	verticalDevice(kubejs, "thermal:device_composter", "thermal:device_composter", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "minecraft:composter"
	})

	// 造石机
	verticalDevice(kubejs, "thermal:device_rock_gen", "thermal:device_rock_gen", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "minecraft:piston"
	})

	// 真空漏斗
	verticalDevice(kubejs, "thermal:device_collector", "thermal:device_collector", {
		A: Mechanisms.ENDER.COM,
		B: Casing.THERMAL,
		C: "minecraft:hopper"
	})

	// 经验聚集
	verticalDevice(kubejs, "thermal:device_xp_condenser", "thermal:device_xp_condenser", {
		A: Mechanisms.ENCHANTED.COM,
		B: Casing.THERMAL,
		C: "thermal:xp_crystal"
	})

	// 销毁器
	verticalDevice(kubejs, "thermal:device_nullifier", "thermal:device_nullifier", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "minecraft:lava_bucket"
	})

	// 药水雾化
	verticalDevice(kubejs, "thermal:device_potion_diffuser", "thermal:device_potion_diffuser", {
		A: Mechanisms.ENCHANTED.COM,
		B: Casing.THERMAL,
		C: Mechanisms.POTION.COM
	})

	//蜂箱漏斗
	verticalDevice(kubejs, "thermal:device_hive_extractor", "thermal:device_hive_extractor", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "minecraft:shears",
	})
})
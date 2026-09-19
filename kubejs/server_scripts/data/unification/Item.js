ServerEvents.highPriorityData((event) => {
	// 焦煤
	addUnification("coal_coke", [
		"#forge:coal_coke"
	], "thermal:coal_coke")

	// 硫磺
	addUnification("sulfur", [
		"#forge:gems/sulfur"
	], "thermal:sulfur")

	// 硝酸盐
	addUnification("niter_dust", [
		"#forge:dusts/niter"
	], "thermal:niter_dust")

	// 电容
	addUnification("capacitor", [
		"createaddition:capacitor"
	], "cmi:simple_battery")

	// 石英粉
	addUnification("quartz_dust", [
		"#forge:dusts/quartz"
	], "thermal:quartz_dust")

	// 青金石粉
	addUnification("lapis_dust", [
		"#forge:dusts/lapis"
	], "thermal:lapis_dust")

	// 绿宝石粉
	addUnification("emerald_dust", [
		"#forge:dusts/emerald"
	], "thermal:emerald_dust")

	// 钻石粉
	addUnification("diamond_dust", [
		"#forge:dusts/diamond"
	], "thermal:diamond_dust")

	// 硫粉
	addUnification("sulfur_dust", [
		"#forge:dusts/sulfur"
	], "thermal:sulfur_dust")

	// 黑曜石粉
	addUnification("obsidian_dust", [
		"#forge:dusts/obsidian"
	], "create:powdered_obsidian")

	// 矿渣
	addUnification("slag", [
		"#forge:slag"
	], "thermal:slag")

	// 番茄
	addUnification("tomato", [
		"#forge:vegetables/tomato"
	], "kaleidoscope_cookery:tomato")

	// 稻米
	addUnification("rice", [
		"#forge:seeds/rice"
	], "kaleidoscope_cookery:rice")

	// 稻穗
	addUnification("rice_panicle", [
		"farmersdelight:rice_panicle"
	], "kaleidoscope_cookery:rice_panicle")

	// 火箭尾鳍
	addUnification("rocket_fin", [
		"ad_astra:rocket_fin"
	], "cmi:tier_1_rocket_fin")

	// 火箭鼻锥
	addUnification("rocket_nose_cone", [
		"ad_astra:rocket_nose_cone"
	], "cmi:tier_1_rocket_nose_cone")

	// 板冲压模板
	addUnification("plate_mold", [
		"immersiveengineering:mold_plate"
	], "cmi:plate_mold")

	// 齿轮冲压模板
	addUnification("gear_mold_ie", [
		"immersiveengineering:mold_gear"
	], "cmi:gear_mold")

	addUnification("gear_mold_th", [
		"thermal:press_gear_die"
	], "cmi:gear_mold")

	// 杆冲压模板
	addUnification("rod_mold", [
		"immersiveengineering:mold_rod",
		"thermal_extra:press_rod_die"
	], "cmi:rod_mold")

	// 线冲压模板
	addUnification("wire_mold", [
		"immersiveengineering:mold_wire"
	], "cmi:wire_mold")

	// 币冲压模板
	addUnification("coin_mold", [
		"thermal:press_coin_die"
	], "cmi:coin_mold")

	// 子弹冲压模板
	addUnification("bullet_mold", [
		"immersiveengineering:mold_bullet_casing"
	], "cmi:bullet_mold")

	// 2x2打包模板
	addUnification("2x2_packing_mold_ie", [
		"immersiveengineering:mold_packing_4"
	], "cmi:2x2_packing_mold")

	addUnification("2x2_packing_mold_th", [
		"thermal:press_packing_2x2_die"
	], "cmi:2x2_packing_mold")

	// 3x3打包模板
	addUnification("3x3_packing_mold_ie", [
		"immersiveengineering:mold_packing_9"
	], "cmi:3x3_packing_mold")

	addUnification("3x3_packing_mold_th", [
		"thermal:press_packing_3x3_die"
	], "cmi:3x3_packing_mold")

	// 解包模板
	addUnification("unpack_mold_ie", [
		"immersiveengineering:mold_unpacking"
	], "cmi:unpack_mold")

	addUnification("unpack_mold_th", [
		"thermal:press_unpacking_die"
	], "cmi:unpack_mold")

	// 木屑
	addUnification("wood_dust", [
		"#forge:dusts/wood"
	], "createdieselgenerators:wood_chip")

	// 共振紫水晶
	addUnification("charged_amethyst", [
		"#forge:gems/charged_amethyst"
	], "cmi:charged_amethyst")

	// 抽屉升级
	addUnification("drawer_upgrade_t1", [
		"functionalstorage:copper_upgrade"
	], "cmi:amethyst_bronze_upgrade")

	addUnification("drawer_upgrade_t2", [
		"functionalstorage:gold_upgrade"
	], "cmi:rose_gold_upgrade")

	addUnification("drawer_upgrade_t3", [
		"functionalstorage:diamond_upgrade"
	], "cmi:steel_upgrade")

	addUnification("drawer_upgrade_t4", [
		"functionalstorage:netherite_upgrade"
	], "cmi:hepatizon_upgrade")

	/**
	 * 
	 * @param {string} name
	 * @param {Special.Item | Special.ItemTags | (Special.Item | Special.ItemTags)[]} items
	 * @param {Special.Item} result
	 */
	function addUnification(name, items, result) {
		if (items === null) {
			console.error(`Items ${items} cannot be null`)
		}

		if (result === null) {
			console.error(`Result ${result} cannot be null`)
		}

		let itemUnification = [
			{
				matchItems: items,
				resultItems: result
			}
		]

		event.addJson(`oei:replacements/${name}.json`, itemUnification)
	}
})
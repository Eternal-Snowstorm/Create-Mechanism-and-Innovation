ServerEvents.highPriorityData((event) => {
	// 焦煤
	addUnification("coal_coke", [
		"#forge:coal_coke"
	], "thermal:coal_coke")

	// 电容
	addUnification("capacitor", [
		"createaddition:capacitor"
	], "cmi:simple_battery")

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
		"#forge:seeds/rice",
		"thermal:rice"
	], "farmersdelight:rice")

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

	// 蒸汽构件
	addUnification("steam_mechanism", [
		"steam_letters:steam_mechanism"
	], "cmi:bronze_mechanism")

	// 并行
	addUnification("2_parallel", [
		"thermal_parallel:argument_parallel"
	], "cmi:2_parallel_upgrade")

	addUnification("4_parallel", [
		"thermal_parallel:argument_parallel_2"
	], "cmi:4_parallel_upgrade")

	addUnification("16_parallel", [
		"thermal_parallel:argument_parallel_3"
	], "cmi:16_parallel_upgrade")

	// TODO: 热力农业的物品/方块需要统一

	/**
	 * 
	 * @param {string} name
	 * @param {Special.Item | Special.ItemTags | (Special.Item | Special.ItemTags)[]} from
	 * @param {Special.Item} to
	 */
	function addUnification(name, from, to) {
		if (from === null) {
			console.error(`Items ${from} cannot be null`)
			return
		}

		if (to === null) {
			console.error(`Result ${to} cannot be null`)
			return
		}

		let itemUnification = [
			{
				matchItems: from,
				resultItems: to
			}
		]

		event.addJson(`oei:replacements/${name}.json`, itemUnification)
	}
})
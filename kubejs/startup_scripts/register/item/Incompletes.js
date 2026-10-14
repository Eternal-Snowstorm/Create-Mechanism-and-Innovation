StartupEvents.registry("item", (event) => {
	/**
	 * 创建半成品物品
	 * @param {string} name 注册ID
	 * @param {boolean} [sequenced=true] 是否为序列装配物品
	 * @returns {Internal.BasicItemJS$Builder_ | Internal.SequencedAssemblyItemBuilder_}
	 */
	function addItem(name, sequenced) {
		sequenced = sequenced ?? true
		let type = sequenced ? "create:sequenced_assembly" : "basic"
		
		return event.create(`${Cmi.MODID}:incomplete_${name}`, type)
			.tag(Cmi.loadResource("incomplete_items"))
	}

	/**
	 * 创建带默认材质的半成品物品
	 * @param {string} name 注册ID
	 * @returns {Internal.ItemBuilder_}
	 */
	function addIncomplete(name) {
		return addItem(name)
			.texture(Cmi.loadResource(`item/material/incomplete/${name}`))
	}

	let incompleteItems = [
		"advanced_control_circuit",
		"elite_control_circuit",
		"ultimate_control_circuit",
		"electron_tube",
		"resonant_tube",
		"upgrade_augment_1",
		"upgrade_augment_2",
		"upgrade_augment_3",
		"upgrade_augment_4",
		"upgrade_augment_5",
		"upgrade_augment_6",
		"upgrade_augment_7",
		"upgrade_augment_8",
		"upgrade_augment_9",
		"aviation_cell",
		"gas_container",
		"nuke_cooler",
		"notor_gizmo",
		"motor_rotor",
		"thermal_mechanism_augment"
	]

	incompleteItems.forEach((name) => {
		addIncomplete(name)
	})

	// 热力设备
	addItem("thermal_devices")
		.parentModel("thermal:block/machine_frame")

	// 飞轮
	addItem("flywheel")
		.parentModel("create:block/flywheel/item")

	// 蒸汽引擎
	addItem("steam_engine")
		.parentModel("create:block/steam_engine/item")

	// AE 未完成处理器
	addItem("logic_processor")
		.texture("ae2:item/printed_logic_processor")

	addItem("calculation_processor")
		.texture("ae2:item/printed_calculation_processor")

	addItem("engineering_processor")
		.texture("ae2:item/printed_engineering_processor")

	addItem("concurrent_processor")
		.texture("expatternprovider:item/concurrent_processor_print")

	addItem("superconducting_processor")
		.texture("neoecoae:item/superconducting_processor_print")

	// 火箭框架(半成品)
	for (let i = 1; i <= 4; i++) {
		addItem(`tier_${i}_rocket_frame`)
			.modelJson({
				"parent": `cmi:block/rocket/tier${i}/tier${i}`
			})
	}
})
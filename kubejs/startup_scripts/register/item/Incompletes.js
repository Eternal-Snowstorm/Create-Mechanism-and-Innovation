StartupEvents.registry("item", (event) => {
	/**
	 * @param {string} name 注册ID
	 * @param {boolean} isSequencedAssembly 是否是序列物品
	 * @returns 
	 */
	function addItem(name, isSequencedAssembly) {
		if (isSequencedAssembly === undefined) {
			return event.create(`${Cmi.MODID}:incomplete_${name}`, "create:sequenced_assembly")
		} else if (isSequencedAssembly) {
			return event.create(`${Cmi.MODID}:incomplete_${name}`, "create:sequenced_assembly")
		} else {
			return event.create(`${Cmi.MODID}:incomplete_${name}`)
		}
	}

	/**
	 * @param {string} name 注册ID
	 * @param {boolean} isSequencedAssembly 是否是序列物品
	 * @returns 
	 */
	function addIncompleteItem(name, isSequencedAssembly) {
		if (isSequencedAssembly === undefined) {
			return event.create(`${Cmi.MODID}:incomplete_${name}`, "create:sequenced_assembly")
				.texture(Cmi.loadResource(`item/material/incomplete/${name}`))
		} else if (isSequencedAssembly) {
			return event.create(`${Cmi.MODID}:incomplete_${name}`, "create:sequenced_assembly")
				.texture(Cmi.loadResource(`item/material/incomplete/${name}`))
		} else {
			return event.create(`${Cmi.MODID}:incomplete_${name}`)
				.texture(Cmi.loadResource(`item/material/incomplete/${name}`))
		}
	}

	addIncompleteItem("advanced_control_circuit")
	addIncompleteItem("elite_control_circuit")
	addIncompleteItem("ultimate_control_circuit")
	addIncompleteItem("electron_tube")
	addIncompleteItem("resonant_tube")
	addIncompleteItem("upgrade_augment_1")
	addIncompleteItem("upgrade_augment_2")
	addIncompleteItem("upgrade_augment_3")
	addIncompleteItem("upgrade_augment_4")
	addIncompleteItem("upgrade_augment_5")
	addIncompleteItem("upgrade_augment_6")
	addIncompleteItem("upgrade_augment_7")
	addIncompleteItem("upgrade_augment_8")
	addIncompleteItem("upgrade_augment_9")
	addIncompleteItem("aviation_cell")
	addIncompleteItem("gas_container")
	addIncompleteItem("nuke_cooler")
	addIncompleteItem("notor_gizmo")
	addIncompleteItem("motor_rotor")
	addIncompleteItem("thermal_mechanism_augment")

	// 热力设备
	addItem("thermal_devices")
		.parentModel("thermal:block/machine_frame")

	// 飞轮
	addItem("flywheel")
		.parentModel("create:block/flywheel/item")

	// 蒸汽引擎
	addItem("steam_engine")
		.parentModel("create:block/steam_engine/item")

	// ae未完成处理器
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
		addItem(`tier_${i.toString()}_rocket_frame`)
			.modelJson({
				"parent": `cmi:block/rocket/tier${i.toString()}/tier${i.toString()}`
			})
	}
})
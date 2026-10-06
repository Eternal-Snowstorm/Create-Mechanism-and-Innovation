ClientEvents.lang("zh_cn", (event) => {
	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addMBDLang(key, name) {
		event.add(`block.${Cmi.MODID}.${key}`, name)
		event.add(`mbtool.structure.cmi_${key}`, `构件与革新: ${name}`)

		event.add(`block.${Cmi.MODID}.${key}_input_bus`, `${name}输入总线`)
		event.add(`block.${Cmi.MODID}.${key}_output_bus`, `${name}输出总线`)

		event.add(`${Cmi.MODID}.${key}`, name)

		addIOerLang(key, "item", name, "物品")
		addIOerLang(key, "fluid", name, "流体")
		addIOerLang(key, "energy", name, "能量")
		addIOerLang(key, "gas", name, "气体")
	}

	// ---- 多元钻井机 专用接口 (命名与 .mb 中的 7 个仓室一一对应) ----

	/**
	 * 
	 * @param {string} suffix 
	 * @param {string} name 
	 */
	function addDrillerBusLang(suffix, name) {
		event.add(`block.${Cmi.MODID}.multi_type_driller_${suffix}`, name)
	}

	addMBDLang("multi_type_driller", "多元钻井机")

	addDrillerBusLang("coolant_input_bus", "多元钻井机冷却液输入仓")
	addDrillerBusLang("coolant_output_bus", "多元钻井机冷却液输出仓")
	addDrillerBusLang("product_output_bus", "多元钻井机产物输出口")
	addDrillerBusLang("energy_input_bus", "多元钻井机能量输入仓")

	// ---- 结构方块 ----

	event.add(`block.${Cmi.MODID}.driller_bearing`, "钻井机轴承")
	event.add(`block.${Cmi.MODID}.driller_head`, "钻井机钻头")
	event.add(`block.${Cmi.MODID}.driller_fluid_pump`, "钻井机液泵")
	event.add(`block.${Cmi.MODID}.driller_gas_pump`, "钻井机气泵")
})

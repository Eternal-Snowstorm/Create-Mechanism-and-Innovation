ClientEvents.lang("zh_cn", (event) => {
	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addMBDLang(key, name) {
		event.add(`block.${Cmi.MODID}.${key}`, name)
		event.add(`mbtool.structure.cmi_${key}`,`构件与革新: ${name}`)

		event.add(`block.${Cmi.MODID}.${key}_input_bus`, `${name}输入总线`)
		event.add(`block.${Cmi.MODID}.${key}_output_bus`, `${name}输出总线`)

		event.add(`${Cmi.MODID}.${key}`, name)

		addIOerLang(key, "item", name, "物品")
		addIOerLang(key, "fluid", name, "流体")
		addIOerLang(key, "energy", name, "能量")
		addIOerLang(key, "gas", name, "气体")
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} type 
	 * @param {string} name 
	 * @param {string} typeName 
	 * @param {string} key 
	 * @param {string} type 
	 * @param {string} name 
	 * @param {string} typeName 
	 */
	function addIOerLang(key, type, name, typeName) {
		event.add(`block.${Cmi.MODID}.${key}_${type}_input_bus`, `${name + typeName}输入总线`)
		event.add(`block.${Cmi.MODID}.${key}_${type}_output_bus`, `${name + typeName}输出总线`)
	}

	addMBDLang("reinforced_coke_oven", "高级焦炉")
	addMBDLang("improved_rubber_extractor", "QM-0726型橡胶提取器")
	addMBDLang("chemical_reactor", "化学反应釜")
	addMBDLang("reinforced_chemical_reactor", "大型化学反应釜")
	if (FestivalUtils.isAprilFoolsDay()) {
		addMBDLang("electronic_blast_furnace", "炖屎炉")
	} else {
		addMBDLang("electronic_blast_furnace", "电力高炉")
	}
	addMBDLang("electrolyzer", "三相电解机")
	addMBDLang("dimensionally_transcendent_mechanism_accelerator", "超维度等离子构件催生器(WIP)")
})
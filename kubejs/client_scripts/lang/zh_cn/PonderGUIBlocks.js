ClientEvents.lang("zh_cn", (event) => {
	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addBlockLang(key, name) {
		event.add(`block.${Cmi.MODID}.${key}`, name)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addPonderThermalBlockLang(key, name) {
		event.add(`block.${Cmi.MODID}.ponder_thermal_${key}`, `§aPonder 假方块 §8[热力]§0 - §r${name}`)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addPonderThermalPanelBlockLang(key, name) {
		addPonderThermalBlockLang(`${key}_panel`, `${name}侧面板`)
		addPonderThermalBlockLang(`${key}_button`, `${name}侧面板按钮`)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addPonderThermalMachineBlockLang(key, name) {
		addPonderThermalBlockLang(`machine_${key}`, `机器 §7(${name})§r`)
	}

	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 * @param {boolean} button
	 */
	function addPonderThermalButtonBlockLang(key, name, button) {
		addPonderThermalBlockLang(`${key}${button ? "_button" : ""}_off`, `${name}按钮 §7(关)§r`)
		addPonderThermalBlockLang(`${key}${button ? "_button" : ""}_on`, `${name}按钮 §7(开)§r`)
	}


	/**
	 * 
	 * @param {string} key 
	 * @param {string} name 
	 */
	function addPonderAe2BlockLang(key, name) {
		event.add(`block.${Cmi.MODID}.ponder_ae2_${key}`, `§aPonder 假方块 §b[AE2]§0 - §r${name}`)
	}


	// 普通方块
	addBlockLang("gui_block", "GUI 方块")
	addBlockLang("green_screen", "绿幕")

	// Ponder: 热力
	addPonderThermalBlockLang("background", "背景")

	addPonderThermalPanelBlockLang("config", "配置")
	addPonderThermalPanelBlockLang("augment", "增强")
	addPonderThermalPanelBlockLang("redstone", "红石控制")
	addPonderThermalPanelBlockLang("information", "信息")
	addPonderThermalPanelBlockLang("energy", "RF")

	addPonderThermalButtonBlockLang("auto_input", "自动输入", true)
	addPonderThermalButtonBlockLang("auto_output", "自动输出", true)
	addPonderThermalButtonBlockLang("redstone", "红石")
	addPonderThermalButtonBlockLang("low_rs_touch", "低红石电平")
	addPonderThermalButtonBlockLang("high_rs_touch", "高红石电平")

	addPonderThermalMachineBlockLang("front", "前")
	addPonderThermalMachineBlockLang("side", "侧")
	addPonderThermalMachineBlockLang("top", "顶")
	addPonderThermalMachineBlockLang("bottom", "底")
})
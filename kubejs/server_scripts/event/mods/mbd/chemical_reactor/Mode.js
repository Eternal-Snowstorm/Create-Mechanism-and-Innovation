MBDMachineEvents.onRightClick("cmi:chemical_reactor", ($) => {
	let event = $.getEvent()
	let { machine, item, player } = event

	/**
	 * 机器 customData
	 * @type {Internal.CompoundTag}
	 */
	let customData = machine.getCustomData().copy()

	// 读取当前 mode
	let currentMode = customData.getByte("mode")

	// 判断下一个 mode 应该是什么
	let nextMode = currentMode === 0 ? 1 : 0

	// 写回数据
	customData.putByte("mode", nextMode)

	// 设置给机器
	machine.setCustomData(customData)

	// 客户端提示
	player.displayClientMessage(`§a已切换到模式: ${nextMode}`, true)
})
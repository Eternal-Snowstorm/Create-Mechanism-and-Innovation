// 多元钻井机 (multi_type_driller) 的中文名.
//
// 机器本体与 7 个仓室的注册名来自 .mb / .sm, 结构方块来自
// kubejs/startup_scripts/register/block/Basic.js 的 addBlock(...),
// 这里只补对应的 lang key.
ClientEvents.lang("zh_cn", (event) => {
	// ---- 多方块本体 ----
	event.add(`block.${Cmi.MODID}.multi_type_driller`, "多元钻井机")
	event.add(`machine.${Cmi.MODID}.multi_type_driller`, "多元钻井机")
	// mbtool 多方块结构预览里的标题
	event.add("mbtool.structure.cmi_multi_type_driller", "构件与革新: 多元钻井机")

	// ---- 仓室 (与 .mb / .sm 里的方块 id 一一对应) ----
	// B: 冷却液输入   A: 热冷却液输出   D: 能量输入
	// C: 固/液/气共用的输出口 (两个 C 位置各放 物品/液体/气体 三个总线, 内容同步)
	event.add(`block.${Cmi.MODID}.multi_type_driller_coolant_input_bus`, "多元钻井机冷却液输入仓")
	event.add(`block.${Cmi.MODID}.multi_type_driller_coolant_output_bus`, "多元钻井机热冷却液输出仓")
	event.add(`block.${Cmi.MODID}.multi_type_driller_energy_input_bus`, "多元钻井机能量输入仓")

	event.add(`block.${Cmi.MODID}.multi_type_driller_item_output_bus`, "多元钻井机产物输出口")
	event.add(`block.${Cmi.MODID}.multi_type_driller_fluid_output_bus`, "多元钻井机产物输出口")
	event.add(`block.${Cmi.MODID}.multi_type_driller_gas_output_bus`, "多元钻井机产物输出口")

	// ---- 结构方块 ----
	event.add(`block.${Cmi.MODID}.driller_bearing`, "钻井机轴承")
	event.add(`block.${Cmi.MODID}.driller_head`, "钻井机钻头")
	event.add(`block.${Cmi.MODID}.driller_fluid_pump`, "钻井机液泵")
	event.add(`block.${Cmi.MODID}.driller_gas_pump`, "钻井机气泵")
})

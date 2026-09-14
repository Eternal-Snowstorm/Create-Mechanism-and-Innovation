// dtma 机器界面 —— 只有这一个文件, 只有 startup 能写。
//
// 改完: /kubejs reload startup_scripts -> 关掉界面再打开 (不用重启)。
//
// 为什么不写 server_scripts: LDLib 的界面是两侧各自建树的 (服务端建树发包 / 客户端用同一个
// uiCreator 再建一次树再回填数据), 两边结构必须一致。server 脚本客户端够不着 -> 联机时黑屏。
// MBDUI.register 写在注册期之后还会在日志里警告你一句。
//
// 机器定义 (trait / 贴图 / 多方块形状) 仍然在 Machine.js, 那是启动期注册的, 改完要重启。

const DTMA = "dimensionally_transcendent_mechanism_accelerator"

MBDUI.register(`cmi:${DTMA}`, (machine) => {
	return UISpec.create(machine, 176, 166, (ui) => {
		ui.background("ldlib:textures/gui/background.png")
			.title(8, 6, 160, 40)
			.slot(`${DTMA}_input_item_slot`, 40, 42)
			.slot(`${DTMA}_output_item_slot`, 114, 42)
			.progressBar(79, 42)
	})
})
// dtma 机器界面 —— 只有这一个文件, 只有 startup 能写。
//
// 版式: 上半大屏幕 (机器信息), 中间机器自己的槽位, 下半玩家物品栏。
//
// 改完: /kubejs reload startup_scripts -> 关掉界面再打开 (不用重启)。
//
// 为什么不写 server_scripts: LDLib 的界面是两侧各自建树的 (服务端建树发包 / 客户端用同一个
// uiCreator 再建一次树再回填数据), 两边结构必须一致。server 脚本客户端够不着 -> 联机时黑屏。
//
// 机器定义 (trait / 贴图 / 多方块形状) 仍然在 Machine.js, 那是启动期注册的, 改完要重启。
//
// ===================== 尺寸怎么定 (重要) =====================
// 面板的**逻辑**高 HEIGHT 必须 <= 窗口逻辑高, 否则上下会被裁掉 (标题和快捷栏看不见)。
//   窗口逻辑高 = 窗口像素高 / 界面尺寸(GUI scale)
//   面板实际像素 = HEIGHT * SCALE, 面板物理上要 <= 窗口像素高
//
// 两种放大路子:
//   A. 不动全局设置: SCALE 只能取小值 (下表的"安全 SCALE"), 屏幕靠 SCREEN_HEIGHT 拉大;
//   B. 把游戏里 视频设置 -> 界面尺寸 降一档/两档, SCALE 就能往上加 (整体等比变大, 字也变大)。
//
// 1080p 全屏下 (窗口 1920x1080):
//   GUI scale 4 -> 逻辑 480x270  -> 安全 SCALE = 1   (面板逻辑高 ~256 已经贴顶)
//   GUI scale 3 -> 逻辑 640x360  -> 安全 SCALE = 1.4
//   GUI scale 2 -> 逻辑 960x540  -> 安全 SCALE = 2
//   GUI scale 1 -> 逻辑 1920x1080-> 安全 SCALE = 4
// ===========================================================

const DTMA = "dimensionally_transcendent_mechanism_accelerator"

const SCALE = 1                 // 整体放大倍数 (放不下就往下调: 1.5 / 1.25 / 1)
const WIDTH = 176               // 逻辑宽
const SCREEN_HEIGHT = 130       // 屏幕逻辑高 —— 界面里最大的一块
const SLOT_ROWS = 1             // 机器自己的槽位占几行
const SLOT_Y = UISpec.controllerSlotY(SCREEN_HEIGHT)      // 屏幕下面留 6 像素
const HEIGHT = UISpec.controllerHeight(SCREEN_HEIGHT, SLOT_ROWS)   // = 256

MBDUI.register(`cmi:${DTMA}`, (machine) => {
	return UISpec.create(machine, WIDTH, HEIGHT, (ui) => {
		ui.scale(SCALE)   // 整体放大, 要写就写在最前面

		// 九宫格底 (别用 background(), 那是整张拉伸, 16x16 会被拉出粗白边)
		ui.backgroundBordered("ldlib:textures/gui/background.png", 16, 16, 4)

		// ---- 屏幕: 文案全在这里写 (坐标相对屏幕左上角) ----
		ui.screen(4, 4, WIDTH - 8, SCREEN_HEIGHT, (screen) => {
			screen.text(16, 16, WIDTH - 40, 12, (m) => UISpec.machineName(m))
			screen.text(16, 42, WIDTH - 40, 12, (m) => UISpec.status(m))
			screen.text(16, 68, WIDTH - 40, 12, (m) => UISpec.progressText(m))
			screen.text(16, 94, WIDTH - 40, 12, (m) => UISpec.line(UISpec.literal("能量"), UISpec.energyText(m, `${DTMA}_input_energy_slot`)))
			screen.text(16, 118, WIDTH - 40, 12, (m) => UISpec.waitingReason(m))

			// 能量条 (MBD2 模板: 100x14 的条 + 数值文字)。上面已经有 "能量: x/y" 了, 想要条就取消注释。
			// screen.traitWidgets(`${DTMA}_input_energy_slot`, 16, 112, 1)
		})

		// ---- 机器自己的槽位: 位置我们定, 接线交给 MBD2 (ui:<trait名>_<下标>) ----
		ui.traitWidgets(`${DTMA}_input_item_slot`, 8, SLOT_Y, 8)
		ui.traitWidgets(`${DTMA}_output_item_slot`, 158, SLOT_Y, 1)

		ui.playerInventory()
	})
})

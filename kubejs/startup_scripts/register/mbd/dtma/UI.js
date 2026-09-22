// dtma 机器界面 —— 只有这一个文件, 只有 startup 能写。
//
// 版式: 上半大屏幕, 中间机器自己的槽位, 下半玩家物品栏。
//
// 改完: /kubejs reload startup_scripts -> 关掉界面再打开 (不用重启)。
//
// 机器定义 (trait / 贴图 / 多方块形状) 在 Machine.js, 启动期注册, 改完要重启。
//
// ===================== 对齐 (之前歪的原因) =====================
// 玩家物品栏是**居中**摆的, 它内部第一格离自己左边缘 5 像素:
//   物品栏槽位左边缘 = (WIDTH - 172) / 2 + 5
// 机器槽位如果随手写 8, 就会比物品栏偏左 1 像素 (WIDTH=176 时), 看着就是歪的;
// 下面用 SLOT_X 统一算, 9 个槽 (8 输入 + 1 输出) 正好占满物品栏那一行的宽度。
// ===========================================================

// ===================== 尺寸 =====================
// 面板逻辑高 HEIGHT 必须 <= 窗口逻辑高 (= 窗口像素高 / 界面尺寸), 否则上下会被裁。
// 1080p 全屏: GUI scale 4 -> 逻辑 480x270 (HEIGHT 256 已经贴顶) / scale 2 -> 960x540 (SCALE 可以到 2)
// ===============================================

const DTMA = "dimensionally_transcendent_mechanism_accelerator"

const SCALE = 1                 // 整体放大倍数
const WIDTH = 176               // 逻辑宽
const SCREEN_HEIGHT = 130       // 屏幕逻辑高 —— 界面里最大的一块
const SLOT_ROWS = 1             // 机器自己的槽位占几行 (8 输入 + 1 输出 = 1 行)
const SLOT_X = (WIDTH - UISpec.PLAYER_INV_WIDTH) / 2 + UISpec.PLAYER_INV_MARGIN   // = 7, 与物品栏第一格对齐
const SLOT_Y = UISpec.controllerSlotY(SCREEN_HEIGHT)                              // = 140
const HEIGHT = UISpec.controllerHeight(SCREEN_HEIGHT, SLOT_ROWS)                  // = 256

MBDUI.register(`cmi:${DTMA}`, (machine) => {
	return UISpec.create(machine, WIDTH, HEIGHT, (ui) => {
		ui.scale(SCALE)

		ui.backgroundBordered("ldlib:textures/gui/background.png", 16, 16, 4)

		// ---- 屏幕: 文案全在这里写 (坐标相对屏幕左上角) ----
		ui.screen(4, 4, WIDTH - 8, SCREEN_HEIGHT, (screen) => {
			screen.text(16, 16, WIDTH - 40, 12, (m) => UISpec.machineName(m))
			screen.text(16, 42, WIDTH - 40, 12, (m) => UISpec.status(m))
			screen.text(16, 68, WIDTH - 40, 12, (m) => UISpec.progressText(m))
			screen.text(16, 94, WIDTH - 40, 12, (m) => UISpec.line(UISpec.literal("能量"), UISpec.energyText(m, `${DTMA}_input_energy_slot`)))
			screen.text(16, 118, WIDTH - 40, 12, (m) => UISpec.waitingReason(m))

			// 能量条不排 (信息看 Jade + 上面那行字就够了); 想要条就取消注释:
			// screen.traitWidgets(`${DTMA}_input_energy_slot`, 16, 112, 1)
		})

		// ---- 机器自己的槽位 (Machine.js 里定义的 trait: 8 个输入 + 1 个输出) ----
		// 位置我们定, 接线交给 MBD2 (ui:<trait名>_<下标>)
		ui.traitWidgets(`${DTMA}_input_item_slot`, SLOT_X, SLOT_Y, 8)
		ui.traitWidgets(`${DTMA}_output_item_slot`, SLOT_X + 8 * UISpec.SLOT, SLOT_Y, 1)

		ui.playerInventory()
	})
})

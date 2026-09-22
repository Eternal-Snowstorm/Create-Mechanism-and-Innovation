// DTMA (cmi:dimensionally_transcendent_mechanism_accelerator) 的界面 —— startup 脚本。
//
// 尺寸和 Java 默认版式一致: 200 x 202, 屏幕 96 高;
// 机器自己的槽位 (8 输入 + 1 输出) 放在屏幕内部最下面一行。
//
// 改完: /kubejs reload startup_scripts -> 关掉界面再打开。
//
// 注意: KubeJS 的 startup 脚本共享全局作用域, 变量都写在 IIFE 里。

(function () {
	const DTMA = "dimensionally_transcendent_mechanism_accelerator"

	const WIDTH = UISpec.DEFAULT_WIDTH                        // 200
	const SCREEN_HEIGHT = UISpec.CONTROLLER_SCREEN_HEIGHT      // 96
	const HEIGHT = UISpec.controllerHeight(SCREEN_HEIGHT, 0)   // 202
	const SLOT_X = 16                                          // 屏幕内槽位行起点
	const SLOT_Y = 74                                          // 屏幕内最下面一行

	MBDUI.register(`cmi:${DTMA}`, (machine) => {
		return UISpec.create(machine, WIDTH, HEIGHT, (ui) => {
			ui.backgroundBordered("ldlib:textures/gui/background.png", 16, 16, 4)

			ui.screen(4, 4, WIDTH - 8, SCREEN_HEIGHT, (screen) => {
				screen.text(16, 12, WIDTH - 76, 12, (m) => UISpec.machineName(m))
				screen.text(16, 28, WIDTH - 76, 12, (m) => UISpec.status(m))
				screen.text(16, 44, WIDTH - 76, 12, (m) => UISpec.progressText(m))
				screen.text(16, 60, WIDTH - 76, 12, (m) => UISpec.line(UISpec.literal("能量"), UISpec.energyText(m, `${DTMA}_input_energy_slot`)))

				// 机器自己的槽位 (Machine.js 里定义的 trait): 接线交给 MBD2 (ui:<trait名>_<下标>)
				screen.traitWidgets(`${DTMA}_input_item_slot`, SLOT_X, SLOT_Y, 8)
				screen.traitWidgets(`${DTMA}_output_item_slot`, SLOT_X + 8 * UISpec.SLOT + 6, SLOT_Y, 1)
			})

			ui.playerInventory()
		})
	})
})()

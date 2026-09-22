// 三相电解机 (cmi:electrolyzer) 的界面 —— startup 脚本。
//
// 尺寸和 Java 默认版式 (UISpec.controller) 完全一致: 200 x 202, 屏幕 96 高。
// 专属槽位 (石墨电极) 塞进屏幕内部最下面一行, 所以界面不会比别的控制器更高。
//
// 改完: /kubejs reload startup_scripts -> 关掉界面再打开。
//
// 注意: KubeJS 的 startup 脚本共享全局作用域, 变量都写在 IIFE 里, 免得和别的界面文件撞名。

(function () {
	const ELECTROLYZER = "electrolyzer"

	const WIDTH = UISpec.DEFAULT_WIDTH                        // 200
	const SCREEN_HEIGHT = UISpec.CONTROLLER_SCREEN_HEIGHT      // 96
	const HEIGHT = UISpec.controllerHeight(SCREEN_HEIGHT, 0)   // 202

	MBDUI.register(`cmi:${ELECTROLYZER}`, (machine) => {
		return UISpec.create(machine, WIDTH, HEIGHT, (ui) => {
			ui.backgroundBordered("ldlib:textures/gui/background.png", 16, 16, 4)

			ui.screen(4, 4, WIDTH - 8, SCREEN_HEIGHT, (screen) => {
				screen.text(16, 12, WIDTH - 76, 12, (m) => UISpec.machineName(m))
				screen.text(16, 28, WIDTH - 76, 12, (m) => UISpec.status(m))
				screen.text(16, 44, WIDTH - 76, 12, (m) => UISpec.progressText(m))
				screen.text(16, 60, WIDTH - 76, 12, (m) => UISpec.line(UISpec.literal("能量"), UISpec.energyText(m, `${ELECTROLYZER}_input_energy`)))

				// 石墨电极槽 (配方需要它): 屏幕里最下面一行, 靠右
				screen.traitSlot(`${ELECTROLYZER}_input_graphite_electrode`,
					WIDTH - 8 - 18 - 16, 74,
					"cmi:textures/gui/slot/graphite_electrode.png", 18, 1)
			})

			ui.playerInventory()
		})
	})
})()

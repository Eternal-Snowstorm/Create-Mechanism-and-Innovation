(() => {
	let cellMap = [
		{
			item: "cmi:tier_1_aviation_cell",
			uiId: "cmi:cell_1",
			texture: "cmi:textures/gui/cell/tier_1.png"
		},
		{
			item: "cmi:tier_2_aviation_cell",
			uiId: "cmi:cell_2",
			texture: "cmi:textures/gui/cell/tier_2.png"
		},
		{
			item: "cmi:tier_3_aviation_cell",
			uiId: "cmi:cell_3",
			texture: "cmi:textures/gui/cell/tier_3.png"
		},
		{
			item: "cmi:tier_4_aviation_cell",
			uiId: "cmi:cell_4",
			texture: "cmi:textures/gui/cell/tier_4.png"
		}
	]

	// 右键打开 UI
	ItemEvents.rightClicked((event) => {
		let { item, player } = event

		let cell = cellMap.find((c) => {
			return c.item === item
		})
		if (cell) {
			player.swing()
			ItemUIFactory.INSTANCE.openUI(player, event.getHand(), cell.uiId)
		}
	})


	/**
	 * UI 工厂函数
	 * 
	 * @param {ResourceLocation_} texturePath 
	 * @returns 
	 */
	function createCellUI(texturePath) {
		let page = {
			false: "1",
			true: "2"
		}
		let clicked = false
		let string = texturePath.toString()
			.replace("cmi:textures/gui/cell/", "")
			.replace(".png", "")

		let group = new WidgetGroup()

		const UI_WIDTH = (416 / 2) + (416 / 8)
		const UI_HEIGHT = (512 / 2) + (512 / 8)

		let mainTexture = new ResourceTexture(
			texturePath,
			0,
			0,
			1,
			1
		)
		group.setSize(UI_WIDTH, UI_HEIGHT)
		group.setBackground(mainTexture)

		let button = new ButtonWidget()

		const PAGE_TURNING = Component.translatable("gui.cmi.cell.page_turning").getString()
		const BUTTON_COMMON = ResourceBorderTexture.BUTTON_COMMON

		button.setButtonTexture(BUTTON_COMMON, new TextTexture(PAGE_TURNING))
		button.setClickedTexture(BUTTON_COMMON, new TextTexture(PAGE_TURNING))

		button.setSelfPosition(216, 298)
		button.setSize(32, 16)
		button.setOnPressCallback((data) => {
			if (clicked) {
				clicked = false
				return
			} else {
				clicked = true
				return
			}
		})
		let lable = new LabelWidget()
		lable.setSelfPosition(35, 14)
		lable.setTextProvider(() => {
			return Component.translatable(`text.cmi.cell.${string}.page_${page[clicked]}`).getString()
		})
		group.addWidgets(lable, button)
		return group
	}

	// 注册 UI
	cellMap.forEach((cell) => {
		LDLibUI.item(cell.uiId, (event) => {
			event.success(createCellUI(cell.texture))
		})
	})
})()
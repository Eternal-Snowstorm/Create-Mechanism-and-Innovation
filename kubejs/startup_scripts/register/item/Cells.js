StartupEvents.registry("item", (event) => {
	function cellModel() {
		return {
			"parent": "minecraft:item/generated",
			"textures": {
				"layer0": "cmi:item/material/cell/inside",
				"layer1": "cmi:item/material/cell/casing"
			}
		}
	}

	function addCellItem(name, color) {
		let builder = event.create(`${Cmi.MODID}:${name}_cell`)

		builder.color(0, color)
		builder.modelJson(cellModel())
		builder.tag(`${Cmi.MODID}:cells`)

		return builder
	}

	// 空白硬盘
	addCellItem("empty", 0xFFFFFF)
	// 航空硬盘
	addCellItem("tier_1_aviation", 0xBA52FF)
	addCellItem("tier_2_aviation", 0x00FFFF)
	addCellItem("tier_3_aviation", 0xFCD720)
	addCellItem("tier_4_aviation", 0xFFC4F2)
})
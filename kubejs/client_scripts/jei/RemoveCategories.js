JEIEvents.removeCategories((event) => {
	if (CmiGlobal.isDebug) {
		event.getCategoryIds().forEach((id) => {
			console.info("[JEI Categories] " + id)
		})
	}

	event.remove([
		"alexscaves:spelunkery_table",
		"alexscaves:nuclear_furnace",
		// 暂时隐藏mbtool的JEICategory
		"mbtool:multiblock_structure"
	])
})
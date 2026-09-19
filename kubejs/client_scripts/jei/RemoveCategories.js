JEIEvents.removeCategories((event) => {
	if (CmiGlobal.isDebug) {
		event.getCategoryIds().forEach((id) => {
			console.info("[JEI Categories] " + id)
		})
	}

	event.remove([
		"alexscaves:spelunkery_table"
	])
})
ClientEvents.highPriorityAssets((event) => {
	const PARENT = "cmi:block/custom/storage_block"

	/**
	 * 
	 * @param {String} type 
	 */
	function addModel(type) {
		let inside = `cmi:block/custom/storage/${type}_block`
		let outline = `cmi:block/custom/storage/${type}_block_outline`

		event.addModel("block", `cmi:custom/${type}_block`, (generator) => {
			generator.parent(PARENT)
			generator.texture("inside", inside)
			generator.texture("outline", outline)
		})
	}

	addModel("uranium")
	addModel("crystal")
})
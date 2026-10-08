(function () {
	let $ModifierManager =
		Java.loadClass("slimeknights.tconstruct.library.modifiers.ModifierManager")

	ProbeJSEvents.generateDoc((event) => {
		addTConstructModifier(event)
	})

	/**
	 * 
	 * @param {Internal.DocGenerationEventJS_} event 
	 */
	function addTConstructModifier(event) {
		/**
		 * @type {Internal.Modifier_[]}
		 */
		let modifiers = $ModifierManager.INSTANCE.getAllValues().toArray()

		/**
		 * @type {string[]}
		 */
		let ids = []

		for (let i = 0; i < modifiers.length; i++) {
			let modifier = modifiers[i]

			if (!modifier["shouldDisplay(boolean)"](true)) {
				continue
			}

			ids.push(`"${modifier.getId().toString()}"`)
		}

		/**
		 * @type {Internal.List<string>}
		 */
		let list = new ArrayList()

		for (let i = 0; i < ids.length; i++) {
			list.add(ids[i])
		}

		event.specialType("TConModifier", list)
	}
})()
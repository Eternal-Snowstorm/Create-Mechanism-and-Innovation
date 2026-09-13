ClientEvents.lang("zh_cn", (event) => {
	renameFluid("neoecoae:cryotheum_solution", "极寒之凛冰")

	/**
	 * 
	 * @param {Internal.Fluid_} fluid 
	 * @param {string} name 
	 */
	function renameFluid(fluid, name) {
		/**
		 * @type {string}
		 */
		let description = fluid.toString().replace(":", ".")

		event.add(`fluid.${description}`, name)
		event.add(`block.${description}`, name)
		event.add(`item.${description}_bucket`, `${name}桶`)
	}
})
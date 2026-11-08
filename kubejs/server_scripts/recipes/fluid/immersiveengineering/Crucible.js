ServerEvents.recipes((event) => {
	function addRecipe(output, inputs) {
		let json = {
			type: "immersiveindustry:crucible",
			inputs: inputs,
			result: Item.of(output).toJson()
		}

		event.custom(json)

		return {
			/**
			 * 
			 * @param {number} time 加工时间(单温秒)
			 * @returns 
			 */
			time(time) {
				json.time = time * 20
				return this
			},
			/**
			 * 
			 * @param {number} temp 温度
			 * @returns 
			 */
			temperature(temp) {
				json.temperature = temp
				return this
			}
		}
	}
})
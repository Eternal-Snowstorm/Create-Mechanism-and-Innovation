// priority: 500
global.neoecoaeIWSCompat = function (event) {
	return {
		integrated_working_station: function (a, b, c, d, e, f) {
			let recipe = null
			let items = null

			let ensure = function () {
				if (recipe === null) {
					recipe = event.custom({
						type: "neoecoae:integrated_working_station",
						energy: 1000
					})
				}
				return recipe
			}

			let put = function (key, value) {
				ensure().set(key, value)
				return api
			}

			let api = {
				require: function (v) {
					if (items === null) {
						items = []
					} else if (typeof items.push !== "function") {
						let prev = items
						items = [prev]
					}
					items.push(v)
					return put("inputItems", items.slice())
				},
				// 旧版 API：设置流体输入
				requireFluid: function (v) {
					return put("inputFluid", v)
				},
				inputItems: function (v) {
					items = Array.isArray(v) ? v.slice() : [v]
					return put("inputItems", items)
				},
				inputFluid: function (v) {
					return put("inputFluid", v)
				},
				itemOutput: function (v) {
					return put("itemOutput", v)
				},
				fluidOutput: function (v) {
					return put("fluidOutput", v)
				},
				energy: function (v) {
					return put("energy", v)
				},
				processingTicks: function (v) {
					return put("processingTicks", v)
				},
				id: function (v) {
					ensure().id(v)
					return api
				}
			}

			// 位置参数形式（顺序 inputItems, inputFluid, itemOutput, fluidOutput, energy, processingTicks）
			if (a !== undefined) api.inputItems(a)
			if (b !== undefined) api.inputFluid(b)
			if (c !== undefined) api.itemOutput(c)
			if (d !== undefined) api.fluidOutput(d)
			if (e !== undefined) api.energy(e)
			if (f !== undefined) api.processingTicks(f)

			return api
		}
	}
}

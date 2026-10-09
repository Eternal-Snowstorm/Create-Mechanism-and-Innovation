ProbeJSEvents.generateDoc((event) => {
	let $CreateFluidIngredient = "dev.celestiacraft.cmi.compat.create.CreateFluidIngredient"
	event.transformByName($CreateFluidIngredient, (document) => {
		document.getMethods().forEach((method) => {
			if (method.getName() === "ofTagId") {
				method.addPropertyJson({
					type: "property:modify",
					index: 0,
					newType: {
						type: "type:primitive",
						name: "Special.FluidTag"
					}
				})
			}
		})
	})

	let $MBDFluidIngredient = "dev.celestiacraft.cmi.compat.mbd2.MBDFluidIngredient"
	event.transformByName($MBDFluidIngredient, (document) => {
		document.getMethods().forEach((method) => {
			if (method.getName() === "ofTagId") {
				method.addPropertyJson({
					type: "property:modify",
					index: 0,
					newType: {
						type: "type:primitive",
						name: "Special.FluidTag"
					}
				})
			}
		})
	})

	/*
	 * `getFluidString`和`getFirstFluidId`真正来自
	 * `dev.celestiacraft.cmi.compat.kubejs.utils.ingredient.IIngredientUtils`
	 */
	let $IngredientWrapper = "dev.latvian.mods.kubejs.bindings.IngredientWrapper"
	event.transformByName($IngredientWrapper, (document) => {
		document.getMethods().forEach((method) => {
			if (method.getName() === "getFluidString") {
				method.addPropertyJson({
					type: "property:modify",
					index: 0,
					newType: {
						type: "type:primitive",
						name: "Special.FluidTag"
					}
				})
			}

			if (method.getName() === "getFirstFluidId") {
				method.addPropertyJson({
					type: "property:modify",
					index: 0,
					newType: {
						type: "type:primitive",
						name: "Special.FluidTag"
					}
				})
			}
		})
	})
})
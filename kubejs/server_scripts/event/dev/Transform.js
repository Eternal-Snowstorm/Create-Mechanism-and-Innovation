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
})
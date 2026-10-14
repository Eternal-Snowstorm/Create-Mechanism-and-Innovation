(function () {
	ProbeJSEvents.generateDoc((event) => {
		modifyCreateFluidIngredient(event)
		modifyMBDFluidIngredient(event)
		modifyIngredientWrapper(event)
		modifyBlockContainerJS(event)
	})

	/**
	 * 
	 * @param {Internal.DocGenerationEventJS_} event 
	 */
	function modifyCreateFluidIngredient(event) {
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
	}

	/**
	 * 
	 * @param {Internal.DocGenerationEventJS_} event 
	 */
	function modifyMBDFluidIngredient(event) {
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
	}

	/**
	 * 
	 * `getFluidString`和`getFirstFluidId`真正来自
	 * `dev.celestiacraft.cmi.compat.kubejs.modify.ingredient.IIngredientUtils`
	 * 
	 * @param {Internal.DocGenerationEventJS_} event 
	 */
	function modifyIngredientWrapper(event) {
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
	}

	/**
	 * 
	 * @param {Internal.DocGenerationEventJS_} event 
	 */
	function modifyBlockContainerJS(event) {
		let $BlockContainerJS = "dev.latvian.mods.kubejs.level.BlockContainerJS"
		event.transformByName($BlockContainerJS, (document) => {
			document.getMethods().forEach((method) => {
				if (method.getName() === "hasTag") {
					method.addPropertyJson({
						type: "property:modify",
						index: 0,
						newType: {
							type: "type:primitive",
							name: "Special.BlockTag"
						}
					})
				}
			})
		})
	}
})()
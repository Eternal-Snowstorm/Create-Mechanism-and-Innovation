ServerEvents.recipes((event) => {
	let { immersiveengineering } = event.getRecipes()

	// 模具
	Ingredient.of("#cmi:molds")
		.getItemIds()
		.forEach((mold) => {
			let replace = mold.replace("cmi:", "")

			immersiveengineering.blueprint(mold, [
				"4x #forge:plates/industrial_iron"
			]).blueprint("molds")
				.id(`cmi:blueprint/${replace}`)
		})
})
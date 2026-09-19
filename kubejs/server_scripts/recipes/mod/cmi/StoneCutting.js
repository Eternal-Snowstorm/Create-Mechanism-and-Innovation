ServerEvents.recipes((event) => {
	let { minecraft } = event.getRecipes()

	// 公仔
	Ingredient.of("#cmi:dev_doll")
		.getItemIds()
		.forEach((id) => {
			minecraft.stonecutting(id, "#minecraft:wool")
			minecraft.stonecutting(id, "#cmi:dev_doll")
		})

	// 黏土模具
	Ingredient.of("#cmi:clay_molds")
		.getItemIds()
		.forEach((mold) => {
			minecraft.stonecutting(mold, "#cmi:clay_molds")
		})

})
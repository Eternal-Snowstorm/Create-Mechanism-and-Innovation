ServerEvents.recipes((event) => {
	let { minecraft } = event.getRecipes()

	// 公仔
	Ingredient.of("#cmi:dev_doll")
		.getItemIds()
		.forEach((id) => {
			minecraft.stonecutting(id, "#minecraft:wool")
			minecraft.stonecutting(id, "#cmi:dev_doll")
		})

	// 石子路面
	minecraft.stonecutting("16x cmi:stone_pave", "minecraft:gravel")
})
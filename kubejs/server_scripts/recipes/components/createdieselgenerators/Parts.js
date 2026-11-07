ServerEvents.recipes((event) => {
	let { minecraft } = event.getRecipes()

	// 安山梁
	minecraft.stonecutting("2x createdieselgenerators:andesite_girder",
		"#forge:plates/andesite_alloy"
	).id("createdieselgenerators:crafting/andesite_girder")
})

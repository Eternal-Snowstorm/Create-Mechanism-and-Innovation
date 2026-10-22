JEIAddedEvents.registerRecipeCatalysts((event) => {
	let { data } = event

	/**
	 * 
	 * @param {ResourceLocation_|ResourceLocation_[]} ids JEI页面注册id
	 * @param {string|Internal.ItemStack_|string[]|Internal.ItemStack_[]} items 索引物品
	 * @param {string} [displayName] 显示名称
	 */
	function addJeiRecipeCatalysts(ids, items, displayName) {
		ids = Array.isArray(ids) ? ids : [ids]
		items = Array.isArray(items) ? items : [items]

		let recipeTypes = ids
			.map((id) => {
				return data.jeiHelpers.getRecipeType(ResourceLocation.parse(id))
					.orElse(null)
			})
			.filter((type) => {
				return type != null
			})

		let stack = Item.of(items[0])

		if (displayName !== undefined) {
			let key = `recipe.jei.recipe.cmi.${displayName}`
			stack = stack.setHoverName(Component.translatable(key))
		}

		for (let item of items) {
			let catalyst = Item.of(item)

			if (displayName !== undefined) {
				let key = Component.translatable(`recipe.jei.recipe.cmi.${displayName}`)
				catalyst = catalyst.setHoverName(key)
			}

			data["addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])"](
				catalyst,
				recipeTypes
			)
		}
	}

	addJeiRecipeCatalysts("immersiveindustry:crucible", "immersiveindustry:crucible")

	addJeiRecipeCatalysts("createdieselgenerators:hammering", [
		"cmi:flint_hammer",
		"cmi:diamond_hammer"
	])
})
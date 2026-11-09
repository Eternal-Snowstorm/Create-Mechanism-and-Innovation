(() => {
	let $RecipeNamespace =
		Java.loadClass("dev.latvian.mods.kubejs.recipe.schema.RecipeNamespace")
	let $RecipeSchemaType =
		Java.loadClass("dev.latvian.mods.kubejs.recipe.schema.RecipeSchemaType")
	let $BasicRecipeSchema =
		Java.loadClass("dev.latvian.mods.kubejs.thermal.BasicRecipeSchema")
	let $MachineRecipeSerializer =
		Java.loadClass("cofh.thermal.lib.util.recipes.MachineRecipeSerializer")

	const NAMESPACES = [
		"thermal_extra"
	]

	let patched = 0

	NAMESPACES.forEach((namespaceName) => {
		let namespace = $RecipeNamespace.getAll().get(namespaceName)
		if (namespace == null) {
			return
		}

		let paths = namespace.keySet().toArray()

		for (let i = 0; i < paths.length; i++) {
			let path = paths[i]
			let type = namespace.get(path)

			if (!(type.getSerializer() instanceof $MachineRecipeSerializer)) {
				continue
			}

			namespace.put(path, new $RecipeSchemaType(
				namespace,
				type.id,
				$BasicRecipeSchema.SCHEMA
			))

			patched++
		}
	})

	console.info(`[thermal_extra] patched ${patched}`)
})()
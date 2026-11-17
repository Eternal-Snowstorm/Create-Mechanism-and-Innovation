ServerEvents.recipes((event) => {
	event.forEachRecipe({
		output: "#createaddition:spools"
	}, (recipe) => {
		let json = recipe.json

		if (json.has("result")) {
			let result = json.getAsJsonObject("result")

			result["addProperty(java.lang.String,java.lang.Number)"](
				"count",
				4
			)
		}
	})
})
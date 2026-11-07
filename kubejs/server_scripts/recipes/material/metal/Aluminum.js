ServerEvents.recipes((event) => {
	let { create, vintageimprovements } = event.getRecipes()

	vintageimprovements.pressurizing("cmi:red_mud", [
		"#mekanism:dirty_dusts/aluminum",
		"#forge:dusts/fluorite"
	])
})
ServerEvents.recipes((event) => {
	let { vintageimprovements, cmi } = event.getRecipes()

	// 赤泥
	vintageimprovements.pressurizing("cmi:red_mud", [
		"#mekanism:dirty_dusts/aluminum",
		"#forge:dusts/fluorite"
	])

	// 铝粉
	cmi.electrolyzer()
		.inputItems("cmi:red_mud")
		.outputItems("neoecoae:aluminum_dust")
		.duration(20 * 10)
})
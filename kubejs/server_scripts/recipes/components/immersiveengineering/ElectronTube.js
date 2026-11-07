ServerEvents.recipes((event) => {
	let { immersiveengineering } = event.getRecipes()

	// 真空管
	immersiveengineering.blueprint("2x immersiveengineering:electron_tube", [
		"#forge:plates/nickel",
		"#forge:wires/copper",
		"create:polished_rose_quartz"
	]).blueprint("components")
		.id("immersiveengineering:blueprint/electron_tube")
})

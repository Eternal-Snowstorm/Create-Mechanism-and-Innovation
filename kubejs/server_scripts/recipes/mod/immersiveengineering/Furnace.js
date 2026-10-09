ServerEvents.recipes((event) => {
	let { immersiveengineering } = event.getRecipes()

	// 生石灰
	immersiveengineering.blast_furnace("4x cmi:furnaced_lime")
		.input("create:limestone")
		.time(30)
		
})
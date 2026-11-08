ServerEvents.recipes((event) => {
	let { create, tconstruct, thermal } = event.getRecipes()
	let Inc = Object.freeze({
		OBSIDIAN_PLATE: "create:unprocessed_obsidian_sheet"
	})

	// 致密坚固板
	create.sequenced_assembly("cmi:dense_sturdy_sheet", "#forge:plates/obsidian", [
		create.filling(Inc.OBSIDIAN_PLATE, [
			Inc.OBSIDIAN_PLATE,
			Fluid.of("tconstruct:molten_obsidian", 250)
		]),
		create.deploying(Inc.OBSIDIAN_PLATE, [
			Inc.OBSIDIAN_PLATE,
			"create:sturdy_sheet"
		]),
		create.pressing(Inc.OBSIDIAN_PLATE, [
			Inc.OBSIDIAN_PLATE
		])
	]).transitionalItem(Inc.OBSIDIAN_PLATE).loops(1)
})
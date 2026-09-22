ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 并行升级 +1
	create.mechanical_crafting("cmi:2_parallel_upgrade", [
		" A ",
		"BCB",
		" D "
	], {
		A: "#forge:gears/gold",
		B: ["#forge:ingots/silver", "#forge:plates/silver"],
		C: "thermal:rf_coil",
		D: Mechanisms.COBALT.COM
	})
})
ServerEvents.recipes((event) => {
	let { createaddition } = event.getRecipes()

	// 充能紫水晶
	createaddition.charging("cmi:charged_amethyst", [
		"#forge:gems/amethyst"
	]).energy(400)

	createaddition.charging("cmi:overcharged_alloy_ingot", [
		"create:chromatic_compound"
	]).energy(5000)

	// 幻晶晶种
	createaddition.charging("2x cmi:dreamcore_seed", [
		"cmi:dreamcore_crystal"
	]).energy(400)
})
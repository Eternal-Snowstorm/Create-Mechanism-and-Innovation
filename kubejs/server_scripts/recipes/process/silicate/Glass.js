ServerEvents.recipes((event) => {
	let { create, vintageimprovements } = event.getRecipes()

	// 石英粉
	create.crushing("thermal:quartz_dust", [
		"#forge:gems/quartz"
	])
	create.milling("thermal:quartz_dust", [
		"#forge:gems/quartz"
	])

	// 纯净沙
	create.emptying([
		Fluid.of("cmi:pure_sand", 100),
		"thermal:niter_dust"
	], [
		"#minecraft:sand"
	])

	// 纯净石英粉
	vintageimprovements.pressurizing([
		"cmi:pure_quartz_dust",
		"thermal:slag"
	], [
		"#forge:dusts/quartz",
		"cmi:lime_dust"
	]).heated()

	vintageimprovements.pressurizing([
		"cmi:pure_quartz_dust",
		"thermal:slag"
	], [
		Fluid.of("cmi:pure_sand", 100),
		"cmi:lime_dust"
	]).heated()

	// 玻璃
	create.mixing(Fluid.of("tconstruct:molten_glass", 250), [
		Fluid.of("cmi:pure_sand", 200),
		"#forge:dusts/lime"
	]).heated()

	create.mixing(Fluid.of("tconstruct:molten_glass", 250), [
		Fluid.of("cmi:pure_sand", 200),
		"cmi:plant_ash"
	]).heated()

	create.mixing(Fluid.of("tconstruct:molten_glass", 250), [
		Fluid.of("tconstruct:molten_quartz", 200),
		"#forge:dusts/lime"
	]).heatRequirement(CmiHeatLevel.GRILLED)

	create.mixing(Fluid.of("tconstruct:molten_glass", 250), [
		Fluid.of("tconstruct:molten_quartz", 200),
		"cmi:plant_ash"
	]).heatRequirement(CmiHeatLevel.GRILLED)
})

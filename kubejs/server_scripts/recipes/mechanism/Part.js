ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, neoecoae } = event.getRecipes()

	// 基础
	kubejs.shapeless("4x cmi:basic_mechanism_part", [
		"#forge:plates/stone",
		"#forge:gems/dreamcore"
	])

	// 魔力
	kubejs.shapeless("cmi:magical_mechanism_part", [
		"#forge:dusts/lapis",
		"#forge:gems/amethyst",
		"#forge:gems/dreamcore"
	])

	// 机械
	kubejs.shapeless("4x cmi:mechanical_mechanism_part", [
		"#forge:gears/wooden",
		"#forge:plates/andesite_alloy",
		"#forge:gems/dreamcore"
	])

	// 工程
	thermal_extra.component_assembly("4x cmi:engineering_mechanism_part", [
		"#forge:plates/constantan",
		"#immersiveengineering:circuits/logic",
		"#forge:gems/dreamcore",
		Fluid.of("tconstruct:molten_signalum", 90)
	])

	// 通量
	kubejs.shapeless("cmi:flux_mechanism_part", [
		"#forge:plates/invar",
		"thermal:rf_coil",
		"#forge:gems/dreamcore",
		"#forge:plates/signalum"
	])

	thermal_extra.component_assembly("4x cmi:flux_mechanism_part", [
		"#forge:plates/invar",
		"thermal:rf_coil",
		"#forge:gems/dreamcore",
		Fluid.of("tconstruct:molten_signalum", 90)
	])

	// 通用
	neoecoae.integrated_working_station()
		.itemOutput("4x cmi:mekanism_mechanism_part")
		.inputFluid(Fluid.of("tconstruct:molten_cobalt", 180))
		.energy(1000)
		.inputItems([
			"#forge:plates/osmium",
			"#forge:gears/chromeplated_steel",
			"#forge:gems/dreamcore"
		])

	// 太空
	neoecoae.integrated_working_station()
		.itemOutput("4x cmi:space_mechanism_part")
		.inputFluid(Fluid.of("cmi:molten_etrium", 90))
		.energy(1000)
		.inputItems([
			"extendedae_plus:oblivion_singularity",
			"2x ae2:sky_dust",
			"#forge:gems/dreamcore"
		])

	// 量子
	neoecoae.integrated_working_station()
		.itemOutput("4x cmi:quantum_mechanism_part")
		.inputFluid(Fluid.of("neoecoae:cryotheum_solution", 200))
		.energy(1000)
		.inputItems([
			"extendedae_plus:oblivion_singularity",
			"cmi:entro_alloy",
			"#forge:gems/dreamcore"
		])
})
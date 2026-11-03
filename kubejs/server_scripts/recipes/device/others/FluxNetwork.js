ServerEvents.recipes((event) => {
	let { neoecoae, kubejs } = event.getRecipes()

	// 通量方块
	kubejs.shaped("fluxnetworks:flux_block", [
		"ABA",
		"BCB",
		"ABA"
	], {
		A: "fluxnetworks:flux_dust",
		B: "fluxnetworks:flux_core",
		C: "ae2:smooth_sky_stone_block"
	}).id("fluxnetworks:fluxblock")

	// 通量核心
	neoecoae.integrated_working_station()
		.itemOutput("2x fluxnetworks:flux_core")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"4x fluxnetworks:flux_dust",
			"#forge:plates/silicon",
			"#forge:plates/etrium"
		]).id("fluxnetworks:fluxcore")

	// 网络控制器
	neoecoae.integrated_working_station()
		.itemOutput("fluxnetworks:flux_controller")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"fluxnetworks:flux_block",
			Mechanisms.COMPUTE.COM,
			"2x #forge:plates/silicon",
			"4x fluxnetworks:flux_dust",
			"4x neoecoae:energized_superconductive_ingot"
		]).id("fluxnetworks:fluxcontroller")

	// 网络接入点
	neoecoae.integrated_working_station()
		.itemOutput("4x fluxnetworks:flux_point")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"fluxnetworks:flux_block",
			"4x neoecoae:energized_superconductive_ingot",
			"ae2:formation_core"
		]).id("fluxnetworks:fluxpoint")

	// 网络输入点
	neoecoae.integrated_working_station()
		.itemOutput("4x fluxnetworks:flux_plug")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 200))
		.inputItems([
			"fluxnetworks:flux_block",
			"4x neoecoae:energized_superconductive_ingot",
			"ae2:annihilation_core"
		]).id("fluxnetworks:fluxplug")

	// 小储能器
	neoecoae.integrated_working_station()
		.itemOutput("fluxnetworks:basic_flux_storage")
		.inputFluid(Fluid.of("cmi:ferrouslime", 250))
		.inputItems([
			"mekanism:basic_energy_cube",
			"fluxnetworks:flux_block",
			Mechanisms.COMPUTE.COM,
			"#forge:circuits/advanced",
			"4x fluxnetworks:flux_dust",
			"4x neoecoae:energized_superconductive_ingot"
		]).id("fluxnetworks:basicfluxstorage")

	// 中储能器
	neoecoae.integrated_working_station()
		.itemOutput("fluxnetworks:herculean_flux_storage")
		.inputFluid(Fluid.of("cmi:ferrouslime", 250))
		.inputItems([
			"fluxnetworks:basic_flux_storage",
			"fluxnetworks:flux_block",
			Mechanisms.COMPUTE.COM,
			"#forge:circuits/elite",
			"4x fluxnetworks:flux_dust",
			"4x neoecoae:energized_superconductive_ingot"
		]).id("fluxnetworks:herculeanfluxstorage")

	// 大储能器
	neoecoae.integrated_working_station()
		.itemOutput("fluxnetworks:gargantuan_flux_storage")
		.inputFluid(Fluid.of("cmi:ferrouslime", 250))
		.inputItems([
			"fluxnetworks:herculean_flux_storage",
			"fluxnetworks:flux_block",
			Mechanisms.COMPUTE.COM,
			"#forge:circuits/ultimate",
			"4x fluxnetworks:flux_dust",
			"4x neoecoae:energized_superconductive_ingot"
		]).id("fluxnetworks:gargantuanfluxstorage")
})
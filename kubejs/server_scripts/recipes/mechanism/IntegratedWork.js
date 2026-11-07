ServerEvents.recipes((event) => {
	let { neoecoae } = event.getRecipes()

	function addRecipe() {
		return neoecoae.integrated_working_station()
	}

	// 气密构件
	addRecipe()
		.itemOutput(Mechanisms.AIR.COM)
		.inputItems([Mechanisms.AIR.BAS,
			"steam_letters:empty_steam_container",
			"#forge:plates/polyolefin",
			"ae2:quartz_glass",
		Mechanisms.PART.GENERAL
		])
		.inputFluid(Fluid.of("cmi:silicon_rubber", 100))
		.energy(16000)

	// 计算构件
	addRecipe()
		.itemOutput(Mechanisms.COMPUTE.COM)
		.inputItems([Mechanisms.COMPUTE.BAS,
		Processor.CONCURRENT,
		Processor.SUPERCONDUCTING,
			"fluxnetworks:flux_core",
		Mechanisms.PART.GENERAL
		])
		.inputFluid(Fluid.of("cmi:structural_plastic", 200))
		.energy(16000)

	// 基础通用构件
	addRecipe()
		.itemOutput(Mechanisms.BASIC.COM)
		.inputItems([Mechanisms.BASIC.BAS,
			"#forge:circuits/basic",
			"#forge:gears/chromeplated_steel",
			"#forge:plates/silicon_rubber",
		Mechanisms.PART.GENERAL
		])
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 200))
		.energy(16000)

	// 高级通用构件
	addRecipe()
		.itemOutput(Mechanisms.ADVANCED.COM)
		.inputItems([Mechanisms.ADVANCED.BAS,
			"#forge:circuits/advanced",
			"#forge:gears/chromeplated_steel",
			"#forge:plates/silicon_rubber",
		Mechanisms.PART.GENERAL
		])
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 200))
		.energy(16000)

	// 精英通用构件
	addRecipe()
		.itemOutput(Mechanisms.ELITE.COM)
		.inputItems([Mechanisms.ELITE.BAS,
			"#forge:circuits/elite",
			"#forge:gears/chromeplated_steel",
			"#forge:plates/silicon_rubber",
		Mechanisms.PART.GENERAL
		])
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 200))
		.energy(16000)

	// 终极通用构件
	addRecipe()
		.itemOutput(Mechanisms.ULTIMATE.COM)
		.inputItems([Mechanisms.ULTIMATE.BAS,
			"#forge:circuits/ultimate",
			"#forge:gears/chromeplated_steel",
			"#forge:plates/silicon_rubber",
		Mechanisms.PART.GENERAL
		])
		.inputFluid(Fluid.of("immersiveengineering:redstone_acid", 200))
		.energy(16000)

	// 航空构件
	addRecipe()
		.itemOutput(Mechanisms.AERO.COM)
		.inputItems([Mechanisms.AERO.BAS,
			"ad_astra:oxygen_gear",
			"#forge:wires/fluix",
			"#forge:plates/aluminum_alloy",
		Mechanisms.PART.SPACE
		])
		.inputFluid(Fluid.of("cmi:structural_plastic", 200))
		.energy(16000)

	// 宇航构件
	addRecipe()
		.itemOutput(Mechanisms.ASTRO.COM)
		.inputItems([Mechanisms.ASTRO.BAS,
			"cmi:nuke_cooler",
			"#forge:wires/fluix",
			"#forge:plates/titanium",
		Mechanisms.PART.SPACE
		])
		.inputFluid(Fluid.of("cmi:structural_plastic", 200))
		.energy(16000)

	// 核能构件
	addRecipe()
		.itemOutput(Mechanisms.NUKE.COM)
		.inputItems([Mechanisms.NUKE.BAS,
			"#forge:plates/composite_tungsten_steel",
			"cmi:nuke_cooler",
			"alexscaves:fissile_core",
		Mechanisms.PART.QUANTUM
		])
		.inputFluid(Fluid.of("cmi:silicon_rubber", 100))
		.energy(16000)

	// 反物质构件
	addRecipe()
		.itemOutput(Mechanisms.ANTI.COM)
		.inputItems([Mechanisms.ANTI.BAS,
			"#forge:pellets/plutonium",
			"#forge:pellets/polonium",
			"cmi:titanium_alloy_coil",
		Mechanisms.PART.QUANTUM
		])
		.inputFluid(Fluid.of("cmi:ferrouslime", 250))
		.energy(16000)
})
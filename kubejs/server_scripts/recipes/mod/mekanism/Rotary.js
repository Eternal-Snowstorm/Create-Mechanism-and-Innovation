ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// Fluid.tag() 的 toJson 输出 {"amount": N, "tag": "..."}，
	// 而 Mekanism rotary 的流体输入只认 "fluid" 字符串（解析错误 "Missing fluid, expected to find a string"）。
	// 与 TConCasting 同理：先把 forge 流体 tag 解析成具体流体 id，再用 Fluid.of() 输出 {"fluid": ...}。
	function rotaryWithTag(fluidTag, gasId, id) {
		let fluid = Ingredient.getFluidString(fluidTag)

		if (fluid === null) {
			console.warn(`No fluid found under ${fluidTag}, skipping rotary recipe ${id}`)
			return
		}

		mekanism.rotary()
			.fluidInput(Fluid.of(fluid, 200))
			.fluidOutput(Fluid.of(fluid, 200))
			.gasInput(MekType.Gas.of(gasId, 200))
			.gasOutput(MekType.Gas.of(gasId, 200))
			.id(id)
	}

	rotaryWithTag("forge:brine", "mekanism:brine", "mekanism:rotary/brine")
	rotaryWithTag("forge:chlorine", "mekanism:chlorine", "mekanism:rotary/chlorine")
	rotaryWithTag("forge:ethene", "mekanism:ethene", "mekanism:rotary/ethene")
	rotaryWithTag("forge:hydrofluoric_acid", "mekanism:hydrofluoric_acid", "mekanism:rotary/hydrofluoric_acid")
	rotaryWithTag("forge:hydrogen_chloride", "mekanism:hydrogen_chloride", "mekanism:rotary/hydrogen_chloride")
	rotaryWithTag("forge:hydrogen", "mekanism:hydrogen", "mekanism:rotary/hydrogen")
	rotaryWithTag("forge:lithium", "mekanism:lithium", "mekanism:rotary/lithium")
	rotaryWithTag("forge:oxygen", "mekanism:oxygen", "mekanism:rotary/oxygen")
	rotaryWithTag("forge:sodium", "mekanism:sodium", "mekanism:rotary/sodium")
	rotaryWithTag("forge:steam", "mekanism:steam", "mekanism:rotary/steam")
	rotaryWithTag("forge:sulfur_dioxide", "mekanism:sulfur_dioxide", "mekanism:rotary/sulfur_dioxide")
	rotaryWithTag("forge:sulfur_trioxide", "mekanism:sulfur_trioxide", "mekanism:rotary/sulfur_trioxide")
	rotaryWithTag("forge:sulfuric_acid", "mekanism:sulfuric_acid", "mekanism:rotary/sulfuric_acid")
	rotaryWithTag("forge:superheated_sodium", "mekanism:superheated_sodium", "mekanism:rotary/superheated_sodium")
	rotaryWithTag("forge:uranium_hexafluoride", "mekanism:uranium_hexafluoride", "mekanism:rotary/uranium_hexafluoride")
	rotaryWithTag("forge:uranium_oxide", "mekanism:uranium_oxide", "mekanism:rotary/uranium_oxide")
	rotaryWithTag("minecraft:water", "mekanism:water_vapor", "mekanism:rotary/water")

	mekanism.rotary()
		.fluidInput(Fluid.of("cmi:radon", 200))
		.fluidOutput(Fluid.of("cmi:radon", 200))
		.gasInput(MekType.Gas.of("cmi:radon", 200))
		.gasOutput(MekType.Gas.of("cmi:radon", 200))

	mekanism.rotary()
		.fluidInput(Fluid.of("cmi:mercury", 200))
		.fluidOutput(Fluid.of("cmi:mercury", 200))
		.gasInput(MekType.Gas.of("cmi:mercury", 200))
		.gasOutput(MekType.Gas.of("cmi:mercury", 200))

	mekanism.rotary()
		.fluidInput(Fluid.of("neoecoae:cryotheum_solution", 200))
		.fluidOutput(Fluid.of("neoecoae:cryotheum_solution", 200))
		.gasInput(MekType.Gas.of("cmi:hydrogen_oxygen_fuel", 200))
		.gasOutput(MekType.Gas.of("cmi:hydrogen_oxygen_fuel", 200))
		.id("neoecoae:integrated_working_station/cryotheum_solution")

	mekanism.rotary()
		.fluidInput(Fluid.of("cmi:nitrogen_oxide", 200))
		.fluidOutput(Fluid.of("cmi:nitrogen_oxide", 200))
		.gasInput(MekType.Gas.of("cmi:nitrogen_oxide", 200))
		.gasOutput(MekType.Gas.of("cmi:nitrogen_oxide", 200))

	mekanism.rotary()
		.fluidInput(Fluid.of("cmi:light_olefin", 200))
		.fluidOutput(Fluid.of("cmi:light_olefin", 200))
		.gasInput(MekType.Gas.of("cmi:light_olefin", 200))
		.gasOutput(MekType.Gas.of("cmi:light_olefin", 200))
})

StartupEvents.registry("block", (event) => {
	const Materials = {
		castIron: SlApis.loadResource("cast_iron"),
		steel: SlApis.loadResource("steel")
	}

	event.create("cmi:cast_iron_solar_boiler", "steam_letters:solar")
		.material(Materials.castIron)
		.production(24)
		.capacity(16000)

	event.create("cmi:cast_iron_boiler", "steam_letters:boiler")
		.material(Materials.castIron)
		.production(24.0)
		.capacity(16000)

	event.create("cmi:cast_iron_solid_burner", "steam_letters:solid_burner")
		.material(Materials.castIron)

	event.create("cmi:cast_iron_fluid_burner", "steam_letters:fluid_burner")
		.material(Materials.castIron)

	event.create("cmi:cast_iron", "steam_letters:engine_and_flywheel")
		.material(Materials.castIron)
		.strength(32768)
		.speed(32)
		.consumption(24)
		.capacity(16000)

	event.create("cmi:steel_solar_boiler", "steam_letters:solar")
		.material(Materials.steel)
		.production(48)
		.capacity(32000)

	event.create("cmi:steel_boiler", "steam_letters:boiler")
		.material(Materials.steel)
		.production(48.0)
		.capacity(32000)

	event.create("cmi:steel_solid_burner", "steam_letters:solid_burner")
		.material(Materials.steel)

	event.create("cmi:steel_fluid_burner", "steam_letters:fluid_burner")
		.material(Materials.steel)

	event.create("cmi:steel", "steam_letters:engine_and_flywheel")
		.material(Materials.steel)
		.strength(65536)
		.speed(32)
		.consumption(48)
		.capacity(32000)
})
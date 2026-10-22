StartupEvents.registry("block", (event) => {
	event.create("cmi:cast_iron_solar_boiler", "steam_letters:solar")
		.material("steam_letters:cast_iron")
		.production(24)
		.capacity(16000)

	event.create("cmi:cast_iron_boiler", "steam_letters:boiler")
		.capacity(16000)
		.production(24.0)
		.material("steam_letters:cast_iron")

	event.create("cmi:cast_iron_solid_burner", "steam_letters:solid_burner")
		.material("steam_letters:cast_iron")

	event.create("cmi:cast_iron_fluid_burner", "steam_letters:fluid_burner")
		.material("steam_letters:cast_iron")

	event.create("cmi:cast_iron_steam_engine", "steam_letters:steam_engine")
		.material("steam_letters:cast_iron")
		.strength(32768)
		.speed(32)
		.consumption(24)
		.storage(16000)

	event.create("cmi:steel_solar_boiler", "steam_letters:solar")
		.material("steam_letters:steel")
		.production(48)
		.capacity(32000)

	event.create("cmi:steel_boiler", "steam_letters:boiler")
		.capacity(32000)
		.production(48.0)
		.material("steam_letters:steel")

	event.create("cmi:steel_solid_burner", "steam_letters:solid_burner")
		.material("steam_letters:steel")

	event.create("cmi:steel_fluid_burner", "steam_letters:fluid_burner")
		.material("steam_letters:steel")

	event.create("cmi:steel_steam_engine", "steam_letters:steam_engine")
		.material("steam_letters:steel")
		.strength(65536)
		.speed(32)
		.consumption(48)
		.storage(32000)
})
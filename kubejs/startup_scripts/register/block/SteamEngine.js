StartupEvents.registry("block", (event) => {
	const Materials = {
		getCastIron() {
			return SlApis.loadResource("cast_iron")
		},
		getSteel() {
			return SlApis.loadResource("steel")
		}
	}

	event.create("cmi:cast_iron_solar_boiler", "steam_letters:solar")
		.material(Materials.getCastIron())
		.production(24)
		.capacity(16000)

	event.create("cmi:cast_iron_boiler", "steam_letters:boiler")
		.material(Materials.getCastIron())
		.production(24.0)
		.capacity(16000)

	event.create("cmi:cast_iron_solid_burner", "steam_letters:solid_burner")
		.material(Materials.getCastIron())

	event.create("cmi:cast_iron_fluid_burner", "steam_letters:fluid_burner")
		.material(Materials.getCastIron())

	event.create("cmi:cast_iron", "steam_letters:engine_and_flywheel")
		.material(Materials.getCastIron())
		.strength(32768)
		.speed(32)
		.consumption(24)
		.capacity(16000)

	event.create("cmi:steel_solar_boiler", "steam_letters:solar")
		.material(Materials.getSteel())
		.production(48)
		.capacity(32000)

	event.create("cmi:steel_boiler", "steam_letters:boiler")
		.material(Materials.getSteel())
		.production(48.0)
		.capacity(32000)

	event.create("cmi:steel_solid_burner", "steam_letters:solid_burner")
		.material(Materials.getSteel())

	event.create("cmi:steel_fluid_burner", "steam_letters:fluid_burner")
		.material(Materials.getSteel())

	event.create("cmi:steel", "steam_letters:engine_and_flywheel")
		.material(Materials.getSteel())
		.strength(65536)
		.speed(32)
		.consumption(48)
		.capacity(32000)
})
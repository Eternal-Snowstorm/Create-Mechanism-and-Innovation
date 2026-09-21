MbtoolKJSEvents.InitMbtoolStructures((event) => {
	let { structures } = event

	if (CmiGlobal.isDebug) {
		for (let i = 0; i < structures.length; i++) {
			console.log(structures[i].getId().toString())
		}
	}

	removeStructure("ballmill")
	removeStructure("coker")
	removeStructure("derrick")
	removeStructure("distillation_tower")
	removeStructure("hpru")
	removeStructure("oil_tank")
	removeStructure("pumpjack")
	removeStructure("big_alternator")
	removeStructure("big_steam_turbine")
	removeStructure("centrifuge")
	removeStructure("chemical_reactor")
	removeStructure("core_drill")
	removeStructure("crude_bloomery")
	removeStructure("crystallizer")
	removeStructure("geothermal_exchanger")
	removeStructure("gravity_separator")
	removeStructure("heat_exchanger")
	removeStructure("pelletizer")
	removeStructure("reverberation_furnace")
	removeStructure("rotary_kiln")
	removeStructure("small_chemical_reactor")
	removeStructure("alternator")
	removeStructure("boiler_tank")
	removeStructure("cooling_tower")
	removeStructure("distiller")
	removeStructure("gas_turbine")
	removeStructure("liquid_burner")
	removeStructure("solar_melting_tower")
	removeStructure("solar_reflector")
	removeStructure("solar_tower")
	removeStructure("solid_burner")
	removeStructure("steel_fluid_tank")

	/**
	 * 
	 * @param {string} structure 
	 */
	function removeStructure(structure) {
		for (let i = 0; i < structures.length; i++) {
			let idStr = structures[i].getId() ? structures[i].getId().toString() : ""

			/*
			 * 日志里出现过两种 ID 形式, 都匹配:
			 * mbtool.structure.ballmill
			 * mbtool:mbtool_structures/ballmill.nbt
			 */
			let isTarget = idStr === `mbtool:mbtool_structures/${structure}.nbt`
				|| idStr === `mbtool.structure.${structure}`

			if (isTarget) {
				let nbt = structures[i].getStructureNbt()

				if (nbt.palette && nbt.palette[0]) {
					nbt.palette[0].Name = "cmi:1145141919810"
					structures[i].setStructureNbt(nbt)
				}
			}
		}

		if (CmiGlobal.isDebug) {
			console.info(`remove structure: ${structure}`)
		}
	}
})
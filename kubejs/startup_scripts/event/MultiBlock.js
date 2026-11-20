/**
 * This script can be hot reloaded with "kjs reload starup_scripts" or "-re"
 * 这个脚本可以用"kjs reload starup_scripts"或"-re"进行热重载
 */
IEEvents.multiblockForm((event) => {
	let { player, multiblock } = event

	const Namespace = Object.freeze({
		IE: "immersiveengineering",
		II: "immersiveindustry"
	})

	const Multiblocks = Object.freeze({
		IE: Object.freeze({
			ALLOT_SMELTER: "alloy_smelter",
			ASSEMBLER: "assembler",
			AUTO_WORKBENCH: "auto_workbench",
			BLAST_FURNACE: "blast_furnace",
			BOTTLING_MACHINE: "bottling_machine",
			COKE_OVEN: "coke_oven",
			CRUSHER: "crusher",
			DIESEL_GENERATOR: "diesel_generator",
			EXCAVATOR_FULL: "excavator_full",
			FERMENTER: "fermenter",
			IMPROVED_BLAST_FURNACE: "improved_blast_furnace",
			LIGHTNING_ROD: "lightning_rod",
			METAL_PRESS: "metal_press",
			MIXER: "mixer",
			REFINERY: "refinery",
			SAWMILL: "sawmill",
			SHEETMETAL_TANK: "sheetmetal_tank",
			SILO: "silo",
			SQUEEZER: "squeezer"
		}),
		II: Object.freeze({
			STEAM_TURBINE: "steam_turbine",
			CAR_KILN: "car_kiln",
			CHEMICAL_REACTOR: "chemical_reactor",
			CRUCIBLE: "crucible",
			INDUSTRIAL_ELECTROLYZER: "industrial_electrolyzer",
			ROTARY_KILN: "rotary_kiln"
		}),
		CMI: Object.freeze({})
	})

	/**
	 * 
	 * @param {string} namespace 命名空间
	 * @param {string} id 多方块id
	 * @returns 
	 */
	function disableMultiblock(namespace, id) {
		let multiblockId = ResourceLocation.fromNamespaceAndPath(
			namespace,
			`multiblocks/${id}`
		)

		if (multiblock === multiblockId) {
			let tranKey = Component.translatable("message.cmi.disabled_multiblock")
				.red()
				.bold()
			player.displayClientMessage(tranKey, true)

			event.cancel()
			return true
		}
		return false
	}

	disableMultiblock(Namespace.IE, Multiblocks.IE.ALLOT_SMELTER)
	disableMultiblock(Namespace.IE, Multiblocks.IE.CRUSHER)
})
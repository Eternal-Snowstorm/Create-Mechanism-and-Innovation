let $StructureUtils =
	Java.loadClass("com.chaosthedude.explorerscompass.util.StructureUtils")
let $BiomeUtils =
	Java.loadClass("com.chaosthedude.naturescompass.util.BiomeUtils")

PlayerEvents.chat((event) => {
	let { message, level, player } = event

	if (message === "-ex") {
		let structures = $StructureUtils.getAllowedStructureKeys(level)
		let biomes = $BiomeUtils.getAllowedBiomeKeys(level)
		let result = {}

		biomes.forEach((id) => {
			let path = String(id.getPath())
				.replace(/\//g, ".")
			let key = "biome." + id.getNamespace() + "." + path
			result[key] = ""
		})

		structures.forEach((id) => {
			let path = String(id.getPath())
				.replace(/\//g, ".")
			let key = "structure." + id.getNamespace() + "." + path
			result[key] = ""
		})

		JsonIO.write("compass_langkey.json", result)
		player.tell(Component.literal("Done!"))
		event.cancel()
	}
})
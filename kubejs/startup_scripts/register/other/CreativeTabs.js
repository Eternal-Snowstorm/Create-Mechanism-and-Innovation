StartupEvents.registry("creative_mode_tab", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addCreativeTab(name) {
		return event.create(`${Cmi.MODID}:${name}`)
	}

	addCreativeTab("io_block")
		.icon(() => Item.of("cmi:ponder_thermal_input"))
		.content(() => {
			return Ingredient.of("#cmi:io_debug_block").getItemIds()
		})
		.displayName(Component.translatable(`itemGroup.${Cmi.MODID}.io_block`))

	addCreativeTab("materials")
		.icon(() => Item.of("cmi:cast_iron_ingot"))
		.content(() => {
			return Ingredient.of("#cmi:ores").getItemIds()
				.concat(Ingredient.of("#cmi:raw_metals").getItemIds())
		})
		.displayName(Component.translatable(`itemGroup.${Cmi.MODID}.materials`))

	addCreativeTab("developers")
		.icon(() => Item.of("cmi:re_construction"))
		.content(() => {
			return Ingredient.of("#cmi:dev_doll").getItemIds()
		})
		.displayName(Component.translatable(`itemGroup.${Cmi.MODID}.developers`))
})
StartupEvents.registry("creative_mode_tab", (event) => {
	/**
	 * 
	 * @param {string} name 
	 * @returns 
	 */
	function addCreativeTab(name) {
		let builder = event.create(`${Cmi.MODID}:${name}`)

		builder.displayName(Component.translatable(`itemGroup.${Cmi.MODID}.${name}`))

		return builder
	}

	addCreativeTab("io_block")
		.icon(() => {
			return Item.of("cmi:ponder_thermal_input")
		})
		.content(() => {
			return Ingredient.of("#cmi:io_debug_block").getItemIds()
		})

	addCreativeTab("materials")
		.icon(() => {
			return Item.of("cmi:cast_iron_ingot")
		})
		.content(() => {
			return Ingredient.of("#cmi:ores").getItemIds()
				.concat(Ingredient.of("#cmi:raw_metals").getItemIds())
		})

	addCreativeTab("developers")
		.icon(() => Item.of("cmi:re_construction"))
		.content(() => {
			return Ingredient.of("#cmi:dev_doll").getItemIds()
		})

	addCreativeTab("buckets")
		.icon(() => {
			return Item.of("cmi:sapphire_solution_bucket")
		})
		.content(() => {
			return Ingredient.of("cmi:bucket").getItemIds()
				.concat(Ingredient.of("#cmi:buckets").getItemIds())
		})

	addCreativeTab("incompletes")
		.icon(() => {
			return Item.of("cmi:incomplete_cobalt_mechanism")
		})
		.content(() => {
			return Ingredient.of("#cmi:incomplete_items").getItemIds()
		})
})
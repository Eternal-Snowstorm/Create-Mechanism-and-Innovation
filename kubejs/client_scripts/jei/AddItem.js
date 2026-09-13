JEIEvents.addItems((event) => {
	/**
	 * 
	 * @param {Internal.Ingredient_} item 
	 */
	function addItemToJEI(item) {
		event.add(item)
	}

	addItemToJEI("create:chromatic_compound")
	addItemToJEI("create:shadow_steel")
	addItemToJEI("create:shadow_steel_casing")
	addItemToJEI("create:refined_radiance")
	addItemToJEI("create:refined_radiance_casing")
	addItemToJEI("createdieselgenerators:pumpjack_hole")
	addItemToJEI("thermal:rf_coil")
	addItemToJEI("cmi:moon_cobalt_ore")
	addItemToJEI("cmi:gui_block")
})
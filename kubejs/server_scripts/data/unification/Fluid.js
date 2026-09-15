ServerEvents.highPriorityData((event) => {
	// 石油
	addUnification("crude_oil", [
		"ad_astra:oil",
		"thermal:crude_oil"
	], "createdieselgenerators:crude_oil")

	// 植物油
	addUnification("plant_oil", [
		"immersiveengineering:plantoil",
		"createaddition:seed_oil"
	], "createdieselgenerators:plant_oil")

	// 蒸汽
	addUnification("steam", [
		"steampowered:steam",
		"create_steam_ages:steam"
	], "mekanism:steam")

	// 杂酚油
	addUnification("creosote", [
		"thermal:creosote"
	], "immersiveengineering:creosote")

	// 汽油
	addUnification("gasoline", [
		"thermal_extra:gasoline"
	], "createdieselgenerators:gasoline")

	// 生物柴油
	addUnification("biodiesel", [
		"createaddition:bioethanol",
		"immersiveengineering:biodiesel",
		"mekanismgenerators:bioethanol"
	], "createdieselgenerators:biodiesel")

	// 凛冰
	addUnification("cryo", [
		"ad_astra:cryo_fuel"
	], "neoecoae:cryotheum_solution")

	// 细雪
	addUnification("power_snow", [
		"fluidlogistics:powder_snow",
		"tconstruct:powdered_snow"
	], "tconstruct:powdered_snow")

	/**
	 * 
	 * @param {string} name
	 * @param {Internal.Fluid | Internal.FluidTags | (Internal.Fluid | Internal.FluidTags)[]} fluids
	 * @param {Internal.Fluid} result
	 */
	function addUnification(name, fluids, result) {
		if (fluids === null) {
			console.error(`Fluids ${fluids} cannot be null`)
		}

		if (result === null) {
			console.error(`Result ${result} cannot be null`)
		}

		let fluidUnification = [
			{
				matchFluid: fluids,
				resultFluid: result
			}
		]

		event.addJson(`oef:replacements/${name}.json`, fluidUnification)
	}
})
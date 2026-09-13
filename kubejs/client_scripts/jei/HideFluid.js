let hideFluidList = [
	"thermal_extra:raw_zinc",
	"thermal_extra:raw_uranium",
	"thermal_extra:raw_aluminum",
	"thermal_extra:raw_copper",
	"thermal_extra:raw_gold",
	"thermal_extra:raw_iron",
	"thermal_extra:raw_lead",
	"thermal_extra:raw_nickel",
	"thermal_extra:raw_osmium",
	"thermal_extra:raw_silver",
	"thermal_extra:raw_tin",
	"thermal_extra:raw_arcane_gold"
]
JEIEvents.hideFluids((event) => {
	/**
	 * 
	 * @param {string} fluid 
	 */
	function hideFluidFromJEI(fluid) {
		event.hide(fluid)
	}

	hideFluidList.forEach((fluid) => {
		hideFluidFromJEI(fluid)
	})
})

JEIEvents.hideItems((event) => {
	hideFluidList.forEach((fluid) => {
		event.hide(`${fluid}_bucket`)
	})
})
ServerEvents.recipes((event) => {
	let { mekanism, thermal, thermal_extra, create, createaddition, vintageimprovements, tconstruct, cmi, kubejs } = event.recipes

	// 重组幻晶
	mekanism.nucleosynthesizing(
		Dreamcores.ORE.withCount(2),
		MekType.Gas.of("mekanism:antimatter", 5),
		Dreamcores.RECOMBINE
	).duration(20 * 5)

	// 富集幻晶
	mekanism.enriching(Dreamcores.ENRICHED,
		Dreamcores.RECOMBINE
	)

	// 电解幻晶
	cmi.electrolyzer()
		.inputItems(Dreamcores.ENRICHED)
		.inputFluids(MBDFluidIngredient.ofTagId("forge:redstone_acid", 500))
		.outputItems(Dreamcores.ELECTROLIZED)
		.duration(20 * 5)

	// 幻晶源质
	thermal_extra.nitratic_igniter([
		Dreamcores.SOURCE
	], Dreamcores.ELECTROLIZED)

	// 热解幻晶
	thermal.pyrolyzer(Dreamcores.PYROLYSIS, [
		Dreamcores.SOURCE
	])

	// 充能幻晶
	createaddition.charging(Dreamcores.CHARGED, [
		Dreamcores.PYROLYSIS
	]).energy(5000)

	// 熔融幻晶
	vintageimprovements.pressurizing(Dreamcores.MOLTEN, [
		Dreamcores.CHARGED
	]).heated().processingTime(80)

	// 固化幻晶
	create.compacting(Dreamcores.SOLIDIFIED, [
		Dreamcores.MOLTEN
	]).heated()

	// 革新幻晶
	tconstruct.casting_table(Dreamcores.INNOVATION)
		.cast(Dreamcores.SEED)
		.fluid(Dreamcores.SOLIDIFIED)
		.cooling_time(20 * 2)
		.cast_consumed(true)

	// 终章构件零件
	kubejs.shapeless(Mechanisms.PART.FINAL.withCount(2), [
		Dreamcores.INNOVATION
	])

})
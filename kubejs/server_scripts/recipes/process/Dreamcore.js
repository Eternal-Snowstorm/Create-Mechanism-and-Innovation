ServerEvents.recipes((event) => {
	let { mekanism, thermal, thermal_extra, create, createaddition, vintageimprovements, tconstruct, cmi, kubejs } = event.recipes

	// 重组幻晶
	mekanism.nucleosynthesizing(
		Material.Dreamcores.ORE.withCount(2),
		MekType.Gas.of("mekanism:antimatter", 5),
		Material.Dreamcores.RECOMBINE
	).duration(20 * 5)

	// 富集幻晶
	mekanism.enriching(Material.Dreamcores.ENRICHED,
		Material.Dreamcores.RECOMBINE
	)

	// 电解幻晶
	cmi.electrolyzer()
		.inputItems(Material.Dreamcores.ENRICHED)
		.outputItems(Material.Dreamcores.ELECTROLIZED)
		.duration(20 * 5)
		// .inputFluids(MBDFluidIngredient.ofTagId("forge:redstone_acid", 500))

	// 幻晶源质
	thermal_extra.nitratic_igniter([
		Material.Dreamcores.SOURCE
	], Material.Dreamcores.ELECTROLIZED)

	// 热解幻晶
	thermal.pyrolyzer(Material.Dreamcores.PYROLYSIS, [
		Material.Dreamcores.SOURCE
	])

	// 充能幻晶
	// createaddition.charging(Material.Dreamcores.CHARGED, [
	//	Material.Dreamcores.PYROLYSIS
	// ]).energy(5000)
	event.custom({
		type: "ae2:charger",
		result: Material.Dreamcores.CHARGED.toJson(),
		ingredient: Material.Dreamcores.PYROLYSIS.toJson()
	})

	// 熔融幻晶
	vintageimprovements.pressurizing(Material.Dreamcores.MOLTEN, [
		Material.Dreamcores.CHARGED
	]).heated().processingTime(80)

	// 固化幻晶
	create.compacting(Material.Dreamcores.SOLIDIFIED, [
		Material.Dreamcores.MOLTEN
	]).heated()

	// 革新幻晶
	tconstruct.casting_table(Material.Dreamcores.INNOVATION)
		.cast(Material.Dreamcores.SEED)
		.fluid(Material.Dreamcores.SOLIDIFIED)
		.cooling_time(20 * 2)
		.cast_consumed(true)

	// 终章构件零件
	kubejs.shapeless(Mechanisms.PART.FINAL.withCount(2), [
		Material.Dreamcores.INNOVATION
	])

})
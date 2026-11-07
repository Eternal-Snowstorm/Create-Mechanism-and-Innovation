ServerEvents.recipes((event) => {
	let { mekanism, create, cmi } = event.getRecipes()

	// 热解月岩残渣
	cmi.electrolyzer()
		.inputItems("#ad_astra:moon_stones")
		.outputItems("cmi:pyrolyzed_moon_rock_residue")
		.outputGases("10x cmi:helium_3")
		.duration(20)

	// 活化
	mekanism.activating(
		MekType.Gas.of("cmi:helium_3", 1),
		MekType.Gas.of("mekanismgenerators:tritium", 1)
	).id("mekanismgenerators:activating/tritium")

	// 洗涤
	create.splashing([
		Item.of("cmi:machalite").withChance(0.6),
		Item.of("cmi:machalite_dust").withChance(0.3),
		Item.of("mekanism:dirty_dust_uranium").withChance(0.1)
	], "cmi:pyrolyzed_moon_rock_residue")

	// 磨粉
	mekanism.crushing(
		"cmi:machalite_dust",
		"cmi:machalite"
	)

	// 电解
	cmi.electrolyzer()
		.inputItems("4x cmi:machalite_dust")
		.inputFluids(Fluid.of("cmi:polysilicone_ether", 500))
		.outputFluids(Fluid.of("cmi:molten_pure_silicon", 1000))
		.duration(20 * 5)

})
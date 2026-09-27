ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	// 终章构件零件
	// mekanism.nucleosynthesizing(
	//	"#forge:ingots/overcharged_alloy",
	//	MekType.Gas.of("mekanism:antimatter", 5),
	//	"16x cmi:final_mechanism_part"
	// ).duration(200)

})
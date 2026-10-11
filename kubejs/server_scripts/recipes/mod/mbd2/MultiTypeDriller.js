ServerEvents.recipes((event) => {
	const { cmi } = event.getRecipes()

	cmi.multi_type_driller()
		.duration(10)
		.outputItems("cmi:deposit_dust")
		.blocksInStructure(9, IntWrapper.getMaxValue(), Block.getBlock("create_rns:iron_deposit_block"))
		.blocksInStructure(1, 1, Block.getBlock("cmi:driller_head"))
		.blocksInStructure(0, 0, Block.getBlock("cmi:driller_fluid_pump"))
		.blocksInStructure(0, 0, Block.getBlock("cmi:driller_gas_pump"))
		.id("cmi:driller/test_iron_head")
})
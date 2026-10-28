NebulaEvents.registerJeiAliases((event) => {
	// 集装箱 & 纸箱
	event.addItemAlias("mekanism:cardboard_box", "alias.cmi.cardboard_box")

	// 流体传输器 & (流体溜槽 & 铜溜槽)
	event.addItemAliases("fluidlogistics:fluid_transporter", [
		"alias.cmi.fluid_transporter.1",
		"alias.cmi.fluid_transporter.2"
	])
})
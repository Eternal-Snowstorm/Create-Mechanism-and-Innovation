// ignored: true
let $BlockStateProperties =
	Java.loadClass("net.minecraft.world.level.block.state.properties.BlockStateProperties")

CreateEvents.boilerHeatHandler((event) => {
	event.add("cmi:bronze_fluid_burner", (block) => {
		let state = block.getBlockState()

		if (state.getValue($BlockStateProperties.LIT) === true) {
			return 2
		}
		return 1
	})
})
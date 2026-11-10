ServerEvents.recipes((event) => {
	let { thermal } = event.getRecipes()

	// 冰碎片
	thermal.chiller("ad_astra:ice_shard", [
		Fluid.of("minecraft:water", 1000),
		"#tconstruct:casts/multi_use/nugget"
	]).energy(1000).keepIngredient([
		"thermal_extra:chiller_nugget_cast",
		"tconstruct:nugget_cast"
	])

	// 玻璃
	thermal.chiller("tconstruct:clear_glass", [
		Fluid.of("tconstruct:molten_glass", 1000)
	]).energy(1000)
})
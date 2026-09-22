ServerEvents.recipes((event) => {
	let { thermal } = event.getRecipes()

	// 聚烯烃板
	thermal.chiller("thermal_extra:polyolefin_plate", [
		Fluid.of("thermal_extra:polyolefin", 1000),
		"#tconstruct:casts/multi_use/plate"
	]).energy(8000).keepIngredient([
		"thermal_extra:chiller_plate_cast",
		"tconstruct:plate_cast"
	]).id("thermal_extra:machine/chiller/polyolefin")

	// 冰碎片
	thermal.chiller("ad_astra:ice_shard", [
		Fluid.of("minecraft:water", 1000),
		"#tconstruct:casts/multi_use/nugget"
	]).energy(1000).keepIngredient([
		"thermal_extra:chiller_nugget_cast",
		"tconstruct:nugget_cast"
	])

	// 单晶硅
	thermal.chiller("cmi:single_crystal_silicon", [
		Fluid.of("cmi:molten_pure_silicon", 250),
		"#tconstruct:casts/multi_use/gem"
	]).energy(8000).keepIngredient([
		"thermalconstruct:bronze_cast_gem",
		"tconstruct:gem_cast"
	])

	// 玻璃
	thermal.chiller("tconstruct:clear_glass", [
		Fluid.of("tconstruct:molten_glass", 90 * 9)
	]).energy(1000)
})
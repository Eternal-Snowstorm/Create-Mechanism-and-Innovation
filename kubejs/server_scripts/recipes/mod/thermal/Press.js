ServerEvents.recipes((event) => {
	let { thermal } = event.getRecipes()

	// 小型空弹壳
	thermal.press("2x immersiveengineering:empty_casing", [
		"#forge:ingots/brass",
		"cmi:bullet_mold"
	])

	// 木齿轮
	thermal.press("cmi:wooden_gear", [
		"4x #minecraft:planks",
		"cmi:gear_mold"
	])

	// 钛合金网
	thermal.press("2x cmi:titanium_alloy_mesh", [
		"cmi:titanium_alloy_plate",
		"cmi:unpack_mold"
	])

	// 红蓝宝石齿轮
	thermal.press("thermal:ruby_gear", [
		"4x #forge:gems/ruby",
		"cmi:gear_mold"
	])
	thermal.press("thermal:sapphire_gear", [
		"4x #forge:gems/sapphire",
		"cmi:gear_mold"
	])
})
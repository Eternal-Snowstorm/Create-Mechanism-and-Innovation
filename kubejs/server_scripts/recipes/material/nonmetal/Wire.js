ServerEvents.recipes((event) => {
	let { create, createaddition, thermal } = event.getRecipes()

	// 福鲁伊克斯线
	create.filling("cmi:fluix_wire", [
		"cmi:optical_fiber",
		Fluid.of("cmi:molten_fluix", 25)
	])

	// 玻璃纤维
	createaddition.rolling("2x cmi:glass_wire", [
		"cmi:glass_rod"
	]).id("createaddition:rolling/glass_wire")

	thermal.chiller("cmi:glass_wire", [
		Fluid.of("tconstruct:molten_glass", 50),
		"#tconstruct:casts/multi_use/wire"
	]).energy(500)
})

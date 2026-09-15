ServerEvents.recipes((event) => {
	let { create, fluidlogistics } = event.getRecipes()

	// 泥土
	create.compacting([
		"minecraft:dirt",
		Fluid.of("minecraft:water", 50)
	], Fluid.of("cmi:sludge_suspension", 100))

	// 植物油
	create.compacting(Fluid.of("createdieselgenerators:plant_oil", 100), [
		"#forge:seeds"
	])

	// 高定向热解石墨
	create.compacting("immersiveengineering:dust_hop_graphite", [
		"8x #forge:dusts/coal_coke"
	]).superheated().id("immersiveengineering:squeezer/graphite_dust")

	// 烈焰蛋糕胚
	create.compacting("create:blaze_cake_base", [
		Fluid.of("minecraft:milk", 250),
		"create:cinder_flour",
		"minecraft:sugar"
	]).id("create:compacting/blaze_cake")

	// 寒霜蛋糕胚
	fluidlogistics.cooling_compacting("cmi:frost_cake_base", [
		Fluid.of("minecraft:milk", 250),
		Fluid.of("tconstruct:powdered_snow", 250),
		"minecraft:sugar"
	])

	// 附魔蛋糕胚
	create.compacting("create_enchantment_industry:experience_cake_base", [
		Fluid.of("minecraft:milk", 250),
		["#forge:gems/lapis", "#forge:dusts/lapis"],
		"minecraft:sugar"
	]).id("create_enchantment_industry:compacting/experience_cake_base")
})
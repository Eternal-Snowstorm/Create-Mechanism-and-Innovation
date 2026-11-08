ServerEvents.recipes((event) => {
	let { create_enchantment_industry } = event.getRecipes()

	create_enchantment_industry.grinding([
		Fluid.of("create_enchantment_industry:experience", 500),
		Item.of("cmi:enchanted_mechanism")
	], Mechanisms.ENCHANTED.COM)

	create_enchantment_industry.grinding([
		Item.of("cmi:dreamcore_crystal"),
		Item.of("cmi:dreamcore_crystal").withChance(0.1)
	], "#forge:raw_materials/dreamcore")
})
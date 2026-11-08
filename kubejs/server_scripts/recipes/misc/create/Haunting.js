ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 恶魂之泪
	create.haunting(Item.of("minecraft:ghast_tear").withChance(0.12), [
		"#forge:gems/quartz"
	])

	// 恶魂意面
	create.haunting(Item.of("mynethersdelight:ghasta").withChance(0.12), [
		"minecraft:ghast_tear"
	])

	// 野生卷心菜
	create.haunting("farmersdelight:wild_cabbages", [
		"#forge:crops/cabbage"
	])

	// 野生洋葱
	create.haunting("farmersdelight:wild_onions", [
		"#forge:crops/onion"
	])

	// 野生胡萝卜
	create.haunting("farmersdelight:wild_carrots", [
		"#forge:vegetables/carrot"
	])

	// 野生土豆
	create.haunting("farmersdelight:wild_potatoes", [
		"minecraft:poisonous_potato"
	])
})
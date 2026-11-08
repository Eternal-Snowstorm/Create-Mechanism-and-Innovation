ServerEvents.recipes((event) => {
	let { kubejs, create } = event.getRecipes()

	// 燧石锤子
	kubejs.shaped("cmi:flint_hammer", [
		"AAA",
		"ABA",
		" B "
	], {
		A: "minecraft:flint",
		B: "#forge:rods/wooden"
	})

	// 钻石锤子
	kubejs.shaped("cmi:diamond_hammer", [
		"AAA",
		"ABA",
		" B "
	], {
		A: "#forge:gems/diamond",
		B: "#forge:rods/wooden"
	})

	// 超级刀
	create.filling("cmi:super_knife", [
		"farmersdelight:netherite_knife",
		Fluid.of("cmi:hyper_experience", 1000)
	])
})

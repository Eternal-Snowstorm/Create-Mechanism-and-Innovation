ServerEvents.recipes((event) => {
	let { cmi } = event.getRecipes()

	// 磨制石英棱镜
	cmi.grinding("cmi:polished_quartz_prism", [
		"minecraft:quartz"
	])

	// 充能紫水晶
	cmi.grinding("create_rns:polished_resonant_amethyst", [
		"cmi:charged_amethyst"
	])

	// 玫瑰石英
	cmi.grinding("create:polished_rose_quartz", [
		"create:rose_quartz"
	])

	// 幻晶原石
	cmi.grinding("cmi:dreamcore_crystal", [
		"cmi:dreamcore_ore"
	])
})
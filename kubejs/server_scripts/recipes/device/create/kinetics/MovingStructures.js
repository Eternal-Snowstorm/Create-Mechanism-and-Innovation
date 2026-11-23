ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 动力轴承
	kubejs.shaped("create:mechanical_bearing", [
		"A",
		"B",
		"C"
	], {
		A: "#minecraft:planks",
		B: Casing.ANDESITE,
		C: Mechanisms.ANDESITE.COM,
	}).id("create:crafting/kinetics/mechanical_bearing")

	// 动力活塞
	verticalDevice(kubejs, "create:mechanical_piston", "create:crafting/kinetics/mechanical_piston", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "create:piston_extension_pole",
	})

	// 起重机轴承
	verticalDevice(kubejs, "create:gantry_carriage", "create:crafting/kinetics/gantry_carriage", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "#create:cogwheel",
	})

	// 机械手
	verticalDevice(kubejs, "create:deployer", "create:crafting/kinetics/deployer", {
		A: Mechanisms.ANDESITE.COM,
		B: Casing.ANDESITE,
		C: "create:brass_hand"
	})

	// 发条轴承
	kubejs.shaped("create:clockwork_bearing", [
		"A",
		"B",
		"C"
	], {
		A: "#forge:plates/andesite_alloy",
		B: Casing.BRASS,
		C: Mechanisms.ANDESITE.COM
	}).id("create:crafting/kinetics/clockwork_bearing")
})
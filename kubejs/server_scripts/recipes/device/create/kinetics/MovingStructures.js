// Create · 运动与结构（轴承/活塞/起重机/发条/机械手）
ServerEvents.recipes((event) => {
	let { kubejs, create } = event.getRecipes()

	// 动力轴承
	kubejs.shaped("create:mechanical_bearing", [
		"X",
		"C",
		"M"
	], {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#minecraft:planks",
	}).id("create:crafting/kinetics/mechanical_bearing")


	// 动力活塞
	verticalDevice(kubejs, "create:mechanical_piston", "create:crafting/kinetics/mechanical_piston", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "create:piston_extension_pole",
	})


	// 起重机轴承
	verticalDevice(kubejs, "create:gantry_carriage", "create:crafting/kinetics/gantry_carriage", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "#create:cogwheel",
	})


	// 机械手
	verticalDevice(kubejs, "create:deployer", "create:crafting/kinetics/deployer", {
		M: Mechanisms.ANDESITE.COM,
		C: Casing.ANDESITE,
		X: "create:brass_hand"
	})


	// 发条轴承
	kubejs.shaped("create:clockwork_bearing", [
		"P",
		"C",
		"M"
	], {
		P: "#forge:plates/andesite_alloy",
		C: Casing.BRASS,
		M: Mechanisms.ANDESITE.COM
	}).id("create:crafting/kinetics/clockwork_bearing")
})

ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 催生器
	kubejs.shaped("cmi:accelerator", [
		"ABA",
		"CDC",
		"AEA"
	], {
		A: "#forge:stone",
		B: "#create:mechanisms/gold",
		C: "#create:mechanisms/stone",
		D: "#forge:gems/charged_amethyst",
		E: Mechanisms.IRON.COM
	}).id("cmi:accelerator")

	// 水井
	kubejs.shaped("cmi:water_well", [
		"ACA",
		"ABA",
		"AAA"
	], {
		A: "#forge:treated_wood",
		B: Mechanisms.COPPER.COM,
		C: "#forge:plates/iron"
	})

	// 熔岩井
	kubejs.shaped("cmi:lava_well", [
		"ACA",
		"ABA",
		"AAA"
	], {
		A: "tconstruct:nahuatl",
		B: Mechanisms.NETHER.COM,
		C: "#forge:plates/iron"
	})

	// 烈焰血井
	kubejs.shaped("cmi:blazing_blood_well", [
		"ACA",
		"ABA",
		"AAA"
	], {
		A: "tconstruct:blazewood",
		B: Mechanisms.NETHER.COM,
		C: "#forge:plates/iron"
	})

	// 钻井机冷却液端口
	kubejs.shapeless("cmi:driller_cooler_input_bus", [
		"cmi:airtight_casing",
		"cmi:nuke_cooler",
		"#forge:plates/industrial_iron"
	])

	kubejs.shapeless("cmi:driller_cooler_output_bus", [
		"cmi:airtight_casing",
		"cmi:nuke_cooler",
		"#forge:plates/industrial_iron"
	])
})
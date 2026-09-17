ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra } = event.getRecipes()

	// 燃煤发电机
	kubejs.shaped("ad_astra:coal_generator", [
		"ABA",
		"ACA",
		"DDD"
	], {
		A: ["#forge:ingots/iron", "#forge:plates/iron"],
		B: Mechanisms.IRON.COM,
		C: ["minecraft:furnace", "minecraft:blast_furnace", "minecraft:smoker"],
		D: "#forge:plates/industrial_iron",
	}).id("ad_astra:coal_generator")

	// 电力高炉
	thermal_extra.component_assembly("ad_astra:etrionic_blast_furnace", [
		"#forge:storage_blocks/steel",
		"#cmi:coils",
		Mechanisms.COIL.COM
	]).id("ad_astra:etrionic_blast_furnace")
})
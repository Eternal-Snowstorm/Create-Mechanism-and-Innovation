ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 通风口
	kubejs.shaped("4x ad_astra:vent", [
		"AAA",
		"B B",
		"AAA"
	], {
		A: "#forge:rods/iron",
		B: "#forge:plates/iron"
	}).id("ad_astra:vent")

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
})
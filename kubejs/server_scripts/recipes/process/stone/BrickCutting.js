ServerEvents.recipes((event) => {
	let { farmersdelight } = event.getRecipes()

	// 焦黑砖
	farmersdelight.cutting("4x tconstruct:seared_brick", [
		"tconstruct:seared_bricks"
	], "#minecraft:pickaxes")

	// 焦褐砖
	farmersdelight.cutting("4x tconstruct:scorched_brick", [
		"tconstruct:scorched_bricks"
	], "#minecraft:pickaxes")

	// 安山岩粉
	farmersdelight.cutting([
		Item.of("cmi:andesite_dust").withChance(0.25),
		Item.of("minecraft:gravel").withChance(0.75)
	], "#create:stone_types/andesite", "#forge:hammers")
})
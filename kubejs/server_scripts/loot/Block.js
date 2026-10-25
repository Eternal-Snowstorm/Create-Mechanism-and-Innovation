LootJS.modifiers((event) => {
	event.addBlockLootModifier("#cmi:grass_fiber")
		.matchMainHand("#forge:tools/knives")
		.addAlternativesLoot(LootUtils.setChanceLoot("cmi:grass_fiber", 0.5))

	event.addBlockLootModifier("ae2:mysterious_cube")
		.removeLoot(Ingredient.all)
		.addLoot("ae2:mysterious_cube")

	event.addBlockLootModifier("cmi:galena_compressed_iron_ore")
		.removeLoot(Ingredient.all)
		.addWeightedLoot([
			LootEntry.of("cmi:refined_iron_bloom")
				.withWeight(25)
				.applyOreBonus("minecraft:fortune")
				.simulateExplosionDecay(),
			LootEntry.of("tconstruct:steel_shard")
				.withWeight(75)
				.applyOreBonus("minecraft:fortune")
				.simulateExplosionDecay()
		])

	event.addBlockLootModifier("minecraft:weeping_vines")
		.addAlternativesLoot("minecraft:weeping_vines")

	event.addBlockLootModifier("minecraft:twisting_vines")
		.addAlternativesLoot("minecraft:twisting_vines")
})
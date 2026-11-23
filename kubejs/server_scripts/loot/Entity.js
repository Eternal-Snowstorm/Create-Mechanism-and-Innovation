LootJS.modifiers((event) => {
	event.addEntityLootModifier("minecraft:silverfish")
		.addWeightedLoot(LootEntry.of("thermal:silver_dust")
			.withChance(0.02))
})
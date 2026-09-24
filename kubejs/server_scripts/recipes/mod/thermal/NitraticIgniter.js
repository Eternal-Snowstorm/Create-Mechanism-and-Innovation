ServerEvents.recipes((event) => {
	let { thermal_extra } = event.getRecipes()

	// 催化剂配方

	thermal_extra.nitratic_igniter_catalyst("cmi:trinitrotoluene")
		.primary_mod(1)
		.secondary_mod(1)
		.energy_mod(1)

	thermal_extra.nitratic_igniter_catalyst("cmi:nitrocellulose")
		.primary_mod(1)
		.secondary_mod(1)
		.energy_mod(1.25)

	// 锇
	thermal_extra.nitratic_igniter([
		"2x mekanism:shard_osmium",
		Item.of("mekanism:clump_osmium", 1).withChance(0.5),
		Item.of("mekanism:clump_osmium", 1).withChance(0.25)
	], "#forge:raw_materials/osmium")
		.energy(4000)

	// 粗钨粉
	thermal_extra.nitratic_igniter("cmi:raw_tungsten_dust", [
		"cmi:raw_tungsten"
	])
})
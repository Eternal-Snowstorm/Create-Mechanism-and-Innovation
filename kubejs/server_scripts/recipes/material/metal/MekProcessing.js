/**
 * 
 * @param {string} material 
 * @returns 
 */
function getSlurry(material) {
	let slurry = null

	if (material === "gold") {
		return null
	} else if (MekType.Slurry.exists(`mekanism:clean_${material}`)) {
		slurry = `mekanism:clean_${material}`
	} else if (MekType.Slurry.exists(`cmi:${material}_slurry`)) {
		slurry = `cmi:${material}_slurry`
	}
	return slurry
}

/**
 * 
 * @param {string} material 
 * @returns 
 */
function getDirtySlurry(material) {
	let dirtySlurry = null

	if (material === "gold") {
		return null
	} else if (MekType.Slurry.exists(`mekanism:dirty_${material}`)) {
		dirtySlurry = `mekanism:dirty_${material}`
	} else if (MekType.Slurry.exists(`cmi:dirty_${material}_slurry`)) {
		dirtySlurry = `cmi:dirty_${material}_slurry`
	}
	return dirtySlurry
}

let materials = [
	"copper",
	"iron",
	"zinc",
	"aluminum",
	"nickel",
	"platinum",
	"chromium",
	"vanadium",
	"tin",
	"silver",
	"gold",
	"lead",
	"uranium",
	"cobalt",
	"osmium"
]
ServerEvents.recipes((event) => {
	let { mekanism } = event.getRecipes()

	mekanism.gas_conversion(
		"cmi:trinitrotoluene",
		"100x cmi:nitroglycerine"
	)

	materials.forEach((material) => {
		const CRYSTAL = `#mekanism:crystals/${material}`
		const SHARD = `#mekanism:shards/${material}`
		const CLUMP = `#mekanism:clumps/${material}`
		const DIRTY_DUST = `#mekanism:dirty_dusts/${material}`
		const DUST = `#forge:dusts/${material}`
		const SLURRY = getSlurry(material)
		const DIRTY_SLURRY = getDirtySlurry(material)

		if (DIRTY_SLURRY !== null) {
			if (Ingredient.isNotNull(`#forge:raw_materials/${material}`)) {
				mekanism.dissolution(
					MekType.Slurry.of(DIRTY_SLURRY, 2000),
					MekType.Gas.of("mekanism:sulfuric_acid", 1),
					`3x #forge:raw_materials/${material}`
				).id(`mekanism:processing/${material}/slurry/dirty/from_raw_ore`)
			}
			if (Ingredient.isNotNull(`#forge:storage_blocks/raw_${material}`)) {
				mekanism.dissolution(
					MekType.Slurry.of(DIRTY_SLURRY, 6000),
					MekType.Gas.of("mekanism:sulfuric_acid", 2),
					`#forge:storage_blocks/raw_${material}`
				).id(`mekanism:processing/${material}/slurry/dirty/from_raw_block`)
			}
			if (Ingredient.isNotNull(`#forge:ores/${material}`)) {
				mekanism.dissolution(
					MekType.Slurry.of(DIRTY_SLURRY, 1000),
					MekType.Gas.of("mekanism:sulfuric_acid", 1),
					`#forge:ores/${material}`
				).id(`mekanism:processing/${material}/slurry/dirty/from_ore`)
			}
			if (SLURRY !== null) {
				mekanism.washing(
					Fluid.of("minecraft:water", 5),
					MekType.Slurry.of(DIRTY_SLURRY, 1),
					MekType.Slurry.of(SLURRY, 1)
				).id(`mekanism:processing/${material}/slurry/clean`)
			}
		}

		if (Ingredient.isNotNull(CRYSTAL)) {
			if (SLURRY !== null) {
				mekanism.crystallizing(
					"slurry",
					CRYSTAL,
					MekType.Slurry.of(SLURRY, 200)
				).id(`mekanism:processing/${material}/crystal/from_slurry`)
			}
		}

		if (Ingredient.isNotNull(SHARD)) {
			if (Ingredient.isNotNull(`#forge:raw_materials/${material}`)) {
				mekanism.injecting(
					highPriorityItem(SHARD, 8),
					`3x #forge:raw_materials/${material}`,
					"1x mekanism:hydrogen_chloride"
				).id(`mekanism:processing/${material}/shard/from_raw_ore`)
			}

			if (Ingredient.isNotNull(`#forge:storage_blocks/raw_${material}`)) {
				mekanism.injecting(
					highPriorityItem(SHARD, 24),
					`#forge:storage_blocks/raw_${material}`,
					"2x mekanism:hydrogen_chloride"
				).id(`mekanism:processing/${material}/shard/from_raw_block`)
			}

			if (Ingredient.isNotNull(`#forge:ores/${material}`)) {
				mekanism.injecting(
					highPriorityItem(SHARD, 4),
					`#forge:ores/${material}`,
					"1x mekanism:hydrogen_chloride"
				).id(`mekanism:processing/${material}/shard/from_ore`)
			}

			if (Ingredient.isNotNull(CRYSTAL)) {
				mekanism.injecting(
					highPriorityItem(SHARD),
					CRYSTAL,
					"1x mekanism:hydrogen_chloride"
				).id(`mekanism:processing/${material}/shard/from_crystal`)
			}
		}

		if (Ingredient.isNotNull(CLUMP)) {
			if (Ingredient.isNotNull(`#forge:raw_materials/${material}`)) {
				mekanism.purifying(
					highPriorityItem(CLUMP, 2),
					`#forge:raw_materials/${material}`,
					"1x cmi:nitroglycerine"
				).id(`mekanism:processing/${material}/clump/from_raw_ore`)
			}

			if (Ingredient.isNotNull(`#forge:storage_blocks/raw_${material}`)) {
				mekanism.purifying(
					highPriorityItem(CLUMP, 18),
					`#forge:storage_blocks/raw_${material}`,
					"2x cmi:nitroglycerine"
				).id(`mekanism:processing/${material}/clump/from_raw_block`)
			}

			if (Ingredient.isNotNull(`#forge:ores/${material}`)) {
				mekanism.purifying(
					highPriorityItem(CLUMP, 3),
					`#forge:ores/${material}`,
					"1x cmi:nitroglycerine"
				).id(`mekanism:processing/${material}/clump/from_ore`)
			}

			if (Ingredient.isNotNull(SHARD)) {
				mekanism.purifying(
					CLUMP,
					SHARD,
					"1x cmi:nitroglycerine"
				).id(`mekanism:processing/${material}/clump/from_shard`)
			}

			if (Ingredient.isNotNull(DIRTY_DUST)) {
				mekanism.crushing(
					DIRTY_DUST,
					CLUMP
				).id(`mekanism:processing/${material}/dirty_dust/from_clump`)
			}
		}

		if (Ingredient.isNotNull(DIRTY_DUST) && Ingredient.isNotNull(DUST)) {
			mekanism.enriching(
				DUST,
				DIRTY_DUST
			).id(`mekanism:processing/${material}/dust/from_dirty_dust`)
		}
	})
})
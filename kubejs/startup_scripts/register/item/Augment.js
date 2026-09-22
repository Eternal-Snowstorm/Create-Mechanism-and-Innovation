let $TePaConstants =
	Java.loadClass("com.c2h6s.thermal_parallel.util.TePaConstants")
let $NBTTags =
	Java.loadClass("cofh.lib.util.constants.NBTTags")

StartupEvents.registry("item", (event) => {
	/**
	 * @param {string} name 注册ID
	 * @param {number} tier 等级
	 * @param {number} multipliers 倍率
	 * @returns
	 */
	function addUpgrade(name, tier, multipliers) {
		let model = {
			parent: "item/generated",
			textures: {
				layer0: `cmi:item/augment/${name}`,
				layer1: tier === 1
					? "thermal:item/augments/upgrade_augment_3_lights"
					: `cmi:item/augment/tier_${tier}/upgrade_augment_lights`,
				layer2: tier === 1
					? "thermal:item/augments/upgrade_augment_anim"
					: `cmi:item/augment/tier_${tier}/upgrade_augment_anim`
			}
		}

		let builder = event.create(
			`${Cmi.MODID}:${name}_upgrade_augment`,
			"thermal:upgrade_augment"
		)

		builder.setValue(multipliers)
		builder.modelJson(model)

		return builder
	}

	addUpgrade("aluminum", 2, 7)
	addUpgrade("stainless_steel", 3, 8)
	addUpgrade("titanium_alloy", 3, 9)
	addUpgrade("tungsten_steel", 3, 10)

	/**
	 * 
	 * @param {number} multipliers 
	 */
	function addParallelUpgrade(multipliers) {
		let multipliersInt = parseInt(multipliers.toString())

		let builder = event.create(
			`${Cmi.MODID}:${multipliers}_parallel_upgrade`,
			"thermal_augment"
		)

		builder.thermalMod($TePaConstants.TAG_MACHINE_PARALLEL, multipliersInt)
		builder.augmentType($NBTTags.TAG_AUGMENT_TYPE_MACHINE)
		builder.texture(`cmi:item/augment/parallel/${multipliersInt}`)
		builder.rarity(Rarity.EPIC)
		builder.tag("thermal:augments")
		builder.tag("thermal:augments/parallel")
		builder.name(() => {
			return Component.translatable(
				`item.${Cmi.MODID}.parallel_upgrade`,
				`${multipliersInt}`
			)
		})

		return builder
	}

	addParallelUpgrade(2)
	addParallelUpgrade(4)
	addParallelUpgrade(8)
	addParallelUpgrade(16)
	addParallelUpgrade(32)
	addParallelUpgrade(64)
	addParallelUpgrade(128)
	addParallelUpgrade(256)
})
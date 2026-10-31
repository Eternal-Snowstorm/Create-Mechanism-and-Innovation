// ignored: true
// priority: 15

/**
 * @param {Internal.DataPackEventJS_} event 传入数据包事件
 * @param {string} name 注册id
 * @param {Internal.Consumer_<TConMaterialBuilder>} handler 构造器
 * @constructor
 * @returns
 */
function TConMaterial(event, name, handler) {
	/** 
	 * @type {TConMaterialBuilder}
	 */
	let builder = {
		namespace: name.split(":", 2)[0],
		id: name.split(":", 2)[1],
		definition: {
			craftable: true,
			tier: 1,
			sortOrder: 26,
			hidden: false
		},
		stats: {
			stats: {}
		},
		traits: {},
		materialRecipes: [],
		materialFluidRecipes: [],
		materialMeltingRecipes: [],
		craftable(craftable) {
			this.definition.craftable = craftable
			return this
		},
		visibility(tier, hidden) {
			this.definition.tier = tier
			this.definition.hidden = hidden
			return this
		},
		tier(tier) {
			this.definition.tier = tier
			return this
		},
		hidden(hidden) {
			this.definition.hidden = hidden
			return this
		},
		sortOrder(sortOrder) {
			this.definition.sortOrder = sortOrder
			return this
		},
		head(durability, meleeAttack, miningSpeed, miningTier) {
			this.stats.stats["tconstruct:head"] = {
				durability: durability,
				melee_attack: meleeAttack,
				mining_speed: miningSpeed,
				mining_tier: miningTier
			}
			return this
		},
		handle(durability, meleeDamage, meleeSpeed, miningSpeed) {
			this.stats.stats["tconstruct:handle"] = {
				durability: durability,
				melee_damage: meleeDamage,
				melee_speed: meleeSpeed,
				mining_speed: miningSpeed
			}
			return this
		},
		binding() {
			this.stats.stats["tconstruct:binding"] = {}
			return this
		},
		limb(accuracy, drawSpeed, durability, velocity) {
			this.stats.stats["tconstruct:limb"] = {
				accuracy: accuracy,
				draw_speed: drawSpeed,
				durability: durability,
				velocity: velocity
			}
			return this
		},
		grip(accuracy, durability, meleeDamage) {
			this.stats.stats["tconstruct:grip"] = {
				accuracy: accuracy,
				durability: durability,
				melee_damage: meleeDamage
			}
			return this
		},
		bowstring() {
			this.stats.stats["tconstruct:bowstring"] = {}
			return this
		},
		arrowHead() {
			this.stats.stats["tconstruct:arrow_head"] = {}
			return this
		},
		arrowShaft() {
			this.stats.stats["tconstruct:arrow_shaft"] = {}
			return this
		},
		fletching() {
			this.stats.stats["tconstruct:fletching"] = {}
			return this
		},
		platingHelmet(armor, durability, knockbackResistance, toughness) {
			this.stats.stats["tconstruct:plating_helmet"] = {
				armor: armor,
				durability: durability,
				knockback_resistance: knockbackResistance,
				toughness: toughness
			}
			return this
		},
		platingChestplate(armor, durability, knockbackResistance, toughness) {
			this.stats.stats["tconstruct:plating_chestplate"] = {
				armor: armor,
				durability: durability,
				knockback_resistance: knockbackResistance,
				toughness: toughness
			}
			return this
		},
		platingLeggings(armor, durability, knockbackResistance, toughness) {
			this.stats.stats["tconstruct:plating_leggings"] = {
				armor: armor,
				durability: durability,
				knockback_resistance: knockbackResistance,
				toughness: toughness
			}
			return this
		},
		platingBoots(armor, durability, knockbackResistance, toughness) {
			this.stats.stats["tconstruct:plating_boots"] = {
				armor: armor,
				durability: durability,
				knockback_resistance: knockbackResistance,
				toughness: toughness
			}
			return this
		},
		platingShield(durability, knockbackResistance, toughness) {
			this.stats.stats["tconstruct:plating_shield"] = {
				durability: durability,
				knockback_resistance: knockbackResistance,
				toughness: toughness
			}
			return this
		},
		maille() {
			this.stats.stats["tconstruct:maille"] = {}
			return this
		},
		shieldCore() {
			this.stats.stats["tconstruct:shield_core"] = {}
			return this
		},
		setTraits(handler) {
			/** 
			 * @type {TConTraitsBuilder} 
			 */
			let builder = {
				traits: {
					default: [],
					perStat: {}
				},
				addDefault(name, level) {
					this.traits.default.push({
						name: name,
						level: level
					})
					return this
				},
				addTrait(stat, name, level) {
					if (!this.traits.perStat[stat]) {
						this.traits.perStat[stat] = []
					}
					this.traits.perStat[stat].push({
						name: name,
						level: level
					})
					return this
				}
			}
			handler(builder)
			this.traits = builder.traits
			return this
		},
		addMaterialRecipes(ingredient, handler) {
			/**
			 *  @type {TConMaterialRecipeBuilder} 
			 */
			let builder = {
				recipe: {
					type: "tconstruct:material",
					ingredient: Ingredient.of(ingredient).toJson(),
					needed: 1,
					value: 1
				},
				needed(needed) {
					this.recipe.needed = needed
					return this
				},
				value(value) {
					this.recipe.value = value
					return this
				},
				leftover(itemStack) {
					this.recipe.leftover = itemStack.toJson()
					return this
				}
			}
			builder.recipe.material = `${this.namespace}:${this.id}`
			handler(builder)
			this.materialRecipes.push(builder.recipe)
			return this
		},
		addMaterialFluidRecipes(fluid, handler) {
			/** @type {TConFluidRecipeBuilder} */
			let builder = {
				recipe: {
					type: "tconstruct:material_fluid",
					fluid: {
						amount: 1000
					},
					temperature: 1000
				},
				amount(amount) {
					this.recipe.fluid.amount = amount
					return this
				},
				temperature(temperature) {
					this.recipe.temperature = temperature
					return this
				},
				input(input) {
					this.recipe.input = input
					return this
				}
			}
			if (fluid.charAt(0) == "#") {
				builder.recipe.fluid.tag = fluid.slice(1)
			} else {
				builder.recipe.fluid.name = fluid
			}
			builder.recipe.output = `${this.namespace}:${this.id}`
			handler(builder)
			this.materialFluidRecipes.push(builder.recipe)
			return this
		},
		addMaterialMeltingRecipes(fluid, handler) {
			/** @type {TConMaterialMeltingRecipeBuilder} */
			let builder = {
				recipe: {
					type: "tconstruct:material_melting",
					result: {
						amount: 1000,
						fluid: fluid
					},
					temperature: 1000
				},
				amount(amount) {
					this.recipe.result.amount = amount
					return this
				},

				temperature(temperature) {
					this.recipe.temperature = temperature
					return this
				}
			}
			builder.recipe.input = `${this.namespace}:${this.id}`
			handler(builder)
			this.materialFluidRecipes.push(builder.recipe)
			return this
		}
	}
	handler(builder)

	let definitionFile =
		`${builder.namespace}:tinkering/materials/definition/${builder.id}.json`
	event.addJson(definitionFile, builder.definition)

	let statsFile =
		`${builder.namespace}:tinkering/materials/stats/${builder.id}.json`
	event.addJson(statsFile, builder.stats)

	let traitsFile =
		`${builder.namespace}:tinkering/materials/traits/${builder.id}.json`
	event.addJson(traitsFile, builder.traits)

	for (let i = 0; i < builder.addMaterialRecipes.length; i++) {
		let materialRecipesFile =
			`${builder.namespace}:recipes/materials/material/${builder.id}/${i}.json`
		event.addJson(materialRecipesFile, builder.addMaterialRecipes[i])
	}
	for (let i = 0; i < builder.addMaterialFluidRecipes.length; i++) {
		let materialFluidRecipesFile =
			`${builder.namespace}:recipes/materials/material_fluid/${builder.id}/${i}.json`
		event.addJson(materialFluidRecipesFile, builder.addMaterialFluidRecipes[i])
	}
	for (let i = 0; i < builder.addMaterialMeltingRecipes.length; i++) {
		let materialMeltingRecipesFile =
			`${builder.namespace}:recipes/materials/material_melting/${builder.id}/${i}.json`
		event.addJson(materialMeltingRecipesFile, builder.addMaterialMeltingRecipes[i])
	}
}

/**
 * @template {Internal.Modifier} T
 * @param {Internal.StaticModifier<T> | Internal.DynamicModifier} modifier
 * @returns
 */
function modifier(modifier) {
	return modifier.getId() + ""
}

/**
 * @param {Internal.ModifierId | string} id
 * @returns
 */
function id(id) {
	return id.toString() + ""
}
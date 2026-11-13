TConJSEvents.materialDefinition((event) => {
	/**
	 * 
	 * @param {string} name 材料名称
	 * @returns 
	 */
	function getMeltingPoint(name) {
		return CmiMetal.getMetal(name).getMeltingPoint()
	}

	/**
	 * 
	 * @param {string} material 
	 */
	function TConMaterial(material) {
		this.material = material
		/**
		 * 
		 * @param {Internal.Consumer_<Internal.MaterialDefinitionBuilder>} builder 
		 */
		this.definitionData = (builder) => {
		}
		/**
		 * 
		 * @param {Internal.Consumer_<Internal.MaterialStatsBuilder>} builder 
		 */
		this.statsData = (builder) => {
		}
		/**
		 * 
		 * @param {Internal.Consumer_<Internal.MaterialTraitsBuilder>} builder 
		 */
		this.traitsData = (builder) => {
		}
		/**
		 * 
		 * @param {Internal.Consumer_<MaterialSmeltingRecipeBuilder>} builder 
		 */
		this.meltingData = (builder) => {
		}
	}

	/**
	 * @param {Internal.Consumer_<Internal.MaterialDefinitionBuilder>} definition 
	 */
	TConMaterial.prototype.definition = function (definition) {
		this.definitionData = definition
		return this
	}

	/**
	 * @param {Internal.Consumer_<Internal.MaterialStatsBuilder>} stats 
	 */
	TConMaterial.prototype.stats = function (stats) {
		this.statsData = stats
		return this
	}

	/**
	 * @param {Internal.Consumer_<Internal.MaterialTraitsBuilder>} traits 
	 */
	TConMaterial.prototype.traits = function (traits) {
		this.traitsData = traits
		return this
	}

	/**
	 * @param {Internal.Consumer_<MaterialSmeltingRecipeBuilder>} melting 
	 */
	TConMaterial.prototype.melting = function (melting) {
		this.meltingData = melting
		return this
	}
	TConMaterial.prototype.build = function () {
		event.addMaterialData(
			"cmi",
			this.material,
			this.definitionData,
			this.statsData,
			this.traitsData,
			this.meltingData
		)
	}

	// 麻绳
	new TConMaterial("rope")
		.definition((builder) => {
			builder.craftable(true)
				.sortOrder(7)
				.tier(1)
				.hidden(false)
				.setCraftOrRepairRecipe((builder) => {
					builder.input("farmersdelight:rope")
				})
		})
		.stats((builder) => {
			builder.binding()
			["part(java.lang.String,java.util.Map)"]("tconstruct:bowstring", {})
		})
		.traits((builder) => {
			builder.perStat("default", "tconstruct:stringy", 1)
		})
		.build()

	// 橡胶木
	new TConMaterial("rubberwood")
		.definition((builder) => {
			builder.craftable(true)
				.sortOrder(7)
				.tier(1)
				.hidden(false)
				.setCraftOrRepairRecipe((builder) => {
					builder.input("thermal:rubberwood_planks")
				})
		})
		.stats((builder) => {
			builder.head(72, 0, 2, "minecraft:wood")
				.handle(0.1, 0, 0, 0)
				.limb(-0.05, 0.25, 70, -0.1)
		})
		.traits((builder) => {
			builder.perStat("default", "tconstruct:cultivated", 1)
		})
		.build()

	// 工业铁
	new TConMaterial("industrial_iron")
		.definition((builder) => {
			builder.craftable(false)
				.sortOrder(12)
				.tier(2)
				.hidden(false)
		})
		.stats((builder) => {
			builder.head(320, 2, 4, "minecraft:iron")
				.binding()
				.handle(0.1, -0.1, 0.05, 0)
				.limb(0, 0.2, 250, 0.1)
				.grip(0.1, 0.1, 0)
				.maille()
				.platingHelmet(2, 165, 0)
				.platingChestplate(4, 240, 0)
				.platingLeggings(3, 225, 0)
				.platingBoots(2, 195, 0)
				.platingShield(270, 0)
		})
		.traits((builder) => {
			builder.perStat("tconstruct:armor", "tconstruct:projectile_protection", 1)
		})
		.melting((builder) => {
			builder.fluid("cmi:molten_industrial_iron")
				.amount(90)
				.temperature(getMeltingPoint("industrial_iron"))
				.material("cmi:industrial_iron")
		})
		.build()

	// 安山合金
	new TConMaterial("andesite_alloy")
		.definition((builder) => {
			builder.craftable(true)
				.sortOrder(12)
				.tier(2)
				.hidden(false)
				.setCraftOrRepairRecipe((builder) => {
					builder.input("create:andesite_alloy")
				})
		})
		.stats((builder) => {
			builder.head(250, 2, 6, "minecraft:iron")
				.handle(0.1, 0, 0, 0)
				.binding()
				.limb(0, 0, 250, 0.1)
				.grip(0, 0.1, 2)
				.maille()
				.platingShield(226, 1.0)
		})
		.traits((builder) => {
			builder.perStat("tconstruct:melee_harvest", "tconstruct:reach", 1)
				.perStat("tconstruct:armor", "tconstruct:melee_protection", 1)
		})
		.melting((builder) => {
			builder.fluid("cmi:molten_andesite_alloy")
				.amount(90)
				.temperature(getMeltingPoint("andesite_alloy"))
				.material("cmi:andesite_alloy")
		})
		.build()

	// 黄铜
	new TConMaterial("brass")
		.definition((builder) => {
			builder.craftable(false)
				.sortOrder(12)
				.tier(3)
				.hidden(false)
		})
		.stats((builder) => {
			builder.head(680, 1.75, 8.5, "minecraft:diamond")
				.binding()
				.handle(0.0, 0.0, 0.05, 0.1)
				.grip(0.2, 0.2, 1.4)
				.maille()
				.platingBoots(1.2, 138, 0)
				.platingChestplate(0.2, 240, 0)
				.platingHelmet(0.2, 142, 0)
				.platingLeggings(0.2, 231, 0)
				.platingShield(238, 1.3)
		})
		.traits((builder) => {
			builder.perStat("default", "tconstruct:harmonious", 1)
				.perStat("tconstruct:melee_harvest", "nebula_tinker:clockwork", 2)
				.perStat("tconstruct:ranged", "tconstruct:multishot", 1)
		})
		.melting((builder) => {
			builder.fluid("tconstruct:molten_brass")
				.amount(90)
				.temperature(getMeltingPoint("brass"))
				.material("cmi:brass")
		})
		.build()

	// 铸铁
	new TConMaterial("cast_iron")
		.definition((builder) => {
			builder.craftable(false)
				.sortOrder(12)
				.tier(3)
				.hidden(false)
		})
		.stats((builder) => {
			builder.head(528, 2.75, 7.5, "minecraft:diamond")
				.binding()
				.handle(0.15, 0.05, 0, -0.05)
				.grip(-0.05, 0.05, 0)
				.maille()
				.platingHelmet(3, 180, 1)
				.platingChestplate(6, 285, 2)
				.platingLeggings(5, 240, 2)
				.platingBoots(3, 225, 1)
				.platingShield(300, 2)
		})
		.traits((builder) => {
			builder.perStat("tconstruct:armor", "tconstruct:projectile_protection", 1)
				.perStat("tconstruct:ranged", "tconstruct:maintained", 1)
		})
		.melting((builder) => {
			builder.fluid("cmi:molten_cast_iron")
				.amount(90)
				.temperature(getMeltingPoint("cast_iron"))
				.material("cmi:cast_iron")
		})
		.build()

	// 暗影钢
	new TConMaterial("shadow_steel")
		.definition((builder) => {
			builder.craftable(true)
				.sortOrder(12)
				.tier(3)
				.hidden(false)
		})
		.stats((builder) => {
			builder.head(620, 4.3, 7.2, "minecraft:diamond")
				.binding()
				.handle(0.1, -0.1, 0.2, -0.2)
				.grip(0.3, 0.1, 2.5)
			// .arrowHead()
		})
		.traits((builder) => {
			builder.perStat("tconstruct:melee_harvest", "nebula_tinker:shadow", 1)
				.perStat("tconstruct:ranged", "nebula_tinker:shadow", 2)
				.perStat("tconstruct:ranged", "tconstruct:multishot", 2)
		})
		.melting((builder) => {
			builder.fluid("cmi:molten_shadow_steel")
				.amount(90)
				.temperature(getMeltingPoint("shadow_steel"))
				.material("cmi:shadow_steel")
		})
		.build()

	// 光辉石
	new TConMaterial("refined_radiance")
		.definition((builder) => {
			builder.craftable(true)
				.sortOrder(12)
				.tier(3)
				.hidden(false)
		})
		.stats((builder) => {
			builder.head(320, 2.5, 2.0, "minecraft:diamond")
				.binding()
				.handle(-0.3, 0.3, 0.25, 0.35)
				.grip(-0.2, -0.3, 1.5)
			// .arrowHead()
		})
		.traits((builder) => {
			builder.perStat("tconstruct:melee_harvest", "tconstruct:lightspeed", 1)
				.perStat("tconstruct:ranged", "tconstruct:lightspeed", 1)
				.perStat("tconstruct:ammo", "tconstruct:keen", 2)
		})
		.melting((builder) => {
			builder.fluid("cmi:molten_refined_radiance")
				.amount(90)
				.temperature(getMeltingPoint("refined_radiance"))
				.material("cmi:refined_radiance")
		})
		.build()

	// 阿迪特
	new TConMaterial("ardite")
		.definition((builder) => {
			builder.craftable(false)
				.sortOrder(12)
				.tier(3)
				.hidden(false)
		})
		.stats((builder) => {
			builder.head(650, 2.75, 8.3, "minecraft:diamond")
				.binding()
				.handle(0.2, -0.05, -0.2, 0.25)
		})
		.traits((builder) => {
			builder.perStat("default", "nebula_tinker:petramor", 1)
				.perStat("tconstruct:handle", "nebula_tinker:petramor", 1)
				.perStat("tconstruct:head", "nebula_tinker:petramor", 1)
		})
		.melting((builder) => {
			builder.fluid("cmi:molten_ardite")
				.amount(90)
				.temperature(getMeltingPoint("ardite"))
				.material("cmi:ardite")
		})
		.build()

	// 不锈钢
	new TConMaterial("stainless_steel")
		.definition((builder) => {
			builder.craftable(false)
				.sortOrder(12)
				.tier(3)
				.hidden(false)
		})
		.stats((builder) => {
			builder.head(800, 3.76, 6, "minecraft:diamond")
				.binding()
				.handle(0.05, 0, 0.05, 0.05)
				.limb(-0.05, 0.1, 800, 0.2)
				.grip(0.05, -0.05, 2.75)
				.maille()
				.platingHelmet(2, 380, 0)
				.platingChestplate(7, 490, 0)
				.platingLeggings(5, 475, 0)
				.platingBoots(2, 400, 0)
				.platingShield(550, 0)
		})
		.traits((builder) => {
			builder.perStat("default", "tconstruct:ductile", 2)
				.perStat("tconstruct:melee_harvest", "tconstruct:ductile", 2)
				.perStat("tconstruct:melee_harvest", "tconstruct:blockade", 1)
				.perStat("tconstruct:ranged", "tconstruct:ductile", 2)
		})
		.melting((builder) => {
			builder.fluid("cmi:molten_stainless_steel")
				.amount(90)
				.temperature(getMeltingPoint("stainless_steel"))
				.material("cmi:stainless_steel")
		})
		.build()

	// 戴斯
	new TConMaterial("desh")
		.definition((builder) => {
			builder.craftable(false)
				.sortOrder(12)
				.tier(4)
				.hidden(false)
		})
		.stats((builder) => {
			builder.head(1210, 3.25, 7.5, "minecraft:diamond")
				.binding()
				.handle(0.05, 0.1, 0.15, 0.15)
				.limb(0.15, 0.15, 1280, 0.45)
				.grip(-0.1, 0.25, 2.5)
				.maille()
				.platingShield(820, 0)
		})
		.traits((builder) => {
			builder.perStat("default", "tconstruct:reinforced", 1)
				.perStat("tconstruct:melee_harvest", "tconstruct:haste", 1)
				.perStat("tconstruct:armor", "tconstruct:speedy", 1)
				.perStat("tconstruct:ranged", "tconstruct:featherweight", 1)
		})
		.melting((builder) => {
			builder.fluid("cmi:molten_desh")
				.amount(90)
				.temperature(getMeltingPoint("desh"))
				.material("cmi:desh")
		})
		.build()

	// 紫金
	new TConMaterial("ostrum")
		.definition((builder) => {
			builder.craftable(false)
				.sortOrder(12)
				.tier(4)
				.hidden(false)
		})
		.stats((builder) => {
			builder.head(1380, 4.5, 8.0, "minecraft:netherite")
				.binding()
				.handle(0.1, 0.15, 0.3, 0.15)
				.limb(0.35, 0.25, 1420, 0.7)
				.grip(0.2, 0, 3.5)
				.maille()
				.platingShield(1420, 0)
		})
		.traits((builder) => {
			builder.perStat("tconstruct:melee_harvest", "tconstruct:insatiable", 1)
				.perStat("tconstruct:ranged", "tconstruct:lightweight", 1)
		})
		.melting((builder) => {
			builder.fluid("cmi:molten_ostrum")
				.amount(90)
				.temperature(getMeltingPoint("ostrum"))
				.material("cmi:ostrum")
		})
		.build()

	// 耐热金属
	new TConMaterial("calorite")
		.definition((builder) => {
			builder.craftable(false)
				.sortOrder(12)
				.tier(4)
				.hidden(false)
		})
		.stats((builder) => {
			builder.head(1500, 6.5, 8.5, "minecraft:netherite")
				.binding()
				.handle(0.35, 0.3, -0.15, 0.25)
				.grip(0, 0.4, 2.5)
				.maille()
				.platingHelmet(2, 1200, 0.2)
				.platingChestplate(7, 1420, 0.4)
				.platingLeggings(5, 1380, 0.3)
				.platingBoots(2, 1200, 0.2)
				.platingShield(1420, 0.5)
		})
		.traits((builder) => {
			builder.perStat("default", "tconstruct:enhanced", 1)
				.perStat("tconstruct:ranged", "tconstruct:ballista", 1)
				.perStat("tconstruct:armor", "tconstruct:fireProtection", 2)
		})
		.melting((builder) => {
			builder.fluid("cmi:molten_calorite")
				.amount(90)
				.temperature(getMeltingPoint("calorite"))
				.material("cmi:calorite")
		})
		.build()

	// 紫水晶
	new TConMaterial("amethyst")
		.definition((builder) => {
			builder.craftable(true)
				.sortOrder(110)
				.tier(1)
				.hidden(false)
				.setCraftOrRepairRecipe((builder) => {
					builder.input("#forge:gems/amethyst")
				})
		})
		.stats((builder) => {
			builder.head(100, 1.6, 6.2, "minecraft:stone")
				.handle(-0.1, 0.05, 0, 0)
				.limb(0.1, -0.12, 230, -0.02)
				.grip(0.2, -0.1, 3.2)
		})
		.traits((builder) => {
			builder.perStat("tconstruct:melee_harvest", "tconstruct:luck", 1)
				.perStat("tconstruct:ranged", "tconstruct:crystalshot", 1)
		})
		.melting((builder) => {
			builder.fluid("tconstruct:molten_amethyst")
				.amount(90)
				.temperature(800)
				.material("cmi:amethyst")
		})
		.build()
})
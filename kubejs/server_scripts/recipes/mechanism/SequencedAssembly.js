ServerEvents.recipes((event) => {
	let { create, vintageimprovements, cmi } = event.getRecipes()

	/**
	 * 
	 * @param {OutputItem_} output 
	 * @param {InputItem_} input 
	 * @param {InputItem_} tran 
	 * @returns 
	 */
	function seqItems(output, input, tran) {
		return {
			RES: output,
			ING: input,
			TRANS: tran
		}
	}

	/**
	 * 
	 * @param {{
	 *		RES: OutputItem_,
	 *		ING: InputItem_,
	 *  	TRANS: InputItem_
	 *  }} item
	 * @returns 
	 */
	function SequencedAssemblyRecipe(mechanism) {
		let { COM, INC } = mechanism

		this.result = COM
		this.transit = INC
		this.ingredient = "#forge:plates/iron"
		this.$sequences = []
		this.loops = 1
		return this
	}
	/**
	 * 
	 * @param {Internal.Ingredient_} ingredient 
	 * @returns 
	 */
	SequencedAssemblyRecipe.prototype.input = function (ingredient) {
		this.ingredient = ingredient
		return this
	}
	SequencedAssemblyRecipe.prototype.cutting = function () {
		let sequence = create.cutting(this.transit, this.transit)

		this.$sequences.push(sequence)
		return this
	}
	SequencedAssemblyRecipe.prototype.pressing = function () {
		let sequence = create.pressing(this.transit, this.transit)

		this.$sequences.push(sequence)
		return this
	}
	SequencedAssemblyRecipe.prototype.grinding = function () {
		let sequence = cmi.grinding(this.transit, this.transit)

		this.$sequences.push(sequence)
		return this
	}
	SequencedAssemblyRecipe.prototype.vibrating = function () {
		let sequence = vintageimprovements.vibrating(this.transit, this.transit)

		this.$sequences.push(sequence)
		return this
	}
	SequencedAssemblyRecipe.prototype.pressurizing = function () {
		let sequence = vintageimprovements.pressurizing(this.transit, this.transit)

		this.$sequences.push(sequence)
		return this
	}
	SequencedAssemblyRecipe.prototype.vacuumizing = function () {
		let sequence = vintageimprovements.vacuumizing(this.transit, this.transit)

		this.$sequences.push(sequence)
		return this
	}
	/**
	 * 
	 * @param {Number} energy
	 * @returns 
	 */
	SequencedAssemblyRecipe.prototype.laserCutting = function (energy) {
		let sequence = vintageimprovements.laser_cutting(this.transit, this.transit)
			.energy(energy).maxChargeRate(100)

		this.$sequences.push(sequence)
		return this
	}
	/**
	 * 
	 * @param {InputItem_} input 
	 * @returns 
	 */
	SequencedAssemblyRecipe.prototype.deploying = function (input) {
		let sequence = create.deploying(this.transit, [this.transit, input])

		this.$sequences.push(sequence)
		return this
	}
	/**
	 * 
	 * @param {InputItem_} itemAsHead
	 * @returns 
	 */
	SequencedAssemblyRecipe.prototype.curving = function (itemAsHead) {
		let sequence = vintageimprovements.curving(this.transit, this.transit)
			.itemAsHead(itemAsHead)

		this.$sequences.push(sequence)
		return this
	}
	/**
	 * 
	 * @param {Fluid_} fluid
	 * @returns 
	 */
	SequencedAssemblyRecipe.prototype.filling = function (fluid) {
		let sequence = create.filling(this.transit, [this.transit, fluid])

		this.$sequences.push(sequence)
		return this
	}
	/**
	 * 
	 * @param {Number} loops 
	 */
	SequencedAssemblyRecipe.prototype.loop = function (loops) {
		this.loops = loops
		return this
	}
	SequencedAssemblyRecipe.prototype.build = function () {
		let sequences = this.$sequences
		let result = this.result
		let input = this.ingredient
		let loops = this.loops
		let transit = this.transit

		return create.sequenced_assembly(result,
			input,
			sequences
		).loops(loops)
			.transitionalItem(transit)
	}

	// 木质
	new SequencedAssemblyRecipe(Mechanisms.WOODEN)
		.input("#minecraft:planks")
		.deploying("#forge:rods/wooden")
		.cutting()
		.deploying("farmersdelight:tree_bark")
		.deploying("#minecraft:logs")
		.deploying(Mechanisms.PART.BASIC)
		.build()

	// 石质
	new SequencedAssemblyRecipe(Mechanisms.STONE)
		.input("#forge:plates/stone")
		.deploying("tconstruct:seared_brick")
		.cutting()
		.deploying("#forge:clay")
		.deploying("#forge:stone")
		.deploying(Mechanisms.PART.BASIC)
		.build()

	// 红石
	new SequencedAssemblyRecipe(Mechanisms.REDSTONE)
		.input("#forge:plates/lead")
		.deploying("minecraft:redstone")
		.cutting()
		.filling(Fluid.of("thermal:redstone", 100))
		.deploying("minecraft:redstone_torch")
		.deploying(Mechanisms.PART.BASIC)
		.build()
		.id("vintageimprovements:sequenced_assembly/redstone_module")

	// 自然
	new SequencedAssemblyRecipe(Mechanisms.NATURE)
		.input("minecraft:grass_block")
		.deploying("#minecraft:small_flowers")
		.cutting()
		.filling(Fluid.of("minecraft:water", 1000))
		.deploying("#forge:seeds")
		.deploying(Mechanisms.PART.MAGIC)
		.build()

	// 安山
	new SequencedAssemblyRecipe(Mechanisms.ANDESITE)
		.input("#forge:plates/andesite")
		.deploying("create:shaft")
		.cutting()
		.deploying("#create:incomplete_cogwheels")
		.deploying("#create:incomplete_large_cogwheels")
		.deploying(Mechanisms.PART.MECHA)
		.build()

	// 铜质
	new SequencedAssemblyRecipe(Mechanisms.COPPER)
		.input("#forge:plates/copper")
		.deploying("#forge:nuggets/copper")
		.deploying("#forge:glass")
		.filling(Fluid.of("minecraft:water", 1000))
		.deploying("thermal:cured_rubber")
		.deploying(Mechanisms.PART.MECHA)
		.build()

	// 铁质
	new SequencedAssemblyRecipe(Mechanisms.IRON)
		.input("#forge:plates/iron")
		.deploying("#forge:nuggets/iron")
		.cutting()
		.deploying("#vintageimprovements:springs/iron")
		.deploying("#forge:wires/iron")
		.deploying(Mechanisms.PART.BASIC)
		.build()

	// 生铁
	new SequencedAssemblyRecipe(Mechanisms.PIG_IRON)
		.input("#forge:plates/pig_iron")
		.curving("cmi:mechanism_mold")
		.cutting()
		.filling(Fluid.of("tconstruct:molten_pig_iron", 45))
		.deploying("#forge:rods/pig_iron")
		.deploying(Mechanisms.PART.MAGIC)
		.build()

	// 秘药
	new SequencedAssemblyRecipe(Mechanisms.POTION)
		.input("#forge:glass")
		.curving("cmi:mechanism_mold")
		.deploying("minecraft:golden_apple")
		.deploying("minecraft:golden_carrot")
		.deploying("minecraft:glistering_melon_slice")
		.deploying(Mechanisms.PART.MAGIC)
		.build()

	// 青铜
	new SequencedAssemblyRecipe(Mechanisms.STEAM)
		.input("#forge:plates/bronze")
		.deploying("cmi:incomplete_bronze_cogwheel")
		.deploying("#vintageimprovements:small_springs/bronze")
		.deploying("#forge:nuggets/andesite_alloy")
		.vibrating()
		.deploying(Mechanisms.PART.MECHA)
		.build()

	// 铁路
	new SequencedAssemblyRecipe(Mechanisms.RAILWAY)
		.input("#forge:plates/dense_obsidian")
		.curving("cmi:mechanism_mold")
		.cutting()
		.deploying("#vintageimprovements:small_springs/brass")
		.deploying("#forge:plates/brass")
		.deploying(Mechanisms.PART.MECHA)
		.build()

	// 下界
	new SequencedAssemblyRecipe(Mechanisms.NETHER)
		.input("create:cinder_flour")
		.curving("cmi:mechanism_mold")
		.deploying("minecraft:magma_cream")
		.filling(Fluid.of("tconstruct:liquid_soul", 250))
		.deploying("#forge:nuggets/gold")
		.deploying(Mechanisms.PART.MAGIC)
		.build()

	// 附魔
	new SequencedAssemblyRecipe(Mechanisms.ENCHANTED)
		.input("#forge:gems/lapis")
		.curving("cmi:mechanism_mold")
		.deploying("create:experience_nugget")
		.filling(Fluid.of("create_enchantment_industry:experience", 50))
		.grinding()
		.deploying(Mechanisms.PART.MAGIC)
		.build()

	// 线圈
	new SequencedAssemblyRecipe(Mechanisms.COIL)
		.input("#forge:plates/iron")
		.curving("cmi:mechanism_mold")
		.deploying("cmi:motor_rotor")
		.filling(Fluid.of("immersiveengineering:redstone_acid", 200))
		.deploying("#forge:plates/electrum")
		.deploying(Mechanisms.PART.ENGIN)
		.build()

	// 精密
	new SequencedAssemblyRecipe(Mechanisms.PRECISION)
		.input("#forge:plates/brass")
		.curving("cmi:mechanism_mold")
		.deploying("create:electron_tube")
		.deploying("#create:incomplete_large_cogwheels")
		.deploying("#forge:nuggets/brass")
		.deploying(Mechanisms.PART.MECHA)
		.build()
		.id("create:sequenced_assembly/precision_mechanism")

	// 感光
	new SequencedAssemblyRecipe(Mechanisms.PHOTO)
		.input("#forge:prisms/polished_quartz")
		.curving("cmi:mechanism_mold")
		.deploying("cmi:resonant_tube")
		.deploying("#forge:dusts/amethyst")
		.grinding()
		.deploying(Mechanisms.PART.ENGIN)
		.build()

	// 幽匿
	new SequencedAssemblyRecipe(Mechanisms.SCULK)
		.input("minecraft:sculk_catalyst")
		.curving("cmi:mechanism_mold")
		.deploying("minecraft:echo_shard")
		.deploying("cmi:charged_amethyst")
		.grinding()
		.deploying(Mechanisms.PART.MAGIC)
		.build()

	// 多彩
	new SequencedAssemblyRecipe(Mechanisms.COLOR)
		.input("#minecraft:planks")
		.curving("cmi:mechanism_mold")
		.deploying("#forge:dyes/red")
		.deploying("#forge:dyes/green")
		.deploying("#forge:dyes/blue")
		.deploying(Mechanisms.PART.MAGIC)
		.build()

	// 热力
	new SequencedAssemblyRecipe(Mechanisms.THERMAL)
		.input("#forge:plates/invar")
		.deploying(Mechanisms.THERMAL.AUG)
		.deploying("#forge:rods/nickel")
		.deploying("#forge:wires/copper")
		.laserCutting(1000)
		.deploying(Mechanisms.PART.FLUX)
		.build()

	// 轻工
	new SequencedAssemblyRecipe(Mechanisms.LIGHT)
		.input("#forge:plates/iron")
		.deploying(Mechanisms.LIGHT.AUG)
		.filling(Fluid.of("immersiveengineering:creosote", 100))
		.vacuumizing()
		.deploying("#forge:rods/constantan")
		.deploying(Mechanisms.PART.ENGIN)
		.build()

	// 末影
	new SequencedAssemblyRecipe(Mechanisms.ENDER)
		.input("cmi:ender_mechanism_basement")
		.deploying("minecraft:ender_pearl")
		.filling(Fluid.of("thermal:ender", 250))
		.deploying("#forge:gears/sapphire")
		.laserCutting(1000)
		.deploying(Mechanisms.PART.MAGIC)
		.build()

	// 智能
	new SequencedAssemblyRecipe(Mechanisms.SMART)
		.input("#forge:plates/silver")
		.deploying(Mechanisms.SMART.AUG)
		.filling(Fluid.of("immersiveengineering:redstone_acid", 100))
		.deploying("ae2:fluix_crystal")
		.laserCutting(1000)
		.deploying(Mechanisms.PART.ENGIN)
		.build()

	// 金质
	new SequencedAssemblyRecipe(Mechanisms.GOLD)
		.input("#forge:plates/gold")
		.deploying(Mechanisms.GOLD.AUG)
		.deploying("#forge:nuggets/gold")
		.deploying("#forge:dusts/cinnabar")
		.laserCutting(1000)
		.deploying(Mechanisms.PART.FLUX)
		.build()

	// 强化
	new SequencedAssemblyRecipe(Mechanisms.REINFORCED)
		.input("#forge:plates/electrum")
		.deploying(Mechanisms.REINFORCED.AUG)
		.deploying("#forge:rods/nickel")
		.deploying("#forge:wires/signalum")
		.laserCutting(1000)
		.deploying(Mechanisms.PART.FLUX)
		.build()

	// 重工
	new SequencedAssemblyRecipe(Mechanisms.HEAVY)
		.input("#forge:plates/steel")
		.deploying(Mechanisms.HEAVY.AUG)
		.filling(Fluid.of("thermal_extra:lubricant", 100))
		.vacuumizing()
		.deploying("#forge:rods/invar")
		.deploying(Mechanisms.PART.ENGIN)
		.build()

	// 钴质
	new SequencedAssemblyRecipe(Mechanisms.COBALT)
		.input("#forge:plates/cobalt")
		.deploying(Mechanisms.COBALT.AUG)
		.deploying("#forge:nuggets/cobalt")
		.deploying("#forge:dusts/apatite")
		.laserCutting(1000)
		.deploying(Mechanisms.PART.ENGIN)
		.build()

	// 气密
	new SequencedAssemblyRecipe(Mechanisms.AIR)
		.input(Mechanisms.AIR.BAS)
		.deploying("steampowered:pressurized_gas_container")
		.deploying("#forge:plates/polyolefin")
		.deploying("ae2:quartz_glass")
		.filling(Fluid.of("cmi:silicon_rubber", 100))
		.vacuumizing()
		.deploying(Mechanisms.PART.GENERAL)
		.build()

	// 计算
	new SequencedAssemblyRecipe(Mechanisms.COMPUTE)
		.input(Mechanisms.COMPUTE.BAS)
		.deploying("#ae2:illuminated_panel")
		.deploying(Processor.CONCURRENT)
		.deploying(Processor.SUPERCONDUCTING)
		.filling(Fluid.of("cmi:structural_plastic", 200))
		.deploying("cmi:nuke_cooler")
		.deploying(Mechanisms.PART.GENERAL)
		.build()

	// 基础通用
	new SequencedAssemblyRecipe(Mechanisms.BASIC)
		.input(Mechanisms.BASIC.BAS)
		.deploying("#forge:circuits/basic")
		.deploying("#forge:gears/chromeplated_steel")
		.laserCutting(1000)
		.filling(Fluid.of("immersiveengineering:redstone_acid", 200))
		.deploying("#forge:plates/silicon_rubber")
		.deploying(Mechanisms.PART.GENERAL)
		.build()

	// 高级通用
	new SequencedAssemblyRecipe(Mechanisms.ADVANCED)
		.input(Mechanisms.ADVANCED.BAS)
		.deploying("#forge:circuits/advanced")
		.deploying("#forge:gears/chromeplated_steel")
		.laserCutting(1000)
		.filling(Fluid.of("immersiveengineering:redstone_acid", 200))
		.deploying("#forge:plates/silicon_rubber")
		.deploying(Mechanisms.PART.GENERAL)
		.build()

	// 精英通用
	new SequencedAssemblyRecipe(Mechanisms.ELITE)
		.input(Mechanisms.ELITE.BAS)
		.deploying("#forge:circuits/elite")
		.deploying("#forge:gears/chromeplated_steel")
		.laserCutting(1000)
		.filling(Fluid.of("immersiveengineering:redstone_acid", 200))
		.deploying("#forge:plates/silicon_rubber")
		.deploying(Mechanisms.PART.GENERAL)
		.build()

	// 终极通用
	new SequencedAssemblyRecipe(Mechanisms.ULTIMATE)
		.input(Mechanisms.ULTIMATE.BAS)
		.deploying("#forge:circuits/ultimate")
		.deploying("#forge:gears/chromeplated_steel")
		.laserCutting(1000)
		.filling(Fluid.of("immersiveengineering:redstone_acid", 200))
		.deploying("#forge:plates/silicon_rubber")
		.deploying(Mechanisms.PART.GENERAL)
		.build()

	// 航空
	new SequencedAssemblyRecipe(Mechanisms.AERO)
		.input(Mechanisms.AERO.BAS)
		.deploying("cmi:nuke_cooler")
		.deploying("#forge:wires/fluix")
		.laserCutting(1000)
		.filling(Fluid.of("cmi:structural_plastic", 200))
		.deploying("#forge:plates/aluminum_alloy")
		.deploying(Mechanisms.PART.SPACE)
		.build()

	// 宇航
	new SequencedAssemblyRecipe(Mechanisms.ASTRO)
		.input(Mechanisms.ASTRO.BAS)
		.deploying("cmi:nuke_cooler")
		.deploying("#forge:wires/fluix")
		.laserCutting(1000)
		.filling(Fluid.of("cmi:structural_plastic", 200))
		.deploying("#forge:plates/titanium")
		.deploying(Mechanisms.PART.SPACE)
		.build()

	// 核能
	new SequencedAssemblyRecipe(Mechanisms.NUKE)
		.input(Mechanisms.NUKE.BAS)
		.deploying("#forge:plates/composite_tungsten_steel")
		.pressing()
		.deploying("cmi:nuke_cooler")
		.deploying("alexscaves:fissile_core")
		.vacuumizing()
		.deploying(Mechanisms.PART.QUANTUM)
		.build()

	// 反物质
	new SequencedAssemblyRecipe(Mechanisms.ANTI)
		.input(Mechanisms.ANTI.BAS)
		.deploying("cmi:titanium_alloy_coil")
		.deploying("neoecoae:energized_superconductive_ingot")
		.laserCutting(1000)
		.deploying("#forge:pellets/plutonium")
		.deploying("#forge:pellets/polonium")
		.deploying(Mechanisms.PART.QUANTUM)
		.build()
})
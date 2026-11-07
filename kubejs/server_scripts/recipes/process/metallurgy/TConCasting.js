ServerEvents.recipes((event) => {
	let { thermal, tconstruct } = event.getRecipes()

	CmiMetal.getAll().forEach((material) => {
		let metal = material.getId()

		/*
		 * 把熔融流体 tag 解析成具体流体 id(多 namespace: tconstruct / thermalconstruct / forge / cmi)
		 * Fluid.tag() 生成的 tag 流体栈在 kubejs-thermal 的配方 schema 里会被当作空流体丢弃,
		 * 生成 ingredients 为空的冷却机配方, JEI 每次重载都报 IndexOutOfBoundsException(292 个/次)
		 * 没有对应熔融流体的金属直接跳过, 不再生成配方
		 */
		let moltenFluid = resolveMoltenFluid(metal)

		if (moltenFluid === null) {
			console.warn(`No molten metal fluid found for ${metal}, skipping TCon casting recipes!`)
			return
		}

		const INGOT = `#forge:ingots/${metal}`
		const NUGGET = `#forge:nuggets/${metal}`
		const BLOCK = `#forge:storage_blocks/${metal}`
		const PLATE = `#forge:plates/${metal}`
		const ROD = `#forge:rods/${metal}`
		const GEAR = `#forge:gears/${metal}`
		const COIN = `#forge:coins/${metal}`
		const WIRE = `#forge:wires/${metal}`

		const MULTI_USE_CAST = "#tconstruct:casts/multi_use"
		const SINGLE_USE_CAST = "#tconstruct:casts/single_use"

		if (Ingredient.isNotNull(INGOT)) {
			tconstruct.casting_table(highPriorityItem(INGOT))
				.cast(`${MULTI_USE_CAST}/ingot`)
				.fluid(Fluid.of(moltenFluid, 90))
				.cooling_time(20 * 3)
				.id(`cmi:metals/casting/ingot/${metal}_multi_use`)

			tconstruct.casting_table(highPriorityItem(INGOT))
				.cast(`${SINGLE_USE_CAST}/ingot`)
				.fluid(Fluid.of(moltenFluid, 90))
				.cooling_time(20 * 3)
				.cast_consumed(true)
				.id(`cmi:metals/casting/ingot/${metal}_single_use`)

			thermal.chiller(highPriorityItem(INGOT), [
				Fluid.of(moltenFluid, 90),
				`${MULTI_USE_CAST}/ingot`
			]).energy(4800)
				.id(`cmi:metals/chilling/ingot/${metal}`)
		} else {
			console.warn(`No ingot found for ${metal}!`)
		}

		if (Ingredient.isNotNull(NUGGET)) {
			tconstruct.casting_table(highPriorityItem(NUGGET))
				.cast(`${MULTI_USE_CAST}/nugget`)
				.fluid(Fluid.of(moltenFluid, 10))
				.cooling_time(20 * 1)
				.id(`cmi:metals/casting/nugget/${metal}_multi_use`)

			tconstruct.casting_table(highPriorityItem(NUGGET))
				.cast(`${SINGLE_USE_CAST}/nugget`)
				.fluid(Fluid.of(moltenFluid, 10))
				.cooling_time(20 * 1)
				.cast_consumed(true)
				.id(`cmi:metals/casting/nugget/${metal}_single_use`)

			thermal.chiller(highPriorityItem(NUGGET), [
				Fluid.of(moltenFluid, 10),
				`${MULTI_USE_CAST}/nugget`
			]).energy(600)
				.id(`cmi:metals/chilling/nugget/${metal}`)
		} else {
			console.warn(`No nugget found for ${metal}!`)
		}

		if (Ingredient.isNotNull(BLOCK)) {
			tconstruct.casting_basin(highPriorityItem(BLOCK))
				.fluid(Fluid.of(moltenFluid, 90 * 9))
				.cooling_time(20 * 9)
				.id(`cmi:metals/casting/block/${metal}`)
		} else {
			// console.warn(`No storage block found for ${metal}!`)
		}

		if (Ingredient.isNotNull(PLATE)) {
			tconstruct.casting_table(highPriorityItem(PLATE))
				.cast(`${MULTI_USE_CAST}/plate`)
				.fluid(Fluid.of(moltenFluid, 90))
				.cooling_time(20 * 3)
				.id(`cmi:metals/casting/plate/${metal}_multi_use`)

			tconstruct.casting_table(highPriorityItem(PLATE))
				.cast(`${SINGLE_USE_CAST}/plate`)
				.fluid(Fluid.of(moltenFluid, 90))
				.cooling_time(20 * 3)
				.cast_consumed(true)
				.id(`cmi:metals/casting/plate/${metal}_single_use`)

			thermal.chiller(highPriorityItem(PLATE), [
				Fluid.of(moltenFluid, 90),
				`${MULTI_USE_CAST}/plate`
			]).energy(4800)
				.id(`cmi:metals/chilling/plate/${metal}`)
		} else {
			// console.warn(`No plate found for ${metal}!`)
		}

		if (Ingredient.isNotNull(ROD)) {
			tconstruct.casting_table(highPriorityItem(ROD))
				.cast(`${MULTI_USE_CAST}/rod`)
				.fluid(Fluid.of(moltenFluid, 45))
				.cooling_time(20 * 1.5)
				.id(`cmi:metals/casting/rod/${metal}_multi_use`)

			tconstruct.casting_table(highPriorityItem(ROD))
				.cast(`${SINGLE_USE_CAST}/rod`)
				.fluid(Fluid.of(moltenFluid, 45))
				.cooling_time(20 * 1.5)
				.cast_consumed(true)
				.id(`cmi:metals/casting/rod/${metal}_single_use`)

			thermal.chiller(highPriorityItem(ROD), [
				Fluid.of(moltenFluid, 45),
				`${SINGLE_USE_CAST}/rod`
			]).energy(2400)
				.id(`cmi:metals/chilling/rod/${metal}`)
		} else {
			// console.warn(`No rod found for ${metal}!`)
		}

		if (Ingredient.isNotNull(GEAR)) {
			tconstruct.casting_table(highPriorityItem(GEAR))
				.cast(`${MULTI_USE_CAST}/gear`)
				.fluid(Fluid.of(moltenFluid, 90 * 4))
				.cooling_time(20 * 7.5)
				.id(`cmi:metals/casting/gear/${metal}_multi_use`)

			tconstruct.casting_table(highPriorityItem(GEAR))
				.cast(`${SINGLE_USE_CAST}/gear`)
				.fluid(Fluid.of(moltenFluid, 90 * 4))
				.cooling_time(20 * 7.5)
				.cast_consumed(true)
				.id(`cmi:metals/casting/gear/${metal}_single_use`)

			thermal.chiller(highPriorityItem(GEAR), [
				Fluid.of(moltenFluid, 90 * 4),
				`${MULTI_USE_CAST}/gear`
			]).energy(9600)
				.id(`cmi:metals/chilling/gear/${metal}`)
		} else {
			// console.warn(`No gear found for ${metal}!`)
		}

		if (Ingredient.isNotNull(COIN)) {
			tconstruct.casting_table(highPriorityItem(COIN))
				.cast(`${MULTI_USE_CAST}/coin`)
				.fluid(Fluid.of(moltenFluid, 30))
				.cooling_time(20 * 1.5)
				.id(`cmi:metals/casting/coin/${metal}_multi_use`)

			tconstruct.casting_table(highPriorityItem(COIN))
				.cast(`${SINGLE_USE_CAST}/coin`)
				.fluid(Fluid.of(moltenFluid, 30))
				.cooling_time(20 * 1.5)
				.cast_consumed(true)
				.id(`cmi:metals/casting/coin/${metal}_single_use`)

			thermal.chiller(highPriorityItem(COIN), [
				Fluid.of(moltenFluid, 30),
				`${MULTI_USE_CAST}/coin`
			]).energy(1600)
				.id(`cmi:metals/chilling/coin/${metal}`)
		} else {
			// console.warn(`No coins found for ${metal}!`)
		}

		if (Ingredient.isNotNull(WIRE)) {
			tconstruct.casting_table(highPriorityItem(WIRE))
				.cast(`${MULTI_USE_CAST}/wire`)
				.fluid(Fluid.of(moltenFluid, 45))
				.cooling_time(20 * 1.5)
				.id(`cmi:metals/casting/wire/${metal}_multi_use`)

			tconstruct.casting_table(highPriorityItem(WIRE))
				.cast(`${SINGLE_USE_CAST}/wire`)
				.fluid(Fluid.of(moltenFluid, 45))
				.cooling_time(20 * 1.5)
				.cast_consumed(true)
				.id(`cmi:metals/casting/wire/${metal}_single_use`)

			thermal.chiller(highPriorityItem(WIRE), [
				Fluid.of(moltenFluid, 45),
				`${MULTI_USE_CAST}/wire`
			]).energy(1600)
				.id(`cmi:metals/chilling/wire/${metal}`)
		} else {
			// console.warn(`No wires found for ${metal}!`)
		}

		event.remove([
			{
				type: "tconstruct:casting_table",
				output: `#forge:ingots/${metal}`,
			}, {
				type: "tconstruct:casting_table",
				output: `#forge:nuggets/${metal}`,
			}, {
				type: "tconstruct:casting_basin",
				output: `#forge:storage_blocks/${metal}`
			}, {
				type: "tconstruct:casting_table",
				output: `#forge:plates/${metal}`
			}, {
				type: "tconstruct:casting_table",
				output: `#forge:rods/${metal}`
			}, {
				type: "tconstruct:casting_table",
				output: `#forge:gears/${metal}`
			}, {
				type: "tconstruct:casting_table",
				output: `#forge:coins/${metal}`
			}, {
				type: "tconstruct:casting_table",
				output: `#forge:wires/${metal}`
			}, {
				type: "thermal:chilling",
				output: `#forge:ingots/${metal}`
			}, {
				type: "thermal:chilling",
				output: `#forge:plates/${metal}`
			}, {
				type: "thermal:chilling",
				output: `#forge:rods/${metal}`
			}, {
				type: "thermal:chilling",
				output: `#forge:gears/${metal}`
			}, {
				type: "thermal:chilling",
				output: `#forge:coins/${metal}`
			}, {
				type: "thermal:chilling",
				output: `#forge:wires/${metal}`
			}
		])
	})
})
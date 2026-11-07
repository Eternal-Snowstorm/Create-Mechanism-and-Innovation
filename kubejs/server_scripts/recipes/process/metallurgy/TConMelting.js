ServerEvents.recipes((event) => {
	let { tconstruct } = event.getRecipes()

	CmiMetal.getAll().forEach((material) => {
		let metal = material.getId()

		event.remove([
			{
				id: new RegExp(`^tconstruct:smeltery/melting/metal/${metal}/.+`)
			},
			{
				id: new RegExp(`^thermalconstruct:smeltery/melting/metal/${metal}/.+`)
			},
			{
				id: new RegExp(`^tconstruct:tools/materials/melting/${metal}`)
			},
			{
				id: new RegExp(`^thermalconstruct:smeltery/melting/${metal}`)
			}
		])

		let meltingPoint = CmiMetal.getMetal(metal).getMeltingPoint()
		let namespace = CmiMetal.getMetal(metal).getNamespace()

		/*
		 * 把熔融流体 tag 解析成具体流体 id(多 namespace: tconstruct / thermalconstruct / forge / cmi,
		 * 与 TConCasting.js 相同的处理), 避免生成空流体的熔化配方 没有对应熔融流体的金属直接跳过
		 */
		let moltenFluid = resolveMoltenFluid(metal)

		let ingot = `#forge:ingots/${metal}`
		let plate = `#forge:plates/${metal}`
		let nugget = `#forge:nuggets/${metal}`
		let gear = `#forge:gears/${metal}`
		let dust = `#forge:dusts/${metal}`
		let rawMaterial = `#forge:raw_materials/${metal}`
		let block = `#forge:storage_blocks/${metal}`
		let rawBlock = `#forge:storage_blocks/raw_${metal}`

		if (moltenFluid !== null) {
			if (Ingredient.isNotNull(ingot)) {
				tconstruct.melting(Fluid.of(moltenFluid, 90))
					.ingredient(ingot)
					.time(100)
					.temperature(meltingPoint)
			}

			if (Ingredient.isNotNull(plate)) {
				tconstruct.melting(Fluid.of(moltenFluid, 90))
					.ingredient(plate)
					.time(100)
					.temperature(meltingPoint)
			}

			if (Ingredient.isNotNull(nugget)) {
				tconstruct.melting(Fluid.of(moltenFluid, 10))
					.ingredient(nugget)
					.time(60)
					.temperature(meltingPoint)
			}

			if (Ingredient.isNotNull(gear)) {
				tconstruct.melting(Fluid.of(moltenFluid, 90 * 4))
					.ingredient(gear)
					.time(120)
					.temperature(meltingPoint)
			}

			if (Ingredient.isNotNull(dust)) {
				tconstruct.melting(Fluid.of(moltenFluid, 90))
					.ingredient(dust)
					.time(80)
					.temperature(meltingPoint)
			}

			if (metal.toString() !== "aluminum" && Ingredient.isNotNull(rawMaterial)) {
				tconstruct.melting(Fluid.of(moltenFluid, 90))
					.ingredient(rawMaterial)
					.time(100)
					.temperature(meltingPoint)
			}

			if (Ingredient.isNotNull(rawBlock)) {
				if (
					metal.toString() !== "aluminum"
					&& metal.toString() !== "desh"
					&& metal.toString() !== "ostrum"
					&& metal.toString() !== "calorite"
				) {
					tconstruct.melting(Fluid.of(moltenFluid, 1080))
						.ingredient(rawBlock)
						.time(200)
						.temperature(meltingPoint)
				}
			}

			if (Ingredient.isNotNull(block)) {
				if (
					metal.toString() !== "aluminum"
					&& metal.toString() !== "desh"
					&& metal.toString() !== "ostrum"
					&& metal.toString() !== "calorite"
				) {
					tconstruct.melting(Fluid.of(moltenFluid, 90 * 9))
						.ingredient(block)
						.time(200)
						.temperature(meltingPoint)
				}
			}

			if (namespace === "v") {
				event.custom({
					"type": "tconstruct:material_melting",
					"input": `tconstruct:${metal}`,
					"result": {
						"amount": 90,
						"tag": `tconstruct:molten_${metal}`
					},
					"temperature": meltingPoint
				})

			} if (namespace === "t") {
				event.custom({
					"type": "tconstruct:material_melting",
					"input": `thermalconstruct:${metal}`,
					"result": {
						"amount": 90,
						"tag": `tconstruct:molten_${metal}`
					},
					"temperature": meltingPoint
				})

			} if (namespace === "c") {
				event.custom({
					"type": "tconstruct:material_melting",
					"input": `cmi:${metal}`,
					"result": {
						"amount": 90,
						"tag": `tconstruct:molten_${metal}`
					},
					"temperature": meltingPoint
				})
			}
			// console.log(`created recipes for material ${metal}`)
		}
	})
})
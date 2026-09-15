ServerEvents.highPriorityData((event) => {
	// 石油
	addUnification("crude_oil", [
		"ad_astra:oil",
		"thermal:crude_oil"
	], "createdieselgenerators:crude_oil")

	// 植物油
	addUnification("plant_oil", [
		"immersiveengineering:plantoil",
		"createaddition:seed_oil"
	], "createdieselgenerators:plant_oil")

	// 蒸汽
	addUnification("steam", [
		"steampowered:steam",
		"create_steam_ages:steam"
	], "mekanism:steam")

	// 杂酚油
	addUnification("creosote", [
		"thermal:creosote"
	], "immersiveengineering:creosote")

	// 汽油
	addUnification("gasoline", [
		"thermal_extra:gasoline"
	], "createdieselgenerators:gasoline")

	// 生物柴油
	addUnification("biodiesel", [
		"createaddition:bioethanol",
		"immersiveengineering:biodiesel",
		"mekanismgenerators:bioethanol"
	], "createdieselgenerators:biodiesel")

	// 凛冰
	addUnification("cryo", [
		"ad_astra:cryo_fuel"
	], "neoecoae:cryotheum_solution")

	// 细雪
	addUnification("power_snow", [
		"fluidlogistics:powder_snow",
		"tconstruct:powdered_snow"
	], "tconstruct:powdered_snow")

	/** 
	 * 
	 * @param {string} name 统一的名称
	 * @param {Internal.Fluid | Internal.FluidTag | (Internal.Fluid | Internal.FluidTag)[]} fluids 被统一的流体
	 * @param {Internal.Fluid} result 最终统一的流体
	 */
	function addUnification(name, fluids, result) {
		if (fluids === null) {
			console.error(`Fluids ${fluids} cannot be null`)
		}

		if (result === null) {
			console.error(`Fluid ${result} cannot be null`)
		}

		if (!Fluid.exists(result)) {
			console.error(`Fluid ${result} does not exist`)
			return
		}

		// 没装的流体跳过, 标签留给 OEF 自己解析
		let matchFluid = fluids.filter((fluid) => {
			if (fluid.startsWith("#")) {
				return true
			}

			if (!Fluid.exists(fluid)) {
				console.warn(`Fluid ${fluid} does not exist`)
				return false
			}

			return true
		})

		if (matchFluid.length === 0) {
			return
		}

		let fluidUnification = {
			matchFluid: matchFluid,
			resultFluid: result
		}

		event.addJson(`oef:replacements/${name}.json`, fluidUnification)

		// 顺带统一流体方块和桶, 没有方块或桶的流体自动过滤
		addBlockUnification(name, matchFluid, result)
		addBucketUnification(name, matchFluid, result)
	}

	/** 
	 * 
	 * @param {string} name 
	 * @param {(Internal.Fluid | Internal.FluidTag)[]} fluids 
	 * @param {Internal.Fluid} result 
	 * @returns 
	 */
	function addBlockUnification(name, fluids, result) {
		let resultBlock = getFluidBlock(result)

		if (resultBlock === null) {
			return
		}

		let matchBlock = fluids.map((fluid) => getFluidBlock(fluid)).filter((block) => block !== null)

		if (matchBlock.length === 0) {
			return
		}

		let blockUnification = {
			matchBlock: matchBlock,
			resultBlock: resultBlock
		}

		event.addJson(`oeb:replacements/${name}_fluid_block.json`, blockUnification)
	}

	/** 
	 * 
	 * @param {string} name 
	 * @param {(Internal.Fluid | Internal.FluidTag)[]} fluids 
	 * @param {Internal.Fluid} result 
	 * @returns 
	 */
	function addBucketUnification(name, fluids, result) {
		let resultBucket = getFluidBucket(result)

		if (resultBucket === "minecraft:air") {
			return
		}

		let matchBucket = fluids.map((fluid) => getFluidBucket(fluid)).filter((bucket) => bucket !== "minecraft:air")

		if (matchBucket.length === 0) {
			return
		}

		let itemUnification = {
			matchItems: matchBucket,
			resultItems: resultBucket
		}

		event.addJson(`oei:replacements/${name}_bucket.json`, itemUnification)
	}

	/**
	 * 有方块形态的流体返回方块 id, 没有则返回 null
	 * 
	 * @param {Internal.Fluid} fluid 
	 * @returns {string}
	 */
	function getFluidBlock(fluid) {
		if (fluid.startsWith("#") || !Fluid.exists(fluid)) {
			return null
		}

		let state = Fluid.getType(fluid).defaultFluidState().createLegacyBlock()

		if (state.isAir()) {
			return null
		}

		return Block.getId(state.getBlock()).toString()
	}

	/**
	 * 有桶的流体返回桶的物品 id, 没有则返回 "minecraft:air"
	 * 
	 * @param {Internal.Fluid} fluid 
	 * @returns {string}
	 */
	function getFluidBucket(fluid) {
		if (fluid.startsWith("#") || !Fluid.exists(fluid)) {
			return "minecraft:air"
		}

		let bucket = Fluid.getType(fluid).getBucket()

		if (bucket === null) {
			return "minecraft:air"
		}

		return Item.getId(bucket).toString()
	}
})
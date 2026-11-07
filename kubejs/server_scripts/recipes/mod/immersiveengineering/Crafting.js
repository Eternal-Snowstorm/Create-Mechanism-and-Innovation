ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	let BlueprintMolds = Object.freeze({
		MOLD: "molds",
		ELECTRODE: "electrode",
		BANNERPATTERN: "bannerpatterns",
		COMPONENTS: "components",
		SPECIAL_BULLET: "specialBullet",
		BULLET: "bullet",
		MECHANISM: "mechanism"
	})

	/**
	 * 
	 * @param {string} type 模具类型
	 * @returns 
	 */
	function getMold(type) {
		let item = Item.of("immersiveengineering:blueprint")
		item = item.withNBT({ blueprint: type })
		return item
	}

	/**
	 * 
	 * @param {OutputItem_} type 模具类型
	 * @param {string[]} pattern 配方模式
	 * @param {{[key in string]: InputItem_}} key 配方键
	 * @returns 
	 */
	function addBlueprintRecipe(type, pattern, key) {
		let recipe = kubejs.shaped(getMold(type), pattern, key)
		recipe.id(`immersiveengineering:crafting/blueprint_${type}`)
		return recipe
	}

	// 蓝图
	addBlueprintRecipe(BlueprintMolds.MOLD, [
		" C ",
		" B ",
		" A "
	], {
		A: ["#forge:ingots/industrial_iron", "#forge:plates/industrial_iron"],
		B: "#forge:nuggets/iron",
		C: "minecraft:paper"
	})

	// 蓝图
	addBlueprintRecipe(BlueprintMolds.ELECTRODE, [
		" C ",
		" B ",
		" A "
	], {
		A: "#forge:ingots/hop_graphite",
		B: "minecraft:paper",
		C: "#forge:nuggets/iron"
	})

	addBlueprintRecipe(BlueprintMolds.BANNERPATTERN, [
		" C ",
		" B ",
		" A "
	], {
		A: "#minecraft:wool",
		B: "minecraft:paper",
		C: "#forge:nuggets/iron"
	})

	addBlueprintRecipe(BlueprintMolds.COMPONENTS, [
		" C ",
		" B ",
		" A "
	], {
		A: "#forge:gears",
		B: "minecraft:paper",
		C: "#forge:nuggets/iron"
	})

	addBlueprintRecipe(BlueprintMolds.SPECIAL_BULLET, [
		" C ",
		" B ",
		" A "
	], {
		A: "cmi:nitrocellulose",
		B: "minecraft:paper",
		C: "#forge:nuggets/iron"
	})

	addBlueprintRecipe(BlueprintMolds.BULLET, [
		" C ",
		" B ",
		" A "
	], {
		A: "minecraft:gunpowder",
		B: "minecraft:paper",
		C: "#forge:nuggets/iron"
	})

	// 风帆
	kubejs.shaped("immersive_aircraft:sail", [
		"AA ",
		" AA",
		"AA "
	], {
		A: "#forge:fabric_hemp"
	}).id("immersive_aircraft:sail")

	// 滑翔翼
	kubejs.shaped("immersiveengineering:glider", [
		" A ",
		"BCB",
		"DAD"
	], {
		A: "#forge:rods/iron",
		B: "immersive_aircraft:sail",
		C: "#forge:leather",
		D: "farmersdelight:rope"
	}).id("immersiveengineering:crafting/glider")

	// 电解机
	kubejs.shaped("immersiveindustry:electrolyzer", [
		"NPN",
		"CMD",
		"PEP"
	], {
		N: "#forge:rods/cast_iron",
		C: "#forge:rods/tin",
		D: "#forge:rods/electrum",
		M: Mechanisms.COIL.COM,
		P: "#forge:plates/cast_iron",
		E: "create:wooden_bracket"
	}).id("immersiveindustry:crafting/electrolyzer")
})
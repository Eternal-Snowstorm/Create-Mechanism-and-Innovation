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

	// 铁机械零件
	kubejs.shaped("2x immersiveengineering:component_iron", [
		"P P",
		" G ",
		"P P"
	], {
		P: "#forge:plates/iron",
		G: "#forge:gears/copper"
	}).id("immersiveengineering:crafting/component_iron")

	// 钢机械零件
	kubejs.shaped("2x immersiveengineering:component_steel", [
		"P P",
		" G ",
		"P P"
	], {
		P: "#forge:plates/steel",
		G: "#forge:gears/electrum"
	}).id("immersiveengineering:crafting/component_steel")

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

	// 铁机壳
	kubejs.shaped("4x cmi:iron_casing", [
		"ABA",
		"BCB",
		"ABA"
	], {
		A: "#forge:plates/iron",
		B: Casing.INDUSTRY,
		C: "#forge:gears/copper"
	})

	// 铁机壳
	kubejs.shaped("8x cmi:steel_casing", [
		"ABA",
		"BCB",
		"ABA"
	], {
		A: "#forge:plates/steel",
		B: Casing.INDUSTRY,
		C: "#forge:gears/electrum"
	})

	// 铜线圈
	kubejs.shaped("4x cmi:copper_coil", [
		"A A",
		" B ",
		"A A"
	], {
		A: "#forge:wires/copper",
		B: "createaddition:spool"
	}).id("immersiveengineering:crafting/coil_lv")

	// 琥珀金线圈
	kubejs.shaped("4x cmi:electrum_coil", [
		"A A",
		" B ",
		"A A"
	], {
		A: "#forge:wires/electrum",
		B: "createaddition:spool"
	}).id("immersiveengineering:crafting/coil_mv")

	// 钢线圈
	kubejs.shaped("4x cmi:steel_coil", [
		"A A",
		" B ",
		"A A"
	], {
		A: "#forge:wires/steel",
		B: "createaddition:spool"
	}).id("immersiveengineering:crafting/coil_hv")

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
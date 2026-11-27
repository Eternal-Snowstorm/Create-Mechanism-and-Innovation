ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

    event.remove({
        output:"immersiveengineering:blueprint"
    })

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
		return recipe
	}

	// 蓝图
	addBlueprintRecipe(BlueprintMolds.MOLD, [
		"A",
		"B",
		"C"
	], {
		A: "minecraft:paper",
		B: "#forge:nuggets/iron",
		C: ["#forge:ingots/industrial_iron", "#forge:plates/industrial_iron"]
	})

	// 蓝图
	addBlueprintRecipe(BlueprintMolds.ELECTRODE, [
		"A",
		"B",
		"C"
	], {
		A: "#forge:nuggets/iron",
		B: "minecraft:paper",
		C: "#forge:ingots/hop_graphite"
	})

	addBlueprintRecipe(BlueprintMolds.BANNERPATTERN, [
		"A",
		"B",
		"C"
	], {
		A: "#forge:nuggets/iron",
		B: "minecraft:paper",
		C: "#minecraft:wool"
	})

	addBlueprintRecipe(BlueprintMolds.COMPONENTS, [
		"A",
		"B",
		"C"
	], {
		A: "#forge:nuggets/iron",
		B: "minecraft:paper",
		C: "#forge:gears"
	})

	addBlueprintRecipe(BlueprintMolds.SPECIAL_BULLET, [
		"A",
		"B",
		"C"
	], {
		A: "#forge:nuggets/iron",
		B: "minecraft:paper",
		C: "cmi:nitrocellulose"
	})

	addBlueprintRecipe(BlueprintMolds.BULLET, [
		"A",
		"B",
		"C"
	], {
		A: "#forge:nuggets/iron",
		B: "minecraft:paper",
		C: "minecraft:gunpowder"
	})

	// 风帆
	kubejs.shaped("immersive_aircraft:sail", [
		"AA ",
		" AA",
		"AA "
	], {
		A: "#forge:fabric_hemp"
	}).id("immersive_aircraft:sail")

	// 电解机
	kubejs.shaped("immersiveindustry:electrolyzer", [
		"ABA",
		"CDE",
		"BFB"
	], {
		A: "#forge:rods/cast_iron",
		B: "#forge:plates/cast_iron",
		C: "#forge:rods/tin",
		D: Mechanisms.COIL.COM,
		E: "#forge:rods/electrum",
		F: "immersiveengineering:treated_fence"
	}).id("immersiveindustry:crafting/electrolyzer")
})
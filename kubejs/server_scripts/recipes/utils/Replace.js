ServerEvents.recipes((event) => {
	let inputs = [
		["minecraft:copper_ingot", "#forge:ingots/copper"],
		["create:powdered_obsidian", "#forge:dusts/obsidian"],
		["create:andesite_alloy", "#forge:ingots/andesite_alloy"],
		["mekanism:salt", "#forge:dusts/salt"],
		["ratatouille:salt", "#forge:dusts/salt"],
		["create:cogwheel", "#create:cogwheel"],
		["create:large_cogwheel", "#create:large_cogwheel"],
		["farmersdelight:rice", "#forge:seeds/rice"]
	]
	inputs.forEach(([from, to]) => {
		// 同步遍历所有配方
		event.forEachRecipe({}, (recipe) => {
			try {
				recipe.replaceInput(from, to)
			} catch (error) {
				console.error(`替换出错: ${from} => ${to}`)
				console.error(error)
			}
		})
	})

	CmiGlobal.DYE_COLOR_GROUP.forEach((color) => {
		event.forEachRecipe({
			input: `minecraft:${color}_dye`
		}, (recipe) => {
			if (!recipe.hasOutput("#forge:dyes")) {
				recipe.replaceInput(`minecraft:${color}_dye`, `#forge:dyes/${color}`)
			}
		})
	})

	event.replaceInput({
		mod: "ad_astra"
	}, "ad_astra:steel_rod", "#forge:rods/steel")

	event.replaceInput({
		mod: "ad_astra"
	}, "ad_astra:iron_rod", "#forge:rods/iron")

	// 强化高炉砖
	event.replaceInput({
		output: "immersiveengineering:blastbrick_reinforced"
	}, "#forge:plates/steel", "#forge:plates/invar")
})
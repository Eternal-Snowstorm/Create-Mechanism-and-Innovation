ServerEvents.recipes((event) => {
	let { kubejs, create, tconstruct } = event.getRecipes()

	// 物品抽屉
	let drawerWoodTypes = [
		"oak",
		"spruce",
		"birch",
		"jungle",
		"acacia",
		"dark_oak",
		"mangrove",
		"crimson",
		"warped",
		"cherry",
		"rubberwood"
	]
	let drawer1 = []
	let drawer2 = []
	let drawer4 = []

	drawerWoodTypes.forEach((type) => {
		// 物品抽屉1
		kubejs.shaped(getWoodenDrawerItem(type, 1), [
			"AAA",
			"ABA",
			"AAA"
		], {
			A: `#minecraft:planks/${type}`,
			B: Mechanisms.WOODEN.COM
		}).id(getWoodenDrawerId(type, 1))

		// 物品抽屉2
		kubejs.shaped(getWoodenDrawerItem(type, 2), [
			"ABA",
			"AAA",
			"ABA"
		], {
			A: `#minecraft:planks/${type}`,
			B: Mechanisms.WOODEN.COM
		}).id(getWoodenDrawerId(type, 2))

		// 物品抽屉4
		kubejs.shaped(getWoodenDrawerItem(type, 4), [
			"ABA",
			"BAB",
			"ABA"
		], {
			A: `#minecraft:planks/${type}`,
			B: Mechanisms.WOODEN.COM
		}).id(getWoodenDrawerId(type, 4))

		drawer1.push(`#functionalstorage:drawers/${type}/1`)
		drawer2.push(`#functionalstorage:drawers/${type}/2`)
		drawer4.push(`#functionalstorage:drawers/${type}/4`)
	})

	// 流体抽屉1
	kubejs.shaped("functionalstorage:fluid_1", [
		"AAA",
		"ABA",
		"AAA"
	], {
		A: "#forge:plates/iron",
		B: Mechanisms.COPPER.COM
	}).id("functionalstorage:fluid_1")

	// 流体抽屉2
	kubejs.shaped("functionalstorage:fluid_2", [
		"ABA",
		"AAA",
		"ABA"
	], {
		A: "#forge:plates/iron",
		B: Mechanisms.COPPER.COM
	}).id("functionalstorage:fluid_2")

	// 流体抽屉4
	kubejs.shaped("functionalstorage:fluid_4", [
		"ABA",
		"BAB",
		"ABA"
	], {
		A: "#forge:plates/iron",
		B: Mechanisms.COPPER.COM
	}).id("functionalstorage:fluid_4")

	// 镶框抽屉1
	kubejs.shapeless("functionalstorage:framed_1", [
		drawer1,
		"#copycats:copycat_block"
	]).id("functionalstorage:framed_1")

	// 镶框抽屉2
	kubejs.shapeless("functionalstorage:framed_2", [
		drawer2,
		"#copycats:copycat_block"
	]).id("functionalstorage:framed_2")

	// 镶框抽屉4
	kubejs.shapeless("functionalstorage:framed_4", [
		drawer4,
		"#copycats:copycat_block"
	]).id("functionalstorage:framed_4")

	// 简易压缩抽屉
	kubejs.shaped("functionalstorage:simple_compacting_drawer", [
		"PAP",
		" M ",
		"PAP"
	], {
		P: "#forge:plates/stone",
		A: "tconstruct:pattern",
		M: Mechanisms.WOODEN.COM
	}).id("functionalstorage:simple_compacting_drawer")

	// 镶框简易压缩抽屉
	kubejs.shapeless("functionalstorage:framed_simple_compacting_drawer", [
		"functionalstorage:simple_compacting_drawer",
		"#copycats:copycat_block"
	]).id("functionalstorage:framed_simple_compacting_drawer")

	// 压缩抽屉
	kubejs.shaped("functionalstorage:compacting_drawer", [
		"PAP",
		"MIM",
		"PAP"
	], {
		P: "#forge:plates/stone",
		A: "tconstruct:pattern",
		M: Mechanisms.WOODEN.COM,
		I: Mechanisms.IRON.COM
	}).id("functionalstorage:compacting_drawer")

	// 镶框压缩抽屉
	kubejs.shapeless("functionalstorage:compacting_framed_drawer", [
		"functionalstorage:compacting_drawer",
		"#copycats:copycat_block"
	]).id("functionalstorage:compacting_framed_drawer")

	/**
	 * 
	 * @param {string} woodType 
	 * @param {1 | 2 | 4} drawerType
	 * @returns {ResourceLocation}
	 */
	function getWoodenDrawerId(woodType, drawerType) {
		return Ingredient.of(`#functionalstorage:drawers/${woodType}/${drawerType}`).getItemIds()[0]
	}

	/**
	 * 
	 * @param {string} woodType 
	 * @param {1 | 2 | 4} drawerType
	 * @returns {Internal.ItemStack_}
	 */
	function getWoodenDrawerItem(woodType, drawerType) {
		return Item.of(getWoodenDrawerId(woodType, drawerType), drawerType)
	}
})
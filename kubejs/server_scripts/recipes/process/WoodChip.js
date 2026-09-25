ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	// 压缩
	let woodChipArray = [
		["cmi:wood_chip_briquette", "4x #forge:dusts/wood"],
		["cmi:compressed_wood_chip_briquette", "4x cmi:wood_chip_briquette"],
		["cmi:densely_packed_wood_chip_briquette", "4x cmi:compressed_wood_chip_briquette"]
	]
	woodChipArray.forEach((data) => {
		create.compacting(data[0], [
			data[1]
		])
	})

	// 浸油
	create.compacting("cmi:creosote_wood_chip_briquette", [
		"cmi:densely_packed_wood_chip_briquette",
		CreateFluidIngredient.ofTagId("forge:creosote", 250)
	])
})
ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 泥炭块
	kubejs.shaped("cmi:peat_block", [
		"AA",
		"AA"
	], {
		A: "cmi:peat"
	})

	// 泥炭
	kubejs.shapeless("4x cmi:peat", [
		"cmi:peat_block"
	])

	// 草绳
	kubejs.shapeless("cmi:grass_string", [
		"3x cmi:grass_fiber"
	])

	// 黄铜楼梯
	kubejs.shaped("4x cmi:brass_stairs", [
		"A  ",
		"AA ",
		"AAA"
	], {
		A: "#forge:storage_blocks/brass"
	})

	// 恩特罗块
	kubejs.shaped("cmi:entro_block", [
		"AAA",
		"AAA",
		"AAA"
	], {
		A: "#forge:gems/entro"
	})

	kubejs.shapeless("9x cmi:entro_crystal", [
		"cmi:entro_block"
	])

	// 水晶块
	kubejs.shaped("cmi:crystal_block", [
		"AA",
		"AA"
	], {
		A: "neoecoae:crystal_ingot"
	})

	kubejs.shapeless("4x neoecoae:crystal_ingot", [
		"cmi:crystal_block"
	])

	// 矿藏粉末块
	kubejs.shaped("cmi:deposit_dust_block", [
		"AAA",
		"AAA",
		"AAA"
	], {
		A: "#forge:dusts/deposit"
	})

	event.custom({
		type: "functionalstorage:custom_compacting",
		higher_input: Item.of("cmi:deposit_dust_block"),
		lower_input: Item.of("cmi:deposit_dust", 9)
	})
})
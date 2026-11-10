ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 存储控制器
	kubejs.shaped("functionalstorage:storage_controller", [
		"PPP",
		"RMR",
		"FFF"
	], {
		M: Mechanisms.WOODEN.COM,
		R: Mechanisms.REDSTONE.COM,
		P: "#forge:plates/stone",
		F: "#forge:flints"
	}).id("functionalstorage:storage_controller")

	// 镶框存储控制器
	kubejs.shapeless("functionalstorage:framed_storage_controller", [
		"functionalstorage:storage_controller",
		"#copycats:copycat_block"
	]).id("functionalstorage:framed_storage_controller")

	// 控制器扩展器
	kubejs.shaped("2x functionalstorage:controller_extension", [
		"PPP",
		"RMR",
		"FFF"
	], {
		M: Mechanisms.WOODEN.COM,
		R: "#forge:dusts/redstone",
		P: "#forge:plates/stone",
		F: "#forge:flints"
	}).id("functionalstorage:controller_extension")

	// 镶框控制器扩展器
	kubejs.shapeless("functionalstorage:framed_controller_extension", [
		"functionalstorage:controller_extension",
		"#copycats:copycat_block"
	]).id("functionalstorage:framed_controller_extension")

	// 军械柜
	kubejs.shaped("functionalstorage:armory_cabinet", [
		"P P",
		"MIM",
		"P P"
	], {
		M: Mechanisms.WOODEN.COM,
		P: "#forge:plates/stone",
		I: "#forge:plates/iron"
	}).id("functionalstorage:armory_cabinet")
})
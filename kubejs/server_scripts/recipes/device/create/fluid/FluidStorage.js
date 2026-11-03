// Create · 流体储存（流体罐、流体容器、多流体储罐）
ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()


	// 流体储罐
	kubejs.shaped("create:fluid_tank", [
		"A",
		"B",
		"A"
	], {
		A: "#forge:plates/copper",
		B: "#forge:glass/prism"
	}).id("create:crafting/kinetics/fluid_tank")


	kubejs.shaped("2x create:fluid_tank", [
		" A ",
		"ABA",
		" A "
	], {
		A: "#forge:plates/copper",
		B: "#forge:glass"
	}).id("create:crafting/kinetics/fluid_tank2")


	// 多流体储罐
	kubejs.shaped("fluidlogistics:multi_fluid_tank", [
		" A ",
		"ABA",
		" A "
	], {
		A: "#forge:plates/brass",
		B: "#forge:glass"
	}).id("fluidlogistics:multi_fluid_tank")


	kubejs.shaped("fluidlogistics:horizontal_multi_fluid_tank", [
		"A A",
		" B ",
		"A A"
	], {
		A: "#forge:plates/brass",
		B: "#forge:glass"
	}).id("fluidlogistics:horizontal_multi_fluid_tank")


	kubejs.shaped("create_connected:fluid_vessel", [
		"ABA"
	], {
		A: "#forge:plates/copper",
		B: "#forge:glass/prism"
	}).id("create_connected:crafting/kinetics/fluid_vessel")


	kubejs.shaped("2x create_connected:fluid_vessel", [
		"A A",
		" B ",
		"A A"
	], {
		A: "#forge:plates/copper",
		B: "#forge:glass"
	})
})

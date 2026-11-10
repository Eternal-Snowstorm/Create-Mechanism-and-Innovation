ServerEvents.recipes((event) => {
	let { create, farmersdelight } = event.getRecipes()

	farmersdelight.cutting("cmi:andesite_alloy_noodle_stage0", [
		"#forge:plates/andesite_alloy"
	], "#forge:tools/knives")

	create.mixing("cmi:andesite_alloy_noodle_stage1", [
		"cmi:andesite_alloy_noodle_stage0",
		"2x #forge:dusts/andesite",
		"2x create:cinder_flour"
	])

	create.sequenced_assembly("cmi:andesite_alloy_noodle_stage2", [
		"cmi:andesite_alloy_noodle_stage1"
	], [
		create.deploying("cmi:andesite_alloy_noodle_stage1", [
			"cmi:andesite_alloy_noodle_stage1",
			"#forge:nuggets/brass"
		]),
		create.deploying("cmi:andesite_alloy_noodle_stage1", [
			"cmi:andesite_alloy_noodle_stage1",
			"create:rose_quartz"
		]),
		create.deploying("cmi:andesite_alloy_noodle_stage1", [
			"cmi:andesite_alloy_noodle_stage1",
			"create:polished_rose_quartz"
		]),
		create.filling("cmi:andesite_alloy_noodle_stage1", [
			"cmi:andesite_alloy_noodle_stage1",
			Fluid.of("minecraft:lava", 500)
		])
	]).loops(1).transitionalItem("cmi:andesite_alloy_noodle_stage1")

	create.emptying([
		"cmi:andesite_alloy_noodle",
		Fluid.of("minecraft:lava", 500)
	], "cmi:andesite_alloy_noodle_stage2")
})
ServerEvents.recipes((event) => {
	let { kubejs, thermal_extra, neoecoae } = event.getRecipes()

	// 无线连接器
	thermal_extra.component_assembly("expatternprovider:wireless_connect", [
		Casing.SMART,
		"create:transmitter",
		"#ae2:glass_cable"
	]).id("expatternprovider:wireless_connector")

	// 无线集线器
	thermal_extra.component_assembly("expatternprovider:wireless_hub", [
		"expatternprovider:wireless_connect",
		"ae2:wireless_receiver",
		Mechanisms.SMART.COM
	]).id("expatternprovider:wireless_hub")

	// 量子环
	neoecoae.integrated_working_station()
		.itemOutput("ae2:quantum_ring")
		.inputItems([
			Casing.COMPUTE,
			Mechanisms.COMPUTE.COM,
			"4x #forge:plates/silicon_carbide",
			"2x #forge:plates/energized_superconductive",
			"2x #forge:gems/energized_fluix_crystal"
		])
		.id("ae2:network/blocks/quantum_ring")

	// 量子链接仓
	neoecoae.integrated_working_station()
		.itemOutput("ae2:quantum_link")
		.inputItems([
			"ae2:quartz_glass",
			Mechanisms.COMPUTE.COM,
			"4x #forge:plates/silicon_carbide",
			"2x #forge:plates/energized_superconductive",
			"2x #forge:gems/energized_fluix_crystal"
		])
		.id("ae2:network/blocks/quantum_link")

	// 无限范围增幅
	thermal_extra.component_assembly("aeinfinitybooster:infinity_card", [
		"ae2:wireless_booster",
		Mechanisms.ENDER.COM,
		"ae2:fluix_pearl",
		"#forge:plates/silicon"
	]).id("aeinfinitybooster:infinity_card")

	// 维度卡
	thermal_extra.component_assembly("aeinfinitybooster:dimension_card", [
		"aeinfinitybooster:infinity_card",
		"ae2:sky_dust",
		"#forge:gems/energized_fluix_crystal",
		"#forge:plates/silicon_carbide"
	]).id("aeinfinitybooster:dimension_card")

	// ME光束成型器
	thermal_extra.component_assembly("me_beam_former:beam_former_part", [
		"#forge:plates/aluminum",
		"#forge:plates/silver",
		Mechanisms.PHOTO.COM,
		"ae2:fluix_pearl",
		"#ae2:glass_cable"
	]).id("me_beam_former:beam_former_part")

	// 大型光束成型器
	thermal_extra.component_assembly("me_beam_former:beam_former_block", [
		"me_beam_former:beam_former_part",
		"#forge:plates/platinum",
		Mechanisms.SMART.COM,
		"ae2:fluix_pearl"
	]).id("me_beam_former:beam_former_block")

	// 全向光束成型器
	thermal_extra.component_assembly("me_beam_former:omni_beam_former_block", [
		"me_beam_former:beam_former_block",
		"cmi:piezoelectric_ceramic",
		"cmi:magnetic_contact",
		Mechanisms.COMPUTE.COM
	]).id("me_beam_former:omni_beam_former_block")

	// 无线能源感应塔
	neoecoae.integrated_working_station()
		.itemOutput("me_beam_former:wireless_energy_tower")
		.inputFluid(Fluid.of("cmi:silicon_rubber", 500))
		.inputItems([
			"8x #forge:plates/platinum",
			"2x #forge:plates/aluminum_alloy",
			"4x #forge:plates/silicon_carbide",
			"4x cmi:magnetic_contact",
			"2x #forge:gems/energized_fluix_crystal",
			Mechanisms.COMPUTE.COM
		])
		.id("me_beam_former:wireless_energy_tower")
})
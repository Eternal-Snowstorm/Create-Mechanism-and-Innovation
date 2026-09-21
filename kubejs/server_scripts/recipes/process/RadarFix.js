ServerEvents.recipes((event) => {
	let { create } = event.getRecipes()

	create.item_application("cmi:power_supply", [
		"cmi:broken_power_supply",
		"cmi:power_supply_repair_kit"
	])
	create.item_application("cmi:transformer", [
		"cmi:broken_transformer",
		"cmi:transformer_repair_kit"
	])
	create.item_application("cmi:tracking_array", [
		"cmi:broken_tracking_array",
		"cmi:tracker_repair_kit"
	])
	create.item_application("cmi:modem", [
		"cmi:broken_modem",
		"cmi:modem_repair_kit"
	])
	create.item_application("cmi:radar", [
		"cmi:broken_radar",
		"cmi:radar_repair_kit"
	])
})
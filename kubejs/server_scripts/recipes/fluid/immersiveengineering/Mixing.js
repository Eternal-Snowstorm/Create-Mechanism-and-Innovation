ServerEvents.recipes((event) => {
	let { immersiveengineering } = event.getRecipes()

	// 红石酸
	event.custom({
		"type": "immersiveengineering:mixer",
		"energy": 1600,
		"fluid": {
			"amount": 90,
			"tag": "tconstruct:molten_lead"
		},
		"inputs": [
			{
				"tag": "forge:dusts/redstone"
			}
		],
		"result": {
			"amount": 200,
			"fluid": "immersiveengineering:redstone_acid"
		}
	}).id("immersiveengineering:mixer/redstone_acid")
})
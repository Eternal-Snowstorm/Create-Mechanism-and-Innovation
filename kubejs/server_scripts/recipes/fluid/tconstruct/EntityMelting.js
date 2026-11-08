ServerEvents.recipes((event) => {
	event.custom({
		"type": "tconstruct:entity_melting",
		"damage": 2,
		"entity": {
			"type": "minecraft:player"
		},
		"result": {
			"fluid": "cmi:blood",
			"amount": 20
		}
	})
})
let radioactiveItems =
	Ingredient.of("#cmi:radioactive_items").getItemIds()["toArray(java.lang.Object[])"]([""])

let tickCounter = 0

PlayerEvents.tick((event) => {
	tickCounter ++

	if (tickCounter < 10) {
		return
	}

	tickCounter = 0

	let { player, level } = event

	if (level.isClientSide() || player.isCreative() || player.isFake()) {
		return
	}

	let hasRadioactive = false
	for (let stack of player.inventory.items) {
		if (!stack.isEmpty() && radioactiveItems.includes(stack.id)) {
			hasRadioactive = true
			break
		}
	}

	if (hasRadioactive) {
		level.runCommandSilent(`mek radiation addEntity ${player.getUsername()} 0.00000001`)
	}
})
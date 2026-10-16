PlayerEvents.inventoryChanged((event) => {
    let { item, player, level } = event

    let radioactiveItems = 
        Ingredient.of(Cmi.loadResource("radioactive_items")).getItemIds()["toArray(java.lang.Object[])"]([""])

    if (level.isClientSide() || !player || player.isCreative() || player.isFake()) {
        return
    }

    if (item.isEmpty() || !item || !radioactiveItems.includes(item.id)) {
        return false
    }
    
    if (radioactiveItems.includes(item.id)) {
        level.runCommandSilent(`mek radiation addEntity ${player.getUsername()} 1`)
		level.runCommandSilent(`advancement grant ${player.getUsername()} only mekanism:radiation_poisoning`)
    }
})
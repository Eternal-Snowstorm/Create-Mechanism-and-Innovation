ServerEvents.recipes((event) => {
    let { thermal } = event.getRecipes()

    // 安山岩
    thermal.rock_gen("minecraft:andesite")
        .below("create:andesite_alloy_block")
        .adjacent("minecraft:water")

    // 熔渣
    thermal.rock_gen("create:scoria")
        .adjacent("create:chocolate")

    // 石灰岩
    thermal.rock_gen("create:limestone")
        .adjacent("minecraft:water")
		.below("minecraft:dripstone_block")
})
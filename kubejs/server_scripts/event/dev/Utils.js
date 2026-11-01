// (() => {
// 	BlockEvents.rightClicked((event) => {
// 		let { block, hand } = event

// 		if (block.getId() !== "minecraft:bedrock") {
// 			return
// 		}

// 		if (!hand.equals(InteractionHand.MAIN_HAND)) {
// 			return
// 		}

// 		Ingredient.of("#forge:storage_blocks/steel")
// 			.getItemIds()
// 			.forEach((id) => {
// 				console.log(id)
// 			})
// 	})
// })()
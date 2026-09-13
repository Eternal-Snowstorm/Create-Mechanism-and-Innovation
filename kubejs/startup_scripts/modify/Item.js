ItemEvents.modification((event) => {
	let month = LocalDateTime.now().getMonthValue()
	let day = LocalDateTime.now().getDayOfMonth()

	/**
	 *
	 * @param {Internal.ItemStack_} item 修改的物品
	 * @param {number} time 修改的时间(单位: 1个物品[即200tick])
	 * @returns 
	 */
	function modifyItemBurnTime(item, time) {
		return event.modify(item, (modify) => {
			const BURN_TIME = 200
			modify.setBurnTime(BURN_TIME * time)
		})
	}

	// 煤粉燃烧时间
	modifyItemBurnTime("mekanism:dust_coal", 12)

	// 木屑块燃烧时间
	modifyItemBurnTime("createdieselgenerators:wood_chip", 4)

	// 钻石燃烧时间
	modifyItemBurnTime("minecraft:diamond", 128)

	// 泥炭块
	modifyItemBurnTime("cmi:peat_block", 16)

	// 削弱木炭
	modifyItemBurnTime("minecraft:charcoal", 4)
	modifyItemBurnTime("mekanism:dust_charcoal", 4 * 1.5)
	modifyItemBurnTime("mekanism:block_charcoal", 4 * 9)
	modifyItemBurnTime("thermal:charcoal_block", 4 * 9)

	// 奶酪统一处理
	event.modify("ad_astra:cheese_block", (modify) => {
		modify.setFoodProperties((builder) => {
			builder.hunger(4)
				.saturation(1)
		})
	})

	event.modify("tconstruct:cheese_ingot", (modify) => {
		modify.setFoodProperties((builder) => {
			builder.hunger(4)
				.saturation(1)
		})
	})

	event.modify("tconstruct:cheese_block", (modify) => {
		modify.setFoodProperties((builder) => {
			builder.hunger(4)
				.saturation(1)
		})
	})

	// 烈焰蛋糕
	event.modify("create:blaze_cake", (modify) => {
		modify.setFoodProperties((builder) => {
			builder.hunger(10)
				.saturation(1.2)
		})
	})

	// 甘蔗
	event.modify("minecraft:sugar_cane", (modify) => {
		modify.setFoodProperties((builder) => {
			builder.hunger(2)
				.saturation(2)
				.alwaysEdible()
				.fastToEat()
		})
	})

	// 糖
	event.modify("minecraft:sugar", (modify) => {
		modify.setFoodProperties((builder) => {
			builder.hunger(1)
				.saturation(2)
		})
	})

	// 桶
	event.modify("minecraft:bucket", (modify) => {
		modify.setMaxStackSize(64)
	})

	// 书与笔
	event.modify("minecraft:writable_book", (modify) => {
		modify.setMaxStackSize(64)
	})

	if (FestivalUtils.isAprilFoolsDay()) {
		event.modify("mekanism:alloy_infused", (modify) => {
			modify.setNameKey("item.cmi.sweet_berry_hard_candy")
			modify.setFoodProperties((builder) => {
				builder.hunger(2)
					.saturation(0.25)
					.alwaysEdible()
					.fastToEat()
			})
		})

		event.modify("mekanism:alloy_reinforced", (modify) => {
			modify.setNameKey("item.cmi.mint_hard_candy")
			modify.setFoodProperties((builder) => {
				builder.hunger(2)
					.saturation(0.25)
					.alwaysEdible()
					.fastToEat()
			})
		})

		event.modify("mekanism:alloy_atomic", (modify) => {
			modify.setNameKey("item.cmi.grape_hard_candy")
			modify.setFoodProperties((builder) => {
				builder.hunger(2)
					.saturation(0.25)
					.alwaysEdible()
					.fastToEat()
			})
		})

		event.modify("cmi:enriched_alloy", (modify) => {
			modify.setNameKey("item.cmi.apple_hard_candy")
			modify.setFoodProperties((builder) => {
				builder.hunger(2)
					.saturation(0.25)
					.alwaysEdible()
					.fastToEat()
			})
		})
	}

	ForgeRegistries.ITEMS.getEntries().forEach((entry) => {
		/**
		 * @type {Internal.Item_}
		 */
		let item = entry.getValue()

		event.modify(item, (modify) => {
			if (item.getMaxStackSize() <= 16 && item.getMaxStackSize() !== 1) {
				modify.setMaxStackSize(64)
			}
		})
	})
})
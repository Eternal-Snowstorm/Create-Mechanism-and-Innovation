let $StorageUpgradeItem =
	Java.loadClass("com.buuz135.functionalstorage.item.StorageUpgradeItem")
let $StorageUpgradeItem$StorageTier =
	Java.loadClass("com.buuz135.functionalstorage.item.StorageUpgradeItem$StorageTier")
let $Style =
	Java.loadClass("net.minecraft.network.chat.Style")

let $BasicItem$Key =
	Java.loadClass("com.hrznstudio.titanium.item.BasicItem$Key")

StartupEvents.registry("item", (event) => {
	/**
	 * 添加新的功能性存储的抽屉容量升级
	 * 
	 * @param {string} name 名称
	 * @param {number} multiplier 倍率
	 */
	function addDrawerUpgrade(name, multiplier) {
		const ITEM_MULTIPLIER = multiplier
		const FLUID_MULTIPLIER = ITEM_MULTIPLIER * 0.5
		const CONTROLLER_MULTIPLIER = FLUID_MULTIPLIER * 0.5

		const REGISTER_ID = `${Cmi.MODID}:${name}_upgrade`

		let drawerUpgradeBuilder =
			event.createCustom(REGISTER_ID, () => {
				return new JavaAdapter($StorageUpgradeItem, {
					/**
					 * 重写getStorageMultiplier()方法设置升级的倍率
					 * @returns
					 */
					getStorageMultiplier() {
						return multiplier
					},
					/**
					 * 这里重写的是Item.getName()方法混淆后的名称m_7626_
					 * @method
					 * @param {Internal.ItemStack_} stack 
					 * @returns 
					 */
					m_7626_(stack) {
						if (Client.level) {
							let modifyItemName =
								Component.translatable(`item.${Cmi.MODID}.${name}_upgrade`)
									.setStyle($Style.EMPTY.applyTo(modifyItemName.getStyle()))

							return modifyItemName
						} else {
							return Component.empty()
						}
					},
					/**
					 * 
					 * @param {$BasicItem$Key} key 
					 * @param {Internal.ItemStack_} stack 
					 * @param {Internal.List_<Component_>} tooltip 
					 * @param {Boolean} advanced 
					 */
					addTooltipDetails(key, stack, tooltip, advanced) {
						let itemTranslateKey =
							Component.translatable(
								`tooltip.${Cmi.MODID}.storage_upgrade.itemMultiplier`,
								ITEM_MULTIPLIER
							).gray()
						let fluidTranslateKey =
							Component.translatable(
								`tooltip.${Cmi.MODID}.storage_upgrade.fluidMultiplier`,
								FLUID_MULTIPLIER
							).gray()
						let ctrlTranslateKey =
							Component.translatable(
								`tooltip.${Cmi.MODID}.storage_upgrade.controllerMultiplier`,
								CONTROLLER_MULTIPLIER
							).gray()

						tooltip.add(itemTranslateKey)
						tooltip.add(fluidTranslateKey)
						tooltip.add(ctrlTranslateKey)
					}
				}, $StorageUpgradeItem$StorageTier.DIAMOND)
			})

		drawerUpgradeBuilder.tag("functionalstorage:upgrades")

		if (Platform.isClientEnvironment()) {
			JsonIO.write(`kubejs/assets/${Cmi.MODID}/models/item/${name}_upgrade.json`, {
				"parent": "minecraft:item/generated",
				"textures": {
					"layer0": `${Cmi.MODID}:item/upgrade/${name}`
				}
			})
		}

		return drawerUpgradeBuilder
	}
})
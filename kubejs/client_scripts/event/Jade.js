/*
 * 🙌 注意：这个 Event 不能热重载
 * 🙌 NOTE: This event does NOT support hot reload.
 */
let $BlockAccessor =
	Java.loadClass("snownee.jade.api.BlockAccessor")

JadeEvents.onClientRegistration((event) => {
	/*
	 * 建议把优先级(第一个参数)调得尽量高
	 * 在 Debug 时发现, 低优先级的 Tooltip
	 * 可能会被 Jade Addons 提供的内容覆盖或清空
	 *
	 * It is recommended to set the priority (first parameter) as high as possible.
	 * During debugging, lower-priority tooltips may be overridden or cleared
	 * by tooltip providers from Jade Addons.
	 */
	event.addTooltipCollectedCallback(10000, (tooltip, accessor) => {
		addAdvancedTooltip("tconstruct:seared_heater", (acc, tooltip) => {
			tooltip["add(net.minecraft.network.chat.Component)"](
				Component.translatable("jade.info.cmi.tconstruct.seared_heater.1").aqua()
			)
			tooltip["add(net.minecraft.network.chat.Component)"](
				Component.translatable("jade.info.cmi.tconstruct.seared_heater.2").aqua()
			)
		})
		addCommonTooltip("immersiveindustry:crucible")

		/**
		 * 为指定方块添加一个通用的 Jade 提示文本
		 *
		 * Adds a common Jade tooltip for the specified block.
		 *
		 * @example addCommonTooltip("tconstruct:seared_heater")
		 *
		 * @param {Internal.Block_} block block register id 
		 * 
		 * 方块注册id
		 * @returns {boolean} 是否成功添加提示
		 */
		function addCommonTooltip(block) {
			/*
			 * Jade 的 accessor 可能代表不同目标(实体, 方块等)
			 * 这里只处理"方块", 不是方块就直接退出
			 *
			 * Jade's accessor may point to different targets
			 * (entity, block, etc). We only care about blocks here.
			 */
			if (!(accessor instanceof $BlockAccessor)) {
				return false
			}

			/**
			 * 这里并不是"真的"进行类型转换
			 * 只是告诉编辑器：从现在开始把 accessor 当作 BlockAccessor
			 * 这样才能获得方法补全
			 *
			 * This is NOT a real runtime cast.
			 * It only tells the editor to treat accessor as BlockAccessor,
			 * so method autocompletion becomes available.
			 *
			 * @type {Internal.BlockAccessor}
			 */
			let acc = accessor

			/*
			 * 仅当目标方块 ID 匹配时才继续
			 * 
			 * Only continue if the block ID matches
			 */
			if (acc.getBlock().id !== block) {
				return false
			}

			/*
			 * 将方块 ID 转换为翻译键
			 *
			 * Convert the block ID into a translation key.
			 * 
			 * "tconstruct:seared_heater"
			 * ↓
			 * "jade.info.cmi.tconstruct.seared_heater"
			 */
			let tranKey = `jade.info.cmi.${block}`.replace(":", ".")

			/*
			 * Rhino 环境下, `tooltip.add()` 存在多个重载版本
			 * 直接调用 `tooltip.add(...)` 可能无法正确匹配
			 * 因此需要显式指定使用 Component 参数的 `add()` 方法
			 *
			 * In the Rhino environment, `tooltip.add()` has multiple overloads.
			 * Calling `tooltip.add(...)` directly may fail to resolve correctly,
			 * so we explicitly select the Component-based `add()` method.
			 */
			tooltip["add(net.minecraft.network.chat.Component)"](
				Component.translatable(tranKey).aqua()
			)

			return true
		}

		/**
		 * 为指定方块添加一个"可自定义逻辑"的高级 Jade 提示
		 *
		 * Adds a logic-based advanced Jade tooltip.
		 *
		 * @example
		 * addAdvancedTooltip("tconstruct:seared_heater", (acc, tooltip) => {
		 *     tooltip["add(net.minecraft.network.chat.Component)"](
		 *         Component.literal("🔥 Temperature: 1200C").red()
		 *     )
		 * })
		 *
		 * @param {Internal.Block_} block 方块注册id
		 * @param {Internal.BiConsumer_<Internal.BlockAccessor_, Internal.ITooltip_>} handler
		 * @returns {boolean}
		 */
		function addAdvancedTooltip(block, handler) {
			// 只处理方块
			if (!(accessor instanceof $BlockAccessor)) {
				return false
			}

			/** 
			 * @type {$BlockAccessor}
			 */
			let acc = accessor

			// 方块不匹配直接退出
			if (acc.getBlock().id !== block) {
				return false
			}

			handler(acc, tooltip)

			return true
		}
	})
})
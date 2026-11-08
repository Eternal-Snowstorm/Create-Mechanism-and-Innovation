ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	const NAMESPACE = Cmi.MODID

	// 焦黑砖
	addMachinePart("seared", "tconstruct:seared_bricks", {
		cIO: true
	})

	// 工业铁
	addMachinePart("industrial_iron", "cmi:industrial_frame", {
		fO: true,
		eI: true
	})

	// 钢制
	addMachinePart("steel", "cmi:steel_casing", {
		iIO: true,
		fIO: true,
		gIO: true,
		eI: true
	})

	// 不锈钢
	addMachinePart("stainless_steel", "mekanism:steel_casing", {
		cIO: true
	})

	// 气密
	addMachinePart("air_tight", "cmi:airtight_casing", {
		cO: true,
		gO: true,
		eI: true
	})

	/**
	 * 快捷添加机器接口配方
	 *
	 * @param {string} type 控制器ID(不带命名空间)
	 * @param {InputItem_} casing 对应的机壳材料
	 * @param {Object} options 配置对象
	 * @param {boolean} [options.iI] 是否添加物品输入接口
	 * @param {boolean} [options.iO] 是否添加物品输出接口
	 * @param {boolean} [options.iIO] 是否添加物品I/O接口
	 * @param {boolean} [options.fI] 是否添加流体输入接口
	 * @param {boolean} [options.fO] 是否添加流体输出接口
	 * @param {boolean} [options.fIO] 是否添加流体I/O接口
	 * @param {boolean} [options.eI] 是否添加能量输入接口
	 * @param {boolean} [options.eO] 是否添加能量输出接口
	 * @param {boolean} [options.eIO] 是否添加能量I/O接口
	 * @param {boolean} [options.gIO] 是否添加气体I/O接口
	 * @param {boolean} [options.gI] 是否添加气体输入接口
	 * @param {boolean} [options.gO] 是否添加气体输出接口
	 * @param {boolean} [options.cI] 是否添加通用输入接口
	 * @param {boolean} [options.cO] 是否添加通用输出接口
	 * @param {boolean} [options.cIO] 是否添加通用I/O接口
	 */
	function addMachinePart(type, casing, options) {
		const TYPE = `${NAMESPACE}:${type}`

		/**
		 * 添加接口配方
		 *
		 * @param {string} suffix 接口类型后缀
		 * @param {Internal.Ingredient_|Internal.Ingredient_[]} ingredient 接口材料
		 * @param {boolean} input 是否添加输入接口
		 * @param {boolean} output 是否添加输出接口
		 */
		function addBus(suffix, ingredient, input, output) {
			const RESULT_PREFIX = suffix ? `${TYPE}_${suffix}` : TYPE

			const INPUT_BUS = `${RESULT_PREFIX}_input_bus`
			const OUTPUT_BUS = `${RESULT_PREFIX}_output_bus`

			if (input) {
				kubejs.shapeless(INPUT_BUS, [
					casing, ingredient, "#forge:plates/industrial_iron"
				])
			}

			if (output) {
				kubejs.shapeless(OUTPUT_BUS, [
					casing, ingredient, "#forge:plates/industrial_iron"
				])
			}
		}

		/**
		 * @param {string} type 接口类型
		 * @returns {{input: boolean, output: boolean}}
		 */
		function getPortIO(type) {
			return {
				input: options[`${type}I`] || options[`${type}IO`] || false,
				output: options[`${type}O`] || options[`${type}IO`] || false
			}
		}

		const ITEM = getPortIO("i")
		const FLUID = getPortIO("f")
		const ENERGY = getPortIO("e")
		const GAS = getPortIO("g")
		const COMMON = getPortIO("c")

		addBus("item", Mechanisms.WOODEN.COM, ITEM.input, ITEM.output)
		addBus("fluid", Mechanisms.COPPER.COM, FLUID.input, FLUID.output)
		addBus("energy", Mechanisms.COIL.COM, ENERGY.input, ENERGY.output)
		addBus("gas", Mechanisms.AIR.COM, GAS.input, GAS.output)
		addBus("", Mechanisms.WOODEN.COM, COMMON.input, COMMON.output)
	}
})
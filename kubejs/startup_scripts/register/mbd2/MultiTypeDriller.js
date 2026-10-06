// 多元钻井机 (multi_type_driller) 的 MBD2 机器定义.
//
// 结构 / 配方类型由磁盘 NBT 提供, 这里只提供"定义":
//   结构     ldlib/assets/mbd2/multiblock/multi_type_driller.mb
//   配方类型 ldlib/assets/mbd2/recipe_type/multi_type_driller.rt
//   总线部件 ldlib/assets/mbd2/machine/multi_type_driller/*.sm
//              (MBD2 每个机器定义才会注册一个方块, 所以 .mb 里用到的
//               cmi:multi_type_driller_*_bus 必须各有一份 .sm 定义)
//
// 运行逻辑 (钻井 / 液泵 / 气泵 三模式) 在
// kubejs/server_scripts/event/mods/mbd/multi_type_driller/Running.js
//
// 特性名不是随便取的:
//   * .sm 里的 proxyControllerCapabilities 用 traitNameFilter 做 **子串包含**
//     匹配, 所以四个输入/输出特性名必须互不为子串;
//   * bindMachineUI 用特性名做 "@ui:<特性名>_" 的部件界面前缀, 取全名最稳.
//     multi_type_driller_coolant_input   -> 冷却液输入仓 B
//     multi_type_driller_coolant_output  -> 冷却液输出仓 A
//     multi_type_driller_product_output  -> 产物输出口 C (物品, 两个 C 同步)
//     multi_type_driller_gas_output      -> 产物输出口 C (气体, 两个 C 同步)
//     multi_type_driller_energy_input    -> 能量输入仓 D

StartupEvents.registry("mbd2_machine", (event) => {
	let $FluidTankCapabilityTraitDefinition =
		Java.loadClass("com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTraitDefinition")
	let $ItemSlotCapabilityTraitDefinition =
		Java.loadClass("com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTraitDefinition")
	let $ForgeEnergyCapabilityTraitDefinition =
		Java.loadClass("com.lowdragmc.mbd2.common.trait.forgeenergy.ForgeEnergyCapabilityTraitDefinition")
	// 气泵产出的是 Mekanism 气体, 只能进化学储罐, 不能进流体罐
	let $GasTankCapabilityTraitDefinition =
		Java.loadClass("com.lowdragmc.mbd2.integration.mekanism.trait.chemical.ChemicalTankCapabilityTraitDefinition$Gas")
	let $IO = Java.loadClass("com.lowdragmc.mbd2.api.capability.recipe.IO")
	let $ConfigMachineSettings =
		Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigMachineSettings")
	let $ConfigMultiblockSettings =
		Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigMultiblockSettings")
	let $ConfigRecipeLogicSettings =
		Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigRecipeLogicSettings")
	let $MachineState =
		Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.MachineState")

	const MACHINE_ID = "cmi:multi_type_driller"

	// 冷却液仓: 1 mB/t 的消耗, 512000 mB 可连续运行 512000 tick ≈ 7.1 小时
	const COOLANT_CAPACITY = 512000
	// 能量仓: 100 FE/t, 留 100 tick 缓冲
	const ENERGY_CAPACITY = 100000
	const ENERGY_IO = 10000
	// 气体仓: 100 mB/次 的氢气产出
	const GAS_CAPACITY = 64000

	event.create("multiblock", MACHINE_ID).also((builder) => {
		builder.rootState(
			$MachineState.builder()
				.name("base")
				.modelRenderer("cmi:block/machine/multi_type_driller/off")
				.build()
		)

		builder.machineSettings(() => {
			const settings = $ConfigMachineSettings.builder()

			// 无 UI: 纯代码注册没有 uiCreator, hasUI(true) 开界面会 NPE
			settings.hasUI(false)

			// ---- B 冷却液输入仓 ----
			const coolantIn = new $FluidTankCapabilityTraitDefinition()
			coolantIn.setName("multi_type_driller_coolant_input")
			coolantIn.setRecipeHandlerIO($IO.IN)
			coolantIn.setGuiIO($IO.IN)
			coolantIn.setCapacity(COOLANT_CAPACITY)
			coolantIn.setTankSize(1)
			coolantIn.getCapabilityIO().setFrontIO($IO.IN)
			settings.traitDefinition(coolantIn)

			// ---- A 冷却液输出仓 ----
			const coolantOut = new $FluidTankCapabilityTraitDefinition()
			coolantOut.setName("multi_type_driller_coolant_output")
			coolantOut.setRecipeHandlerIO($IO.OUT)
			coolantOut.setGuiIO($IO.OUT)
			coolantOut.setCapacity(COOLANT_CAPACITY)
			coolantOut.setTankSize(1)
			coolantOut.getCapabilityIO().setFrontIO($IO.OUT)
			settings.traitDefinition(coolantOut)

			// ---- C 产物输出口 (物品) ----
			const productOut = new $ItemSlotCapabilityTraitDefinition()
			productOut.setName("multi_type_driller_product_output")
			productOut.setRecipeHandlerIO($IO.OUT)
			productOut.setGuiIO($IO.OUT)
			productOut.setSlotSize(1)
			productOut.setSlotLimit(64)
			productOut.getCapabilityIO().setFrontIO($IO.OUT)
			settings.traitDefinition(productOut)

			// ---- C 产物输出口 (气体) ----
			const gasOut = new $GasTankCapabilityTraitDefinition()
			gasOut.setName("multi_type_driller_gas_output")
			gasOut.setRecipeHandlerIO($IO.OUT)
			gasOut.setGuiIO($IO.OUT)
			gasOut.setCapacity(GAS_CAPACITY)
			gasOut.setTankSize(1)
			gasOut.getCapabilityIO().setFrontIO($IO.OUT)
			settings.traitDefinition(gasOut)

			// ---- D 能量输入仓 ----
			const energyIn = new $ForgeEnergyCapabilityTraitDefinition()
			energyIn.setName("multi_type_driller_energy_input")
			energyIn.setRecipeHandlerIO($IO.IN)
			energyIn.setGuiIO($IO.IN)
			energyIn.setCapacity(ENERGY_CAPACITY)
			energyIn.setMaxReceive(ENERGY_IO)
			energyIn.setMaxExtract(0)
			energyIn.getCapabilityIO().setFrontIO($IO.IN)
			settings.traitDefinition(energyIn)

			return settings.build()
		})

		// 钻井机自己判定工作 (要读钻头下方的世界方块 / 流体), 所以关掉 MBD2 的
		// 配方引擎, 由 Running.js 按 20 tick 一个周期驱动.
		// .rt 里的内置配方负责 JEI/EMI 展示与产物池数据.
		builder.recipeLogicSettings(
			$ConfigRecipeLogicSettings.builder()
				.enable(false)
				.recipeType(MACHINE_ID)
				.build()
		)

		builder.multiblockSettings(() =>
			$ConfigMultiblockSettings.builder()
				.showUIOnlyFormed(false)
				.build()
		)
	})
})

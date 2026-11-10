# MB2 KubeJS 注册指南
> 适用: Minecraft 1.20.1 / Forge / Multiblocked2 1.20.1-1.0.39 / KubeJS 6
> 本文是教程式指南: 先跑通最小示例, 再逐步加功能. 所有 API 均经字节码验证. 

---

## 快速开始: 第一台机器

在 `kubejs/startup_scripts/` 新建 `mbd2.js`:

```js
MBDRegistryEvents.machine(event => {
    const builder = event.create("single", "cmi:my_first_machine")

    // 每个字段都有默认值 —— 什么都不配也能注册. 这里只设一个模型:
    builder.rootState(
        Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.MachineState")
            .builder().name("base")
            .modelRenderer("cmi:block/machine/example/off")
            .build()
    )
})
```

进游戏拿 `/give @s cmi:my_first_machine`, 放下来 —— 这就是你的第一台 MB2 机器. 
事件结束后 MB2 会自动构建并注册, 不需要任何 build/register 调用. 

**先记住三件事** (后文会反复用到):

1. 机器类型名: `"single"` 单方块 / `"multiblock"` 多方块 (有 Create 时还有 `"kinetic"`). 
2. 类引用太长, 统一用变量 (本文约定 `$类名`, 嵌套类 `$父类$子类`):

```js
let $MachineState = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.MachineState")
let $ConfigMachineSettings = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigMachineSettings")
let $ConfigRecipeLogicSettings = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigRecipeLogicSettings")
// 每节用到新类时再补充
```

3. Builder 的参数分两类, **都不是带参回调**:
   - `rootState` / `blockProperties` / `itemProperties` / `recipeLogicSettings` → **先 new 好对象再传进去**
   - `machineSettings` / `partSettings` / `multiblockSettings` → **无参箭头函数, 末尾必须 return 配置对象**
   - 写 `(setting) => {...}` 时 `setting` 显示 any 就是这个原因 (期望签名里没有参数). 

---

## 第一步: 一台会干活的机器 (特性 + 配方逻辑)

```js
let $IO = Java.loadClass("com.lowdragmc.mbd2.api.capability.recipe.IO")
let $ItemSlotCapabilityTraitDefinition = Java.loadClass("com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTraitDefinition")
let $FluidTankCapabilityTraitDefinition = Java.loadClass("com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTraitDefinition")

MBDRegistryEvents.machine(event => {
    const builder = event.create("single", "cmi:electrolyzer")

    builder.rootState(
        $MachineState.builder().name("base")
            .modelRenderer("cmi:block/machine/electrolyzer/off")
            .build()
    )

    builder.machineSettings(() => {
        const settings = $ConfigMachineSettings.builder()
        settings.hasUI(false)   // 纯代码注册无 GUI 数据 (uiCreator=null), hasUI(true) 开 UI 会 NPE; 需要 GUI 走 NBT 或 GUI 指南

        // ---- 特性: 一个物品输入槽 ----
        const slot = new $ItemSlotCapabilityTraitDefinition()
        slot.setName("input")                  // 槽名, 配方与总线靠它匹配
        slot.setRecipeHandlerIO($IO.IN)        // 配方视角: 这是输入槽
        slot.setGuiIO($IO.IN)
        slot.setSlotSize(1)
        slot.setSlotLimit(64)
        slot.getCapabilityIO().setFrontIO($IO.IN)   // 正面可以往里面塞东西
        settings.traitDefinition(slot)

        // ---- 特性: 一个流体输出槽 ----
        const tank = new $FluidTankCapabilityTraitDefinition()
        tank.setName("fluid_out")
        tank.setRecipeHandlerIO($IO.OUT)
        tank.setGuiIO($IO.OUT)
        tank.setCapacity(16000)
        tank.getCapabilityIO().setFrontIO($IO.OUT)
        settings.traitDefinition(tank)

        return settings.build()                // ← 工厂必须 return
    })

    builder.recipeLogicSettings(
        $ConfigRecipeLogicSettings.builder()
            .enable(true)
            .recipeType("cmi:electrolyzer")    // 下一步注册的配方类型
            .build()
    )
})
```

常用特性类名:
`$ItemSlotCapabilityTraitDefinition` (物品槽) / `$FluidTankCapabilityTraitDefinition` (流体槽) /
`$ForgeEnergyCapabilityTraitDefinition` (FE 能量) —— 都是 `new` + setter, 然后 `settings.traitDefinition(...)`. 

---

## 第二步: 配方类型 + 配方

```js
MBDRegistryEvents.recipeType(event => {
    const type = event.createRecipeType("cmi:electrolyzer")
    type.setXEIVisible(true)

    // 内置配方: 直接写进类型, 不用 json 文件
    const recipe = type.recipeBuilder("cmi:water_electrolysis")
    recipe.duration(200)                       // tick
    recipe.inputItems("minecraft:water_bucket")
    recipe.outputItems("minecraft:bucket")
    recipe.saveAsBuiltinRecipe()
})
```

配方 builder 常用方法: `duration(tick)` `inputItems("物品id")` `outputItems("2x 物品id")`
`inputFluids(...)` `outputFluids(...)` `inputFE(数量)` `addData(键, 值)` `isFuel(true)`. 

---

## 第三步: 多方块机器 (含结构)

```js
let $ConfigMultiblockSettings = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigMultiblockSettings")
let $FactoryBlockPattern = Java.loadClass("com.lowdragmc.mbd2.api.pattern.FactoryBlockPattern")
let $Predicates = Java.loadClass("com.lowdragmc.mbd2.api.pattern.Predicates")
let $MBDRegistries = Java.loadClass("com.lowdragmc.mbd2.api.registry.MBDRegistries")

MBDRegistryEvents.machine(event => {
    const id = "cmi:small_machine"
    // create() 的 Java 签名返回父类 Builder, TS 类型上才没有 multiblockSettings;
    // 用 JSDoc 把类型声明成实际的多方块 Builder (运行时本来就是它, 不影响行为)
    /** @type {Internal.MultiblockMachineDefinition$Builder_} */
    const builder = event.create("multiblock", id)

    builder.rootState(
        $MachineState.builder().name("base")
            .modelRenderer("cmi:block/machine/small_machine/off")
            .build()
    )
    builder.machineSettings(() => {
        const settings = $ConfigMachineSettings.builder()
        settings.hasUI(false)   // 纯代码注册无 GUI 数据 (uiCreator=null), hasUI(true) 开 UI 会 NPE; 需要 GUI 走 NBT 或 GUI 指南
        return settings.build()
    })
    builder.recipeLogicSettings(
        $ConfigRecipeLogicSettings.builder()
            .enable(true).recipeType("cmi:electrolyzer").build()
    )
    builder.multiblockSettings(() =>
        $ConfigMultiblockSettings.builder().showUIOnlyFormed(true).build()
    )

    // 结构不能通过 builder 设置, 需要四步手动流程:
    event.removeMachine(id)                  // ① 摘出自动注册队列 (防止无结构版本覆盖, 见下)
    /** @type {Internal.MultiblockMachineDefinition_} */
    const def = builder.build()              // ② build 出定义 (build 也返回父类类型, 同样补 @type)
    const pattern = $FactoryBlockPattern.start()
        .aisle("III", "III", "III")          // 每层一个 aisle, y=0 底 → 顶; 行=z, 字符=x
        .aisle("IAI", "IAI", "IAI")
        .aisle("III", "III", "III")
        .where("I", $Predicates.blocks(Block.getBlock("minecraft:iron_block")))
        .where("A", $Predicates.air())
        .build()
    def.blockPatternFactory((machine) => pattern)   // ③ 挂结构 (这是 definition 的方法, 不是 builder 的)
    $MBDRegistries.MACHINE_DEFINITIONS.register(id, def)  // ④ 手动注册 (静态字段直接访问)
})
```

**为什么这四步**: 事件结束后 MB2 会对每个 `event.create` 的 builder 自动
`register(id, builder.build())` —— 一个没有结构的版本, 会覆盖你的. 
`event.removeMachine(id)` 把 builder 摘出自动队列 (注意顺序: 先 remove 再手动 register,
反了注册表条目会被 removeMachine 删掉). 

结构写法要点:
- 控制器位置: `$Predicates.controller($Predicates.any())` 标记. 
- 方块谓词: `$Predicates.blocks(Block.getBlock("modid:block"))`, 空气 `$Predicates.air()`,
  任意 `$Predicates.any()`, 多选一 `.or(...)`. 
- 结构想改 NBT 也行: 把编辑器导出的 `.mb` 放进 `ldlib/assets/mbd2/multiblock/` 自动加载,
  那样纯 `event.create` + 配置就够, 不需要上面四步. 

---

## 第四步: 机器事件

```js
MBDMachineEvents.onRecipeWorking(event => {
    const machine = event.getEvent().getMachine()   // MBDMachine
    console.log(machine.getPos() + " is working")
})
```

常用事件: `onTick` `onRecipeWorking` `onRecipeFinish` `onStructureFormed` `onStructureInvalid`
`onRightClick` `onStateChanged` (完整清单见文末附录). 

---

## 第五步: 定义 GUI

### GUI 的组成与约定 id

机器 GUI = `uiCreator` (`Function<MBDMachine, WidgetGroup>`) 返回的 widget 树 (LDLib 框架). 
`bindMachineUI` 打开界面时按 widget 的 id 正则自动接功能:

| widget id (正则) | 自动挂载 |
|---|---|
| `^ui:machine_name$` | 机器名文本 |
| `^ui:progress_bar$` | 配方进度 (getProgressPercent) |
| `^ui:fuel_bar$` | 燃料进度 (getFuelProgressPercent) |
| `^ui:xei_lookup$` | XEI 配方查看按钮 |
| `ui:<trait名>_<序号>` | trait 槽位 (自动绑定) |

widget 设 id: `widget.setId("ui:machine_name")`. 

### 关键结论: GUI 数据只来自 NBT, 纯代码注册的坑

- `uiCreator` 只在 NBT 反序列化 (`loadProductiveTag`) 里被赋值; **纯代码 Builder 注册的机器
  `uiCreator == null`, 而 `hasUI` 默认 true, `createUI` 无 null 检查 → 开 GUI 直接 NPE**. 
- 所以纯代码机器要么 `hasUI(false)` (前四步示例已统一这样), 要么注入 uiCreator, 要么靠 NBT. 

### 路径 A: JS 构建 GUI 并注入 uiCreator

```js
// 类引用 ($类名 约定)
let $WidgetGroup        = Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.WidgetGroup")
let $SlotWidget         = Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.SlotWidget")
let $ProgressWidget     = Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.ProgressWidget")
let $ButtonWidget       = Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.ButtonWidget")
let $TextTextureWidget  = Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.TextTextureWidget")
let $TankWidget         = Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.TankWidget")
let $ResourceTexture    = Java.loadClass("com.lowdragmc.lowdraglib.gui.texture.ResourceTexture")
let $ItemSlotCapabilityTrait = Java.loadClass("com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTrait")
let $FluidTankCapabilityTrait = Java.loadClass("com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTrait")

// 构建 GUI (与 Java 同款构造器, JS 函数自动适配 Supplier/Consumer)
function createMachineUI(machine) {
    const group = new $WidgetGroup(0, 0, 176, 166)          // x, y, w, h
    group.setBackground(new $ResourceTexture("ldlib:textures/gui/background.png"))

    group.addWidget(new $TextTextureWidget(70, 5, 37, 20, "机器名").setId("ui:machine_name"))
    group.addWidget(new $ProgressWidget(
        () => machine.getRecipeLogic().getProgressPercent(), // DoubleSupplier
        79, 42, 18, 18))

    // 物品槽: 按名拿 trait, storage 喂给 SlotWidget
    const input = machine.getTraitByName($ItemSlotCapabilityTrait, "input")
    group.addWidget(new $SlotWidget(input.storage, 0, 40, 42))   // (存储, 槽序号, x, y)

    const output = machine.getTraitByName($ItemSlotCapabilityTrait, "output")
    group.addWidget(new $SlotWidget(output.storage, 0, 114, 42))

    // 流体槽: storages[0] 是第一个槽
    const tank = machine.getTraitByName($FluidTankCapabilityTrait, "fluid_out")
    group.addWidget(new $TankWidget(tank.storages[0], 141, 22, 18, 58, true, true))

    // 按钮: click 是 ClickData
    group.addWidget(new $ButtonWidget(78, 42, 18, 18, (click) => console.log("clicked")))
    return group
}

// 注册时注入 (def = builder.build() 之后; setPrivateField 见进阶章节):
setPrivateField(def, "uiCreator", createMachineUI)   // JS 函数自动适配 Function<MBDMachine, WidgetGroup>
```

注意: 注入后 `bindMachineUI` 不会自动执行 (它只由 NBT 路径调用), 槽位/进度条要自己接 (如上). 

### 路径 B: 运行时改 GUI (MBDMachineEvents.onUI, server 事件)

```js
MBDMachineEvents.onUI(event => {
    const uiEvent = event.getEvent()        // MachineUIEvent
    const root = uiEvent.getRoot()          // WidgetGroup
    const $ImageWidget = Java.loadClass("com.lowdragmc.lowdraglib.gui.widget.ImageWidget")
    // 往现有 UI 加一个图标:
    root.addWidget(new $ImageWidget(80, 5, 16, 16, new $ResourceTexture("cmi:textures/gui/my_icon.png")))
    // 或整体替换: uiEvent.setRoot(自定义 WidgetGroup)
})
```

### 配方类型 GUI

.rt 的 `ui`/`fuelUI` 同样只来自 NBT; 运行时改用 `MBDMachineEvents.onRecipeUI` / `onFuelRecipeUI`
(client 事件, 事件对象 `RecipeUIEvent` 同样有 `getRoot()/setRoot()`):

```js
MBDMachineEvents.onRecipeUI(event => {
    const root = event.getEvent().getRoot()   // WidgetGroup
    // 加贴图/文字等, 同路径 B
})
```

---

## 进阶 (需要时再看)

### 部件 (输入/输出总线)

部件 = 单方块 + `partSettings` 开 enable + 代理控制器 trait. 代理过滤器 `traitNameFilter` 是
private 字段没有 setter, 用反射设 (MB2 jar 未混淆, 字段名稳定):

```js
let $ConfigPartSettings = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigPartSettings")
let $ConfigPartSettings$ProxyCapability = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigPartSettings$ProxyCapability")

/**
 * 设置 Java 对象的 private 字段. 
 * @param {any} obj - Java 对象实例
 * @param {string} fieldName - 字段名 (javap -p 查证)
 * @param {any} value - 新值 (String→字符串; 数字→number; 枚举/对象→Java 对象)
 * @returns {void}
 */
function setPrivateField(obj, fieldName, value) {
    const field = obj.getClass().getDeclaredField(fieldName)
    field.setAccessible(true)
    field.set(obj, value)
}

MBDRegistryEvents.machine(event => {
    const builder = event.create("single", "cmi:input_bus")
    builder.rootState($MachineState.builder().name("base")
        .modelRenderer("cmi:block/machine/io/common_input").build())
    builder.machineSettings(() => $ConfigMachineSettings.builder().hasUI(false).build())
    builder.recipeLogicSettings($ConfigRecipeLogicSettings.builder()
        .enable(false).recipeType("mbd2:dummy").build())
    builder.partSettings(() => {
        const proxy = new $ConfigPartSettings$ProxyCapability()
        setPrivateField(proxy, "traitNameFilter", "input")   // 前缀匹配控制器 trait 名
        proxy.capabilityIO().setFrontIO($IO.IN)
        const part = $ConfigPartSettings.builder()
        part.enable(true)                                    // ← 部件开关
        part.proxyControllerCapabilities(Java.loadClass("java.util.Arrays").asList(proxy))
        return part.build()
    })
})
```

### 配方修饰器里的隐藏字段 (如 4x 并行)

`maxParallel` 同样 private 无 setter, 两条路:
- 反射: `setPrivateField(mod, "maxParallel", $ContentModifier.of(4, 0))`
- 或 NBT 往返: `const tag = mod.serializeNBT(); tag.getCompound("maxParallel").putDouble("multiplier", 4); const fixed = new $RecipeModifier(); fixed.deserializeNBT(tag)` (键名 = 字段名)

### 与 Java / 磁盘 NBT 共存

三条来源写同一个注册表, 顺序: Java → `ldlib/assets/mbd2` 磁盘 NBT → KubeJS. 
**同名后来者覆盖**. 机器事件对任何来源的机器都生效. 

---

## 附录: 常用类引用全表

```js
let $MachineState                         = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.MachineState")
let $ConfigBlockProperties                = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigBlockProperties")
let $ConfigItemProperties                 = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigItemProperties")
let $ConfigMachineSettings                = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigMachineSettings")
let $ConfigRecipeLogicSettings            = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigRecipeLogicSettings")
let $ConfigPartSettings                   = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigPartSettings")
let $ConfigMultiblockSettings             = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigMultiblockSettings")
let $ToggleCreativeTab                    = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.toggle.ToggleCreativeTab")
let $RotationState                        = Java.loadClass("com.lowdragmc.mbd2.api.block.RotationState")
let $IO                                   = Java.loadClass("com.lowdragmc.mbd2.api.capability.recipe.IO")
let $ItemSlotCapabilityTraitDefinition    = Java.loadClass("com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTraitDefinition")
let $FluidTankCapabilityTraitDefinition   = Java.loadClass("com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTraitDefinition")
let $ForgeEnergyCapabilityTraitDefinition = Java.loadClass("com.lowdragmc.mbd2.common.trait.forgeenergy.ForgeEnergyCapabilityTraitDefinition")
let $MBDMachineDefinition                 = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.MBDMachineDefinition")
let $MultiblockMachineDefinition          = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.MultiblockMachineDefinition")
let $FactoryBlockPattern                  = Java.loadClass("com.lowdragmc.mbd2.api.pattern.FactoryBlockPattern")
let $Predicates                           = Java.loadClass("com.lowdragmc.mbd2.api.pattern.Predicates")
let $MBDRegistries                        = Java.loadClass("com.lowdragmc.mbd2.api.registry.MBDRegistries")
let $MBDRecipeType                        = Java.loadClass("com.lowdragmc.mbd2.api.recipe.MBDRecipeType")
let $RecipeModifier                       = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.RecipeModifier")
let $RecipeModifier$RecipeModifiers       = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.RecipeModifier$RecipeModifiers")
let $ContentModifier                      = Java.loadClass("com.lowdragmc.mbd2.api.recipe.content.ContentModifier")
let $ConfigPartSettings$ProxyCapability   = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigPartSettings$ProxyCapability")
let $ForgeRegistries                      = Java.loadClass("net.minecraftforge.registries.ForgeRegistries")
let $Shapes                               = Java.loadClass("net.minecraft.world.phys.shapes.Shapes")
```

## 附录: 机器事件全表

server: `onTick / onRecipeWorking / onRecipeWaiting / onRecipeStatusChanged / onBeforeRecipeWorking /
onAfterRecipeWorking / onRecipeFinish / onConsumeInputsAfterWorking / onFuelRecipeModify /
onFuelBurningFinish / onBeforeRecipeModify / onAfterRecipeModify / onStructureFormed /
onStructureInvalid / onRightClick / onOpenUI / onPlaced / onRemoved / onDrops /
onNeighborChanged / onStateChanged / onUseCatalyst / onLoad`
client: `onClientTick / onCustomDataUpdate / onCustomKeyframe / onRecipeUI / onFuelRecipeUI`
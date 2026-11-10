# 高级焦炉 (reinforced_coke_oven) — KubeJS 版
> 完整实例: 与 Java 版等价, 按 ldlib/assets/mbd2 里的 NBT 逐字段还原. 
> 先读《MB2-KubeJS注册文档.md》教程, 本文只给成品脚本. 

## 这台机器是什么

- 5x5x5 多方块: 外壳 scorched_bricks, 内衬 seared_bricks, 顶部 slab, 中间 3 格烟囱 vent
- 控制器特性: 物品输入/输出槽各 1, 流体输出槽 32000 mB
- 配方类型代理 IE 焦炉, 时长 x0.5, 最大并行 x4
- 状态树: base(off) → formed → working(on/发光15/鼓风炉音效) → waiting(off); formed → suspend
- 两个总线部件: input_bus / output_bus

## 完整脚本 (kubejs/startup_scripts/reinforced_coke_oven.js)

```js
// ---- 类引用 ($类名 命名约定) ----
let $MachineState                         = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.MachineState")
let $ConfigBlockProperties                = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigBlockProperties")
let $ConfigItemProperties                 = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigItemProperties")
let $ConfigMachineSettings                = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigMachineSettings")
let $ConfigRecipeLogicSettings            = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigRecipeLogicSettings")
let $ConfigPartSettings                   = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigPartSettings")
let $ConfigMultiblockSettings             = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigMultiblockSettings")
let $RotationState                        = Java.loadClass("com.lowdragmc.mbd2.api.block.RotationState")
let $IO                                   = Java.loadClass("com.lowdragmc.mbd2.api.capability.recipe.IO")
let $ItemSlotCapabilityTraitDefinition    = Java.loadClass("com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTraitDefinition")
let $FluidTankCapabilityTraitDefinition   = Java.loadClass("com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTraitDefinition")
let $ConfigPartSettings$ProxyCapability   = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.ConfigPartSettings$ProxyCapability")
let $FactoryBlockPattern                  = Java.loadClass("com.lowdragmc.mbd2.api.pattern.FactoryBlockPattern")
let $Predicates                           = Java.loadClass("com.lowdragmc.mbd2.api.pattern.Predicates")
let $MBDRegistries                        = Java.loadClass("com.lowdragmc.mbd2.api.registry.MBDRegistries")
let $MBDRecipeType                        = Java.loadClass("com.lowdragmc.mbd2.api.recipe.MBDRecipeType")
let $RecipeModifier                       = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.RecipeModifier")
let $RecipeModifier$RecipeModifiers       = Java.loadClass("com.lowdragmc.mbd2.common.machine.definition.config.RecipeModifier$RecipeModifiers")
let $ForgeRegistries                      = Java.loadClass("net.minecraftforge.registries.ForgeRegistries")
let $Shapes                               = Java.loadClass("net.minecraft.world.phys.shapes.Shapes")

/**
 * 设置 Java 对象的 private 字段 (绕开 MB2 缺失的 setter). 
 * @param {any} obj - Java 对象实例
 * @param {string} fieldName - 字段名
 * @param {any} value - 新值 (String→字符串; 数字→number; 枚举/对象→Java 对象)
 * @returns {void}
 */
function setPrivateField(obj, fieldName, value) {
    const field = obj.getClass().getDeclaredField(fieldName)
    field.setAccessible(true)
    field.set(obj, value)
}

// ---- 配方类型: 代理 IE 焦炉 ----
MBDRegistryEvents.recipeType(event => {
    const rl = "cmi:reinforced_coke_oven"
    const ieType = $ForgeRegistries.RECIPE_TYPES.getValue("immersiveengineering:coke_oven")   // 静态字段直接访问
    const type = new $MBDRecipeType(rl, ieType)
    type.setXEIVisible(true)
    type.setProxyRecipeXEIVisible(true)
    $MBDRegistries.RECIPE_TYPES.register(rl, type)
})

// ---- 多方块 ----
MBDRegistryEvents.machine(event => {
    const id = "cmi:reinforced_coke_oven"
    // create() 类型上返回父类 Builder, @type 声明成多方块 Builder 才有 multiblockSettings 补全
    /** @type {Internal.MultiblockMachineDefinition$Builder_} */
    const builder = event.create("multiblock", id)

    builder.rootState(ovenStates())
    builder.blockProperties(
        $ConfigBlockProperties.builder().destroyTime(3).rotationState($RotationState.NON_Y_AXIS).build()
    )
    builder.itemProperties($ConfigItemProperties.builder().maxStackSize(64).isGui3d(true).build())
    builder.machineSettings(() => ovenSettings())
    builder.recipeLogicSettings(ovenLogic())   // 第一类参数: 直接传对象 (不是工厂!)
    builder.multiblockSettings(() =>
        $ConfigMultiblockSettings.builder().showUIOnlyFormed(true).showUIWhenClickStructure(true).build()
    )

    // 结构四步 (教程第三步): 摘队列 -> build -> 挂 pattern -> 手动注册
    event.removeMachine(id)
    /** @type {Internal.MultiblockMachineDefinition_} */
    const def = builder.build()
    def.blockPatternFactory((machine) => ovenPattern())
    $MBDRegistries.MACHINE_DEFINITIONS.register(id, def)
})

// ---- 总线 x2 (单方块部件, 交给事件自动注册) ----
MBDRegistryEvents.machine(event => {
    registerBus(event, "cmi:reinforced_coke_oven_input_bus",
        "cmi:block/machine/reinforced_coke_oven/common_input",
        "reinforced_coke_oven_input", $IO.IN, false)
})
MBDRegistryEvents.machine(event => {
    registerBus(event, "cmi:reinforced_coke_oven_output_bus",
        "cmi:block/machine/reinforced_coke_oven/common_output",
        "reinforced_coke_oven_output", $IO.OUT, true)
})

// ---- 机器事件 (可选, 冒烟逻辑 CMI Core 已有) ----
MBDMachineEvents.onRecipeWorking(event => {
    console.log(event.getEvent().getMachine().getPos() + " is working")
})

// ==================== helpers ====================

// 状态树: base -> formed -> (working -> waiting, suspend)
function ovenStates() {
    const waiting = machineState("waiting", "cmi:block/machine/reinforced_coke_oven/off", 0)
    const suspend = machineState("suspend", null, 0)                       // 无模型 -> 继承父状态
    const working = machineState("working", "cmi:block/machine/reinforced_coke_oven/on", 15)
    working.machineSound().setEnable(true)
    working.machineSound().setSound("minecraft:block.blastfurnace.fire_crackle")
    working.machineSound().setLoop(true)
    const formed = $MachineState.builder().name("formed").shape($Shapes.block())
        .children(Java.loadClass("java.util.Arrays").asList(working, suspend)).build()
    return $MachineState.builder().name("base")
        .modelRenderer("cmi:block/machine/reinforced_coke_oven/off")
        .shape($Shapes.block())
        .children(Java.loadClass("java.util.Arrays").asList(formed)).build()
}

function machineState(name, model, light) {
    const b = $MachineState.builder().name(name).shape($Shapes.block()).lightLevel(light)
    if (model !== null) b.modelRenderer(model)
    return b.build()
}

// 机器设置: 三个特性 + 配方修饰 (0.5x 时长, 4x 并行)
function ovenSettings() {
    const settings = $ConfigMachineSettings.builder()
    settings.hasUI(false)   // 纯代码注册无 GUI 数据 (uiCreator=null), hasUI(true) 开 UI 会 NPE; 需要 GUI 走 NBT 或 GUI 指南
    settings.traitDefinition(itemSlot("reinforced_coke_oven_input_item_slot", $IO.IN))
    settings.traitDefinition(itemSlot("reinforced_coke_oven_output_item_slot", $IO.OUT))

    const tank = new $FluidTankCapabilityTraitDefinition()
    tank.setName("reinforced_coke_oven_output_fluid_tank")
    tank.setRecipeHandlerIO($IO.OUT)
    tank.setGuiIO($IO.OUT)
    tank.setCapacity(32000)
    tank.getCapabilityIO().setInternal($IO.OUT)
    tank.getCapabilityIO().setFrontIO($IO.OUT)
    tank.getCapabilityIO().setBackIO($IO.OUT)
    tank.getCapabilityIO().setLeftIO($IO.OUT)
    tank.getCapabilityIO().setRightIO($IO.OUT)
    tank.getCapabilityIO().setTopIO($IO.OUT)
    tank.getCapabilityIO().setBottomIO($IO.OUT)
    settings.traitDefinition(tank)
    return settings.build()
}

function itemSlot(name, io) {
    const t = new $ItemSlotCapabilityTraitDefinition()
    t.setName(name)
    t.setRecipeHandlerIO(io)
    t.setGuiIO(io)
    t.setSlotSize(1)
    t.setSlotLimit(64)
    t.getCapabilityIO().setInternal(io)
    t.getCapabilityIO().setFrontIO(io)
    t.getCapabilityIO().setBackIO(io)
    t.getCapabilityIO().setLeftIO(io)
    t.getCapabilityIO().setRightIO(io)
    t.getCapabilityIO().setTopIO(io)
    t.getCapabilityIO().setBottomIO(io)
    return t
}

// 配方逻辑: 0.5x 时长 + 4x 并行 (maxParallel 是 private 字段, NBT 往返解决)
function ovenLogic() {
    const mods = new $RecipeModifier$RecipeModifiers()
    const mod = new $RecipeModifier()
    mod.durationModifier.setMultiplier(0.5)
    const tag = mod.serializeNBT()                              // 序列化 -> 改 maxParallel -> 反序列化
    tag.getCompound("maxParallel").putDouble("multiplier", 4.0)
    const fixed = new $RecipeModifier()
    fixed.deserializeNBT(tag)
    mods.recipeModifiers.add(fixed)

    return $ConfigRecipeLogicSettings.builder()
        .enable(true)
        .recipeType("cmi:reinforced_coke_oven")
        .recipeDampingValue(2)
        .consumeInputsAfterWorking(true)
        .recipeModifiers(mods)
        .build()
}

// 5x5x5 结构 (字符来自 NBT pattern; 每层一个 aisle, y=0 底 -> 顶)
function ovenPattern() {
    const B = (id) => Block.getBlock(id)                         // Block 是 KubeJS 全局绑定
    return $FactoryBlockPattern.start()
        .aisle("00000", "12221", "10001", "13331", "14441")
        .aisle("00000", "31112", "05550", "31113", "44444")
        .aisle("00000", "61112", "05550", "31113", "44444")
        .aisle("00000", "31112", "05550", "31113", "44444")
        .aisle("00000", "12221", "10001", "13331", "14441")
        .where("0", $Predicates.blocks(B("tconstruct:scorched_bricks")))   // 外壳
        .where("1", $Predicates.any())
        .where("2", $Predicates.blocks(B("cmi:reinforced_coke_oven_input_bus"))   // IO 槽
                .or($Predicates.blocks(B("cmi:reinforced_coke_oven_output_bus")))
                .or($Predicates.blocks(B("tconstruct:seared_bricks"))))
        .where("3", $Predicates.blocks(B("tconstruct:seared_bricks")))     // 内衬
        .where("4", $Predicates.blocks(B("tconstruct:scorched_bricks_slab"))) // 顶板
        .where("5", $Predicates.blocks(B("ad_astra:vent")))                // 烟囱
        .where("6", $Predicates.controller($Predicates.any()))             // 控制器槽
        .build()
}

// 总线 = 单方块部件, ProxyCapability 代理控制器上名字带 traitFilter 前缀的 trait
function registerBus(event, id, model, traitFilter, io, autoAllSides) {
    const builder = event.create("single", id)
    builder.rootState(machineState("base", model, 0))
    builder.blockProperties($ConfigBlockProperties.builder().destroyTime(3).build())
    builder.itemProperties($ConfigItemProperties.builder().maxStackSize(64).build())
    builder.machineSettings(() => $ConfigMachineSettings.builder().hasUI(false).build())
    builder.recipeLogicSettings(
        $ConfigRecipeLogicSettings.builder().enable(false).recipeType("mbd2:dummy").build()
    )
    builder.partSettings(() => {
        const proxy = new $ConfigPartSettings$ProxyCapability()
        setPrivateField(proxy, "traitNameFilter", traitFilter)   // private 字段无 setter
        proxy.capabilityIO().setInternal(io)
        proxy.capabilityIO().setFrontIO(io)
        proxy.capabilityIO().setBackIO($IO.NONE)
        proxy.capabilityIO().setLeftIO($IO.NONE)
        proxy.capabilityIO().setRightIO($IO.NONE)
        proxy.capabilityIO().setTopIO($IO.NONE)
        proxy.capabilityIO().setBottomIO($IO.NONE)
        proxy.autoIO().setEnable(true)
        proxy.autoIO().setInterval(20)
        proxy.autoIO().setFrontIO(io)
        proxy.autoIO().setBackIO(autoAllSides ? io : $IO.NONE)
        proxy.autoIO().setLeftIO(autoAllSides ? io : $IO.NONE)
        proxy.autoIO().setRightIO(autoAllSides ? io : $IO.NONE)
        proxy.autoIO().setTopIO(autoAllSides ? io : $IO.NONE)
        proxy.autoIO().setBottomIO(autoAllSides ? io : $IO.NONE)
        const part = $ConfigPartSettings.builder()
        part.enable(true)
        part.canShare(true)
        part.proxyControllerCapabilities(Java.loadClass("java.util.Arrays").asList(proxy))
        return part.build()
    })
}
```

## 要点

- 模型文件 (on/off/common_input/common_output) 已在 kubejs/assets 里, 直接引用原路径. 
- 结构摆好后, 输入/输出总线放进 `2` 槽位, 控制器在 `6` 槽位 (中间层). 
- 多方块那一段用了 removeMachine 四步流程 (为什么见教程第三步); 总线没有结构需求,
  直接 `event.create` 交给事件自动注册. 
- 想整机走 NBT (含编辑器 UI): 把 .mb/.sm/.rt 放进 `ldlib/assets/mbd2` 自动加载, 本脚本删掉即可. 
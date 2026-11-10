# MB2 Java 注册指南
> 适用: Minecraft 1.20.1 / Forge / Multiblocked2 1.20.1-1.0.39
> 教程式指南: 先跑通最小示例, 再逐步加功能. 所有 API 均经 javap 验证. 

依赖 (build.gradle):

```gradle
implementation fg.deobf("com.lowdragmc.multiblocked2:Multiblocked2:1.20.1-1.0.39")
```

---

## 快速开始: 注册事件骨架

MB2 在 `FMLCommonSetupEvent` 阶段 post 两个 mod bus 事件, 用静态订阅接住即可:

```java
import com.lowdragmc.mbd2.common.event.MBDRegistryEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;

@Mod.EventBusSubscriber(modid = "cmi", bus = Mod.EventBusSubscriber.Bus.MOD)
public final class MB2Registration {

    @SubscribeEvent
    public static void registerMachines(MBDRegistryEvent.Machine event) {
        // 机器定义在这里注册
    }

    @SubscribeEvent
    public static void registerRecipeTypes(MBDRegistryEvent.MBDRecipeType event) {
        // 配方类型在这里注册
    }
}
```

**三个基础认知**:

1. Java 侧的机器类型名与 KubeJS 不同: `"single_machine"` 单方块 / `"multiblock"` 多方块
   (仅在 `registerFromResource/registerFromFile` 用到; builder 注册不需要). 
2. Builder 参数同样分两类: `rootState/blockProperties/itemProperties/recipeLogicSettings` 传对象,
   `machineSettings/partSettings/multiblockSettings` 传 `() -> 配置对象` 工厂 (不是 builder 回调). 
3. 链式调用注意: 多数 setter 返回父类 `MBDMachineDefinition.Builder`, 后面没有
   `multiblockSettings()` (编译错误); 多方块建议分步调用 builder (见第三步). 

---

## 第一步: 一台会干活的机器

```java
import com.lowdragmc.mbd2.api.capability.recipe.IO;
import com.lowdragmc.mbd2.common.machine.definition.MBDMachineDefinition;
import com.lowdragmc.mbd2.common.machine.definition.config.*;
import com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTraitDefinition;
import com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTraitDefinition;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.phys.shapes.Shapes;

@SubscribeEvent
public static void registerMachines(MBDRegistryEvent.Machine event) {
    event.register(createElectrolyzer());
}

private static MBDMachineDefinition createElectrolyzer() {
    var id = new ResourceLocation("cmi", "electrolyzer");

    // 状态机根状态: 模型 + 碰撞箱
    MachineState base = MachineState.builder()
            .name("base")
            .modelRenderer(new ResourceLocation("cmi", "block/machine/electrolyzer/off"))
            .shape(Shapes.block())
            .build();

    // 机器设置 + 特性
    ConfigMachineSettings settings = ConfigMachineSettings.builder()
            .hasUI(false)   // 纯代码注册无 GUI 数据 (uiCreator=null), hasUI(true) 开 UI 会 NPE; 需要 GUI 走 NBT 或 GUI 指南
            .build();

    ItemSlotCapabilityTraitDefinition slot = new ItemSlotCapabilityTraitDefinition();
    slot.setName("input");                    // 槽名, 配方与总线靠它匹配
    slot.setRecipeHandlerIO(IO.IN);           // 配方视角: 输入槽
    slot.setGuiIO(IO.IN);
    slot.setSlotSize(1);
    slot.setSlotLimit(64);
    slot.getCapabilityIO().setFrontIO(IO.IN); // 正面可输入
    settings.addTraitDefinition(slot);

    FluidTankCapabilityTraitDefinition tank = new FluidTankCapabilityTraitDefinition();
    tank.setName("fluid_out");
    tank.setRecipeHandlerIO(IO.OUT);
    tank.setGuiIO(IO.OUT);
    tank.setCapacity(16000);
    tank.getCapabilityIO().setFrontIO(IO.OUT);
    settings.addTraitDefinition(tank);

    return MBDMachineDefinition.builder()
            .id(id)
            .rootState(base)
            .machineSettings(() -> settings)
            .recipeLogicSettings(ConfigRecipeLogicSettings.builder()
                    .enable(true)
                    .recipeType(new ResourceLocation("cmi", "electrolyzer"))
                    .build())
            .build();
}
```

常用特性类: `ItemSlotCapabilityTraitDefinition` / `FluidTankCapabilityTraitDefinition` /
`ForgeEnergyCapabilityTraitDefinition` —— `new` + setter, 最后 `settings.addTraitDefinition(...)`. 

---

## 第二步: 配方类型 + 配方

```java
import com.lowdragmc.mbd2.api.recipe.MBDRecipeType;
import com.lowdragmc.mbd2.api.registry.MBDRegistries;

@SubscribeEvent
public static void registerRecipeTypes(MBDRegistryEvent.MBDRecipeType event) {
    var rl = new ResourceLocation("cmi", "electrolyzer");
    MBDRecipeType type = new MBDRecipeType(rl);
    type.setXEIVisible(true);
    MBDRegistries.RECIPE_TYPES.register(rl, type);

    // 内置配方 (无需 json 文件):
    type.recipeBuilder(new ResourceLocation("cmi", "water_electrolysis"))
            .duration(200)                        // tick
            .inputItems(Items.WATER_BUCKET)
            .outputItems(new ItemStack(Items.BUCKET))
            .saveAsBuiltinRecipe();
}
```

配方 builder 常用: `duration / inputItems / outputItems / inputFluids / outputFluids / inputFE / addData / isFuel`. 
想代理别的模组配方 (如 IE 焦炉): `new MBDRecipeType(rl, 代理的RecipeType)`. 

---

## 第三步: 多方块机器 (含结构)

```java
import com.lowdragmc.mbd2.common.machine.definition.MultiblockMachineDefinition;
import com.lowdragmc.mbd2.api.pattern.FactoryBlockPattern;
import com.lowdragmc.mbd2.api.pattern.Predicates;
import net.minecraft.world.level.block.Blocks;

private static MultiblockMachineDefinition createSmallMachine() {
    var id = new ResourceLocation("cmi", "small_machine");

    // 分步调用 builder: 链式时 setter 返回父类 Builder, 没有 multiblockSettings
    MultiblockMachineDefinition.Builder builder = MultiblockMachineDefinition.builder();
    builder.id(id);
    builder.rootState(MachineState.builder()
            .name("base")
            .modelRenderer(new ResourceLocation("cmi", "block/machine/small_machine/off"))
            .shape(Shapes.block())
            .build());
    builder.machineSettings(() -> ConfigMachineSettings.builder().hasUI(false));   // 纯代码注册无 GUI 数据 (uiCreator=null), hasUI(true) 开 UI 会 NPE; 需要 GUI 走 NBT 或 GUI 指南.build());
    builder.recipeLogicSettings(ConfigRecipeLogicSettings.builder()
            .enable(true)
            .recipeType(new ResourceLocation("cmi", "electrolyzer"))
            .build());
    builder.multiblockSettings(() -> ConfigMultiblockSettings.builder()
            .showUIOnlyFormed(true)
            .build());

    MultiblockMachineDefinition def = builder.build();

    // 结构: 每层一个 aisle() (y=0 底 → 顶), 行 = z, 字符 = x
    def.blockPatternFactory(machine -> FactoryBlockPattern.start()
            .aisle("III", "III", "III")
            .aisle("IAI", "IAI", "IAI")
            .aisle("III", "III", "III")
            .where('I', Predicates.blocks(Blocks.IRON_BLOCK))
            .where('A', Predicates.air())
            .build());
    return def;
}
```

结构要点:
- `blockPatternFactory` 是 definition 的方法, 不是 builder 的 —— 所以先 build 再挂. 
- 控制器位置: `Predicates.controller(Predicates.any())`. 
- 谓词: `Predicates.blocks/states/fluids/air/any` + `.or()` + `setMinLayerLimited` 等限量. 
- 现成 .mb 文件不想用代码写: `event.registerFromResource(类.class, "multiblock", "cmi/mbd2/multiblock/xxx.mb")`
  (文件放 resources/assets/cmi/mbd2/...), UI/结构/事件图全部原样保留. 

---

## 第四步: 机器事件

机器事件类在 `com.lowdragmc.mbd2.common.machine.definition.config.event.*`,
**不 post 到 FORGE 总线**, Java 侧通过 KubeJS EventHandler 订阅:

```java
import com.lowdragmc.mbd2.common.machine.definition.config.event.MachineOnRecipeWorkingEvent;
import com.lowdragmc.mbd2.integration.kubejs.events.MBDServerEvents;
import com.lowdragmc.mbd2.integration.kubejs.events.MBDMachineEvents.MachineEventJS;
import dev.latvian.mods.kubejs.script.ScriptType;

public static void init() {
    MBDServerEvents.ON_RECIPE_WORKING.listenJava(ScriptType.SERVER, MB2Registration.class,
            e -> onRecipeWorking(((MachineEventJS<MachineOnRecipeWorkingEvent>) e).getEvent()));
}

private static void onRecipeWorking(MachineOnRecipeWorkingEvent e) {
    var machine = e.getMachine();   // MBDMachine: getPos/getLevel/getState/getRecipeType...
}
```

事件常量全在 `MBDServerEvents` 上: `TICK / ON_RECIPE_WORKING / ON_RECIPE_FINISH /
STRUCTURE_FORMED / STRUCTURE_INVALID / RIGHT_CLICK / STATE_CHANGED ...` (与 KubeJS 事件同名). 

---

## 第五步: 定义 GUI

### GUI 的组成与约定 id

机器 GUI = `uiCreator` (`Function<MBDMachine, WidgetGroup>`) 返回的 widget 树 (LDLib GUI 框架). 
`bindMachineUI` 打开界面时按 widget 的 id 正则自动接功能:

| widget id (正则) | 自动挂载 |
|---|---|
| `^ui:machine_name$` | 机器名文本 (TextTextureWidget) |
| `^ui:progress_bar$` | 配方进度 (ProgressWidget, 进度= getProgressPercent) |
| `^ui:fuel_bar$` | 燃料进度 (getFuelProgressPercent) |
| `^ui:xei_lookup$` | XEI 配方查看按钮 (ButtonWidget) |
| `ui:<trait名>_<序号>` | trait 槽位 (initTraitUI 自动绑) |

widget 设 id: `widget.setId("ui:machine_name")`. 

### 关键结论: GUI 数据只来自 NBT, 纯代码注册的坑

- `uiCreator` 字段只在 `loadProductiveTag` (NBT 反序列化) 里被赋值; **纯代码 Builder 注册的机器
  `uiCreator == null`, 而 `hasUI` 默认 true, `createUI` 无 null 检查 → 开 GUI 直接 NPE**. 
- 所以纯代码机器要么 `hasUI(false)` (前四步的示例), 要么按下面路径注入 uiCreator. 

### 路径 A: 反射注入 uiCreator (纯代码写 GUI)

```java
import com.lowdragmc.lowdraglib.gui.texture.ResourceTexture;
import com.lowdragmc.lowdraglib.gui.widget.*;
import com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTrait;
import com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTrait;
import java.util.function.Function;

// 注册时 (builder.build() 之后):
setPrivateField(def, "uiCreator",
        (Function<MBDMachine, WidgetGroup>) MyMachines::createMachineUI);

private static WidgetGroup createMachineUI(MBDMachine machine) {
    WidgetGroup group = new WidgetGroup(0, 0, 176, 166);           // x, y, w, h
    group.setBackground(new ResourceTexture("ldlib:textures/gui/background.png"));

    // 标题: id 挂载
    group.addWidget(new TextTextureWidget(70, 5, 37, 20, "机器名").setId("ui:machine_name"));

    // 进度条: 自己接 supplier (bindMachineUI 不会自动跑, 见下)
    group.addWidget(new ProgressWidget(
            () -> machine.getRecipeLogic().getProgressPercent(),  // DoubleSupplier
            79, 42, 18, 18));

    // 物品槽: 按名拿 trait, storage 直接喂给 SlotWidget
    ItemSlotCapabilityTrait input = machine.getTraitByName(ItemSlotCapabilityTrait.class, "input");
    group.addWidget(new SlotWidget(input.storage, 0, 40, 42));     // (存储, 槽序号, x, y)

    ItemSlotCapabilityTrait output = machine.getTraitByName(ItemSlotCapabilityTrait.class, "output");
    group.addWidget(new SlotWidget(output.storage, 0, 114, 42));

    // 流体槽: storages[0] 是第一个槽
    FluidTankCapabilityTrait tank = machine.getTraitByName(FluidTankCapabilityTrait.class, "fluid_out");
    group.addWidget(new TankWidget(tank.storages[0], 141, 22, 18, 58, true, true));

    // 按钮
    group.addWidget(new ButtonWidget(78, 42, 18, 18, click -> System.out.println("clicked")));
    return group;
}
```

注意: 路径 A 注入后 `bindMachineUI` **不会**自动执行 (它只由 NBT 加载路径调用), 所以功能要自己接
(进度条 supplier / 槽位 handler 如上); 想用约定 id 自动挂载, 反射调一次
`bindMachineUI` (protected) 或干脆用 NBT 注册. 

### Widget 构造器速查 (LDLib 1.0.52)

| 类 | 构造器 |
|---|---|
| `WidgetGroup` | `(x, y, w, h)`; `addWidget(Widget)` |
| `SlotWidget` | `(IItemTransfer 存储, 槽序号, x, y)`; `setBackgroundTexture(IGuiTexture)` |
| `TankWidget` | `(IFluidStorage 存储, x, y, w, h, 可注入, 可抽取)` |
| `ProgressWidget` | `(DoubleSupplier, x, y, w, h)`; `setProgressTexture(空, 满)` |
| `ButtonWidget` | `(x, y, w, h, Consumer<ClickData>)`; `setButtonTexture(IGuiTexture...)` |
| `ImageWidget` | `(x, y, w, h, IGuiTexture)` |
| `TextTextureWidget` | `(x, y, w, h, String)`; `setText(...)` |
| `ResourceTexture` | `(String 贴图路径)` 或 `(ResourceLocation)` |
| `ProgressTexture` | `(IGuiTexture 空, IGuiTexture 满)`; `setFillDirection(...)` |

通用 (Widget 基类): `setId(String)` `setSelfPosition(x,y)` `setSize(w,h)` `setBackground(IGuiTexture...)`
`setHoverTooltips(String...)`. 

### 路径 B: 运行时改 GUI (MachineUIEvent)

**MachineUIEvent post 在 FORGE 总线** (与其他机器事件不同, 标准 @SubscribeEvent 即可), 有
`root` (WidgetGroup) 与 `setRoot(...)`:

```java
import com.lowdragmc.mbd2.common.machine.definition.config.event.MachineUIEvent;

@SubscribeEvent
public static void onMachineUI(MachineUIEvent event) {
    event.getRoot().addWidget(new ImageWidget(80, 5, 16, 16,
            new ResourceTexture("cmi:textures/gui/my_icon.png")));   // 往现有 UI 加图标
    // 或整体替换: event.setRoot(myGroup);
}
```

### 配方类型 GUI

.rt 的 `ui`/`fuelUI` 同样只来自 NBT; 代码侧可读: `MBDRecipeType.createRecipeUI(MBDRecipe)`
(public) 拿构建好的 WidgetGroup; 运行时改: `RecipeUIEvent` (public `root` + `getRoot/setRoot`),
同样 post 在 FORGE 总线. 

---

## 进阶 (需要时再看)

### 直接加载 NBT 注册 (迁移现有机器)

```java
// .sm/.mb/.rt 放进 resources/assets/cmi/mbd2/ 后:
event.registerFromResource(MB2Registration.class, "single_machine", "cmi/mbd2/machine/electrolyzer.sm");
event.registerFromResource(MB2Registration.class, "multiblock", "cmi/mbd2/multiblock/electrolyzer.mb");
// 磁盘文件: event.registerFromFile("single_machine", new File(...));
```

### 反射设 private 字段 (缺失的 setter)

```java
private static void setPrivateField(Object target, String fieldName, Object value) {
    try {
        var field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(target, value);
    } catch (ReflectiveOperationException e) {
        throw new RuntimeException(e);
    }
}
// 用例 1: 总线代理过滤器 (ProxyCapability.traitNameFilter 无 setter)
//   setPrivateField(proxy, "traitNameFilter", "input");
// 用例 2: 配方修饰器 4x 并行 (RecipeModifier.maxParallel 无 setter, 构造默认 identity 可变对象)
//   var field = RecipeModifier.class.getDeclaredField("maxParallel");
//   field.setAccessible(true);
//   ((ContentModifier) field.get(modifier)).setMultiplier(4.0);
```

### 与 KubeJS / 磁盘 NBT 共存

三条来源写同一个注册表, 顺序: Java → `ldlib/assets/mbd2` 磁盘 NBT → KubeJS. 
**同名后来者覆盖**, 迁移机器时先删旧 .sm/.mb 再改 Java 注册. 

---

## 附录: 配置类速查 (builder 方法, 不设取默认)

| 类 | 常用方法 |
|---|---|
| `MachineState` | `name / modelRenderer(模型路径) / geckolibRenderer(...) / shape / lightLevel / renderingBox / child` |
| `ConfigBlockProperties` | `destroyTime / explosionResistance / rotationState(RotationState.NON_Y_AXIS) / hasCollision / emissive` |
| `ConfigItemProperties` | `maxStackSize / isGui3d / creativeTab(new ToggleCreativeTab("cmi:machines")) / rarity` |
| `ConfigMachineSettings` | `machineLevel / hasUI / dropMachineItem / traitDefinition(...) / traitDefinitions(List)` |
| `ConfigRecipeLogicSettings` | `enable / recipeType(rl) / recipeDampingValue / consumeInputsAfterWorking / recipeModifiers` |
| `ConfigPartSettings` | `enable / canShare / proxyControllerCapabilities` |
| `ConfigMultiblockSettings` | `showUIOnlyFormed / showUIWhenClickStructure / catalyst` |
| `MBDRecipeBuilder` | `duration / inputItems / outputItems / inputFluids / outputFluids / inputFE / addData / saveAsBuiltinRecipe` |

完整实例 (5x5x5 高级焦炉逐字段还原) 见 [《高级焦炉-Java注册.md》](./高级焦炉-Java注册.md). 
```

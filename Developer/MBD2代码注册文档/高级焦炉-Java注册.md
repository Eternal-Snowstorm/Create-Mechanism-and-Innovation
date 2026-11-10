# 高级焦炉 (reinforced_coke_oven) — Java 版
> 完整实例: 按 ldlib/assets/mbd2 里的 NBT 逐字段还原, 一个类全部搞定. 
> 先读《MB2-Java注册文档.md》教程, 本文只给成品代码. 

## 这台机器是什么

- 5x5x5 多方块: 外壳 scorched_bricks, 内衬 seared_bricks, 顶部 slab, 中间 3 格烟囱 vent
- 控制器特性: 物品输入/输出槽各 1 (全方向), 流体输出槽 32000 mB
- 配方类型代理 IE 焦炉, 时长 x0.5, 最大并行 x4
- 状态树: base(off) → formed → working(on/发光15/鼓风炉音效) → waiting(off); formed → suspend
- 两个总线部件: input_bus / output_bus (模型 common_input / common_output)

## 完整代码

```java
package dev.celestiacraft.cmi.mbd2;

import com.lowdragmc.mbd2.api.block.RotationState;
import com.lowdragmc.mbd2.api.capability.recipe.IO;
import com.lowdragmc.mbd2.api.pattern.BlockPattern;
import com.lowdragmc.mbd2.api.pattern.FactoryBlockPattern;
import com.lowdragmc.mbd2.api.pattern.Predicates;
import com.lowdragmc.mbd2.api.recipe.MBDRecipeType;
import com.lowdragmc.mbd2.api.recipe.content.ContentModifier;
import com.lowdragmc.mbd2.api.registry.MBDRegistries;
import com.lowdragmc.mbd2.common.event.MBDRegistryEvent;
import com.lowdragmc.mbd2.common.machine.definition.MBDMachineDefinition;
import com.lowdragmc.mbd2.common.machine.definition.MultiblockMachineDefinition;
import com.lowdragmc.mbd2.common.machine.definition.config.*;
import com.lowdragmc.mbd2.common.machine.definition.config.toggle.ToggleCreativeTab;
import com.lowdragmc.mbd2.common.trait.TraitDefinition;
import com.lowdragmc.mbd2.common.trait.fluid.FluidTankCapabilityTraitDefinition;
import com.lowdragmc.mbd2.common.trait.item.ItemSlotCapabilityTraitDefinition;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.phys.shapes.Shapes;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.registries.ForgeRegistries;

import java.util.List;

@Mod.EventBusSubscriber(modid = "cmi", bus = Mod.EventBusSubscriber.Bus.MOD)
public final class ReinforcedCokeOven {

    @SubscribeEvent
    public static void registerMachines(MBDRegistryEvent.Machine event) {
        event.register(createOven());
        event.register(createBus("cmi:reinforced_coke_oven_input_bus",
                "cmi:block/machine/reinforced_coke_oven/common_input",
                "reinforced_coke_oven_input", IO.IN, false));
        event.register(createBus("cmi:reinforced_coke_oven_output_bus",
                "cmi:block/machine/reinforced_coke_oven/common_output",
                "reinforced_coke_oven_output", IO.OUT, true));
    }

    @SubscribeEvent
    public static void registerRecipeType(MBDRegistryEvent.MBDRecipeType event) {
        var rl = new ResourceLocation("cmi", "reinforced_coke_oven");
        // 代理 IE 焦炉: 全部 IE 焦炉配方直接可用
        MBDRecipeType type = new MBDRecipeType(rl,
                ForgeRegistries.RECIPE_TYPES.getValue(new ResourceLocation("immersiveengineering", "coke_oven")));
        type.setXEIVisible(true);
        type.setProxyRecipeXEIVisible(true);
        MBDRegistries.RECIPE_TYPES.register(rl, type);
    }

    // ==================== 多方块 ====================

    private static MultiblockMachineDefinition createOven() {
        // 状态树: base -> formed -> (working -> waiting, suspend)
        MachineState waiting = state("waiting", "cmi:block/machine/reinforced_coke_oven/off", 0);
        MachineState suspend = state("suspend", null, 0);                       // 无模型 -> 继承父状态
        MachineState working = state("working", "cmi:block/machine/reinforced_coke_oven/on", 15);
        working.machineSound().setEnable(true);
        working.machineSound().setSound(new ResourceLocation("minecraft", "block.blastfurnace.fire_crackle"));
        working.machineSound().setLoop(true);
        MachineState formed = MachineState.builder().name("formed").shape(Shapes.block())
                .children(List.of(working, suspend)).build();
        MachineState base = MachineState.builder().name("base")
                .modelRenderer(new ResourceLocation("cmi", "block/machine/reinforced_coke_oven/off"))
                .shape(Shapes.block())
                .children(List.of(formed)).build();

        // 特性: 物品输入 / 物品输出 / 流体输出
        ConfigMachineSettings settings = ConfigMachineSettings.builder().hasUI(false)   // 纯代码注册无 GUI 数据 (uiCreator=null), hasUI(true) 开 UI 会 NPE; 需要 GUI 走 NBT 或 GUI 指南.build();
        settings.addTraitDefinition(itemSlot("reinforced_coke_oven_input_item_slot", IO.IN));
        settings.addTraitDefinition(itemSlot("reinforced_coke_oven_output_item_slot", IO.OUT));
        settings.addTraitDefinition(fluidOut());

        // 配方修饰: 时长 x0.5 + 并行 x4 (maxParallel 是 private 字段, 反射 helper 见下)
        var modifiers = new RecipeModifier.RecipeModifiers();
        var mod = new RecipeModifier();
        mod.durationModifier.setMultiplier(0.5);
        setMaxParallel(mod, 4);
        modifiers.recipeModifiers.add(mod);

        MultiblockMachineDefinition.Builder builder = MultiblockMachineDefinition.builder();
        builder.id(new ResourceLocation("cmi", "reinforced_coke_oven"));
        builder.rootState(base);
        builder.blockProperties(ConfigBlockProperties.builder()
                .destroyTime(3).rotationState(RotationState.NON_Y_AXIS).build());
        builder.itemProperties(ConfigItemProperties.builder()
                .maxStackSize(64).isGui3d(true)
                .creativeTab(new ToggleCreativeTab(new ResourceLocation("cmi", "machines"))).build());
        builder.machineSettings(() -> settings);
        builder.recipeLogicSettings(ConfigRecipeLogicSettings.builder()
                .enable(true)
                .recipeType(new ResourceLocation("cmi", "reinforced_coke_oven"))
                .recipeDampingValue(2)
                .consumeInputsAfterWorking(true)
                .recipeModifiers(modifiers)
                .build());
        builder.multiblockSettings(() -> ConfigMultiblockSettings.builder()
                .showUIOnlyFormed(true).showUIWhenClickStructure(true).build());

        MultiblockMachineDefinition def = builder.build();
        def.blockPatternFactory(machine -> pattern());
        return def;
    }

    // 5x5x5 结构 (字符来自 NBT pattern; 每层一个 aisle, y=0 底 -> 顶)
    private static BlockPattern pattern() {
        return FactoryBlockPattern.start()
                .aisle("00000", "12221", "10001", "13331", "14441")
                .aisle("00000", "31112", "05550", "31113", "44444")
                .aisle("00000", "61112", "05550", "31113", "44444")
                .aisle("00000", "31112", "05550", "31113", "44444")
                .aisle("00000", "12221", "10001", "13331", "14441")
                .where('0', Predicates.blocks(block("tconstruct:scorched_bricks")))   // 外壳
                .where('1', Predicates.any())
                .where('2', Predicates.blocks(block("cmi:reinforced_coke_oven_input_bus"))   // IO 槽
                        .or(Predicates.blocks(block("cmi:reinforced_coke_oven_output_bus")))
                        .or(Predicates.blocks(block("tconstruct:seared_bricks"))))
                .where('3', Predicates.blocks(block("tconstruct:seared_bricks")))     // 内衬
                .where('4', Predicates.blocks(block("tconstruct:scorched_bricks_slab"))) // 顶板
                .where('5', Predicates.blocks(block("ad_astra:vent")))                // 烟囱
                .where('6', Predicates.controller(Predicates.any()))                  // 控制器槽
                .build();
    }

    // ==================== 总线 ====================

    private static MBDMachineDefinition createBus(String id, String model, String traitFilter,
                                                  IO io, boolean autoAllSides) {
        // 总线 = 单方块部件, 通过 ProxyCapability 代理控制器上名字带 traitFilter 前缀的 trait
        ConfigPartSettings.ProxyCapability proxy = new ConfigPartSettings.ProxyCapability();
        setPrivateField(proxy, "traitNameFilter", traitFilter);   // private 字段无 setter
        proxy.capabilityIO().setInternal(io);
        proxy.capabilityIO().setFrontIO(io);
        proxy.capabilityIO().setBackIO(IO.NONE);
        proxy.capabilityIO().setLeftIO(IO.NONE);
        proxy.capabilityIO().setRightIO(IO.NONE);
        proxy.capabilityIO().setTopIO(IO.NONE);
        proxy.capabilityIO().setBottomIO(IO.NONE);
        proxy.autoIO().setEnable(true);
        proxy.autoIO().setInterval(20);
        proxy.autoIO().setFrontIO(io);
        proxy.autoIO().setBackIO(autoAllSides ? io : IO.NONE);
        proxy.autoIO().setLeftIO(autoAllSides ? io : IO.NONE);
        proxy.autoIO().setRightIO(autoAllSides ? io : IO.NONE);
        proxy.autoIO().setTopIO(autoAllSides ? io : IO.NONE);
        proxy.autoIO().setBottomIO(autoAllSides ? io : IO.NONE);

        MBDMachineDefinition.Builder builder = MBDMachineDefinition.builder();
        builder.id(new ResourceLocation(id));
        builder.rootState(state("base", model, 0));
        builder.blockProperties(ConfigBlockProperties.builder().destroyTime(3).build());
        builder.itemProperties(ConfigItemProperties.builder().maxStackSize(64).build());
        builder.machineSettings(() -> ConfigMachineSettings.builder().hasUI(false).build());
        builder.recipeLogicSettings(ConfigRecipeLogicSettings.builder()
                .enable(false).recipeType(new ResourceLocation("mbd2", "dummy")).build());
        builder.partSettings(() -> ConfigPartSettings.builder()
                .enable(true).canShare(true)
                .proxyControllerCapabilities(List.of(proxy)).build());
        return builder.build();
    }

    // ==================== helpers ====================

    private static MachineState state(String name, String model, int light) {
        MachineState.Builder<?> b = MachineState.builder()
                .name(name).shape(Shapes.block()).lightLevel(light);
        if (model != null) {
            b.modelRenderer(new ResourceLocation(model));
        }
        return b.build();
    }

    private static TraitDefinition itemSlot(String name, IO io) {
        ItemSlotCapabilityTraitDefinition t = new ItemSlotCapabilityTraitDefinition();
        t.setName(name);
        t.setRecipeHandlerIO(io);
        t.setGuiIO(io);
        t.setSlotSize(1);
        t.setSlotLimit(64);
        t.getCapabilityIO().setInternal(io);
        t.getCapabilityIO().setFrontIO(io);
        t.getCapabilityIO().setBackIO(io);
        t.getCapabilityIO().setLeftIO(io);
        t.getCapabilityIO().setRightIO(io);
        t.getCapabilityIO().setTopIO(io);
        t.getCapabilityIO().setBottomIO(io);
        return t;
    }

    private static TraitDefinition fluidOut() {
        FluidTankCapabilityTraitDefinition t = new FluidTankCapabilityTraitDefinition();
        t.setName("reinforced_coke_oven_output_fluid_tank");
        t.setRecipeHandlerIO(IO.OUT);
        t.setGuiIO(IO.OUT);
        t.setCapacity(32000);
        t.getCapabilityIO().setInternal(IO.OUT);
        t.getCapabilityIO().setFrontIO(IO.OUT);
        t.getCapabilityIO().setBackIO(IO.OUT);
        t.getCapabilityIO().setLeftIO(IO.OUT);
        t.getCapabilityIO().setRightIO(IO.OUT);
        t.getCapabilityIO().setTopIO(IO.OUT);
        t.getCapabilityIO().setBottomIO(IO.OUT);
        return t;
    }

    private static Block block(String id) {
        return ForgeRegistries.BLOCKS.getValue(new ResourceLocation(id));
    }

    /** maxParallel 是 private 字段无 setter, 但构造时初始化为可变对象 -> 反射拿引用改值 */
    private static void setMaxParallel(RecipeModifier modifier, double multiplier) {
        try {
            var field = RecipeModifier.class.getDeclaredField("maxParallel");
            field.setAccessible(true);
            ((ContentModifier) field.get(modifier)).setMultiplier(multiplier);
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException(e);
        }
    }

    /** 通用: 设置 Java 对象的 private 字段 (traitNameFilter 等无 setter 字段) */
    private static void setPrivateField(Object target, String fieldName, Object value) {
        try {
            var field = target.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(target, value);
        } catch (ReflectiveOperationException e) {
            throw new RuntimeException(e);
        }
    }
}
```

## 要点

- 模型文件 (on/off/common_input/common_output) 已在 kubejs/assets 里, 直接引用原路径. 
- 结构摆好后, 输入/输出总线放进 `2` 槽位, 控制器在 `6` 槽位 (中间层). 
- 想整机走 NBT (含编辑器 UI): 把 .mb/.sm/.rt 放进 resources 后
  `event.registerFromResource(...)` 一行即可, 见教程进阶章节. 
- 机器事件 (工作冒烟等) 参考教程第四步, CMI Core 已有 `CokeOvenWorking`. 
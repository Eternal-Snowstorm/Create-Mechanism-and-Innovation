# MB2 注册文档索引
> 调研对象: multiblocked2-1.20.1-1.0.39.jar + ldlib/assets/mbd2 (.sm/.mb/.rt NBT 定义)
> 所有类名/方法名/事件名均经 javap 反编译与 kubejs/probe 生成文件验证。

## 文档

| 文件 | 内容 |
|---|---|
| [MB2-Java注册文档.md](./MB2-Java注册文档.md) | **入门教程** (推荐先读): 快速开始 → 单方块+特性 → 配方类型+配方 → 多方块结构 → 机器事件; 进阶 (NBT 注册/反射/共存) 与配置速查在文末 |
| [MB2-KubeJS注册文档.md](./MB2-KubeJS注册文档.md) | **入门教程** (推荐先读): 同样的五步结构; 统一 $类名 引用约定, Builder 参数两类规则, 多方块 removeMachine 四步流程 |
| [高级焦炉-Java注册.md](./高级焦炉-Java注册.md) | 完整实例: 高级焦炉逐字段还原自 ldlib NBT (5x5x5 结构/状态机/三特性/IE 配方代理/4x 并行) |
| [高级焦炉-KubeJS注册.md](./高级焦炉-KubeJS注册.md) | 完整实例: 同一台高级焦炉的 KubeJS 版 (含总线反射注册) |

## 三句话结论

1. Java 能注册一切 (机器/多方块/特性/配方类型/配方), 入口是 `MBDRegistryEvent.Machine` 等 mod bus 事件。
2. KubeJS 同样能注册 (`MBDRegistryEvents.machine` / `.recipeType`), 但机器 Builder 是裸 Java 反射,
   `machineSettings` 是**无参 Supplier 工厂**而非 builder 回调 —— 回调参数必为 any/undefined, 必须 return 配置对象。
3. Java, 磁盘 NBT (ldlib/assets/mbd2), KubeJS 三条来源共存于同一注册表, 顺序为
   Java → 磁盘 NBT → KubeJS, **同名后来者覆盖**; 混合注册细节见两份文档各自的最后一节。

## 速记: 两侧类型名不同!

| 概念 | Java 侧 (registerFromResource 的 type) | KubeJS 侧 (event.create 的 type) |
|---|---|---|
| 单方块 | `single_machine` | `single` |
| 多方块 | `multiblock` | `multiblock` |
| 动力机器 | `create_machine` | `kinetic` |

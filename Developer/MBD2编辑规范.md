# Multiblocked 2 编辑规范

> 我受不了了, 我要规范!

## 概述

Multiblocked 2 (`MBD2`) 提供了可视化的编辑界面, 不过用可视化并不是十分方便, 然而用[代码注册](./MBD2代码注册文档/README.md)功能又不全, 所以还是得用可视化编辑. 但随便编辑也不太好, 所以需要这一个规范.

| 类型      | 文件扩展名                  | 重载指令                              |
| :------- | :----------------------- | :----------------------------------- |
| 单方块机器  | `.sm` (*Single Machine*) | `/mbd2 reload_machine_projects`     |
| 多方块机器  | `.mb` (*Multiblock*)     | `/mbd2 reload_machine_projects`     |
| 机械动力机器 | `.km` (*kinetic_machine*)| `/mbd2 reload_machine_projects`     |
| 配方类型    | `.rt` (*Recipe Type*)    | `/mbd2 reload_recipe_type_projects` |

## 通用

 - 命名空间为 `cmi`
 - 不要出现 `new 0` 这样的默认名
 - 默认条目 `ldlib.author: Hello KilaBash!`、默认36种颜色需要删

## 机器

 - 所属创造模式标签页应为`cmi:machines`
 - 如果机器有 xei, 需要在进度条箭头上覆盖查看配方的按钮
 - 运行时的模型名称需要是`on`, 停止时的模型名称需要是`off`
 - 如果没有gui, 默认gui的位置、大小全部归零, 背景删除, 玩家物品栏删除
 - 如果有机器名称：
    - 对齐设置为`TOP_CENTER`
    - 文本框的 width 为 gui 中背景的 width, height 为 20
    - 默认文本修改为此机器英文名
    - 设置最下方的 type 需要是`ROLL`

特性名格式:
```
<机器名>_<input/output>_<item/fluid/gas>
```
当一个特性挂多个 slotNames, 或一个机器同一方向有多个同类槽位时, 末尾加一个数字索引
```
<机器名>_<input/output>_<item/fluid/gas>_<索引>
```

### 单方块机器

 - 模型名称为`model`

### 多方块机器

 - 谓词名称需要是此谓词中的主方块id

## 配方类型

 - 如果配方没有燃料配方:
    - 燃料图标应删除
    - 燃料ui的位置、大小全部归零, 背景删除
# Multiblocked 2 编辑规范

> 我受不了了, 我要规范!

## 概述

Multiblocked 2 (`MBD2`) 提供了可视化的编辑界面, 不过用可视化并不是十分方便, 然而用[代码注册](./MBD2代码注册文档/README.md)功能又不全, 所以还是得用可视化编辑. 但随便编辑也不太好, 所以需要这一个规范.

| 类型     | 文件扩展名                  | 重载指令                            |
| :------ | :----------------------- | :--------------------------------- |
| 单方块机器 | `.sm` (*Single Machine*) | `/mbd2 reload_machine_project`     |
| 多方块机器 | `.mb` (*Multiblock*)     | `/mbd2 reload_machine_project`     |
| 配方类型  | `.rt` (*Recipe Type*)     | `/mbd2 reload_recipe_type_project` |

## 通用

 - 命名空间为 `cmi`
 - 不要出现 `new 0` 这样的默认名
 - 默认条目 `ldlib.author: Hello Kilabash!`、默认36种颜色需要删除

## 机器

 - 所属创造模式标签页应为`cmi:machines`
 - 如果机器有 xei, 需要在进度条箭头上覆盖查看配方的按钮

特性名格式:
```
<机器名>_<input/output>_<item/fluid/gas>
```

### 单方块机器

### 多方块机器

## 配方类型

 - 如果配方没有燃料配方:
    - 燃料图标应删除
    - 燃料ui的位置、大小全部归零, 背景删除
# MBD2-NBT工具

处理 MBD2 工程文件的脚本工具集，配套规范见 [`../MBD2编辑规范.md`](../MBD2编辑规范.md)。

`.sm` / `.mb` / `.km` / `.rt` 本质是**未压缩 NBT**（与 Minecraft NBT 格式一致）。
游戏内可视化编辑器改起来不方便，所以这里放一套纯脚本工具，做批量体检与规范化。

## 文件

| 文件 | 作用 |
| :--- | :--- |
| [`_nbt_tool.py`](./_nbt_tool.py) | NBT 读写库（供其它脚本 import）。也可直接跑：`python _nbt_tool.py dump <文件> [输出.txt]` 转成可读文本 |
| [`mbd2_audit.py`](./mbd2_audit.py) | 逐条对照规范做全量体检（只读，不改文件） |
| [`mbd2_spec.py`](./mbd2_spec.py) | 规范化渲染资源名。`scan` 只看，`fix` 写入，`restore` 从备份还原 |
| [`mbd2_colors.py`](./mbd2_colors.py) | 清默认颜色表 + 默认作者 `ldlib.author`，保留自定义颜色 |
| [`mbd2_trim.py`](./mbd2_trim.py) | 清理标识符首尾空白（例如 `'\tcmi:electrum_coil'`） |
| [`mbd2_verify.py`](./mbd2_verify.py) | 往返校验：读取 → 重新序列化 → 必须与原文件逐字节一致 |
| `_backup/` | `fix` 时自动产生的原文件备份，保持与仓库同层级的相对路径 |

脚本都从自身位置往上推仓库根，**放在哪个目录都能跑**，不需要改路径。

## 跑法

用随附的 Python（脚本不依赖第三方库）：

```powershell
$py = "C:\Users\fzh\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe"
$env:PYTHONDONTWRITEBYTECODE = "1"     # 免得生成 __pycache__

& $py Developer\MBD2-NBT工具\mbd2_audit.py         # 规范全量体检
& $py Developer\MBD2-NBT工具\mbd2_colors.py scan   # 默认色/作者体检
& $py Developer\MBD2-NBT工具\mbd2_trim.py scan     # 空白污染体检
& $py Developer\MBD2-NBT工具\mbd2_verify.py        # 往返校验（改前改后都该跑）

& $py Developer\MBD2-NBT工具\mbd2_spec.py fix      # 实际写入（会先备份）
& $py Developer\MBD2-NBT工具\mbd2_spec.py restore  # 从备份还原
```

## 为什么不能像改文本一样改

- 二进制 NBT，直接文本替换极易破坏长度前缀，改坏就是注册失败或崩游戏。
- NBT 的 `List` 头部带一个「元素类型」字节。**空 List 的类型猜不出来**，
  猜错（写成 `End`）会生成非法 NBT 并炸游戏。
  因此 `_nbt_tool.py` 把 List 表示成 `List(元素类型, [元素])`，而不是靠内容猜。
- 渲染资源是「资源定义 + 引用」成对的：
  `resources.ldlib.gui.editor.group.renderer` 里的条目名，
  与 `stateMachine.renderer.value.key.key` 引用的名字必须一致。只改一边，模型就渲染不出来。
- ⚠️ 写脚本时注意：`_nbt_tool.List` **不是内建 `list` 的子类**，
  判断列表要用 `isinstance(x, List)`，用 `isinstance(x, list)` 恒为假（这个坑踩过）。

## 改名依据

规范只说「不要出现 `new 0` 这样的默认名」，没说该叫什么。这里取自同目录参照物：

| 文件类型 | 资源名 | 参照 |
| :--- | :--- | :--- |
| `machine/*.sm` | `model` | `machine/reinforced_coke_oven/*.sm`、`machine/large_mixer/input.sm` |
| `multiblock/*.mb` | `off` / `on` | 同文件 `resources` 只有这两个；`working` 状态 = `on`，其余 = `off` |
| `recipe_type/*.rt` | `icon` | `recipe_type/reinforced_coke_oven.rt` 等 `.rt` |

脚本只写入**白名单内**的名字：新名字如果在 `resources` 里不存在，就跳过并报警，
不会造出渲染不出来的引用。

## 安全措施

1. 写入前先做字节级往返校验，不一致就**拒绝写入**。
2. 原文件备份到本目录 `_backup/`（源文件比备份新时自动刷新，不留过期备份）；
   `ldlib/` 本身也被 git 跟踪，`git checkout` 同样能回滚。
3. 写回后重新读一遍，确认尾部无多余字节且能稳定往返。

> ⚠️ `_backup/` 只是回滚用的中间产物，已由本目录的 `.gitignore` 忽略，**发布整合包时不要带上**。

## 当前状态（2026-10-10 校验）

| 类型 | 数量 |
| :--- | ---: |
| `.sm` 单方块部件 | 33 |
| `.mb` 多方块 | 8 |
| `.rt` 配方类型 | 8 |
| **合计** | **49** |

机器目录：`air_tight` 5、`chemical_reactor` 2、`electrolyzer` 7、`electronic_blast_furnace` 2、
`improved_rubber_extractor` 2、`industrial_iron` 2、`reinforced_coke_oven` 2、`seared` 2、
`stainless_steel` 2、`steel` 7。

多方块：`chemical_reactor` / `electrolyzer` / `electronic_blast_furnace` /
`improved_rubber_extractor` / `multi_driller` / `radar_antenna` /
`reinforced_chemical_reactor` / `reinforced_coke_oven`。

### 体检结果

| 项目 | 结果 |
| :--- | :--- |
| 往返校验 | 49 / 49 逐字节一致 |
| 默认名 `new N` | 0 |
| 默认色 | 0 |
| 默认作者 `ldlib.author` | 0 |
| 标识符首尾空白 | 0 |
| 真实违规 | **3**（见下） |

## 尚未处理的条目

### 1. `multi_driller.mb` 的创造标签页是 `minecraft:redstone_blocks`

另外 7 个 `.mb` 全是 `cmi:machines`，只有它是红石方块页，看着像漏改。
但 `cmi:machines` 这个标签在 `kubejs` 里搜不到注册代码（应在 CMI Core 模组里），
所以没有擅自改。

> 历史备注：早期的 `large_mixer.mb` 也是 `minecraft:redstone_blocks`，
> 后来团队成员改成了 `cmi:machines`，说明这确实是漏改而非刻意为之。

### 2. 两个文件 `hasUI=0` 但背景仍是 `border_texture`

`machine/reinforced_coke_oven/input.sm`、`machine/seared/input.sm`：
位置与大小已归零、无 `children`，但 `backgroundTexture.type` 仍为 `border_texture`，
而同目录的 `output.sm` 是 `empty`。按规范应改为 `empty`，但
`reinforced_coke_oven/input.sm` 正是本次规范化的参照物之一，所以先不动，等确认。

### 3. 28 个部件方块的 `hasUI=0` 但 UI 未清零（**有意为之，不是违规**）

规范原文是「没有 gui 时，默认 gui 的位置、大小全部归零，背景删除，玩家物品栏删除」。
但这些 `.sm` 是**部件方块（bus）**，`ui.children` 里是控制器 UI 要渲染的槽位，
归零或删背景会让部件在控制器界面里错位/看不见。

判据很干净：**UI 已清零的文件 `children` 都是 0**（`reinforced_coke_oven`、
`seared`、`large_mixer`），**未清零的文件 `children` 都是 1**。
两者都自洽，所以 `mbd2_audit.py` 对这类只报 `INFO`。

> 曾经错误地把这类当违规报出来（`mbd2_audit.py` 里把
> `isinstance(kids.value, List)` 写成了 `isinstance(kids, list)`，恒为假），已修。

## 处理记录

### 2026-10-10（团队成员改动后的复校）

团队成员新增了 `air_tight`(5)、`industrial_iron`(2)、`seared`(2)、`stainless_steel`(2)、
`steel`(7) 五个机器目录，新增 `multi_driller.mb`，并改动了
`radar_antenna.mb`、`electronic_blast_furnace.rt` 等。

本次处理：

- 5 个新 `.sm`（`air_tight/*`）渲染资源名 `new 0` → `model`。
- 5 个新 `.sm` 清掉 38 条默认色 + 默认作者。
- `multi_driller.mb` 清掉 38 条默认色。
- 保留 `radar_antenna.mb` 的自定义色 `text`（新增的，非默认表）。

### 2026-10-07（首次规范化）

- 13 个 `.sm` 渲染资源名 `new 0` → `model`（资源定义与引用同步改）。
- 2 个 `.mb` 的 `waiting` 状态引用 `new 1` → `off`。
- 2 个 `.rt` 图标引用 `new 0` → `icon`。
- `electronic_blast_furnace.mb` 的 `holders[2]` 第二个谓词 `'\tcmi:electrum_coil'`
  带制表符前缀，已剥掉空白。
- 清掉 17 个 `.sm` 的 38 条默认色，以及 13 个文件残留的默认作者。

> 注意作者默认值的拼写是 `Hello KilaBash!`（大写 **B**）。
> 按小写 `Hello Kilabash!` 搜会漏掉，早期体检就是这么漏的。

## 已知的不同写法

[`../../ldlib/assets/mbd2/machine/large_mixer/output.sm`](../../ldlib/assets/mbd2/machine/large_mixer/output.sm)
的 `renderer.value` 用的是直接内联 `json_model`（没有独立的命名资源与 `key` 引用）。
这是另一种合法写法，不涉及 `new N` 默认名，脚本不会动它。

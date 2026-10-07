# MBD2-NBT工具

处理 MBD2 工程文件的脚本工具集，配套规范见 [`../MBD2编辑规范.md`](../MBD2编辑规范.md)。

`.sm` / `.mb` / `.km` / `.rt` 本质是**未压缩 NBT**（与 Minecraft NBT 格式一致）。
游戏内可视化编辑器改起来不方便，所以这里放一套纯脚本工具，做批量体检与规范化。

## 文件

| 文件 | 作用 |
| :--- | :--- |
| [`_nbt_tool.py`](./_nbt_tool.py) | NBT 读写库（供其它脚本 import）。也可直接跑：`python _nbt_tool.py dump <文件> [输出.txt]` 转成可读文本 |
| [`mbd2_spec.py`](./mbd2_spec.py) | 按规范体检 / 规范化。`scan` 只看，`fix` 写入，`restore` 从备份还原 |
| [`mbd2_trim.py`](./mbd2_trim.py) | 清理标识符首尾空白（例如 `'\tcmi:electrum_coil'`） |
| [`mbd2_verify.py`](./mbd2_verify.py) | 往返校验：读取 → 重新序列化 → 必须与原文件逐字节一致 |
| `_backup/` | `fix` 时自动产生的原文件备份，保持与仓库同层级的相对路径 |

三个脚本都从自身位置往上推仓库根，**放在哪个目录都能跑**，不需要改路径。

## 跑法

用随附的 Python（脚本不依赖第三方库）：

```powershell
$py = "C:\Users\fzh\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe"
$env:PYTHONDONTWRITEBYTECODE = "1"     # 免得生成 __pycache__

& $py Developer\MBD2-NBT工具\mbd2_spec.py scan     # 规范体检
& $py Developer\MBD2-NBT工具\mbd2_trim.py scan     # 空白污染体检
& $py Developer\MBD2-NBT工具\mbd2_verify.py        # 往返校验（改前改后都该跑）

& $py Developer\MBD2-NBT工具\mbd2_spec.py fix      # 实际写入（会先备份）
& $py Developer\MBD2-NBT工具\mbd2_spec.py restore  # 从备份还原
```

## 为什么不能像改文本一样改

- 二进制 NBT，直接文本替换极易破坏长度前缀，改坏就是注册失败或崩游戏。
- NBT 的 `List` 头部带一个「元素类型」字节。**空 List 的类型猜不出来**，
  猜错（写成 `End`）会生成非法 NBT 并炸游戏。
  因此 `_nbt_tool.py` 把 List 表示成 `(元素类型, [元素])`，而不是靠内容猜。
- 渲染资源是「资源定义 + 引用」成对的：
  `resources.ldlib.gui.editor.group.renderer` 里的条目名，
  与 `stateMachine.renderer.value.key.key` 引用的名字必须一致。只改一边，模型就渲染不出来。

## 改名依据

规范只说「不要出现 `new 0` 这样的默认名」，没说该叫什么。这里取自同目录参照物：

| 文件类型 | 资源名 | 参照 |
| :--- | :--- | :--- |
| `machine/*.sm` | `model` | `machine/reinforced_coke_oven/*.sm`、`machine/large_mixer/input.sm` |
| `multiblock/*.mb` | `off` / `on` | 同文件 `resources` 只有这两个；`working` 状态 = `on`，其余 = `off` |
| `recipe_type/*.rt` | `icon` | `recipe_type/reinforced_coke_oven.rt` 等 7 个 `.rt` |

脚本只写入**白名单内**的名字：新名字如果在 `resources` 里不存在，就跳过并报警，
不会造出渲染不出来的引用。

## 安全措施

1. 写入前先做字节级往返校验，不一致就**拒绝写入**。
2. 原文件备份到本目录 `_backup/`；`ldlib/` 本身也被 git 跟踪，`git checkout` 同样能回滚。
3. 写回后重新读一遍，确认尾部无多余字节且能稳定往返。

> ⚠️ `_backup/` 只是回滚用的中间产物，**发布整合包时不要带上**。

## 2026-10-07 处理记录

- 13 个 `.sm` 的渲染资源名还是 `new 0` → 改为 `model`（资源定义与引用同步改）。
- 2 个 `.mb`（`reinforced_coke_oven` / `reinforced_chemical_reactor`）
  的 `waiting` 状态引用 `new 1` → 改为 `off`。
- 2 个 `.rt`（`electronic_blast_furnace` / `multi_type_driller`）的图标引用
  `new 0` → 改为 `icon`。
- `electronic_blast_furnace.mb` 的 `holders[2]` 第二个谓词是 `'\tcmi:electrum_coil'`
  （前面多了一个制表符）。带空白的 ID 解析不出对应方块，该谓词永远匹配不上，
  已剥掉空白。

处理后：34 个文件 **0 处规范问题、0 处空白污染、100% 字节一致往返**。

## 已知的不同写法

[`../../ldlib/assets/mbd2/machine/large_mixer/output.sm`](../../ldlib/assets/mbd2/machine/large_mixer/output.sm)
的 `renderer.value` 用的是直接内联 `json_model`（没有独立的命名资源与 `key` 引用）。
这是另一种合法写法，不涉及 `new N` 默认名，脚本不会动它。

#!/usr/bin/env python3
"""
按 Developer/MBD2编辑规范.md 清掉默认颜色表

规范: 「默认条目 `ldlib.author: Hello Kilabash!`, 默认36种颜色需要删」

现状:
    machine/*.sm                    38 条默认色 (19 基础 + 19 个 T_ 变体)
    multiblock/*.mb, recipe_type/*.rt   大多已被编辑器清成 0 条 (这就是清理后的样子)
    recipe_type/thermal/hive_hopper.rt  只有 2 条, 是本项目自己加的, 不是默认表

做法:
    把 resources.ldlib.gui.editor.group.colors 里的 **默认色** 删掉;
    非默认的自定义颜色 (例如 background_color / overlay) 原样保留并报告.
    「默认色」的判定 = 属于 llip 内置调色板名单 (GRAY/BLUE/.../T_YELLOW),
    这批名字在整个工程文件里没有任何引用, 删掉不影响已有 UI.

组本身保留 (变成空 Compound), 因为多数 .mb/.rt 就是空组, 说明这是编辑器的正常状态.

用法:
    python mbd2_colors.py scan
    python mbd2_colors.py fix
"""

import sys
import shutil
from pathlib import Path

# Developer/MBD2-NBT工具/<本文件> -> 仓库根
ROOT = Path(__file__).resolve().parent.parent.parent
MB_ROOT = ROOT / "ldlib" / "assets" / "mbd2"
BACKUP = Path(__file__).resolve().parent / "_backup"

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _nbt_tool import read_file, serialize, walk, Compound  # noqa

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

COLORS_PATH = "resources.ldlib.gui.editor.group.colors"

# ldlib 编辑器内置调色板 (默认 19 色 + 19 个 T_ 透传变体)
DEFAULT_BASE = [
    "GRAY", "BLUE", "T_RED", "T_BRIGHT_RED", "T_WHITE", "T_GREEN", "T_LIGHT_BLUE",
    "PINK", "T_BLUE", "T_LIME", "T_BLACK", "BLACK", "T_BROWN", "T_GRAY",
    "T_DARK_GRAY", "T_YELLOW", "BROWN", "T_CYAN", "ORANGE", "WHITE", "T_MAGENTA",
    "PURPLE", "GREEN", "T_PURPLE", "RED", "SEAL_BLACK", "LIGHT_GRAY", "LIGHT_BLUE",
    "T_LIGHT_GRAY", "T_PINK", "LIME", "BRIGHT_RED", "T_SEAL_BLACK", "T_ORANGE",
    "MAGENTA", "YELLOW", "DARK_GRAY", "CYAN",
]
DEFAULT_NAMES = set(DEFAULT_BASE)


DEFAULT_AUTHOR_KEY = "ldlib.author"
DEFAULT_AUTHOR_VALUE = "Hello KilaBash!"


def group(root, name):
    """resources 下的组是 <resources> 的直接子键 (名字形如 ldlib.gui.editor.group.colors)"""
    res = None
    for n, t in root:
        if n == "resources":
            res = t.value
            break
    if not isinstance(res, Compound):
        return None
    for n, t in res:
        if n == name:
            return t.value
    return None


def process(path, apply_fix):
    root_name, root, trailing, data = read_file(str(path))
    rel = path.relative_to(ROOT)

    colors = group(root, "ldlib.gui.editor.group.colors")
    entries = group(root, "ldlib.gui.editor.group.entries")

    default_entries = []
    custom_entries = []
    if isinstance(colors, Compound):
        default_entries = [(n, t) for n, t in colors if n in DEFAULT_NAMES]
        custom_entries = [(n, t) for n, t in colors if n not in DEFAULT_NAMES]

    author_hits = []
    if isinstance(entries, Compound):
        author_hits = [n for n, t in entries
                       if n == DEFAULT_AUTHOR_KEY
                       and isinstance(t.value, str)
                       and t.value.strip().lower() == DEFAULT_AUTHOR_VALUE.lower()]

    if not default_entries and not author_hits:
        return rel, [], [(n, t.value) for n, t in custom_entries]

    n_colors = len(colors) if isinstance(colors, Compound) else 0
    lines = [f"=== {rel}  ({len(data)} B, 颜色 {n_colors} 条: "
             f"默认 {len(default_entries)} / 自定义 {len(custom_entries)}; "
             f"默认作者 {len(author_hits)} 条)"]

    if apply_fix:
        assert serialize(root_name, root) == data, f"{rel}: 往返校验失败, 拒绝写入"

        if isinstance(colors, Compound):
            for i in range(len(colors) - 1, -1, -1):
                if colors[i][0] in DEFAULT_NAMES:
                    del colors[i]

        for i in range(len(entries) - 1, -1, -1):
            n, t = entries[i]
            if n == DEFAULT_AUTHOR_KEY and isinstance(t.value, str) \
                    and t.value.strip().lower() == DEFAULT_AUTHOR_VALUE.lower():
                del entries[i]

        regen = serialize(root_name, root)
        tmp = Path(str(path) + ".verify")
        tmp.write_bytes(regen)
        _, root2, t2, _ = read_file(str(tmp))
        tmp.unlink()
        assert t2 == 0 and serialize(root_name, root2) == regen, f"{rel}: 写回后自检失败"

        BACKUP.mkdir(exist_ok=True)
        dest = BACKUP / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        if not dest.exists():
            shutil.copy2(path, dest)
        path.write_bytes(regen)
        lines.append(f"    删默认色 {len(default_entries)} 条, 删默认作者 {len(author_hits)} 条; "
                     f"{len(data)} B -> {len(regen)} B")

    return rel, lines, [(n, t.value) for n, t in custom_entries]


def main():
    apply_fix = (sys.argv[1] if len(sys.argv) > 1 else "scan") == "fix"
    files = sorted(p for p in MB_ROOT.rglob("*") if p.suffix in {".sm", ".mb", ".km", ".rt"})

    changed = 0
    kept = []
    for f in files:
        rel, lines, custom = process(f, apply_fix)
        if custom:
            kept.append((rel, custom))
        if lines:
            changed += 1
            print("\n".join(lines))

    if kept:
        print("\n===== 保留的自定义颜色 (非默认表, 未动) =====")
        for rel, custom in kept:
            print(f"  {rel}: {custom}")

    print(f"\n---- {changed} 个文件{'已清理' if apply_fix else '待清理'} ----")


if __name__ == "__main__":
    main()

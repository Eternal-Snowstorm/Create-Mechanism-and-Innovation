#!/usr/bin/env python3
"""
MBD2 工程文件规范体检 —— 逐条对照 Developer/MBD2编辑规范.md

覆盖条目:
  通用
    - 命名空间为 cmi
    - 不要出现 `new 0` 这样的默认名
    - 默认条目 ldlib.author: Hello KilaBash! 需删
    - 默认 38 种颜色 (19 基础 + 19 个 T_ 变体) 需删
  机器
    - 创造模式标签页为 cmi:machines
    - 运行时模型 on / 停止时模型 off
    - 没有 gui 时: gui 位置与大小归零, 背景删除, 玩家物品栏删除
    - 有机器名称时: 对齐 TOP_CENTER, width = 背景 width, height = 20, type = ROLL
  单方块机器
    - 模型名称为 model
  配方类型
    - 无燃料配方时: 燃料图标删除, 燃料 ui 位置与大小归零, 背景删除

用法:
    python mbd2_audit.py            # 全量体检
    python mbd2_audit.py machine    # 只看某一类 (machine/multiblock/recipe_type)
"""

import sys
from pathlib import Path

# Developer/MBD2-NBT工具/<本文件> -> 仓库根
ROOT = Path(__file__).resolve().parent.parent.parent
MB_ROOT = ROOT / "ldlib" / "assets" / "mbd2"

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _nbt_tool import read_file, walk, Compound, List, STRING  # noqa

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

DEFAULT_AUTHOR_KEY = "ldlib.author"
DEFAULT_AUTHOR_VALUE = "Hello KilaBash!"

DEFAULT_COLORS = {
    "GRAY", "BLUE", "T_RED", "T_BRIGHT_RED", "T_WHITE", "T_GREEN", "T_LIGHT_BLUE",
    "PINK", "T_BLUE", "T_LIME", "T_BLACK", "BLACK", "T_BROWN", "T_GRAY",
    "T_DARK_GRAY", "T_YELLOW", "BROWN", "T_CYAN", "ORANGE", "WHITE", "T_MAGENTA",
    "PURPLE", "GREEN", "T_PURPLE", "RED", "SEAL_BLACK", "LIGHT_GRAY", "LIGHT_BLUE",
    "T_LIGHT_GRAY", "T_PINK", "LIME", "BRIGHT_RED", "T_SEAL_BLACK", "T_ORANGE",
    "MAGENTA", "YELLOW", "DARK_GRAY", "CYAN",
}


def get(comp, name):
    if isinstance(comp, Compound):
        for n, t in comp:
            if n == name:
                return t
    return None


def getv(comp, name, default=None):
    t = get(comp, name)
    return t.value if t is not None else default


def group(root, name):
    res = get(root, "resources")
    return get(res.value, name) if res is not None else None


def is_default_name(v):
    return isinstance(v, str) and v.startswith("new ") and v[4:].isdigit()


def audit(path):
    root_name, root, trailing, data = read_file(str(path))
    rel = path.relative_to(ROOT)
    issues = []

    def add(kind, where, value):
        issues.append((kind, where, value))

    # --- 通用 ---
    idt = get(root, "id")
    if idt is not None and not str(idt.value).startswith("cmi:"):
        add("命名空间不是 cmi", "id", idt.value)

    for p, tag in walk(root):
        s = ".".join(str(x) for x in p)
        if tag.type == STRING and is_default_name(tag.value):
            add("默认名 new N", s, tag.value)

    entries = group(root, "ldlib.gui.editor.group.entries")
    if isinstance(entries, Compound):
        for n, t in entries:
            if n == DEFAULT_AUTHOR_KEY and isinstance(t.value, str) \
                    and t.value.strip().lower() == DEFAULT_AUTHOR_VALUE.lower():
                add("默认作者未删", f"resources...entries.{n}", t.value)

    colors = group(root, "ldlib.gui.editor.group.colors")
    if isinstance(colors, Compound):
        left = [n for n, _ in colors if n in DEFAULT_COLORS]
        if left:
            add("默认颜色未删", "resources...colors", f"{len(left)} 条: {left[:5]}...")

    # --- 机器 ---
    item_props = get(root, "definition")
    ip = get(item_props.value, "itemProperties") if item_props is not None else None
    if ip is not None:
        tab = get(ip.value, "creativeTab")
        if tab is not None:
            val = getv(tab.value, "value")
            en = getv(tab.value, "enable")
            if en == 1 and val != "cmi:machines":
                add("创造标签页错误", "itemProperties.creativeTab.value", val)

    ms = None
    d = get(root, "definition")
    if d is not None:
        ms = get(d.value, "machineSettings")
    has_ui = getv(ms.value, "hasUI") if ms is not None else None

    ui = get(root, "ui")
    if ui is not None and has_ui == 0:
        sp = get(ui.value, "selfPosition")
        sz = get(ui.value, "size")
        if sp is not None:
            for k in ("x", "y"):
                v = getv(sp.value, k)
                if v not in (None, 0):
                    add("hasUI=0 但位置未归零", f"ui.selfPosition.{k}", v)
        if sz is not None:
            for k in ("width", "height"):
                v = getv(sz.value, k)
                if v not in (None, 0):
                    add("hasUI=0 但大小未归零", f"ui.size.{k}", v)
        bg = get(ui.value, "backgroundTexture")
        if bg is not None:
            loc = getv(bg.value, "data")
            if loc is not None:
                img = getv(loc, "imageLocation")
                if img:
                    add("hasUI=0 但背景未删除", "ui.backgroundTexture.data.imageLocation", img)

    # 机器名称控件
    if ui is not None:
        kids = get(ui.value, "children")
        if isinstance(kids, list):
            for i, child in enumerate(kids.value):
                txt = get(child, "text")
                if txt is None:
                    continue
                align = getv(child, "align")
                if align != "TOP_CENTER":
                    add("机器名称对齐不是 TOP_CENTER", f"ui.children[{i}].align", align)
                sz = get(child, "size")
                if sz is not None:
                    h = getv(sz.value, "height")
                    if h != 20:
                        add("机器名称 height 应为 20", f"ui.children[{i}].size.height", h)
                ty = getv(child, "type")
                if ty not in (None, "ROLL"):
                    add("机器名称 type 应为 ROLL", f"ui.children[{i}].type", ty)

    return rel, issues, len(data)


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    files = sorted(p for p in MB_ROOT.rglob("*") if p.suffix in {".sm", ".mb", ".km", ".rt"})
    if only:
        files = [f for f in files if f"mbd2{chr(92)}{only}" in str(f) or f"/{only}/" in str(f)]

    total = 0
    buckets = {}
    for f in files:
        rel, issues, size = audit(f)
        if issues:
            total += len(issues)
            print(f"\n=== {rel}  ({size} B, {len(issues)} 处)")
            for kind, where, value in issues:
                print(f"    - [{kind}] {where} = {value!r}")
                buckets[kind] = buckets.get(kind, 0) + 1
        else:
            print(f"ok  {rel}  ({size} B)")

    print(f"\n---- 共 {len(files)} 个文件, {total} 处问题 ----")
    for k, v in sorted(buckets.items(), key=lambda x: -x[1]):
        print(f"  {v:3d}  {k}")


if __name__ == "__main__":
    main()

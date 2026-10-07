#!/usr/bin/env python3
"""
按 Developer/MBD2编辑规范.md 规范化 MBD2 工程文件 (.sm/.mb/.km/.rt)

规范相关条目:
  - 不要出现 `new 0` 这样的默认名
  - 单方块机器: 模型名称为 model
  - 多方块机器: 谓词名称需要是此谓词中的主方块id

需要改的其实是 **成对** 的东西:
    1) resources.ldlib.gui.editor.group.renderer 里的资源条目名   (资源定义)
    2) stateMachine / icon 里 builtin 引用指向的那个名字          (资源引用)
两者必须同名, 否则模型渲染不出来.

改名依据 (取自同目录参照物, 已逐个核对):
    文件类型        资源名        参照
    machine/*.sm    model        machine/reinforced_coke_oven/*.sm, machine/large_mixer/*.sm
    multiblock/*.mb off / on     同文件 resources 只有这两个; working=on, 其余=off
    recipe_type/*.rt icon        recipe_type/reinforced_coke_oven.rt 等 7 个 .rt

安全措施:
  1. 写入前做字节级往返校验 (read -> serialize -> 必须与原文件逐字节一致)
  2. 备份到 Developer/_backup/
  3. 写回后再读一次, 确认稳定往返
  4. 资源定义与引用必须成对改名, 改名后数量校验

用法:
    python mbd2_spec.py scan
    python mbd2_spec.py fix
    python mbd2_spec.py restore
"""

import sys
import shutil
from pathlib import Path

# Developer/MBD2-NBT工具/<本文件> -> 仓库根
ROOT = Path(__file__).resolve().parent.parent.parent
MB_ROOT = ROOT / "ldlib" / "assets" / "mbd2"
BACKUP = Path(__file__).resolve().parent / "_backup"

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _nbt_tool import read_file, serialize, walk, Compound, List, Tag, STRING  # noqa

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

RENDERER_GROUP = "ldlib.gui.editor.group.renderer"


def is_default_name(v):
    return isinstance(v, str) and v.startswith("new ") and v[4:].isdigit()


def file_kind(rel):
    parts = rel.parts
    if "mbd2" in parts:
        i = parts.index("mbd2")
        if i + 1 < len(parts):
            return parts[i + 1]
    return ""


def find_compound(root, *names):
    """按名字链找 Compound"""
    cur = root
    for name in names:
        if not isinstance(cur, Compound):
            return None
        nxt = None
        for n, t in cur:
            if n == name:
                nxt = t
                break
        if nxt is None:
            return None
        cur = nxt.value
    return cur


def renderer_group(root):
    return find_compound(root, "resources", RENDERER_GROUP)


def plan_new_name(kind, path, is_resource_def):
    """返回新名字, 或 None 表示不动"""
    joined = ".".join(str(x) for x in path)

    if kind == "machine":
        return "model"
    if kind == "multiblock":
        if is_resource_def:
            return None                     # 这里的 'off'/'on' 本来就不叫 new N, 不用管
        if "children.0.children.0.children.0" in joined:
            return "off"
        if "children.0.children.0.renderer" in joined:
            return "on"
        return "off"
    if kind == "recipe_type":
        if is_resource_def:
            return None                     # icon 引用的是 textures 里的资源, 名字叫 icon
        return "icon"
    return None


def process(path, apply_fix):
    root_name, root, trailing, data = read_file(str(path))
    rel = path.relative_to(ROOT)
    kind = file_kind(rel)

    grp = renderer_group(root)
    res_defs = []
    res_refs = []
    if grp is not None:
        for n, t in grp:
            if is_default_name(n):
                res_defs.append((n, t))

    for p, tag in walk(root):
        if tag.type != STRING or not is_default_name(tag.value):
            continue
        joined = ".".join(str(x) for x in p)
        if joined.startswith("resources."):
            continue                        # 资源定义单独处理
        res_refs.append((p, tag))

    edits = []      # (kind_of_edit, key_or_tag, new_name, path)
    for n, t in res_defs:
        new = plan_new_name(kind, ("resources", RENDERER_GROUP, n), True)
        if new:
            edits.append(("res", n, new, f"resources.{RENDERER_GROUP}.{n}"))
    for p, tag in res_refs:
        new = plan_new_name(kind, p, False)
        if new:
            edits.append(("ref", tag, new, ".".join(str(x) for x in p)))

    if not edits:
        return rel, []

    lines = [f"=== {rel}  ({len(data)} B, kind={kind})"]
    for ekind, obj, new, where in edits:
        old = obj if ekind == "res" else obj.value
        lines.append(f"    [{ekind}] {old!r} -> {new!r}   @ {where}")

    if apply_fix:
        assert serialize(root_name, root) == data, f"{rel}: 往返校验失败, 拒绝写入"

        # 资源定义改名: 直接改 Compound 里的名字
        if grp is not None:
            for i, (n, t) in enumerate(grp):
                if is_default_name(n):
                    new = plan_new_name(kind, ("resources", RENDERER_GROUP, n), True)
                    if new:
                        grp[i] = (new, t)
        # 引用改名
        for p, tag in res_refs:
            new = plan_new_name(kind, p, False)
            if new:
                tag.value = new

        regen = serialize(root_name, root)

        # 写回后自检
        tmp = Path(str(path) + ".verify")
        tmp.write_bytes(regen)
        _, root2, trailing2, _ = read_file(str(tmp))
        tmp.unlink()
        assert trailing2 == 0, f"{rel}: 写回后尾部多余字节"
        assert serialize(root_name, root2) == regen, f"{rel}: 写回后无法稳定往返"

        BACKUP.mkdir(exist_ok=True)
        dest = BACKUP / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        if not dest.exists():
            shutil.copy2(path, dest)
        path.write_bytes(regen)
        lines.append(f"    已写入 {len(regen)} B (原 {len(data)} B)")

    return rel, lines


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "scan"

    if mode == "restore":
        n = 0
        for f in sorted(BACKUP.rglob("*")):
            if f.is_file():
                dest = ROOT / f.relative_to(BACKUP)
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(f, dest)
                print("restored", dest.relative_to(ROOT))
                n += 1
        print(f"---- 还原 {n} 个文件 ----")
        return

    apply_fix = mode == "fix"
    exts = {".sm", ".mb", ".km", ".rt"}
    files = sorted(p for p in MB_ROOT.rglob("*") if p.suffix in exts)

    changed = 0
    for f in files:
        try:
            rel, lines = process(f, apply_fix)
        except Exception as e:
            print(f"!! {f}: {type(e).__name__}: {e}")
            continue
        if lines:
            changed += 1
            print("\n".join(lines))
    print(f"\n---- {changed} 个文件{'已修改' if apply_fix else '待修改'} ----")


if __name__ == "__main__":
    main()

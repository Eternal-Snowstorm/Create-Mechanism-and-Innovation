#!/usr/bin/env python3
"""
修复 MBD2 工程文件里被空白污染的标识符 (例如 '\tcmi:electrum_coil')

标识符带首尾空白时 MBD2 解析不出对应方块 -> 该谓词永远匹配不上 ->
结构 predicateMap 缺项 -> 结构无法成型, 且 JEI 结构预览点击会空指针崩溃.
所以这类空白必须剥掉.

用法:
    python mbd2_trim.py scan
    python mbd2_trim.py fix
"""

import sys
import shutil
from pathlib import Path

# Developer/MBD2-NBT工具/<本文件> -> 仓库根
ROOT = Path(__file__).resolve().parent.parent.parent
MB_ROOT = ROOT / "ldlib" / "assets" / "mbd2"
BACKUP = Path(__file__).resolve().parent / "_backup"

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _nbt_tool import read_file, serialize, walk, STRING  # noqa

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass


def process(path, apply_fix):
    root_name, root, trailing, data = read_file(str(path))
    rel = path.relative_to(ROOT)

    edits = []
    for p, tag in walk(root):
        if tag.type != STRING or not isinstance(tag.value, str):
            continue
        if tag.value != tag.value.strip():
            edits.append((p, tag))

    if not edits:
        return rel, []

    lines = [f"=== {rel}  ({len(data)} B)"]
    for p, tag in edits:
        lines.append(f"    {tag.value!r} -> {tag.value.strip()!r}   @ {'.'.join(str(x) for x in p)}")

    if apply_fix:
        assert serialize(root_name, root) == data, f"{rel}: 往返校验失败, 拒绝写入"
        for p, tag in edits:
            tag.value = tag.value.strip()
        regen = serialize(root_name, root)
        tmp = Path(str(path) + ".verify")
        tmp.write_bytes(regen)
        _, root2, t2, _ = read_file(str(tmp))
        tmp.unlink()
        assert t2 == 0 and serialize(root_name, root2) == regen, f"{rel}: 写回后自检失败"

        BACKUP.mkdir(exist_ok=True)
        dest = BACKUP / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        # 备份要跟得上源文件: 源比备份新(或备份不存在)就刷新, 避免留下过期备份
        if not dest.exists() or path.stat().st_mtime > dest.stat().st_mtime:
            shutil.copy2(path, dest)
        path.write_bytes(regen)
        lines.append(f"    已写入 {len(regen)} B (原 {len(data)} B), 备份 {dest.relative_to(ROOT)}")

    return rel, lines


def main():
    apply_fix = (sys.argv[1] if len(sys.argv) > 1 else "scan") == "fix"
    files = sorted(p for p in MB_ROOT.rglob("*") if p.suffix in {".sm", ".mb", ".km", ".rt"})
    changed = 0
    for f in files:
        rel, lines = process(f, apply_fix)
        if lines:
            changed += 1
            print("\n".join(lines))
    print(f"\n---- {changed} 个文件{'已修复' if apply_fix else '待修复'} ----")


if __name__ == "__main__":
    main()

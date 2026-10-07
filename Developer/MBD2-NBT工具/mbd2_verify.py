#!/usr/bin/env python3
"""往返校验: 读取 -> 重新序列化 -> 必须与原文件字节完全一致, 否则不许改"""

import sys
from pathlib import Path

# Developer/MBD2-NBT工具/<本文件> -> 仓库根
ROOT = Path(__file__).resolve().parent.parent.parent
MB_ROOT = ROOT / "ldlib" / "assets" / "mbd2"

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _nbt_tool import read_file, serialize  # noqa

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

exts = {".sm", ".mb", ".km", ".rt"}
ok = bad = 0
for f in sorted(p for p in MB_ROOT.rglob("*") if p.suffix in exts):
    try:
        root_name, root, trailing, data = read_file(str(f))
        regen = serialize(root_name, root)
    except Exception as e:
        print(f"ERROR {f.relative_to(MB_ROOT)}: {type(e).__name__}: {e}")
        bad += 1
        continue
    same = regen == data and trailing == 0
    if same:
        ok += 1
    else:
        bad += 1
        n = min(len(regen), len(data))
        i = next((k for k in range(n) if regen[k] != data[k]), n)
        print(f"DIFF  {f.relative_to(MB_ROOT)}: {len(data)}B -> {len(regen)}B, 首处差异 @ {i}")
        print(f"      原: {data[max(0, i - 8):i + 16].hex(' ')}")
        print(f"      新: {regen[max(0, i - 8):i + 16].hex(' ')}")

print(f"\n---- 字节一致 {ok} 个, 有问题 {bad} 个 ----")

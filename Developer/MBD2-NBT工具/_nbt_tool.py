#!/usr/bin/env python3
"""
MBD2 工程文件 (.sm/.mb/.km/.rt) 读写工具
这些文件本质是 *未压缩* 的 NBT, 与 Minecraft 的 NBT 格式一致.

关键设计: List 必须记住元素类型. NBT 的 List 头里带一个元素类型字节,
空 List 的类型不能靠猜 —— 猜错会写出非法 NBT 直接炸游戏.
所以这里把 List 表示成 (item_type, [items]).

用法 (供其它脚本 import):
    root_name, root, trailing, data = read_file(path)
    w = Writer(); w.u1(10); w.string(root_name); write_payload(w, 10, root)
    path.write_bytes(bytes(w.buf))
"""

import sys
import struct

END = 0
BYTE = 1
SHORT = 2
INT = 3
LONG = 4
FLOAT = 5
DOUBLE = 6
BYTE_ARRAY = 7
STRING = 8
LIST = 9
COMPOUND = 10
INT_ARRAY = 11
LONG_ARRAY = 12

TAG_NAMES = {
    0: "End", 1: "Byte", 2: "Short", 3: "Int", 4: "Long", 5: "Float", 6: "Double",
    7: "ByteArray", 8: "String", 9: "List", 10: "Compound", 11: "IntArray", 12: "LongArray",
}


class Tag:
    __slots__ = ("type", "value")

    def __init__(self, type_, value):
        self.type = type_
        self.value = value

    def __repr__(self):
        return f"Tag({TAG_NAMES.get(self.type, self.type)}, {self.value!r})"


class List:
    """NBT List: 记住元素类型 (空表也不会写坏)"""
    __slots__ = ("item_type", "items")

    def __init__(self, item_type, items):
        self.item_type = item_type
        self.items = items

    def __iter__(self):
        return iter(self.items)

    def __len__(self):
        return len(self.items)

    def __getitem__(self, i):
        return self.items[i]

    def __repr__(self):
        return f"List<{TAG_NAMES.get(self.item_type, self.item_type)}>({self.items!r})"


class Compound(list):
    """NBT Compound: [(name, Tag), ...], 保留顺序"""
    pass


class Reader:
    def __init__(self, data):
        self.data = data
        self.pos = 0

    def read(self, n):
        if self.pos + n > len(self.data):
            raise EOFError(f"want {n} bytes at {self.pos}, only {len(self.data) - self.pos} left")
        out = self.data[self.pos:self.pos + n]
        self.pos += n
        return out

    def u1(self):
        return self.read(1)[0]

    def i1(self):
        return struct.unpack(">b", self.read(1))[0]

    def u2(self):
        return struct.unpack(">H", self.read(2))[0]

    def i2(self):
        return struct.unpack(">h", self.read(2))[0]

    def i4(self):
        return struct.unpack(">i", self.read(4))[0]

    def i8(self):
        return struct.unpack(">q", self.read(8))[0]

    def f4(self):
        return struct.unpack(">f", self.read(4))[0]

    def f8(self):
        return struct.unpack(">d", self.read(8))[0]

    def string(self):
        n = self.u2()
        raw = self.read(n)
        return raw.decode("utf-8", errors="replace")


def read_payload(r, t):
    if t == BYTE:
        return r.i1()
    if t == SHORT:
        return r.i2()
    if t == INT:
        return r.i4()
    if t == LONG:
        return r.i8()
    if t == FLOAT:
        return r.f4()
    if t == DOUBLE:
        return r.f8()
    if t == BYTE_ARRAY:
        return list(r.read(r.i4()))
    if t == STRING:
        return r.string()
    if t == LIST:
        item_type = r.u1()
        n = r.i4()
        return List(item_type, [read_payload(r, item_type) for _ in range(n)])
    if t == COMPOUND:
        out = Compound()
        while True:
            child_type = r.u1()
            if child_type == END:
                return out
            name = r.string()
            out.append((name, Tag(child_type, read_payload(r, child_type))))
    if t == INT_ARRAY:
        return [r.i4() for _ in range(r.i4())]
    if t == LONG_ARRAY:
        return [r.i8() for _ in range(r.i4())]
    raise ValueError(f"unknown tag type {t} at {r.pos}")


def read_file(path):
    with open(path, "rb") as f:
        data = f.read()
    r = Reader(data)
    root_type = r.u1()
    if root_type != COMPOUND:
        raise ValueError(f"root tag is {TAG_NAMES.get(root_type, root_type)}, expected Compound")
    root_name = r.string()
    root = read_payload(r, COMPOUND)
    return root_name, root, len(data) - r.pos, data


class Writer:
    def __init__(self):
        self.buf = bytearray()

    def u1(self, v):
        self.buf.append(v & 0xFF)

    def i1(self, v):
        self.buf += struct.pack(">b", v)

    def i2(self, v):
        self.buf += struct.pack(">h", v)

    def i4(self, v):
        self.buf += struct.pack(">i", v)

    def i8(self, v):
        self.buf += struct.pack(">q", v)

    def f4(self, v):
        self.buf += struct.pack(">f", v)

    def f8(self, v):
        self.buf += struct.pack(">d", v)

    def string(self, s):
        if s is None:
            s = ""
        raw = s.encode("utf-8")
        self.buf += struct.pack(">H", len(raw))
        self.buf += raw


def write_payload(w, t, v):
    if t == BYTE:
        w.i1(v)
    elif t == SHORT:
        w.i2(v)
    elif t == INT:
        w.i4(v)
    elif t == LONG:
        w.i8(v)
    elif t == FLOAT:
        w.f4(v)
    elif t == DOUBLE:
        w.f8(v)
    elif t == BYTE_ARRAY:
        w.i4(len(v))
        w.buf += bytes(v)
    elif t == STRING:
        w.string(v)
    elif t == LIST:
        # v 必须是 List, 带元素类型
        item_type = v.item_type
        w.u1(item_type)
        w.i4(len(v.items))
        for item in v.items:
            write_payload(w, item_type, item)
    elif t == COMPOUND:
        for name, tag in v:
            if tag.type == END:
                raise ValueError(f"compound member {name!r} has End type")
            w.u1(tag.type)
            w.string(name)
            write_payload(w, tag.type, tag.value)
        w.u1(END)
    elif t == INT_ARRAY:
        w.i4(len(v))
        for item in v:
            w.i4(item)
    elif t == LONG_ARRAY:
        w.i4(len(v))
        for item in v:
            w.i8(item)
    else:
        raise ValueError(f"cannot write tag type {t}")


def serialize(root_name, root):
    w = Writer()
    w.u1(COMPOUND)
    w.string(root_name)
    write_payload(w, COMPOUND, root)
    return bytes(w.buf)


# ---------------------------------------------------------------- helpers

def get(comp, name, default=None):
    """Compound 里按名字取 Tag"""
    if isinstance(comp, Compound):
        for n, t in comp:
            if n == name:
                return t
    return default


def get_value(comp, name, default=None):
    t = get(comp, name)
    return t.value if t is not None else default


def walk(node, path=()):
    """深度遍历, 产出 (path, tag). List 用 (item_type, items) 表示, Compound 为 [(name,Tag)]"""
    if isinstance(node, Compound):
        for name, tag in node:
            p = path + (name,)
            yield p, tag
            yield from walk(tag.value, p)
    elif isinstance(node, List):
        for i, item in enumerate(node.items):
            yield from walk(item, path + (i,))


def dump(node, out, indent=0):
    pad = "  " * indent
    if isinstance(node, Compound):
        for name, tag in node:
            if tag.type == COMPOUND:
                out.append(f"{pad}{name}: {{")
                dump(tag.value, out, indent + 1)
                out.append(f"{pad}}}")
            elif tag.type == LIST:
                lst = tag.value
                out.append(f"{pad}{name}: [ <{TAG_NAMES.get(lst.item_type)}> x{len(lst)}")
                for item in lst.items:
                    if isinstance(item, Compound):
                        out.append(f"{pad}  {{")
                        dump(item, out, indent + 2)
                        out.append(f"{pad}  }}")
                    else:
                        out.append(f"{pad}  {item!r}")
                out.append(f"{pad}]")
            else:
                out.append(f"{pad}{name} = {tag.value!r}  <{TAG_NAMES[tag.type]}>")


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        return
    cmd, path = sys.argv[1], sys.argv[2]
    if cmd == "dump":
        root_name, root, trailing, data = read_file(path)
        out = [f"# {path}", f"# root={root_name!r} size={len(data)}B trailing={trailing}B", ""]
        dump(root, out)
        text = "\n".join(out)
        if len(sys.argv) > 3:
            open(sys.argv[3], "w", encoding="utf-8").write(text)
            print("->", sys.argv[3])
        else:
            print(text)
    elif cmd == "verify":
        root_name, root, trailing, data = read_file(path)
        regen = serialize(root_name, root)
        print(f"{path}")
        print(f"  size {len(data)}B -> {len(regen)}B, 字节一致 = {regen == data}")
    else:
        print(__doc__)


if __name__ == "__main__":
    main()

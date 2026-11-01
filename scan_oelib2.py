import zipfile, os, io

ROOT = r"D:\.minecraft\instances\CMI-Dev\.minecraft\mods"
NEEDLES = {
    "oelib_input": b"cc/sighs/oelib/event/events/InputEvent",
    "inner_Key": b"InputEvent$Key",
}

def classify(path, data):
    tags = []
    for k, n in NEEDLES.items():
        if n in data:
            tags.append(k)
    return tags

def scan_zip(z, prefix, depth=0):
    for info in z.infolist():
        n = info.filename
        if n.endswith(".class"):
            try:
                data = z.read(info)
            except Exception:
                continue
            tags = classify(prefix + n, data)
            if tags:
                print("HIT", tags, prefix + n)
        elif n.endswith(".jar") and depth < 3:
            try:
                with zipfile.ZipFile(io.BytesIO(z.read(info))) as zz:
                    scan_zip(zz, prefix + n + "!/", depth + 1)
            except Exception:
                pass

for name in sorted(f for f in os.listdir(ROOT) if f.lower().endswith(".jar")):
    try:
        with zipfile.ZipFile(os.path.join(ROOT, name)) as z:
            scan_zip(z, name)
    except Exception as e:
        print("ERR", name, e)
print("DONE")

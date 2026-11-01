import zipfile, os, io, sys

ROOT = r"D:\.minecraft\instances\CMI-Dev\.minecraft\mods"
NEEDLE = b"InputEvent"
hits = []          # (jar, entry) referencing InputEvent
oelib_pkg = {}     # jar -> count of cc/sighs/oelib/* classes shipped

def scan_zip(z, prefix, depth=0):
    for info in z.infolist():
        n = info.filename
        if n.endswith(".class"):
            try:
                data = z.read(info)
            except Exception:
                continue
            if NEEDLE in data:
                hits.append((prefix + n, "ref"))
            if "cc/sighs/oelib/" in n:
                oelib_pkg[prefix.split("!/")[0]] = oelib_pkg.get(prefix.split("!/")[0], 0) + 1
        elif n.endswith(".jar") and depth < 3:
            try:
                inner = io.BytesIO(z.read(info))
                with zipfile.ZipFile(inner) as zz:
                    scan_zip(zz, prefix + n + "!/", depth + 1)
            except Exception:
                pass

names = sorted(f for f in os.listdir(ROOT) if f.lower().endswith(".jar"))
for name in names:
    p = os.path.join(ROOT, name)
    try:
        with zipfile.ZipFile(p) as z:
            scan_zip(z, name)
    except Exception as e:
        print("ERR", name, e)

print("=== jars referencing InputEvent ===")
for h in hits:
    print(h[0])
print("total hits:", len(hits))
print()
print("=== jars shipping cc/sighs/oelib classes ===")
for k, v in sorted(oelib_pkg.items(), key=lambda x: -x[1]):
    print(f"{v:5d}  {k}")

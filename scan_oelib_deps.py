import zipfile, os, io, re

ROOT = r"D:\.minecraft\instances\CMI-Dev\.minecraft\mods"

def read_toml(z, prefix, depth=0, out=None):
    if out is None:
        out = []
    for info in z.infolist():
        n = info.filename
        if n == "META-INF/mods.toml":
            try:
                t = z.read(info).decode("utf-8", "replace")
            except Exception:
                continue
            if "oelib" in t:
                out.append((prefix, t))
        elif n.endswith(".jar") and depth < 2:
            try:
                with zipfile.ZipFile(io.BytesIO(z.read(info))) as zz:
                    read_toml(zz, prefix + n + "!/", depth + 1, out)
            except Exception:
                pass
    return out

for name in sorted(f for f in os.listdir(ROOT) if f.lower().endswith(".jar")):
    try:
        with zipfile.ZipFile(os.path.join(ROOT, name)) as z:
            for prefix, t in read_toml(z, name):
                # find dependency blocks mentioning oelib
                if re.search(r'modId\s*=\s*"oelib', t):
                    modid = re.findall(r'modId\s*=\s*"([^"]+)"', t)
                    ranges = re.findall(r'versionRange\s*=\s*"([^"]+)"', t)
                    print(prefix, "| modIds:", modid[:3], "| ranges:", ranges)
    except Exception as e:
        print("ERR", name, e)
print("DONE")

import glob
import io
import re

MINE = r'kubejs/startup_scripts/register/mbd2/MultiTypeDriller.js'
s = io.open(MINE, encoding='utf-8').read()


def strip_comments_strings(txt):
    out = []
    i, n = 0, len(txt)
    while i < n:
        c = txt[i]
        if c == '/' and i + 1 < n and txt[i + 1] == '/':
            while i < n and txt[i] != '\n':
                i += 1
            continue
        if c == '/' and i + 1 < n and txt[i + 1] == '*':
            i += 2
            while i + 1 < n and not (txt[i] == '*' and txt[i + 1] == '/'):
                i += 1
            i += 2
            continue
        if c in '"\'':
            q = c
            i += 1
            while i < n and txt[i] != q:
                if txt[i] == '\\':
                    i += 1
                i += 1
            i += 1
            continue
        out.append(c)
        i += 1
    return ''.join(out)


code = strip_comments_strings(s)

# all identifiers declared in my file (top level or not)
mine_decls = set(re.findall(r'\b(?:let|const|var)\s+([A-Za-z_$][\w$]*)', code))
mine_fns = set(re.findall(r'\bfunction\s+([A-Za-z_$][\w$]*)', code))
mine = mine_decls | mine_fns
print('my names (%d):' % len(mine))
print('  ', sorted(mine))
print()

# gather names from every OTHER kubejs script
others = {}
for f in glob.glob(r'kubejs/**/*.js', recursive=True):
    if f.replace('/', '\\').endswith('MultiTypeDriller.js'):
        continue
    try:
        t = io.open(f, encoding='utf-8').read()
    except Exception:
        continue
    c = strip_comments_strings(t)
    names = set(re.findall(r'\b(?:let|const|var)\s+([A-Za-z_$][\w$]*)', c))
    names |= set(re.findall(r'\bfunction\s+([A-Za-z_$][\w$]*)', c))
    for nm in names:
        others.setdefault(nm, []).append(f)

collide = sorted(nm for nm in mine if nm in others)
print('COLLISIONS with other scripts (%d):' % len(collide))
for nm in collide:
    print('  %-24s <- %s' % (nm, others[nm][0]))
if not collide:
    print('   none')

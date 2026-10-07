import io
import re

p = r'kubejs/startup_scripts/register/mbd2/MultiTypeDriller.js'
s = io.open(p, encoding='utf-8').read()


def strip(txt):
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
        out.append((c, txt[:i].count('\n') + 1))
        i += 1
    return out


print('=== top-level (column 0) declarations ===')
for line in s.split('\n'):
    m = re.match(r'^(let|const|var|function)\s+([A-Za-z_$][\w$]*)', line)
    if m:
        print('   %-8s %s' % (m.group(1), m.group(2)))

print()
print('=== bare identifiers named aisle/builder/blocks/... at top level ===')
for line in s.split('\n'):
    if re.match(r'^(let|const|var)\s+(aisle|builder|blocks|block|array|row|column)\b', line):
        print('   RISK:', line[:90])

# balance
out = strip(s)
stack = []
pr = {')': '(', ']': '[', '}': '{'}
v = 'balanced'
for c, ln in out:
    if c in '([{':
        stack.append((c, ln))
    elif c in ')]}':
        if not stack or stack[-1][0] != pr[c]:
            v = 'MISMATCH %r line %d' % (c, ln)
            break
        stack.pop()
if stack and v == 'balanced':
    v = 'UNCLOSED %s' % stack
print()
print('balance:', v, '| lines:', s.count('\n') + 1)
print()
print('local var names used in the aisle builder:')
for line in s.split('\n'):
    if 'drillerAisleRows' in line or 'drillerRow' in line or 'drillerX' in line \
       or 'drillerY' in line or 'drillerZ' in line:
        print('   ', line.strip()[:95])

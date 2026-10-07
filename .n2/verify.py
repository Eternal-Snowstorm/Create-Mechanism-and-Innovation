import io
import re

p = r'kubejs/startup_scripts/register/mbd2/MultiTypeDriller.js'
s = io.open(p, encoding='utf-8').read()

out = []
i, n = 0, len(s)
while i < n:
    c = s[i]
    if c == '/' and i + 1 < n and s[i + 1] == '/':
        while i < n and s[i] != '\n':
            i += 1
        continue
    if c == '/' and i + 1 < n and s[i + 1] == '*':
        i += 2
        while i + 1 < n and not (s[i] == '*' and s[i + 1] == '/'):
            i += 1
        i += 2
        continue
    if c in '"\'':
        q = c
        i += 1
        while i < n and s[i] != q:
            if s[i] == '\\':
                i += 1
            i += 1
        i += 1
        continue
    out.append(c)
    i += 1
code = ''.join(out)

stack = []
pr = {')': '(', ']': '[', '}': '{'}
v = 'balanced'
for c in code:
    if c in '([{':
        stack.append(c)
    elif c in ')]}':
        if not stack or stack[-1] != pr[c]:
            v = 'MISMATCH %r' % c
            break
        stack.pop()
if stack and v == 'balanced':
    v = 'UNCLOSED %s' % stack
print('balance:', v, '| lines:', s.count('\n') + 1)

# .class usage on a Java.loadClass result is the bug pattern
bad = re.findall(r'(\$[A-Za-z]\w*)\.class', code)
print('.class on loadClass vars (must be empty):', sorted(set(bad)))

defined_v = set(re.findall(r'(?:let|const)\s+(\$[A-Za-z]\w*)', s))
used_v = set(re.findall(r'(?<![\w$])(\$[A-Za-z]\w*)', s))
allowed = {'$Builder_', '$Gas', '$MBDRegistryKubeEvent_', '$ProxyCapability'}
print('undefined $vars:', sorted(used_v - defined_v - allowed))

print()
for kw in ['GECKOLIB_RENDERER_CLASS', 'RESOURCE_LOCATION_CLASS',
           'Class.forName', 'getConstructor', 'newInstance', 'renderer(']:
    print('  %-28s %d' % (kw, s.count(kw)))
print()
print('=== the reflection block ===')
lines = s.split('\n')
start = next(i for i, l in enumerate(lines) if 'GECKOLIB_RENDERER_CLASS =' in l)
for i in range(start - 3, start + 20):
    if 0 <= i < len(lines):
        print('%4d %s' % (i + 1, lines[i][:100]))

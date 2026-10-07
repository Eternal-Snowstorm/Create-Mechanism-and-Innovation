import io
import re

p = r'kubejs/startup_scripts/register/mbd2/MultiTypeDriller.js'
s = io.open(p, encoding='utf-8').read()

old = '''const DRILLER_SIZE = DRILLER_LAYERS[0].length
const DRILLER_AISLES = []
for (let m = 0; m < DRILLER_SIZE; m++) {
	const aisle = []
	for (let k = 0; k < DRILLER_LAYERS.length; k++) {
		let row = ""
		for (let t = 0; t < DRILLER_SIZE; t++) {
			row += DRILLER_LAYERS[k][m].charAt(t)
		}
		aisle.push(row)
	}
	DRILLER_AISLES.push(aisle)
}'''

new = '''const DRILLER_SIZE = DRILLER_LAYERS[0].length
// 注意: 这里的循环变量不要叫 aisle —— KubeJS 把所有脚本放在同一顶层作用域,
// 而 "aisle" 这个名字已经被别的绑定占用, 用了会直接报
//   TypeError: redeclaration of var aisle
// 所以统一加 driller 前缀, 只在本文件内使用。
const DRILLER_AISLES = []
for (let drillerX = 0; drillerX < DRILLER_SIZE; drillerX++) {
	const drillerAisleRows = []
	for (let drillerY = 0; drillerY < DRILLER_LAYERS.length; drillerY++) {
		let drillerRow = ""
		for (let drillerZ = 0; drillerZ < DRILLER_SIZE; drillerZ++) {
			drillerRow += DRILLER_LAYERS[drillerY][drillerX].charAt(drillerZ)
		}
		drillerAisleRows.push(drillerRow)
	}
	DRILLER_AISLES.push(drillerAisleRows)
}'''

assert old in s, 'build block not found'
s = s.replace(old, new, 1)
io.open(p, 'w', encoding='utf-8').write(s)

print('renamed loop vars')
print('remaining bare "aisle" identifiers (should be only .aisle( calls):')
for i, l in enumerate(s.split('\n'), 1):
    if re.search(r'(?<![\w.$])aisle(?![\w(])', l):
        print('   %4d %s' % (i, l.strip()[:100]))

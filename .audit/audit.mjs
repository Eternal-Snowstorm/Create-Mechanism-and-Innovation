import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = 'D:/software/Prism Launcher/instances/CMI-beta-dev-vers/.minecraft';

// ---------------- zip reader ----------------
function readZipEntries(file) {
  const fd = fs.openSync(file, 'r');
  const size = fs.fstatSync(fd).size;
  const maxBack = Math.min(size, 65557);
  const buf = Buffer.alloc(maxBack);
  fs.readSync(fd, buf, 0, maxBack, size - maxBack);
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) { fs.closeSync(fd); return null; }
  const numEntries = buf.readUInt16LE(eocd + 10);
  const cdSize = buf.readUInt32LE(eocd + 12);
  const cdOffset = buf.readUInt32LE(eocd + 16);
  const cd = Buffer.alloc(cdSize);
  fs.readSync(fd, cd, 0, cdSize, cdOffset);
  fs.closeSync(fd);
  const entries = [];
  let p = 0;
  for (let i = 0; i < numEntries; i++) {
    if (p + 46 > cd.length || cd.readUInt32LE(p) !== 0x02014b50) break;
    const method = cd.readUInt16LE(p + 10);
    const compSize = cd.readUInt32LE(p + 20);
    const nameLen = cd.readUInt16LE(p + 28);
    const extraLen = cd.readUInt16LE(p + 30);
    const commentLen = cd.readUInt16LE(p + 32);
    const localOffset = cd.readUInt32LE(p + 42);
    const name = cd.toString('utf8', p + 46, p + 46 + nameLen);
    entries.push({ name, method, compSize, localOffset });
    p += 46 + nameLen + extraLen + commentLen;
  }
  return { file, entries };
}

function readZipEntry(zipInfo, entry) {
  const fd = fs.openSync(zipInfo.file, 'r');
  const lh = Buffer.alloc(30);
  fs.readSync(fd, lh, 0, 30, entry.localOffset);
  const nameLen = lh.readUInt16LE(26);
  const extraLen = lh.readUInt16LE(28);
  const dataStart = entry.localOffset + 30 + nameLen + extraLen;
  const data = Buffer.alloc(entry.compSize);
  fs.readSync(fd, data, 0, entry.compSize, dataStart);
  fs.closeSync(fd);
  if (entry.method === 0) return data;
  if (entry.method === 8) return zlib.inflateRawSync(data);
  return null;
}

// ---------------- resource pool ----------------
const contents = new Map();      // virtualPath -> provider  (later add = higher priority)
const poolOrig = new Set();
const poolLower = new Map();     // lower -> orig

function addPath(p, provider) {
  contents.set(p, provider);
  poolOrig.add(p);
  if (!poolLower.has(p.toLowerCase())) poolLower.set(p.toLowerCase(), p);
}
function exists(p) { return poolOrig.has(p); }
function getContent(p) {
  const pr = contents.get(p);
  if (!pr) return null;
  try {
    if (pr.kind === 'file') return fs.readFileSync(pr.abs);
    return readZipEntry(pr.zip, pr.entry);
  } catch (e) { return null; }
}
function walk(dir, base) {
  let items;
  try { items = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const it of items) {
    const abs = path.join(dir, it.name);
    const rel = base ? base + '/' + it.name : it.name;
    if (it.isDirectory()) walk(abs, rel);
    else addPath(rel, { kind: 'file', abs });
  }
}

// 1) all mod jars
const modsDir = path.join(ROOT, 'mods');
let jarCount = 0;
for (const f of fs.readdirSync(modsDir)) {
  if (!f.toLowerCase().endsWith('.jar')) continue;
  try {
    const zi = readZipEntries(path.join(modsDir, f));
    if (!zi) continue;
    jarCount++;
    for (const e of zi.entries) {
      if (e.name.endsWith('/')) continue;
      if (!e.name.startsWith('assets/')) continue;
      addPath(e.name, { kind: 'zip', zip: zi, entry: e });
    }
  } catch (err) { console.error('  [jar fail]', f, err.message); }
}
console.log(`已索引 mod jar: ${jarCount} 个, 资源条目 ${poolOrig.size}`);

// 2) kubejs assets (higher priority)
walk(path.join(ROOT, 'kubejs', 'assets'), 'assets');

// 3) resourcepacks (highest)
const rpDir = path.join(ROOT, 'resourcepacks');
for (const f of fs.readdirSync(rpDir)) {
  const abs = path.join(rpDir, f);
  const st = fs.statSync(abs);
  if (st.isDirectory()) {
    walk(abs, '');
  } else if (f.toLowerCase().endsWith('.zip')) {
    const zi = readZipEntries(abs);
    if (!zi) continue;
    for (const e of zi.entries) {
      if (e.name.endsWith('/') || !e.name.startsWith('assets/')) continue;
      addPath(e.name, { kind: 'zip', zip: zi, entry: e });
    }
  }
}
console.log(`含资源包/KubeJS 后总条目: ${poolOrig.size}`);

// ---------------- model resolution ----------------
function resolveLoc(v, defaultNs) {
  if (v.includes(':')) { const [ns, p] = v.split(':'); return { ns, path: p }; }
  return { ns: defaultNs, path: v };
}
function modelPathOf(loc) { return `assets/${loc.ns}/models/${loc.path}.json`; }
function texturePathOf(loc) { return `assets/${loc.ns}/textures/${loc.path}.png`; }

const jsonCache = new Map();
function loadJson(p) {
  if (jsonCache.has(p)) return jsonCache.get(p);
  const b = getContent(p);
  let r = null;
  if (b) { try { r = JSON.parse(b.toString('utf8')); } catch { r = 'PARSE_ERROR'; } }
  jsonCache.set(p, r);
  return r;
}

// walk parent chain, child overrides parent
function collectModel(modelPath, seen = new Set()) {
  if (seen.has(modelPath)) return { textures: new Map(), missingParent: null, parseError: false, chain: [...seen] };
  seen.add(modelPath);
  const j = loadJson(modelPath);
  if (j === null) return { textures: new Map(), missingParent: modelPath, parseError: false };
  if (j === 'PARSE_ERROR') return { textures: new Map(), missingParent: null, parseError: true };
  let parentRes = { textures: new Map(), missingParent: null, parseError: false };
  if (typeof j.parent === 'string') {
    const pl = resolveLoc(j.parent, 'minecraft');
    parentRes = collectModel(modelPathOf(pl), seen);
  }
  const textures = new Map(parentRes.textures);
  if (j.textures && typeof j.textures === 'object') {
    for (const [k, v] of Object.entries(j.textures)) if (typeof v === 'string') textures.set(k, v);
  }
  return { textures, missingParent: parentRes.missingParent, parseError: parentRes.parseError || false, json: j };
}

function resolveRef(name, textures, depth = 0) {
  if (depth > 25) return { value: null, reason: 'CHAIN_TOO_DEEP' };
  const v = textures.get(name);
  if (v === undefined) return { value: null, reason: 'UNDEFINED_REF' };
  if (v.startsWith('#')) return resolveRef(v.slice(1), textures, depth + 1);
  return { value: v, reason: null };
}

// ---------------- audit a namespace ----------------
const NS = process.argv[2] || 'cmi';
const report = [];
const srcOfModel = new Map();

// gather all model files of this namespace in the pool
const modelPrefix = `assets/${NS}/models/`;
const allModels = [...poolOrig].filter(p => p.startsWith(modelPrefix) && p.endsWith('.json'));

let checked = 0;
const missingTextures = [];
const caseMismatch = [];
const undefinedRefs = [];
const missingParents = [];
const parseErrors = [];

for (const mp of allModels) {
  const res = collectModel(mp, new Set());
  if (res.missingParent) missingParents.push({ model: mp, parent: res.missingParent });
  if (res.parseError) parseErrors.push(mp);
  const textures = res.textures;
  // 1) all concrete texture values
  for (const [key, val] of textures) {
    if (val.startsWith('#')) {
      const r = resolveRef(val.slice(1), textures);
      if (r.reason === 'UNDEFINED_REF') undefinedRefs.push({ model: mp, key, ref: val });
      continue;
    }
    const loc = resolveLoc(val, 'minecraft');   // vanilla semantics: no namespace => minecraft
    const tp = texturePathOf(loc);
    if (!exists(tp)) {
      const alt = poolLower.get(tp.toLowerCase());
      if (alt) caseMismatch.push({ model: mp, key, want: tp, actual: alt });
      else missingTextures.push({ model: mp, key, want: tp, raw: val });
    }
  }
  checked++;
}

console.log(`\n===== 命名空间 ${NS} 校验 =====`);
console.log(`模型文件: ${allModels.length} (检查 ${checked})`);

function groupBy(arr, f) {
  const m = new Map();
  for (const x of arr) { const k = f(x); if (!m.has(k)) m.set(k, []); m.get(k).push(x); }
  return m;
}

console.log(`\n[1] 贴图完全不存在: ${missingTextures.length}`);
{
  const g = groupBy(missingTextures, x => x.want);
  for (const [want, arr] of [...g].slice(0, 120)) {
    console.log(`  ${want}   <- ${arr.length} 处, 例: ${arr[0].model} (key=${arr[0].key}, raw=${arr[0].raw})`);
  }
  if (g.size > 120) console.log(`  ...(还有 ${g.size - 120} 个不同路径)`);
}

console.log(`\n[2] 大小写不匹配(文件在, 但引用大小写不同): ${caseMismatch.length}`);
for (const x of caseMismatch.slice(0, 40)) {
  console.log(`  ${x.model}  key=${x.key}\n     引用: ${x.want}\n     实际: ${x.actual}`);
}

console.log(`\n[3] 未定义的 # 引用: ${undefinedRefs.length}`);
for (const x of undefinedRefs.slice(0, 40)) console.log(`  ${x.model}  ${x.key}=${x.ref}`);

console.log(`\n[4] parent 模型不存在: ${missingParents.length}`);
for (const x of missingParents.slice(0, 40)) console.log(`  ${x.model} -> ${x.parent}`);

console.log(`\n[5] 模型 JSON 解析失败: ${parseErrors.length}`);
for (const x of parseErrors.slice(0, 20)) console.log(`  ${x}`);

// ---------------- blockstate -> block audit ----------------
const bsPrefix = `assets/${NS}/blockstates/`;
const allBs = [...poolOrig].filter(p => p.startsWith(bsPrefix) && p.endsWith('.json'));
console.log(`\n===== blockstates 审计 (${NS}, 共 ${allBs.length}) =====`);
let badBlocks = 0;
for (const bs of allBs) {
  const j = loadJson(bs);
  if (!j || j === 'PARSE_ERROR') continue;
  const models = new Set();
  const walk2 = (o) => {
    if (!o || typeof o !== 'object') return;
    if (typeof o.model === 'string') models.add(o.model);
    for (const v of Object.values(o)) {
      if (Array.isArray(v)) v.forEach(walk2);
      else if (v && typeof v === 'object') walk2(v);
    }
  };
  walk2(j.variants); walk2(j.multipart);
  const missing = new Set();
  for (const m of models) {
    const res = collectModel(modelPathOf(resolveLoc(m, NS)), new Set());
    for (const [k, v] of res.textures) {
      if (v.startsWith('#')) continue;
      const tp = texturePathOf(resolveLoc(v, 'minecraft'));
      if (!exists(tp)) missing.add(tp);
    }
  }
  if (missing.size) {
    badBlocks++;
    console.log(`\n[方块] ${bs.slice(bsPrefix.length, -5)}   模型: ${[...models].join(', ')}`);
    for (const m of missing) console.log(`     缺失: ${m}`);
  }
}
console.log(`\n受影响方块数: ${badBlocks} / ${allBs.length}`);

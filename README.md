<!--markdownlint-disable MD001 MD033 MD041 MD051-->

<div align="center">

**English** · [简体中文](readme/zh_cn.md)

# Create: Mechanisms and Innovations (CMI)

A `Minecraft Forge 1.20.1` Create modpack led by [**`Re_Construction`**](https://space.bilibili.com/3461572013853145),
successor / improvement of `CIM(Create: Infinity Mechanism)`.

**`Beta 2.5.0`** · Public Beta · Built by **Team Nebula**

[GitHub](https://github.com/Eternal-Snowstorm/Create-Mechanism-and-Innovation) · [Gitee mirror](https://gitee.com/eternalsnowstorm/mechanism-and-innovation) · [Issues](https://github.com/Eternal-Snowstorm/Create-Mechanism-and-Innovation/issues)

</div>

---

## What is this

**An industrial anthem built around `Create` and friends — you start with one Andesite Alloy and end up on a launch pad.**

A single custom component layer — **Mechanisms** — is the spine of the whole pack. Metallurgy, steelmaking, steam,
petrochemistry, precision electronics, computing, composites and space exploration all hang off it, forming a
progression line you can genuinely follow to the end, instead of bouncing between a few hundred mods and a wiki.

Every stage ships with its own quests and dedicated machines, so the gameplay and the design space both go hard.
This is not "dump a pile of mods into a zip and call it a day" — no cap.

| Item | Details |
| --- | --- |
| Game version | Minecraft `1.20.1` / Forge (dev instance `47.4.10`) |
| Pack version | `Beta 2.5.0` (declared by `CmiGlobal.modPackMainVersion` in CMI Core) |
| Mod count | ~223 jars in `mods/`, **8 of them developed / maintained by Team Nebula** |
| Script scale | KubeJS: 242 `server_scripts` · 74 `startup_scripts` · 30 `client_scripts`; 458 files under the `kubejs/data` datapack |
| Quest line | 8 FTB Quests chapters (prologue + main line + misc) |
| Language | Simplified Chinese first (shop, quests, guide, tooltips) |

---

## Core content

### 1. The Mechanism system — the pack's backbone

Here's the part nobody else really pulls off: "making things" is abstracted into one reusable component layer.
Explore everything, build everything, connect everything with Mechanisms. One rule to rule them all.

- **Mechanism Part**: how a Mechanism is *made* is never set in stone — how it's *finished* always is. Slot the core
  `Mechanism Part` in and the Mechanism is done. Total crafting freedom, one consistent finish line.
- **Mechanism bodies**: dozens of them — Andesite Alloy, Copper, Iron, Gold, Bronze, Cobalt, Coil, Computing,
  Enchanted, Ender, Airtight, Aeronautic, Astronautic, Antimatter, Chromatic, plus the whole Mekanism family.
- **Mechanism abilities**: every Mechanism unlocks its own set of machines and recipes, and they are *not* reskinned
  crafting intermediates. A Fluid Mechanism that hurls water bottles, a Pig Iron Mechanism that never stops chewing —
  that kind of unhinged behaviour is exactly where the fun lives.
- **Proliferator / Flash Disk system**: ore proliferation, data acquisition and more, so your production lines never go
  stale and your builds never run out of ideas.

### 2. Multiblocks & in-house machines

- **MBD2 (Multiblocked 2) multiblocks**: Electrolyzer (`electrolyzer`, with fluid / gas / item / energy ports),
  Chemical Reactor (`chemical_reactor`) and the Electronic Blast Furnace (`electronic_blast_furnace`) — 16 parallel,
  three coil tiers of copper / electrum / high voltage, and it proxies Arc Furnace, Smelting, Alloying, Car Kiln,
  Rotary Kiln and Powered Blast Furnace recipe types. Throughput is genuinely cracked.
- **CMI Core machines**: Chemical Gas Extractor, Flash Disk Writer, Radar Terminal, Simple Centrifuge, Water Pump,
  Steam Boiler / Large Steam Boiler, Rocket Assembly and more.
- Custom structures such as the **multiblock Water Well / Large Mechanism Proliferator**.
- Structures live in `ldlib/assets/mbd2/` and `kubejs/data/cmi/machines/`, and you can extend them freely with
  scripts under `kubejs/server_scripts/event/mods/mbd/`.

### 3. Steam, heat and power

- **Create: Steam Ages / Steam Powered**: Combustion Chamber → `HU (Heat Unit)` → Boiler → Steam → Steam Engine →
  Flywheel → stress network, end to end. Copper / cast iron / steel tiers each carry their own numbers
  (see `Developer/蒸汽和HU之间的算法.md`). Steam hits different when the chain runs this deep.
- **Steam 'n' Rails / Railway Automation**: train kits, signals, automated hauling, and railways you can lay down fast.
- Stress sources and transport got a full rebalance: `kubejs/server_scripts/recipes/device/StressSource.js`, `StressTransport.js`.

### 4. Geology, ore veins and petrochemistry

- **Deposit / ore vein system**: coal, iron, copper, gold, lead, nickel, oil shale, quartz, redstone and cobalt, each in
  small / medium / large tiers (`kubejs/data/cmi/structures/deposit/`). Veins for days — you will not run out of things
  to dig.
- **Configurable ore generation**: `kubejs/server_scripts/data/worldgen/OresGen.js`, `OreNodeGen.js`, `GeoVentGen.js`,
  `OilGen.js` (geo vents, oil fields, Martian lava lakes).
- **Petrochemical line**: crude extraction → fractionation → diesel / biodiesel / silicone rubber, with every fuel
  registered in one place — `kubejs/server_scripts/data/FuelTypes.js`.
- **Caves & structures**: custom structures such as `kubejs/data/cmi/structures/cave/`.

### 5. Material unification & smelting

- **Metal material registry**: `kubejs/startup_scripts/register/material/` defines ingots / plates / rods / wires /
  dusts / gears / molten fluids in one shot and rolls out every recipe for you. Add one material, let the code cook.
- **Cross-mod processing unification**: Create, Mekanism, Thermal, Immersive Engineering, Tinkers' Construct and
  Ad Astra processing chains for the same material are all wired together (`kubejs/server_scripts/recipes/material/metal/`).
- **Fluid & item unification (Unify)**: `kubejs/server_scripts/data/unification/` + global OneEnoughItem / Block / Fluid
  replacement.
- **Tinkers' integration**: the `TConMaterial.js` material builder + casting / melting recipes + the Nebula Tinker
  extension, plus upgrade systems such as `#cmi:steam_upgrades`.

### 6. Space & dimensions

- **Ad Astra**, heavily reworked: T1–T4 rocket models and assembly, oxygen and cryo handling, space station recipes,
  planet renderers (`kubejs/assets/cmi/planet_renderers/`). Hand-cranked gears to lit engines, no detours — space is
  the endgame, and it shows.
- **Alex's Caves**, heavily reworked: the cave biomes are split off into their own Ad Astra planets. Exploration value:
  doubled. Certified banger of a side quest.
- **Eden Ring** dimension and portal (`event/functional/server/EdenPortal.js`).

### 7. Quest line, guide and Ponder

- **FTB Quests**: Prologue (`prologue`), Start (`start`), Machine Learning (`machine_learning`), Fuel (`fuel`),
  Steam Railway (`steam_railway`), Precision Component (`precision_component`), Ascend on Burning Oil
  (`ascend_on_burning_oil`) and Utilities (`utilities`). Still under construction — stay tuned, and please don't
  rush us.
- Chapters are grouped into "Main line" and "Some matters (WIP)". Early chapters gate your progression: block breaking
  and crafting permissions are locked behind stages.
- **Ponder**: hand-built Ponder scenes for AE2's ME Controller / Drive / Spatial IO / P2P / Quantum Ring etc.(`kubejs/assets/cmi/ponder/`).

### 8. Quality of life & performance

Staying power is mostly a details game, and this pack does not sleep on it:

| Category | Contents |
| --- | --- |
| Storage | Functional Storage (with FunctionalStorageJS drawer upgrade registration), Sophisticated Backpacks, AE2 + ExtendedAE + Applied Mekanistics |
| Building | Industrial Platform, Construction Wand, Multi Builder Tool |
| Information | Jade + JadeAddons, JEI, TConPlanner, Not Enough Recipe Book, Untranslated Items |
| Maps | Xaero's Minimap / World Map, Explorer's Compass, Nature's Compass |
| Performance | Embeddium, Oculus, ModernFix, FerriteCore, EntityCulling, ImmediatelyFast, Noisium, Ksyxis, Smooth Boot, Packet Fixer, CreateBetterFPS and more |
| Convenience | Mouse Tweaks, Controlling, AppleSkin, Torcherino, Time in a Bottle, Easy Repair, Fast Leaf Decay, TreeChop |
| Experience | FancyMenu + Drippy Loading Screen (custom main menu / loading screen), Jade themes (Windows XP / War Thunder / Stardew Valley and more), Extreme Sound Muffler |

---

## Mods developed / maintained by the team

The scripts are only half the story. The pack also ships mods built or maintained by Team Nebula:

| Mod | Mod ID | Version | What it does |
| --- | --- | --- | --- |
| CMI Core | `cmi` | 1.3 | Pack core: Mechanism system, machines, multiblocks, material and equipment registration |
| Nebula Tinker | `nebula_tinker` | 1.0.0 | Tinkers' Construct extension |
| Industrial Platform | `industrial_platform` | 1.8.0 | Quickly build industrial platforms |
| Interlocked | `interlocked` | 1.1 | Create Encasing chaining |
| FunctionalStorageJS | `functional_storage_js` | 1.3 | Drawer upgrade registration API for Functional Storage |
| Storage Tweaks | `storage_tweaks` | 1.0.0 | Item / fluid storage system upgrade adjustments |
| Create: Steam Ages | `create_steam_ages` | 1.0 | New ways for Create steam boilers to work |
| Railway Automation | `railway_automation` | 1.0 | Automated railway track laying |

On top of that, the pack uses [`hotai`](https://github.com/youyihj/hotai) ("Patch mods easily") to fix third-party
behaviour with `.badiff` hot patches, without ever touching the mods themselves. That's exactly why `hotai/` has to
ship with the pack — don't ask, just bring it along.
> ⚠️ Many bug fixes and features depend on the `hotai/` hot-patch folder in the repo root. **Keep every single file.** Ship the pack
> without it and your machines will simply clock out.

---

## Directory structure

| Path | Description |
| --- | --- |
| `mods/` | The mods themselves; `mods/.index/` holds packwiz metadata (`project-id` / `file-id` / sha1) that the update script validates against |
| `kubejs/` | Main pack content: `startup_scripts` (registration) / `server_scripts` (recipes, events, worldgen) / `client_scripts` (language and display) / `data` (datapack) / `assets` (textures, models, lang, guides, Ponder) |
| `config/` `defaultconfigs/` | Mod configs; `config/ftbquests/quests/` is the quest line itself and may be updated with the pack |
| `hotai/` | Runtime hot patches (`.badiff`), required by the multiblocks |
| `ldlib/` | MBD2 multiblock structure definitions |
| `resourcepacks/` | Bundled resource packs (Create pipes, drawers, chromatic frames, etc.) |
| `updater/` | One-click updater for the pack's mods and scripts |
| `Developer/` | Development docs: design documents, MBD2 registration docs, steam / HU algorithm notes, conversion scripts |
| `UpdateLogs.md` | Changelog (write it every time you change something) |
| `CONTRIBUTING.md` | Open-source collaboration agreement and KubeJS code style |

---

## Install & update

### First install

1. Install Minecraft `1.20.1` and the matching Forge.
2. Drop this repo's contents into your instance's `.minecraft` folder — the folder name doesn't matter.
3. Already have Git? Just pull with the update script (below).

### Daily updates

`updater/` ships cross-platform scripts that sync the
[Gitee mirror repository](https://gitee.com/eternalsnowstorm/mechanism-and-innovation) down to your machine, then
download/verify mods from **third-party direct links** (CurseForge / Modrinth CDN) per `updater/update.tsv`
(a failed download restores that mod's previous jar and writes a log to `updater/logs/`):

```bat
:: Windows (first time)
updater\setup-gitee-sync.bat
:: Windows (daily)
updater\update-from-gitee.bat
```

```bash
# Linux / macOS
bash updater/setup-gitee-sync.sh
bash updater/update-from-gitee.sh
```

They only touch replaceable folders — `mods / config / kubejs / defaultconfigs / resourcepacks` — and **never touch
your saves or `options.txt`**. Not a single block. Full details in `updater/CLIENT-GUIDE.md`, design discussion in
`热更新方案.md`.

---

## Notes

### Server side

- Packaging? Keep the `hotai` folder in the repo root together with **all** files inside it, or your modpack will misbehave.
- Strip out client-only mods so the server actually runs.
- Hit a BUG? **Report it** — don't just sit on it. [**`issues`**](https://github.com/Eternal-Snowstorm/Create-Mechanism-and-Innovation/issues) is the best place for it.
- Editing JEI integration? Run `kjs reload client_scripts` before `reload`.

---

### Files required for packaging

 - **config**
 - **defaultconfigs**
 - **hotai**
 - **kubejs**
	- **assets**
	- **client_scripts**
	- **config**
	- **data**
	- **server_scripts**
	- **startup_scripts**
 - **mods**
 - **resourcepacks**
 - **icon.png**
 - **ldlib**
	- **assets**
		- **mbd2**
 - **LICENSE.md**
 - **README.md**
 - **readme/README.zh-CN.md**
 - **UpdateLogs.md**
 - **updater**

---

### This pack ships a lot of wheels, and the community is very welcome to reuse them — including but not limited to:

 - [**Metal material registration**](kubejs/startup_scripts/register/utils/Material.js)
 - [**Ore block registration**](kubejs/startup_scripts/register/block/CommonOres.js)
 - [**Configurable ore generation**](kubejs/server_scripts/data/worldgen/OresGen.js)
 - [**Tinkers' material builder**](kubejs/server_scripts/data/tconstruct/TConMaterial.js)
 - [**Functional Storage drawer upgrade registration**](kubejs/startup_scripts/register/other/Drawer.js)
 - [**Diesel fuel registration**](kubejs/server_scripts/data/FuelTypes.js)
 - [**Metal material recipe integration**](kubejs/server_scripts/recipes/material/metal)

---

## Contributing

- Code style, commit conventions and PR / Issue requirements live in [**`CONTRIBUTING.md`**](CONTRIBUTING.md)
- Every change has to be logged in [**`UpdateLogs.md`**](UpdateLogs.md) (format: chapter 10 of the collaboration agreement)
- The version number lives in CMI Core's `CmiGlobal.modPackMainVersion`
- Adding or swapping mods must be registered in `mods/.index` — the update manifest is generated from it
- Design and dev docs go in `Developer/`; for MBD2 registration see `Developer/MBD2代码注册文档`

---

<div align="center">

Thanks for playing CMI!

</div>
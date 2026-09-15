<!--markdownlint-disable MD001 MD033 MD041 MD051-->

<div align="center">

[English](../README.md) · **简体中文**

# Create: Mechanisms and Innovations(CMI)
# 机械动力: 构件与革新

由 [**`Re_Construction`**](https://space.bilibili.com/3461572013853145) 领头的 `Minecraft Forge 1.20.1` 机械动力整合包, 是 `CIM(Create: Infinity Mechanism)` 的续作 / 改良

**`Beta 2.5.0`** · 公开测试(Beta)阶段 · 开发团队 **Team Nebula**

[GitHub](https://github.com/Eternal-Snowstorm/Create-Mechanism-and-Innovation) · [Gitee 镜像](https://gitee.com/eternalsnowstorm/mechanism-and-innovation) · [问题反馈](https://github.com/Eternal-Snowstorm/Create-Mechanism-and-Innovation/issues)

</div>

---

## 这是什么

**以 `机械动力` 等 Mod 为核心构建的工业赞歌 —— 从第一块安山合金, 一路干到航天发射台。**

整合包用一套自定义元件 —— **构件(Mechanism)** —— 当作主要脉络, 把冶金、炼钢、蒸汽、石油化工、精密电子、计算机、复合材料与航天开拓串成一条能走到底的产线。每一阶段都有对应的任务与专属机器, 游玩体验与设计可能性双双拉满 —— 而不是把一堆 Mod 丢进压缩包就算完事。

| 项目 | 内容 |
| --- | --- |
| 游戏版本 | Minecraft `1.20.1` / Forge(本开发实例 `47.4.10`) |
| 整合包版本 | `Beta 2.5.0`(版本号由 CMI Core 的 `CmiGlobal.modPackMainVersion` 声明) |
| Mod 数量 | `mods/` 约 223 个 jar, 其中 **8 个由 Team Nebula 自研 / 维护** |
| 脚本规模 | KubeJS: `server_scripts` 242 个 · `startup_scripts` 74 个 · `client_scripts` 30 个; 数据包 `kubejs/data` 458 个文件 |
| 任务线 | FTB Quests 8 章(序章 + 主线 + 事项) |
| 语言 | 以简体中文为主(商店、任务、指南、Tooltip) |

---

## 核心内容

### 1. 构件(Mechanism)体系 —— 整合包的"整体脉络"

整合包最独特的部分: 把"做东西"这件事抽象成一层可复用的构件元件, 以构件探索一切, 制造一切, 连接一切 —— 主打一个"万物皆可构件"。

- **构件零件**: 构件的制造方式并不是一成不变的, 但是构件的成型方式高度一致: 将最为核心的`构件零件`安装上去, 这个构件就算是完工了
- **构件本体**: 安山合金、铜、铁、金、青铜、钴、线圈、计算、附魔、末影、气密、航空、航天、反物质、彩色, 以及通用机械系列等数十种
- **构件能力**: 每一种构件都对应着一系列设备与配方, 但是它们不是单纯的合成材料. 诸如投掷水瓶的流体构件, 无限啃食的生铁构件等神奇的构件能力, 可以进一步增添游玩的趣味 —— 整活空间相当可观
- **催生器 / 闪存盘体系**: 覆盖矿石催生, 数据获取等玩法, 避免产线单调, 提高设计多样性

### 2. 多方块与自研机器

- **MBD2(Multiblocked 2)多方块**: 电解槽(`electrolyzer`, 含流体 / 气体 / 物品 / 能量端口)、化学反应釜(`chemical_reactor`)、电子高炉(`electronic_blast_furnace`, 16 并行, 支持铜 / 琥珀金 / 高压电三级线圈, 代理电弧炉、熔炼、合金、车窑、旋转窑、电力高炉等配方类型)—— 产能直接原地起飞
- **CMI Core 机器**: 化学气体提取机、闪存写入机、雷达终端、简易离心机、水泵、蒸汽锅炉 / 大型蒸汽锅炉、火箭装配等
- **多方块水井 / 大型构件催生器** 等自定义结构
- 结构定义在 `ldlib/assets/mbd2/` 与 `kubejs/data/cmi/machines/`, 可用 `kubejs/server_scripts/event/mods/mbd/` 中的脚本自由扩展

### 3. 蒸汽、热力与动力

- **Create: Steam Ages / Steam Powered**: 燃烧室 → `HU(热量单位)` → 锅炉 → 蒸汽 → 蒸汽引擎 → 飞轮 → 应力网络 的完整链路, 青铜 / 铸铁 / 钢三级设备各有独立数值(详见 `Developer/蒸汽和HU之间的算法.md`)
- **汽鸣铁道(Steam 'n' Rails) / 铁道智行**: 列车套件,列车信号, 自动化运输与快捷的铁路建设
- 应力来源与传输被重新平衡: `kubejs/server_scripts/recipes/device/StressSource.js`、`StressTransport.js`

### 4. 地质、矿脉与石油化工

- **矿床 / 矿脉系统**: 煤矿、铁矿、铜矿、金矿、铅矿、镍矿、油页岩、石英、红石、钴矿等均有 small / medium / large 三级结构(`kubejs/data/cmi/structures/deposit/`)—— 矿脉管够, 挖到手软
- **可配置矿石生成**: `kubejs/server_scripts/data/worldgen/OresGen.js`、`OreNodeGen.js`、`GeoVentGen.js`、`OilGen.js`(地热喷口、油田、火星熔岩湖)
- **石油化工线**: 原油开采 → 分馏 → 柴油 / 生物柴油 / 硅橡胶等, 燃料统一在 `kubejs/server_scripts/data/FuelTypes.js` 中登记
- **洞穴与结构**: `kubejs/data/cmi/structures/cave/` 等自定义结构

### 5. 材料的统一与冶炼

- **金属材料注册器**: `kubejs/startup_scripts/register/material/` 一次性定义锭 / 板 / 杆 / 线 / 粉 / 齿轮 / 熔融流体, 自动铺开全部配方 —— 加一种材料, 剩下的交给代码
- **跨 Mod 处理统一**: 同一材料的 Create、Mekanism、Thermal、沉浸工程、匠魂、Ad Astra 处理链互相打通(`kubejs/server_scripts/recipes/material/metal/`)
- **流体与物品统一(Unify)**: `kubejs/server_scripts/data/unification/` + OneEnoughItem / Block / Fluid 全局替换
- **匠魂集成**: `TConMaterial.js` 材料构建器 + 熔铸 / 浇筑配方 + Nebula Tinker 扩展, 另有 `#cmi:steam_upgrades` 等升级体系

### 6. 航天与维度

- **Ad Astra** 深度改造: 火箭 1–4 级模型与装配、氧气与低温处理、空间站配方、行星渲染器(`kubejs/assets/cmi/planet_renderers/`)—— 从手搓齿轮到点火升空, 一步到位
- **Alex's Caves** 深度改动: 将Alex洞穴群系独立为Ad Astra星球, 增添探索感与游玩趣味
- **Eden Ring(伊甸星环)** 维度与传送门(`event/functional/server/EdenPortal.js`)

### 7. 任务线、指南与思索

- **FTB Quests**: 序章(`prologue`)、开始(`start`)、精智元件(`machine_learning`)、燃料(`fuel`)、汽鸣铁道(`steam_railway`)、精密组件(`precision_component`)、油燃而升(`ascend_on_burning_oil`)、实用工具(`utilities`), 任务线尚未完工, 敬请期待 —— 先别急着催更
- 章节分为「主线」与「一些事项(WIP)」两组, 早期章节承担阶段解锁(破坏方块 / 合成权限由阶段控制)
- **思索(Ponder)**: 为 AE2 的 ME 控制器 / 驱动器 / 空间 IO / P2P / 量子环等编写了自定义思索场景(`kubejs/assets/cmi/ponder/`)

### 8. 生活质量与性能

能不能长期玩下去, 很多时候就看这些细节:

| 方向 | 内容 |
| --- | --- |
| 存储 | Functional Storage(含 FunctionalStorageJS 抽屉升级注册)、Sophisticated Backpacks、AE2 + ExtendedAE + Applied Mekanistics |
| 建造 | Industrial Platform(快速工业平台)、Construction Wand、Multi Builder Tool |
| 信息 | Jade + JadeAddons、JEI、TConPlanner、Not Enough Recipe Book、Untranslated Items |
| 地图 | Xaero 小地图 / 世界地图、Explorer's Compass、Nature's Compass |
| 性能 | Embeddium、Oculus、ModernFix、FerriteCore、EntityCulling、ImmediatelyFast、Noisium、Ksyxis、Smooth Boot、Packet Fixer、CreateBetterFPS 等 |
| 便利 | Mouse Tweaks、Controlling、AppleSkin、Torcherino、Time in a Bottle、Easy Repair、Fast Leaf Decay、TreeChop |
| 体验 | FancyMenu + Drippy Loading Screen(自定义主界面 / 加载画面)、Jade 主题(Windows XP / 战雷 / 星露谷等)、Extreme Sound Muffler |

---

## 团队自研 / 维护的 Mod

除脚本内容外, 整合包还带有 Team Nebula 自行开发或维护的 Mod:

| Mod | Mod ID | 版本 | 作用 |
| --- | --- | --- | --- |
| CMI Core | `cmi` | 1.3 | 整合包核心: 构件体系、机器、多方块、材料与装备注册 |
| Nebula Tinker | `nebula_tinker` | 1.0.0 | 匠魂(Tinkers' Construct)扩展 |
| Industrial Platform | `industrial_platform` | 1.8.0 | 快速搭建工业平台 |
| Interlocked | `interlocked` | 1.1 | 机械动力套壳(Encasing)连锁 |
| FunctionalStorageJS | `functional_storage_js` | 1.3 | 功能性存储的抽屉升级注册接口 |
| Storage Tweaks | `storage_tweaks` | 1.0.0 | 物品 / 流体存储系统升级调整 |
| Create: Steam Ages | `create_steam_ages` | 1.0 | 为机械动力蒸汽锅炉提供新的工作方式 |
| Railway Automation | `railway_automation` | 1.0 | 自动化铺设轨道交通系统 |

此外使用了 [`hotai`](https://github.com/youyihj/hotai)("Patch mods easily")以 `.badiff` 热补丁的形式在不改动 Mod 本体的前提下修正第三方行为 —— 这就是根目录 `hotai/` 必须随包分发的原因, 别问, 问就是必须带上。
> ⚠️ 许多bug修复与新增功能依赖根目录的 `hotai/` 热补丁目录, 打包 / 分发时**必须完整保留** —— 漏一个文件, 机器当场罢工。

---

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `mods/` | Mod 本体; `mods/.index/` 为 packwiz 元数据(`project-id` / `file-id` / sha1), 更新脚本据此校验 |
| `kubejs/` | 整合包主要内容: `startup_scripts`(注册) / `server_scripts`(配方、事件、世界生成) / `client_scripts`(语言与显示) / `data`(数据包) / `assets`(材质、模型、语言、指南、思索) |
| `config/` `defaultconfigs/` | Mod 配置; `config/ftbquests/quests/` 是任务线本体, 允许随包更新 |
| `hotai/` | 运行时热补丁(`.badiff`), 多方块机器依赖 |
| `ldlib/` | MBD2 多方块结构定义 |
| `resourcepacks/` | 随包资源包(Create 管道、抽屉、彩色边框等) |
| `updater/` | 一键更新整合包mods与脚本 |
| `Developer/` | 开发资料: 策划文档、MBD2 注册文档、蒸汽 / HU 算法说明、转化脚本 |
| `UpdateLogs.md` | 更新日志(每次改动都要写) |
| `CONTRIBUTING.md` | 开源协作协议与 KubeJS 代码规范 |

---

## 安装与更新

### 首次安装

1. 安装 Minecraft `1.20.1` 与对应的 Forge;
2. 将本仓库内容放入实例的 `.minecraft` 目录(目录名不限);
3. 本地已装 Git 时, 可直接用更新脚本拉取(见下)。

### 日常更新

`updater/` 内提供跨平台脚本, 把 [Gitee 镜像仓库](https://gitee.com/eternalsnowstorm/mechanism-and-innovation)的内容同步到本地, 再按 `updater/update.tsv` 清单从**第三方直链**(CurseForge / Modrinth CDN)下载 / 校验 mods(个别下载失败会自动恢复旧版本并写日志到 `updater/logs/`):

```bat
:: Windows(首次)
updater\setup-gitee-sync.bat
:: Windows(日常)
updater\update-from-gitee.bat
```

```bash
# Linux / macOS
bash updater/setup-gitee-sync.sh
bash updater/update-from-gitee.sh
```

脚本只处理 `mods / config / kubejs / defaultconfigs / resourcepacks` 等可替换目录, **不会碰存档与 `options.txt`** —— 存档什么的, 一根毛都不会动; 详细说明见 `updater/CLIENT-GUIDE.md`, 方案讨论见 `热更新方案.md`。

---

## 注意事项

### 服务端

- 在打包时请保留根目录下的 `hotai` 文件夹以及内部的**所有**文件, 确保整合包运行正常
- 删除影响服务端的客户端 Mod 确保服务端运行正常
- 出现 BUG **一定**要反馈, 别自己憋着(能够使用 [**`issues`**](https://github.com/Eternal-Snowstorm/Create-Mechanism-and-Innovation/issues)最好!)
- 在修改 JEI 的时候需要先运行 `kjs reload client_scripts` 后再运行 `reload`

---

### 整合包打包所需文件

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

### 本整合包提供了非常多的轮子, 我们非常欢迎社区去使用我们的轮子, 包括但不限于:

 - [**金属材料注册**](../kubejs/startup_scripts/register/utils/Material.js)
 - [**矿石方块注册**](../kubejs/startup_scripts/register/block/CommonOres.js)
 - [**可配置矿石生成**](../kubejs/server_scripts/data/worldgen/OresGen.js)
 - [**匠魂材料构建器**](../kubejs/server_scripts/data/tconstruct/TConMaterial.js)
 - [**功能性存储抽屉升级注册**](../kubejs/startup_scripts/register/other/Drawer.js)
 - [**柴油动力燃料添加**](../kubejs/server_scripts/data/FuelTypes.js)
 - [**金属材料配方集成处理**](../kubejs/server_scripts/recipes/material/metal)

---

## 参与开发

- 代码规范、提交规范、PR / Issue 要求见 [**`CONTRIBUTING.md`**](../CONTRIBUTING.md)
- 每次改动都要在 [**`UpdateLogs.md`**](../UpdateLogs.md) 中记录(格式见协作协议第十章)
- 版本号写在 CMI Core 的 `CmiGlobal.modPackMainVersion`
- 新增 / 更换 Mod 必须登记进 `mods/.index`(更新清单据此生成)
- 策划与开发资料放在 `Developer/`, MBD2 注册参见 `Developer/MBD2代码注册文档`

---

<div align="center">

感谢游玩 **机械动力: 构件与革新**!

</div>
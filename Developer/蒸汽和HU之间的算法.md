# Steam Powered: 蒸汽与 `HU`(热量单位)算法说明

适用版本: 本仓库 `SteamPowered-1.20-create-6`(`Create 1.20.1` / `Create: Steam Powered 3.0.2` fork).
文中所有默认数值均可在 `Forge` 配置文件中覆盖；改动后下述公式依然成立.

---

## 0. 概念总览

* `HU(Heat Unit)`: 热量单位. 燃烧室烧燃料产生 `HU`, 锅炉接收 `HU` 并消耗水来产出蒸汽.
* 蒸汽(`Steam`): 锅炉的产物, 供蒸汽引擎使用；引擎消耗蒸汽驱动飞轮, 向 `Create` 应力网络输出转速(`Speed`)与容量(`Stress Capacity`).

整条链路:

```text
    燃料(Forge 熔炉燃料, burnTime 燃烧时间)
      |
      v
    燃烧室: HU 储备 HURemain        ← HU 算法
      |  每 tick 最多发出 getHuPerTick() HU
      v
    锅炉: HU + 水 → 蒸汽(mekanism:steam)   ← 蒸汽生产算法
      |  蒸汽罐容量 10000 mB
      v
    蒸汽引擎: 耗汽 → 转速/容量(需 60 tick 预热)
      |  写入
      v
    飞轮: 向应力网络提供容量
```

---

## 1. 核心换算基准(配置项)

配置来源: `src/main/java/com/teammoeg/steampowered/SPConfig.java`

| 配置项          | 默认值               | 含义                             |
| --------------- | -------------------- | -------------------------------- |
| `steamPerWater` | `12.0`               | `1 mB` 水 → `12 mB` 蒸汽         |
| `HuPerFuelTick` | `24`                 | 燃料每燃烧 `1 tick` 产生 `24 HU` |
| (硬编码换算)    | `10 HU = 1 mB` 蒸汽  | HU → 蒸汽换算率                  |
| (由上式导出)    | `1 mB` 水 = `120 HU` | 即 `steamPerWater × 10`          |

三个品级的默认数值:

| 品级              | 燃烧室每刻最大发 HU | 锅炉每刻最大收 HU | 燃烧效率 | 引擎耗汽 mB/t | 引擎容量 SU | 引擎转速 RPM | 引擎内置蒸汽罐 mB |
| ----------------- | ------------------- | ----------------- | -------- | ------------- | ----------- | ------------ | ----------------- |
| `Bronze(青铜)`    | `120`               | `120`             | `0.8`    | `12`          | `512`       | `32`         | `32 000`          |
| `Cast Iron(铸铁)` | `240`               | `240`             | `0.9`    | `24`          | `1024`      | `32`         | `64 000`          |
| `Steel(钢)`       | `480`               | `480`             | `1.0`    | `48`          | `2048`      | `32`         | `96 000`          |

注意: 锅炉与燃烧室的每级数值完全相同, 且引擎耗汽恰好等于锅炉满负荷产汽,
因此"同级的锅炉 / 燃烧室 / 引擎"在默认值下可满功率持续运转.

---

## 2. HU 算法: 燃料 → HU

代码: `src/main/java/com/teammoeg/steampowered/content/burner/BurnerBlockEntity.java`
品级数值: 同目录 `BronzeBurnerBlockEntity.java` / `CastIronBurnerBlockEntity.java` / `SteelBurnerBlockEntity.java`

### 2.1 燃料折算(每消耗 1 个物品)

取物品的 `Forge` 熔炉燃烧时间 `burnTime`(煤矿 `1600 tick`, 其余按游戏值), 每烧一个物品:

```text
ΔHU = burnTime × HuPerFuelTick(24) × 品级效率(bronze 0.8 / cast_iron 0.9 / steel 1.0)
HURemain += ΔHU
```

`HURemain` 是 `int` 类型, 复合赋值会截断小数部分.

以煤矿 `burnTime = 1600` 为例:

| 品级        | `ΔHU(burnTime × 24 × eff)` | 对应蒸汽总量(÷10) |
| ----------- | -------------------------- | ----------------- |
| `Bronze`    | `30 720 HU`                | `3 072 mB`        |
| `Cast Iron` | `34 560 HU`                | `3 456 mB`        |
| `Steel`     | `38 400 HU`                | `3 840 mB`        |

换算率速记: 每个品级每个燃料 tick 产生 `burnTime × 19.2 / 21.6 / 24 HU`.

注意: 代码中"2.4HU/t"注释是旧版本残留, 不要照抄到文档里.

### 2.2 每 tick 放热(燃烧室 → 锅炉)

燃烧室每 tick(仅服务端)执行:

```java
// 青铜 120 / 铸铁 240 / 钢 480
emit = getHuPerTick();
// 存量不足以撑满本 tick 输出且仍有燃料时, 循环补燃料
while (HURemain < emit && consumeFuel()) {
}
if (HURemain < emit) {
	// 补燃料后仍不足
	// 把剩余 HU 全部发出
    emitHeat(HURemain);
    HURemain = 0;
    LIT = false;
} else {
	// 存量充足
    HURemain -= emit;
    emitHeat(emit);
    LIT = true;
}
```

要点:

* 热量只传给正上方方块(`emitHeat` 取 `pos.above()`), 对方必须实现 `IHeatReceiver`(锅炉即实现者).
* 放热是覆盖式提交(`commitHeat(float)`), 多热源并存时后执行者覆盖先执行者.
* 红石锁定(`REDSTONE_LOCKED`)时 `consumeFuel()` 直接返回 `false`: 不补新燃料, 但已有 `HU` 储备仍会烧完.
* 每 tick 放热量上限只由本级 `getHuPerTick()` 决定；燃料只决定"能烧多少 tick", 不决定瞬时输出.

### 2.3 燃料有效性

燃料槽只接受满足以下条件的物品:

* `ForgeHooks.getBurnTime(stack, SMELTING) != 0`
* `stack.getCraftingRemainingItem().isEmpty()`(无遗留物品, 桶类等不可用)

---

## 3. 蒸汽算法: HU + 水 → 蒸汽

代码: `src/main/java/com/teammoeg/steampowered/content/boiler/BoilerTileEntity.java`
品级数值: 同目录 `BronzeBoilerBlockEntity.java` / `CastIronBoilerBlockEntity.java` / `SteelBoilerBlockEntity.java`

### 3.1 每 tick 逻辑(服务端)

```java
// 热源规则见 3.2
① 取热: getHeatFromHeater()
    lastheat = heatreceived;

② 收到热量才工作: 
    consume = min(锅炉HU上限 getHUPerTick(), heatreceived);
	// 每刻清零, 不累计
    heatreceived = 0;

③ 换算水与蒸汽: 
	// 120 = steamPerWater × 10
    水按整 mB 抽: waterNeeded = ceil(consume / 120)  
	// 水量不足则少抽    
    实抽 drained = input.drain(waterNeeded)             
    consume = min(drained × 120, consume)
    产汽 steamMb = consume / 10
	// int 整除, <10 HU 尾数丢弃
    output.fill(steamMb mB)
```

默认满负荷核算:

| 品级        | 每刻消耗 HU | 每刻耗水 | 每刻产蒸汽 | 每小时(3600 tick)产汽 |
| ----------- | ----------- | -------- | ---------- | --------------------- |
| `Bronze`    | `120`       | `1 mB`   | `12 mB`    | `43 200 mB`           |
| `Cast Iron` | `240`       | `2 mB`   | `24 mB`    | `86 400 mB`           |
| `Steel`     | `480`       | `4 mB`   | `48 mB`    | `172 800 mB`          |

### 3.2 热源来源规则

`BoilerTileEntity.getHeatFromHeater()`:

* 若锅炉正下方就是本 mod 的 `BurnerBlock`: 直接返回——热量由燃烧室 tick 经 `emitHeat()`(向上判定)传入.
* 否则走 `Create` 原版 `BoilerHeater.findHeat()`, 并把 heat 折算成 HU:

```java
commitHeat( max(heat, 3) × 本级锅炉HU上限 × 0.75 )
```

### 3.3 罐体与表现

* 输入(水)罐与输出(蒸汽)罐各 `10000 mB`.
* 蒸汽罐满时继续供热则蒸汽/热量直接浪费；客户端会每 `20 tick` 播放泄漏音效与蒸汽粒子(`output 满 且 lastheat != 0`).
* 默认产出的蒸汽流体为 `mekanism:steam`(代码中通过 `ForgeRegistries` 查找该 ID).
* 红石比较器可读取蒸汽存量.

---

## 4. 蒸汽消耗算法: 引擎 + 飞轮

代码: `src/main/java/com/teammoeg/steampowered/content/engine/SteamEngineTileEntity.java`
飞轮: `src/main/java/com/teammoeg/steampowered/oldcreatestuff/OldFlywheelBlockEntity.java`
品级数值: 同目录 `Bronze/CastIron/SteelSteamEngineTileEntity.java`

### 4.1 结构

* 引擎方块沿朝向(`FACING`)第 2 格放置同级飞轮(`attachWheel()`).
* 引擎自带蒸汽罐(容量见表 1), 可用泵/加压容器注汽(泵送模式).
* 引擎自带罐为空且"背后"一格是 `BoilerTileEntity` 时, 直接抽锅炉 output 罐(直连模式).

### 4.2 蒸汽来源与消耗

```text
baseConsumption = 引擎等级耗汽(12 / 24 / 48 mB/t)
source = 引擎内置罐(非空时), 否则为锅炉 output(引擎罐空且锅炉在其后时)
highTemp = source 中流体命中 SPTags.HIGH_TEMPERATURE_STEAM
```

冷启动门槛(`heatup == 0` 时):

```text
reserveTarget = baseConsumption × (highTemp ? 10 : 40)   // mB
若 source 存量 < reserveTarget, 本次不点火(提示 Not Enough Steam)
```

每 tick 消耗:

* 普通蒸汽: 每 tick 扣 `baseConsumption mB`.
* 高温蒸汽: 平均只消耗 `baseConsumption / 4`(每 `mB` 携带 4 倍能量). 为避免 `0.x mB/t` 的分数扣汽, 用 `steamQuota` 累积:

```java
steamQuota += baseConsumption;
wanted = steamQuota / 4;      // 够 1 mB 才真扣
if (wanted > 0) {
    if (source 实际抽不到 wanted) { 
		steamQuota = 0; 进入断汽处理;
	}
    else steamQuota -= wanted × 4;
}
```

示例: `12 mB/t` 引擎烧高温蒸汽时每 tick quota += 12、wanted = 3, 即每 tick 扣 `3 mB`.

### 4.3 工作状态机

| 状态           | 条件                        | 行为                                                                                  |
| -------------- | --------------------------- | ------------------------------------------------------------------------------------- |
| 未接飞轮       | `poweredWheel` 为空或已移除 | 只从内置罐按 `baseConsumption` 抽汽(不抽锅炉), 不输出动力, `heatup` 清零, `LIT=false` |
| 暖机 `Heating` | 有汽且 `heatup < 60`        | 每 tick 正常耗汽, `heatup++`, `LIT=true`, 不输出动力                                  |
| 运行 `Running` | `heatup ≥ 60`               | 将转速/容量写入飞轮并每 tick 刷新(数值不变则不重复应用)                               |
| 断汽/停转      | 抽不到足够蒸汽              | 立即清零 `appliedSpeed` / `appliedCapacity`, `heatup--` 缓慢冷却, `LIT=false`         |
| 停机过渡       | 引擎不再给飞轮速度          | 飞轮有 `40 tick` 停止冷却(`stoppingCooldown`)后才真正归零                             |

### 4.4 输出到飞轮(转速 / 容量)

```java
speed = getGeneratingSpeed();       // 默认各品级均为 32 RPM
cap = getGeneratingCapacity();    // 默认 512 / 1024 / 2048 SU
if (蒸汽来自锅炉直连, 即 source != 内置罐) {
	// // suckEfficiency 默认全部为 0.7
	cap = ceil(cap × getSuckEfficiency());
}
setRotation(speed, cap);            // 写入飞轮(GeneratingKineticBlockEntity)
```

直连锅炉(省管道)容量打 `7 折并向上取整`: `512 → ceil(358.4) = 359 SU`；`1024 → 717 SU`；`2048 → 1434 SU`.
用泵把蒸汽打进引擎内置罐(泵送模式)可获得满容量.
实际网络的最终转速与应力分配由 `Create` 自身网络逻辑计算.

---

## 5. 端到端核算示例(`Steel` 全套)

1. 燃料: `1 个煤矿 = 1600 burn tick`.
2. 燃烧室: `HURemain = 1600 × 24 × 1.0 = 38400 HU`, 按 `480 HU/t` 释放 → 可维持约 `80 tick`.
3. 锅炉(钢): 每 tick 收满 `480 HU` → 抽 `4 mB` 水 → 产 `48 mB` 蒸汽.
4. 引擎(钢, 泵送模式): 每 tick 耗 `48 mB` 蒸汽, `60 tick` 预热后输出 `32 RPM × 2048 SU`.
5. 全链总产汽 = `3840 mB`, 满功率可持续约 `80 tick`(扣除暖机 `60 tick` 内的耗汽后略短).

| 环节       | 数量关系                             |
| ---------- | ------------------------------------ |
| 燃料       | `burnTime tick`(Forge 熔炉燃料时间)  |
| HU 总量    | `burnTime × 24 × 品级效率`           |
| 蒸汽总量   | `HU 总量 ÷ 10 mB`                    |
| 满功率时长 | `蒸汽总量 ÷ 引擎耗汽(12/24/48 mB/t)` |

---

## 6. 易错点 / 复刻与写文档时注意

1. `HU` 不是能量存储: 锅炉每 tick 用后即清零(`heatreceived = 0`), 超出锅炉上限的 `HU` 直接浪费；只有燃烧室的 `HURemain` 是储备.
2. 热量提交是覆盖式: `commitHeat(float)` 直接赋值, 多热源会互相覆盖, 代码中没有做多热源求和.
3. 取整损失三处:
   * 燃料折算 `HU: HURemain +=` 浮点表达式, 复合赋值截断；
   * 抽水按整 `mB(ceil)`, 水不够按实抽回推；
   * 产汽 `consume / 10` 为 `int` 整除, 丢弃小于 `10 HU` 的尾数.
4. 数值全部可配置: 表格均为默认值, 服务端 config 可改 `steamPerWater`、各级 HU / 耗汽 / 容量等.
5. 效率 ≠ HU/t: `burnerEfficiency` 只影响"每个燃料燃烧 tick 折算多少 HU", 不影响每 tick 最大放热量 `getHuPerTick()`.
6. 直连损耗: 引擎直吸锅炉蒸汽时容量 ×`0.7` 并向上取整；泵送进内置罐为满容量.
7. 高温蒸汽: 按 `1/4` 速率消耗(每 `mB` 4 倍能量), 判定只认 `SPTags.HIGH_TEMPERATURE_STEAM`；普通蒸汽(含 `mekanism:steam`、`SPTags.STEAM`)全速消耗.

---

## 7. 关键源码位置速查

| 逻辑                   | 文件                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| 全部默认数值 / 配置    | `src/main/java/com/teammoeg/steampowered/SPConfig.java`                                               |
| HU 产生与放热          | `src/main/java/com/teammoeg/steampowered/content/burner/BurnerBlockEntity.java`                       |
| 各品级燃烧室数值       | `content/burner/` 下 `Bronze/CastIron/SteelBurnerBlockEntity.java`(`120/240/480`, 效率 `0.8/0.9/1.0`) |
| HU → 蒸汽换算          | `src/main/java/com/teammoeg/steampowered/content/boiler/BoilerTileEntity.java`(`166-208` 行附近)      |
| 各品级锅炉数值         | `content/boiler/` 下 `Bronze/CastIron/SteelBoilerBlockEntity.java`(`120/240/480`)                     |
| 引擎耗汽/预热/高温蒸汽 | `src/main/java/com/teammoeg/steampowered/content/engine/SteamEngineTileEntity.java`(`132-374` 行附近) |
| 各品级引擎数值         | `content/engine/` 下 `Bronze/CastIron/SteelSteamEngineTileEntity.java`                                |
| 飞轮动力输出与停转冷却 | `src/main/java/com/teammoeg/steampowered/oldcreatestuff/OldFlywheelBlockEntity.java`                  |
| 热量接收接口           | `src/main/java/com/teammoeg/steampowered/content/burner/IHeatReceiver.java`                           |

注意: 第 4 章的"`60 tick` 暖机 + 冷启动储备 + 高温蒸汽 `1/4` 耗汽"属于本仓库 fork 的新增/改动逻辑,
与网上旧版 Steam Powered 的引擎实现不完全一致, 引用时以本仓库代码为准.

---

## 8. 三条速查公式(默认值)

> 品级参数: 效率 `eff = 0.8 / 0.9 / 1.0`, HU 上限与引擎耗汽、容量随品级取 `青铜 / 铸铁 / 钢`.

### ① 燃烧时间 `burnTime` → `HU/t`(燃烧室)

```text
总HU   = burnTime × 24 × eff            // 一个燃料的全部储备
HU/t   = min(HURemain, 品级上限)        // 上限 120 / 240 / 480
满载时长 tick = 总HU ÷ 品级上限          // 燃料只决定"烧多久", 不决定瞬时输出
```

### ② `HU/t` → `Bucket/t`(锅炉)

```text
耗水 B/t = (H ÷ 120) ÷ 1000     // 1 mB 水 = 120 HU
产汽 B/t = (H ÷ 10)  ÷ 1000     // 1 mB 蒸汽 = 10 HU(mekanism:steam)
```

满负荷 `H = 120 / 240 / 480 HU/t` 时: 耗水 `0.001 / 0.002 / 0.004 B/t`, 产汽 `0.012 / 0.024 / 0.048 B/t`.

### ③ `Bucket/t` → `SU`(引擎 + 飞轮)

```text
SU = min( 供汽 mB/t ÷ (12 / 24 / 48), 1 ) × (512 / 1024 / 2048)   // 泵送模式满容量
直连锅炉: SU = ceil( 上式 × 0.7 )                                  // 省管道打 7 折
```

因 `512/12 = 1024/24 = 2048/48 = 128/3`, 三品级同一换算率: 每 `1 mB/t` 供汽 ≈ `42.7 SU`(即每 `1 B/t` 供汽 ≈ `42 667 SU`), 供汽达到本级额定值后按上表容量封顶.
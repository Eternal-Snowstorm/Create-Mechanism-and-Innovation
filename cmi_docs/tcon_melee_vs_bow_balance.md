# TConstruct 近战 / 弓箭 平衡分析与备选设计思路

工作副本: D:/software/Prism Launcher/instances/CMI-beta-dev-vers/.minecraft
版本基准: TConstruct-1.20.1-3.12.1.231, Nebula Tinker-1.0.0, tconstruct_js-1.0.6

---

## 一、当前状态（已反编译验证的数值链路）

### 1.1 弓的伤害公式

来源 _tcon_decomp3/slimeknights/tconstruct/library/tools/item/ranged/ModifiableBowItem.java:171-249

- charge = getToolCharge(tool, chargeTime)，蓄力系数，拉满 = 1.0
- power = charge * VELOCITY(弓)
- arrow.shootFromRotation(..., power * 3.0f, inaccuracy)，箭初速 = 3 × VELOCITY
- baseArrowDamage = arrow.getBaseDamage() - 2.0 + PROJECTILE_DAMAGE(弓)
- if (charge == 1.0f) arrow.setCritArrow(true)，拉满必暴击
- 单发箭数 = BowAmmoModifierHook.getDesiredProjectiles(tool) = 1 + 2 × multishot 等级
- 循环内 angle = startAngle + 10 * arrowIndex，每支偏移 10 度

箭伤沿用原版 AbstractArrow: damage = ceil(本 tick 位移长度 × baseDamage)，即箭伤约等于速度 × 箭基础伤害。

### 1.2 箭基础伤害恒为 2.0（关键负面结论）

- jar 内 data/tconstruct/tinkering/tool_definitions/arrow.json 的 parts 为 [tconstruct:arrow_head, arrow_shaft, fletching]，无 base_stats
- 全仓 PROJECTILE_DAMAGE 只有三处: ModifiableArrow 的 setDamage、ToolStats 默认值 2.0、ModifiableBowItem.java:248-249
- 材料属性类 tconstruct:arrow_head 在 data/tconstruct/tinkering/materials/stats/flint.json 里是空对象 {}，箭头部件不携带任何数值，只携带 trait
- 结论: 裸箭伤害恒 2.0，与箭头材料攻击力完全无关

### 1.3 材料到工具属性的真实语义（tconstruct_js 侧）

来源 _tcjs_decomp/xiaoyue/tconstruct_js/content/material/MaterialStatsBuilder.java

- head(durability, meleeAttack, miningSpeed, miningTier)，meleeAttack 走 ATTACK_DAMAGE.update()（加值且清零 base）
- handle(durability%, meleeDamage%, meleeSpeed%, miningSpeed%)，全部为百分比
- grip(accuracy, durability%, meleeDamage)，accuracy 是第一个参数，meleeDamage 走 ATTACK_DAMAGE.add
- limb(accuracy, drawSpeed, durability, velocity)，顺序为 accuracy / drawSpeed / velocity，且完全不含任何伤害字段

因此弓把与弓臂的数值对箭伤直接贡献为 0。弓的强度全部来自:

1. limb 的 velocity（乘性，直接乘箭速，进而乘箭伤）
2. limb 的 drawSpeed（射速 = 20 / ceil(20 / DRAW_SPEED)）
3. 材料 trait（multishot / shadow / ballista / crystalshot 等）

### 1.4 复算验证（与实测吻合）

中期 黄铜弓把 + 工业铁弓臂 x2:

- 工业铁 limb(0, 0.2, 250, 0.1) x2，得 drawSpeed +0.4，velocity +0.2
- DRAW_SPEED = 1.4，drawtime = ceil(20/1.4) = 15t，即 1.33 发/秒
- VELOCITY = 1.2，箭速 3.6，单箭 ceil(3.6x2) 约 8，暴击约 11
- 黄铜 ranged trait = multishot 1，即 3 箭/发
- DPS 约 3 x 8~11 x 1.33 = 32~44（计入命中折扣约 30）

后期 暗影钢弓把 + 紫金弓臂 x2:

- 紫金 limb(0.35, 0.25, 1420, 0.7) x2，得 drawSpeed +0.5，velocity +1.4
- DRAW_SPEED = 1.5，drawtime = 14t，即 1.43 发/秒
- VELOCITY = 2.4，箭速 7.2，单箭 ceil(14.4) 约 15，暴击约 22
- 暗影钢 ranged trait = shadow 2 + multishot 2，即 5 箭/发，且 shadow 每次把 invulnerableTime 清零并追加 3 点
- DPS 约 5 x 15~22 x 1.43 = 107~157

近战 耐热金属剑（攻击力最高）:

- ATTACK_DAMAGE 约 6.5 x 柄部百分比 约 8~9，加玩家基础 1 约 9~10
- ATTACK_SPEED = 1.6，即 1.6 击/秒
- DPS 约 9~10 x 1.6 约 15，叠暴击与 Nebula 暴击系统约 30

### 1.5 核心判断

- 弓的单次伤害约 8~22 点，近战约 9~19 点，单次伤害几乎相同
- 5 倍差距全部来自每秒命中次数: 弓 4~7 次/秒（多箭 x 高射速 x 无视无敌帧），近战 1.6 次/秒（攻击冷却硬限速）
- 因此任何提高近战攻击力数值的方案都是错位治疗。要让近战靠纯数值达到 150 DPS 需单击 60~94 点，结果是普通怪秒杀加全整合包属性通胀
- 正确的施力点只有两个: 提高近战的每秒有效命中数，或压低弓箭的每秒有效命中数

---

## 二、失衡的五个结构性原因

1. 多重射击是每秒命中次数的乘数，且无等级上限。multishot.json 只写 volatile_int / each_level 2 / flag tconstruct:multishot，无最大等级约束；每级 +2 支箭，每支都吃满蓄力、满暴击、满修饰符（含 shadow 的额外伤害）。
2. 无敌帧清零只对投射物开放。InvincibleFrameEgregatorItem（Curios 饰品）在 LivingHurtEvent 里判断 source.is(IS_PROJECTILE) 后把目标 invulnerableTime 置 0；Shadow trait 同样清零并追加伤害。原版机制下任何伤害源的有效命中上限是 1 次 / 10 tick，即约 2 次/秒；清零后弓箭可到 7 次/秒，仅这一项就是 3.5 倍。
3. ACCURACY 封顶 1.0，使多箭散布的自然惩罚失效。ToolStats.ACCURACY 默认 0.75、上限 1.0；紫金 limb accuracy +0.35 x2 已经溢出，每支 10 度的散布因此不再真正漏箭，多箭等于多倍伤害。
4. 两条成长曲线形状不同。弓的强度约等于词条乘性（multishot x shadow x velocity），后期陡；近战的强度约等于 head 攻击力加性（6.5 已接近不秒怪的天花板），后期平。曲线形状不同则后期必然崩，与具体数值无关。
5. 箭头材料与伤害解耦。tconstruct:arrow_head 属性类为空，弓的强度不受材料 tier 约束，玩家可以任意组合低 tier 弓与高 tier 箭，平衡点不可控。

---

## 三、备选设计思路

每条给出: 机制 / 落点 / 如何加强近战 / 数值预估 / 代价与风险。

### 思路 A: 近战多段打击（Echo Strike），即近战版多重射击

- 机制: 注册自定义修饰符 cmi:echo_strike，在 onAfterMeleeHit(tool, level, ctx, damageDealt) 里以 2~3 tick 间隔追加 N 段伤害，每段先把 target.invulnerableTime 置 0 再结算；每段系数递减（如 0.5 / 0.3 / 0.2），总系数封顶。
- 落点: kubejs/startup_scripts 中 TConJSEvents.modifierRegistry 加 ModifierBuilder.onAfterMeleeHit；由 TConMaterial.js 的 perStat("tconstruct:melee_harvest", "cmi:echo_strike", n) 挂到 tier 材料上。
- 如何加强近战: 直接提升每秒命中次数。近战 1.6 击/秒 x 2 段 = 3.2 次/秒，DPS 30 变 60；x 3 段 = 90。与 multishot 完全对称，且不改变单击伤害，不会秒杀小怪。
- 代价: 必须硬节流（全局每 4 tick 最多追加一段），否则与攻速 buff 叠乘爆表；与 sweep_melee 横扫叠加时注意 AoE 爆炸；需要处理目标已死或已被他人击杀的竞态。

### 思路 B: 无敌帧对称化 + 攻速线性化

- 机制: 让玩家近战命中同样清零 invulnerableTime，或至少去掉 10 tick 内不生效的门槛，使攻速加成收益从被无敌帧吃掉一半变成线性。
- 落点: 属 Java 层逻辑（Nebula 的 i-frame 逻辑是 Java 写的）。KubeJS 的 EntityEvents.hurt 只能取消不能改数值（LivingEntityHurtEventJS 只暴露 getter，返回值只能 interrupt），因此要么改 Nebula，要么用 entity.attack(source, dmg) 重打（kubejs/server_scripts/event/functional/Test.js 已验证该写法可行）。
- 如何加强近战: 攻速从 1.6 提到 2.5~3.0 后，原本被无敌帧砍掉的命中能落地，DPS 从 30 变 65~80。
- 代价: 全局 i-frame 改动会影响怪物互相攻击、火焰与持续伤害、玩家 PvP；收益依赖攻速提升这个前置，单改此项不动近战武器本身。

### 思路 C: 统一每秒有效命中预算（资源制）

- 机制: 给每个玩家一个每秒命中预算（如 6 次/秒，可存 1 秒）。任何来源每次有效命中消耗 1 点；超出预算的伤害按 30% 结算并恢复 i-frame。多重射击 5 箭消耗 5 点，齐发可爆发但无法持续。
- 落点: 需要能在伤害结算前改写数值的挂点。tconstruct_js 的 projectileHitEntity 与 onDamageDealt 可覆盖 TCon 武器侧大半；若要覆盖全部伤害源则需一个小的 Java mixin 或补丁模组。
- 如何加强近战: 这是唯一两边同尺的方案。弓的持续命中被压到与近战同一预算内，胜负改由单次伤害决定，而两者单次伤害本就相当，近战立刻回到同一水平线；再叠思路 A 的多段，近战会成为预算制下的高效使用者。
- 代价: 实现成本最高；预算额度、超预算折扣率、Boss 特殊处理都是新的平衡参数，调参成本高；玩家理解成本高，需要 UI 或提示。

### 思路 D: 削平弓箭的每秒命中次数（只动弓）

- D1 多重射击限级: 覆盖 data/tconstruct/tinkering/modifiers/multishot.json，把 each_level 从 2 降到 1（5 箭变 3 箭），并用 level_display 的 unique_until 限上限，直接 -40%。
- D2 共帧: 一次齐发的多支箭共用同一条 i-frame 通道（第 2 支起不清零），齐发平均只吃到 1~2 支，再 -30~40%。
- D3 散布惩罚: 每多一支箭额外加 inaccuracy，或把 ACCURACY 的有效区间改为非线性，让 10 度散布真正随距离漏箭。
- 如何加强近战: 不直接加强，但把 5:1 压到 1.5:1~2:1，为思路 A 与 B 提供余量。投入产出比最高。
- 代价: 削弱玩家已有 build 的爽感；D2 需要 Java 挂点，或在 KJS 的 EntityEvents.hurt 里 interrupt 多余箭的伤害（属取消而非改数值，可行）。

### 思路 E: 把弓的强度从箭数转到单发质量

- 机制: 削弱 multishot，同时给弓穿透、爆头、静止蓄力加成、长拉弓增伤。单发伤害保持很高，但每秒命中次数被箭数与 i-frame 共同约束，靠时机与精度而非箭数堆 DPS。
- 落点: tconstruct_js 的 projectileHitEntity 与 projectileLaunch，以及 conditionalStat(PROJECTILE_DAMAGE)；材料 trait 层新增 cmi:pierce 与 cmi:aimed_shot。
- 如何加强近战: 通过腾出命中次数空间，让思路 A 的多段近战在同一预算内追平；同时把弓的定位从通用最优改成精准输出，让近战成为清杂兵与贴脸爆发的最优。
- 代价: 玩家需要重新学习拉弓节奏与站位；单发高伤容易被用来一箭秒杀加走位，需要和目标血量与护甲一起调。

### 思路 F: 材料层重构（TConMaterial.js），让两条曲线同构

- F1 让箭头材料真正参与伤害: tconstruct:arrow_head 属性为空，箭伤恒 2.0。可用现成通路 perStat("tconstruct:ammo", "tconstruct:keen", n)，keen.json 就是 stat_boost projectile_damage 每级 +0.5。把 tier3/tier4 材料的 ammo trait 从 keen 2 提到 4~6，或新增 cmi:heavy_head（每级 +1.0 projectile_damage），让高 tier 箭头成为弓的强度来源，弓因此被材料 tier 约束住。注意该项单向加强弓箭，必须与 D1 或 D2 同时执行。
- F2 把 tier4 材料的近战收益改造成词条乘性: 给紫金与耐热金属的 melee_harvest 挂 cmi:echo_strike（多段）与暴击类 trait，与多箭对称。
- F3 重排 grip 与 limb 的数值: 紫金 limb 的 accuracy +0.7 全部撞在 1.0 上限上（浪费），把这部分预算挪给近战伤害（grip 第三字段）或耐久，减少无意义溢出。
- 如何加强近战: F2 直接给近战机制乘数；F1 与 F3 修正曲线形状，使后期近战与弓按同一斜率成长。
- 代价: 只改材料不动机制时，必须同步降低现有数值，否则总量仍然溢出。

### 思路 G（结构性，非数值）: 风险与收益分离

- 机制: 给弓加拉弓时移速降低、无法格挡、蓄力被打断；给近战加格挡、减伤、击退硬直，让差别从 DPS 高低变成输出环境要求。
- 落点: tconstruct_js 的 getUseTime、onUsingTick、attributes（移速属性）、modifyDamageTaken；材料 armor trait。
- 如何加强近战: 不提高近战 DPS，而提高近战在近身战中的存活时间，间接提高有效输出占比；与 D 或 E 组合后，贴脸 150 DPS 的弓会因为没有生存手段而不再是最优解。
- 代价: 不改任何 DPS 数字，短期观感上平衡没变；需要 Boss 战与群怪等战斗场景配合才有意义。

---

## 四、推荐组合与实施顺序

目标曲线（贴脸、满配、对单体）:

- 中期（tier2~3）: 近战 35~45 DPS，弓 30~40 DPS
- 后期（tier4）: 近战 70~95 DPS，弓 70~95 DPS（贴脸），8 格以外按距离衰减到 50~60%
- 任何组合都不应超过同 tier 近战的 1.3 倍

实施顺序（每步可独立回滚）:

1. D1 + D2（削弓的命中次数）: 纯数据加事件层取消，成本最低，把 150 拉回 70~85
2. A（近战多段）: 新增 cmi:echo_strike，挂到 tier3/4 材料的 melee_harvest，把近战 30 提到 60~90
3. B（i-frame 对称化）: 视是否愿意改 Java 决定；与 A 二选一即可，同时上会过冲
4. F2 + F3（材料层收口）: 把 tier4 材料收益改造成词条乘性，减少 accuracy 溢出
5. E 或 G（定位分化）: 可选，把弓从通用最优改成远距离精准，近战改成贴脸爆发

若只允许做一件事: 选 A（给近战多段）。它直接对准每秒命中次数这个真正的缺口，不引入属性通胀，且与现有 tconstruct_js 能力完全匹配。

---

## 五、待裁定（不自行决定）

1. 是否允许修改 Nebula Tinker 的 Java 行为（i-frame 饰品与 Shadow trait），还是只能用 KubeJS 事件层抵消
2. cmi:echo_strike 的段数与总系数（建议 tier3 为 2 段总 0.8，tier4 为 3 段总 1.0），以及每 4 tick 最多一段的节流阈值
3. 是否接受贴脸弓仍强、远距离衰减的设计（思路 D3 与 E），还是要求任何距离都不超过近战
4. 现存 kubejs/server_scripts/event/functional/Test.js（首行 ignored: true）是否可作为多段命中的技术验证底稿
5. 是否保留 InvincibleFrameEgregatorItem 与 shadow trait 的无敌帧清零（它们是当前失衡的最大单点）
6. multishot 上限取 2 级（5 箭）还是 1 级（3 箭）

---

## 六、实现面清单（已核实）

- TCon 自定义修饰符（真实 Java hook，已安装）: kubejs/startup_scripts 加 TConJSEvents.modifierRegistry，ModifierBuilder 提供 getMeleeDamage、onBeforeMeleeHit、onAfterMeleeHit、onDamageDealt、conditionalStat、addAttributes、projectileHitEntity、projectileLaunch、findBowAmmo、getToolDamage 等 30 多个回调
- 材料定义（现有用法）: kubejs/server_scripts/data/tconstruct/TConMaterial.js，perStat("tconstruct:melee_harvest" | "tconstruct:ranged" | "tconstruct:ammo" | "tconstruct:armor", 修饰符名, 等级)
- 数据包覆盖: kubejs/data/tconstruct/tinkering/modifiers/*.json（可覆盖 multishot 与 keen 的 each_level）、kubejs/data/tconstruct/tinkering/tool_definitions/*.json
- 限制: KubeJS 的 EntityEvents.hurt 只能取消伤害（LivingEntityHurtEventJS 只暴露 entity / source / damage 三个 getter，事件返回 EventResult 只能 interrupt），不能改写伤害数值；需要改数值时必须走 tconstruct_js 的修饰符 hook，或在事件里用 entity.attack(source, x) 重打

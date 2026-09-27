# Create: Mechanism and Innovation 开源协作协议

## 第一章 总则

### 第一条 适用范围

本协议适用于所有参与 `Create: Mechanism and Innovation`(以下简称 `CMI`) 项目的开发人员及贡献者.

### 第二条 项目管理

项目主理人(Maintainer) `Re_Construction` 拥有版本迭代的最终决策权和本协议的解释权.

---

## 第二章 版本管理

### 第三条 版本号管理

1. `CMI` 版本号由大版本号、中版本号和小版本号组成.

2. `CMI` 的大版本号和中版本号由主创 `Re_Construction` 进行规定.

3. 版本号必须在 [CmiGlobal](https://github.com/Eternal-Snowstorm/CMICoreMod/blob/main/src/main/java/dev/celestiacraft/cmi/utils/CmiGlobal.java) 的 `modPackMainVersion` 中进行声明.

---

## 第三章 GitHub 仓库管理

### 第四条 Commit 提交规范

1. GitHub 每次进行修改并上传(即 `push origin`)时, 必须填写本次修改的 Commit Message.

2. Commit Message 必须包含以下内容:

   * `summary`: 概述本次修改的主要内容.
   * `description`: 说明本次修改的具体内容.

3. 技术人员提交的 `Commit Message` 必须使用中文(不限简繁体)或英语描述本次修改内容.

4. 开发人员在上传代码之前, 必须确保代码已经经过 Debug 并确认不存在已知问题.

5. 如果开发人员无法自行解决当前问题, 应当:

   * 暂时将存在问题的代码全部注释掉;
   * 在开发群中说明当前问题;
   * 或在 `Commit Message` 的 `description` 中说明当前存在的错误、卡住的位置以及无法解决的部分.

---

## 第四章 开发规范

### 第五条 命名规范

1. 类名采用大驼峰命名法(PascalCase).

```text
RecipeSchema
```

2. 函数和变量采用小驼峰命名法(camelCase).

```text
getMaterialList
```

3. 常量采用全大写蛇形命名法(SNAKE_CASE).

```text
GET_TAGS_ITEM
```

4. 严格禁止使用 `var` 声明变量或常量, 只能使用 `let` 或 `const`.

---

### 第六条 脚本开发规范

#### 1. Recipe Event 解构

配方脚本必须对 `event.getRecipes()` 进行结构解构.

```js
ServerEvents.recipes((event) => {
	let { create, kubejs, minecraft } = event.getRecipes()
})
```

#### 2. 有序配方

有序配方必须使用标准模板.

```js
kubejs.shaped("minecraft:stone", [
	"AAA",
	"BBB",
	"CCC"
], {
	A: "minecraft:sand",
	B: "#forge:gravel",
	C: "#forge:ingots/iron"
})
```

#### 3. 无序配方及其他 Mod 配方

无序配方以及 **Create**、**Thermal** 等 Mod 的配方必须使用标准模板.

以下模板可根据实际情况任选其一.

无序合成必须严格遵守前两个模板.

```js
// 无序
kubejs.shapeless("minecraft:stone", [
	"minecraft:sand"
])

kubejs.shapeless("minecraft:stone", [
	"minecraft:sand",
	"#forge:ingots/iron"
])

// Create
create.mixing("minecraft:stone", [
	"minecraft:sand"
])

create.mixing("minecraft:stone", [
	"minecraft:sand",
	Fluid.of("minecraft:water", 1000)
])

create.mixing([
	"2x minecraft:stone",
	Item.of("minecraft:sand", 2).withChance(0.5)
], [
	"minecraft:sand",
	Fluid.of("minecraft:water", 1000)
]).heated()

create.mixing([
	"2x minecraft:stone",
	Item.of("minecraft:sand", 2).withChance(0.5)
], "minecraft:sand").superheated()

// Thermal
thermal.centrifuge("minecraft:stone", [
	"minecraft:sand"
])

thermal.centrifuge("minecraft:stone", [
	"minecraft:sand",
	Fluid.of("minecraft:water", 1000)
])

thermal.centrifuge([
	"2x minecraft:stone",
	Item.of("minecraft:sand", 2).withChance(0.5)
], [
	"minecraft:sand",
	Fluid.of("minecraft:water", 1000)
]).energy(1000)

thermal.centrifuge([
	"2x minecraft:stone",
	Item.of("minecraft:sand", 2).withChance(0.5)
], "minecraft:sand").energy(1000)
```

#### 4. Create 序列合成

`TransitionalItem` 必须为**不涉及其他配方的 `create:sequenced_assembly` 物品类**.

```js
create.sequenced_assembly([
	Item.of("create:sturdy_sheet").withChance(0.7),
	Item.of("create:powdered_obsidian").withChance(0.15),
	Item.of("minecraft:gravel").withChance(0.15)
], "#forge:dusts/obsidian", [
	create.pressing("#forge:dusts/obsidian", [
		"#forge:dusts/obsidian",
		"#forge:dusts/obsidian"
	])
]).transitionalItem("create:unprocessed_obsidian_sheet").loops(10)

create.sequenced_assembly(Item.of("create:sturdy_sheet").withChance(0.7), [
	"#forge:dusts/obsidian"
], [
	create.pressing("#forge:dusts/obsidian", [
		"#forge:dusts/obsidian",
		"#forge:dusts/obsidian"
	])
]).transitionalItem("create:unprocessed_obsidian_sheet").loops(10)
```

#### 5. 分号使用

非必要情况下, 禁止在代码行末使用分号 `;`.

#### 6. 条件语句

`if` 或 `else` 语句禁止使用单行形式结束, 禁止使用单行 `return`.

错误:

```js
if (a === b) return
```

正确:

```js
if (a === b) {
	return
}
```

#### 7. 条件判断

除特殊情况外, 所有条件判断必须使用三等号强等于 `===`.

禁止使用双等号弱等于 `==`.

#### 8. Event Handler 命名

KubeJS 各类 `event` 中的 handler 参数必须统一使用 `event` 作为变量名.

```js
ServerEvents.recipes((event) => {})
```

#### 9. 箭头函数括号

所有箭头函数必须使用小括号 `()` 包裹参数, 无论是 `forEach` 还是 Event Handler.

```js
xxx.forEach((value) => {})

ServerEvents.recipes((event) => {})
```

#### 10. 箭头函数代码块

所有箭头函数(lambda)必须使用大括号 `{}` 包裹函数体, 禁止直接返回表达式.

错误:

```js
xxx.forEach((value) => value)
```

正确:

```js
xxx.forEach((value) => {
	value
})

yyy.map((value) => {
	return value
})
```

#### 11. 对象和数组换行

所有对象 `{}` 和数组 `[]` 内必须换行.

数组内部的数组可以根据实际情况决定是否换行.

```js
{
	"key": "value",
	"key1": "value1"
},
[
	"value",
	"value1"
],
[
	["value", "value1"],
	["value", "value1"]
],
[
	[
		"value",
		"value1"
	],
	[
		"value",
		"value1"
	]
]
```

#### 12. 字符串引号

禁止使用单引号 `''`.

字符串只能使用反引号 `` ` `` 或双引号 `"`.

#### 13. 物品逻辑注释

撰写物品逻辑时, 必须注释该逻辑所实现的功能, 并对逻辑步骤进行分步注释.

```js
let $BlockHitResult = Java.loadClass("net.minecraft.world.phys.BlockHitResult")
let $UseOnContext = Java.loadClass("net.minecraft.world.item.context.UseOnContext")

// 自然构件右键运行骨粉逻辑
BlockEvents.rightClicked((event) => {
	let { level, item, player, facing, block, hand } = event

	// 判断玩家手持物品为自然构件
	if (item === "cmi:nature_mechanism") {
		// 获取所点击的方块位置并调用 MC 原版骨粉逻辑
		let blockHitResult = new $BlockHitResult(player.pos, facing, block.pos, false)
		let useOnContext = new $UseOnContext(level, player, hand, "minecraft:bone_meal", blockHitResult)
		let boneMeal = Items.BONE_MEAL

		// 在指定方块上运行骨粉的逻辑
		boneMeal.useOn(useOnContext)

		// 玩家挥动手持的自然构件
		player.swing()
	}
})
```

#### 14. Java 类导入

在脚本中导入 Java 类时, 必须统一使用:

```js
Java.loadClass("package.ClassName")
```

并遵循以下规范:

* 必须使用 `let` 定义变量.
* 变量名统一采用 `$` + 类名的形式.
* 内部类使用 `$` 连接类名.

例如:

```js
let $BlockItem = Java.loadClass("net.minecraft.world.item.BlockItem")
let $Item$Properties = Java.loadClass("net.minecraft.world.item.Item$Properties")
```

#### 15. 方法及构造函数参数列表

当方法或构造函数的参数列表较长时, 必须选择以下两种形式之一:

* 所有参数保持在同一行.
* 所有参数分别换行.

禁止仅换行部分参数.

```js
function name(a, b, c, d, e, f) {}

function name(
	a,
	b,
	c,
	d,
	e,
	f
) {}

name(a, b, c, d, e, f)

name(
	a,
	b,
	c,
	d,
	e,
	f
)
```

#### 16. 函数类型注释

编写函数时必须添加文档注释.

每个参数必须使用 `@param` 指定参数类型.

参数可以不解释具体作用, 但必须说明参数类型.

---

### 第七条 注册规范

1. 调用链式方法时, 每个链式方法必须换行.

2. 严格禁止使用 `.displayName()` 方法进行命名.

3. 物品、方块及其他注册对象的名称必须前往 [`lang`](kubejs/client_scripts/lang) 文件夹下的语言文件中进行命名和修改.

正确示例:

```js
event.create(`${Cmi.MODID}:smart_gear`)
	.texture(`${Cmi.MODID}:item/smart_gear`)
	.burnTime(400)
```

---

## 第五章 代码管理

### 第八条 知识产权

1. 贡献者保留其提交代码的著作权.

2. 项目核心团队拥有代码架构的最终优化权.

---

## 第六章 贡献流程

### 第九条 Pull Request 要求

Pull Request 必须满足以下要求:

1. 必须包含至少 1 张有效运行截图.

2. 必须通过基础测试套件验证.

3. 禁止包含以下内容:

   * 二进制文件(`.jar` / `.zip`).

---

### 第十条 Issues 管理

BUG 报告必须包含以下内容:

1. 环境配置详情.

2. BUG 的复现步骤.

3. 错误日志片段.

4. 确保没有加入任何会影响游戏性能或游戏内容的 Mod.

---

## 第七章 版本控制

### 第十一条 更新日志规范

每次完成修改后, 根据修改规模及实际情况决定是否记录.

需要记录时, 必须在 [UpdateLogs.md](UpdateLogs.md) 中添加对应记录.

每一行的 `-` 前后必须各保留一个空格.

标准格式如下:

```markdown
## Beta 1.1.0

### 删除内容

 - 删除了 XXX 的 Tags

### 添加内容

 - 新增钛合金冶炼配方体系
 - 实现自动化产线验证模块

### 修改(调整)内容

 - 修复多方块结构能量溢出问题
 - 解决合成表 NBT 校验异常
 - 优化机械臂碰撞体积计算
```
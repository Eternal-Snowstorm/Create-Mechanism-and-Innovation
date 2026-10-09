# ProbeJS 使用教程

面向 KubeJS 脚本作者 / 整合包作者 / 想给 ProbeJS 加料的 mod 作者. 
代码风格统一为脚本侧的 getter 写法(`document.getMethods()`, `method.getName()`). 

---

## 0. 先跑通一次 dump

1. 装好 KubeJS + ProbeJS, 进单人存档, 开作弊. 
2. 聊天栏输入: 

```
/probejs dump
```

3. 等出现 `ProbeJS typing generation finished.`, 然后打开: 

```
kubejs/probe/generated/globals.d.ts
```

里面 `declare namespace Special { ... }` 就是我们可以操作的类型库. 

打不开 / 命令被拒: 

```
/probejs configure toggle_dump_req
/probejs test_availability
```

> 编辑脚本后不需要重启游戏, 改完再 `/probejs dump` 一次即可. 

---

## 1. 给类型库加类型(Special)

### 1.1 脚本里加(最简单)

`kubejs/server_scripts/probe.js`

```js
ProbeJSEvents.generateDoc((event) => {
	event.specialType("MyCodes", [
		"mymod:a",
		"mymod:b",
		"mymod:c"
	])
})
```

dump 后 `globals.d.ts` 里出现: 

```ts
declare namespace Special {
	type MyCodes = "mymod:a" | "mymod:b" | "mymod:c";
}
```

**要点**: 元素是原样拼接的, 字符串必须自己带引号. 写 `"mymod:a"` 而不是 `mymod:a`. 
数字, 裸类型名同理: `[1, 2, 3]`, `["ValueA", "ValueB"]`. 

### 1.2 白送的那些 Special

任何注册进 Minecraft 注册表的对象都会自动生成, 例如: 

| 类型               | 内容                                             |
| ------------------ | ------------------------------------------------ |
| `Special.Item`     | 物品 id                                          |
| `Special.Block`    | 方块 id                                          |
| `Special.Fluid`    | 流体 id                                          |
| `Special.FluidTag` | 流体标签, 形如 `"minecraft:water"`(**不带 #**) |
| `Special.ItemTag`  | 物品标签                                         |

所以第三方 mod 只要注册了自己的注册表, ProbeJS 会自动给它出一份 `Special.X`. 

想让这些变成普通 `string`(文件更小): 

```
/probejs configure toggle_registry_literals
```

### 1.3 Java 里加(常驻, 推荐 mod 作者)

放在你的 `KubeJSPlugin.init()`: 

```java
PlatformSpecial.INSTANCE.get().assignPlatformFormatter((indent, step) ->
		List.of(" ".repeat(indent) + "type MyCodes = "mymod:a" | "mymod:b";"));
```

这份是**持久**的, 不会被一次 dump 清掉. 

---

## 2. 让 Java 方法的参数显示成 Special

ProbeJS 的参数类型来自 Java 反射, 想要它显示成 `Special.XXX`, 就用 `property:modify` 覆盖. 

### 2.1 改某个方法的某个参数(最常用)

例: 把 `ofTagId(ResourceLocation tag, int amount)` 的第 0(1) 个参数显示成 `Special.FluidTag`. 

`kubejs/server_scripts/probe.js`

```js
ProbeJSEvents.generateDoc((event) => {
	let $CreateFluidIngredient = "dev.celestiacraft.cmi.compat.create.CreateFluidIngredient"
	event.transformByName($CreateFluidIngredient, (document) => {
		document.getMethods().forEach((method) => {
			if (method.getName() === "ofTagId") {
				method.addPropertyJson({
					type: "property:modify",
					index: 0,
					newType: {
						type: "type:primitive",
						name: "Special.FluidTag"
					}
				})
			}
		})
	})

	let $MBDFluidIngredient = "dev.celestiacraft.cmi.compat.mbd2.MBDFluidIngredient"
	event.transformByName($MBDFluidIngredient, (document) => {
		document.getMethods().forEach((method) => {
			if (method.getName() === "ofTagId") {
				method.addPropertyJson({
					type: "property:modify",
					index: 0,
					newType: {
						type: "type:primitive",
						name: "Special.FluidTag"
					}
				})
			}
		})
	})
})
```

结果: 

```ts
ofTagId(tag: Special.FluidTag, amount: number): FluidIngredient_
```

- `index` 从 **0** 开始数. 
- 想顺手改参数名就加 `"name": "tag"`. 
- 只想改类型, 不改名字: `name` 省略. 
- 方法名不用管, `@RemapForJS` 已经在反射层生效. 

### 2.2 整个类换成一个别名(assign)

官方就这么干: 所有 `Ingredient` 参数都显示成 `Special.Item`. 

```js
ProbeJSEvents.generateDoc((event) => {
	let $MyClass = "com.example.MyClass"
	event.transformByName($MyClass, (document) => {
		document.addPropertyJson({
			type: "property:assign",
			shield: false,
			assign: {
				type: "type:primitive",
				name: "Special.MyCodes"
			}
		})
	})
})
```

Java 侧常驻版(无 `clear`, 不会失效): 

```java
ClassAssignmentManager.ASSIGNMENTS.put(MyClass.class, new PrimitiveDescJS("Special.MyCodes"));
```

> 限制: 只对带下划线别名的类有效(`Ingredient_ → Ingredient`). 
> `number` / `string` 这类原生类型走 assign 是没用的, 用 2.1 的 `property:modify`. 

### 2.3 找不到类名 / 方法名？

先打印看看: 

```js
ProbeJSEvents.generateDoc((event) => {
	let $MyClass = "com.example.MyClass"
	event.transformByName($MyClass, (document) => {
		document.getMethods().forEach((method) => {
			console.info(method.getName())
		})
	})
})
```

更省事的办法: 开中间产物导出, 直接翻 JSON. 

```
/probejs configure toggle_json_intermediates
/probejs dump
```

然后搜 `kubejs/probe/cache/mergedClasses.json`. 

---

## 3. 用 JSON 写文档(不写 Java, 不写脚本)

1. `/probejs configure toggle_json_intermediates`, dump 一次. 
2. 打开 `kubejs/probe/cache/mergedClasses.json`, 找到目标类/方法, **整段复制**. 
3. 粘贴到 `kubejs/probe/docs/mine.json`, 补上 `properties`. 
4. `/probejs dump`. 

### 3.1 最小骨架(给类加注释)

```json
{
	"type": "document:class",
	"className": "com.example.FluidIngredient",
	"properties": [
		{
			"type": "property:comment",
			"lines": ["我的流体材料类型"]
		}
	]
}
```

### 3.2 改一个方法

`params` / `returns` 必须和反射结果**完全一致**, 否则会多出一份重复定义. 
最稳的做法是从 `mergedClasses.json` 里复制整个方法对象, 再加 `properties`. 

```json
{
	"type": "document:class",
	"className": "net.minecraft.world.item.ItemStack",
	"methods": [
		{
			"type": "document:method",
			"name": "copy",
			"static": false,
			"params": [],
			"returns": {
				"type": "type:class",
				"name": "net.minecraft.world.item.ItemStack"
			},
			"properties": [
				{
					"type": "property:comment",
					"lines": ["复制一份自己"]
				}
			]
		}
	]
}
```

### 3.3 隐藏一个字段 / 方法

```json
{
	"type": "document:field",
	"name": "internalCache",
	"static": false,
	"final": false,
	"fieldType": {
		"type": "type:primitive",
		"name": "string"
	},
	"properties": [
		{
			"type": "property:hide"
		}
	]
}
```

### 3.4 字段速查

| 文档              | 必填字段           | 可选字段                                                                                   |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------ |
| `document:class`  | `className`        | `abstract` `interface` `parent` `fields` `methods` `constructors` `variables` `interfaces` |
| `document:method` | `name` `returns`   | `static` `abstract` `params` `variables`                                                   |
| `document:field`  | `name` `fieldType` | `static` `final` `value`                                                                   |
| 所有文档          | `type`             | `properties`                                                                               |

属性(`properties` 里放的): 

| 属性                   | 写法                                                                     | 作用                                 |
| ---------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| `property:comment`     | `{"type":"property:comment","lines":["..."]}`                            | 加 JSDoc 注释                        |
| `property:hide`        | `{"type":"property:hide"}`                                               | 隐藏该成员                           |
| `property:assign`      | `{"shield":false,"assign":{"type":"type:primitive","name":"Special.X"}}` | 整个类换别名                         |
| `property:modify`      | `{"index":0,"newType":{...}}`                                            | 改第 index 个参数(`name` 可改名字) |
| `property:returns`     | `{"returns":{...}}`                                                      | 覆盖返回类型                         |
| `property:param`       | `{"name":"tag","paramType":{...},"varArg":false}`                        | 参数本身                             |
| `property:underscored` | `{"underscored":true}`                                                   | 强制加下划线别名                     |

> 类型名写在 `{"type":"type:primitive","name":"Special.FluidTag"}` 或
> `{"type":"type:class","name":"net.minecraft.resources.ResourceLocation"}` 里, `name` 原样输出. 
> 完整标签见文末附录. 

---

## 4. 补全片段(snippet)

### 4.1 内置的

dump 后自动有, 写在 `.vscode/probe.code-snippets`: 

| 前缀                        | 内容                      |
| --------------------------- | ------------------------- |
| `@item` `@block` `@fluid` … | 任意注册表的成员列表      |
| `@item_tag` `@fluid_tag` …  | 对应标签列表              |
| `@loot_table`               | 战利品表                  |
| `@advancements`             | 进度                      |
| `@mod`                      | mod id                    |
| `@lang_key`                 | 语言键                    |
| `@itemstack`                | `1x minecraft:stone` 形式 |
| `#随便写`                   | 配方 id(脚本文件里生效) |

### 4.2 自己加

```js
ProbeJSEvents.generateDoc((event) => {
	event.addSnippet("my_code", ["mymod:a", "mymod:b"], "我的代码")
	event.customSnippet(
		"my_block",
		["@myblock"],
		[{ block: "${1:mymod:foo}" }],
		"我的方块模板"
	)
})
```

- `addSnippet(name, items[, desc])`: 生成 `@name` → 下拉列表. 
- `customSnippet(type, prefixes, body[, desc])`: body 自己写, `${1:xxx}` 是 VSCode 补全占位符. 

---

## 5. 文件保存事件

VSCode 侧保存脚本时, 由 ProbeJS 扩展推给游戏(端口 7796). 

```js
ProbeJSEvents.fileSaved("**/*.js", (event) => {
	console.info("saved: " + event.file)
})

ProbeJSEvents.fileSaved(/server_scripts\/.*\.js/, (event) => {
	console.info("server script changed")
})
```

第一个参数是 glob 字符串或正则. 

---

## 6. 命令与开关

| 命令                                           | 作用                                                     |
| ---------------------------------------------- | -------------------------------------------------------- |
| `/probejs dump`                                | 重新生成所有类型文件(改完脚本就执行它)                 |
| `/probejs clear_cache`                         | 清缓存, 症状诡异时用                                     |
| `/probejs test_availability`                   | 诊断: 哪些 mod 的类没抓到                                |
| `/probejs configure toggle_enable`             | 总开关                                                   |
| `/probejs configure toggle_registry_dumps`     | 注册表全量 dump                                          |
| `/probejs configure toggle_registry_literals`  | 注册表成员写成字面量(关掉后是 `string`)                |
| `/probejs configure toggle_recipe_json`        | 配方补全开关                                             |
| `/probejs configure toggle_json_intermediates` | 导出 `probe/cache/mergedClasses.json`(写 JsonDoc 必备) |
| `/probejs configure toggle_aggressive`         | 更激进的类抓取                                           |
| `/probejs configure toggle_dump_req`           | dump 权限要求                                            |
| `/probejs configure toggle_schema_download`    | 联网下载官方 schema                                      |

配置本体在 `kubejs/config/probejs.json`. 

---

## 7. 生成物地图

```
kubejs/
├── probe/
│   ├── generated/
│   │   ├── globals.d.ts          # 主类型文件(Special 在这)
│   │   ├── constants.d.ts        # 脚本顶层常量
│   │   ├── names.d.ts
│   │   ├── events.d.ts           # 事件
│   │   ├── registries.d.ts       # 注册表
│   │   ├── raw.d.ts
│   │   ├── tag_events.d.ts
│   │   └── internals/
│   ├── cache/
│   │   ├── javaClasses.json
│   │   ├── mergedClasses.json    # 写 JsonDoc 时抄这里
│   │   └── rich/                 # 物品/流体/语言键属性
│   ├── docs/                     # 手写的 *.json 文档放这里
│   ├── user/                     # 用户自定义 d.ts
│   └── doc-schema.json           # docs/*.json 的自动补全 schema
└── config/probejs.json
.vscode/
├── settings.json
├── probe.code-snippets
├── item-attributes.json
└── fluid-attributes.json
```

---

## 8. 第三方 mod 的 Java 注入点

| 目标                           | API                                                                                               | 生命周期                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| 加 Special 类型                | `PlatformSpecial.INSTANCE.get().assignPlatformFormatter(...)`                                     | **持久**, 推荐                             |
| 改类型别名                     | `ClassAssignmentManager.ASSIGNMENTS.put(clazz, new PrimitiveDescJS("Special.X"))`                 | **持久**                                   |
| 改类型别名(回调式)           | `FormatterClass.SPECIAL_FORMATTER_REGISTRY.put("com.x.Y", doc -> (i, s) -> List.of("Special.X"))` | **持久**                                   |
| 加 Special formatter(一次性) | `SpecialCompiler.specialCompilers.add(...)` 或 `DocGenerationEventJS#specialType`                 | 每次 dump 开头被清空, 必须在 dump 事件里加 |
| 反射文档改类型                 | `NameResolver.putSpecialAssignments(clazz, () -> List.of("Special.X"))`                           | 每次 dump 失效, 需重挂                     |

注意: `ProbeJSEvents.generateDoc` 的脚本监听随 reload 重新加载, 写在脚本里天然安全；
Java 侧用 `DOC_GEN.listenJava(...)` 注册的监听器会在 server reload 时被清掉, 必须重新挂. 

---

## 附录 A: JsonDoc 类型标签全表

- 类型(`type:`): `array` `class` `parameterized` `variable` `primitive` `intersection` `union` `object` `jsArray` `typeof` `lambda`
- 属性(`property:`): `comment` `hide` `mod` `modify` `returns` `param` `assign` `extra` `underscored`
- 文档(`document:`): `class` `method` `field` `constructor`
- 值(`value:`): `number` `boolean` `string` `character` `fallback` `null` `map` `list`

## 附录 B: 常见坑

1. **Special 里字符串不带引号** → `type X = mymod:a;` 直接是语法错误. 要写 `"mymod:a"`. 
2. **标签成员不带 `#`** → `Special.FluidTag` 里是 `"minecraft:water"`, 代码里要写 `#` 请自己拼字符串. 
3. **`toggle_registry_literals` 关了** → 所有 `Special.XxxTag` 退化成 `string`. 
4. **JsonDoc 里 params/returns 写得不完全一致** → 不会覆盖, 而是并存一份重复定义. 抄 `mergedClasses.json` 最保险. 
5. **给 `ResourceLocation` 加 assign** → 所有 `ResourceLocation` 参数全被污染, 别这么干, 用 `property:modify`. 
6. **Java 里在 dump 事件之外 add formatter** → 下一轮 dump 开头会被清空, 看着像"生效一次就没了". 
7. **原生类型(`number`/`string`)做 assign** → 无效, 它们在 `resolvedPrimitives` 里, 只能用 `property:modify` 改具体参数. 

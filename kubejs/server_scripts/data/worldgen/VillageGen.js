// priority: -100
const VILLAGE_SLOTS = 8
const VILLAGE_WEIGHT_CAP = 150
const VILLAGE_PROBABILITY_CAP = 0.95
const VILLAGE_EMPTY_WEIGHT = 3
const VILLAGE_STREET_TYPES = [
	{ id: "straight", weight: 6 },
	{ id: "corner", weight: 3 },
	{ id: "crossroad", weight: 2 }
]
const VILLAGE_STREET_VARIANTS = 3
const VILLAGE_TERMINATOR_VARIANTS = 3
const VILLAGE_TERMINATOR_WEIGHT = 1
const VILLAGE_DECOR_EMPTY_WEIGHT = 40
const VILLAGE_GENERATORS = []

/**
 *
 * @param {"desert"|"plains"|"savanna"|"snowy"|"taiga"} biome 该村庄结构所生成的群系名
 * @constructor
 */
function VillageGen(biome) {
	if (typeof biome != "string" || biome.length == 0) {
		console.error("[VillageGen] 构造函数需要一个群系名(String), 收到: " + biome)
	}

	this.biome = biome
	this.buildings = []
	this.farmEntries = []
	this.townCenters = []
	this.decorations = []

	VILLAGE_GENERATORS.push(this)
}

/**
 * 追加一个房屋, 写入房屋池(cmi:village/<群系>/houses/<命名>).
 *
 * @param {string} name 房屋结构的 string 命名
 * @param {number} perVillage 生成权重, 每个村庄里平均出现几座
 * @param {number} [perSlot] 可选的单槽位出现概率, 给了它就忽略 perVillage 的换算
 * @returns {VillageGen} 返回自身以便链式调用
 */
VillageGen.prototype.houses = function (name, perVillage, perSlot) {
	if (typeof name != "string" || name.length == 0) {
		console.error("[VillageGen] " + this.biome + ": .houses() 需要一个房屋命名(String), 收到: " + name)
		return this
	}

	if (typeof perVillage != "number" || perVillage <= 0) {
		console.error("[VillageGen] " + this.biome + ": .houses(" + name + ") 需要一个大于 0 的生成权重, 收到: " + perVillage)
		return this
	}

	this.buildings.push({
		id: name,
		perVillage: perVillage,
		perSlot: perSlot == null ? null : perSlot
	})

	return this
}

/**
 * 追加一个农田, 与房屋写入同一个房屋池(cmi:village/<群系>/farms/<id>).
 *
 * @param {string} id 农田结构的 string 命名
 * @param {number} perVillage 生成权重, 每个村庄里平均出现几块
 * @returns {VillageGen} 返回自身以便链式调用
 */
VillageGen.prototype.farms = function (id, perVillage) {
	if (typeof id != "string" || id.length == 0) {
		console.error("[VillageGen] " + this.biome + ": .farms() 需要一个农田命名(String), 收到: " + id)
		return this
	}

	if (typeof perVillage != "number" || perVillage <= 0) {
		console.error("[VillageGen] " + this.biome + ": .farms(" + id + ") 需要一个大于 0 的生成权重, 收到: " + perVillage)
		return this
	}

	this.farmEntries.push({
		id: id,
		perVillage: perVillage,
		perSlot: null
	})

	return this
}

/**
 * 追加一个村庄中心, 写入城镇中心池(cmi:village/<群系>/town_centers/<命名>).
 *
 * 与 .houses() 的区别: 这里的 weight 是直接写进 Template Pool 的权重, 不做 perVillage 换算.
 *
 * @param {string} name 城镇中心结构的 string 命名
 * @param {number} weight 直接写入 Template Pool 的权重
 * @returns {VillageGen} 返回自身以便链式调用
 */
VillageGen.prototype.townCenter = function (name, weight) {
	if (typeof name != "string" || name.length == 0) {
		console.error("[VillageGen] " + this.biome + ": .townCenter() 需要一个城镇中心命名(String), 收到: " + name)
		return this
	}

	if (typeof weight != "number" || weight <= 0) {
		console.error("[VillageGen] " + this.biome + ": .townCenter(" + name + ") 需要一个大于 0 的权重, 收到: " + weight)
		return this
	}

	this.townCenters.push({
		id: name,
		weight: weight
	})

	return this
}

/**
 * 追加一个装饰, 写入装饰池(cmi:village/<群系>/decors/<id>).
 *
 * @param {string} id 装饰结构的 string 命名
 * @param {number} weight 直接写入 Template Pool 的权重
 * @returns {VillageGen} 返回自身以便链式调用
 */
VillageGen.prototype.decor = function (id, weight) {
	if (typeof id != "string" || id.length == 0) {
		console.error("[VillageGen] " + this.biome + ": .decor() 需要一个装饰命名(String), 收到: " + id)
		return this
	}

	if (typeof weight != "number" || weight <= 0) {
		console.error("[VillageGen] " + this.biome + ": .decor(" + id + ") 需要一个大于 0 的权重, 收到: " + weight)
		return this
	}

	this.decorations.push({
		id: id,
		weight: weight
	})

	return this
}

/**
 * 房屋与农田一视同仁: 都由 perVillage 换算成「单个槽位出现的概率」, 再折算成 Template Pool 权重.
 *
 * @returns {{slotChances: number[], buildingWeights: number[], farmWeights: number[], emptyWeight: number}}
 */
VillageGen.prototype.computeWeights = function () {
	let entries = []

	for (let i = 0; i < this.buildings.length; i++) {
		entries.push(this.buildings[i])
	}
	for (let i = 0; i < this.farmEntries.length; i++) {
		entries.push(this.farmEntries[i])
	}

	let slotChances = []

	for (let i = 0; i < entries.length; i++) {
		if (entries[i].perSlot != null) {
			slotChances.push(entries[i].perSlot)
		} else {
			slotChances.push(1 - Math.pow(1 - entries[i].perVillage, 1 / VILLAGE_SLOTS))
		}
	}

	let specialChance = 0
	for (let i = 0; i < slotChances.length; i++) {
		specialChance = specialChance + slotChances[i]
	}

	if (specialChance > VILLAGE_PROBABILITY_CAP) {
		console.warn("[VillageGen] " + this.biome + ": 每槽位概率合计 " + specialChance + " 太接近 1, 已整体缩放到 " + VILLAGE_PROBABILITY_CAP)

		let scale = VILLAGE_PROBABILITY_CAP / specialChance
		for (let i = 0; i < slotChances.length; i++) {
			slotChances[i] = slotChances[i] * scale
		}

		specialChance = VILLAGE_PROBABILITY_CAP
	}

	let rawWeights = []
	for (let i = 0; i < slotChances.length; i++) {
		rawWeights.push(slotChances[i] * VILLAGE_EMPTY_WEIGHT / (1 - specialChance))
	}
	rawWeights.push(VILLAGE_EMPTY_WEIGHT)

	let maxRawWeight = 0
	for (let i = 0; i < rawWeights.length; i++) {
		if (rawWeights[i] > maxRawWeight) {
			maxRawWeight = rawWeights[i]
		}
	}

	let weightScale = VILLAGE_WEIGHT_CAP / maxRawWeight
	let weights = []

	for (let i = 0; i < rawWeights.length; i++) {
		let weight = Math.round(rawWeights[i] * weightScale)

		if (weight < 1) {
			weight = 1
		}
		if (weight > VILLAGE_WEIGHT_CAP) {
			weight = VILLAGE_WEIGHT_CAP
		}

		weights.push(weight)
	}

	return {
		slotChances: slotChances,
		buildingWeights: weights.slice(0, this.buildings.length),
		farmWeights: weights.slice(this.buildings.length, this.buildings.length + this.farmEntries.length),
		emptyWeight: weights[weights.length - 1]
	}
}

/**
 *
 * @param {{slotChances: number[], buildingWeights: number[], farmWeights: number[], emptyWeight: number}} weights
 */
VillageGen.prototype.log = function (weights) {
	let entries = []

	for (let i = 0; i < this.buildings.length; i++) {
		let percent = Math.round((1 - Math.pow(1 - weights.slotChances[i], VILLAGE_SLOTS)) * 100)
		entries.push(this.buildings[i].id + " 每村约" + percent + "% 权重" + weights.buildingWeights[i])
	}

	for (let i = 0; i < this.farmEntries.length; i++) {
		let index = this.buildings.length + i
		let percent = Math.round((1 - Math.pow(1 - weights.slotChances[index], VILLAGE_SLOTS)) * 100)
		entries.push(this.farmEntries[i].id + " 每村约" + percent + "% 权重" + weights.farmWeights[i])
	}

	entries.push("空地 权重" + weights.emptyWeight)

	console.info("[VillageGen] " + this.biome + " 房屋池：" + entries.join(", "))
}

/**
 * 生成城镇中心池, 替代 kubejs/data/minecraft/worldgen/template_pool/village/<群系>/town_centers.json.
 *
 * @param {*} event
 */
VillageGen.prototype.buildTownCenters = function (event) {
	if (this.townCenters.length == 0) {
		return
	}

	let townCenterPool = {
		elements: [],
		fallback: "minecraft:empty"
	}

	for (let i = 0; i < this.townCenters.length; i++) {
		let townCenter = this.townCenters[i]

		townCenterPool.elements.push({
			element: {
				element_type: "minecraft:legacy_single_pool_element",
				location: "cmi:village/" + this.biome + "/town_centers/" + townCenter.id,
				processors: "minecraft:mossify_20_percent",
				projection: "rigid"
			},
			weight: townCenter.weight
		})
	}

	event.addJson("minecraft:worldgen/template_pool/village/" + this.biome + "/town_centers.json", townCenterPool)
}

/**
 * 生成装饰池, 替代 kubejs/data/minecraft/worldgen/template_pool/village/<群系>/decor.json.
 *
 * 池里只有 .decor() 指定的装饰, 原版的 feature_pool_element(树/花草/干草堆)不出现在这里.
 *
 * @param {*} event
 */
VillageGen.prototype.buildDecor = function (event) {
	if (this.decorations.length == 0) {
		console.info("[VillageGen] " + this.biome + ": 没有 .decor(), 装饰池保持原样")
		return
	}

	let decorPool = {
		elements: [],
		fallback: "minecraft:empty"
	}

	for (let i = 0; i < this.decorations.length; i++) {
		decorPool.elements.push({
			element: {
				element_type: "minecraft:legacy_single_pool_element",
				location: "cmi:village/" + this.biome + "/decors/" + this.decorations[i].id,
				processors: {
					processors: []
				},
				projection: "rigid"
			},
			weight: this.decorations[i].weight
		})
	}

	decorPool.elements.push({
		element: {
			element_type: "minecraft:empty_pool_element"
		},
		weight: VILLAGE_DECOR_EMPTY_WEIGHT
	})

	event.addJson("minecraft:worldgen/template_pool/village/" + this.biome + "/decor.json", decorPool)
}

/**
 * 生成房屋池(房屋 + 农田 + 空地).
 *
 * @param {*} event
 * @param {{slotChances: number[], buildingWeights: number[], farmWeights: number[], emptyWeight: number}} weights
 */
VillageGen.prototype.buildHouses = function (event, weights) {
	let buildingPool = {
		elements: [],
		fallback: "cmi:village/" + this.biome + "/terminators"
	}

	for (let i = 0; i < this.buildings.length; i++) {
		buildingPool.elements.push({
			element: {
				element_type: "minecraft:legacy_single_pool_element",
				location: "cmi:village/" + this.biome + "/houses/" + this.buildings[i].id,
				processors: "minecraft:mossify_10_percent",
				projection: "rigid"
			},
			weight: weights.buildingWeights[i]
		})
	}

	for (let i = 0; i < this.farmEntries.length; i++) {
		buildingPool.elements.push({
			element: {
				element_type: "minecraft:legacy_single_pool_element",
				location: "cmi:village/" + this.biome + "/farms/" + this.farmEntries[i].id,
				processors: "minecraft:farm_plains",
				projection: "rigid"
			},
			weight: weights.farmWeights[i]
		})
	}

	buildingPool.elements.push({
		element: {
			element_type: "minecraft:empty_pool_element"
		},
		weight: weights.emptyWeight
	})

	event.addJson("minecraft:worldgen/template_pool/village/" + this.biome + "/houses.json", buildingPool)
}

/**
 *
 * @param {*} event
 */
VillageGen.prototype.buildStreets = function (event) {
	let streetPool = {
		elements: [],
		fallback: "cmi:village/" + this.biome + "/terminators"
	}

	for (let i = 0; i < VILLAGE_STREET_TYPES.length; i++) {
		let street = VILLAGE_STREET_TYPES[i]

		for (let variant = 1; variant <= VILLAGE_STREET_VARIANTS; variant++) {
			streetPool.elements.push({
				element: {
					element_type: "minecraft:legacy_single_pool_element",
					location: "cmi:village/" + this.biome + "/streets/" + street.id + "_" + variant,
					processors: "cmi:road",
					projection: "terrain_matching"
				},
				weight: street.weight
			})
		}
	}

	event.addJson("minecraft:worldgen/template_pool/village/" + this.biome + "/streets.json", streetPool)
}

/**
 *
 * @param {*} event
 */
VillageGen.prototype.buildTerminators = function (event) {
	let terminatorPool = {
		elements: [],
		fallback: "minecraft:empty"
	}

	for (let variant = 1; variant <= VILLAGE_TERMINATOR_VARIANTS; variant++) {
		terminatorPool.elements.push({
			element: {
				element_type: "minecraft:legacy_single_pool_element",
				location: "cmi:village/" + this.biome + "/terminators/terminator_" + variant,
				processors: "cmi:road",
				projection: "terrain_matching"
			},
			weight: VILLAGE_TERMINATOR_WEIGHT
		})
	}

	event.addJson("cmi:worldgen/template_pool/village/" + this.biome + "/terminators.json", terminatorPool)
}

/**
 *
 * @param {*} event
 * @returns {VillageGen} 返回自身
 */
VillageGen.prototype.build = function (event) {
	let weights = this.computeWeights()

	this.log(weights)

	this.buildHouses(event, weights)
	this.buildTownCenters(event)
	this.buildDecor(event)
	this.buildStreets(event)
	this.buildTerminators(event)

	return this
}

new VillageGen("plains")
	.houses("cabin_1", 0.4)
	.houses("cabin_2", 0.5)
	.houses("cabin_3", 0.4)
	.houses("clinic", 0.4)
	.houses("dyeing", 0.2)
	.houses("fisherman", 0.3)
	.houses("grain", 0.3)
	.houses("library", 0.3)
	.houses("mill", 0.35)
	.houses("restaurant", 0.25)
	.houses("tinker", 0.85)
	.houses("toilet", 0.5)
	.houses("train", 0.85)
	.farms("grapes", 0.3)
	.farms("melons", 0.25)
	.farms("rice", 0.1)
	.farms("rice_large", 0.1)
	.farms("rice_giant", 0.1)
	.farms("sugar_cane", 0.4)
	.townCenter("tower", 50)
	.townCenter("sculpture", 40)
	.decor("breakfast", 10)
	.decor("fish", 5)
	.decor("flower", 15)
	.decor("meat", 10)
	.decor("plant", 15)
	.decor("light", 80)
	.decor("cart", 40)

ServerEvents.highPriorityData((event) => {
	VILLAGE_GENERATORS.forEach((village) => village.build(event))
})

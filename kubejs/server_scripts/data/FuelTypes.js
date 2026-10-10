ServerEvents.highPriorityData((event) => {
	/**
	 * 
	 * @param {string} name 流体ID(Tag)
	 * @param {number} speed 每秒消耗的流体量(mB)
	 * @returns 
	 */
	function FuelType(name, speed) {
		this.name = name
		this.speed = speed
		this.getFluidName = Ingredient.getPath(name)

		this.engineFuelData = {
			fluid: name,
			sound_speed: speed,
			normal: {},
			modular: {},
			huge: {}
		}
	}

	FuelType.prototype.build = function () {
		event.addJson(
			`createdieselgenerators:diesel_engine_fuel_types/${this.getFluidName}.json`,
			this.engineFuelData
		)
	}

	/**
	 * 
	 * @param {number} speed 转速
	 * @param {number} strength 转速
	 * @param {number} burnRate 燃料消耗速率
	 * @returns 
	 */
	FuelType.prototype.normal = function (speed, strength, burnRate) {
		this.engineFuelData.normal = {
			speed: speed,
			strength: strength,
			burn_rate: burnRate
		}
		return this
	}

	/**
	 * 
	 * @param {number} speed 转速
	 * @param {number} strength 转速
	 * @param {number} burnRate 燃料消耗速率
	 * @returns 
	 */
	FuelType.prototype.modular = function (speed, strength, burnRate) {
		this.engineFuelData.modular = {
			speed: speed,
			strength: strength,
			burn_rate: burnRate
		}
		return this
	}

	/**
	 * 
	 * @param {number} speed 转速
	 * @param {number} strength 转速
	 * @param {number} burnRate 燃料消耗速率
	 * @returns 
	 */
	FuelType.prototype.huge = function (speed, strength, burnRate) {
		this.engineFuelData.huge = {
			speed: speed,
			strength: strength,
			burn_rate: burnRate
		}
		return this
	}

	/**
	 * 
	 * @param {number} seconds 燃烧时长
	 * @returns 
	 */
	FuelType.prototype.train = function (seconds) {
		let trainFuelData = {
			fluids: [
				this.name
			],
			fuel_ticks: seconds * 20
		}
		event.addJson(`cmi:railways_liquid_fuel/${this.getFluidName}.json`, trainFuelData)
		return this
	}

	// 植物油
	new FuelType("#forge:plantoil", 1)
		.normal(32, 16384, 3)
		.modular(32, 32768, 5)
		.huge(48, 65536, 9)
		.build()

	// 乙醇
	new FuelType("#forge:ethanol", 1)
		.normal(48, 16384, 4)
		.modular(48, 32768, 5)
		.huge(64, 65536, 6)
		.build()

	// 生物柴油
	new FuelType("#forge:biodiesel", 1)
		.normal(64, 18432, 3)
		.modular(64, 36864, 5)
		.huge(96, 73728, 9)
		.build()

	// 煤油
	new FuelType("cmi:kerosene", 1)
		.normal(32, 18432, 6)
		.modular(32, 36864, 8)
		.huge(64, 73728, 12)
		.build()

	// 汽油
	new FuelType("#forge:gasoline", 1)
		.normal(96, 18432, 3)
		.modular(96, 36864, 5)
		.huge(128, 73728, 8)
		.build()

	// 柴油
	new FuelType("#forge:diesel", 1)
		.normal(128, 20480, 6)
		.modular(128, 40960, 8)
		.huge(128, 81920, 12)
		.build()

	// 精炼油
	new FuelType("thermal:refined_fuel", 1)
		.normal(128, 20480, 4)
		.modular(128, 40960, 6)
		.huge(128, 81920, 8)
		.build()
})
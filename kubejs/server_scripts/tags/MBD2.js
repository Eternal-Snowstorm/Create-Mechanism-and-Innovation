ServerEvents.tags("block", (event) => {
	/**
	 * @param {string} machine
	 */
	function MBDBlockTag(machine) {
		this.blocks = [
			`cmi:${machine}`,
			`cmi:${machine}_input_bus`,
			`cmi:${machine}_output_bus`,
			`cmi:${machine}_item_input_bus`,
			`cmi:${machine}_item_output_bus`,
			`cmi:${machine}_fluid_input_bus`,
			`cmi:${machine}_fluid_output_bus`,
			`cmi:${machine}_energy_input_bus`,
			`cmi:${machine}_energy_output_bus`,
			`cmi:${machine}_gas_input_bus`,
			`cmi:${machine}_gas_output_bus`
		]
	}

	/**
	 * @param {Special.BlockTag} tag
	 * @returns {MBDBlockTag}
	 */
	MBDBlockTag.prototype.tag = function (tag) {
		event.get(tag).add(this.blocks)
		return this
	}

	/**
	 * @param {CmiToolType} tool
	 * @returns {MBDBlockTag}
	 */
	MBDBlockTag.prototype.tool = function (tool) {
		return this.tag(tool.tag())
	}

	/**
	 * @param {CmiMiningLevel} level
	 * @returns {MBDBlockTag}
	 */
	MBDBlockTag.prototype.mining = function (level) {
		return this.tag(level.tag())
	}

	MBDBlockTag.prototype.sword = function () {
		return this.tool(CmiToolType.SWORD)
	}

	MBDBlockTag.prototype.pickaxe = function () {
		return this.tool(CmiToolType.PICKAXE)
	}

	MBDBlockTag.prototype.axe = function () {
		return this.tool(CmiToolType.AXE)
	}

	MBDBlockTag.prototype.shovel = function () {
		return this.tool(CmiToolType.SHOVEL)
	}

	MBDBlockTag.prototype.hoe = function () {
		return this.tool(CmiToolType.HOE)
	}

	MBDBlockTag.prototype.wooden = function () {
		return this.mining(CmiMiningLevel.WOODEN)
	}

	MBDBlockTag.prototype.stone = function () {
		return this.mining(CmiMiningLevel.STONE)
	}

	MBDBlockTag.prototype.iron = function () {
		return this.mining(CmiMiningLevel.IRON)
	}

	MBDBlockTag.prototype.gold = function () {
		return this.mining(CmiMiningLevel.GOLD)
	}

	MBDBlockTag.prototype.diamond = function () {
		return this.mining(CmiMiningLevel.DIAMOND)
	}

	MBDBlockTag.prototype.nether = function () {
		return this.mining(CmiMiningLevel.NETHER)
	}

	new MBDBlockTag("reinforced_coke_oven")
		.pickaxe()
		.iron()

	new MBDBlockTag("improved_rubber_extractor")
		.pickaxe()
		.stone()

	new MBDBlockTag("chemical_reactor")
		.pickaxe()
		.diamond()

	new MBDBlockTag("reinforced_chemical_reactor")
		.pickaxe()
		.diamond()

	new MBDBlockTag("electrolyzer")
		.pickaxe()
		.diamond()

	new MBDBlockTag("electronic_blast_furnace")
		.pickaxe()
		.iron()
})
/*
 * 原本计划实现线圈等级越高, 配方并行数越高的机制,
 * 但由于目前还有一些问题没搞明白,
 * 相关代码似乎并没有正常生效.
 * 现在的并行是固定在16并行
 *
 * 如果有玩家知道该如何解决, 欢迎帮忙指点一下
 */

let $ProxyPartBlockEntity =
	Java.loadClass("com.lowdragmc.mbd2.api.blockentity.ProxyPartBlockEntity")

const NEED_COIL_COUNT = 24

const COILS = {
	LV: Block.getBlock("immersiveengineering:coil_lv"),
	MV: Block.getBlock("immersiveengineering:coil_mv"),
	HV: Block.getBlock("immersiveengineering:coil_hv")
}

const COIL_RATIO = Object.freeze({
	LV: 4,
	MV: 1.5,
	HV: 0.25
})

const COIL_PARALLEL = Object.freeze({
	LV: 16,
	MV: 32,
	HV: 64
})

MBDMachineEvents.onStructureFormed(($) => {
	let event = $.getEvent()

	/**
	 * @type {Internal.MBDMultiblockMachine_}
	 */
	let machine = event.getMachine()

	if (!MBDUtils.isMachine(machine, "cmi:electronic_blast_furnace")) {
		return
	}

	let coilLevel = getCoilLevel(machine)

	if (coilLevel === -1) {
		// 如果线圈数量不足, 阻止结构成型
		event.setCanceled(true)
		return
	}

	machine.setMachineLevel(coilLevel)
})

MBDMachineEvents.onRecipeWorking(($) => {
	let event = $.getEvent()

	/**
	 * @type {Internal.MBDMultiblockMachine_}
	 */
	let machine = event.getMachine()

	if (!MBDUtils.isMachine(machine, "cmi:electronic_blast_furnace")) {
		return
	}

	levelMultiplierModify(machine)
})

MBDMachineEvents.onBeforeRecipeWorking(($) => {
	let event = $.getEvent()

	/**
	 * @type {Internal.MBDMultiblockMachine_}
	 */
	let machine = event.getMachine()

	if (!MBDUtils.isMachine(machine, "cmi:electronic_blast_furnace")) {
		return
	}

	let copy = levelParallelModify(machine, event.getRecipe())
	event.setRecipe(copy)
})

/**
 * 获取线圈等级
 *
 * 0 = LV
 * 1 = MV
 * 2 = HV
 * -1 = 不满足要求
 *
 * @param {Internal.MBDMultiblockMachine_} machine
 * @returns 
 */
function getCoilLevel(machine) {
	let count = getCoilCount(machine)

	if (count.lv === NEED_COIL_COUNT) {
		return 0
	}

	if (count.mv === NEED_COIL_COUNT) {
		return 1
	}

	if (count.hv === NEED_COIL_COUNT) {
		return 2
	}

	return -1
}

/**
 * 统计线圈数量
 *
 * @param {Internal.MBDMultiblockMachine_} machine
 * @returns 
 */
function getCoilCount(machine) {
	let level = machine.getLevel()

	let result = {
		lv: 0,
		mv: 0,
		hv: 0
	}

	machine.getMultiblockState()
		.getCache()
		.forEach((pos) => {
			let state = getRealState(level, pos)
			let block = state.getBlock()

			if (block.equals(COILS.LV)) {
				result.lv++
			} else if (block.equals(COILS.MV)) {
				result.mv++
			} else if (block.equals(COILS.HV)) {
				result.hv++
			}
		})

	return result
}

/**
 * 根据线圈等级调整并行数量
 *
 * @param {Internal.MBDMultiblockMachine_} machine 
 * @param {Internal.MBDRecipe_} recipe 
 */
function levelParallelModify(machine, recipe) {
	/**
	 * 
	 * @param {number} parallel 
	 */
	function parallel(parallel) {
		return machine.applyParallel(recipe, parallel)
	}

	switch (getCoilLevel(machine)) {
		case 0:
			return parallel(COIL_PARALLEL.LV)
		case 1:
			return parallel(COIL_PARALLEL.MV)
		case 2:
			return parallel(COIL_PARALLEL.HV)
		default:
			return recipe
	}
}

/**
 * 根据线圈等级调整效率
 *
 * @param {Internal.MBDMultiblockMachine_} machine
 */
function levelMultiplierModify(machine) {
	let recipe = machine.getRecipeLogic()
	let duration = recipe.getDuration()

	/*
	 * 若已经开始运行则不再修改
	 * 不然会出现每Tick都做一次修改的现象
	 * 甚至能看到配方时间越来越多甚至突破 int 上限
	 */
	if (recipe.getProgress() > 0) {
		return
	}

	switch (getCoilLevel(machine)) {
		case 0:
			recipe.setDuration(duration * COIL_RATIO.LV)
			break

		case 1:
			recipe.setDuration(duration * COIL_RATIO.MV)
			break

		case 2:
			recipe.setDuration(duration * COIL_RATIO.HV)
			break
	}
}

/**
 * 获取代理方块对应的真实 BlockState
 *
 * @param {Internal.Level_} level
 * @param {BlockPos_} pos
 * @returns
 */
function getRealState(level, pos) {
	let state = level.getBlockState(pos)
	let entity = level.getBlockEntity(pos)

	if (entity instanceof $ProxyPartBlockEntity) {
		let original = entity.getOriginalState()
		if (original != null) {
			return original
		}
	}

	return state
}
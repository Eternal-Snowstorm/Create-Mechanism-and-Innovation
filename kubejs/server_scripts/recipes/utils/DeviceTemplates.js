// priority: 20
/**
 * 设备配方公共模板
 *
 * 供 recipes/device/** 下的脚本调用。加载顺序：priority 20 > utils/ServerUtils.js(18)，
 * 因此这里可以直接引用 Casing / Mechanisms；device 脚本自身无 priority 注释（最小，最后加载），
 * 可安全使用本文件导出的函数。
 */

/**
 * Thermal 系部件装配配方（thermal_extra:component_assembly）
 * 统一固化能量消耗 4000 RF，避免各文件重复声明。
 *
 * @param {Internal.RecipeType_} thermal_extra event 解构出的 thermal_extra 配方命名空间
 * @param {string} output 输出物品
 * @param {Array} inputs 输入物品与流体
 */
function addComponRecipe(thermal_extra, output, inputs) {
	return thermal_extra.component_assembly(output, inputs)
		.energy(4000)
}

/**
 * 三行竖排设备模板：M（机制本体）/ C（机壳）/ X（功能件）
 *
 * 用于 Create、Thermal 系绝大多数单方块设备的统一外形，避免每个设备重复写 6 行 keys。
 *
 * @param {Internal.RecipeType_} kubejs event 解构出的 kubejs 配方命名空间
 * @param {string} output 输出物品（含数量前缀，如 "2x create:xxx"）
 * @param {string} id 配方 id（通常沿用原 mod 的配方路径）
 * @param {Object} keys M/C/X 的取值表
 */
function verticalDevice(kubejs, output, id, keys) {
	return kubejs.shaped(output, ["M", "C", "X"], keys)
		.id(id)
}

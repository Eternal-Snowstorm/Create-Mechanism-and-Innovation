// let langMap = {}
// // const FILE_PATH = "config/openloader/resources/PackResource/assets/mm/lang/zh_cn.json"
// const FILE_PATH = "kubejs/assets/mm/lang/zh_cn.json"

// langMap["recipe.mm.output.chance"] = "%s输出概率"
// langMap["recipe.mm.input.chance"] = "%s消耗概率"
// langMap["recipe.mm.output.tick"] = "每Tick输出"
// langMap["recipe.mm.input.tick"] = "每Tick消耗"

// addMMLanguage("large_steam_boiler", "大型蒸汽锅炉")
// addMMLanguage("cracker", "裂解机")
// addMMLanguage("steam_ore_processor", "蒸汽矿石处理机")
// addMMLanguage("particle_collision_machine", "粒子碰撞机")
// addMMLanguage("improved_rubber_extractor", "改进型橡胶提取器")

// /**
//  * 
//  * @param {string} key 
//  * @param {string} value 
//  */
// function addMMLanguage(key, value) {
// 	langMap[`block.mm.${key}`] = value
// 	console.log("控制器语言生成完成")

// 	langMap[`block.mm.${key}_item_input`] = `${value}物品输入口`
// 	langMap[`block.mm.${key}_item_output`] = `${value}物品输出口`
// 	console.log("Item接口语言生成完成")

// 	langMap[`block.mm.${key}_fluid_input`] = `${value}流体输入口`
// 	langMap[`block.mm.${key}_fluid_output`] = `${value}流体输出口`
// 	console.log("Fluid接口语言生成完成")

// 	langMap[`block.mm.${key}_energy_input`] = `${value}能量输入口`
// 	langMap[`block.mm.${key}_energy_output`] = `${value}能量输出口`
// 	console.log("Energy接口语言生成完成")
// }

// JsonIO.writeAndCreateDirectories(FILE_PATH, langMap)
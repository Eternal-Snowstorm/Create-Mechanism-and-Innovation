let $ServerLevel =
	Java.loadClass("net.minecraft.server.level.ServerLevel")
let $StructurePlaceSettings =
	Java.loadClass("net.minecraft.world.level.levelgen.structure.templatesystem.StructurePlaceSettings")
let $StructureTemplate =
	Java.loadClass("net.minecraft.world.level.levelgen.structure.templatesystem.StructureTemplate")
let $Rotation =
	Java.loadClass("net.minecraft.world.level.block.Rotation")
let $Mirror =
	Java.loadClass("net.minecraft.world.level.block.Mirror")

ServerEvents.loaded((event) => {
	let { server } = event
	let structureNamespace = Cmi.MODID

	/**
	 * 
	 * @param {string} path 
	 * @returns 
	 */
	function getStructureName(path) {
		return ResourceLocation.fromNamespaceAndPath(structureNamespace, path)
	}

	/**
	 * 获取结构的底部 Y 坐标
	 * @param {Internal.StructureTemplate_} template 
	 */
	function getStructureBaseY(template) {
		let box = template.getBoundingBox()
		return box.minY()
	}

	/**
	 * 获取地面高度
	 * @param {Internal.Level_} level
	 * @param {number} x
	 * @param {number} z
	 * @returns {number} 地面高度
	 */
	function getGroundY(level, x, z) {
		let pos = new $BlockPos(x, 0, z)
		let state = level.getBlockState(pos)
		while (!state.getMaterial().isSolid()) {
			// 向上查找直到找到实心的方块
			pos = pos.above()
			state = level.getBlockState(pos)
		}
		return pos.getY()
	}

	/**
	 * 在指定维度的特定坐标生成结构
	 * @param {string} dimId - 维度 ID (例如 "minecraft:the_nether")
	 * @param {string} structurePath - 结构路径和文件名 
	 * @param {[number, number, number]} pos - 坐标 [x, y, z]
	 */
	function placeStructure(dimId, structurePath, pos) {
		let level = server.getLevel(dimId)

		if (!(level instanceof $ServerLevel)) {
			// console.warn(`Failed to find dimension: ${structureNamespace}:${dimId}`)
			return false
		}

		let manager = level.getServer().getStructureManager()
		let template = manager.get(getStructureName(structurePath))

		if (!template.isPresent()) {
			// console.warn(`Structure not found: ${structureNamespace}:${structurePath}`)
			return false
		}

		let [x, y, z] = pos
		template.ifPresent((temp) => {
			// 获取结构的底部 Y 坐标
			let baseY = getStructureBaseY(temp)

			// 获取目标位置的地面高度, 并调整 Y 坐标
			let groundY = getGroundY(level, x, z)

			// 计算放置位置的 Y 坐标(地面高度 - 结构底部偏移)
			let adjustedY = groundY - baseY

			// 放置结构
			let pos = new BlockPos(x, adjustedY, z)
			let setting = new $StructurePlaceSettings()
				.setRotation($Rotation.NONE)
				.setMirror($Mirror.NONE)

			temp.placeInWorld(
				level,
				pos,
				pos,
				setting,
				level.getRandom(),
				2
			)
		})

		// console.info(`Placed structure ${structureNamespace}:${structurePath} at (${x}, ${y}, ${z})`)
		return true
	}

	function placeAllStructures(structures) {
		let data = server.getPersistentData()

		structures.forEach((structure) => {
			let { id, dimId, path, pos } = structure
			let key = `structure_${id}_placed`

			if (data.getBoolean(key)) {
				// console.info(`Structure "${id}" already placed, skipping.`)
				return
			}

			let level = server.getLevel(dimId)
			if (!(level instanceof $ServerLevel)) {
				// console.warn(`Failed to find dimension: ${dimId}`)
				return
			}

			let success = placeStructure(dimId, path, pos)
			if (success) {
				data.putBoolean(key, true)
				// console.info(`Marked structure "${id}" as placed.`)
			}
		})
	}

	let structuresToPlace = [
		{
			id: "radar_moon",
			dimId: "ad_astra:moon",
			path: "radar/radar",
			pos: [0, 80, 0]
		},
	]

	placeAllStructures(structuresToPlace)
})
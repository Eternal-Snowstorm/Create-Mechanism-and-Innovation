CreateEvents.spoutHandler((event) => {
	const FLUID = "cmi:crystal_catalyt"

	/**
	 * 注册晶簇成长逻辑
	 * @param {string} path 注册ID
	 * @param {string} block 当前方块
	 * @param {string} nextId 下个阶段方块
	 * @param {boolean} [checkAir=false] 是否需要检查空气生成(仅 budding 用)
	 */
	function addBudGrowth(path, block, nextId, checkAir) {
		checkAir = checkAir === true

		event.add(path, block, (block, fluid, simulate) => {
			if (fluid.id !== FLUID || fluid.amount < 250) {
				return 0
			}

			if (!simulate) {
				let facing = block.properties.facing

				// block.level.playSound(
				// 	null,
				// 	block.pos.x,
				// 	block.pos.y,
				// 	block.pos.z,
				// 	"create:spout",
				// 	"blocks",
				// 	1.0,
				// 	1.0
				// )

				block.level.server.runCommandSilent(
					`playsound create:spout block @a ${block.pos.x} ${block.pos.y} ${block.pos.z}`
				)

				// block.level.server.getLevel().sendParticles(
				// 	ParticleTypes.BLOCK,
				// 	block.pos.x(),
				// 	block.pos.y(),
				// 	block.pos.z(),
				// 	0.25,
				// 	0.25,
				// 	0.25,
				// 	3,
				// 	8
				// )
				block.level.server.runCommandSilent(
					`particle minecraft:block ${block.id} ${block.pos.x} ${block.pos.y} ${block.pos.z} 0.25 0.25 0.25 0.3 8`
				)

				if (checkAir) {
					let dirs = ["up", "north", "west", "south", "east", "down"]
					let placed = false
					dirs.forEach((d) => {
						if (!placed && block[d].id === "minecraft:air") {
							block.level.server.runCommandSilent(
								`setblock ${block[d].x} ${block[d].y} ${block[d].z} ${nextId}[facing=${d}]`
							)
							placed = true
						}
					})
				} else {
					block.level.server.runCommandSilent(
						`setblock ${block.x} ${block.y} ${block.z} ${nextId}[facing=${facing}]`
					)
				}
			}
			return 250
		})
	}

	// 紫水晶
	addBudGrowth("cmi:amethyst_spawn", "minecraft:budding_amethyst", "minecraft:small_amethyst_bud", true)
	addBudGrowth("cmi:small_amethyst_bud", "minecraft:small_amethyst_bud", "minecraft:medium_amethyst_bud")
	addBudGrowth("cmi:medium_amethyst_bud", "minecraft:medium_amethyst_bud", "minecraft:large_amethyst_bud")
	addBudGrowth("cmi:large_amethyst_bud", "minecraft:large_amethyst_bud", "minecraft:amethyst_cluster")

	// 赛特斯石英
	addBudGrowth("cmi:certus_spawn", "ae2:flawless_budding_quartz", "ae2:small_quartz_bud", true)
	addBudGrowth("cmi:small_certus_bud", "ae2:small_quartz_bud", "ae2:medium_quartz_bud")
	addBudGrowth("cmi:medium_certus_bud", "ae2:medium_quartz_bud", "ae2:large_quartz_bud")
	addBudGrowth("cmi:large_certus_bud", "ae2:large_quartz_bud", "ae2:quartz_cluster")

	// 大地粘液
	addBudGrowth("cmi:earth_slime_spawn", "tconstruct:budding_earth_slime_crystal", "tconstruct:small_earth_slime_crystal_bud", true)
	addBudGrowth("cmi:small_earth_bud", "tconstruct:small_earth_slime_crystal_bud", "tconstruct:medium_earth_slime_crystal_bud")
	addBudGrowth("cmi:medium_earth_bud", "tconstruct:medium_earth_slime_crystal_bud", "tconstruct:large_earth_slime_crystal_bud")
	addBudGrowth("cmi:large_earth_bud", "tconstruct:large_earth_slime_crystal_bud", "tconstruct:earth_slime_crystal_cluster")

	// 碧空粘液
	addBudGrowth("cmi:sky_slime_spawn", "tconstruct:budding_sky_slime_crystal", "tconstruct:small_sky_slime_crystal_bud", true)
	addBudGrowth("cmi:small_sky_bud", "tconstruct:small_sky_slime_crystal_bud", "tconstruct:medium_sky_slime_crystal_bud")
	addBudGrowth("cmi:medium_sky_bud", "tconstruct:medium_sky_slime_crystal_bud", "tconstruct:large_sky_slime_crystal_bud")
	addBudGrowth("cmi:large_sky_bud", "tconstruct:large_sky_slime_crystal_bud", "tconstruct:sky_slime_crystal_cluster")

	// 灵浆粘液
	addBudGrowth("cmi:ichor_spawn", "tconstruct:budding_ichor_slime_crystal", "tconstruct:small_ichor_slime_crystal_bud", true)
	addBudGrowth("cmi:small_ichor_bud", "tconstruct:small_ichor_slime_crystal_bud", "tconstruct:medium_ichor_slime_crystal_bud")
	addBudGrowth("cmi:medium_ichor_bud", "tconstruct:medium_ichor_slime_crystal_bud", "tconstruct:large_ichor_slime_crystal_bud")
	addBudGrowth("cmi:large_ichor_bud", "tconstruct:large_ichor_slime_crystal_bud", "tconstruct:ichor_slime_crystal_cluster")

	// 末影粘液
	addBudGrowth("cmi:ender_slime_spawn", "tconstruct:budding_ender_slime_crystal", "tconstruct:small_ender_slime_crystal_bud", true)
	addBudGrowth("cmi:small_ender_bud", "tconstruct:small_ender_slime_crystal_bud", "tconstruct:medium_ender_slime_crystal_bud")
	addBudGrowth("cmi:medium_ender_bud", "tconstruct:medium_ender_slime_crystal_bud", "tconstruct:large_ender_slime_crystal_bud")
	addBudGrowth("cmi:large_ender_bud", "tconstruct:large_ender_slime_crystal_bud", "tconstruct:ender_slime_crystal_cluster")
})
// By 史莱姆li
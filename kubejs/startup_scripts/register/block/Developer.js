StartupEvents.registry("block", (event) => {
	/**
	 * 
	 * @param {string} dollName 
	 * @param {string} skinType 
	 * @returns 
	 */
	function developerDollmodel(dollName, skinType) {
		const PARENT = `cmi:block/dev/${skinType}`
		const SKIN = `cmi:block/dev/${dollName}`

		return {
			parent: PARENT,
			textures: {
				"skin": SKIN
			}
		}
	}

	/**
	 * 
	 * @param {string} name 
	 * @param {"wide" | "slim"} type 
	 * @returns 
	 */
	function addDeveloperDoll(name, type) {
		let builder =
			event.create(`${Cmi.MODID}:${name}`, "cardinal")

		builder.soundType(SoundType.WOOL)
		builder.hardness(0)
		builder.resistance(1)
		builder.waterlogged()
		builder.notSolid()
		builder.defaultCutout()
		builder.noCollision()
		builder.translationKey(Component.translatable(`${Cmi.MODID}:${name}`))
		builder.tag(`${Cmi.MODID}:dev_doll`)
		builder.modelJson = developerDollmodel(name, type)

		return builder
	}

	// UE
	addDeveloperDoll("re_construction", "slim")

	// dkrkoo_weihe
	addDeveloperDoll("dkrkoo_weihe", "slim")

	// Dropper
	addDeveloperDoll("dropper_qwq", "wide")

	// 1174
	addDeveloperDoll("117458866249", "wide")

	// Random Mechanism
	addDeveloperDoll("random_mechanism", "slim")

	// 中微子
	addDeveloperDoll("eternalsnowstorm", "slim")

	// 柒月
	addDeveloperDoll("qi_month", "slim")

	// 幽灵猫
	addDeveloperDoll("ein_nameuwu", "slim")

	// 幻想星辰
	addDeveloperDoll("huanchenxiaohuli", "slim")

	// Belalus
	addDeveloperDoll("belalus", "wide")

	// FiberOptics
	addDeveloperDoll("fiber_optics", "slim")

	// 燕栖
	addDeveloperDoll("ye_anqing", "slim")

	// MF
	addDeveloperDoll("sakura_star_cn", "slim")

	// 亓才孑
	addDeveloperDoll("qicaijie", "slim")

	// 闪电羿
	addDeveloperDoll("flash_yi", "slim")

	// 键盘虾
	addDeveloperDoll("keyxeldesu", "slim")

	// 谢尔盖
	addDeveloperDoll("sergei", "slim")

	// 栗子
	addDeveloperDoll("lirx_owo", "slim")

	// 德尔塔
	addDeveloperDoll("delta", "wide")
})
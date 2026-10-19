Ponder.registry((event) => {
	event.create([
		"cmi:bronze_casing",
		"mekanism:steam_boiler",
		"mm:large_steam_boiler",
		"mm:large_steam_boiler_fluid_output",
		"mm:large_steam_boiler_fluid_input",
		"mm:large_steam_boiler_item_input",
		"mekanism:steam_bucket"
	]).scene(`${Cmi.MODID}:large_steam_boiler`, "Large Steam Boiler", (scene) => {
		const BRONZE_CASING = "steam_letters:bronze_casing"

		scene.showBasePlate()
		scene.idle(20)

		scene.addKeyframe()
		let block1 = [
			[3, 1, 1],
			[3, 1, 2],
			[3, 1, 3],
			[2, 1, 2],
			[2, 1, 3],
			[1, 1, 1],
			[1, 1, 2],
			[1, 1, 3]
		]
		block1.forEach((pos) => {
			scene.world().setBlocks(pos, "tconstruct:scorched_bricks")
			scene.world().showSection(pos, Direction.DOWN)
			scene.idle(2)
		})
		scene.idle(20)

		scene.world().setBlocks([2, 1, 1], "mm:large_steam_boiler_item_input")
		scene.world().showSection([2, 1, 1], Direction.DOWN)
		scene.idle(20)
		// 燃料输入
		scene.text(40, "Fuel Input", [2.5, 1.5, 1])
		scene.overlay().showOutline("blue", {}, [2, 1, 1], 40)
		scene.idle(50)

		//
		scene.addKeyframe()
		let block2 = [
			[3, 2, 1],
			[3, 2, 3],
			[2, 2, 3],
			[1, 2, 1],
			[1, 2, 3]
		]
		block2.forEach((pos) => {
			scene.world().setBlocks(pos, BRONZE_CASING)
			scene.world().showSection(pos, Direction.DOWN)
			scene.idle(2)
		})
		scene.idle(20)

		scene.world().setBlocks([3, 2, 2], "mm:large_steam_boiler_fluid_input")
		scene.world().showSection([3, 2, 2], Direction.DOWN)
		scene.idle(20)
		// 流体输入
		scene.text(40, "Fluid Input", [3.5, 3, 2.5])
		scene.overlay().showOutline("blue", {}, [3, 2, 2], 40)
		scene.idle(50)

		scene.world().setBlocks([1, 2, 2], "mm:large_steam_boiler_fluid_output")
		scene.world().showSection([1, 2, 2], Direction.DOWN)
		scene.idle(20)
		// 流体输出
		scene.text(40, "Fluid Output", [1.5, 3, 2.5])
		scene.overlay().showOutline("blue", {}, [1, 2, 2], 40)
		scene.idle(50)

		scene.world().setBlocks([2, 2, 1], "mm:large_steam_boiler")
		scene.world().modifyBlocks([2, 2, 1], (state) => state.with("facing", "south"), false)
		scene.world().showSection([2, 2, 1], Direction.DOWN)
		scene.idle(20)
		// 大型蒸汽锅炉控制器
		scene.text(40, "Lager Steam Boiler Controller", [2.5, 3, 1.5])
		scene.overlay().showOutline("blue", {}, [2, 2, 1], 40)
		scene.idle(50)

		//
		scene.addKeyframe()
		let block3 = [
			[3, 3, 1],
			[3, 3, 2],
			[3, 3, 3],
			[2, 3, 3],
			[2, 3, 1],
			[1, 3, 1],
			[1, 3, 2],
			[1, 3, 3],
		]
		block3.forEach((pos) => {
			scene.world().setBlocks(pos, BRONZE_CASING)
			scene.world().showSection(pos, Direction.DOWN)
			scene.idle(2)
		})
		scene.idle(20)

		//
		scene.addKeyframe()
		let block4 = [
			[3, 4, 1],
			[3, 4, 2],
			[3, 4, 3],
			[2, 4, 3],
			[2, 4, 2],
			[2, 4, 1],
			[1, 4, 1],
			[1, 4, 2],
			[1, 4, 3]
		]
		block4.forEach((pos) => {
			scene.world().setBlocks(pos, BRONZE_CASING)
			scene.world().showSection(pos, Direction.DOWN)
			scene.idle(2)
		})
		scene.idle(20)

		scene.rotateCameraY(-360)
		scene.idle(20)
	})
})